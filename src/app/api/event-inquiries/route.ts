import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createEventInquiry } from '@/lib/content';

const eventInquirySchema = z.object({
  inquiryType: z.string(),
  fullName: z.string().min(2),
  companyName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  preferredDate: z.string(),
  expectedGuests: z.string(),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const payload = eventInquirySchema.parse(body);
  const created = await createEventInquiry(payload);
  return NextResponse.json({ ok: true, data: created });
}
