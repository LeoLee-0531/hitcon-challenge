import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { apiFetch } from './utils/apiFetch';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user, account }) {
      // 初次登入
      if (account && user) {
        try {
          const response = await apiFetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                image: user.image,
              }),
            }
          );

          if (!response) {
            throw new Error('API Token 取得失敗，請重新登入');
          }

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error?.message || '取得 API Token 失敗');
          }

          token.apiToken = data.data.token;
          // 解析 JWT，取得 role 欄位
          try {
            const payload = JSON.parse(
              Buffer.from(data.data.token.split('.')[1], 'base64').toString()
            );
            token.role = payload.role;
          } catch {
            token.role = undefined;
          }
        } catch (error) {
          console.error('取得 API Token 時發生錯誤', error);
          // 你可以回傳錯誤物件或 null 來表示失敗
          return null;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.apiToken) {
        session.apiToken = token.apiToken as string;
      }
      if (token.role) {
        session.role = token.role as string;
      }
      return session;
    },
  },
});
