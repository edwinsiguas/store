export interface User {
  id?: number;
  name: string;
  email: string;
  role: 'ROLE_ADMIN' | 'ROLE_CLIENT' | string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  email: string;
  role: string;
}
