"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

import { BlogHeader } from "@/components/Admin/AdminBlog/BlogHeader";
import { BlogStats } from "@/components/Admin/AdminBlog/BlogStats";
import { BlogSearchFilter } from "@/components/Admin/AdminBlog/BlogSearchFilter";
import { BlogTableHeader } from "@/components/Admin/AdminBlog/BlogTableHeader";
import { BlogPostCard } from "@/components/Admin/AdminBlog/BlogPostCard";
import { BlogEmptyState } from "@/components/Admin/AdminBlog/BlogEmptyState";
import { BlogLoading } from "@/components/Admin/AdminBlog/BlogLoading";
import { BlogError } from "@/components/Admin/AdminBlog/BlogError";

import AddBlogModal from "@/components/Admin/AdminBlog/AddBlogModal";
import EditBlogModal from "@/components/Admin/AdminBlog/EditBlogModal";
import DeleteBlogModal from "@/components/Admin/AdminBlog/DeleteBlogModal";
import Pagination from "../../Pagination/PaginationAdmin";

export interface BlogPost {
  id: number;
  title: string;
  caption: string;
  estimated_reading_time: string;
  author_id: number;
  created_at: string;
  category_id: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ;

const AdminBlogManagementClient = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const itemsPerPage = 4;

  const getToken = () => localStorage.getItem("accessToken");

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data?.data || response.data || [];
      setPosts(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("خطا:", error);
      setError("خطا در دریافت پست‌ها");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data: any) => {
    setSubmitting(true);
    try {
      const token = getToken();
      await axios.post(`${API_BASE_URL}/blogs`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("پست با موفقیت ایجاد شد");
      setIsAddModalOpen(false);
      fetchPosts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "خطا در ایجاد پست");
    } finally {
      setSubmitting(false);
    }
  };

const handleEdit = async (data: any) => {
  if (!selectedPost) return;
  setSubmitting(true);
  try {
    const token = getToken();
    await axios.put(`${API_BASE_URL}/blogs/${selectedPost.id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("پست با موفقیت ویرایش شد");
    setIsEditModalOpen(false);
    setSelectedPost(null);
    fetchPosts();
  } catch (error: any) {
    console.error("خطا:", error.response?.data);
    toast.error(error.response?.data?.message || "خطا در ویرایش پست");
  } finally {
    setSubmitting(false);
  }
};

  const handleDelete = async () => {
    if (!selectedPost) return;
    setSubmitting(true);
    try {
      const token = getToken();
      await axios.delete(`${API_BASE_URL}/blogs/${selectedPost.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("پست با موفقیت حذف شد");
      setIsDeleteModalOpen(false);
      setSelectedPost(null);
      fetchPosts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "خطا در حذف پست");
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) router.push("/login");
    else fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.caption?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const resetFilters = () => {
    setSearch("");
  };

  if (loading) return <BlogLoading />;
  if (error) return <BlogError error={error} onRetry={fetchPosts} />;

  return (
    <div dir="rtl" className="px-4 sm:px-8 py-6 space-y-6 min-h-screen">
      <BlogHeader onAdd={() => setIsAddModalOpen(true)} />
      
      <BlogStats totalCount={posts.length} />
      
      <BlogSearchFilter
        search={search}
        onSearchChange={setSearch}
        onResetFilters={resetFilters}
      />

      <BlogTableHeader />

      <div className="flex flex-col gap-3">
        {paginatedPosts.length === 0 ? (
          <BlogEmptyState hasSearch={!!search} />
        ) : (
          paginatedPosts.map((post, idx) => (
            <AdvancedScrollAnimation key={post.id} type="slide-up" delay={0.4 + idx * 0.05}>
              <BlogPostCard
                post={post}
                onEdit={() => openEditModal(post)}
                onDelete={() => openDeleteModal(post)}
              />
            </AdvancedScrollAnimation>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-start pt-2">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      <AddBlogModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAdd}
        loading={submitting}
      />

      <EditBlogModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPost(null);
        }}
        onSave={handleEdit}
        post={selectedPost}
        loading={submitting}
      />

      <DeleteBlogModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedPost(null);
        }}
        onConfirm={handleDelete}
        postTitle={selectedPost?.title}
        loading={submitting}
      />
    </div>
  );
};

export default AdminBlogManagementClient;