"use client";
import React, { useEffect, useRef, useState } from "react";
const ModalForm = () => {
  const [paymentStatusOpen, setPaymentStatusOpen] = useState(false);
  const [paymentStatusValue, setPaymentStatusValue] = useState("");
  const paymentStatusDropdownRef = useRef(null);

  const [transactionTypeOpen, setTransactionTypeOpen] = useState(false);
  const [transactionTypeValue, setTransactionTypeValue] = useState("");
  const transactionTypeDropdownRef = useRef(null);

  const [houseTypeOpen, setHouseTypeOpen] = useState(false);
  const [houseTypeValue, setHouseTypeValue] = useState("");
  const houseTypeDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        paymentStatusDropdownRef.current &&
        !paymentStatusDropdownRef.current.contains(event.target)
      ) {
        setPaymentStatusOpen(false);
      }

      if (
        transactionTypeDropdownRef.current &&
        !transactionTypeDropdownRef.current.contains(event.target)
      ) {
        setTransactionTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // توابع انتخاب آیتم برای هر فیلد
  const handlePaymentSelect = (item) => {
    setPaymentStatusValue(item);
    setPaymentStatusOpen(false); // بستن منو بعد از انتخاب
  };
  const handleHouseSelect = (item) => {
    setHouseTypeValue(item);
    setHouseTypeOpen(false); // بستن منو بعد از انتخاب
  };

  const handleTransactionSelect = (item) => {
    setTransactionTypeValue(item);
    setTransactionTypeOpen(false); // بستن منو بعد از انتخاب
  };

  const paymentOptions = ["تایید شده", "در انتظار", "تایید نشده"];
  const transactionOptions = ["شارژ کیف پول", "رزرو"];
  const houseOptions = ["شارژ کیف پول", "رزرو"];
  return (
    <div className="w-129 flex flex-col gap-4 mr-4 h-12">
      {/* فیلد وضعیت پرداخت */}
      <div className="relative w-62.5" ref={paymentStatusDropdownRef}>
        <input
          type="text"
          placeholder=" "
          value={paymentStatusValue}
          readOnly
          onClick={() => setPaymentStatusOpen(!paymentStatusOpen)}
          className="peer w-full border border-blue-300/50 text-blue-300 text-[13px] pt-1 px-4 h-12 outline-0 rounded-2xl cursor-pointer transition-colors duration-300"
        />

        <label
          className={`absolute right-4 text-blue-300/70 transition-all duration-200 ease-out pointer-events-none px-1
                ${
                  paymentStatusValue
                    ? "-top-2 text-[12px] backdrop-blur-md rounded-md"
                    : "peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[12px]"
                }
              `}
        >
          وضعیت پرداخت
        </label>

        {paymentStatusOpen && (
          <div className="absolute top-14 left-0 w-full bg-white border border-blue-300/50 rounded-2xl shadow-xl z-20 p-2 animate-in fade-in zoom-in duration-200">
            <ul className="text-[13px] text-blue-300">
              {paymentOptions.map((item) => (
                <li
                  key={item}
                  onClick={() => handlePaymentSelect(item)}
                  className="p-2 hover:bg-blue-50 cursor-pointer rounded-lg transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* فیلد نوع تراکنش */}
      <div className="relative w-62.5" ref={transactionTypeDropdownRef}>
        <input
          type="text"
          placeholder=" "
          value={transactionTypeValue}
          readOnly
          onClick={() => setTransactionTypeOpen(!transactionTypeOpen)}
          className="peer w-full border border-blue-300/50 text-blue-300 text-[13px] pt-1 px-4 h-12 outline-0 rounded-2xl cursor-pointer transition-colors duration-300"
        />

        <label
          className={`absolute right-4 text-blue-300/70 transition-all duration-200 ease-out pointer-events-none px-1
                ${
                  transactionTypeValue
                    ? "-top-2 text-[12px] backdrop-blur-md rounded-md"
                    : "peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[12px]"
                }
              `}
        >
          نوع تراکنش
        </label>

        {transactionTypeOpen && (
          <div className="absolute top-14 left-0 w-full bg-white border border-blue-300/50 rounded-2xl shadow-xl z-20 p-2 animate-in fade-in zoom-in duration-200">
            <ul className="text-[13px] text-blue-300">
              {transactionOptions.map((item) => (
                <li
                  key={item}
                  onClick={() => handleTransactionSelect(item)}
                  className="p-2 hover:bg-blue-50 cursor-pointer rounded-lg transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* dfghjk */}
      <div className="relative w-62.5" ref={houseTypeDropdownRef}>
        <input
          type="text"
          placeholder=" "
          value={houseTypeValue}
          readOnly
          onClick={() => setHouseTypeOpen(!houseTypeOpen)}
          className="peer w-full border border-blue-300/50 text-blue-300 text-[13px] pt-1 px-4 h-12 outline-0 rounded-2xl cursor-pointer transition-colors duration-300"
        />

        <label
          className={`absolute right-4 text-blue-300/70 transition-all duration-200 ease-out pointer-events-none px-1
                ${
                  houseTypeValue
                    ? "-top-2 text-[12px] backdrop-blur-md rounded-md"
                    : "peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[12px]"
                }
              `}
        >
          وضعیت پرداخت
        </label>

        {houseTypeOpen && (
          <div className="absolute top-14 left-0 w-full bg-white border border-blue-300/50 rounded-2xl shadow-xl z-20 p-2 animate-in fade-in zoom-in duration-200">
            <ul className="text-[13px] text-blue-300">
              {houseOptions.map((item) => (
                <li
                  key={item}
                  onClick={() => handleHouseSelect(item)}
                  className="p-2 hover:bg-blue-50 cursor-pointer rounded-lg transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalForm;
