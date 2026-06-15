import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://188.121.111.8:3003/api";

const DeleteComment = async (id: number) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        throw new Error("لطفاً دوباره وارد شوید");
    }

    try {
        const res = await axios.delete(
            `${API_BASE_URL}/comments/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return res.data;
    } catch (err) {
        toast.error("خطا ")
        console.log(err);
        throw err;
    }
};

export default DeleteComment;