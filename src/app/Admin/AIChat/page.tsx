"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// کلید API Claude
const CLAUDE_API_KEY = "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";

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "سلام! من Claude هستم، دستیار هوشمند رهن‌کده. چطور می‌توانم به شما در مدیریت پنل ادمین کمک کنم؟",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const question = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      // درخواست به Claude API
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",
          max_tokens: 1024,
          temperature: 0.7,
          messages: [
            {
              role: "user",
              content: `تو یک دستیار هوشمند برای پنل ادمین سایت رهن‌کده هستی.
              
به سوالات کاربر در مورد موارد زیر پاسخ بده:
- مدیریت هتل‌ها (افزودن، ویرایش، حذف، مشاهده)
- مدیریت رزروها (مشاهده، تایید، لغو، فیلتر)
- مدیریت کاربران (تغییر نقش، ویرایش، حذف، جستجو)
- مدیریت نظرات (تایید، رد، ویرایش، حذف)
- آمار و گزارشات (درآمد، تعداد رزروها، امتیازات)

پاسخ‌ها باید مختصر، مفید و به زبان فارسی باشد.

سوال کاربر: ${question}`,
            },
          ],
        }),
      });

      const data = await response.json();
      
      let botReply = "پاسخی دریافت نشد.";
      if (data.content && data.content[0] && data.content[0].text) {
        botReply = data.content[0].text;
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botReply,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Claude API Error:", error);
      toast.error("خطا در ارتباط با هوش مصنوعی");
      
      // پاسخ محلی در صورت خطا
      const localReply = getLocalResponse(question);
      const botMessage: Message = {
        id: messages.length + 2,
        text: localReply,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // پاسخ‌های محلی (آفلاین)
  const getLocalResponse = (message: string): string => {
    const msg = message.toLowerCase();
    
    if (msg.includes("هتل") || msg.includes("ملک")) {
      return "🏨 **مدیریت هتل‌ها:**\n\n• افزودن هتل جدید: روی دکمه 'افزودن هتل' کلیک کنید\n• ویرایش هتل: روی دکمه 'ویرایش' هر هتل کلیک کنید\n• حذف هتل: هتل‌های بدون رزرو قابل حذف هستند\n• غیرفعال کردن: هتل‌های دارای رزرو قابل غیرفعال هستند";
    }
    if (msg.includes("رزرو")) {
      return "📅 **مدیریت رزروها:**\n\n• مشاهده لیست رزروها\n• فیلتر بر اساس تاریخ و وضعیت\n• تایید یا لغو رزرو\n• مشاهده جزئیات هر رزرو";
    }
    if (msg.includes("کاربر")) {
      return "👥 **مدیریت کاربران:**\n\n• مشاهده لیست کاربران\n• تغییر نقش کاربر (ادمین/کاربر عادی)\n• ویرایش اطلاعات کاربر\n• حذف کاربر";
    }
    if (msg.includes("کامنت") || msg.includes("نظر")) {
      return "💬 **مدیریت نظرات:**\n\n• مشاهده نظرات کاربران\n• تایید یا رد نظرات\n• ویرایش متن نظر\n• حذف نظرات نامناسب";
    }
    if (msg.includes("درآمد") || msg.includes("فروش")) {
      return "💰 **آمار مالی:**\n\n• درآمد کل\n• رزروهای تایید شده\n• میانگین امتیاز کاربران";
    }
    
    return "❓ سوال شما را متوجه نشدم. لطفاً از کلمات کلیدی مثل 'هتل'، 'رزرو'، 'کاربر' یا 'نظر' استفاده کنید.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "سلام! من Claude هستم، دستیار هوشمند رهن‌کده. چطور می‌توانم به شما کمک کنم؟",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    toast.success("چت پاک شد");
  };

  const suggestedQuestions = [
    "چطور هتل جدید اضافه کنم؟",
    "آمار رزروها را بگو",
    "چطور کاربر را به ادمین تبدیل کنم؟",
    "مدیریت نظرات چگونه است؟",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-[0_4px_12px_#0887CA4D]">
      {/* هدر */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-4 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="font-bold text-lg">Claude AI - دستیار هوشمند</h2>
              <p className="text-xs text-purple-100">پاسخگوی سوالات مدیریتی</p>
            </div>
          </div>
          <button onClick={clearChat} className="p-2 rounded-lg hover:bg-white/20 transition-all">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* پیام‌ها */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === "user" ? "bg-green-100" : "bg-purple-100"
              }`}>
                {message.sender === "user" ? <User size={16} className="text-green-600" /> : <Bot size={16} className="text-purple-600" />}
              </div>
              <div className={`p-3 rounded-2xl ${
                message.sender === "user"
                  ? "bg-green-600 text-white rounded-tr-sm"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-tl-sm shadow-md"
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString("fa-IR")}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Bot size={16} className="text-purple-600" />
              </div>
              <div className="p-3 rounded-2xl bg-white shadow-md">
                <Loader2 size={20} className="animate-spin text-purple-600" />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* سوالات پیشنهادی */}
      {messages.length < 3 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">سوالات پیشنهادی:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setInputValue(q)}
                className="px-3 py-1.5 text-xs bg-gray-100 rounded-full hover:bg-purple-100 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ورودی */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="سوال خود را بپرسید..."
            className="flex-1 p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={1}
            style={{ minHeight: "48px", maxHeight: "120px" }}
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="w-12 h-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          پاسخ‌ها توسط Claude AI ارائه می‌شوند
        </p>
      </div>
    </div>
  );
};

export default AIChat;