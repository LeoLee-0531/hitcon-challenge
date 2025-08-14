import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getServerAuth } from '@/utils/getServerAuth';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = body.user_id;
  const baseURL = process.env.API_BASE_URL;
  const { apiToken } = await getServerAuth();

  if (!apiToken || !userId) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized or missing user_id' },
      { status: 401 }
    );
  }

  const res = await fetch(`${baseURL}/api/admin/reward/reset`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId }),
    cache: 'no-store',
  });

  const result = await res.json();
  return NextResponse.json(result, { status: res.status });
}
