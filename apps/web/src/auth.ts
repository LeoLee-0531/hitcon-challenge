import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

export const authOptions: NextAuthConfig = {
  providers: [Google],
  session: { strategy: 'jwt' as const },
  callbacks: {
    async jwt({ token, account }: { token: any; account?: any }) {
      if (account?.id_token) {
        try {
          const response = await fetch(
            `${process.env.API_BASE_URL}/api/user/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id_token: account.id_token }),
            }
          );

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error?.message || '取得 API Token 失敗');
          }

          token.apiToken = data.data.token;
        } catch (error) {
          console.error('取得 API Token 時發生錯誤', error);
        }
      }

      return token;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
