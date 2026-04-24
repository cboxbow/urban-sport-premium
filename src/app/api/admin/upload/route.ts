import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/admin-auth';

const allowedFolders = ['clubs', 'gallery', 'tournaments', 'sponsors', 'branding'];
const allowedTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
];

export async function POST(request: NextRequest) {
  const unauthorized = requireAdminApi(request);
  if (unauthorized) return unauthorized;

  const formData = await request.formData();
  const file = formData.get('file');
  const folder = String(formData.get('folder') || 'gallery');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!allowedFolders.includes(folder)) {
    return NextResponse.json({ error: 'Invalid upload folder' }, { status: 400 });
  }

  if (!allowedTypes.includes(file.type) || file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: 'Unsupported file type or file too large' }, { status: 400 });
  }

  const extension = path.extname(file.name) || (file.type === 'application/pdf' ? '.pdf' : '.bin');
  const fileName = `${Date.now()}-${randomUUID()}${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const targetDir = path.join(process.cwd(), 'public', 'uploads', folder);
  const targetPath = path.join(targetDir, fileName);

  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(targetPath, buffer);

  return NextResponse.json({
    ok: true,
    path: `/uploads/${folder}/${fileName}`,
  });
}
