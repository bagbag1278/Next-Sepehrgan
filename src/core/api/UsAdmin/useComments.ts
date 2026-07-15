import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://next.genzuni.website/api";

interface Comment {
  id: number;
  house_id: number;
  title: string;
  caption: string;
  rating: string;
  created_at: string;
  parent_comment_id: number | null;
  user: {
    firstName: string;
    lastName: string;
    profilePicture: string | null;
  };
  house: {
    id: number;
    title: string;
    address: string;
  };
}

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getToken = () => localStorage.getItem("accessToken");

  const fetchComments = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        toast.error("لطفا وارد شوید");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/admin/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data?.data || response.data || [];
      setComments(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("خطا در دریافت کامنت‌ها:", error);
      
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (commentId: number, data: any) => {
    const token = getToken();
    const response = await axios.put(
      `${API_BASE_URL}/admin/comments/${commentId}`,
      {
        title: data.title,
        caption: data.caption,
        rating: data.rating,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
  };

  const deleteComment = async (commentId: number) => {
    const token = getToken();
    const response = await axios.delete(`${API_BASE_URL}/admin/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  };

  return {
    comments,
    loading,
    search,
    setSearch,
    fetchComments,
    updateComment,
    deleteComment,
  };
};