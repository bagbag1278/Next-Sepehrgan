"use client";

interface StepOneProps {

    formData: {
        title: string;
        capacity: string;
        price: string;
        transactionType: string;
        propertyType: string;
        region: string;
        description: string;
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

const StepOne = ({
    formData,
    handleChange,
    errors
}: StepOneProps) => {

    return (

        <div
            className="
            grid grid-cols-3
            gap-6 mt-10"
        >

            {/* title */}
            <div>

                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="نام آپارتمان مورد نظر ..."
                    className="
                    w-full h-12
                    rounded-2xl
                    border border-[#4DB5FF]
                    px-4 outline-none"
                />

                {
                    errors.title && (

                        <p
                            className="
                            text-red-500
                            text-xs mt-1"
                        >
                            {errors.title}
                        </p>

                    )
                }

            </div>

            {/* capacity */}
            <div>

                <input
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="ظرفیت ( نفر )"
                    className="
                    w-full h-12
                    rounded-2xl
                    border border-[#4DB5FF]
                    px-4 outline-none"
                />

                {
                    errors.capacity && (

                        <p
                            className="
                            text-red-500
                            text-xs mt-1"
                        >
                            {errors.capacity}
                        </p>

                    )
                }

            </div>

            {/* price */}
            <div>

                <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="قیمت ( ریال )"
                    className="
                    w-full h-12
                    rounded-2xl
                    border border-[#4DB5FF]
                    px-4 outline-none"
                />

                {
                    errors.price && (

                        <p
                            className="
                            text-red-500
                            text-xs mt-1"
                        >
                            {errors.price}
                        </p>

                    )
                }

            </div>

            {/* transaction type */}
            <div>

                <select
                    name="transactionType"
                    value={formData.transactionType}
                    onChange={handleChange}
                    className="
                    w-full h-12
                    rounded-2xl
                    border border-[#4DB5FF]
                    px-4 outline-none"
                >

                    <option value="">
                        نوع معامله
                    </option>

                    <option value="sell">
                        فروش
                    </option>

                    <option value="rent">
                        اجاره
                    </option>

                </select>

                {
                    errors.transactionType && (

                        <p
                            className="
                            text-red-500
                            text-xs mt-1"
                        >
                            {errors.transactionType}
                        </p>

                    )
                }

            </div>

            {/* property type */}
            <div>

                <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="
                    w-full h-12
                    rounded-2xl
                    border border-[#4DB5FF]
                    px-4 outline-none"
                >

                    <option value="">
                        نوع ملک
                    </option>

                    <option value="villa">
                        ویلا
                    </option>

                    <option value="apartment">
                        آپارتمان
                    </option>

                </select>

                {
                    errors.propertyType && (

                        <p
                            className="
                            text-red-500
                            text-xs mt-1"
                        >
                            {errors.propertyType}
                        </p>

                    )
                }

            </div>

            {/* region */}
            <div>

                <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="
                    w-full h-12
                    rounded-2xl
                    border border-[#4DB5FF]
                    px-4 outline-none"
                >

                    <option value="">
                        ریزنوع ملک
                    </option>

                    <option value="north">
                        شمال
                    </option>

                    <option value="center">
                        مرکز شهر
                    </option>

                </select>

                {
                    errors.region && (

                        <p
                            className="
                            text-red-500
                            text-xs mt-1"
                        >
                            {errors.region}
                        </p>

                    )
                }

            </div>

            {/* description */}
            <div className="col-span-3">

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="توضیحات ملک"
                    className="
                    w-full h-30
                    rounded-2xl
                    border border-[#4DB5FF]
                    p-4 outline-none
                    resize-none"
                />

                {
                    errors.description && (

                        <p
                            className="
                            text-red-500
                            text-xs mt-1"
                        >
                            {errors.description}
                        </p>

                    )
                }

            </div>

        </div>

    );
};

export default StepOne;