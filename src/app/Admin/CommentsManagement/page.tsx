// app/admin/comments/CommentsManagement.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Search, X, MessageSquare, Star } from "lucide-react";
import { toast } from "react-hot-toast";

import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import Pagination from "../../../components/Admin/Pagination/PaginationAdmin";
import DetailCommentModal from "@/components/Admin/CommentsManagement/modal/DetailCommentModal";
import DeleteCommentModal from "@/components/Admin/CommentsManagement/modal/DeleteCommentModal";
import EditCommentModal from "@/components/Admin/CommentsManagement/modal/EditCommentModal";
import { CommentCard } from "@/components/Admin/CommentsManagement/CommentCard";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

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
  const itemsPerPage = 5;

  // Modal States
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const getToken = () => localStorage.getItem("accessToken");

  const fetchComments = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        toast.error("لطفا وارد شوید");
        setLoading(false);
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
      } else {
        toast.error("خطا در دریافت نظرات");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // آمارها
  const totalComments = comments.length;
  const averageRating = comments.length > 0
    ? (comments.reduce((sum, c) => sum + Number(c.rating), 0) / comments.length).toFixed(1)
    : "0";
  const uniqueHotelsCount = new Set(comments.map((c) => c.house_id)).size;

  // فیلتر
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

  const resetFilters = () => {
    setSearch("");
  };

  // Handlers
  const handleViewDetails = (comment: Comment) => {
    setSelectedComment(comment);
    setIsDetailOpen(true);
  };

  const handleEdit = (comment: Comment) => {
    setSelectedComment(comment);
    setIsEditOpen(true);
  };

  const handleDelete = (comment: Comment) => {
    setSelectedComment(comment);
    setIsDeleteOpen(true);
  };

  const confirmEdit = async (data: { title: string; caption: string; rating: string }) => {
    if (!selectedComment) return;

    setModalLoading(true);
    const loadingToast = toast.loading("در حال ویرایش...");

    try {
      const token = getToken();
      await axios.put(
        `${API_BASE_URL}/admin/comments/${selectedComment.id}`,
        {
          title: data.title,
          caption: data.caption,
          rating: Number(data.rating),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("کامنت با موفقیت ویرایش شد", { id: loadingToast });
      await fetchComments();
      setIsEditOpen(false);
      setSelectedComment(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "خطا در ویرایش کامنت", { id: loadingToast });
    } finally {
      setModalLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedComment) return;

    setModalLoading(true);
    const loadingToast = toast.loading("در حال حذف...");

    try {
      const token = getToken();
      await axios.delete(`${API_BASE_URL}/admin/comments/${selectedComment.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("کامنت با موفقیت حذف شد", { id: loadingToast });
      await fetchComments();
      setIsDeleteOpen(false);
      setSelectedComment(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "خطا در حذف کامنت", { id: loadingToast });
    } finally {
      setModalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0887CAB2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="px-4 sm:px-8 py-6 space-y-6 min-h-screen">
      {/* Header */}
      <AdvancedScrollAnimation type="slide-right" delay={0.1}>
        <div className="bg-gradient-to-br from-slate-100 via-white to-gray-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-900 rounded-tl-[42px] rounded-br-[42px] rounded-2xl p-7 shadow-lg shadow-gray-200/70 dark:shadow-none border border-gray-200 dark:border-gray-700/50">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">مدیریت نظرات</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">مشاهده و مدیریت نظرات کاربران</p>
        </div>
      </AdvancedScrollAnimation>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "کل نظرات", value: totalComments, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", delay: 0.1 },
          { label: "میانگین امتیاز", value: averageRating, icon: Star, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20", delay: 0.2, suffix: "از ۵" },
          { label: "هتل‌های دارای نظر", value: uniqueHotelsCount, icon: MessageSquare, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", delay: 0.3 },
        ].map((stat, idx) => (
          <AdvancedScrollAnimation key={idx} type="fade" delay={stat.delay}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">
                    {stat.value}
                    {stat.suffix && <span className="text-sm font-normal mr-1">{stat.suffix}</span>}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon size={24} className={stat.color} />
                </div>
              </div>
            </div>
          </AdvancedScrollAnimation>
        ))}
      </div>

      {/* Search */}
      <AdvancedScrollAnimation type="slide-up" delay={0.2}>
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]" size={18} />
            <input
              type="text"
              placeholder="جستجوی نام کاربر، عنوان هتل یا متن کامنت..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pr-10 pl-4 border border-[#0887CAB2] rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
            />
          </div>
          {search && (
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition flex items-center gap-2"
            >
              <X size={18} />
              <span className="hidden sm:inline">پاک کردن</span>
            </button>
          )}
        </div>
      </AdvancedScrollAnimation>

      {/* Table Header */}
      <AdvancedScrollAnimation type="fade" delay={0.3}>
        <div className="hidden md:flex items-center justify-between h-16 rounded-xl px-5 font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30">
          <div className="w-[15%]">کاربر</div>
          <div className="w-[20%]">هتل</div>
          <div className="w-[25%]">عنوان</div>
          <div className="w-[10%]">امتیاز</div>
          <div className="w-[15%]">تاریخ</div>
          <div className="w-[15%] text-center">عملیات</div>
        </div>
      </AdvancedScrollAnimation>

      <div className="flex flex-col gap-3">
        {paginatedComments.length > 0 ? (
          paginatedComments.map((comment, idx) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              index={idx}
              onView={() => handleViewDetails(comment)}
              onEdit={() => handleEdit(comment)}
              onDelete={() => handleDelete(comment)}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <MessageSquare size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              {search ? "نتیجه‌ای برای جستجوی شما یافت نشد" : "هیچ نظری یافت نشد"}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredComments.length > 0 && totalPages > 1 && (
        <AdvancedScrollAnimation type="fade" delay={0.6}>
          <div className="flex justify-start pt-2">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </AdvancedScrollAnimation>
      )}

      {/* Modals */}
      <DetailCommentModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        comment={selectedComment}
      />

      <EditCommentModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={confirmEdit}
        comment={selectedComment}
        loading={modalLoading}
      />

      <DeleteCommentModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        commentTitle={selectedComment?.title}
        loading={modalLoading}
      />
    </div>
  );
};

export default CommentsManagement;