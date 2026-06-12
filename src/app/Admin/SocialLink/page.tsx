// app/admin/social-links/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import Pagination from "../../../components/Admin/Pagination/PaginationAdmin";

import { SocialLinksHeader } from "@/components/Admin/SocialLink/SocialLinksHeader";
import { SocialLinksStats } from "@/components/Admin/SocialLink/SocialLinksStats";
import { SocialLinksSearchFilter } from "@/components/Admin/SocialLink/SocialLinksSearchFilter";
import { SocialLinksTableHeader } from "@/components/Admin/SocialLink/SocialLinksTableHeader";
import { SocialLinkCard } from "@/components/Admin/SocialLink/SocialLinkCard";
import { SocialLinksEmptyState } from "@/components/Admin/SocialLink/SocialLinksEmptyState";
import { SocialLinksLoading } from "@/components/Admin/SocialLink/SocialLinksLoading";
import { SocialLinksError } from "@/components/Admin/SocialLink/SocialLinksError";

import AddSocialLinkModal from "@/components/Admin/SocialLink/AddSocialLinkModal";
import EditSocialLinkModal from "@/components/Admin/SocialLink/EditSocialLinkModal";
import DeleteSocialLinkModal from "@/components/Admin/SocialLink/DeleteSocialLinkModal";

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003";

const SocialLinksManagement = () => {
  const router = useRouter();
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<SocialLink | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const itemsPerPage = 4;

  const getToken = () => localStorage.getItem("accessToken");

  const fetchLinks = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/social-media-links`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data?.data || response.data || [];
      setLinks(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("خطا:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        router.push("/login");
      } else {
        setError("خطا در دریافت لینک‌ها");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data: { platform: string; url: string }) => {
    setSubmitting(true);
    try {
      const token = getToken();
      await axios.post(`${API_BASE_URL}/social-media-links`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("لینک با موفقیت اضافه شد");
      setIsAddModalOpen(false);
      fetchLinks();
    } catch (error) {
      toast.error("خطا در افزودن لینک");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (data: { platform: string; url: string }) => {
    if (!selectedLink) return;
    setSubmitting(true);
    try {
      const token = getToken();
      await axios.put(`${API_BASE_URL}/social-media-links/${selectedLink.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("لینک با موفقیت ویرایش شد");
      setIsEditModalOpen(false);
      setSelectedLink(null);
      fetchLinks();
    } catch (error) {
      toast.error("خطا در ویرایش لینک");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedLink) return;
    setSubmitting(true);
    try {
      const token = getToken();
      await axios.delete(`${API_BASE_URL}/api/social-media-links/${selectedLink.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("لینک با موفقیت حذف شد");
      setIsDeleteModalOpen(false);
      setSelectedLink(null);
      fetchLinks();
    } catch (error) {
      toast.error("خطا در حذف لینک");
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (link: SocialLink) => {
    setSelectedLink(link);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (link: SocialLink) => {
    setSelectedLink(link);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) router.push("/login");
    else fetchLinks();
  }, []);

  const filteredLinks = links.filter((link) =>
    link.platform.toLowerCase().includes(search.toLowerCase()) ||
    link.url.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);
  const paginatedLinks = filteredLinks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const resetFilters = () => {
    setSearch("");
  };

  if (loading) return <SocialLinksLoading />;
  if (error) return <SocialLinksError error={error} onRetry={fetchLinks} />;

  return (
    <div dir="rtl" className="px-4 sm:px-8 py-6 space-y-6 min-h-screen">
      <SocialLinksHeader onAdd={() => setIsAddModalOpen(true)} />
      
      <SocialLinksStats totalCount={links.length} />
      
      <SocialLinksSearchFilter
        search={search}
        onSearchChange={setSearch}
        onResetFilters={resetFilters}
      />

      <SocialLinksTableHeader />

      <div className="flex flex-col gap-3">
        {paginatedLinks.length === 0 ? (
          <SocialLinksEmptyState hasSearch={!!search} />
        ) : (
          paginatedLinks.map((link, idx) => (
            <AdvancedScrollAnimation key={link.id} type="slide-up" delay={0.4 + idx * 0.05}>
              <SocialLinkCard
                link={link}
                onEdit={() => openEditModal(link)}
                onDelete={() => openDeleteModal(link)}
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

      <AddSocialLinkModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAdd}
        loading={submitting}
      />

      <EditSocialLinkModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedLink(null);
        }}
        onSave={handleEdit}
        link={selectedLink}
        loading={submitting}
      />

      <DeleteSocialLinkModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedLink(null);
        }}
        onConfirm={handleDelete}
        linkTitle={selectedLink?.platform}
        loading={submitting}
      />
    </div>
  );
};

export default SocialLinksManagement;