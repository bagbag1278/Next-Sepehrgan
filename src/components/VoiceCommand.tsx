"use client";
import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const VoiceCommand = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const router = useRouter();

  const commands: { [key: string]: () => void } = {
    'صفحه اصلی': () => router.push('/'),
    'بلاگ': () => router.push('/blog'),
    'وبلاگ': () => router.push('/blog'),
    'رزرو سریع': () => router.push('/housereserve'),
    'رهن و اجاره': () => router.push('/houserent'),
    'درباره ما': () => router.push('/contactus'),
    'ورود': () => router.push('/login'),
    'ثبت نام': () => router.push('/register'),
    'داشبورد': () => router.push('/admin/AdminDashboard'),
    'هتل ها': () => router.push('/admin/HotelsManagement'),
    'کاربران': () => router.push('/admin/UsersManagment'),
    'رزروها': () => router.push('/admin/BookingsManagement'),
    
    'home': () => router.push('/'),
    'blog': () => router.push('/blog'),
    'go to blog': () => router.push('/blog'),
    'quick reserve': () => router.push('/housereserve'),
    'mortgage': () => router.push('/houserent'),
    'about us': () => router.push('/contactus'),
    'login': () => router.push('/login'),
    'register': () => router.push('/register'),
    'dashboard': () => router.push('/admin/AdminDashboard'),
    'hotels': () => router.push('/admin/HotelsManagement'),
    'users': () => router.push('/admin/UsersManagment'),
    'bookings': () => router.push('/admin/BookingsManagement'),
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'fa-IR';
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const command = transcript.toLowerCase().trim();
        
        console.log('شنیده شد:', command);
        toast.success(`گفتید: ${transcript}`);
        
        let executed = false;
        for (const [key, action] of Object.entries(commands)) {
          if (command.includes(key.toLowerCase())) {
            action();
            executed = true;
            toast.success(`در حال رفتن به ${key}...`);
            break;
          }
        }
        
        if (!executed) {
          toast.error(`دستور "${transcript}" شناسایی نشد`);
        }
        
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('خطا:', event.error);
        toast.error('خطا در دریافت صدا');
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    } else {
      console.warn('مرورگر از Speech Recognition پشتیبانی نمی‌کند');
    }
  }, [router]);

  const startListening = () => {
    if (!recognition) {
      toast.error('مرورگر شما از فرمان صوتی پشتیبانی نمی‌کند');
      return;
    }
    
    try {
      recognition.start();
      setIsListening(true);
      toast.success('در حال گوش کردن... یک دستور بگویید');
    } catch (error) {
      console.error(error);
      toast.error('خطا در شروع ضبط صدا');
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      className={`fixed bottom-17 left-4 z-999 p-2 rounded-full shadow-lg transition-all duration-300 ${
        isListening 
          ? 'bg-red-500 animate-pulse' 
          : 'bg-[#0887CAB2] hover:bg-[#0887CA]/90'
      } text-white`}
      title={isListening ? 'در حال گوش کردن... کلیک کنید تا متوقف شود' : 'کلیک کنید و یک فرمان بگویید'}
    >
      {isListening ? <MicOff size={24} /> : <Mic size={24} />}
    </button>
  );
};

export default VoiceCommand;