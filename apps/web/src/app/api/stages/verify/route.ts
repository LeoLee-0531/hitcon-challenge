import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getServerAuth } from '@/utils/getServerAuth';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const stage_id = body.stage_id;
  const password = body.password;

  const baseURL = process.env.API_BASE_URL;
  console.log('baseURL', baseURL);
  const { apiToken } = await getServerAuth();

  if (!apiToken || !stage_id) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized or missing user_id' },
      { status: 401 }
    );
  }

  const res = await fetch(`${baseURL}/api/stages/verify`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      stage_id: stage_id,
      password: password,
    }),
    cache: 'no-store',
  });

  const result = await res.json();
  return NextResponse.json(result, { status: res.status });
}
