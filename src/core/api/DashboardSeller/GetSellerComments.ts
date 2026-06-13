import axios from "axios";
import { SellerCommentsResponse } from './../../types/DashboardSeller/CommentsType';

const GetSellerComments = async (
  sellerId: number,
  page = 1
): Promise<SellerCommentsResponse> => {
  const response = await axios.get(
    `/api/comments/seller/${sellerId}?page=${page}&limit=10`
  );

  return response.data;
};

export default GetSellerComments;