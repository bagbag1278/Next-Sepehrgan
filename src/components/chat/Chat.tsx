"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal, X, MessageCircle } from "lucide-react";

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

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

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
        {
          role: "assistant",
          content: "خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function renderMessage(content: string) {
    const lines = content.split("\n").filter((l) => l.trim() !== "");
    return lines.map((line, i) => (
      <p key={i} className={`${i > 0 ? "mt-2" : ""} leading-7`}>
        {line}
      </p>
    ));
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-29 left-4 z-50 h-10 w-10 rounded-full bg-blue-200 text-white shadow-lg flex items-center justify-center hover:bg-blue-500 transition-all hover:scale-105 active:scale-95"
        aria-label="باز کردن مشاور هوشمند"
      >
        <MessageCircle size={24} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div
          className="fixed bottom-24 left-6 z-9999 flex flex-col w-[420px] h-[560px] rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden"
          dir="rtl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-base">
                🏠
              </div>
              <div>
                <h1 className="text-sm font-bold">مشاور هوشمند املاک</h1>
                <p className="text-xs text-zinc-500">همیشه در دسترس</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="بستن"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3" dir="ltr">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center pb-4">
                <div className="text-4xl">🏡</div>
                <div>
                  <h2 className="text-base font-bold mb-1">
                    چطور می‌توانم کمک کنم؟
                  </h2>
                  <p className="text-zinc-500 text-xs">
                    جستجوی ملک، مشاوره خرید، اجاره و رهن
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-xl border border-blue-300 bg-blue-50 px-3 py-2 text-xs text-right transition hover:bg-blue-100 cursor-pointer text-blue-800"
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
                className={`flex gap-2 mb-2 ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="shrink-0 h-7 w-7 rounded-lg bg-blue-100 flex items-center justify-center text-xs mt-1">
                    🏠
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-end text-xs ${
                    message.role === "user"
                      ? "bg-blue-500 text-white rounded-tr-sm"
                      : "bg-blue-400 text-white rounded-tl-sm"
                  }`}
                >
                  {renderMessage(message.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 mb-2">
                <div className="shrink-0 h-7 w-7 rounded-lg bg-blue-100 flex items-center justify-center text-xs">
                  🏠
                </div>
                <div className="bg-slate-400 rounded-2xl rounded-tl-sm px-3 py-2">
                  <div className="flex gap-1 items-center h-4">
                    <span
                      className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 p-3 flex-shrink-0">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 focus-within:border-zinc-400 transition">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="پیام خود را بنویسید..."
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-zinc-400 py-1.5"
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
                className="shrink-0 rounded-lg bg-blue-600 p-1.5 transition hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <SendHorizonal size={13} className="text-white rotate-180" />
              </button>
            </div>
            <p className="text-center text-[10px] text-zinc-400 mt-1.5">
              مشاور هوشمند می‌تواند اشتباه کند. اطلاعات مهم را تأیید کنید.
            </p>
          </div>
        </div>
      )}
    </>
  );
}