"use client";

import { Award, Star, Clock, Navigation, Share2, MapPin, ExternalLink } from "lucide-react";
import { useTranslations } from 'next-intl';
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import { useState } from "react";

interface OfficeInfoProps {
  rating: number;
  reviews: number;
  hours: string;
  address: string;
  lat: number;
  lng: number;
  name?: string;
}

export default function OfficeInfo({ 
  rating, 
  reviews, 
  hours, 
  address, 
  lat, 
  lng,
  name = "دفتر مرکزی رهن کده"
}: OfficeInfoProps) {
  const t = useTranslations('OfficeInfo');
  const [isOpen, setIsOpen] = useState(false);

  const openGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank"
    );
    setIsOpen(false);
  };

  const openNeshan = () => {
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://neshan.org/search?term=${encodedAddress}`,
      "_blank"
    );
    setIsOpen(false);
  };

  const openBalad = () => {
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://balad.ir/search?q=${encodedAddress}`,
      "_blank"
    );
    setIsOpen(false);
  };

  const shareAddress = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: address,
        url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
      });
    } else {
      navigator.clipboard.writeText(address);
      alert(t('addressCopied'));
    }
    setIsOpen(false);
  };

  return (
    <AdvancedScrollAnimation type="fade" delay={0.3}>
      <div className="max-w-7xl mx-auto mt-12 px-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
          <div className="flex flex-wrap items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <Award className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                  {name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <MapPin size={12} />
                  {address.length > 50 ? address.substring(0, 50) + "..." : address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 fill-yellow-500" size={18} />
              <span className="font-bold text-gray-800 dark:text-white">
                {rating}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                ({reviews} {t('reviewsLabel')})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} className="text-blue-600" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {hours}
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <Navigation size={16} />
                {t('navigation')}
                <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                  <div className="absolute top-full -left-6 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 overflow-hidden border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={openNeshan}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full text-right border-b border-gray-100 dark:border-gray-700"
                    >
                      <span className="text-xl">🇮🇷</span>
                      <div>
                        <p className="font-medium text-sm text-green-600 dark:text-green-400">{t('neshan')}</p>
                        <p className="text-xs text-gray-400">{t('neshanDesc')}</p>
                      </div>
                      <ExternalLink size={14} className="mr-auto text-gray-400" />
                    </button>
                    
                    <button
                      onClick={openBalad}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full text-right border-b border-gray-100 dark:border-gray-700"
                    >
                      <span className="text-xl">🗺️</span>
                      <div>
                        <p className="font-medium text-sm text-blue-600 dark:text-blue-300">{t('balad')}</p>
                        <p className="text-xs text-gray-400">{t('baladDesc')}</p>
                      </div>
                      <ExternalLink size={14} className="mr-auto text-gray-400" />
                    </button>
                    
                    <button
                      onClick={openGoogleMaps}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full text-right border-b border-gray-100 dark:border-gray-700"
                    >
                      <span className="text-xl">🌍</span>
                      <div>
                        <p className="font-medium text-sm text-red-600 dark:text-red-400">{t('googleMaps')}</p>
                        <p className="text-xs text-gray-400">{t('googleMapsDesc')}</p>
                      </div>
                      <ExternalLink size={14} className="mr-auto text-gray-400" />
                    </button>
                    
                    <button
                      onClick={shareAddress}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full text-right"
                    >
                      <Share2 size={16} />
                      <div>
                        <p className="font-medium text-sm">{t('share')}</p>
                        <p className="text-xs text-gray-400">{t('shareDesc')}</p>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdvancedScrollAnimation>
  );
}