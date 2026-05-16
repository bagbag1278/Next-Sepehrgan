export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
}

export interface LoginApiResponse {
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginApiError {
  message: string;
  // ممکن است فیلدهای خطای دیگری هم داشته باشد
}
