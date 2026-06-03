"use client";

import { X } from "lucide-react";

interface Amenities {
    rooms: string;
    bathrooms: string;
    parking: string;
    yardType: string;
    tags: string[];
}

interface StepThreeProps {
    amenities: Amenities;
    setAmenities: (amenities: Amenities) => void;
}

const StepThree = ({ amenities, setAmenities }: StepThreeProps) => {

    const tagOptions = [
        "مدرن",
        "آپارتمان",
        "آسانسوردار",
        "استخر",
        "پارکینگ",
        "ویو دریا",
    ];

    const handleChange = (key: keyof Omit<Amenities, "tags">, value: string) => {
        setAmenities({ ...amenities, [key]: value });
    };

    const addTag = (value: string) => {
        if (value && !amenities.tags.includes(value)) {
            setAmenities({ ...amenities, tags: [...amenities.tags, value] });
        }
    };

    const removeTag = (tag: string) => {
        setAmenities({
            ...amenities,
            tags: amenities.tags.filter((item) => item !== tag),
        });
    };

    return (

        <div className="flex flex-wrap gap-x-3 gap-y-3 mb-54">

            {/* rooms */}
            <div className="w-77 border h-12 rounded-2xl border-[#4DB5FF] px-4">
                <select
                    value={amenities.rooms}
                    onChange={(e) => handleChange("rooms", e.target.value)}
                    className="w-full h-full outline-none bg-transparent text-[#4DB5FF]"
                >
                    <option value="">تعداد اتاق</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>

            {/* bathrooms */}
            <div className="h-12 w-77 rounded-2xl border border-[#4DB5FF] px-4">
                <select
                    value={amenities.bathrooms}
                    onChange={(e) => handleChange("bathrooms", e.target.value)}
                    className="w-full h-full outline-none bg-transparent text-[#4DB5FF]"
                >
                    <option value="">تعداد حمام</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>

            {/* parking */}
            <div className="h-12 w-77 rounded-2xl border border-[#4DB5FF] px-4">
                <select
                    value={amenities.parking}
                    onChange={(e) => handleChange("parking", e.target.value)}
                    className="w-full h-full outline-none bg-transparent text-[#4DB5FF]"
                >
                    <option value="">تعداد پارکینگ</option>
                    <option value="0">بدون پارکینگ</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>

            {/* yard type */}
            <div className="h-12 w-77 rounded-2xl border border-[#4DB5FF] px-4">
                <select
                    value={amenities.yardType}
                    onChange={(e) => handleChange("yardType", e.target.value)}
                    className="w-full h-full outline-none bg-transparent text-[#4DB5FF]"
                >
                    <option value="">نوع حیاط</option>
                    <option value="private">اختصاصی</option>
                    <option value="shared">اشتراکی</option>
                </select>
            </div>

            {/* tags */}
            <div className="col-span-2 min-h-12 rounded-2xl border border-[#4DB5FF] p-2">
                <div className="flex flex-wrap gap-2">

                    {amenities.tags.map((tag) => (
                        <div
                            key={tag}
                            className="h-8 px-4 rounded-full bg-[#1D9BF0] text-white flex items-center gap-2"
                        >
                            <button onClick={() => removeTag(tag)}>
                                <X size={14} />
                            </button>
                            <span>{tag}</span>
                        </div>
                    ))}

                    <select
                        value=""
                        onChange={(e) => addTag(e.target.value)}
                        className="h-8 cursor-pointer outline-none text-[#4DB5FF] bg-transparent"
                    >
                        <option value="">برچسب ها</option>
                        {tagOptions.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                </div>
            </div>

        </div>

    );

};

export default StepThree;