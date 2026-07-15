export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  data: {
    offerId: number;
  };
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationsResponse {
  data: Notification[];
  totalCount: number;
}