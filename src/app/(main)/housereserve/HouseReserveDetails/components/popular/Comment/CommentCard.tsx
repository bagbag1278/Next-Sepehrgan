"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import ProfilComment from "../../../../../../../components/HouseDetails/icon/icon/ProfilComment";
import StarRate from "../../../../../../../components/HouseDetails/icon/icon/StarRate";
import AddComment from "./AddComment";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";

const CommentCard = ({
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
}: any) => {
  const [showReplies, setShowReplies] = useState(false);
  
console.log("CommentCard id:", id);

  const canDelete = () => {
    return true;
  };

  return (
    <div className="w-full justify-center flex flex-col  mb-6 ">
      <div
        className={`w-full h-[114px] max-[]: rounded-[8px] rounded-tr-[32px] rounded-bl-[32px] p-6 border shadow-sm relative shadow-[8px_0px_20px_rgba(8,135,202,0.30)] transition-all max-[544]:w-95
        ${
          isChild
            ? "bg-[#0887CA0D] border-[#0887CA0D] relative right-15 top-4"
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
                  <div className="flex items-center gap-1  px-2 py-0.5  relative bottom-6 -right-2 ">
                    <span className="text-[11px] font-bold text-[#64748B]">
                      {rate}
                    </span>
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
        <p className="text-[#475569] text-[13px] leading-[22px] text-right relative bottom-6 mr-14 px-2 truncate">
          {text}
        </p>

        <div className="flex justify-start gap-8 items-center border-t border-gray-100 pt-4 relative bottom-6">
          {replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-[11px] whitespace-nowrap text-[#94A3B8] hover:text-[#0887CA] transition-colors"
            >
              <ChevronDown
                size={14}
                className={showReplies ? "rotate-180" : ""}
              />
              مشاهده پاسخ‌ها ({replies.length})
            </button>
          )}

          <AddComment
            houseId={houseId}
            parentCommentId={id}
            isReply={true}
            onReplySubmitted={onReplySubmitted}
          />
        <div className="">
             <EditComment  
            commentId={id}
            currentText={text}
            currentTitle={rate ? title : ""}
            currentRating={rate ? parseInt(rate) : 5}
            isReply={isChild}
            onEditSuccess={() => {
              fetchComments();
            }}
          />
        </div>
       

          <div className="  max-[888]:relative ">
            <DeleteComment
              commentId={id}
              onDeleteSuccess={() => {
                fetchComments();
              }}
              isReply={false}
            />
          </div>
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
              fetchComments={fetchComments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard