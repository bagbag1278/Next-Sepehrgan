"use client";
import React, { useState } from "react";
import { useTranslations } from 'next-intl';
import { ChevronDown } from "lucide-react";
import ProfilComment from "../../../../../../../components/HouseDetails/icon/icon/ProfilComment";
import StarRate from "../../../../../../../components/HouseDetails/icon/icon/StarRate";
import AddComment from "./AddComment";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";

interface CommentCardMobileProps {
  id: number;
  name: string;
  date: string;
  rate?: string;
  text: string;
  houseId: number;
  onReplySubmitted: () => void;
  replies?: any[];
  isChild?: boolean;
  fetchComments: () => void;
  title?: string;
}

const CommentCardMobile = ({
  id,
  name,
  date,
  rate,
  text,
  houseId,
  onReplySubmitted,
  replies = [],
  isChild = false,
  fetchComments,
  title
}: CommentCardMobileProps) => {
  const t = useTranslations('CommentCard');
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="w-full flex flex-col mb-4">
      <div
        className={`
          w-full rounded-[8px] rounded-tr-[24px] rounded-bl-[24px] p-3 border shadow-sm transition-all duration-200
          ${isChild
            ? "bg-[#0887CA0D] dark:bg-blue-900/20 border-[#0887CA0D] dark:border-blue-800/30 relative right-2 top-2"
            : "bg-[#F5F8FA] dark:bg-gray-800/80 border-[#E8EFF3] dark:border-gray-700"
          }
        `}
      >
        <div className="flex items-start gap-2 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#E2E8F0] dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-white dark:border-gray-600 shadow-sm overflow-hidden flex-shrink-0">
            <ProfilComment />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-bold text-[#060425] dark:text-white text-[13px] sm:text-[14px]">
                {name}
              </h4>
              {rate && !isChild && (
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-[#64748B] dark:text-gray-400">
                    {rate}
                  </span>
                  <StarRate />
                </div>
              )}
            </div>
            <span className="text-[10px] text-[#94A3B8] dark:text-gray-500 font-medium block">
              {date}
            </span>
          </div>
        </div>

        {/* متن کامنت */}
        <p className="text-[#475569] dark:text-gray-300 text-[11px] sm:text-[12px] leading-[16px] sm:leading-[18px] text-right mt-1 mb-2 pr-2 line-clamp-3">
          {text}
        </p>

        {/* دکمه‌های عملیات */}
        <div className="flex flex-wrap justify-start gap-4 items-center border-t border-gray-100 dark:border-gray-700 pt-2 mt-1">
          {replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-[9px] sm:text-[10px] whitespace-nowrap text-[#94A3B8] dark:text-gray-500 hover:text-[#0887CA] dark:hover:text-blue-400 transition-colors"
            >
              <ChevronDown size={12} className={showReplies ? "rotate-180" : ""} />
              {t('viewReplies')} ({replies.length})
            </button>
          )}

          <AddComment
            houseId={houseId}
            parentCommentId={id}
            isReply={true}
            onReplySubmitted={onReplySubmitted}
          />
          
          <EditComment  
            commentId={id}
            currentText={text}
            currentTitle={rate ? title : ""}
            currentRating={rate ? parseInt(rate) : 5}
            isReply={isChild}
            onEditSuccess={() => fetchComments()}
          />

          <DeleteComment
            commentId={id}
            onDeleteSuccess={() => fetchComments()}
            isReply={false}
          />
        </div>
      </div>

      {showReplies && replies.length > 0 && (
        <div className="mt-2 relative  flex flex-col gap-2 w-full">
          {replies.map((reply: any) => (
            <CommentCardMobile
              key={reply.id}
              {...reply}
              houseId={houseId}
              isChild={true}
              onReplySubmitted={onReplySubmitted}
              fetchComments={fetchComments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCardMobile;