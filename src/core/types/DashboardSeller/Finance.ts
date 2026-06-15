export interface FinanceDashboard {
    totalAmount: number;
    totalBookings: number;
    totalPayments: number;
    totalPerviousMonthAmount: number;
    totalCurrentMonthAmount: number;
}

export interface FinanceDashboardResponse
    extends FinanceDashboard {}