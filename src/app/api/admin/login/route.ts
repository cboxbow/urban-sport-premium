import { NextRequest, NextResponse } from 'next/server';
import { createAdminSession, verifyAdminCredentials } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = String(body.email || '');
  const password = String(body.password || '');

  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  await createAdminSession(email);
  return NextResponse.json({ ok: true });
}
