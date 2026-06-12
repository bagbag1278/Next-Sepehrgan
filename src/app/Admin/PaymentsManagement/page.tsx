// app/admin/payments/PaymentsManagement.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  X,
  DollarSign,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import Pagination from "../../../components/Admin/Pagination/PaginationAdmin";

import { PaymentsHeader } from "../../../components/Admin/PaymentsManagement/PaymentsHeader";
import { PaymentsStats } from "../../../components/Admin/PaymentsManagement/PaymentsStats";
import { PaymentsSearchFilter } from "../../../components/Admin/PaymentsManagement/PaymentsSearchFilter";
import { PaymentsTableHeader } from "../../../components/Admin/PaymentsManagement/PaymentsTableHeader";
import { PaymentCard } from "../../../components/Admin/PaymentsManagement/PaymentCard";
import { PaymentsEmptyState } from "../../../components/Admin/PaymentsManagement/PaymentsEmptyState";

import EditPaymentModal from "../../../components/Admin/PaymentsManagement/Action/EditPaymentModal";

import { usePayments } from "../../../hooks/UsAdmin/usePayments";

// ✅ استفاده از نوع Payment از usePayments به جای تعریف مجدد
// یا اگر نیاز به export دارید، آن را هماهنگ کنید

const PaymentsManagement = () => {
  const router = useRouter();
  const {
    payments,
    usersMap,
    loading,
    fetchPayments,
    updatePayment,
    deletePayment,
    getUserName,
  } = usePayments();

  // UI State
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Modal States
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Statistics
  const filteredPayments = payments.filter((payment: any) => {
    const userName = getUserName(payment.userId);
    const matchSearch =
      userName.toLowerCase().includes(search.toLowerCase()) ||
      String(payment.id).includes(search) ||
      (payment.transactionId &&
        payment.transactionId.toLowerCase().includes(search.toLowerCase())) ||
      payment.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" || payment.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalAmount = filteredPayments.reduce(
    (sum: number, p: any) => sum + (parseFloat(p.amount) || 0),
    0,
  );
  const paidAmount = filteredPayments
    .filter((p: any) => p.status === "completed")
    .reduce((sum: number, p: any) => sum + (parseFloat(p.amount) || 0), 0);
  const pendingAmount = filteredPayments
    .filter((p: any) => p.status === "pending")
    .reduce((sum: number, p: any) => sum + (parseFloat(p.amount) || 0), 0);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  const handleEdit = (payment: any) => {
    setSelectedPayment(payment);
    setShowEditModal(true);
  };

  const handleUpdatePayment = async (id: number, data: any) => {
    await updatePayment(id, data);
    setShowEditModal(false);
    setSelectedPayment(null);
  };

  const handleDeletePayment = async (id: number) => {
    await deletePayment(id);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) router.push("/login");
    else fetchPayments();
  }, []);

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
      <PaymentsHeader />
      <PaymentsStats
        totalCount={filteredPayments.length}
        totalAmount={totalAmount}
        paidAmount={paidAmount}
        pendingAmount={pendingAmount}
      />
      <PaymentsSearchFilter
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        isStatusOpen={isStatusOpen}
        onStatusOpenChange={setIsStatusOpen}
        onResetFilters={resetFilters}
      />
      <PaymentsTableHeader />
      <div className="flex flex-col gap-3">
        {paginatedPayments.map((payment: any, idx: number) => (
          <PaymentCard
            key={payment.id}
            payment={payment}
            index={idx}
            userName={getUserName(payment.userId)}
            onEdit={() => handleEdit(payment)}
            onDelete={handleDeletePayment}
          />
        ))}
      </div>
      {filteredPayments.length > 0 && totalPages > 1 && (
        <AdvancedScrollAnimation type="fade" delay={0.6}>
          <div className="flex justify-start pt-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </AdvancedScrollAnimation>
      )}
      {filteredPayments.length === 0 && !loading && <PaymentsEmptyState />}
      <EditPaymentModal
        isOpen={showEditModal}
        payment={selectedPayment}
        onClose={() => {
          setShowEditModal(false);
          setSelectedPayment(null);
        }}
        onSave={handleUpdatePayment}
      />
    </div>
  );
};

export default PaymentsManagement;