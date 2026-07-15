import { detectIntent } from "@/core/api/chat/ai-router";
import { searchHouses } from "@/core/api/chat/api";


const SYSTEM_PROMPT = `
تو یک مشاور حرفه‌ای املاک ایرانی هستی.

قوانین مهم:
- تمام پاسخ‌ها باید ۱۰۰٪ فارسی باشند.
- از هیچ کلمه انگلیسی، کاراکتر لاتین یا علامت markdown مثل ** یا * استفاده نکن.
- از هیچ زبان دیگری به جز فارسی استفاده نکن.
- پاسخ‌ها را روان، طبیعی و مناسب کاربران فارسی‌زبان بنویس.
- حوزه تخصصی تو املاک، خرید، فروش، اجاره و سرمایه‌گذاری در مسکن است.
- اعداد را به فارسی بنویس. مثلاً به جای 1,000,000 بنویس ۱ میلیون تومان.
`;

const FILTER_EXTRACTION_SYSTEM = `
تو یک سیستم استخراج فیلتر برای جستجوی ملک هستی.
فقط JSON برگردان، بدون هیچ توضیح یا backtick.

فیلدهای ممکن:
- transactionType: "rental" (اجاره) | "mortgage" (رهن) | "direct_purchase" (خرید)
- propertyType: "apartment" (آپارتمان) | "villa" (ویلا) | "house" (خانه) | "land" (زمین) | "commercial" (تجاری)
- location: نام شهر یا منطقه (string)
- minPrice / maxPrice: برای خرید مستقیم (عدد به تومان)
- minRent / maxRent: برای اجاره (عدد به تومان)
- minMortgage / maxMortgage: برای رهن (عدد به تومان)
- minArea / maxArea: متراژ (عدد به متر مربع)
- search: کلمه کلیدی جستجو در عنوان و آدرس

فقط فیلدهایی که در پیام وجود دارند را برگردان.
مثال: {"transactionType":"rental","location":"تهران","maxRent":5000000}
`;

const SUMMARY_SYSTEM = `
تو یک مشاور حرفه‌ای املاک ایرانی هستی که نتایج جستجو را به کاربر توضیح می‌دهی.

قوانین سخت:
- فقط فارسی بنویس. هیچ کلمه انگلیسی نباشد.
- از علائم markdown مثل ** یا * یا # استفاده نکن.
- اعداد را فارسی بنویس: ۱ میلیون، ۲ میلیارد، ۵۰۰ هزار تومان.
- برای هر ملک یک خط جدا بنویس با این فرمت:
  🏠 [عنوان ملک] — [قیمت به فارسی] — [موقعیت]
- بعد از لیست، یک جمله کوتاه راهنما بنویس.
`;

async function callGroq(messages: any[], systemPrompt = SYSTEM_PROMPT) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Groq Error:", errorText);
    throw new Error("Groq API failed");
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content as string;
}

// حذف کاراکترهای markdown از پاسخ
function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/#{1,6}\s/g, "")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .trim();
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ message: "Invalid messages" }, { status: 400 });
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user");

    const intent = lastUserMessage
      ? detectIntent(lastUserMessage.content)
      : "chat";

    // --- جستجوی خانه ---
    if (intent === "search_houses") {
      let filters: Record<string, any> = {};
      try {
        const filterJson = await callGroq(
          [{ role: "user", content: lastUserMessage?.content }],
          FILTER_EXTRACTION_SYSTEM
        );
        filters = JSON.parse(filterJson.trim());
        console.log("Extracted filters:", filters);
      } catch (e) {
        console.error("Filter extraction failed:", e);
      }

      let houses: any[] = [];
      try {
        const result = await searchHouses(filters);
        houses = Array.isArray(result)
          ? result
          : result?.data ?? result?.houses ?? result?.items ?? [];
      } catch (e) {
        console.error("searchHouses Error:", e);
      }

      const summaryPrompt =
        houses.length > 0
          ? `کاربر گفت: "${lastUserMessage?.content}"
نتایج جستجو:
${JSON.stringify(houses.slice(0, 5), null, 2)}

این نتایج را به فارسی کامل توضیح بده. برای هر ملک قیمت را به تومان فارسی بنویس.`
          : `کاربر گفت: "${lastUserMessage?.content}"
هیچ ملکی پیدا نشد. به فارسی بگو و پیشنهاد بده.`;

      const raw = await callGroq(
        [{ role: "user", content: summaryPrompt }],
        SUMMARY_SYSTEM
      );
      return Response.json({ message: cleanMarkdown(raw) || "پاسخی دریافت نشد" });
    }

    // --- چت عادی ---
    const raw = await callGroq(messages);
    return Response.json({ message: cleanMarkdown(raw) || "پاسخی دریافت نشد" });
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json({ message: "خطای سرور" }, { status: 500 });
  }
}