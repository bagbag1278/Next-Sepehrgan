
"use client";
import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";


export function toPersianNum(num: unknown): string {
  if (num === undefined || num === null || num === "") return "";
  return String(num).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

interface CircularRangeProps {
  initialValue: number; 
}

const CircularRange = ({ initialValue }: CircularRangeProps) => {
  const size = 130;
  const grayStrokeWidth = 20;
  const blueStrokeWidth = 20;
  const radius = (size - blueStrokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // motionValue برای مقداری که انیمیشن می‌شود (از 0 شروع می‌شود)
  const animatedValue = useMotionValue(0); 

  // انیمیشن spring را روی motionValue اعمال کنید
  const springValue = useSpring(animatedValue, { stiffness: 80, damping: 20 });

  useEffect(() => {
    animatedValue.set(initialValue);
  }, [initialValue, animatedValue]);

  const strokeDashoffset = useTransform(
    springValue,
    (val) => circumference - (val / 100) * circumference,
  );
  const knobX = useTransform(
    springValue,
    (val) => size / 2 + radius * Math.sin((val / 100) * 2 * Math.PI),
  );
  const knobY = useTransform(
    springValue,
    (val) => size / 2 - radius * Math.cos((val / 100) * 2 * Math.PI),
  );
  
  // تبدیل مقدار springValue به عدد صحیح فارسی برای نمایش متن
  // ما مستقیماً روی springValue اعمال می‌کنیم و از .to() استفاده نمی‌کنیم
  const persianTextValue = useTransform(springValue, (val) => 
    toPersianNum(Math.round(val))
  );

  const getStrokeColor = () => "#0887CA"; // آبی
  const getStrokColor = () => "#E0E0E0"; // خاکستری

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius + (blueStrokeWidth - grayStrokeWidth) / 2}
          strokeWidth={grayStrokeWidth}
          fill="none"
          stroke={getStrokColor()}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={blueStrokeWidth}
          fill="none"
          strokeLinecap="round"
          stroke={getStrokeColor()}
          strokeDasharray={circumference}
          style={{ strokeDashoffset }} 
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <motion.circle
          r="8"
          fill={getStrokeColor()}
          style={{ cx: knobX, cy: knobY }} 
        />
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className="text-2xl font-bold fill-blue-200 "
        >
          {/* استفاده از MotionValue تبدیل شده */}
          %<motion.tspan>{persianTextValue}</motion.tspan> 
        </motion.text>
      </svg>
    </div>
  );
};

export default CircularRange;
