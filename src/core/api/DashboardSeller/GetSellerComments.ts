import axios from "axios";

const GetSellerComments = async (page = 1) => {
  const res = await axios.get(
    `/api/comments/seller?page=${page}&limit=4`
  );

  return res.data;
};

export default GetSellerComments;