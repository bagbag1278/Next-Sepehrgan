export interface ForgotPasswordRequestBody {
  email: string;
}

export interface ForgotPasswordRequestResponse {
  message: string;
  resetCode: string;
}