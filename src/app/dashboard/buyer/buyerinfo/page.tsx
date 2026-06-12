"use client";
import AvatarSlider from "@/components/Dashboard/buyer/info/AvatarSlider";
import EditForm from "@/components/Dashboard/buyer/info/EditForm";
import ImageUploader from "@/components/Dashboard/buyer/info/ImageUploader";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const BuyerInfoPage = () => {
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(
    "/FastReserve/images.jfif",
  );


  const handleImageUpdate = (newImageSrc: string) => {
    setCurrentImageSrc(newImageSrc);
  };
  return (
    <div>
      <div className="w-82.5 flex flex-col gap-6">
        <h2 className="font-bold">عکس نمایه شما</h2>
        {/*  */}
        <div className="flex gap-6 items-center h-32.5">
          {" "}
          <div className="size-32.5 overflow-hidden rounded-full shadow-[0_0_10px] shadow-blue-300/20">
            {currentImageSrc ? (
              <Image
                src={currentImageSrc}
                width={130}
                height={130}
                alt="Current profile picture"
                className="rounded-full object-cover"
              />
            ) : (
              <div className="">No Image</div>
            )}
          </div>
          <ImageUploader
            onImageUpdate={handleImageUpdate}
            initialImageSrc={currentImageSrc}
          />{" "}
          {/* <button>
            <DeleteImg />
          </button> */}
        </div>

        {/*  */}
        <AvatarSlider/>
      </div>
      {/* dfghj */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-6 right-104.25 w-77 h-96.25 flex flex-col gap-6"
        >
          <span className="font-bold">اطلاعات فردی</span>
          <EditForm />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BuyerInfoPage;
