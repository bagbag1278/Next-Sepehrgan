"use client";

import React, { useEffect } from "react";
import { useActionState } from "react";
import { updateUserAction } from "@/core/action/updateUser.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
type User = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
};
const EditForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(updateUserAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message);
      if (state.user) {
        try {
          const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
          const firstName = state.user.firstName || "";
          const lastName = state.user.lastName || "";
          localStorage.setItem("user", JSON.stringify({
            ...existingUser,
            ...state.user,
            firstName,
            lastName,
            fullName: state.user.fullName || `${firstName} ${lastName}`.trim(),
            phoneNumber: state.user.phoneNumber || state.user.phone || "",
          }));
        } catch {
          // The server-side profile update remains saved if local storage is unavailable.
        }
      }
      router.refresh();
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* name */}
      <div className="flex flex-col gap-2 relative">
        <input
          type="text"
          name="name"
          defaultValue={user.name}
          required
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
          defaultValue={user.lastname}
          required
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
          defaultValue={user.email}
          required
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
          defaultValue={user.phone}
          required
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
