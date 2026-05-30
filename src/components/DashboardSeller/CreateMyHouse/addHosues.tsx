"use client";

import {
    useMemo,
    useState
} from "react";

import Link from "next/link";

import {
    ArrowLeftFromLine
} from "lucide-react";

import CirclesIcon from "@/components/DashboardSeller/Icon/CirclesIcon";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

const AddHousePage = () => {

    const [step, setStep] =
        useState(1);

    const [formData, setFormData] =
        useState({

            title: "",
            capacity: "",
            price: "",
            transactionType: "",
            propertyType: "",
            region: "",
            description: "",

        });

    const [errors, setErrors] =
        useState<Record<string, string>>({});

    const stepItems = [

        "مشخصات اولیه",
        "آدرس",
        "امکانات",
        "تصاویر ملک",
        "تایید نهایی",

    ];

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        setFormData({

            ...formData,
            [e.target.name]:
                e.target.value,

        });

    };

    const validateStepOne = () => {

        const newErrors:
            Record<string, string> = {};

        const fieldsToValidate = [

            "title",
            "capacity",
            "price",
            "transactionType",
            "propertyType",
            "region",
            "description",

        ];

        fieldsToValidate.forEach((field) => {

            if (
                !formData[
                field as keyof typeof formData
                ]
            ) {

                newErrors[field] =
                    "این فیلد الزامی است";

            }

        });

        setErrors(newErrors);

        return Object.keys(newErrors)
            .length === 0;

    };

    const nextStep = () => {

        if (step === 1) {

            const isValid = validateStepOne();
            if (!isValid) return;
        }

        if (step < 5) { 
            setStep((prev) => prev + 1);
        } else {
            console.log("ثبت آگهی");

            // submit ======
        }

    };

    const prevStep = () => {

        if (step > 1) {

            setStep((prev) => prev - 1);

        }

    };

    const currentStep = useMemo(() => {

        switch (step) {

            case 1:

                return (

                    <StepOne
                        formData={formData}
                        handleChange={handleChange}
                        errors={errors}
                    />

                );

            case 2:
                return <StepTwo />;
            case 3:
                return <StepThree />;
            case 4:
                return <StepFour />;
            case 5:
                return <StepFive />;

            default:

                return null;

        }

    }, [
        step,
        formData,
        errors
    ]);

    return (

        <div>

            {/* HEADER */}
            <div
                className="
                flex justify-between"
            >

                <div>

                    <div
                        className="
                        flex gap-1.5
                        items-center"
                    >

                        <div
                            className="
                            w-6.75 h-6.5
                            flex gap-0.5
                            items-center
                            flex-wrap-reverse
                            scale-x-[-1]"
                        >
                            <CirclesIcon />
                        </div>

                        <div
                            className="
                            text-blue-500
                            text-[18px]
                            font-bold"
                        >
                            مدیریت املاک
                        </div>

                        <div
                            className="
                            w-6.75 h-6.5
                            flex gap-0.5
                            items-center
                            flex-wrap-reverse"
                        >
                            <CirclesIcon />
                        </div>

                    </div>

                    <p
                        className="
                        text-[14px]
                        mt-2
                        text-[#1E1B4B]"
                    >
                        ساخت آگهی ملک جدید
                    </p>

                </div>

                <Link
                    href={
                        "/dashboard/seller/housemanegement"
                    }
                    className="
                    flex gap-1
                    items-center
                    text-[#1D9BF0]
                    text-sm"
                >

                    لیست املاک من

                    <ArrowLeftFromLine
                        size={15}
                    />

                </Link>

            </div>

            {/* STEPPER */}
            <div
                className="flex items-center justify-center border mt-8"
            >

                {
                    stepItems.map((
                        item,
                        index
                    ) => {

                        const stepNumber =
                            index + 1;

                        const active =
                            step === stepNumber;

                        const completed =
                            step > stepNumber;

                        return (

                            <div
                                key={item}
                                className="
                                flex items-center"
                            >

                                <div
                                    className="
                                    flex items-center
                                    gap-3"
                                >

                                    <div
                                        className={`
                                            w-12 h-12
                                            rounded-2xl
                                            flex items-center
                                            justify-center
                                            border-dashed transition-all

                                            ${active
                                                ? "bg-[#1400B7] text-white border-[#1400B7]"
                                                : completed
                                                    ? "bg-[#22C55E] text-white border-dashed border-[#22C55E]"
                                                    : "bg-white text-gray-400 border-gray-300"
                                            }
                                        `}
                                    >
                                        {stepNumber}
                                    </div>

                                    <span
                                        className={`
                                            text-sm

                                            ${active
                                                ? "text-[#1400B7]"
                                                : completed
                                                    ? "text-[#22C55E]"
                                                    : "text-gray-400"
                                            }
                                        `}
                                    >
                                        {item}
                                    </span>

                                </div>

                                {
                                    index !==
                                    stepItems.length - 1 && (

                                        <div
                                            className={`
                                                w-28
                                                border-t-2
                                                border-dashed
                                                mx-4

                                                 ${step > stepNumber
                                                    ? "border-[#22C55E]"
                                                    : "border-gray-300"
                                                }
                                            `}
                                        />

                                    )
                                }

                            </div>

                        );

                    })
                }

            </div>

            {/* STEP CONTENT */}
            <div className="mt-10">

                {currentStep}

            </div>

            {/* ACTION BUTTONS */}
            <div
                className={`
                    flex  border mt-4  gap-3

                    ${step > 1
                        ? "justify-start"
                        : "justify-start"
                    }
                `}
            >

                {
                    step > 1 && (

                        <button
                            onClick={prevStep}
                            className="cursor-pointer w-52 h-14 rounded-2xl border border-[#1400B7] text-[#1400B7]"
                        >
                            مرحله قبل
                        </button>

                    )
                }

                <button
                    onClick={nextStep}
                    className="cursor-pointer w-52 h-14 rounded-2xl bg-[#1400B7] text-white"
                >
                    {
                        step === 5
                            ? " ثبت آگهی"
                            : "مرحله بعد"
                    }
                </button>

            </div>

        </div>

    );
};

export default AddHousePage;