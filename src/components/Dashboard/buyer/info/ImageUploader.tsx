
"use client";
import React, { useRef } from 'react';


const ImageUploader = ({ onImageUpdate, initialImageSrc }: { onImageUpdate: (src: string) => void, initialImageSrc: string | null }) => {
  
  const fileInputRef = useRef<HTMLInputElement>(null); 

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageSrc = e.target?.result as string;
        onImageUpdate(newImageSrc); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
  
    fileInputRef.current?.click();
  };

  return (
    <div className=""> 
      
      <input
        type="file"
        ref={fileInputRef} 
        accept="image/*" 
        onChange={handleImageChange}
        className="hidden" 
      />

      
      <button
        onClick={handleButtonClick}
        className="border-2 px-7 py-2 shadow-[0_0_10px] shadow-blue-300/20 border-dashed text-sm dark:border-blue-300 dark:text-blue-300 border-blue-200 text-blue-200 rounded-2xl"
      >
        {initialImageSrc ? 'تغییر عکس' : 'تغییر عکس'} 
      </button>
    </div>
  );
};

export default ImageUploader;
