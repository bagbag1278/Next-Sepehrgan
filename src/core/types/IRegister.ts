export interface RegisterStepOneFormState {
  success: boolean; 
  message: string | null;
  errors: Record<string, string[]>;
}
export interface CompleteRegistrationRequest {
  userId: number;
  password: string;
  phoneNumber: string;
}

export interface User {
  id: number;
  role: string;
  membershipDate: string | null;
  email: string;
  phoneNumber: string;
  emailVerified: boolean;
  verificationCode: string | null;
  verificationCodeExpires: string | null;
  resetCode: string | null;
  resetCodeExpires: string | null;
  fullName: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  created_at: string;
  updated_at: string;
}

export interface CompleteRegistrationResponse {
  message: string;
  user: User;
}
