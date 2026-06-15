"use client";

import React, { forwardRef } from "react";
import {
    Check,
    Ban,
    Info,
    Trash2,
} from "lucide-react";

interface ReserveDropdownProps {
    bookingId: number;
    status: string;
    onContinue: (bookingId: number) => void;
    onCancel: (bookingId: number, status: string) => void;
    onDelete: (bookingId: number) => void;
    onDetails: (bookingId: number) => void;
}

const ReserveDropdown = forwardRef<HTMLDivElement,ReserveDropdownProps>(({
            bookingId,status,onContinue,onCancel,
            onDelete,onDetails,
        },ref) => {
        return (
            <div
                ref={ref}
                className="absolute -top-17 left-full ml-3 w-40 bg-white dark:bg-slate-800 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 dark:border-slate-700 z-50 p-3"
            >
                <div className="flex flex-col gap-1">

                    <button
                        onClick={() => onContinue(bookingId)}
                        className="h-11 rounded-xl flex items-center gap-3 px-3 hover:bg-green-50 dark:hover:bg-green-500/10 transition"
                    >
                        <Check
                            size={18}
                            className="text-green-500"
                        />
                        <span className="font-medium text-sm dark:text-white">
                            تایید رزرو
                        </span>
                    </button>

                    <button
                        onClick={() => onCancel(bookingId, status)}
                        className="h-11 rounded-xl flex items-center gap-3 px-3 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition"
                    >
                        <Ban
                            size={18}
                            className="text-orange-500"
                        />
                        <span className="font-medium text-sm text-orange-500">
                            لغو رزرو
                        </span>
                    </button>

                    <button
                        onClick={() => onDetails(bookingId)}
                        className="h-11 rounded-xl flex items-center gap-3 px-3 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition"
                    >
                        <Info
                            size={18}
                            className="text-blue-500"
                        />
                        <span className="font-medium text-sm dark:text-white">
                            جزئیات
                        </span>
                    </button>

                    <button
                        onClick={() => onDelete(bookingId)}
                        className="h-11 rounded-xl flex items-center gap-3 px-3 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                    >
                        <Trash2
                            size={18}
                            className="text-red-500"
                        />
                        <span className="font-medium text-sm text-red-500">
                            حذف
                        </span>
                    </button>

                </div>
            </div>
        );
    }
);

ReserveDropdown.displayName = "ReserveDropdown";

export default ReserveDropdown;