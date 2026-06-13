export interface SellerComment {
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

export interface SellerCommentsResponse {
  comments: SellerComment[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}