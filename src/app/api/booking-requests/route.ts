import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createBookingRequest } from '@/lib/content';

const bookingSchema = z.object({
  clubSlug: z.string(),
  date: z.string(),
  preferredSlot: z.string(),
  name: z.string().min(2),
  phone: z.string().min(4),
  email: z.string().email(),
  notes: z.string().min(4),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const payload = bookingSchema.parse(body);
  const created = await createBookingRequest(payload);
  return NextResponse.json({ ok: true, data: created });
}
