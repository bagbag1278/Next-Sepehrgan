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
    <div className="w-full max-w-[850px] mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-10 px-2 flex-wrap gap-4">
        <h2 className="text-[#10088F] dark:text-blue-600 text-[18px] font-bold">
          {t('userComments')} ({totalCommentsCount})
        </h2>
        <AddComment houseId={houseId} onReplySubmitted={fetchComments} />
      </div>

      <div className="flex flex-col">
        {loading ? (
          <div className="text-center py-10 text-gray-400 dark:text-gray-500">
            {t('loading')}
          </div>
        ) : (
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
                className="mt-6 mx-auto px-6 py-2 text-[14px] font-bold text-[#0887CA] dark:text-blue-400 rounded-[12px] hover:border-[#0887CA] dark:hover:border-blue-500 hover:border transition-all duration-300"
              >
                {t('viewMore')} (+{mainComments.length - visibleCount})
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;