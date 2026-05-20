"use client";
import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import TallerFleshBlue from "./icon/FleshBlue/TallerFleshBlue";
import FleshBlueLeft from "./icon/FleshBlue/FleshBlueLeft";
import FleshBlueRight from "./icon/FleshBlue/FleshBlueRight";
import LocationSlider from "./LocationSlider";
import { Mail, MapPin, Phone } from "lucide-react";
import TallerFleshGreen from "./icon/FleshGreen/TallerFleshGreen";
import LeftFleshGreen from "./icon/FleshGreen/LeftFleshGreen";
import RightFleshGreen from "./icon/FleshGreen/RightFleshGreen";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    email:"",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.message) {
      toast.error("لطفاً تمامی فیلدها را پر کنید");
      return;
    }

    const loadingToast = toast.loading("در حال ارسال پیام...");
    setLoading(true);

    try {
      const response = await fetch("http://next.genzuni.website/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,  
          message: formData.message, 
        }),
      });

      if (response.ok) {
        toast.success("پیام شما با موفقیت ثبت شد", { id: loadingToast });
        setFormData({ title: "", message: "", email:""});
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "خطایی در سرور رخ داد", { id: loadingToast });
      }
    } catch (error) {
      console.error("ارور در ارسال:", error);
      toast.error("خطا در اتصال! اینترنت خود را چک کنید", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="w-full bg-[#FDFDFD] min-h-screen pb-20 font-sans" dir="rtl">
      <section className="text-center pt-16 pb-10 relative">
        <h1 className="text-2xl md:text-3xl font-black dark:text-white text-[rgb(6,4,37)]">
          حس خوبت رو به ما بسپار ، ما کنارتیم!!
        </h1>
        <div className="absolute right- pl-10 -top-10 max-[1390]:hidden ">
          <TallerFleshBlue />
          <div className="right-148 bottom-23 relative  ">
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
        <p className="text-gray-500 text-sm mt-4 max-w-lg mx-auto leading-relaxed dark:text-white">
          هر خونه ای یه حس خوب داره ، ما اینجا هستیم تا کمکت کنیم حس خوبت رو
          پیدا کنی!! بیا با هم سفر جستجوی خونه ات رو شروع کنیم.
        </p>
        <div className="mt-6 flex justify-center  ">
          <button className="bg-[#F5F5F5]  shadow-[8px_0px_20px_rgba(8,135,202,0.30)]  border-gray-200 w-35 h-12 rounded-2x1 text-blue-100 dark:text-[#28A5E6] font-bold cursor-pointer text-[18px] rounded-2xl ">
            ثبت نام
          </button>
        </div>
        <img
          src="/arrow-curve.png"
          className="absolute top-10 left-1/4 w-32 hidden md:block"
          alt=""
        />
      </section>

      <LocationSlider />
      <h2 className="text-[16px] font-medium text-[rgb(6,4,37)] dark:text-white w-full justify-center flex relative top-10">
        خانه مان را با هم میسازیم
      </h2>
      <div className="flex flex-wrap justify-center gap-10 my-16 text-[rgb(6,4,37)]">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-sm dark:text-white">آدرس ما</p>
            <p className="text-xs text-gray-500 italic dark:text-white" >
              مازندران _ ساری _ دودانگه _ روستای بکر سنگده
            </p>
          </div>
          <MapPin className="text-blue-600" size={24} />
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-sm">آدرس ایمیل</p>
            <p className="text-xs text-gray-500 italic dark:text-white">RahnKadeh@gmail.com</p>
          </div>
          <Mail className="text-blue-600" size={24} />
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-sm dark:text-white">تلفن ما</p>
            <p className="text-xs text-gray-500 italic">
              (۰۱۱) ۴۴۴-۷۳۸۹ و ۰۹۱۱-۵۶۴-۷۳۸۹
            </p>
          </div>
          <Phone className="text-blue-600" size={24} />
        </div>
      </div>

      <section className=" max-w-7xl mx-auto  grid grid-cols-1 md:grid-cols-2 gap-40 max-[1300]:gap-20 px-6">
        <div className="relative p-8 rounded-[40px]  shadow-blue-100/50">
          <div className="mb-6 text-center">
            <p className="text-[rgb(6,4,37)] font-bold underline decoration-blue-200 underline-offset-8">
              ما رو دریاب :)
            </p>
            <div className="max-[1055]:hidden ">
              <div className="absolute right-100 bottom-25 ">
                <TallerFleshGreen />
              </div>
              <div className="absolute rotate-90 right-126 bottom-25">
                <div className="absolute -left-[25px] ">
                  <LeftFleshGreen />
                </div>
                <div className="rotate-180 absolute  ">
                  <div className="absolute -bottom-0.5  ">
                    <RightFleshGreen />
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-blue-700 font-black text-xl mt-2">
              پیام بفرست تا کمکت کنیم!
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="نام و نام خانوادگی"
              value={formData.title}
               onChange={(e) => setFormData({...formData,title:e.target.value})}
              className="w-full p-4  rounded-2xl outline-none border border-transparen border-[#0887CA80] text-[#0887CAB2]"
            />
            <input
              type="email"
              placeholder="ایمیل"
              value={formData.email}
               onChange={(e) => setFormData({...formData,email:e.target.value})}
              className="w-full p-4  rounded-2xl outline-none border border-transparen border-[#0887CA80] text-[#0887CAB2]"
            />
                      <Mail className="absolute max-[1138]:right-90 max-[1050]:hidden top-51 right-115  text-blue-600" size={24} />

            <textarea
              rows={4}
              placeholder="پیام شما"
              value={formData.message}
              onChange={(e) => setFormData({...formData,message:e.target.value})}
              className="w-full p-4 bg-white rounded-2xl outline-none border  border-[#0887CA80] text-[#0887CAB2]"
            ></textarea>

            <button className="w-full py-4 bg-[rgb(16,8,143)] text-white  rounded-2xl font-bold shadow-xl hover:bg-blue-900 transition-all">
              ارسال درخواست شما
            </button>
          </form>

          <img
            src="/green-arrow.png"
            className="absolute -left-12 -bottom-10 w-24 hidden lg:block"
            alt=""
          />
        </div>
        <div className="rounded-tl-[42px] rounded-br-[42px] z-10 overflow-hidden shadow-lg border-8 border-white w-11/12 h-[487px] ">
          <iframe
            src="https://www.google.com/maps/embed?..."
            className="w-full h-full grayscale-[0.5]"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
