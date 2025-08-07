'use client';

import { useState, useCallback } from 'react';
import { createGoogleOAuth } from '../lib/google-oauth';

export interface UseGoogleAuthResult {
  login: () => void;
  isLoading: boolean;
  error: string | null;
}

export interface AuthUser {
  user_token: string;
  user_id: string;
  nickname: string;
  email: string;
  language: string;
}

export const useGoogleAuth = (): UseGoogleAuthResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 檢查是否為瀏覽器環境
      if (typeof window === 'undefined') {
        throw new Error('Google OAuth only works in browser environment');
      }

      const googleOAuth = createGoogleOAuth();

      // 直接重導向到 Google 登入頁面
      googleOAuth.redirectToGoogle();
    } catch (err) {
      console.error('Google 登入錯誤:', err);
      setError(err instanceof Error ? err.message : 'Google 登入失敗');
      setIsLoading(false);
    }
  }, []);

  return {
    login,
    isLoading,
    error,
  };
};
