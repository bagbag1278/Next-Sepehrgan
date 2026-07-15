"use client";

import { useRouter } from "next/navigation";
import Pagination from "./Pagination";

interface SellerCommentType {
    id: number;
    title: string;
    caption: string;
    rating: string;
    created_at: string;
    user: {
        firstName: string;
        lastName: string;
    };
    house: {
        title: string;
    };
}

interface Props {
    initialData: {
        comments: SellerCommentType[];
        totalPages: number;
        totalCount: number;
    };
    currentPage: number;
}

export default function SellerComment({
    initialData,
    currentPage,
}: Props) {

    const router = useRouter();

    const comments = initialData.comments || [];
    const totalPages = initialData.totalPages || 1;

    const handlePageChange = (page: number) => {
        router.push(`?page=${page}`);
    };

    if (!comments.length) {
        return (
            <div className="text-center py-10 text-gray-500">
                کامنتی یافت نشد
            </div>
        );
    }

    return (
        <div className="space-y-4">

            {/* GRID (2 تا در هر ردیف) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="
                            bg-white dark:bg-slate-800
                            border border-gray-200 dark:border-slate-700
                            rounded-2xl p-4
                            shadow-sm hover:shadow-md
                            transition
                        "
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-blue-600 dark:text-blue-400">
                                {comment.title}
                            </h3>

                            <span className="text-yellow-500 font-bold">
                                ⭐ {comment.rating}
                            </span>
                        </div>

                        {/* Caption */}
                        <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm leading-6">
                            {comment.caption}
                        </p>

                        {/* User */}
                        <div className="mt-4 text-sm text-gray-500">
                            👤 {comment.user.firstName} {comment.user.lastName}
                        </div>

                        {/* House */}
                        <div className="text-xs text-gray-400 mt-1">
                            🏠 {comment.house.title}
                        </div>

                        {/* Date */}
                        <div className="text-xs text-gray-400 mt-2">
                            {new Date(comment.created_at).toLocaleDateString("fa-IR")}
                        </div>
                    </div>
                ))}

            </div>

            {/* Pagination */}
            <Pagination
                page={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

        </div>
    );
}