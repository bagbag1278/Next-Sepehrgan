import React from "react";
import { Mail } from "lucide-react"; // نصب لوسید آیکون برای آیکون ایمیل

const AddComment = () => {
  return (
    <div>
      {/* دکمه باز کردن مودال */}
      <button
        className="text-[#005EA4] border-2 border-[#005EA4] px-5 py-2 rounded-[14px] text-[13px] font-extrabold hover:bg-[#005EA4] hover:text-white transition-all "
        onClick={() =>
          (document.getElementById("comment_modal") as HTMLDialogElement).showModal()
        }
      >
        افزودن نظر
      </button>

      <dialog id="comment_modal" className="modal backdrop-blur-sm">
        <div className="modal-box max-w-[670px] bg-[#F5F5F5] p-10 rounded-[40px] border-none shadow-2xl overflow-hidden relative">
          
          <form method="dialog" className="flex flex-col gap-5" dir="rtl">
            
            <div className="relative">
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                className="w-full h-[65px] rounded-[24px] border-2 border-[#0887CA66] bg-transparent px-6 outline-none focus:border-[#0887CA] text-[#0887CA] placeholder:text-[#0887CA99] font-bold text-[15px] transition-all"
              />
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="ایمیل"
                className="w-full h-[65px] rounded-[24px] border-2 border-[#0887CA66] bg-transparent px-6 pr-12 outline-none focus:border-[#0887CA] text-[#0887CA] placeholder:text-[#0887CA99] font-bold text-[15px] transition-all"
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0887CA99]" size={22} />
            </div>

            <div className="relative">
              <textarea
                placeholder="پیام شما"
                rows={5}
                className="w-full rounded-[24px] border-2 border-[#0887CA66] bg-transparent p-6 outline-none focus:border-[#0887CA] text-[#0887CA] placeholder:text-[#0887CA99] font-bold text-[15px] transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full h-[75px] bg-[#10088F] hover:bg-[#0a0561] text-white rounded-[24px] font-bold text-[20px] transition-all mt-4 shadow-lg active:scale-[0.98]"
            >
              ارسال نظر
            </button>
          </form>

          <button 
            onClick={() => (document.getElementById("comment_modal") as HTMLDialogElement).close()}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form method="dialog" className="modal-backdrop bg-black/30">
          <button>بستن</button>
        </form>
      </dialog>
    </div>
  );
};

export default AddComment;