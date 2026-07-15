"use client";
import {
  X,
  Calendar,
  Home,
  MapPin,
  Star,
  DollarSign,
  Wifi,
  Car,
  Bath,
  Trees,
  BedDouble,
  Users,
  Hotel,
} from "lucide-react";
import { toPersianNum } from "@/components/utils/FarsiNum";

interface DetailModalHotelProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: any;
}

const DetailModalHotel = ({
  isOpen,
  onClose,
  hotel,
}: DetailModalHotelProps) => {
  if (!isOpen || !hotel) return null;

  const price = hotel.price ? Number(hotel.price) : 0;
  const discountedPrice = hotel.discounted_price ? Number(hotel.discounted_price) : null;
  const rating = hotel.rate ? Number(hotel.rate) : null;
  const capacity = hotel.capacity || 0;
  const bathrooms = hotel.bathrooms || 0;
  const parking = hotel.parking || 0;
  const rooms = hotel.rooms || 0;
  const caption = hotel.caption || hotel.description || "";

  let tags: string[] = [];
  if (hotel.tags) {
    if (Array.isArray(hotel.tags)) {
      tags = hotel.tags;
    } else if (typeof hotel.tags === "string") {
      try {
        const parsed = JSON.parse(hotel.tags);
        if (Array.isArray(parsed)) tags = parsed;
        else tags = [hotel.tags];
      } catch {
        tags = [hotel.tags];
      }
    }
  }
  const imageUrl =
    hotel.photos?.[0] ||
    "data:image/jpeg;base64,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";


  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-[32px] w-full max-w-[800px] max-h-[90vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-900 rounded-t-[32px] p-4 border-b border-gray-200 dark:border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="rounded-2xl overflow-hidden w-full md:w-80 h-52 bg-gray-100 dark:bg-gray-800 flex-shrink-0">
              <img
                src={hotel.photos?.[0] || imageUrl}
                alt={hotel.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = imageUrl;
                }}
              />
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {hotel.title || "نامشخص"}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin size={18} />
                <span className="text-sm">
                  {hotel.address || "آدرس نامشخص"}
                </span>
              </div>
              {rating !== null && (
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {toPersianNum(rating.toFixed(1))} از ۵
                  </span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                {rooms > 0 && (
                  <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                    <Hotel size={16} />
                    <span>{rooms} اتاق</span>
                  </div>
                )}
                {capacity > 0 && (
                  <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                    <Users size={16} />
                    <span>ظرفیت: {capacity} نفر</span>
                  </div>
                )}
                {parking > 0 && (
                  <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                    <Car size={16} />
                    <span>{parking} پارکینگ</span>
                  </div>
                )}
                {bathrooms > 0 && (
                  <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                    <Bath size={16} />
                    <span>{bathrooms} سرویس بهداشتی</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-600">قیمت هر شب</span>
                <span className="text-lg font-bold text-[#0887CAB2]">
                  {price > 0
                    ? `${toPersianNum(price.toLocaleString("fa-IR"))} تومان`
                    : "نامشخص"}
                </span>
                {discountedPrice && discountedPrice > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    {toPersianNum(discountedPrice.toLocaleString("fa-IR"))} تومان
                  </span>
                )}
              </div>
            </div>
          </div>

          <h4 className="font-bold text-gray-800 dark:text-white mb-2">
            توضیحات
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
            {caption || "توضیحاتی برای این هتل ثبت نشده است."}
          </p>

          {tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">برچسب‌ها:</span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#0887CA] text-white text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailModalHotel;