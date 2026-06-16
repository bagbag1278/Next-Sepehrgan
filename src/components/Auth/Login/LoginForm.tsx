"use client";

import { ActionState, loginAction } from "@/core/action/Login.action";
import { checkPasswordStrength } from "@/core/validation/PassWord";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import Cookies from "js-cookie";

const initialState: ActionState = {
  success: false,
  error: "",
  message: "",
};

const LoginForm = () => {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(checkPasswordStrength(value));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getBorderColor = () => {
    if (strength === 1) return "border-red-500 text-red-500 dark:border-red-400 dark:text-red-400";
    if (strength === 2) return "border-amber-500 text-amber-500 dark:border-amber-400 dark:text-amber-400";
    if (strength === 3) return "border-green-100 text-green-100 dark:border-green-100 dark:text-green-100";
    return "border-blue-300/50 dark:border-gray-600";
  };

  useEffect(() => {
    if (state.success) {
      // ذخیره توکن در localStorage
      if (state.accessToken) {
        localStorage.setItem("accessToken", state.accessToken);
        // همچنین در کوکی برای دسترسی در سرور
        Cookies.set("accessToken", state.accessToken, { expires: 7, path: "/" });
      }
      
      let userId = null;
      let userRole = null;
      let userFullName = null;
      let userEmail = null;
      
      if (state.user) {
        userId = state.user.id;
        userRole = state.user.role;
        userFullName = state.user.fullName;
        userEmail = state.user.email;
      } else if (state.accessToken) {
        try {
          const payload = JSON.parse(atob(state.accessToken.split('.')[1]));
          userId = payload.id;
          userRole = payload.role;
          userFullName = payload.fullName;
          userEmail = payload.email;
        } catch (e) {}
      }
      
      if (userId) {

        const userData = {
          id: userId,
          role: userRole || "buyer",
          fullName: userFullName || "",
          email: userEmail || "",
          firstName: state.user?.firstName || "",
          lastName: state.user?.lastName || "",
        };
        
        localStorage.setItem("user", JSON.stringify(userData));
        Cookies.set("user", JSON.stringify(userData), { expires: 7, path: "/" });
        console.log("✅ user ذخیره شد:", userData);

        localStorage.setItem("user", JSON.stringify({ id: userId }));
        

      }
      
      toast.success(state.message || t('loginSuccess'));
      
      setTimeout(() => {
        if (userRole === "admin") {
          router.push("/admin");
        } else if (userRole === "seller") {
          router.push("/dashboard/seller");
        } else {
          router.push("/");
        }
      }, 100);
    }
    if (state.error) {
      toast.error(state.error);
    }
  }, [state, router, t]);

  return (
    <form action={formAction} className="mt-6 flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-2 relative">
        <input
          type="email"
          name="email"
          className="peer w-full dark:text-white dark:bg-gray-800 border text-[13px] pt-1 px-4 h-12 bg-white border-blue-300/50 dark:border-gray-600 outline-0 rounded-2xl transition-colors focus:border-blue-500 dark:focus:border-blue-400"
          placeholder=""
        />
        <label
          htmlFor="email"
          className="absolute right-4 top-4 text-xs text-blue-300/70 dark:text-gray-400 transition-all duration-200 ease-out
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
               peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-not-placeholder-shown:-top-2
peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md dark:peer-not-placeholder-shown:bg-gray-800"
        >
          {t('email')}
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
              className="dark:stroke-gray-400"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="relative flex flex-col gap-2">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`border peer w-full transition-colors border-blue-300/50 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-[13px] pt-1 px-4 h-12 bg-white dark:bg-gray-800 dark:text-white outline-0 rounded-2xl duration-300 ${getBorderColor()}`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className={`absolute right-4 top-4 text-xs text-blue-300/70 dark:text-gray-400 transition-all duration-200 ease-out
                     peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                     peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 dark:peer-focus:text-blue-400
                     peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm
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
                <FaRegEyeSlash size={20} className={`text-blue-300 dark:text-gray-400 ${getBorderColor()}`} />
              ) : (
                <IoEyeOutline size={20} className={`text-blue-300 dark:text-gray-400 ${getBorderColor()}`} />
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
                    ? "bg-green-100 dark:bg-green-400"
                    : "bg-white dark:bg-gray-700"
            }`}
          />
          <span
            className={`w-1/3 rounded-[100px] transition-colors duration-300 ${
              strength >= 2
                ? strength === 3
                  ? "bg-green-100 dark:bg-green-100"
                  : "bg-amber-400 dark:bg-amber-500"
                : "bg-white dark:bg-gray-700"
            }`}
          />
          <span
            className={`w-1/3 rounded-[100px] transition-colors duration-300 ${
              strength === 3 ? "bg-green-100 dark:bg-green-100" : "bg-white dark:bg-gray-700"
            }`}
          />

        </div>
      </div>

      <div className="w-107.5 h-5 flex justify-between items-center relative max-[440]:flex-col max-[440]:left-30 max-[440]:bottom-5">
        <Link href="/loginphone" className="text-blue-100 text-[13px] underline underline-offset-4 font-medium dark:text-blue-300 relative max-[440]:left-9">
          {t('loginWithPhone')}
        </Link>
        <Link href="/forgetpass" className="text-blue-300 dark:text-blue-900 max-[480]:pl-10 max-[440]:mt-2 text-[11px] underline underline-offset-4 font-medium decoration">
          {t('forgotPassword')}
        </Link>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full h-12 rounded-2xl bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 transition-colors duration-200 text-white disabled:bg-blue-400/50 dark:disabled:bg-blue-900/50"
      >
        {pending ? t('loggingIn') : t('loginButton')}
      </button>

      <div className="h-6 mx-auto flex gap-0.5 justify-center items-center">
        <h6 className="font-normal text-[13px] dark:text-gray-400">{t('noAccount')}</h6>
        <Link href="/register">
          <h5 className="text-blue-100 font-medium text-[15px] underline underline-offset-4 dark:text-blue-300">
            {t('registerButton')}
          </h5>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;