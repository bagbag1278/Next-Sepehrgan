"use client";
import { useTranslations } from "next-intl";
import {
  X,
  Bed,
  Bath,
  Car,
  Maximize,
  Heart,
  Share2,
  TrendingUp,
  Ruler,
  Home,
  MapPin,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Like from "@/app/(main)/houserent/MortgageRentDetails/components/HouseRent/Like";

interface CompareItem {
  id: number;
  title: string;
  price: number;
  rooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  image: string;
  address: string;
}

interface CompareModalProps {
  items: CompareItem[];
  onRemove: (id: number) => void;
  onClose: () => void;
  onClearAll: () => void;
}

const CompareModal = ({
  items,
  onRemove,
  onClose,
  onClearAll,
}: CompareModalProps) => {
  const t = useTranslations("CompareModal");

  if (!items.length) return null;

  const getWinner = () => {
    if (items.length !== 2) return null;
    const [item1, item2] = items;
    const score1 =
      item1.rooms * 2 +
      item1.bathrooms * 1.5 +
      item1.parking * 1.8 +
      item1.area * 0.5;
    const score2 =
      item2.rooms * 2 +
      item2.bathrooms * 1.5 +
      item2.parking * 1.8 +
      item2.area * 0.5;
    return score1 > score2 ? item1 : score2 > score1 ? item2 : null;
  };

  const winner = getWinner();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#060425] dark:via-[#0a0a2a] dark:to-[#060425] rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/95 dark:bg-[#060425]/95 backdrop-blur-sm p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center rounded-t-3xl z-10">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {t("title")}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {t("subtitle")}
              </p>
            </div>
            <div className="flex gap-2">
              {items.length === 2 && (
                <button
                  onClick={onClearAll}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                >
                  {t("clearAll")}
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {items.length === 2 ? (
              <>
                {/* Winner Badge */}
                {winner && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4 text-center"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <TrendingUp className="text-yellow-600" size={20} />
                      <span className="text-yellow-800 dark:text-yellow-400 font-bold">
                        {t("winner")}
                      </span>
                      <span className="text-yellow-800 dark:text-yellow-400 font-bold">
                        {winner.title}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Compare Table */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${
                        winner?.id === item.id
                          ? "ring-2 ring-yellow-500 shadow-yellow-500/20"
                          : ""
                      }`}
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => onRemove(item.id)}
                        className="absolute top-4 right-4 z-10 p-1.5 bg-red-500/20 hover:bg-red-500/40 backdrop-blur-sm rounded-full transition-all"
                      >
                        <X size={14} className="text-red-600" />
                      </button>

                      {/* Winner Crown */}
                      {winner?.id === item.id && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 rounded-full p-2 shadow-lg">
                          <span className="text-2xl"></span>
                        </div>
                      )}

                      {/* Image Section */}
                      <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden group">
                        <div className="w-full h-full flex items-center justify-center">
                          {item.image ? <Image src={item.image} width={404} height={224} alt={item.title} className="dark:opacity-90 w-full h-full object-cover" unoptimized /> : <div className="w-full h-full bg-gray-100 dark:bg-gray-800" aria-label="تصویری ثبت نشده است" />}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Price Badge */}
                        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2">
                          <span className="text-white font-bold text-lg">
                            {item.price.toLocaleString("fa-IR")}
                          </span>
                          <span className="text-gray-300 text-xs mr-1">
                            {t("currency")}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
                          {item.title}
                        </h3>
                        <div className="flex items-start gap-1 text-gray-500 dark:text-gray-400 text-sm mb-4">
                          <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{item.address}</span>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <Bed size={16} className="text-blue-600" />
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">
                                {t("rooms")}
                              </p>
                              <p className="font-bold text-gray-800 dark:text-white">
                                {item.rooms}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <Bath size={16} className="text-blue-600" />
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">
                                {t("bathrooms")}
                              </p>
                              <p className="font-bold text-gray-800 dark:text-white">
                                {item.bathrooms}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <Car size={16} className="text-blue-600" />
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">
                                {t("parking")}
                              </p>
                              <p className="font-bold text-gray-800 dark:text-white">
                                {item.parking}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <Ruler size={16} className="text-blue-600" />
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">
                                {t("area")}
                              </p>
                              <p className="font-bold text-gray-800 dark:text-white">
                                {item.area} m²
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                          <Link
                            href={`/houserent/MortgageRentDetails/${item.id}`}
                            className="w-full"
                          >
                            <button className="flex-1 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:shadow-lg transition-all">
                              {t("viewDetails")}
                            </button>
                          </Link>
                          <div className="p-1 items-center rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                            <Like
                              houseId={item?.id}
                              onLikeChange={(liked) =>
                                console.log("Like changed:", liked)
                              }
                            />
                          </div>
                          <button className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Share2 size={18} className="text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Home size={48} className="text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                  {t("notEnoughItems")}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {t("selectTwoProperties")}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CompareModal;
