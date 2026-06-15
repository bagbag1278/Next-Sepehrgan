
"use client";
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from "react";
import AddComment from "./AddComment";
import CommentCard from "./CommentCard";

const CommentsSection = ({ houseId }: { houseId: any }) => {
  const t = useTranslations('CommentsSection');
  const [comments, setComments] = useState<any[]>([]);
  const [totalCommentsCount, setTotalCommentsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);

  const buildTree = (allComments: any[], parentId: any = null): any[] => {
    return allComments
      .filter((c: any) => c.parent_comment_id === parentId)
      .map((c: any) => {
        if (!c.id || c.id === 1) return null;

        return {
          id: c.id,
          name: c.user
            ? `${c.user.firstName} ${c.user.lastName}`
            : c.title || t('guestUser'),
          title: c.title || "",
          date: c.created_at
            ? new Date(c.created_at).toLocaleDateString("fa-IR")
            : "۱۴۰۴/۰۱/۰۱",
          rate: c.rating?.toString() || null,
          text: c.caption || t('noText'),
          replies: buildTree(allComments, c.id),
        };
      })
      .filter((item: any) => item !== null);
  };

  const fetchComments = useCallback(async () => {
    if (!houseId) return;
    try {
      setLoading(true);
      const response = await fetch(`/api/comments?house_id=${houseId}`);
      const result = await response.json();
      const rawList = result.comments || (Array.isArray(result) ? result : []);
      setTotalCommentsCount(rawList.length);
      const treeStructure = buildTree(rawList, null);
      setComments(treeStructure);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [houseId, t]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const mainComments = comments.filter(c => !c.parent_comment_id);
  const showMore = () => setVisibleCount(prev => prev + 4);
  const visibleComments = mainComments.slice(0, visibleCount);
  const hasMore = visibleCount < mainComments.length;

  return (
    <div className="w-full mx-auto p-3 sm:p-4 md:p-6" dir="rtl">
      {/* هدر بخش نظرات */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8 md:mb-10 px-2">
        <h2 className="text-[#10088F] dark:text-blue-600 text-[16px] sm:text-[18px] font-bold text-center sm:text-right">
          {t('userComments')} ({totalCommentsCount})
        </h2>
        <AddComment houseId={houseId} onReplySubmitted={fetchComments} />
      </div>

      {/* لیست نظرات */}
      <div className="flex flex-col gap-4 sm:gap-5">
        {loading ? (
          <div className="text-center py-10 text-gray-400 dark:text-gray-500">
            {t('loading')}
          </div>
        ) : visibleComments.length > 0 ? (
          <>
            {visibleComments.map((comment) => (
              <CommentCard
                key={comment.id}
                {...comment}
                houseId={houseId}
                onReplySubmitted={fetchComments}
                fetchComments={fetchComments}
              />
            ))}

            {hasMore && (
              <button
                onClick={showMore}
                className="mt-4 sm:mt-6 mx-auto px-4 sm:px-6 py-2 text-[12px] sm:text-[14px] font-bold text-[#0887CA] dark:text-blue-400 rounded-xl hover:border-[#0887CA] dark:hover:border-blue-500 hover:border transition-all duration-300 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                {t('viewMore')} (+{mainComments.length - visibleCount})
              </button>
            )}
          </>
        ) : (
          <div className="text-center py-10 text-gray-400 dark:text-gray-500">
            <p>{t('noComments') || 'هیچ نظری ثبت نشده است'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;