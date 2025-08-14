import { auth } from '@/auth';
import { getToken } from 'next-auth/jwt';
import { headers } from 'next/headers';

const COOKIE_NAMES = ['authjs.session-token', '__Secure-authjs.session-token'];

export async function getServerAuth() {
  const session = await auth();
  const cookieHeader = (await headers()).get('cookie') ?? '';
  const req = new Request(process.env.AUTH_URL ?? 'http://localhost', {
    headers: { cookie: cookieHeader },
  });
  const secret = process.env.AUTH_SECRET;

  let token = await getToken({ req, secret }).catch(() => null);

  if (!token?.apiToken && !token?.role) {
    for (const name of COOKIE_NAMES) {
      token = await getToken({ req, secret, cookieName: name }).catch(
        () => null
      );
      if (token?.apiToken || token?.role) break;
    }
  }

  return {
    session,
    apiToken: token?.apiToken,
    role: token?.role ?? (session as any)?.role,
  };
}
