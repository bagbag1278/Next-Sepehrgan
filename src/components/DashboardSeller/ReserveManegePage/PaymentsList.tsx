"use client";

import { X } from "lucide-react";
import { IBooking } from "@/core/api/DashboardSeller/GetBookingsCustomers";

interface PaymentsListProps {
    booking: IBooking | null;
    onClose: () => void;
}

export default function PaymentsList({
    booking,
    onClose,
}: PaymentsListProps) {
    if (!booking) return null;

    const paymentDate = new Date(booking.createdAt);

    return (
        <div
            className="
                absolute
                -top-50
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                z-50
                bg-gray-700/70
                dark:bg-slate-800
                rounded-[36px]
                shadow-2xl
            "
            style={{
                width: "900px",
                height: "1000px",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 z-[1000]" />

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    z-[1001]
                    bg-[#F4F4F4]
                    dark:bg-slate-900
                    rounded-[36px]
                    shadow-2xl
                    p-6
                "
                style={{
                    width: "700px",
                    minHeight: "487px",
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-[24px] text-blue-800">
                        لیست پرداختی ها
                    </h2>

                    <button
                        onClick={onClose}
                        className="
                            absolute
                            top-4
                            left-6
                            w-10
                            h-10
                            flex
                            items-center
                            justify-center
                            bg-white
                            rounded-full
                            dark:bg-slate-800
                            border
                            border-gray-200
                            dark:border-slate-700
                            hover:bg-red-500
                            hover:scale-105
                            transition
                        "
                    >
                        <X
                            size={20}
                            className="text-gray-600 dark:text-gray-300"
                        />
                    </button>
                </div>

                <div className="h-px bg-blue-800 mb-6" />

                {/* Header Table */}
                <div
                    className="
                        h-15
                        rounded-3xl
                        bg-[#E9EEF4]
                        dark:bg-slate-800
                        flex
                        items-center
                        justify-around
                        text-gray-500
                        dark:text-slate-300
                        font-bold
                    "
                >
                    <div className="w-full px-8 flex justify-between">
                        <span>تاریخ</span>
                        <span>زمان</span>
                        <span>شماره پیگیری</span>
                        <span>مبلغ</span>
                    </div>
                </div>

                {/* Row */}
                <div className="mt-5 flex flex-col gap-4">
                    <div
                        className="
                            h-16
                            rounded-3xl
                            bg-white
                            dark:bg-slate-800
                            shadow
                            flex
                            items-center
                            justify-around
                        "
                    >
                        <div className="w-full px-8 flex justify-between items-center">
                            <span>
                                {paymentDate.toLocaleDateString("fa-IR")}
                            </span>

                            <span>
                                {paymentDate.toLocaleTimeString("fa-IR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>

                            <span className="font-bold">
                                {booking.traveler_details?.[0]?.nationalId || "---"}
                            </span>

                            <span className="font-bold text-green-600">
                                {Number(
                                    booking.house?.price || 0
                                ).toLocaleString("fa-IR")}{" "}
                                تومان
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}