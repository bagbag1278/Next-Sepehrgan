"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type AnimationType = "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "rotate" | "flip";

interface AdvancedScrollAnimationProps {
  children: React.ReactNode;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const AdvancedScrollAnimation = ({ 
  children, 
  type = "slide-up", 
  delay = 0, 
  duration = 0.6,
  threshold = 0.1,
  className = "",
  once = true
}: AdvancedScrollAnimationProps) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: threshold,
  });

  const getAnimation = () => {
    switch (type) {
      case "fade":
        return { opacity: 0 };
      case "slide-up":
        return { opacity: 0, y: 60 };
      case "slide-down":
        return { opacity: 0, y: -60 };
      case "slide-left":
        return { opacity: 0, x: -60 };
      case "slide-right":
        return { opacity: 0, x: 60 };
      case "scale":
        return { opacity: 0, scale: 0.5 };
      case "rotate":
        return { opacity: 0, rotate: -15, scale: 0.8 };
      case "flip":
        return { opacity: 0, rotateX: -90 };
      default:
        return { opacity: 0, y: 60 };
    }
  };

  const getAnimate = () => {
    if (type === "rotate") {
      return inView ? { opacity: 1, rotate: 0, scale: 1 } : getAnimation();
    }
    if (type === "flip") {
      return inView ? { opacity: 1, rotateX: 0 } : getAnimation();
    }
    return inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : getAnimation();
  };

  return (
    <motion.div
      ref={ref}
      initial={getAnimation()}
      animate={getAnimate()}
      transition={{ duration, delay, ease: "easeOut" }}
      className={`w-full ${className}`}
      style={{ display: 'block' }}
    >
      {children}
    </motion.div>
  );
};

export default AdvancedScrollAnimation;