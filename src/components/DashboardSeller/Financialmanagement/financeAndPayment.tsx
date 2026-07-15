"use client"

import FinanceCard from "./FinanceCard";
import PaymentFilters from "./PaymentFilters";
import PaymentTable from "./PaymentTable";
import Pagination from "./Pagination";
import CirclesIcon from "../Icon/CirclesIcon";
import GetFinanceDashboard from "@/core/api/DashboardSeller/GetFinanceDashboard";
import { FinanceDashboard, } from "@/core/types/DashboardSeller/Finance";
import { useEffect, useState } from "react";
const FinanceAndPayment = () => {
    const [finance, setFinance] = useState<FinanceDashboard | null>(null);

    useEffect(() => {

        const fetchFinance =
            async () => {

                try {

                    const data = await GetFinanceDashboard();

                  

                    setFinance(data);

                } catch (error) {

                    console.log(
                        error
                    );

                }

            };

        fetchFinance();

    }, []);

    return (

        <div className="" >


            {/* PAGE TITLE */}
            <div className="w-full h-14 flex gap-1">

                <div className=" w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse scale-x-[-1]">
                    <CirclesIcon />
                </div>

                <div className="dark:text-blue-500 text-blue-200 text-[18px] font-bold" >
                    مدیریت مالی
                </div>

                <div className=" w-6.75 h-6.5 flex gap-0.5  items-center flex-wrap-reverse"  >
                    <CirclesIcon />
                </div>

            </div>

            {/* finance */}

            <div className=" grid mb-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-4">

                <FinanceCard
                    title="درآمد ماه جاری"
                    value={`${Number(
                        finance?.totalCurrentMonthAmount || 0
                    ).toLocaleString("fa-IR")} تومان`}
                />

                <FinanceCard
                    title="درآمد ماه قبل"
                    value={`${Number(
                        finance?.totalPerviousMonthAmount || 0
                    ).toLocaleString("fa-IR")} تومان`}
                />

                <FinanceCard
                    title="درآمد کل"
                    value={`${Number(
                        finance?.totalAmount || 0
                    ).toLocaleString("fa-IR")} تومان`}
                />

                <FinanceCard
                    title="موجودی قابل برداشت"
                    value={`${Number(
                        finance?.totalPayments || 0
                    ).toLocaleString("fa-IR")}تومان`}
                />

            </div>

            {/* payment */}
            <PaymentTable />


        </div>

    );

};

export default FinanceAndPayment;




