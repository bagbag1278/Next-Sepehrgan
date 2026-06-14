"use client";
import { useTranslations } from 'next-intl';
import { MapPin, Mail, Phone } from "lucide-react";

const ContactInfoCards = () => {
  const t = useTranslations('ContactPage');

  return (
    <div className="flex flex-wrap justify-center gap-10 my-16 text-[rgb(6,4,37)]">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-bold text-sm dark:text-white">{t('addressTitle')}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('addressValue')}</p>
        </div>
        <MapPin className="text-blue-600" size={24} />
      </div>
    
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-bold text-sm dark:text-white">{t('emailTitle')}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('emailValue')}</p>
        </div>
        <Mail className="text-blue-600" size={24} />
      </div>
    
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-bold text-sm dark:text-white">{t('phoneTitle')}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('phoneValue')}</p>
        </div>
        <Phone className="text-blue-600" size={24} />
      </div>
    </div>
  );
};

export default ContactInfoCards;