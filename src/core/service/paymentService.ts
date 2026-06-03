import toast from "react-hot-toast";

// src/core/service/paymentService.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

export type PaymentStatus = "pending" | "completed" | "failed" ;

export interface Payment {
  id: number;
  userId: number;
  userName?: string;
  bookingId: number | null;
  amount: string;
  description: string;
  status: PaymentStatus;
  paymentUrl: string | null;
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePaymentData {
  amount?: string;
  status?: PaymentStatus;
  description?: string;
  transactionId?: string | null;
}

class PaymentService {
  private getHeaders() {
    const token = localStorage.getItem("accessToken");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  async getPayments(): Promise<Payment[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/payments`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      return result.data || result || [];
    } catch (error) {
      console.error("Error fetching payments:", error);
      throw error;
    }
  }

  async getPaymentById(id: number): Promise<Payment> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/payments/${id}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error("Error fetching payment:", error);
      throw error;
    }
  }


async updatePayment(id: number, data: Partial<Payment>): Promise<Payment> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/payments/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify({
        amount: data.amount,
        status: data.status,
        description: data.description,
        transactionId: data.transactionId
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error details:", errorData);
      
      // نمایش پیام خطای دقیق‌تر   
      const errorMessage = errorData.message || errorData.errors?.[0]?.message || "خطا در ویرایش پرداخت";
      toast.error(errorMessage);
      throw new Error(`HTTP ${response.status}: ${errorMessage}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
  }
}

  async deletePayment(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/payments/${id}`, {
        method: "DELETE",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
      throw error;
    }
  }
}

export const paymentService = new PaymentService();