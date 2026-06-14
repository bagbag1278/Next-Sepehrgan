import Image from 'next/image';
import React from 'react';

const BaseImg = () => {
  return (
    
    <div className="absolute inset-0 pointer-events-none"> 
      <Image
        src={"/HeroSction/vector.png"}
        width={1440}
        height={426}
        alt=''
      />
    </div>
  );
};

export default BaseImg;

