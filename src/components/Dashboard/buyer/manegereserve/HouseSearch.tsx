import React from "react";

const HouseSearch = () => {
  return (
    <form className="relative">
      <input
        type="search"
        name="house"
        placeholder="نام ملک مورد نظر ...."
        className="w-112.5 h-12 text-sm border placeholder:text-blue-300/70 border-blue-300/70 dark:bg-white py-1 px-4 outline-0 text-blue-300 rounded-2xl"
      />

      <div className="absolute top-3.5 left-4 bg-white pointer-events-none">
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.4167 17.4167L13.6667 13.6667M15.75 8.25C15.75 12.3921 12.3921 15.75 8.25 15.75C4.10786 15.75 0.75 12.3921 0.75 8.25C0.75 4.10786 4.10786 0.75 8.25 0.75C12.3921 0.75 15.75 4.10786 15.75 8.25Z"
            stroke="#0887CA"
            strokeOpacity="0.8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </form>
  );
};

export default HouseSearch;
