export interface User {
  id: string;
  nickname: string;
  email: string;
  language: string;
  picture?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
