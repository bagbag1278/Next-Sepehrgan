"use client";

import { useState } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";

import CreateHouse from "@/core/api/DashboardSeller/CreateHouse";

import {
    ArrowLeftFromLine,
    BadgeCheck,
    House,
    ImagePlus,
    MapPinned,
    Sparkles
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import CirclesIcon from "@/components/DashboardSeller/Icon/CirclesIcon";

import StepOne from "./StepOne";
const StepTwo = dynamic(() => import("./StepTwo"), { ssr: false });
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import ToEnglishNumber from "@/components/untils/ToEnglishNumber";

const AddHousePage = () => {

    const [step, setStep] = useState(1);
    const [image, setImage] = useState<string | null>(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        capacity: "",
        price: "",
        transaction_type: "",
        propertyType: "",
        region: "",
        caption: "",
        location: {
            lat: null,
            lng: null,
            address: "",
        },
    });

    const [amenities, setAmenities] = useState({
        rooms: "",
        bathrooms: "",
        parking: "",
        yard_type: "",
        tags: [] as string[],
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const stepItems = [
        { title: "گام اول", icon: House },
        { title: "آدرس", icon: MapPinned },
        { title: "امکانات", icon: Sparkles },
        { title: "تصاویر", icon: ImagePlus },
        { title: "تایید نهایی", icon: BadgeCheck },
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
            [e.target.name]: e.target.value,
        });
    };

    const validateStepOne = () => {

        const newErrors: Record<string, string> = {};

        const fieldsToValidate = [
            "title",
            "capacity",
            "price",
            "transaction_type",
            "propertyType",
            "region",
            "caption",
        ];

        fieldsToValidate.forEach((field) => {
            if (!formData[field as keyof typeof formData]) {
                newErrors[field] = "این فیلد الزامی است";
            }
        });

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = async () => {

        try {

            const body = {
                title: formData.title,
                address: formData.location.address ||  "آدرس ثبت نشده",
                price: Number(ToEnglishNumber(formData.price)),
                tags: amenities.tags,
                capacity: Number(ToEnglishNumber(formData.capacity)),

                location: {
                    lat: formData.location.lat,
                    lng: formData.location.lng,
                },

                categories: {
                    name: formData.propertyType,
                },

                bathrooms: Number(amenities.bathrooms),
                parking: Number(amenities.parking),
                rooms: Number(amenities.rooms),

                yard_type: amenities.yard_type,

                transaction_type: formData.transaction_type,

                caption: formData.caption,
            };

            const response = await CreateHouse(body);

            console.log("SUCCESS =>", response);

            toast.success("آگهی با موفقیت ثبت شد");

            router.push("/dashboard/seller/housemanegement");

        } catch (error) {

            console.log("ERROR =>", error);

            toast.error("ثبت آگهی ناموفق بود");

        }

    };


    const nextStep = async () => {

        if (step === 1) {

            const isValid = validateStepOne();

            if (!isValid) return;

        }

        if (step < 5) {

            setStep((prev) => prev + 1);

        } else {

            await handleSubmit();

        }

    };


    const prevStep = () => {
        if (step > 1) {
            setStep((prev) => prev - 1);
        }
    };

    const renderStep = () => {

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
                return (
                    <StepTwo
                        formData={formData}
                        setFormData={setFormData}
                    />
                );

            case 3:
                return (
                    <StepThree
                        amenities={amenities}
                        setAmenities={setAmenities}
                    />
                );

            case 4:
                return (
                    <StepFour
                        image={image}
                        setImage={setImage}
                    />
                );

            case 5:
                return (
                    <StepFive
                        formData={formData}
                        amenities={amenities}
                        image={image}
                    />
                );

            default:
                return null;

        }

    };

    return (

        <div>

            {/* HEADER */}
            <div className="flex justify-between">

                <div>

                    <div className="flex gap-1.5 items-center">

                        <div className="w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse scale-x-[-1]">
                            <CirclesIcon />
                        </div>

                        <div className="text-blue-200  dark:text-blue-500 text-[18px] font-bold">
                            مدیریت املاک
                        </div>

                        <div className="w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse">
                            <CirclesIcon />
                        </div>

                    </div>

                    <p className="text-[14px] mt-2 text-[#1E1B4B] dark:text-blue-300">
                        ساخت آگهی ملک جدید
                    </p>

                </div>

                <Link
                    href="/dashboard/seller/housemanegement"
                    className="flex gap-1 items-center text-[#1D9BF0] text-sm"
                >
                    لیست املاک من
                    <ArrowLeftFromLine size={15} />
                </Link>

            </div>

            {/* STEPPER */}
            <div className="flex items-center justify-center mt-8">
                {stepItems.map((item, index) => {

                    const stepNumber = index + 1;
                    const active = step === stepNumber;
                    const completed = step > stepNumber;

                    return (

                        <div
                            key={index}
                            className="w-full flex justify-between items-center"
                        >

                            <div className="flex items-center">

                                <div
                                    className={`
                                        w-11 h-11 rounded-2xl flex items-center
                                        justify-center border-dashed transition-all
                                        ${active
                                            ? "bg-[#1400B7] text-white border-[#1400B7]"
                                            : completed
                                                ? "bg-[#22C55E] text-white border-dashed border-[#22C55E]"
                                                : "bg-white text-gray-400 border-gray-300"
                                        }
                                    `}
                                >
                                    <item.icon size={16} />
                                </div>

                                <span
                                    className={`
                                        text-sm flex mr-1
                                        ${active
                                            ? "text-[#1400B7]"
                                            : completed
                                                ? "text-[#22C55E]"
                                                : "text-gray-400"
                                        }
                                    `}
                                >
                                    {item.title}
                                </span>

                            </div>

                            {index !== stepItems.length - 1 && (
                                <div
                                    className={`
                                        w-16 border-t-2 border-dashed mx-4
                                        ${step > stepNumber ? "border-[#22C55E]" : "border-gray-300"}
                                    `}
                                />
                            )}

                        </div>

                    );

                })}
            </div>

            {/* STEP CONTENT */}
            <div className="mt-10">
                {renderStep()}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex mt-4 gap-3 justify-start">

                {step > 1 && (
                    <button
                        onClick={prevStep}
                        className="cursor-pointer w-52 h-14 rounded-2xl border border-[#1400B7] text-[#1400B7]"
                    >
                        مرحله قبل
                    </button>
                )}

                <button
                    onClick={nextStep}
                    className="cursor-pointer w-52 h-14 rounded-2xl bg-[#1400B7] text-white"
                >
                    {step === 5 ? "ثبت آگهی" : "مرحله بعد"}
                </button>

            </div>

        </div>

    );

};

export default AddHousePage;