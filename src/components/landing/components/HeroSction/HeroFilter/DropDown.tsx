"use client";

import { use } from "framer-motion/m";
import { useState } from "react";

const DropDown = () => {
  const [selected1, setSelected1] = useState("انتخاب کن");
  const [selected2, setSelected2] = useState("انتخاب کن");
  const [selected3, setSelected3] = useState("انتخاب کن چند نفرین");
  const [selected4, setSelected4] = useState(" مازندران،ساری،لفور...");

  const items1 = ["تهران", "شیراز", "اصفهان"];
  const items2 = ["خرید", "فروش", "اجاره"];
  const items3 = ["خرید", "فروش", "اجاره"];
   const items4 = ["خرید", "فروش", "مازندران،ساری،لفور..."];
  return (
    <>
      <div className="dropdown dropdown-center absolute bottom-[1px] mr-[-15px]">
        <div
          tabIndex={0}
          className=" m-1 bg-[#F5F5F5]
                     border-none text-gray-600
                     font-normal text-[14px] cursor-pointer relative bottom-3 right-3"
        >
          {selected1}
        </div>

        <ul
          tabIndex={-1}
          className="dropdown-content menu bg-[#F5F5F5]
                     rounded-box z-[1] w-52 p-2 shadow-sm"
        >
          {items1.map((item) => (
            <li key={item}>
              <button
                onClick={() => setSelected1(item)}
                className="hover:bg-gray-200 rounded-lg"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

    

      <div className="dropdown dropdown-center absolute bottom-[1px] mr-[165px]">
        <div
          tabIndex={0}
          role="button"
             className=" m-1 bg-[#F5F5F5]
                     border-none text-gray-600
                     font-normal text-[14px] cursor-pointer relative bottom-3 right-3"
        >
          {selected2}
        </div>

        <ul
          tabIndex={-1}
          className="dropdown-content menu bg-[#F5F5F5]
                     rounded-box z-[1] w-52 p-2 shadow-sm"
        >
          {items2.map((item) => (
            <li key={item}>
              <button
                onClick={() => setSelected2(item)}
                className="hover:bg-gray-200 rounded-lg"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

  <div className="dropdown dropdown-center absolute bottom-[1px] mr-[340px]">
        <div
          tabIndex={0}
          role="button"
          className=" m-1 bg-[#F5F5F5]
                     border-none text-gray-600
                     font-normal text-[14px] cursor-pointer relative bottom-3 right-3"
        >
          {selected3}
        </div>

        <ul
          tabIndex={-1}
          className="dropdown-content menu bg-[#F5F5F5]
                     rounded-box z-[1] w-52 p-2 shadow-sm"
        >
          {items3.map((item) => (
            <li key={item}>
              <button
                onClick={() => setSelected3(item)}
                className="hover:bg-gray-200 rounded-lg"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
       <div className="dropdown dropdown-center absolute bottom-[1px] mr-[-235px]">
        <div
          tabIndex={0}
          role="button"
          className=" m-1 bg-[#F5F5F5]
                     border-none text-gray-600
                     font-normal text-[14px] cursor-pointer relative bottom-3 right-3"
        >
          {selected4}
        </div>

        <ul
          tabIndex={-1}
          className="dropdown-content menu bg-[#F5F5F5]
                     rounded-box z-[1] w-52 p-2 shadow-sm"
        >
          {items4.map((item) => (
            <li key={item}>
              <button
                onClick={() => setSelected4(item)}
                className="hover:bg-gray-200 rounded-lg"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DropDown;
