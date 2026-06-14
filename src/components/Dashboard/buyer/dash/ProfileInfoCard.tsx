import React from "react";
import CircularRange from "@/components/Dashboard/buyer/dash/CircularRange";

import Link from "next/link";
import { getUserInfo } from "@/core/token/auth";

async function ProfileInfoCard() {
  const userInfo = await getUserInfo();

  let progressValue = 0;

  if (userInfo) {
    let points = 0;
    if (userInfo.name) points += 1;
    if (userInfo.email) points += 1;
    if (userInfo.role) points += 1;
    if (userInfo.profilePicture) points += 1;
    progressValue = (points / 4) * 100;
  } else {
    progressValue = 0;
  }

  return (
    <div className="h-78.5 rounded-2xl dark:bg-slate-800 pt-4.25 px-7.75 shadow-[0_0_4px] shadow-blue-200/20">
      <div className="h-66.5 flex flex-col items-center gap-4">
        
        <CircularRange initialValue={progressValue} />
        <div className="h-17.5 flex flex-col gap-2 items-center">
          <h6 className="font-medium ">وضعیت پروفایل شما</h6>
          <span className="text-[11px] opacity-70 text-center">
            برای اینکه بازدید خوبی داشته باشید، پروفایل شما باید حداقل ۷۰٪ تکمیل
            شده باشد.
          </span>
        </div>
        <Link
          href={"/dashboard/buyer/buyerinfo"}
          className="w-40 flex items-center justify-center h-8 border border-blue-200 dark:border-blue-300 dark:text-blue-300 hover:border-2 cursor-pointer text-[12px] hover:font-bold font-normal text-blue-200 rounded-xl"
        >
          ویرایش پروفایل
        </Link>
      </div>
    </div>
  );
}

export default ProfileInfoCard;
