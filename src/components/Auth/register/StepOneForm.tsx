/* eslint-disable @typescript-eslint/no-explicit-any */
import GoogleLogin from "@/components/common/GooleLogin/GoogleLogin"; 
import http from "@/core/interceptor/interceptor";
import Link from "next/link";
import React, { FC, useState } from "react";

interface StepOneFormProps {
  onNext: () => void; 
}

const StepOneForm: FC<StepOneFormProps> = ({ onNext }) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError(null); // پاک کردن خطا هنگام تایپ مجدد
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("لطفاً ایمیل خود را وارد کنید.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("فرمت ایمیل نامعتبر است.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiEndpoint = "/auth/register";
      const response = await http.post(apiEndpoint, { email: email });

      onNext();
    } catch (err) {
      console.error("Registration send code error:", err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form
      onSubmit={handleSubmit} 
      className="flex mt-6 flex-col justify-between gap-6"
    >
      <GoogleLogin />
      <div className="flex flex-col gap-2 relative">
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="peer w-full dark:text-black border text-[13px] pt-1 px-4 h-12 bg-white border-blue-300/50 outline-0 rounded-2xl transition-colors focus:border-blue-500 "
          placeholder=" " 
        />
        <label
          htmlFor="email"
          className="absolute right-4 top-2 p-0.5 text-xs text-blue-300/70 transition-all duration-200 ease-out
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
               peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2
peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md"
        >
          ایمیل
        </label>
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
         
          <svg
            width="19"
            height="15"
            viewBox="0 0 19 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.58333 1.58333L8.0601 6.62082C8.66195 7.08892 9.50472 7.08892 10.1066 6.62082L16.5833 1.58333M3.41667 14.0833H14.75C15.6834 14.0833 16.1501 14.0833 16.5067 13.9017C16.8203 13.7419 17.0752 13.4869 17.235 13.1733C17.4167 12.8168 17.4167 12.3501 17.4167 11.4167V3.41667C17.4167 2.48325 17.4167 2.01654 17.235 1.66002C17.0752 1.34641 16.8203 1.09144 16.5067 0.931656C16.1501 0.75 15.6834 0.75 14.75 0.75H3.41667C2.48325 0.75 2.01654 0.75 1.66002 0.931656C1.34641 1.09144 1.09144 1.34641 0.931656 1.66002C0.75 2.01654 0.75 2.48325 0.75 3.41667V11.4167C0.75 12.3501 0.75 12.8168 0.931656 13.1733C1.09144 13.4869 1.34641 13.7419 1.66002 13.9017C2.01654 14.0833 2.48325 14.0833 3.41667 14.0833Z"
              stroke="#0887CA"
              strokeOpacity="0.7"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      
      {error && <p className="text-red-500 text-sm -mt-4">{error}</p>}

      <button
        type="submit" 
        disabled={loading} 
        className={`h-12 w-full rounded-2xl text-white transition-colors duration-300 ease-in-out
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-100 hover:bg-blue-200"
          }`}
      >
        {loading ? "در حال ارسال..." : "ارسال کد"}
      </button>

      <div className="h-6 mx-auto flex gap-0.5 justify-center items-center">
        <h6 className="font-normal text-[13px]">آیا حساب دارید ؟</h6>
        <Link href={"/login"}>
          {" "}
          {/* مسیر صفحه ورود را چک کنید */}
          <h5 className="text-blue-100 font-medium underline underline-offset-4 dark:text-blue-300 text-[15px]">
            ورود
          </h5>
        </Link>
      </div>
    </form>
  );
};

export default StepOneForm;
