"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import CommentsIcon from "../../Icon/Comments/CommentsIcon";
import ClockIcon from "../../Icon/Comments/ClockIcon";
import LikeIcon from "../../Icon/Comments/LikeIcon";
import HugeArrow from "../../Icon/Comments/HugeArrow";

type ApiUser = {
  firstName?: string;
  lastName?: string;
  profilePicture?: string | null;
};

type ApiComment = {
  id: number | string;
  title?: string | null;
  caption?: string | null;
  created_at?: string | null;
  user?: ApiUser | null;
};

type ApiResponse = {
  comments: ApiComment[];
};

type ItemType = {
  key: string;
  Profile: string;
  name: string;
  content: string;
  date: string;
};

const FocusCarousel = () => {
  const t = useTranslations('FocusCarousel');
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://188.121.111.8:3003/api/comments");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: ApiResponse = await res.json();

        const mappedItems: ItemType[] = (data.comments || []).map((comment) => {
          const fullName =
            `${comment.user?.firstName ?? ""} ${comment.user?.lastName ?? ""}`.trim() ||
            t('unknownUser');

          const formattedDate = comment.created_at
            ? new Date(comment.created_at).toLocaleDateString("fa-IR")
            : t('noDate');

          return {
            key: String(comment.id),
            Profile: "/placeHolder.jpeg",
            name: fullName,
            content: comment.caption ?? comment.title ?? t('noContent'),
            date: formattedDate,
          };
        });

        setItems(mappedItems);
      } catch (err) {
        const message = err instanceof Error ? err.message : t('unknownError');
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [t]);

  return (
    <div className="2xl:hidden hidden sm:flex">
      <div className="relative w-355 flex justify-between">
        <div className="w-70 lg:w-82 h-88 hidden lg:flex items-center ml-4 lg:items-end">
          <div className="flex flex-wrap justify-center h-56 lg:h-77 w-90">
            <div className="flex flex-wrap justify-center h-14">
              <div className="flex w-76 h-7 items-center justify-between gap-1">
                <div className="w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse scale-x-[-1]">
                  <CommentsIcon />
                </div>
                <div className="dark:text-[#28A5E6] text-[13px] whitespace-nowrap text-blue-200">
                  {t('topCommentsText')}
                </div>
                <div className="w-6.75 h-6.5 flex gap-0.5 items-center flex-row-reverse">
                  <CommentsIcon />
                </div>
              </div>
              <div className="dark:text-[#F5F5F5] text-[20px] font-bold text-blue-400">
                {t('visitorsComments')}
              </div>
            </div>
            <div className="hidden lg:flex lg:w-82 lg:h-17 text-center text-blue-400 dark:text-[#F5F5F5D9]">
              {t('commentsDescription')}
            </div>
            <button className="w-30 h-10 hover:border-2 rounded-xl border border-green-100 cursor-pointer">
              <p className="text-green-100 text-[14px]">{t('viewAll')}</p>
            </button>
          </div>
        </div>

        <div className="relative w-300 h-100 overflow-hidden">
          <div className="absolute right-0 top-0w-76.25 h-93.75 bg-green-100 rounded-bl-[5px] rounded-tr-[5px] rounded-tl-[50px] rounded-br-[50px]" />

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-lg">
              {t('loading')}
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center text-red-500">
              {t('error')} {error}
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {t('noItems')}
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <Swiper
              modules={[Navigation, A11y]}
              dir="rtl"
              loop={true}
              centeredSlides={false}
              slidesPerView={4}
              spaceBetween={10}
              watchSlidesProgress={true}
              navigation={{
                nextEl: ".carousel-next",
                prevEl: ".carousel-prev",
              }}
              onSwiper={(swiper) => {
                setActiveIndex(swiper.realIndex ?? 0);
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex ?? 0);
              }}
            >
              {items.map((item, idx) => {
                const focused = idx === activeIndex;

                return (
                  <SwiperSlide key={item.key}>
                    <div className="flex items-center justify-center mt-8 mr-20 z-50">
                      <div
                        className={[
                          "transition-all duration-300 flex items-center justify-center",
                          focused ? "scale-[1.08]" : "scale-100",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "rounded-2xl shadow-sm flex items-center justify-center transition-all duration-300 overflow-hidden",
                            focused
                              ? "w-70 h-77.5 ml-2.5 bg-white dark:bg-white"
                              : "w-55 h-60 bg-[#F5F5F5] dark:bg-blue-400",
                          ].join(" ")}
                        >
                          {focused ? (
                            <div className="flex flex-col items-center justify-between text-center w-full h-full p-5">
                              <div className="w-20 h-20 rounded-full p-0.75 border border-[#BAE9D3] bg-white flex items-center justify-center overflow-hidden relative">
                                {item.Profile ? (
                                  <Image
                                    src={item.Profile}
                                    alt={item.name}
                                    fill
                                    className="object-cover rounded-full"
                                  />
                                ) : (
                                  <span className="text-xl font-bold text-gray-700">
                                    {item.name?.[0] ?? "?"}
                                  </span>
                                )}
                              </div>
                              <p className="mt-3 text-lg font-bold text-[#0A1133] dark:text-black">
                                {item.name}
                              </p>
                              <p className="mt-2 text-ellipsis line-clamp-4 w-66 h-27.75 text-center text-[14px] leading-7 text-[#1B1E36] px-2 dark:text-black">
                                {item.content}
                              </p>
                              <div className="mt-auto w-full flex justify-between items-center px-2">
                                <span className="text-[#A9A9A9] text-xs flex items-center gap-1">
                                  <ClockIcon />
                                  {item.date}
                                </span>
                                <div className="cursor-pointer">
                                  <LikeIcon />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center px-4">
                              <div className="w-16 h-16 rounded-full p-0.5 border border-[#D1F3E2] mt-3 flex items-center justify-center overflow-hidden relative">
                                {item.Profile ? (
                                  <Image
                                    src={item.Profile}
                                    alt={item.name}
                                    fill
                                    className="object-cover rounded-full"
                                  />
                                ) : (
                                  <span className="text-lg font-bold text-gray-700">
                                    {item.name?.[0] ?? "?"}
                                  </span>
                                )}
                              </div>
                              <p className="mt-4 text-base font-bold text-[#0A1133] dark:text-white">
                                {item.name}
                              </p>
                              <p className="mt-2 text-sm leading-6 text-[#1B1E36] dark:text-white">
                                {item.content.length > 45
                                  ? `${item.content.slice(0, 45)}...`
                                  : item.content}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}

          <div className="absolute right-0 top-38 z-50 mt-4 flex justify-end">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="carousel-prev h-10 w-10 rounded-full border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center justify-center"
                aria-label="اسکرول به چپ"
              >
                ‹
              </button>
              <button
                type="button"
                className="carousel-next h-10 w-10 rounded-full border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center justify-center"
                aria-label="اسکرول به راست"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex absolute -bottom-7 left-0">
          <HugeArrow />
        </div>
      </div>
    </div>
  );
};

export default FocusCarousel;