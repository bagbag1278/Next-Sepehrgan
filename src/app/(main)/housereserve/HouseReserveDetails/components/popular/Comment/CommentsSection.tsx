"use client";
import React, { useState, useEffect, useCallback } from "react";
import { MessageSquare, ChevronDown } from "lucide-react";
import ProfilComment from "../../../../../../../components/HouseDetails/icon/icon/ProfilComment";
import StarRate from "../../../../../../../components/HouseDetails/icon/icon/StarRate";
import AddComment from "./AddComment";

const CommentCard = ({ id, name, date, rate, text, houseId, onReplySubmitted, replies = [], isChild = false }: any) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="flex flex-col w-full mb-6">
      <div className={`w-full h-[114px] rounded-[8px] rounded-tr-[32px] rounded-bl-[32px] p-6 border shadow-sm relative shadow-[8px_0px_20px_rgba(8,135,202,0.30)] transition-all
        ${isChild 
          ? "bg-[#0887CA0D] border-[#0887CA0D]  relative right-10" 
          : "bg-[#F5F8FA] border-[#E8EFF3]"
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-center -mb-6">
            <div className="w-[52px] h-[52px] rounded-full bg-[#E2E8F0] flex items-center justify-center relative bottom-4 right-1 text-gray-500 border-2 border-white shadow-sm overflow-hidden">
              <ProfilComment />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h4 className="font-bold text-[#060425] text-[15px] relative bottom-6 right-1">
                  {name}
                </h4>
                {rate && !isChild && (
                  <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border relative bottom-6 right-1 border-[#F1F5F9]">
                    <span className="text-[11px] font-bold text-[#64748B]">{rate}</span>
                    <StarRate />
                  </div>
                )}
              </div>
              <span className="text-[11px] absolute left-8 top-4 text-[#94A3B8] font-medium">
                {date}
              </span>
            </div>
          </div>
        </div>
        <p className="text-[#475569] text-[13px] leading-[22px] text-right relative bottom-6 mr-14 px-2">
          {text}
        </p>
        
        <div className="flex justify-start gap-8 items-center border-t border-gray-100 pt-4 relative bottom-6">
          {replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-[11px] text-[#94A3B8] hover:text-[#0887CA] transition-colors"
            >
              <ChevronDown size={14} className={showReplies ? "rotate-180" : ""} />
              مشاهده پاسخ‌ها ({replies.length})
            </button>
          )}

          <AddComment 
            houseId={houseId} 
            parentCommentId={id} 
            onCommentSubmitted={onReplySubmitted} 
            isReply={true} 
          />
        </div>
      </div>

      
      
      {showReplies && replies.length > 0 && (
        <div className="mt-4 flex flex-col gap-3 w-full">
          {replies.map((reply: any) => (
            <CommentCard 
              key={reply.id} 
              {...reply} 
              houseId={houseId}
              isChild={true} 
              onReplySubmitted={onReplySubmitted} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentsSection = ({ houseId }: { houseId: any }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const buildTree = (allComments: any[], parentId: any = null): any[] => {
    return allComments
      .filter((c: any) => c.parent_comment_id === parentId)
      .map((c: any) => ({
        id: c.id,
        name: c.user ? `${c.user.firstName} ${c.user.lastName}` : (c.title || "کاربر مهمان"),
        date: c.created_at ? new Date(c.created_at).toLocaleDateString("fa-IR") : "۱۴۰۴/۰۱/۰۱",
        rate: c.rating?.toString() || null,
        text: c.caption || "بدون متن",
        replies: buildTree(allComments, c.id) 
      }));
  };

  const fetchComments = useCallback(async () => {
    if (!houseId) return;
    try {
      setLoading(true);
      const response = await fetch(`http://next.genzuni.website/api/comments?house_id=${houseId}`);
      const result = await response.json();
      
      const rawList = result.comments || (Array.isArray(result) ? result : []);

      const treeStructure = buildTree(rawList, null);
      setComments(treeStructure);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [houseId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="w-full max-w-[850px] mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-10 px-2">
        <h2 className="text-[#10088F] text-[18px] font-bold">
          نظرات دیگر کاربران ({comments.length})
        </h2>
        <AddComment houseId={houseId} onCommentSubmitted={fetchComments} />
      </div>

      <div className="flex flex-col">
        {loading ? (
          <div className="text-center py-10 text-gray-400">در حال بارگذاری...</div>
        ) : (
          comments.map((comment) => (
            <CommentCard 
              key={comment.id} 
              {...comment} 
              houseId={houseId} 
              onReplySubmitted={fetchComments} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;