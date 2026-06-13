"use client";

import { useEffect, useState, useCallback } from "react";
import { useUsers } from "@/hooks/UsAdmin/useUsers";
import { UsersHeader } from "@/components/Admin/UsersManagment/UsersHeader";
import { UsersStats } from "@/components/Admin/UsersManagment/UsersStats";
import { UsersSearchFilter } from "@/components/Admin/UsersManagment/UsersSearchFilter";
import { UsersTableHeader } from "@/components/Admin/UsersManagment/UsersTableHeader";
import { UsersList } from "@/components/Admin/UsersManagment/UsersList";
import Pagination from "@/components/Admin/Pagination/PaginationAdmin";

export interface User {
  id: number;
  fullName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber: string | null;
  role: "buyer" | "seller" | "admin";
  created_at?: string;
}

const UsersManagement = () => {
  const { users, loading, fetchUsers, handleDelete, handleEdit } = useUsers();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "seller" | "buyer">("all");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateKey, setUpdateKey] = useState(0);
  const itemsPerPage = 4;

  const filteredUsers = users.filter((user: User) => {
    const matchesSearch =
      !search ||
      user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.phoneNumber?.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [updateKey]);

  const handleEditWithRefresh = useCallback(async (updatedUser: User, originalUser?: User) => {
    await handleEdit(updatedUser, originalUser);
    setUpdateKey(prev => prev + 1);
  }, [handleEdit]);

  const totalUsers = users.length;
  const adminCount = users.filter((u: User) => u.role === "admin").length;
  const sellerCount = users.filter((u: User) => u.role === "seller").length;
  const buyerCount = users.filter((u: User) => u.role === "buyer").length;

  const resetFilters = () => {
    setSearch("");
    setRoleFilter("all");
  };

  if (loading && users.length === 0) {
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
      <UsersHeader />
      <UsersStats
        totalUsers={totalUsers}
        adminCount={adminCount}
        sellerCount={sellerCount}
        buyerCount={buyerCount}
      />
      <UsersSearchFilter
        search={search}
        onSearchChange={setSearch}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onResetFilters={resetFilters}
      />
      <UsersTableHeader />
      <UsersList
        key={updateKey}
        users={paginatedUsers}
        loading={loading}
        search={search}
        roleFilter={roleFilter}
        onEdit={handleEditWithRefresh}
        onDelete={handleDelete}
      />
      {totalPages > 1 && (
        <div className="flex justify-start pt-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default UsersManagement;