import React from "react";

const EditForm = () => {
  return (
    <form className="flex flex-col gap-4">
      {/* name */}
      <div className="flex flex-col gap-2 relative">
        <input
          type="text"
          name="name"
          className="peer w-full dark:text-black border text-[13px] pt-1 px-4 h-12 bg-white border-blue-300/50 outline-0 rounded-2xl transition-colors focus:border-blue-500 "
          placeholder=""
        />
        <label
          htmlFor="name"
          className="absolute right-4 top-4 text-xs text-blue-300/70 transition-all duration-200 ease-out
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
               peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2
peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md"
        >
          نام{" "}
        </label>
      </div>
      {/* last name */}
      <div className="flex flex-col gap-2 relative">
        <input
          type="text"
          name="lastname"
          className="peer w-full dark:text-black border text-[13px] pt-1 px-4 h-12 bg-white border-blue-300/50 outline-0 rounded-2xl transition-colors focus:border-blue-500 "
          placeholder=""
        />
        <label
          htmlFor="lastname"
          className="absolute right-4 top-4 text-xs text-blue-300/70 transition-all duration-200 ease-out
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
               peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2
peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md"
        >
          نام خانوادگی
        </label>
      </div>
      {/* email and number */}
      <div className="flex flex-col gap-2 relative">
        {" "}
        <input
          type="email"
          name="email"
          className="peer w-full dark:text-black border text-[13px] pt-1 px-4 h-12 bg-white border-blue-300/50 outline-0 rounded-2xl transition-colors focus:border-blue-500 "
          placeholder=""
        />
        <label
          htmlFor="email"
          className="absolute right-4 top-4 text-xs text-blue-300/70 transition-all duration-200 ease-out
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
               peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2
peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:backdrop-blur-md peer-not-placeholder-shown:rounded-md"
        >
          ایمیل
        </label>
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg
            width="19"
            height="15"
            viewBox="0 0 19 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.58333 1.58333L8.0601 6.62082C8.66195 7.08892 9.50472 7.08892 10.1066 6.62082L16.5833 1.58333M3.41667 14.0833H14.75C15.6834 14.0833 16.1501 14.0833 16.5067 13.9017C16.8203 13.7419 17.0752 13.4869 17.235 13.1733C17.4167 12.8168 17.4167 12.3501 17.4167 11.4167V3.41667C17.4167 2.48325 17.4167 2.01654 17.235 1.66002C17.0752 1.34641 16.8203 1.09144 16.5067 0.931656C16.1501 0.75 15.6834 0.75 14.75 0.75H3.41667C2.48325 0.75 2.01654 0.75 1.66002 0.931656C1.34641 1.09144 1.09144 1.34641 0.931656 1.66002C0.75 2.01654 0.75 2.48325 0.75 3.41667V11.4167C0.75 12.3501 0.75 12.8168 0.931656 13.1733C1.09144 13.4869 1.34641 13.7419 1.66002 13.9017C2.01654 14.0833 2.48325 14.0833 3.41667 14.0833Z"
              stroke="#0887CA"
              strokeOpacity="0.7"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-2 relative">
        <input
          type="text"
          name="phone"
          id="phone"
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
      <div className="h-12 flex gap-4 ">
        <button className="border border-blue-400 opacity-60 rounded-2xl py-2.5 px-8 cursor-pointer hover:opacity-100 transition-opacity duration-200">
          انصراف
        </button>
        <button className="bg-blue-100 text-white rounded-2xl py-2.5 px-9 cursor-pointer text-nowrap hover:opacity-80 transition-opacity duration-200">
          اعمال تغییرات
        </button>
      </div>
    </form>
  );
};

export default EditForm;
