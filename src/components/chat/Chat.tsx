"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "یک خانه تا ۷۰۰ میلیون تومان پیدا کن",
  "آپارتمان سه خوابه در تهران",
  "ویلا برای اجاره در شمال",
  "رهن کامل در اصفهان",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const content = text ?? input;
    if (!content.trim() || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // تبدیل متن به پاراگراف‌های جداگانه
  function renderMessage(content: string) {
    const lines = content.split("\n").filter((l) => l.trim() !== "");
    return lines.map((line, i) => (
      <p key={i} className={`${i > 0 ? "mt-2" : ""} leading-8`}>
        {line}
      </p>
    ));
  }

  return (
    <div className="flex h-screen" dir="rtl">
      <div className="mx-auto flex w-full max-w-3xl flex-col">

        {/* Header */}
        <div className="border-b border-zinc-800/60 px-6 py-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-lg">
            🏠
          </div>
          <div>
            <h1 className="text-base font-bold">مشاور هوشمند املاک</h1>
            <p className="text-xs text-zinc-500">همیشه در دسترس</p>
          </div>
        </div>

        {/* Messages */}
        <div dir="ltr" className="flex-1 overflow-y-auto px-4 py-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center pb-10">
              <div className="text-5xl">🏡</div>
              <div>
                <h2 className="text-2xl font-bold mb-1">چطور می‌توانم کمک کنم؟</h2>
                <p className="text-zinc-500 text-sm">جستجوی ملک، مشاوره خرید، اجاره و رهن</p>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="rounded-xl border border-blue-300 bg-blue-50 px-4 py-3 text-sm text-right transition hover:bg-blue-300/35 cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* آواتار */}
              {message.role === "assistant" && (
                <div className="shrink-0 h-8 w-8 rounded-lg bg-blue-200 flex items-center justify-center text-sm mt-1">
                  🏠
                </div>
              )}

              {/* محتوا */}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-end text-sm ${
                  message.role === "user"
                    ? "bg-blue-200 text-white rounded-tr-sm"
                    : "bg-blue-400 text-zinc-100 rounded-tl-sm"
                }`}
              >
                {renderMessage(message.content)}
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="flex gap-3">
              <div className="shrink-0 h-8 w-8 rounded-lg bg-blue-200 flex items-center justify-center text-sm">
                🏠
              </div>
              <div className="bg-slate-500 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-5">
                  <span className="w-2 h-2 bg-zinc-100 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-zinc-100 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-zinc-100 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-zinc-800/60 p-4">
          <div className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-slate-300 px-4 py-2 focus-within:border-zinc-600 transition">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-600 py-2"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="shrink-0 rounded-xl bg-blue-600 p-2.5 transition hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <SendHorizonal size={16} className="text-white rotate-180"/>
            </button>
          </div>
          <p className="text-center text-xs text-zinc-700 mt-2">
            مشاور هوشمند می‌تواند اشتباه کند. اطلاعات مهم را تأیید کنید.
          </p>
        </div>
      </div>
    </div>
  );
}