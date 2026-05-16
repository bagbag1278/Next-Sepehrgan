"use client";
import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

interface StepThirdFormProps {
  onNext: () => void;
  onBack: () => void;
}

const checkPasswordStrength = (password: string) => {
  if (!password) return 0;
  let strength = 0;
  if (password.length >= 6) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  if (strength <= 1) return 1;
  if (strength <= 2) return 2;
  return 3;
};

const StepThirdForm = ({ onNext }: StepThirdFormProps) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(true);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(checkPasswordStrength(value));
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getBorderColor = () => {
    if (strength === 1) return "border-red-500 text-red-500";
    if (strength === 2) return "border-amber-400 text-amber-400";
    if (strength === 3) return "border-green-100 text-green-100";
    return "border-blue-300/50";
  };

  return (
    <form
      className="flex flex-col justify-between gap-6 h-full"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <div className="flex flex-col gap-2 relative">
        <input
          type="text"
          name="phone"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder=""
          className="peer w-full dark:text-black border text-[13px] pt-1 px-4 h-12 bg-white border-blue-300/50 outline-0 rounded-2xl transition-colors focus:border-blue-500"
        />
        <label
          htmlFor="phone"
          className="absolute right-4 top-4 text-xs text-blue-300/70 transition-all duration-200 ease-out
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
               peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2
peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md
               "
        >
          شماره تماس
        </label>
        <button className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg
            width="12"
            height="19"
            viewBox="0 0 12 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.91667 3.25H6.58333M3.41667 17.4167H8.08333C9.01675 17.4167 9.48346 17.4167 9.83998 17.235C10.1536 17.0752 10.4086 16.8203 10.5683 16.5067C10.75 16.1501 10.75 15.6834 10.75 14.75V3.41667C10.75 2.48325 10.75 2.01654 10.5683 1.66002C10.4086 1.34641 10.1536 1.09144 9.83998 0.931656C9.48346 0.75 9.01675 0.75 8.08333 0.75H3.41667C2.48325 0.75 2.01654 0.75 1.66002 0.931656C1.34641 1.09144 1.09144 1.34641 0.931656 1.66002C0.75 2.01654 0.75 2.48325 0.75 3.41667V14.75C0.75 15.6834 0.75 16.1501 0.931656 16.5067C1.09144 16.8203 1.34641 17.0752 1.66002 17.235C2.01654 17.4167 2.48325 17.4167 3.41667 17.4167Z"
              stroke="#0887CA"
              strokeOpacity="0.7"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="relative flex flex-col gap-2">
          <div className="relative">
            {" "}
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`border peer w-full transition-colors focus:border-blue-500 text-[13px] pt-1 px-4 h-12 bg-white outline-0 rounded-2xl duration-300 ${getBorderColor()}`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className={`absolute right-4 top-4 text-xs text-blue-300/70 transition-all duration-200 ease-out
                     peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                     peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600
                     peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm
                     peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md
                      ${getBorderColor()}`}
            >
              رمز عبور
            </label>
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? (
                <FaRegEyeSlash
                  size={20}
                  className={`text-blue-300 transition-colors duration-300 ${getBorderColor()}`}
                />
              ) : (
                <IoEyeOutline
                  size={20}
                  className={`text-blue-300 transition-colors duration-300 ${getBorderColor()}`}
                />
              )}
            </button>
          </div>
        </div>

        <div className="h-0.5 w-full flex justify-between mx-auto gap-1 mt-1">
          <span
            className={`w-1/3 rounded-[100px] transition-colors duration-300 ${
              strength === 1
                ? "bg-red-600"
                : strength === 2
                  ? "bg-amber-400"
                  : strength === 3
                    ? "bg-green-100"
                    : "bg-white dark:bg-[#121212]"
            }`}
          />
          <span
            className={`w-1/3 rounded-[100px] transition-colors duration-300 ${
              strength >= 2
                ? strength === 3
                  ? "bg-green-100"
                  : "bg-amber-400"
                : "bg-white dark:bg-[#121212]"
            }`}
          />
          <span
            className={`w-1/3 rounded-[100px] transition-colors duration-300 ${
              strength === 3 ? "bg-green-100" : "bg-white dark:bg-[#121212]"
            }`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button
          type="submit"
          className="h-12 w-full rounded-2xl cursor-pointer bg-blue-100 text-white hover:bg-blue-200 transition-colors font-medium"
        >
          ارسال
        </button>
      </div>
    </form>
  );
};

export default StepThirdForm;
