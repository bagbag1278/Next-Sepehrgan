"use client";

import React, { useEffect } from "react";
import { useActionState } from "react";
import { updateUserAction } from "@/core/action/updateUser";
import toast from "react-hot-toast";

const EditForm = () => {
  const [state, formAction, isPending] = useActionState(updateUserAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* name */}
      <div className="flex flex-col gap-2 relative">
        <input
          type="text"
          name="name"
          className="peer w-full dark:border-blue-300 dark:text-black border text-[13px] pt-1 px-4 h-12 border-blue-300/50 outline-0 rounded-2xl transition-colors focus:border-blue-500"
          placeholder=""
        />
        <label
          htmlFor="name"
          className="absolute right-4 top-4 text-[12px] dark:text-blue-300 text-blue-300/70 transition-all duration-200 ease-out peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md"
        >
          نام
        </label>
      </div>

      {/* last name */}
      <div className="flex flex-col gap-2 relative">
        <input
          type="text"
          name="lastname"
          className="peer w-full dark:border-blue-300 dark:text-black border text-[13px] pt-1 px-4 h-12 border-blue-300/50 outline-0 rounded-2xl transition-colors focus:border-blue-500"
          placeholder=""
        />
        <label
          htmlFor="lastname"
          className="absolute right-4 top-4 text-xs dark:text-blue-300 text-blue-300/70 transition-all duration-200 ease-out peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md"
        >
          نام خانوادگی
        </label>
      </div>

      {/* email */}
      <div className="flex flex-col gap-2 relative">
        <input
          type="email"
          name="email"
          className="peer w-full dark:border-blue-300 dark:text-black border text-[13px] pt-1 px-4 h-12 border-blue-300/50 outline-0 rounded-2xl transition-colors focus:border-blue-500"
          placeholder=""
        />
        <label
          htmlFor="email"
          className="absolute right-4 top-4 text-xs dark:text-blue-300 text-blue-300/70 transition-all duration-200 ease-out peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md"
        >
          ایمیل
        </label>
      </div>

      {/* phone */}
      <div className="flex flex-col gap-2 relative">
        <input
          type="text"
          name="phone"
          className="peer w-full dark:border-blue-300 dark:text-black border text-[13px] pt-1 px-4 h-12 border-blue-300/50 outline-0 rounded-2xl transition-colors focus:border-blue-500"
          placeholder=""
        />
        <label
          htmlFor="phone"
          className="absolute right-4 top-4 text-xs dark:text-blue-300 text-blue-300/70 transition-all duration-200 ease-out peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md"
        >
          شماره تلفن
        </label>
      </div>

      <div className="h-12 flex gap-4">
        <button
          type="reset"
          className="border dark:border-white border-blue-400 opacity-60 rounded-2xl py-2.5 px-8 cursor-pointer hover:opacity-100 transition-opacity duration-200"
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

export default EditForm;