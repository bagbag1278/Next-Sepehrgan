"use client";

import HeroSction from "../Icon/HeaderIcon1";
import HeroSction2 from "../Icon/HeaderIcon2";


const Logo = () => {
  return (
    <div className="flex justify-center items-center w-full lg:w-auto z-50 max-[1024]:right-20 max-[800]:right-0  relative">
      <div className="dark:hidden">
        <HeroSction />
      </div>
      <div className="hidden dark:block">
        <HeroSction2 />
      </div>
    </div>
  );
};

export default Logo;