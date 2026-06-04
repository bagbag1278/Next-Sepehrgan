"use client";
import React, { useState } from "react";
import { useTranslations } from 'next-intl';
import { toast } from "react-hot-toast";
import dynamic from 'next/dynamic';
import TallerFleshBlue from "./icon/FleshBlue/TallerFleshBlue";
import FleshBlueLeft from "./icon/FleshBlue/FleshBlueLeft";
import FleshBlueRight from "./icon/FleshBlue/FleshBlueRight";
import LocationSlider from "./LocationSlider";
import { Mail, MapPin, Phone, Navigation, Star, Clock, Award } from "lucide-react";
import TallerFleshGreen from "./icon/FleshGreen/TallerFleshGreen";
import LeftFleshGreen from "./icon/FleshGreen/LeftFleshGreen";
import RightFleshGreen from "./icon/FleshGreen/RightFleshGreen";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

const MapComponent = dynamic(
  () => import('./MapComponent'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-tl-[42px] rounded-br-[42px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0887CAB2] mx-auto mb-4"></div>
          <p className="text-gray-500">در حال بارگذاری نقشه...</p>
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
        toast.error(errorData.message || t('serverError'), {
          id: loadingToast,
        });
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
    address: "تهران، خیابان ولیعصر، نبش خیابان ملاصدرا، پلاک ۱۲۳",
    phone: "۰۲۱-۸۸۷۶۵۴۳۲",
    mobile: "۰۹۱۲-۱۲۳-۴۵۶۷",
    email: "info@rahnkadeh.com",
    hours: "شنبه تا چهارشنبه ۹ صبح تا ۶ عصر",
    rating: 4.8,
    reviews: 127
  };

  return (
    <div className="w-full min-h-screen pb-20 font-sans" dir="rtl">
      <section className="text-center pt-16 pb-10 relative">
        <AdvancedScrollAnimation type="fade" delay={0.1}>
          <h1 className="text-2xl md:text-3xl font-black dark:text-white text-[rgb(6,4,37)] ">
            {t('heroTitle')}
          </h1>
        </AdvancedScrollAnimation>
        
        <div className="absolute right- pl-10 -top-10 max-[1390]:hidden ">
          <TallerFleshBlue />
          <div className="right-148 bottom-23 relative">
            <div className="rotate-12">
              <div className="">
                <FleshBlueLeft />
              </div>
            </div>
            <div className="">
              <FleshBlueRight />
            </div>
          </div>
        </div>
        
        <AdvancedScrollAnimation type="slide-up" delay={0.2}>
          <p className="text-gray-500 text-sm mt-4 max-w-lg mx-auto leading-relaxed dark:text-white">
            {t('heroSubtitle')}
          </p>
        </AdvancedScrollAnimation>
 
        <AdvancedScrollAnimation type="scale" delay={0.3}>
          <div className="mt-6 flex justify-center">
            <button className="bg-[#F5F5F5] shadow-[8px_0px_20px_rgba(8,135,202,0.30)] border-gray-200 w-35 h-12 text-blue-100 dark:text-[#28A5E6] font-bold cursor-pointer text-[18px] rounded-2xl">
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

      <AdvancedScrollAnimation type="slide-up" delay={0.1}>
        <LocationSlider />
      </AdvancedScrollAnimation>

      <AdvancedScrollAnimation type="fade" delay={0.2}>
        <h2 className="text-[16px] font-medium text-[rgb(6,4,37)] dark:text-white w-full justify-center flex relative top-10">
          {t('buildTogether')}
        </h2>
      </AdvancedScrollAnimation>

      <div className="flex flex-wrap justify-center gap-10 my-16 text-[rgb(6,4,37)]">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-sm dark:text-white">{t('addressTitle')}</p>
            <p className="text-xs text-gray-500 italic dark:text-white">
              {t('addressValue')}
            </p>
          </div>
          <MapPin className="text-blue-600" size={24} />
        </div>
      
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-sm dark:text-white">{t('emailTitle')}</p>
            <p className="text-xs text-gray-500 italic dark:text-white">
              {t('emailValue')}
            </p>
          </div>
          <Mail className="text-blue-600" size={24} />
        </div>
      
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-sm dark:text-white">{t('phoneTitle')}</p>
            <p className="text-xs text-gray-500 italic dark:text-white">
              {t('phoneValue')}
            </p>
          </div>
          <Phone className="text-blue-600" size={24} />
        </div>
      </div>

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 max-[1300]:gap-20 px-6">
        <AdvancedScrollAnimation type="slide-right" delay={0.1} duration={0.6}>
          <div className="relative p-8 rounded-[40px] shadow-blue-100/50">
            <div className="mb-6 text-center">
              <p className="text-[rgb(6,4,37)] dark:text-blue-200 font-bold underline decoration-blue-200 underline-offset-8">
                {t('formTitle')}
              </p>
              <div className="max-[1055]:hidden">
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
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-4 rounded-2xl outline-none border border-transparen border-[#0887CA80] text-[#0887CAB2]"
              />
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-4 rounded-2xl outline-none border border-transparen border-[#0887CA80] text-[#0887CAB2]"
              />
              <Mail
                className="absolute max-[1138]:right-90 max-[1050]:hidden top-51 right-115 text-blue-600"
                size={24}
              />

              <textarea
                rows={4}
                placeholder={t('messagePlaceholder')}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-4  rounded-2xl outline-none border border-[#0887CA80] text-[#0887CAB2]"
              ></textarea>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[rgb(16,8,143)] text-white rounded-2xl font-bold shadow-xl hover:bg-blue-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('sending') : t('sendButton')}
              </button>
            </form>

            <img
              src="/green-arrow.png"
              className="absolute -left-12 -bottom-10 w-24 hidden lg:block"
              alt=""
            />
          </div>
        </AdvancedScrollAnimation>

        <AdvancedScrollAnimation type="slide-left" delay={0.2} duration={0.6}>
          <div className="rounded-tl-[42px] rounded-br-[42px] z-10 overflow-hidden shadow-lg border-8 border-white w-full h-[500px] bg-white dark:bg-gray-800">
            <MapComponent officeInfo={officeInfo} />
          </div>
        </AdvancedScrollAnimation>
      </section>

      {/* اطلاعات دفتر مرکزی */}
      <AdvancedScrollAnimation type="fade" delay={0.3}>
        <div className="max-w-7xl mx-auto mt-12 px-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <Award className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">دفتر مرکزی رهن کده</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">تهران، خیابان ولیعصر</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500 fill-yellow-500" size={18} />
                <span className="font-bold text-gray-800 dark:text-white">{officeInfo.rating}</span>
                <span className="text-gray-500">({officeInfo.reviews} نظر)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-blue-600" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{officeInfo.hours}</span>
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2">
                <Navigation size={16} />
                مسیریابی
              </button>
            </div>
          </div>
        </div>
      </AdvancedScrollAnimation>
    </div>
  );
};

export default ContactPage;