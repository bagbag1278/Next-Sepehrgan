"use client";

import { useState } from "react";

import {
    ChevronDown,
    X
} from "lucide-react";

const StepThree = () => {

    const [rooms, setRooms] =
        useState("");

    const [bathrooms, setBathrooms] =
        useState("");

    const [parking, setParking] =
        useState("");

    const [yardType, setYardType] =
        useState("");

    const [tags, setTags] =
        useState<string[]>([]);

    const tagOptions = [

        "مدرن",
        "آپارتمان",
        "آسانسوردار",
        "استخر",
        "پارکینگ",
        "ویو دریا",

    ];

    const addTag = (
        value: string
    ) => {

        if (
            value &&
            !tags.includes(value)
        ) {

            setTags([
                ...tags,
                value
            ]);

        }

    };

    const removeTag = (
        tag: string
    ) => {

        setTags(

            tags.filter(
                (item) =>
                    item !== tag
            )

        );

    };

    return (

        <div className="flex flex-wrap gap-x-3 gap-y-3 mb-54" >

            {/* rooms */}
            <div
                className="w-77 border h-12 rounded-2xl
                 border-[#4DB5FF]
                px-4"
            >

                <select
                    value={rooms}
                    onChange={(e) =>
                        setRooms(
                            e.target.value
                        )
                    }
                    className="
                    w-full h-full
                    outline-none
                    bg-transparent
                    text-[#4DB5FF]"
                >

                    <option value="">
                        تعداد اتاق
                    </option>

                    <option value="1">
                        1
                    </option>

                    <option value="2">
                        2
                    </option>

                    <option value="3">
                        3
                    </option>

                    <option value="4">
                        4
                    </option>

                </select>

            </div>

            {/* bathrooms */}
            <div
                className="
                h-12 w-77 rounded-2xl
                border border-[#4DB5FF]
                px-4"
            >

                <select
                    value={bathrooms}
                    onChange={(e) =>
                        setBathrooms(
                            e.target.value
                        )
                    }
                    className="w-full h-full outline-none bg-transparent text-[#4DB5FF]" >

                    <option value="">
                        تعداد حمام
                    </option>

                    <option value="1">
                        1
                    </option>

                    <option value="2">
                        2
                    </option>

                    <option value="3">
                        3
                    </option>

                </select>

            </div>

            {/* parking */}
            <div
                className="h-12 w-77 rounded-2xl border border-[#4DB5FF] px-4">

                <select
                    value={parking}
                    onChange={(e) =>
                        setParking(
                            e.target.value
                        )
                    }
                    className="w-full h-full  outline-none bg-transparent text-[#4DB5FF]" >

                    <option value="">
                        تعداد پارکینگ
                    </option>

                    <option value="0">
                        بدون پارکینگ
                    </option>

                    <option value="1">
                        1
                    </option>

                    <option value="2">
                        2
                    </option>

                </select>

            </div>

            {/* yard type */}
            <div className="h-12 w-77 rounded-2xl border border-[#4DB5FF] px-4">

                <select
                    value={yardType}
                    onChange={(e) =>
                        setYardType(
                            e.target.value
                        )
                    }
                    className="w-full h-full  outline-none bg-transparent  text-[#4DB5FF]"
                >

                    <option value="">
                        نوع حیاط
                    </option>

                    <option value="private">
                        اختصاصی
                    </option>

                    <option value="shared">
                        اشتراکی
                    </option>

                </select>

            </div>

            {/* tags */}
            <div className=" col-span-2 min-h-12 rounded-2xl border border-[#4DB5FF] p-2">

                <div className="flex flex-wrap gap-2">

                    {
                        tags.map((tag) => (

                            <div
                                key={tag}
                                className=" h-8 px-4  rounded-full bg-[#1D9BF0]  text-white flex items-center  gap-2"
                            >

                                <button
                                    onClick={() =>
                                        removeTag(tag)
                                    }
                                >

                                    <X size={14} />

                                </button>

                                <span>
                                    {tag}
                                </span>

                            </div>

                        ))
                    }

                    <select
                        onChange={(e) =>
                            addTag(
                                e.target.value
                            )
                        }
                        className="h-8  w-152.75! outline-none text-[#4DB5FF]  bg-transparent" >

                        <option value="">
                            برچسب ها
                        </option>

                        {
                            tagOptions.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>

                            ))
                        }

                    </select>

                </div>

            </div>

        </div>

    );

};

export default StepThree;