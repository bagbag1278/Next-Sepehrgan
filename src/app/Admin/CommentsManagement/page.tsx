"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Trash2,
  Star,
  User,
  MessageSquare,
  Home,
  Edit,
} from "lucide-react";
import { toast } from "react-hot-toast";

import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import EditCommentModal from "@/app/admin/CommentsManagement/edit&delete/EditCommentModal";
import DeleteCommentModal from "@/app/admin/CommentsManagement/edit&delete/DeleteCommentsModal";
import Pagination from "../Pagination/PaginationAdmin";
import HeaderCardCommens from "./card/HeaderCardCommens";

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

const CommentsManagement = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const itemsPerPage = 5;

  const totalComments = comments.length;
  const averageRating =
    comments.length > 0
      ? (
          comments.reduce((sum, c) => sum + Number(c.rating), 0) /
          comments.length
        ).toFixed(1)
      : "0";

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
      const errorMessage = error.response?.data?.message || "خطا در دریافت کامنت‌ها";
      toast.error(errorMessage);
      
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const openDeleteModal = (comment: Comment) => {
    setCommentToDelete(comment);
    setDeleteModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setCommentToDelete(null);
    document.body.style.overflow = "unset";
  };

  const handleDelete = async () => {
    if (!commentToDelete) return;
    
    setModalLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error("توکن یافت نشد");

      await axios.delete(`${API_BASE_URL}/admin/comments/${commentToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      toast.success("کامنت با موفقیت حذف شد");
      await fetchComments();
      closeDeleteModal();
    } catch (error: any) {
      console.error("خطا در حذف کامنت:", error);
      const errorMessage = error.response?.data?.message || "خطا در حذف کامنت";
      toast.error(errorMessage);
    } finally {
      setModalLoading(false);
    }
  };

  const openEditModal = (comment: Comment) => {
    setEditingComment(comment);
    document.body.style.overflow = "hidden";
  };

  const closeEditModal = () => {
    setEditingComment(null);
    document.body.style.overflow = "unset";
  };

  const handleEdit = async (data: {
    title: string;
    caption: string;
    rating: string;
  }) => {
    if (!editingComment) return;
    
    setModalLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error("توکن یافت نشد");

      await axios.put(
        `${API_BASE_URL}/admin/comments/${editingComment.id}`,
        {
          title: data.title,
          caption: data.caption,
          rating: Number(data.rating), 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success("کامنت با موفقیت ویرایش شد");
      closeEditModal();
      await fetchComments();
    } catch (error: any) {
      console.error("خطا در ویرایش کامنت:", error);
      const errorMessage = error.response?.data?.message || "خطا در ویرایش کامنت";
      toast.error(errorMessage);
    } finally {
      setModalLoading(false);
    }
  };

  const filteredComments = comments.filter((comment) => {
    const fullName = `${comment.user?.firstName || ""} ${comment.user?.lastName || ""}`.trim();
    const searchTerm = search.toLowerCase();
    
    return (
      fullName.toLowerCase().includes(searchTerm) ||
      comment.house?.title?.toLowerCase().includes(searchTerm) ||
      comment.caption?.toLowerCase().includes(searchTerm) ||
      comment.title?.toLowerCase().includes(searchTerm)
    );
  });

  const totalPages = Math.ceil(filteredComments.length / itemsPerPage);
  const paginatedComments = filteredComments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const renderStars = (rating: string) => {
    const rate = Number(rating);
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={
              star <= rate
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("fa-IR");
    } catch {
      return "نامشخص";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0887CAB2]"></div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="p-6 space-y-6   min-h-screen">
      <AdvancedScrollAnimation type="slide-right" delay={0.1}>
           <div className="bg-gradient-to-br from-slate-100 via-white to-gray-100 
                dark:from-slate-950 dark:via-gray-900 dark:to-slate-900 
                rounded-tl-[42px] rounded-br-[42px] rounded-2xl p-7 
                shadow-lg shadow-gray-200/70 dark:shadow-none
                border border-gray-200 dark:border-gray-700/50">
  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">نظرات مدیریت</h1>
  <p className="text-gray-500 dark:text-gray-400 mt-2">  به مشاهده و مدریت نظرات کاربران خوش امدید</p>
</div>
      </AdvancedScrollAnimation>

      <HeaderCardCommens
        totalComments={totalComments}
        averageRating={averageRating}
        hotelsWithComments={new Set(comments.map((c) => c.house_id)).size}
      />

      <AdvancedScrollAnimation type="slide-up" delay={0.2}>
        <div className="relative w-full sm:w-80">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]"
            size={18}
          />
          <input
            type="text"
            placeholder="جستجو بر اساس نام کاربر، عنوان هتل یا متن کامنت..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 border rounded-2xl border-[#0887CAB2] text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0887CAB2] transition-all duration-300"
          />
        </div>
      </AdvancedScrollAnimation>

      <div className="space-y-4">
        {paginatedComments.length > 0 ? (
          paginatedComments.map((comment, index) => {
            const fullName = `${comment.user?.firstName || ""} ${comment.user?.lastName || ""}`.trim() || "کاربر ناشناس";
            return (
              <AdvancedScrollAnimation
                key={comment.id}
                type="slide-up"
                delay={0.1 + index * 0.05}
                duration={0.4}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 rounded-tl-[42px] rounded-br-[42px] shadow-[0_0_8px] shadow-blue-300/30 transition-all hover:shadow-[0_0_12px] hover:shadow-blue-300/40">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          {comment.user?.firstName?.charAt(0) || "ک"}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 dark:text-white">
                            {fullName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(comment.created_at)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center gap-2">
                          <Home size={14} className="text-blue-500" />
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-300">
                            {comment.house?.title || "هتل نامشخص"}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {comment.house?.address || "آدرس نامشخص"}
                        </p>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          {comment.title || "بدون عنوان"}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {comment.caption}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between gap-3">
                      <div className="flex items-center gap-4">
                        {renderStars(comment.rating)}
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          {comment.rating} / ۵
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(comment)}
                          className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300"
                          title="ویرایش"
                        >
                          <Edit size={18} className="text-[#0887CAB2]" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(comment)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
                          title="حذف"
                        >
                          <Trash2 size={18} className="text-red-500 dark:text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </AdvancedScrollAnimation>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-[0_0_8px] shadow-blue-300/30">
            <MessageSquare size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              {search ? "نتیجه‌ای برای جستجوی شما یافت نشد" : "هیچ کامنتی یافت نشد"}
            </p>
          </div>
        )}
      </div>
      {/* آمار نمایش */}
      {paginatedComments.length > 0 && (
        <AdvancedScrollAnimation type="fade" delay={0.5}>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            نمایش {paginatedComments.length} از {filteredComments.length} کامنت
          </div>
        </AdvancedScrollAnimation>
      )}

      {totalPages > 1 && (
        <AdvancedScrollAnimation type="slide-up" delay={0.6}>
          <div className="flex justify-center pt-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </AdvancedScrollAnimation>
      )}

      <DeleteCommentModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        commentTitle={commentToDelete?.title}
        loading={modalLoading}
      />

      <EditCommentModal
        isOpen={!!editingComment}
        onClose={closeEditModal}
        onSave={handleEdit}
        initialData={{
          title: editingComment?.title || "",
          caption: editingComment?.caption || "",
          rating: editingComment?.rating || "5",
        }}
        loading={modalLoading}
      />
    </div>
  );
};

export default CommentsManagement;