import { signOut } from 'next-auth/react';

/**
 * 包裝 fetch，遇到 JWT 失效（401/403）時自動登出
 */

class AuthenticationError extends Error {
  constructor(message?: string) {
    super(message || '驗證失敗');
    this.name = 'AuthenticationError';
  }
}

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  if (res.status === 401 || res.status === 403) {
    // JWT 失效，自動登出
    signOut();
    throw new AuthenticationError('驗證失敗：JWT 已過期或無效');
  }
  return res;
}
