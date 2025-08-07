'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getApiBaseUrl } from '../../../config/env';

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error || !code) {
          // 登入失敗，重導向回首頁
          router.push('/');
          return;
        }

        // 呼叫後端 API 進行 Google 登入
        const response = await fetch(`${getApiBaseUrl()}/auth/google/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (response.ok && data.data?.user_token) {
          // 儲存 user token 和用戶資訊
          localStorage.setItem('user_token', data.data.user_token);

          const userDataToStore = {
            id: data.data.user_id,
            user_id: data.data.user_id,
            nickname: data.data.nickname,
            email: data.data.email,
            language: data.data.language,
            picture: data.data.profileImage,
          };

          localStorage.setItem('user_info', JSON.stringify(userDataToStore));

          // 根據用戶的語言偏好重導向
          const userLanguage = data.data.language || 'zh';
          router.push(`/${userLanguage}`);
        } else {
          // 登入失敗，重導向回首頁
          router.push('/');
        }

      } catch (error) {
        console.error('Google 登入錯誤:', error);
        // 發生錯誤時也重導向回首頁
        router.push('/');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  // 不渲染任何 UI，讓頁面保持空白直到導向完成
  return null;
}
