"use client";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  index: number;
  y?: number; // پیش‌فرض 20
  duration?: number; // پیش‌فرض 0.3
  delay?: number; // تاخیر پایه
  stagger?: number; // پیش‌فرض 0.08
}

const AnimatedCard = ({ 
  children, 
  index,
  y = 20,
  duration = 0.3,
  delay = 0,
  stagger = 0.08
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay: delay + index * stagger,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;