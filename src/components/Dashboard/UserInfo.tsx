import { unstable_noStore as noStore } from "next/cache";
import { getUserInfo } from "@/core/token/auth";
import UserDropdown from "./buyer/UserDropdown";

const UserInfo = async () => {
  noStore(); 
  const user = await getUserInfo();
  console.log("user from token:", user);
  return <UserDropdown user={{ name: user?.name || "کاربر", phone: user?.phone || "" }} />;
};

export default UserInfo;
