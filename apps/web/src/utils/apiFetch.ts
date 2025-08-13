import { signOut } from 'next-auth/react';

/**
 * 包裝 fetch，遇到 JWT 失效（401/403）時自動登出
 */
export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  if (res.status === 401 || res.status === 403) {
    // JWT 失效，自動登出
    signOut();
    return;
  }
  return res;
}
