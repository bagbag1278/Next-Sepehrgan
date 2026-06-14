"use client";
import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { changePasswordAction } from "@/core/action/changePassword.action";
import toast from "react-hot-toast";

const SecurityForm = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [state, formAction, isPending] = useActionState(changePasswordAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="w-77.5 flex flex-col gap-6">
      <h2 className="font-bold">تغییر رمز عبور</h2>

      {/* رمز عبور فعلی */}
      <div className="relative">
        <input
          type={showCurrent ? "text" : "password"}
          name="currentPassword"
          id="currentPassword"
          className="border peer w-full transition-colors border-blue-300/50 focus:border-blue-500 text-[13px] pt-1 px-4 h-12 outline-0 rounded-2xl duration-300"
          placeholder=" "
        />
        <label
          htmlFor="currentPassword"
          className="absolute right-4 top-4 text-xs text-blue-300/70 transition-all duration-200 ease-out peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md"
        >
          رمز عبور فعلی
        </label>
        <button
          type="button"
          onClick={() => setShowCurrent(!showCurrent)}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          {showCurrent ? <FaRegEyeSlash size={20} className="text-blue-300" /> : <IoEyeOutline size={20} className="text-blue-300" />}
        </button>
      </div>

      {/* رمز عبور جدید */}
      <div className="relative">
        <input
          type={showNew ? "text" : "password"}
          name="newPassword"
          id="newPassword"
          className="border peer w-full transition-colors border-blue-300/50 focus:border-blue-500 text-[13px] pt-1 px-4 h-12 outline-0 rounded-2xl duration-300"
          placeholder=" "
        />
        <label
          htmlFor="newPassword"
          className="absolute right-4 top-4 text-xs text-blue-300/70 transition-all duration-200 ease-out peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md"
        >
          رمز عبور جدید
        </label>
        <button
          type="button"
          onClick={() => setShowNew(!showNew)}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          {showNew ? <FaRegEyeSlash size={20} className="text-blue-300" /> : <IoEyeOutline size={20} className="text-blue-300" />}
        </button>
      </div>

      {/* تکرار رمز عبور جدید */}
      <div className="relative">
        <input
          type={showConfirm ? "text" : "password"}
          name="confirmPassword"
          id="confirmPassword"
          className="border peer w-full transition-colors border-blue-300/50 focus:border-blue-500 text-[13px] pt-1 px-4 h-12 outline-0 rounded-2xl duration-300"
          placeholder=" "
        />
        <label
          htmlFor="confirmPassword"
          className="absolute right-4 top-4 text-xs text-blue-300/70 transition-all duration-200 ease-out peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md"
        >
          تکرار رمز عبور جدید
        </label>
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          {showConfirm ? <FaRegEyeSlash size={20} className="text-blue-300" /> : <IoEyeOutline size={20} className="text-blue-300" />}
        </button>
      </div>

      <div className="h-12 flex gap-4">
        <button
          type="reset"
          className="border border-blue-400 opacity-60 dark:border-white rounded-2xl py-2.5 px-8 cursor-pointer hover:opacity-100 transition-opacity duration-200"
        >
          انصراف
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-100 dark:bg-blue-200 text-white rounded-2xl py-2.5 px-9 cursor-pointer text-nowrap hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity duration-200"
        >
          {isPending ? "در حال ذخیره..." : "اعمال تغییرات"}
        </button>
      </div>
    </form>
  );
};

export default SecurityForm;