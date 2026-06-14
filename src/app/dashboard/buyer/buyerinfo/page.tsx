import BuyerInfoClient from "@/components/Dashboard/buyer/info/BuyerInfoClient";
import { getUserInfo } from "@/core/token/auth";



const BuyerInfoPage = async () => {
  const user = await getUserInfo();

  return <BuyerInfoClient user={user} />;
};

export default BuyerInfoPage;