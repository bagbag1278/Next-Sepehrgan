"use client";

import { useState } from "react";
import { ArrowBigLeft, Send, X } from "lucide-react";

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MockChatModal({
    isOpen,
    onClose,
}: ChatModalProps) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<string[]>([]);

    if (!isOpen) return null;

    const handleSend = () => {
        if (!message.trim()) return;

        setMessages((prev) => [...prev, message]);
        setMessage("");
    };

    return (
        <div
            className="
                fixed
                mb-20
                inset-0
                z-2000
                flex
                items-center
                justify-center
                bg-black/40
            "
        >
            <div
                className="
                    bg-white
                    dark:bg-slate-900
                    rounded-2xl
                    shadow-2xl
                    flex
                    flex-col
                    overflow-hidden
                "
                style={{
                    width: "400px",
                    height: "600px",
                }}
            >
                {/* Header */}

                <div className="h-16 border-b bg-blue-900  dark:border-slate-700 flex items-center justify-between px-5">
                    <h2 className="font-bold text-lg text-white dark:text-white">
                        ارسال پیام
                    </h2>

                    <button
                        onClick={onClose}
                        className="
                            w-9
                            h-9
                            rounded-full
                            flex
                            items-center
                            justify-center
                           
                           text-white 
                           dark:text-white
                        "
                    >
                        <ArrowBigLeft size={18} />
                    </button>
                </div>

                {/* Messages */}

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className="
                                max-w-[80%]
                                mr-auto
                                bg-blue-600
                                text-white
                                rounded-2xl
                                px-4
                                py-3
                                break-words
                            "
                        >
                            {msg}
                        </div>
                    ))}
                </div>

                {/* Input */}

                <div className="border-t bg-blue-900 dark:border-slate-700 p-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            placeholder="پیام خود را بنویسید..."
                            className="
                                flex-1
                                h-12
                                rounded-2xl
                                border
                                dark:bg-slate-800
                                dark:border-slate-700
                                px-4
                                outline-none
                                text-white
                                dark:text-white
                            "
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSend();
                                }
                            }}
                        />

                        <button
                            onClick={handleSend}
                            className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-blue-600
                                text-white
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}