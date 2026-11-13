"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Globe, Camera, Briefcase, Send, MessageCircle, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { SocialLink } from "../../../app/Admin/SocialLink/page";

interface EditSocialLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { platform: string; url: string }) => Promise<void>;
  link: SocialLink | null;
  loading: boolean;
}

const platformOptions = [
  { value: "instagram", label: "اینستاگرام", icon: Camera, color: "text-pink-500" },
  { value: "linkedin", label: "لینکدین", icon: Briefcase, color: "text-blue-600" },
  { value: "telegram", label: "تلگرام", icon: Send, color: "text-blue-500" },
  { value: "whatsapp", label: "واتساپ", icon: MessageCircle, color: "text-green-500" },
  { value: "bale", label: "بله", icon: MessageSquare, color: "text-cyan-500" },
  { value: "website", label: "وبسایت", icon: Globe, color: "text-purple-500" },
];

const EditSocialLinkModal = ({ isOpen, onClose, onSave, link, loading }: EditSocialLinkModalProps) => {
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (link) {
      setPlatform(link.platform);
      setUrl(link.url);
    }
  }, [link]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!platform) {
      toast.error("لطفاً پلتفرم را انتخاب کنید");
      return;
    }
    if (!url) {
      toast.error("لطفاً آدرس لینک را وارد کنید");
      return;
    }
    await onSave({ platform, url });
  };

  const selectedPlatform = platformOptions.find(p => p.value === platform);
  const SelectedIcon = selectedPlatform?.icon || Globe;
  const selectedColor = selectedPlatform?.color || "text-yellow-500";

  return (
    <>
      <div className="fixed inset-0 h-full bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl z-50 overflow-hidden">
        <div className=" p-5 ">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Globe size={24} />
              <h2 className="text-xl font-bold">ویرایش لینک</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* پلتفرم با دکمه‌های گرید */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              پلتفرم
            </label>
            <div className="grid grid-cols-2 gap-3">
              {platformOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPlatform(opt.value)}
                    className={`flex items-center gap-2 justify-center px-4 py-3 rounded-xl border-2 transition-all ${
                      platform === opt.value
                        ? `border-yellow-500 bg-yellow-500/10 ${opt.color}`
                        : "border-gray-200 dark:border-gray-600 hover:border-yellow-500 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Icon size={20} className={platform === opt.value ? opt.color : "text-gray-400"} />
                    <span className="font-medium">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* آدرس لینک */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              آدرس لینک
            </label>
            <div className="relative">
              <SelectedIcon size={18} className={`absolute right-3 top-1/2 -translate-y-1/2 ${selectedColor}`} />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full pr-10 pl-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 p-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Globe size={18} />}
            {loading ? "در حال ویرایش..." : "ذخیره تغییرات"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditSocialLinkModal;