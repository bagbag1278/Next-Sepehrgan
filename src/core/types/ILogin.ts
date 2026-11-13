export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePicture?: string | null;
}

export interface LoginApiResponse {
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginApiError {
  message: string;
}
