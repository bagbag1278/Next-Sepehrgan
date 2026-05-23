
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
        onImageUpdate(newImageSrc); // عکس جدید را به والد پاس می‌دهیم
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    // با استفاده از ref روی input file کلیک می‌کنیم
    fileInputRef.current?.click();
  };

  return (
    <div className=""> {/* اضافه کردن justify-center */}
      
      <input
        type="file"
        ref={fileInputRef} 
        accept="image/*" 
        onChange={handleImageChange}
        className="hidden" 
      />

      
      <button
        onClick={handleButtonClick}
        className="border-2 px-7 py-2 border-dashed text-sm border-blue-200 text-blue-200 rounded-2xl"
      >
        {initialImageSrc ? 'تغییر عکس' : 'تغییر عکس'} 
      </button>
    </div>
  );
};

export default ImageUploader;
