import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "لطفاً پیام خود را وارد کنید." });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ 
        reply: "API Key تنظیم نشده است. لطفاً با پشتیبان تماس بگیرید." 
      });
    }

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `تو یک دستیار هوشمند برای پنل ادمین سایت رهن‌کده هستی.
            وظیفه تو کمک به ادمین در مدیریت سایت است.
            به سوالات کاربر در مورد موارد زیر پاسخ بده:
            - مدیریت هتل‌ها (افزودن، ویرایش، حذف، مشاهده)
            - مدیریت رزروها (مشاهده، تایید، لغو، فیلتر)
            - مدیریت کاربران (تغییر نقش، ویرایش، حذف، جستجو)
            - مدیریت نظرات (تایید، رد، ویرایش، حذف)
            - آمار و گزارشات (درآمد، تعداد رزروها، امتیازات)
            
            پاسخ‌ها باید مختصر، مفید و به زبان فارسی باشد.`
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    let reply = "پاسخی دریافت نشد.";
    if (data.choices && data.choices[0] && data.choices[0].message) {
      reply = data.choices[0].message.content;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("DeepSeek API Error:", error);
    return NextResponse.json({ 
      reply: "خطا در ارتباط با هوش مصنوعی. لطفاً بعداً تلاش کنید." 
    });
  }
}