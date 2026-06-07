"use client";

interface StepOneProps {

    formData: {
        title: string;
        capacity: string;
        price: string;
        transaction_type: string;
        propertyType: string;
        region: string;
        caption: string;
    };

    handleChange: (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => void;

    errors: Record<string, string>;

}

const StepOne = ({ formData, handleChange, errors }: StepOneProps) => {

    return (

        <div
            className="
            grid grid-cols-3
            gap-6 mt-10 mb-13"
        >

            {/* title */}
            <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={
                    errors.title
                        ? errors.title
                        : "نام آپارتمان مورد نظر ..."
                }
                className={`
                    w-full h-12
                    rounded-2xl
                    px-4 outline-none
                    transition-all

                    ${errors.title
                        ? "border border-red-500 placeholder:text-red-500"
                        : "border border-[#4DB5FF]"
                    }
                `}
            />

            {/* capacity */}
            <input
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder={
                    errors.capacity
                        ? errors.capacity
                        : "ظرفیت ( نفر )"
                }
                className={`
                    w-full h-12
                    rounded-2xl
                    px-4 outline-none
                    transition-all

                    ${errors.capacity
                        ? "border border-red-500 placeholder:text-red-500"
                        : "border border-[#4DB5FF]"
                    }
                `}
            />

            {/* price */}
            <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder={
                    errors.price
                        ? errors.price
                        : "قیمت ( ریال )"
                }
                className={`
                    w-full h-12
                    rounded-2xl
                    px-4 outline-none
                    transition-all

                    ${errors.price
                        ? "border border-red-500 placeholder:text-red-500"
                        : "border border-[#4DB5FF]"
                    }
                `}
            />

            {/* transaction type */}
            <select
                name="transaction_type"
                value={formData.transaction_type}
                onChange={handleChange}
                className={`
                    w-full h-12
                    rounded-2xl
                    px-4 outline-none
                    transition-all

                    ${errors.transaction_type
                        ? "border border-red-500 text-red-500"
                        : "border border-[#4DB5FF]"
                    }
                `}
            >

                <option value="">
                    {
                        errors.transaction_type
                            ? errors.transaction_type
                            : "نوع معامله"
                    }
                </option>

                <option value="rental">
                    اجاره
                </option>

                <option value="reservation">
                    رزرو
                </option>

                <option value="mortgage">
                    رهن
                </option>

            </select>

            {/* property type */}
            <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className={`
                    w-full h-12
                    rounded-2xl
                    px-4 outline-none
                    transition-all

                    ${errors.property_type
                        ? "border border-red-500 text-red-500"
                        : "border border-[#4DB5FF]"
                    }
                `}
            >

                <option value="">
                    {
                        errors.propertyType
                            ? errors.propertyType
                            : "نوع ملک"
                    }
                </option>

                <option value="villa">
                    ویلا
                </option>

                <option value="apartment">
                    آپارتمان
                </option>

            </select>

            {/* region */}
            <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className={`
                    w-full h-12
                    rounded-2xl
                    px-4 outline-none
                    transition-all

                    ${errors.region
                        ? "border border-red-500 text-red-500"
                        : "border border-[#4DB5FF]"
                    }
                `}
            >

                <option value="">
                    {
                        errors.region
                            ? errors.region
                            : "ریزنوع ملک"
                    }
                </option>

                <option value="north">
                    شمال
                </option>

                <option value="center">
                    مرکز شهر
                </option>

            </select>

            {/* description */}
            <textarea
                name="caption"
                value={formData.caption}
                onChange={handleChange}
                placeholder={
                    errors.caption
                        ? errors.caption
                        : "توضیحات ملک"
                }
                className={`
                    col-span-3
                    w-full h-30
                    rounded-2xl
                    p-4 outline-none
                    resize-none
                    transition-all

                    ${errors.caption
                        ? "border border-red-500 placeholder:text-red-500"
                        : "border border-[#4DB5FF]"
                    }
                `}
            />

        </div>

    );

};

export default StepOne;