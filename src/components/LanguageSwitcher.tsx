"use client";
import { useRouter } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const languages = [
  { code: 'fa', name: 'فارسی', flag: '🇮🇷', dir: 'rtl' },
  { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
];

const setCookie = (name: string, value: string, days: number = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const LanguageSwitcher = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState('fa');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLocale = getCookie('NEXT_LOCALE');
    if (savedLocale && languages.some(l => l.code === savedLocale)) {
      setCurrentLocale(savedLocale);
    }
  }, []);

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  const switchLanguage = (newLocale: string) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }
    
    // ذخیره زبان در کوکی
    setCookie('NEXT_LOCALE', newLocale);
    setCurrentLocale(newLocale);
    
    // تغییر جهت صفحه
    const newDir = languages.find(l => l.code === newLocale)?.dir || 'rtl';
    document.documentElement.dir = newDir;
    document.documentElement.lang = newLocale;
    
    setIsOpen(false);
    
    window.location.reload();
  };

  if (!mounted) {
    return <div className="w-24 h-10"></div>;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
      >
        <Globe size={18} className="text-gray-600 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
         {currentLanguage.name}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  currentLocale === lang.code
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span>{lang.name}</span>
                {currentLocale === lang.code && (
                  <span className="mr-auto text-xs text-blue-500">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;