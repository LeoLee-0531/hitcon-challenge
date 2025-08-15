import { notFound } from 'next/navigation';
import { getServerAuth } from '@/utils/getServerAuth';
import React from 'react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { apiToken } = await getServerAuth();

  if (!apiToken) {
    notFound();
  }

  try {
    const baseURL = process.env.API_BASE_URL;
    const res = await fetch(`${baseURL}/api/user/me`, {
      headers: { Authorization: `Bearer ${apiToken}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      notFound();
    }
    const data = await res.json();
    if (data?.data?.role !== 'ADMIN') {
      notFound();
    }
  } catch {
    notFound();
  }
  return <>{children}</>;
}
