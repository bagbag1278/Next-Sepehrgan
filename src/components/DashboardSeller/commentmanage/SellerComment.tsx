"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquare, Search, Trash2 } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import GetSellerComments from "@/core/api/DashboardSeller/GetSellerComments";
import CirclesIcon from "../Icon/CirclesIcon";
import Pagination from "./Pagination";
import DeleteComment from "@/core/api/DashboardSeller/DeleteComment";
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

export default function SellerComment() {
    const [comments, setComments] = useState<SellerCommentType[]>([]);
    const [totalComments, setTotalComments] = useState(0);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);

                const data = await GetSellerComments(currentPage,);

                setComments(data.comments || []);
                setTotalPages(data.totalPages || 1);
                setTotalComments(data.totalCount || 0);

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));

        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    const handleDelete = async (id: number) => {
        try {
            await DeleteComment(id);

            setComments((prev) => prev.filter((c) => c.id !== id));
            setTotalComments((prev) => prev - 1);

        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="flex items-center gap-2">
                <CirclesIcon />
                <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    مدیریت کامنت‌ها
                </h1>
                <CirclesIcon />
            </div>

            {/* COUNT */}
            <div className="w-full flex justify-between items-center ">
                <div className="  dark:text-gray-400">
                    تعداد کامنت ها
                    <span className="font-bold text-gray-500">
                        ({totalComments})
                    </span>
                </div>

                {/* filter */}
                {/* <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={25} />
                    <input
                        type="text"
                        placeholder="جستجو نام خانه..."
                        
                        className="w-112.5 text-[#0887CAB2] h-12 rounded-2xl pr-3 dark:bg-slate-800 border border-[#0887CAB2]/70 outline-none focus:border-[#0887CAB2] focus:ring-[#0887CAB2]/30"
                    />
                </div> */}
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="
                            group
                            bg-white dark:bg-slate-800
                            border border-gray-100 dark:border-slate-700
                            rounded-3xl
                            p-3 px-4
                            shadow-sm
                            hover:shadow-xl
                            hover:-translate-y-1
                            transition-all duration-300
                        "
                    >


                        {/* USER + RATING */}
                        <div className=" flex items-center justify-between mb-4">

                            <div className="flex items-center gap-3">

                                <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 font-bold">
                                    {comment.user.firstName?.charAt(0)}
                                </div>

                                <div>
                                    <p className="font-bold text-gray-800 dark:text-white">
                                        {comment.user.firstName} {comment.user.lastName}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        {new Date(comment.created_at).toLocaleDateString("fa-IR")}
                                    </p>
                                </div>

                            </div>
                            <div className="flex w-20 justify-between ">

                                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                    <Star size={16} />
                                    {comment.rating}
                                </div>
                                <button
                                    onClick={async () => {
                                        try {
                                            await DeleteComment(comment.id);

                                            setComments((prev) =>
                                                prev.filter((c) => c.id !== comment.id)
                                            );

                                            setTotalComments((prev) => prev - 1);
                                        } catch (err) {
                                            console.log(err);
                                        }
                                    }}
                                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                                >
                                    <Trash2 className="text-red-500" size={18} />
                                </button>
                            </div>


                        </div>

                        {/* HOUSE */}
                        <div className="mb-4 px-3 py-2 rounded-2xl bg-blue-50 dark:bg-slate-700/50">
                            <p className="text-xs text-gray-500">اقامتگاه</p>
                            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                                {comment.house.title}
                            </p>
                        </div>

                        {/* TITLE */}
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                            {comment.title}
                        </h3>

                        {/* CAPTION */}
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-7">
                            {comment.caption}
                        </p>

                    </div>
                ))}



            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex justify-start pt-6">
                    <Pagination
                        page={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

        </div>
    );
}