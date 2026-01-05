export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface CreateUserPayload {
  id?: number;
  email: string;
  name: string;
  password: string;
  role?: string;
  avatar: string;
}
export type AuthState = {
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
};
export interface UserProfile {
  id?: number;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  address?: string;
}
