"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    useRouter,
    useSearchParams,
} from "next/navigation";

import GetPayments from "@/core/api/DashboardSeller/GetPayments";

import PaymentRow from "./PaymentRow";
import Pagination from "./Pagination";
import PaymentFilters from "./PaymentFilters";

import {
    Payment,
} from "@/core/types/DashboardSeller/Payment";

const PaymentTable = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const status = searchParams.get("status") || "";
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") || "DESC";

    const [payments, setPayments] = useState<Payment[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
        const fetchPayments =
            async () => {

                try {

                    if (
                        isFirstLoad
                    ) {

                        setLoading(
                            true
                        );

                    }

                    const data = await GetPayments({
                        page: currentPage, status, sort, order,
                    });

                    setPayments(data.payments || []);

                    setTotalCount(data.totalCount ||
                        0
                    );

                } catch (
                error
                ) {

                    console.log(
                        error
                    );

                } finally {

                    setLoading(
                        false
                    );

                    setIsFirstLoad(
                        false
                    );

                }

            };

        fetchPayments();

    }, [
        currentPage,
        status,
        sort,
        order,
    ]);

    const totalPages =
        Math.ceil(
            totalCount / 3
        );

    const handlePageChange =
        (
            page: number
        ) => {

            const params =
                new URLSearchParams(
                    searchParams.toString()
                );

            params.set(
                "page",
                String(
                    page
                )
            );

            router.push(
                `?${params.toString()}`
            );

        };

    const handleStatusChange =
        (
            value: string
        ) => {

            const params =
                new URLSearchParams(
                    searchParams.toString()
                );

            if (
                value
            ) {

                params.set(
                    "status",
                    value
                );

            } else {

                params.delete(
                    "status"
                );

            }

            params.set(
                "page",
                "1"
            );

            router.push(
                `?${params.toString()}`
            );

        };

    const handleSortChange =
        (
            sortValue: string,
            orderValue: string
        ) => {

            const params =
                new URLSearchParams(
                    searchParams.toString()
                );

            params.set(
                "sort",
                sortValue
            );

            params.set(
                "order",
                orderValue
            );

            params.set(
                "page",
                "1"
            );

            router.push(
                `?${params.toString()}`
            );

        };

    return (

        <div
            className="
                flex
                flex-wrap
                gap-3
            "
        >

            <div
                className="
                    w-full
                "
            >

                <PaymentFilters
                    totalCount={
                        totalCount
                    }
                    status={
                        status
                    }
                    sort={
                        sort
                    }
                    order={
                        order
                    }
                    onStatusChange={
                        handleStatusChange
                    }
                    onSortChange={
                        handleSortChange
                    }
                />

            </div>

            <div
                className="
                    w-full
                "
            >

                <div
                    className="h-16  rounded-2xl border border-[#E7EDF5] bg-[#FDFDFD] px-8 flex
                        items-center justify-between text-[#8C95A5] font-bold mb-4
                         dark:border-slate-700  dark:bg-slate-800
                    "
                >

                    <div
                        className="
                            flex
                            justify-start
                            w-full
                        "
                    >

                        <span
                            className="
                                w-40
                            "
                        >
                            ملک
                        </span>

                        <div
                            className="
                                flex
                                justify-center
                            "
                        >

                            <span
                                className="
                                    w-30
                                "
                            >
                                زمان
                            </span>

                            <span
                                className="
                                    w-25
                                "
                            >
                                کاربر
                            </span>

                            <span
                                className="
                                    w-35
                                    text-center
                                "
                            >
                                مبلغ
                            </span>

                            <span
                                className="
                                    w-35
                                    text-center
                                "
                            >
                                وضعیت پرداخت
                            </span>

                            <span
                                className="
                                    w-35
                                    text-center
                                "
                            >
                                تاریخ
                            </span>

                        </div>

                    </div>

                </div>

                <div
                    className="
                        w-full
                        space-y-4
                    "
                >

                    {
                        isFirstLoad &&
                            loading ? (

                            <div
                                className="
                                    text-center
                                    py-10
                                "
                            >
                                در حال دریافت اطلاعات...
                            </div>

                        ) : (

                            <>
                                {payments.length === 0 ? (

                                    <div
                                        className="
                h-40
                rounded-2xl
                border
                border-[#E7EDF5]
                bg-white
                flex
                items-center
                justify-center
                text-gray-500
                font-bold
            "
                                    >
                                        تراکنشی یافت نشد
                                    </div>

                                ) : (

                                    <>
                                        {payments.map((payment) => (

                                            <PaymentRow
                                                key={payment.id}
                                                payment={payment}
                                            />

                                        ))}

                                        {totalPages > 1 && (

                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                                onPageChange={handlePageChange}
                                            />

                                        )}
                                    </>

                                )}
                            </>

                        )
                    }

                </div>

            </div>

        </div>

    );

};

export default PaymentTable;