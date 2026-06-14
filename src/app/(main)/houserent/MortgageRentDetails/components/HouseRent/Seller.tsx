"use client";
import React from "react";
import { useTranslations } from 'next-intl';
import { MessageCircle } from "lucide-react";

interface SellerProps {
  sellerName?: string;
  sellerId?: number;
  price?: string;
  discountedPrice?: string;
  lastUpdated?: string;
}

const Seller = ({ sellerName, sellerId, price, discountedPrice, lastUpdated }: SellerProps) => {
  const t = useTranslations('Seller');
  
  const date = lastUpdated 
    ? new Date(lastUpdated).toLocaleDateString("fa-IR") 
    : t('defaultDate');  

  const avatar = `https://ui-avatars.com/api/?name=${sellerName || 'Admin'}&background=0887CA&color=fff&bold=true&size=60`;

  const displayPrice = price ? Number(price).toLocaleString() : t('negotiable');
  const displayDiscountedPrice = discountedPrice ? Number(discountedPrice).toLocaleString() : displayPrice;

  return (
    <div className="w-107 max-[600px]:w-90 h-auto dark:text-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 bg-white rounded-[40px] p-6 shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl" dir="rtl">
      
      <div className="relative">
        <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-[#0887CA]/10 to-[#10088F]/10 rounded-full blur-2xl"></div>
        
        <h3 className="text-[#10088F] dark:text-white font-black text-[15px] text-center mb-6 flex items-center justify-center gap-2">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#10088F] dark:to-white"></span>
          {t('priceAndContact')}
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#10088F] dark:to-white"></span>
        </h3>

        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0887CA] to-[#10088F] animate-pulse opacity-20"></div>
            <div className="w-[70px] h-[70px] rounded-full border-4 border-green-400/50 overflow-hidden shadow-lg relative z-10">
              <img 
                src={avatar} 
                alt={sellerName} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h4 className="text-[#060425] dark:text-white font-bold text-[18px]">
            {sellerName || t('defaultSeller')}
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-[#94A3B8] dark:text-gray-400 text-[12px] font-medium">{t('memberSince')}</span>
            <span className="text-[#0887CA] dark:text-blue-900 text-[12px] font-bold">{date}</span>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-6"></div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-center p-3 rounded-2xl bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/20">
            <span className="text-[#64748B] dark:text-gray-300 text-[14px] font-bold">{t('mortgagePrice')}</span>
            <div className="flex items-center gap-1">
              <span className="text-[#0887CA] dark:text-blue-400 text-[18px] font-black">
                {displayPrice}
              </span>
              <span className="text-[#0887CA] dark:text-blue-400 text-[11px] font-bold">{t('toman')}</span>
            </div>
          </div>

          {discountedPrice && discountedPrice !== price && (
            <div className="flex justify-between items-center p-3 rounded-2xl bg-gradient-to-r from-green-50/50 to-transparent dark:from-green-900/20">
              <span className="text-[#64748B] dark:text-gray-300 text-[14px] font-bold">{t('rentPrice')}</span>
              <div className="flex items-center gap-1">
                <span className="text-[#15977D] dark:text-green-400 text-[18px] font-black">
                  {displayDiscountedPrice}
                </span>
                <span className="text-[#15977D] dark:text-green-400 text-[11px] font-bold">{t('toman')}</span>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col gap-3 mt-8">
          <button className="w-full h-12 bg-gradient-to-r from-[#15977D] to-[#0e6e5a] hover:from-[#0e6e5a] hover:to-[#0a5244] text-white rounded-[18px] text-[16px] font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
            {t('contact')} {sellerId || "0911..."}
          </button>

          <button className="w-full flex items-center justify-center gap-3 py-3 rounded-[18px] bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group">
            <span className="text-[#005EA4] dark:text-blue-400 text-[14px] font-bold group-hover:gap-3 transition-all">
              {t('chatWithSeller')}
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#005EA4] to-[#0887CA] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <MessageCircle size={16} className="text-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Seller;