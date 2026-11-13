import BuyerInfoClient from "@/components/Dashboard/buyer/info/BuyerInfoClient";
import { getUserInfo } from "@/core/token/auth";



const BuyerInfoPage = async () => {
  const user = await getUserInfo();

  return (
    <BuyerInfoClient
      user={{
        name: user?.firstName || "",
        lastname: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phoneNumber || user?.phone || "",
        profilePicture: user?.profilePicture || null,
      }}
    />
  );
};

export default BuyerInfoPage;
