'use client';

import formatDate from "@/components/untils/FormData";
import { Payment } from "@/core/types/DashboardSeller/Payment";
import { Clock10 } from "lucide-react";
import moment from "moment-jalaali";
interface PaymentRowProps {
    payment: Payment;
}

const PaymentRow = ({ payment, }: PaymentRowProps) => {

    // console.log(payment);

    moment.loadPersian({
        dialect: "persian-modern",
        usePersianDigits: true,
    });

    moment.locale("fa");

    const paymentStatusMap = {
        completed: {
            label: "موفق",
            className: "text-green-500",
        },

        pending: {
            label: "در انتظار",
            className: "text-yellow-500",
        },
    };

    return (

        <div
            className="border h-16 rounded-3xlborder rounded-2xl border-[#E7EDF5] 
             px-8 flex gap-1 items-center  justify-between  dark:border-slate-700
             hover:bg-gray-50  dark:hover:bg-slate-700/40 hover:border-blue-500/40  dark:bg-slate-800
                "
        >

            <span className=" w-30 ">
                {payment.booking.house.title}
            </span>

            <span className="flex">

                {new Date(payment.createdAt).toLocaleTimeString(
                    "fa-IR",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                    }
                )
                }
                <Clock10 />
            </span>


            {/* <span className=" border">
                {payment.transactionId}
            </span> */}

            <span className="w-25 text-center">
                {
                    payment.booking?.house?.sellerName
                }
            </span>



            <span className="text-blue-600 font-bold">

                {Number(payment.amount).toLocaleString("fa-IR")}
                {" "}
                تومان
            </span>

            <span
                className={
                    paymentStatusMap[
                        payment.status as keyof typeof paymentStatusMap
                    ]?.className
                }
            >
                {
                    paymentStatusMap[
                        payment.status as keyof typeof paymentStatusMap
                    ]?.label
                }
            </span>

            <span className=" text-xs text-gray-500" >

                {payment.transactionId}
            </span>

            <span className="text-[14px] ">
                {
                    moment(
                        payment.booking.createdAt
                    ).format(
                        "jD jMMMM jYYYY"
                    )
                }
            </span>


            {/* visit receipt */}
            <span className="text-[14px] cursor-pointer ">
                مشاهده رسید
            </span>

        </div>

    );

};

export default PaymentRow;