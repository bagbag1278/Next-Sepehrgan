"use client";
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const CircularRange = () => {
  const [value, setValue] = useState(40);

  const size = 130;
  // const strokeWidth = 30; // مقدار اصلی
  const grayStrokeWidth = 20; // کاهش عرض حاشیه خاکستری
  const blueStrokeWidth = 20; // افزایش عرض حاشیه آبی (یا معادل آن با کاهش radius)


  const radius = (size - blueStrokeWidth) / 2;

  const circumference = 2 * Math.PI * radius;

  const motionValue = useMotionValue(0);
  const animatedValue = useSpring(motionValue, { stiffness: 80, damping: 20 });

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  const strokeDashoffset = useTransform(
    animatedValue,
    (val) => circumference - (val / 100) * circumference,
  );
  const knobX = useTransform(
    animatedValue,
    (val) => size / 2 + radius * Math.sin((val / 100) * 2 * Math.PI),
  );
  const knobY = useTransform(
    animatedValue,
    (val) => size / 2 - radius * Math.cos((val / 100) * 2 * Math.PI),
  );
  const textValue = useTransform(animatedValue, (val) => Math.round(val));

  const getStrokeColor = (val) => {
    return "#0887CA"; // آبی
  };
  const getStrokColor = (val) => {
    return "#E0E0E0"; 
  };

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <svg width={size} height={size}>
        {/* دایره خاکستری */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius + (blueStrokeWidth - grayStrokeWidth) / 2} // تنظیم شعاع دایره خاکستری برای قرار گرفتن در بیرون دایره آبی
          strokeWidth={grayStrokeWidth}
          fill="none"
          stroke={getStrokColor(value)}
        />
        {/* دایره رنگی (آبی) */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius} // شعاع کوچکتر برای دایره آبی
          strokeWidth={blueStrokeWidth}
          fill="none"
          strokeLinecap="round"
          stroke={getStrokeColor(value)}
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* knob روی مسیر */}
        <motion.circle
          r="8"
          fill={getStrokeColor(value)} // رنگ knob با دایره آبی یکسان است
          style={{ cx: knobX, cy: knobY }}
        />
        {/* متن درصد وسط */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className="text-2xl font-bold fill-blue-200 " // استایل متن را میتوانید تنظیم کنید
        >
          <motion.tspan>{textValue}</motion.tspan>%
        </motion.text>
      </svg>
    </div>
  );
};

export default CircularRange;
