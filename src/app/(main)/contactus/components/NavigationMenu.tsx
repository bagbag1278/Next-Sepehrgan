// components/Contact/NavigationMenu.tsx
"use client";

import { Navigation, MapPin, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";

interface NavigationMenuProps {
  lat: number;
  lng: number;
  address: string;
  placeName?: string;
}

export default function NavigationMenu({ lat, lng, address, placeName }: NavigationMenuProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
    setIsOpen(false);
  };

  const openWaze = () => {
    window.open(
      `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes`,
      "_blank"
    );
    setIsOpen(false);
  };

  const openNeshan = () => {
    window.open(
      `https://neshan.org/maps/@${lat},${lng},15.0z`,
      "_blank"
    );
    setIsOpen(false);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setIsOpen(false);
  };

  const shareAddress = () => {
    if (navigator.share) {
      navigator.share({
        title: placeName || "دفتر مرکزی رهن کده",
        text: address,
        url: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      });
    } else {
      copyAddress();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
      >
        <Navigation size={16} />
        مسیریابی
      </button>

      {isOpen && (
        <>
          {/* بکدراپ */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* منو */}
          <div className="absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 overflow-hidden">
            <button
              onClick={openGoogleMaps}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full text-right"
            >
              <span className="text-xl">🗺️</span>
              <div>
                <p className="font-medium text-sm">گوگل مپ</p>
                <p className="text-xs text-gray-400">مسیریابی با Google Maps</p>
              </div>
            </button>
            
            <button
              onClick={openWaze}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full text-right"
            >
              <span className="text-xl">🧭</span>
              <div>
                <p className="font-medium text-sm">ویز</p>
                <p className="text-xs text-gray-400">مسیریابی با Waze</p>
              </div>
            </button>
            
            <button
              onClick={openNeshan}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full text-right"
            >
              <span className="text-xl">🇮🇷</span>
              <div>
                <p className="font-medium text-sm">نشان</p>
                <p className="text-xs text-gray-400">مسیریابی با نشان (نقشه ایرانی)</p>
              </div>
            </button>
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            
            <button
              onClick={shareAddress}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full text-right"
            >
              <Share2 size={18} />
              <div>
                <p className="font-medium text-sm">اشتراک‌گذاری</p>
                <p className="text-xs text-gray-400">ارسال آدرس برای دیگران</p>
              </div>
            </button>
            
            <button
              onClick={copyAddress}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full text-right"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              <div>
                <p className="font-medium text-sm">کپی آدرس</p>
                <p className="text-xs text-gray-400">ذخیره در کلیپ‌بورد</p>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}