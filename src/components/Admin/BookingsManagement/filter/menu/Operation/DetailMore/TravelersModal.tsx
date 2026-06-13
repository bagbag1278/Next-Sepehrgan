"use client";
import { X, User, Calendar, Hash, Users } from "lucide-react";

interface TravelersModalProps {
  isOpen: boolean;
  onClose: () => void;
  travelers: any[];
  mainTravelerName: string;
  mainTravelerEmail?: string;
  mainTravelerPhone?: string;
}

const TravelersModal = ({
  isOpen,
  onClose,
  travelers,
  mainTravelerName,
  mainTravelerEmail,
  mainTravelerPhone,
}: TravelersModalProps) => {
  if (!isOpen) return null;

  
  const allTravelers = travelers || [];


  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-indigo-900 rounded-t-2xl px-6 py-4 text-white sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">مشخصات مسافران</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="hidden md:flex h-16 items-center shadow-[0_0_8px] shadow-blue-300/30 dark:shadow-blue-500/10 justify-between bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm mb-3">
            <div className="w-5/12">نام و نام خانوادگی</div>
            <div className="w-4/12">کد ملی</div>
            <div className="w-3/12">تاریخ تولد</div>
          </div>

          <div className="flex flex-col gap-2">
            {allTravelers.map((traveler, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center justify-between bg-white shadow-[0_0_8px] shadow-blue-300/30 dark:shadow-blue-500/10 dark:bg-gray-800 rounded-2xl  p-4 shadow-md hover:shadow-lg transition-all gap-3"
              >
                <div className="flex items-center gap-2 md:w-5/12">
                  <User size={16} className="text-gray-400" />
                  <span className="font-medium">
                    {traveler.firstName} {traveler.lastName}
                  </span>
           
                </div>
                <div className="flex items-center gap-2 md:w-4/12">
                  <Hash size={14} className="text-gray-400" />
                  <span>{traveler.nationalId || "—"}</span>
                </div>
                <div className="flex items-center gap-2 md:w-3/12">
                  <Calendar size={14} className="text-gray-400" />
                  <span>{traveler.birthDate || "—"}</span>
                </div>
              </div>
            ))}
          </div>

          {allTravelers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              اطلاعات مسافری ثبت نشده است.
            </div>
          )}
        </div>

   
      </div>
    </div>
  );
};

export default TravelersModal;