"use client";

import EditForm from "@/components/DashboardSeller/userprofile/EditForm";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const BuyerInfoPage = () => {
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(
    "/FastReserve/images.jfif",
  );

  const handleImageUpdate = (newImageSrc: string) => {
    setCurrentImageSrc(newImageSrc);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div className="w-82.5 flex flex-col gap-6">
        <motion.h2 variants={itemVariants} className="font-bold">
          عکس نمایه شما
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="flex gap-6 items-center h-32.5"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 120,
            }}
            whileHover={{
              scale: 1.05,
            }}
            className="size-32.5 overflow-hidden rounded-full shadow-[0_0_10px] shadow-blue-300/20"
          >
            {currentImageSrc ? (
              <Image
                src={currentImageSrc}
                width={130}
                height={130}
                alt="Current profile picture"
                className="rounded-full object-cover"
              />
            ) : (
              <div>No Image</div>
            )}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 0,
            x: -40,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: 40,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="absolute top-6 right-104.25 w-77 h-96.25 flex flex-col gap-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-bold"
          >
            اطلاعات فردی
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.5,
            }}
          >
            <EditForm />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default BuyerInfoPage;
