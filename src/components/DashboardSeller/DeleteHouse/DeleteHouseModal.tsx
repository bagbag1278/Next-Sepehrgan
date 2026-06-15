"use client";

interface DeleteHouseModalProps {
open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteHouseModal = ({open, onClose,onDelete,}: DeleteHouseModalProps) => {
    if (!open) return null;

    return (

        <div
            onClick={onClose}
            className="
                fixed inset-0 z-999
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
                    w-100 rounded-2xl
                    bg-white
                    dark:bg-slate-800
                    p-6 shadow-2xl
                    border border-gray-200
                    dark:border-slate-700"
            >

                <h2
                    className="
                        text-lg font-bold
                        text-gray-800
                        dark:text-white
                        mb-4 text-center"
                >
                    آیا از حذف ملک مطمئن هستید؟
                </h2>

                <p
                    className="
                        text-sm text-gray-500
                        dark:text-gray-300
                        text-center mb-6"
                >
                    بعد از حذف، اطلاعات این
                    ملک قابل بازگشت نخواهد بود.
                </p>

                <div className="flex gap-3">

                    <button
                        onClick={onClose}
                        className="
                            flex-1 h-11
                            rounded-xl
                            bg-gray-200
                            dark:bg-slate-700
                            text-gray-800
                            dark:text-white"
                    >
                        خیر
                    </button>

                    <button
                        onClick={onDelete}
                        className="
                            flex-1 h-11
                            rounded-xl
                            bg-red-500
                            text-white"
                    >
                        بله حذف شود
                    </button>

                </div>

            </div>

        </div>

    );

};

export default DeleteHouseModal;