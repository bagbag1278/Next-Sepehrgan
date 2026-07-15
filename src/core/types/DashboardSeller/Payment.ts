export interface House {
    id: number;
    title: string;
    sellerId: number;
    sellerName: string;
}

export interface TravelerDetail {
    fullName: string;
    nationalCode: string;
}

export interface Booking {
    id: number;

    user_id: number;

    houseId: number;

    reservedDates: string[];

    sharedEmail: string;

    sharedMobile: string;

    traveler_details: TravelerDetail[];

    status: string;

    createdAt: string;

    updatedAt: string;

    house: House;
}

export interface Payment {
    id: number;

    userId: number;

    bookingId: number;

    amount: string;

    description: string;

    status:
        | "completed"
        | "pending"
        | "failed";

    paymentUrl: string;

    transactionId: string | null;

    createdAt: string ;

    updatedAt: string | null;

    booking: Booking;
}

export interface PaymentsResponse {
    payments: Payment[];

    totalCount: number;
}