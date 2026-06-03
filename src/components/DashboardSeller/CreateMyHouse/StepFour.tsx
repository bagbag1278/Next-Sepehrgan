"use client";

import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import React, { useRef } from "react";

interface StepFourProps {
  image: string | null;
  setImage: (image: string | null) => void;
}

const StepFour = ({ image, setImage }: StepFourProps) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);

  };

  const removeImage = () => {

    setImage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

  };

  return (

    <div className="flex flex-wrap">

      {/* header */}
      <div className="w-full h-8 mb-4">

        <div
          className="
                    flex text-blue-900
                    dark:text-blue-300"
        >

          <span
            className="
                        text-blue-500 ml-1"
          >
            یک تصویر بهتر از هزار کلمه
          </span>

          <div>
            با قرار دادن عکس
            شانس دیده شدن
            ملک‌تان را ۵ برابر کنید.
          </div>

        </div>

      </div>

      {/* upload */}
      <div className="w-187.5 flex gap-8">

        <label
          className="relative w-90 h-65.5 rounded-4xl
              border-2 border-dashed border-blue-400  flex flex-col items-center
              justify-center cursor-pointer overflow-hidden transition-all hover:bg-blue-50"
        >

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {
            image ? (

              <>

                <Image
                  src={image}
                  alt="preview"
                  fill
                  className="object-cover"
                />

                <button
                  type="button"
                  onClick={(e) => {

                    e.preventDefault();

                    removeImage();

                  }}
                  className="
                    absolute top-3 right-3
                    z-20
                    w-10 h-10
                    rounded-full
                    bg-red-500
                    text-white
                    flex items-center
                    justify-center
                    hover:bg-red-600
                    transition"
                >

                  <Trash2 size={18} />

                </button>

              </>

            )
              :
              (

                <div className="w-60 h-full flex flex-wrap justify-center items-center gap-y-0 ">
                  <div>

                    <Plus
                      size={60}
                      strokeWidth={1.5}
                      className="w-full mb-1 text-blue-500 "
                    />

                    <span className="text-blue-600 text-2xl font-medium">
                      افزودن عکس
                    </span>
                  </div>

                </div>

              )
          }

        </label>

      </div>

    </div>

  );

};

export default StepFour;