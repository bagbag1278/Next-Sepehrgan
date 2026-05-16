import http from "../interceptor/interceptor";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const res = await http.post<LoginResponse>("/auth/login", payload);
  return res;
}
