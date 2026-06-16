import Links from "@/components/Dashboard/buyer/info/Links";
import CirclesIcon from "@/components/DashboardSeller/Icon/CirclesIcon";
import Link from "next/link";
import React, { FC, ReactNode } from "react";
interface IChildren {
    children: ReactNode;
}
const BuyerInfoLayout: FC<IChildren> = ({ children }) => {
    return (
        <>
                {/* PAGE TITLE */}
            <div className="w-full h-14 flex gap-1">
                <div  className=" w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse scale-x-[-1]" >
                    <CirclesIcon />
                </div>
                <div className=" dark:text-blue-500 text-blue-200 text-[18px] font-bold">
                    اطلاعات کاربری
                </div>
                <div className="w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse">
                    <CirclesIcon />
                </div>

            </div>


            <div className="absolute  pt-6 pr-6 top-25 right-6 w-243 h-110 rounded-2xl dark:bg-slate-800 shadow-[0_0_8px] dark:shadow-slate-800 shadow-blue-300/15">
                {children}
            </div>
        </>
    );
};

export default BuyerInfoLayout;
