// components/VoiceInput.tsx
"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  lang?: "fa" | "en" | "ar";
  onError?: (error: string) => void;
}

export default function VoiceInput({
  onTranscript,
  value = "",
  onChange,
  placeholder = "جستجو کنید...",
  className = "",
  lang = "fa",
  onError,
}: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [recognition, setRecognition] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [interimText, setInterimText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // بررسی پشتیبانی مرورگر
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setIsSupported(false);
      setErrorMessage("مرورگر شما از ورودی صوتی پشتیبانی نمی‌کند");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = lang === "fa" ? "fa-IR" : lang === "ar" ? "ar-EG" : "en-US";

    recognitionInstance.onstart = () => {
      setIsListening(true);
      setIsLoading(false);
      setInterimText("");
      setErrorMessage("");
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
      setIsLoading(false);
      setInterimText("");
    };

    recognitionInstance.onresult = (event: any) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      setInterimText(interim);

      if (final) {
        onTranscript(final);
        if (onChange) {
          const fakeEvent = {
            target: { value: final }
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(fakeEvent);
        }
        recognitionInstance.stop();
      }
    };

    recognitionInstance.onerror = (event: any) => {
      console.log("Speech recognition event:", event.error);
      
      // مدیریت انواع خطاها
      switch (event.error) {
        case "no-speech":
          // این خطا طبیعی است - کاربر صحبت نکرده
          setErrorMessage("صدایی تشخیص داده نشد، لطفاً دوباره تلاش کنید");
          if (onError) onError("no-speech");
          break;
        case "not-allowed":
          setErrorMessage("دسترسی به میکروفون مجاز نیست");
          if (onError) onError("not-allowed");
          break;
        case "network":
          setErrorMessage("مشکل در اتصال شبکه");
          if (onError) onError("network");
          break;
        case "aborted":
          // کاربر ضبط را متوقف کرده
          break;
        default:
          setErrorMessage("خطا در تشخیص صدا");
          if (onError) onError(event.error);
      }
      
      setIsListening(false);
      setIsLoading(false);
      
      // پس از 3 ثانیه خطا را پاک کن
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.abort();
      }
    };
  }, [lang, onTranscript, onChange, onError]);

  const startListening = () => {
    if (!recognition) return;
    setErrorMessage("");
    setIsLoading(true);
    try {
      recognition.start();
    } catch (error) {
      console.error("Error starting recognition:", error);
      setIsLoading(false);
      setErrorMessage("خطا در راه‌اندازی میکروفون");
    }
  };

  const stopListening = () => {
    if (!recognition) return;
    try {
      recognition.stop();
    } catch (error) {
      console.error("Error stopping recognition:", error);
    }
    setIsListening(false);
    setIsLoading(false);
  };

  if (!isSupported) {
    return (
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-not-allowed" title="مرورگر شما از ورودی صوتی پشتیبانی نمی‌کند">
          <MicOff size={18} />
        </div>
      </div>
    );
  }

  const displayValue = isListening && interimText ? interimText : value;

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={displayValue}
        onChange={onChange}
        placeholder={isListening ? "در حال گوش دادن..." : placeholder}
        className={`${className} ${isListening ? "border-red-400 ring-2 ring-red-200 dark:ring-red-800" : ""}`}
        readOnly={isListening}
      />
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 focus:outline-none ${
          isListening
            ? "text-red-500"
            : isLoading
            ? "text-yellow-500"
            : "text-gray-400 hover:text-blue-500"
        }`}
        disabled={isLoading}
        title={isListening ? "توقف ضبط" : "شروع ضبط صدا"}
      >
        {isLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : isListening ? (
          <div className="relative">
            <Mic size={18} className="animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          </div>
        ) : (
          <Mic size={18} />
        )}
      </button>
      
      {/* نمایش پیام خطا */}
      {errorMessage && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-red-500 dark:text-red-400 text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
}