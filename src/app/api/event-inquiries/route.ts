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

async function sendEventInquiryEmail(payload: z.infer<typeof eventInquirySchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = (process.env.ADMIN_NOTIFICATION_EMAIL || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  const fromEmail = process.env.NOTIFICATION_FROM_EMAIL || 'Urban Sport <onboarding@resend.dev>';

  if (!apiKey || notifyTo.length === 0) {
    return;
  }

  const safe = (value?: string) => value?.trim() || 'Not provided';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: notifyTo,
      subject: `New Urban Sport event inquiry: ${payload.fullName}`,
      reply_to: payload.email,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
          <h2>New Urban Sport event inquiry</h2>
          <p><strong>Type:</strong> ${safe(payload.inquiryType)}</p>
          <p><strong>Name:</strong> ${safe(payload.fullName)}</p>
          <p><strong>Email:</strong> ${safe(payload.email)}</p>
          <p><strong>Phone:</strong> ${safe(payload.phone)}</p>
          <p><strong>Company:</strong> ${safe(payload.companyName)}</p>
          <p><strong>Preferred date:</strong> ${safe(payload.preferredDate)}</p>
          <p><strong>Expected guests:</strong> ${safe(payload.expectedGuests)}</p>
          <p><strong>Message:</strong><br/>${safe(payload.message).replace(/\n/g, '<br/>')}</p>
        </div>
      `,
      text: [
        'New Urban Sport event inquiry',
        `Type: ${safe(payload.inquiryType)}`,
        `Name: ${safe(payload.fullName)}`,
        `Email: ${safe(payload.email)}`,
        `Phone: ${safe(payload.phone)}`,
        `Company: ${safe(payload.companyName)}`,
        `Preferred date: ${safe(payload.preferredDate)}`,
        `Expected guests: ${safe(payload.expectedGuests)}`,
        `Message: ${safe(payload.message)}`,
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend error ${response.status}: ${errorText}`);
  }

  console.info('Event inquiry email sent', {
    to: notifyTo,
    from: fromEmail,
    inquiryType: payload.inquiryType,
    fullName: payload.fullName,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const payload = eventInquirySchema.parse(body);

  let created: Awaited<ReturnType<typeof createEventInquiry>> | null = null;
  let emailSent = false;

  try {
    await sendEventInquiryEmail(payload);
    emailSent = true;
  } catch (error) {
    console.error('Unable to send event inquiry email', error);
  }

  const isServerlessReadOnly = Boolean(process.env.VERCEL);

  if (!isServerlessReadOnly) {
    try {
      created = await createEventInquiry(payload);
    } catch (error) {
      console.error('Unable to store event inquiry locally', error);
    }
  } else {
    console.info('Skipping local event inquiry storage on Vercel serverless runtime');
  }

  if (!created && !emailSent) {
    return NextResponse.json({ ok: false, error: 'Unable to send inquiry' }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    data: created,
    delivery: {
      emailSent,
      storedLocally: Boolean(created),
    },
  });
}
