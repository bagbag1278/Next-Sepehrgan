"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutBox() {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/logout", {
                method: "POST",
            });

            if (!res.ok) throw new Error("Logout failed");

            setOpenConfirm(false);
            router.replace("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpenConfirm(true)}
                className="
          w-full
          flex
          items-center
          gap-3
          text-red-500
          cursor-pointer
        "
            >
                خروج از حساب
            </button>

            {openConfirm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-[350px]">

                        <h3 className="text-lg font-bold mb-4 text-center">
                            خروج از حساب
                        </h3>

                        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                            آیا از خروج از حساب کاربری مطمئن هستید؟
                        </p>

                        <div className="flex gap-3">

                            <button
                                onClick={() => setOpenConfirm(false)}
                                className="
                  flex-1
                  h-11
                  rounded-xl
                  bg-gray-200
                  text-black
                "
                            >
                                انصراف
                            </button>

                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className="
                  flex-1
                  h-11
                  rounded-xl
                  bg-red-500
                  text-white
                "
                            >
                                {loading ? "..." : "خروج"}
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </>
    );
}