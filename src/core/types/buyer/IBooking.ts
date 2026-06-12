export interface TravelerDetail {
  gender: string;
  lastName: string;
  birthDate: string;
  firstName: string;
  nationalId: string;
}

export interface Booking {
  id: number;
  user_id: number;
  houseId: number;
  reservedDates: string[];
  traveler_details: TravelerDetail[];
  status: string;
  sharedEmail: string;
  sharedMobile: string;
  createdAt: string;
  updatedAt: string;
  created_at: string;
  updated_at: string;
  house: {
    title: string;
    price: string;
  };
}

export interface BookingResponse {
  data: Booking[];
  totalCount: number;
}