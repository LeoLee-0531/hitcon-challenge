import { NextResponse } from 'next/server';
import { getServerAuth } from '@/utils/getServerAuth';

export async function GET() {
  console.log('API route hit');

  const { apiToken } = await getServerAuth();
  const baseURL = process.env.API_BASE_URL;

  console.log(apiToken);

  if (!apiToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await fetch(`${baseURL}/api/user/me`, {
      headers: { Authorization: `Bearer ${apiToken}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
