import { NextRequest, NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/admin-auth';
import { updateContentByKey } from '@/lib/content';
import type { ContentKey } from '@/lib/content/types';

const allowedKeys: ContentKey[] = [
  'homepage',
  'clubs',
  'tournaments',
  'memberships',
  'sponsors',
  'gallery',
  'events',
  'coaching',
  'experiences',
  'shop',
  'league',
  'site-settings',
  'rankings',
];

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const unauthorized = requireAdminApi(request);
  if (unauthorized) return unauthorized;

  const { key } = await params;
  if (!allowedKeys.includes(key as ContentKey)) {
    return NextResponse.json({ error: 'Unsupported content key' }, { status: 400 });
  }

  const body = await request.json();
  const updated = await updateContentByKey(key as ContentKey, body);
  return NextResponse.json({ ok: true, data: updated });
}
