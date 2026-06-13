"use client";

import { useEffect, useState } from "react";

interface SellerCommentType {
    id: number;
    house_id: number;
    title: string;
    caption: string;
    rating: string;
    created_at: string;
    parent_comment_id: number | null;

    user: {
        firstName: string;
        lastName: string;
        profilePicture: string | null;
    };

    house: {
        id: number;
        title: string;
        address: string;
    };
}

interface SellerCommentsResponse {
    comments: SellerCommentType[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
}

export default function SellerComment() {
    const [comments, setComments] = useState<SellerCommentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    "/api/comments/seller/360?page=1&limit=10"
                );

                if (!response.ok) {
                    throw new Error("خطا در دریافت کامنت‌ها");
                }

                const data: SellerCommentsResponse =
                    await response.json();

                setComments(data.comments || []);
            } catch (err) {
                console.error("خطا در دریافت کامنت‌ها:", err);
                setError("دریافت کامنت‌ها ناموفق بود");
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                در حال دریافت اطلاعات...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center py-10">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {comments.length === 0 ? (
                <div className="text-center">
                    کامنتی یافت نشد
                </div>
            ) : (
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="border rounded-xl p-4 bg-white"
                    >
                        <div className="flex justify-between mb-2">
                            <h3 className="font-bold">
                                {comment.title}
                            </h3>

                            <span>
                                ⭐ {comment.rating}
                            </span>
                        </div>

                        <p className="mb-3">
                            {comment.caption}
                        </p>

                        <div className="text-sm text-gray-500">
                            {comment.user.firstName}{" "}
                            {comment.user.lastName}
                        </div>

                        <div className="text-sm text-gray-500 mt-1">
                            {comment.house.title}
                        </div>

                        <div className="text-xs text-gray-400 mt-2">
                            {new Date(
                                comment.created_at
                            ).toLocaleDateString("fa-IR")}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}