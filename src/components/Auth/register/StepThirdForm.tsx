"use client";
import { completeRegistrationAction } from "@/core/action/register.action";
import { checkPasswordStrength } from "@/core/validation/PassWord";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

interface StepThirdFormProps {
  onNext: () => void;
  onBack: () => void;
  userId: number;
}

const StepThirdForm = ({ userId, onBack }: StepThirdFormProps) => {
  const t = useTranslations('Register');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(true);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(checkPasswordStrength(value));
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getBorderColor = () => {
    if (strength === 1) return "border-red-500 dark:border-red-400 text-red-500 dark:text-red-400";
    if (strength === 2) return "border-amber-400 dark:border-amber-500 text-amber-400 dark:text-amber-500";
    if (strength === 3) return "border-green-500 dark:border-green-400 text-green-500 dark:text-green-400";
    return "border-blue-300/50 dark:border-gray-600";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !phone || !password) {
      toast.error(t('fillAllFields'));
      return;
    }

    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      toast.error(t('invalidPhone'));
      return;
    }

    if (password.length < 8) {
      toast.error(t('passwordMinLength'));
      return;
    }

    try {
      setLoading(true);

      const result = await completeRegistrationAction({
        userId:userId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phone, 
        password,
      });

      if (result.success) {
        toast.success(result.message || t('registerSuccess'));

        setTimeout(() => {
          router.push("/login");
        }, 1200);
      } else {
        toast.error(result.message || t('registerError'));
      }
    } catch {
      toast.error(t('unexpectedError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col justify-between gap-6 h-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 relative">
        <input
          type="text"
          name="firstName"
          id="firstName"
          autoComplete="given-name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder=" "
          className="peer w-full dark:text-white border text-[13px] md:text-[14px] pt-1 px-4 h-11 md:h-12 border-blue-300/50 dark:border-gray-600 outline-0 rounded-2xl transition-colors focus:border-blue-500 dark:focus:border-blue-400"
        />
        <label htmlFor="firstName" className="absolute right-4 top-2 md:top-4 text-xs text-blue-300/70 dark:text-gray-400 peer-focus:top-0 peer-focus:text-[11px] peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs">{t('firstName')}</label>
      </div>

      <div className="flex flex-col gap-2 relative">
        <input
          type="text"
          name="lastName"
          id="lastName"
          autoComplete="family-name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder=" "
          className="peer w-full dark:text-white border text-[13px] md:text-[14px] pt-1 px-4 h-11 md:h-12 border-blue-300/50 dark:border-gray-600 outline-0 rounded-2xl transition-colors focus:border-blue-500 dark:focus:border-blue-400"
        />
        <label htmlFor="lastName" className="absolute right-4 top-2 md:top-4 text-xs text-blue-300/70 dark:text-gray-400 peer-focus:top-0 peer-focus:text-[11px] peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs">{t('lastName')}</label>
      </div>

      <div className="flex flex-col gap-2 relative">
        <input
          type="text"
          name="phone"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder=""
          autoComplete="tel"
          required
          className="peer w-full dark:text-white border text-[13px] md:text-[14px] pt-1 px-4 h-11 md:h-12 border-blue-300/50 dark:border-gray-600 outline-0 rounded-2xl transition-colors focus:border-blue-500 dark:focus:border-blue-400"
        />
        <label
          htmlFor="phone"
          className="absolute right-4 top-2 md:top-4 text-xs text-blue-300/70 dark:text-gray-400 transition-all duration-200 ease-out
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base
               peer-focus:top-0 peer-focus:text-[11px] md:peer-focus:text-[12px] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-not-placeholder-shown:-top-2
               peer-not-placeholder-shown:text-xs md:peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md dark:peer-not-placeholder-shown:bg-gray-800"
        >
          {t('phoneNumber')}
        </label>
        <button className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg
            width="12"
            height="19"
            viewBox="0 0 12 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.91667 3.25H6.58333M3.41667 17.4167H8.08333C9.01675 17.4167 9.48346 17.4167 9.83998 17.235C10.1536 17.0752 10.4086 16.8203 10.5683 16.5067C10.75 16.1501 10.75 15.6834 10.75 14.75V3.41667C10.75 2.48325 10.75 2.01654 10.5683 1.66002C10.4086 1.34641 10.1536 1.09144 9.83998 0.931656C9.48346 0.75 9.01675 0.75 8.08333 0.75H3.41667C2.48325 0.75 2.01654 0.75 1.66002 0.931656C1.34641 1.09144 1.09144 1.34641 0.931656 1.66002C0.75 2.01654 0.75 2.48325 0.75 3.41667V14.75C0.75 15.6834 0.75 16.1501 0.931656 16.5067C1.09144 16.8203 1.34641 17.0752 1.66002 17.235C2.01654 17.4167 2.48325 17.4167 3.41667 17.4167Z"
              stroke="#0887CA"
              strokeOpacity="0.7"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="dark:stroke-gray-400"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="relative flex flex-col gap-2">
          <div className="relative">
            {" "}
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`border peer w-full transition-colors focus:border-blue-500 dark:focus:border-blue-400 text-[13px] md:text-[14px] pt-1 px-4 h-11 md:h-12 bg-white dark:bg-gray-800 dark:text-white outline-0 rounded-2xl duration-300 ${getBorderColor()}`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className={`absolute right-4 top-2 md:top-4 text-xs text-blue-300/70 dark:text-gray-400 transition-all duration-200 ease-out
                     peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base
                     peer-focus:top-0 peer-focus:text-[11px] md:peer-focus:text-[12px] peer-focus:text-blue-600 dark:peer-focus:text-blue-400
                     peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs md:peer-not-placeholder-shown:text-sm
                     peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md dark:peer-not-placeholder-shown:bg-gray-800
                      ${getBorderColor()}`}
            >
              {t('password')}
            </label>
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 cursor-pointer"
            >
              {showPassword ? (
                <FaRegEyeSlash
                  size={18}
                  className="md:w-[20px] md:h-[20px] text-blue-300 dark:text-gray-400 transition-colors duration-300"
                />
              ) : (
                <IoEyeOutline
                  size={18}
                  className="md:w-[20px] md:h-[20px] text-blue-300 dark:text-gray-400 transition-colors duration-300"
                />
              )}
            </button>
          </div>
        </div>

        <div className="h-0.5 w-full flex justify-between mx-auto gap-1 mt-1">
          <span
            className={`w-1/3 rounded-[100px] transition-colors duration-300 ${
              strength === 1
                ? "bg-red-600 dark:bg-red-500"
                : strength === 2
                  ? "bg-amber-400 dark:bg-amber-500"
                  : strength === 3
                    ? "bg-green-500 dark:bg-green-400"
                    : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
          <span
            className={`w-1/3 rounded-[100px] transition-colors duration-300 ${
              strength >= 2
                ? strength === 3
                  ? "bg-green-500 dark:bg-green-400"
                  : "bg-amber-400 dark:bg-amber-500"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
          <span
            className={`w-1/3 rounded-[100px] transition-colors duration-300 ${
              strength === 3 ? "bg-green-500 dark:bg-green-400" : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button
          type="submit"
          disabled={loading}
          className="h-11 md:h-12 w-full rounded-2xl cursor-pointer bg-blue-100 dark:bg-blue-800 text-white hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t('registering') : t('register')}
        </button>
        
        <button
          type="button"
          onClick={onBack}
          className="h-11 md:h-12 w-full rounded-2xl cursor-pointer border-2 border-blue-100 dark:border-blue-700 text-blue-100 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors font-medium text-sm md:text-base"
        >
          {t('previousStep')}
        </button>
      </div>
    </form>
  );
};

export default StepThirdForm;
