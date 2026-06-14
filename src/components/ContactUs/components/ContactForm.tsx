"use client";
import { useState, memo } from "react";
import { useTranslations } from 'next-intl';
import { toast } from "react-hot-toast";
import { Mail } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import TallerFleshGreen from "@/app/(main)/contactus/icon/FleshGreen/TallerFleshGreen";
import LeftFleshGreen from "@/app/(main)/contactus/icon/FleshGreen/LeftFleshGreen";
import RightFleshGreen from "@/app/(main)/contactus/icon/FleshGreen/RightFleshGreen";


const ContactForm = memo(() => {
  const t = useTranslations('ContactPage');
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!formData.title || !formData.message) {
      toast.error(t('fillAllFields'));
      return;
    }

    const loadingToast = toast.loading(t('sendingMessage'));
    setLoading(true);

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  return (
    <AdvancedScrollAnimation type="slide-right" delay={0.1} duration={0.6}>
      <div className="relative p-8 rounded-[40px] shadow-blue-100/50">
        <div className="mb-6 text-center">
          <p className="text-[rgb(6,4,37)] dark:text-blue-200 font-bold underline decoration-blue-200 underline-offset-8">
            {t('formTitle')}
          </p>
          <div className="max-[1055px]:hidden absolute top-130">
            <div className="absolute right-100 bottom-25"><TallerFleshGreen /></div>
            <div className="absolute rotate-90 right-126 bottom-25">
              <div className="absolute -left-[25px]"><LeftFleshGreen /></div>
              <div className="rotate-180 absolute">
                <div className="absolute -bottom-0.5"><RightFleshGreen /></div>
              </div>
            </div>
          </div>
          <h2 className="text-blue-700 font-black text-xl mt-2">{t('formSubtitle')}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder={t('namePlaceholder')}
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-4 rounded-2xl outline-none border border-[#0887CA80] dark:border-[#0887CA]/50 text-[#0887CAB2] dark:text-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder={t('emailPlaceholder')}
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-4 rounded-2xl outline-none border border-[#0887CA80] dark:border-[#0887CA]/50 text-[#0887CAB2] dark:text-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={20} />
          </div>

          <textarea
            name="message"
            rows={4}
            placeholder={t('messagePlaceholder')}
            value={formData.message}
            onChange={handleInputChange}
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

        <img src="/green-arrow.png" className="absolute -left-12 -bottom-10 w-24 hidden lg:block" alt="" />
      </div>
    </AdvancedScrollAnimation>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;