"use client";

import {
    useEffect,
    useState,
} from "react";

import { IHouse }
    from "@/core/api/DashboardSeller/GetHousesUser";

interface Props {

    open: boolean;

    onClose: () => void;

    house: IHouse | null;

    onSubmit: (
        data: any
    ) => void;

}

const EditHouseModal = ({
    open,
    onClose,
    house,
    onSubmit,
}: Props) => {

    const [title, setTitle] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [address, setAddress] =
        useState("");

    const [caption, setCaption] =
        useState("");

    useEffect(() => {

        if (house) {

            setTitle(
                house.title || ""
            );

            setPrice(
                String(
                    house.price || ""
                )
            );

            setAddress(
                house.address || ""
            );

            setCaption(
                house.caption || ""
            );

        }

    }, [house]);

    if (!open || !house)
        return null;

    return (

        <div
            onClick={onClose}
            className="
                fixed inset-0
                z-[999]
                flex items-center
                justify-center
                bg-black/40
                backdrop-blur-sm"
        >

            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                className="
                    w-[700px]
                    rounded-3xl
                    bg-white
                    dark:bg-slate-900
                    p-8"
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        mb-6"
                >
                    ویرایش ملک
                </h2>

                <div className="space-y-4">

                    <input
                        value={title}
                        onChange={(e) =>
                            setTitle(
                                e.target.value
                            )
                        }
                        placeholder="عنوان"
                        className="
                            w-full h-12
                            rounded-xl
                            border px-4"
                    />

                    <input
                        value={price}
                        onChange={(e) =>
                            setPrice(
                                e.target.value
                            )
                        }
                        placeholder="قیمت"
                        className="
                            w-full h-12
                            rounded-xl
                            border px-4"
                    />

                    <input
                        value={address}
                        onChange={(e) =>
                            setAddress(
                                e.target.value
                            )
                        }
                        placeholder="آدرس"
                        className="
                            w-full h-12
                            rounded-xl
                            border px-4"
                    />

                    <textarea
                        value={caption}
                        onChange={(e) =>
                            setCaption(
                                e.target.value
                            )
                        }
                        placeholder="توضیحات"
                        className="
                            w-full h-40
                            rounded-xl
                            border p-4"
                    />

                </div>

                <div
                    className="
                        flex gap-4
                        mt-6"
                >

                    <button
                        onClick={onClose}
                        className="
                            flex-1 h-12
                            rounded-xl
                            bg-gray-200"
                    >
                        لغو
                    </button>

                    <button
                        onClick={() =>
                            onSubmit({
                                title,
                                price,
                                address,
                                caption,
                            })
                        }
                        className="
                            flex-1 h-12
                            rounded-xl
                            bg-blue-500
                            text-white"
                    >
                        ذخیره تغییرات
                    </button>

                </div>

            </div>

        </div>

    );

};

export default EditHouseModal;