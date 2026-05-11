import React from "react";

const SkeletonProductHouse = () => {
  return (
    
    <div dir="rtl" className="animate-pulse w-161.75 h-54 flex justify-center gap-2 items-center mx-auto rounded-4xl bg-gray-200 dark:bg-gray-700">
      {/* Image Placeholder */}
      <div className="w-81 h-50 rounded-3xl bg-gray-300 dark:bg-gray-600" />

      {/* Description Placeholder */}
      <div className="w-74.75 h-50 flex flex-col gap-3 items-center pt-2">
        <div className="w-70.75 flex flex-col gap-2 items-start">
          {/* Title Placeholder */}
          <div className="h-5 rounded-md bg-gray-300 dark:bg-gray-600 w-3/4" />
          {/* Location Placeholder */}
          <div className="h-3 rounded-md bg-gray-300 dark:bg-gray-600 w-1/2" />
        </div>
        <span className="w-70.75 h-px bg-gray-300 dark:bg-gray-600" />
        <div className="w-70.75 flex flex-col gap-4">
          {/* Time Placeholder */}
          <div className="h-3 rounded-md bg-gray-300 dark:bg-gray-600 w-1/3" />
          {/* Price Placeholder */}
          <div className="h-5 rounded-md bg-gray-300 dark:bg-gray-600 w-1/2" />
        </div>
        {/* Button Placeholder */}
        <div className="border border-gray-300 dark:border-gray-600 w-70.75 h-8 rounded-xl" />
      </div>
    </div>
  );
};

export default SkeletonProductHouse;
