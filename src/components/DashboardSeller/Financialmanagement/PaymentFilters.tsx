import { ChevronDown,} from "lucide-react";

interface PaymentFiltersProps {

    totalCount: number;
    status: string;
    sort: string;
    order: string;

    onStatusChange: ( value: string ) => void;

    onSortChange: (sort: string, order: string) => void;

}

const PaymentFilters = ({totalCount, status, sort, order, onStatusChange,onSortChange,
}: PaymentFiltersProps) => {

    return (

        <div className=" flex flex-nowrap justify-between items-center flex-row-reverse gap-4" >

            <div className=" flex gap-4 flex-wrap">

                {/* وضعیت پرداخت */}

                <div className="relative" >

                    <select
                        value={status}
                        onChange={(e) =>
                            onStatusChange(
                                e.target.value
                            )
                        }
                        className=" w-62.5 h-12 rounded-[18px] dark:bg-slate-800 border text-[#0887CAB2]  border-[#40A8FF]
                            px-5 appearance-none  bg-white cursor-pointer "
                    >

                        <option value="">
                            همه وضعیت‌ها
                        </option>

                        <option value="completed">
                            موفق
                        </option>

                        <option value="pending">
                            در انتظار
                        </option>

                        <option value="failed">
                            ناموفق
                        </option>

                        <option value="refunded">
                            بازگشت وجه
                        </option>

                    </select>

                    <ChevronDown className=" absolute left-4   top-1/2 -translate-y-1/2
                            pointer-events-none text-[#0887CAB2]"
                    />

                </div>


                <div
                    className="
                        relative
                    "
                >

                    <select
                        value={`${sort}-${order}`}
                        onChange={(e) => {

                            const value = e.target.value;
                            switch (
                            value
                            ) {

                                case "createdAt-DESC":
                                    onSortChange(
                                        "createdAt",
                                        "DESC"
                                    );

                                    break;
                                case "createdAt-ASC":
                                    onSortChange(
                                        "createdAt",
                                        "ASC"
                                    );

                                    break;
                                case "amount-DESC":
                                    onSortChange(
                                        "amount",
                                        "DESC"
                                    );

                                    break;
                                case "amount-ASC":
                                    onSortChange(
                                        "amount",
                                        "ASC"
                                    );

                                    break;

                            }
                        }}
                        className=" w-62.5 h-12 rounded-[18px]  border text-[#0887CAB2] border-[#40A8FF]
                            px-5 appearance-none bg-white cursor-pointer  dark:bg-slate-800"
                    >

                        <option value="createdAt-DESC">
                            جدیدترین
                        </option>

                        <option value="createdAt-ASC">
                            قدیمی‌ترین
                        </option>

                        <option value="amount-DESC">
                            بیشترین مبلغ
                        </option>

                        <option value="amount-ASC">
                            کمترین مبلغ
                        </option>

                    </select>

                    <ChevronDown  className="absolute text-[#0887CAB2] left-4 top-1/2 -translate-y-1/2  pointer-events-none"/>
                </div>

            </div>

            <h2 className="text-[15px] flex font-bold">

                لیست تراکنش های مشتریان

                <div className=" text-gray-500  mr-1 " >
                    ({totalCount})
                </div>

            </h2>

        </div>

    );

};

export default PaymentFilters;