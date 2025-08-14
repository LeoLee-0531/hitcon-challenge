import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getServerAuth } from '@/utils/getServerAuth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('user_id');
  const baseURL = process.env.API_BASE_URL;
  const { apiToken } = await getServerAuth();

  if (!apiToken || !userId) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized or missing user_id' },
      { status: 401 }
    );
  }

  const res = await fetch(
    `${baseURL}/api/reward/status?user_id=${encodeURIComponent(userId)}`,
    {
      headers: { Authorization: `Bearer ${apiToken}` },
      cache: 'no-store',
    }
  );

  const result = await res.json();
  return NextResponse.json(result, { status: res.status });
}
