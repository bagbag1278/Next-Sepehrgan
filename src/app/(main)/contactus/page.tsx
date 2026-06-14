"use client";
import React, { useState } from "react";
import { useTranslations } from 'next-intl';
import { toast } from "react-hot-toast";
import dynamic from 'next/dynamic';
import TallerFleshBlue from "./icon/FleshBlue/TallerFleshBlue";
import FleshBlueLeft from "./icon/FleshBlue/FleshBlueLeft";
import FleshBlueRight from "./icon/FleshBlue/FleshBlueRight";
import LocationSlider from "./components/LocationSlider";
import { Mail, MapPin, Phone } from "lucide-react";
import TallerFleshGreen from "./icon/FleshGreen/TallerFleshGreen";
import LeftFleshGreen from "./icon/FleshGreen/LeftFleshGreen";
import RightFleshGreen from "./icon/FleshGreen/RightFleshGreen";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import OfficeInfo from "./components/OfficeInfo";
import { useTranslations } from "next-intl";

const MapComponent = dynamic(
  () => import('./components/MapComponent'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-tl-[42px] rounded-br-[42px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0887CAB2] mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">در حال بارگذاری نقشه...</p>
        </div>
      </div>
    )
  }
);

const ContactPage = () => {
  const t = useTranslations('ContactPage');
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.message) {
      toast.error(t('fillAllFields'));
      return;
    }

    const loadingToast = toast.loading(t('sendingMessage'));
    setLoading(true);

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          message: formData.message,
          email: formData.email,
        }),
      });

      if (response.ok) {
        toast.success(t('messageSent'), { id: loadingToast });
        setFormData({ title: "", message: "", email: "" });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || t('serverError'), { id: loadingToast });
      }
    } catch (error) {
      console.error("ارور در ارسال:", error);
      toast.error(t('connectionError'), { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

 const officeInfo = {
  name: "دفتر مرکزی رهن کده",
  address: "تهران، خیابان ولیعصر، تقاطع خیابان ملاصدرا، پلاک ۱۲۳",
  phone: "۰۲۱-۸۸۷۶۵۴۳۲",
  mobile: "۰۹۱۲-۱۲۳-۴۵۶۷",
  email: "info@rahnkadeh.com",
  hours: "شنبه تا چهارشنبه ۹ صبح تا ۶ عصر",
  rating: 4.8,
  reviews: 127,
  lat: 35.7596,
  lng: 51.4007
};

  return (
    <div className="w-full min-h-screen pb-20 font-sans" dir="rtl">
      {/* Hero Section */}
      <section className="text-center pt-16 pb-10 relative">
        <AdvancedScrollAnimation type="fade" delay={0.1}>
          <h1 className="text-2xl md:text-3xl font-black dark:text-white text-[rgb(6,4,37)]">
            {t('heroTitle')}
          </h1>
        </AdvancedScrollAnimation>
        
        <div className="absolute -right-10 -top-10 max-[1390]:hidden">
          <TallerFleshBlue />
          <div className="right-148 bottom-23 relative">
            <div className="rotate-12">
              <FleshBlueLeft />
            </div>
            <div>
              <FleshBlueRight />
            </div>
          </div>
        </div>
        
        <AdvancedScrollAnimation type="slide-up" delay={0.2}>
          <p className="text-gray-500 text-sm mt-4 max-w-lg mx-auto leading-relaxed dark:text-gray-300">
            {t('heroSubtitle')}
          </p>
        </AdvancedScrollAnimation>
 
        <AdvancedScrollAnimation type="scale" delay={0.3}>
          <div className="mt-6 flex justify-center">
            <button className="bg-[#F5F5F5] dark:bg-gray-800 shadow-[8px_0px_20px_rgba(8,135,202,0.30)] border-gray-200 w-35 h-12 text-blue-100 dark:text-[#28A5E6] font-bold cursor-pointer text-[18px] rounded-2xl">
              {t('registerButton')}
            </button>
          </div>
        </AdvancedScrollAnimation>
        
        <img
          src="/arrow-curve.png"
          className="absolute top-10 left-1/4 w-32 hidden md:block"
          alt=""
        />
      </section>

      {/* Location Slider */}
      <AdvancedScrollAnimation type="slide-up" delay={0.1}>
        <LocationSlider />
      </AdvancedScrollAnimation>

      {/* Build Together */}
      <AdvancedScrollAnimation type="fade" delay={0.2}>
        <h2 className="text-[16px] font-medium text-[rgb(6,4,37)] dark:text-gray-300 w-full justify-center flex relative top-10">
          {t('buildTogether')}
        </h2>
      </AdvancedScrollAnimation>

      {/* Contact Info Cards */}
      <div className="flex flex-wrap justify-center gap-10 my-16 text-[rgb(6,4,37)]">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-sm dark:text-white">{t('addressTitle')}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('addressValue')}
            </p>
          </div>
          <MapPin className="text-blue-600" size={24} />
        </div>
      
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-sm dark:text-white">{t('emailTitle')}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('emailValue')}
            </p>
          </div>
          <Mail className="text-blue-600" size={24} />
        </div>
      
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-sm dark:text-white">{t('phoneTitle')}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('phoneValue')}
            </p>
          </div>
          <Phone className="text-blue-600" size={24} />
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 max-[1300px]:gap-20 px-6">
        {/* Form Section */}
        <AdvancedScrollAnimation type="slide-right" delay={0.1} duration={0.6}>
          <div className="relative p-8 rounded-[40px] shadow-blue-100/50">
            <div className="mb-6 text-center">
              <p className="text-[rgb(6,4,37)] dark:text-blue-200 font-bold underline decoration-blue-200 underline-offset-8">
                {t('formTitle')}
              </p>
              <div className="max-[1055px]:hidden absolute top-130">
                <div className="absolute right-100 bottom-25">
                  <TallerFleshGreen />
                </div>
                <div className="absolute rotate-90 right-126 bottom-25">
                  <div className="absolute -left-[25px]">
                    <LeftFleshGreen />
                  </div>
                  <div className="rotate-180 absolute">
                    <div className="absolute -bottom-0.5">
                      <RightFleshGreen />
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-blue-700 font-black text-xl mt-2">
                {t('formSubtitle')}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder={t('namePlaceholder')}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-4 rounded-2xl outline-none border border-[#0887CA80] dark:border-[#0887CA]/50 text-[#0887CAB2] dark:text-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              <div className="relative">
                <input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-4 rounded-2xl outline-none border border-[#0887CA80] dark:border-[#0887CA]/50 text-[#0887CAB2] dark:text-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={20} />
              </div>

              <textarea
                rows={4}
                placeholder={t('messagePlaceholder')}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-4 rounded-2xl outline-none border border-[#0887CA80] dark:border-[#0887CA]/50 text-[#0887CAB2] dark:text-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[rgb(16,8,143)] dark:bg-blue-700 text-white rounded-2xl font-bold shadow-xl hover:bg-blue-900 dark:hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('sending') : t('sendButton')}
              </button>
            </form>

            <img
              src="/green-arrow.png"
              className="absolute -left-12 -bottom-10 w-24 hidden lg:block"
              alt=""
            />

        {/* Map Section */}
        <AdvancedScrollAnimation type="slide-left" delay={0.2} duration={0.6}>
          <div className="rounded-tl-[42px] rounded-br-[42px] z-10 overflow-hidden shadow-lg border-8 border-white dark:border-gray-800 w-full h-[500px] bg-white dark:bg-gray-800">
            <MapComponent officeInfo={officeInfo} />
          </div>
        </AdvancedScrollAnimation>
      </section>

      {/* Office Info - استفاده از کامپوننت جداگانه */}
      <OfficeInfo
        rating={officeInfo.rating}
        reviews={officeInfo.reviews}
        hours={officeInfo.hours}
        address={officeInfo.address}
        lat={officeInfo.lat}
        lng={officeInfo.lng}
        name={officeInfo.name}
      />
    </div>
  );
};

export default ContactPage;
