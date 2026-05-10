import React from 'react';

interface SliderProps {
  imageSrc: string;
}

function Slider({ imageSrc }: SliderProps) {
  return (
    <div className="relative w-full group">
      {/* کانتینر اصلی عکس با گوشه‌های گرد و سایه آبی مطابق فیگما */}
      <div className="relative overflow-hidden rounded-[32px] shadow-[0_0_30px_rgba(8,135,202,0.15)] transition-all duration-300">
        <img 
          src={imageSrc} 
          alt="Accommodation" 
          className="w-full h-[300px] md:h-[410px] object-cover"
        />
        
        {/* لایه تیره روی عکس برای خوانایی دکمه‌ها (اختیاری) */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all"></div>

        {/* دکمه "مشاهده همه" (باکس مشکی شفاف پایین سمت چپ) */}
        <div className="absolute bottom-6 left-6 bg-[#060425]/80 backdrop-blur-md px-4 py-2 rounded-lg flex items-center gap-2 text-white">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
           </svg>
           <span className="text-xs font-medium">۲۴ +</span>
        </div>
      </div>
    </div>
  );
}

export default Slider;