import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'urban_sport_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

type SessionPayload = {
  email: string;
  exp: number;
};

function getSessionSecret() {
  return process.env.SESSION_SECRET || 'local-dev-session-secret-change-me';
}

function base64url(input: string | Buffer) {
  return Buffer.from(input).toString('base64url');
}

function sign(value: string) {
  return createHmac('sha256', getSessionSecret()).update(value).digest('base64url');
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function encodeSession(payload: SessionPayload) {
  const body = base64url(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

function decodeSession(value?: string | null): SessionPayload | null {
  if (!value) return null;
  const [body, signature] = value.split('.');
  if (!body || !signature) return null;

  const expected = sign(body);
  if (!safeEqual(signature, expected)) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload;
  if (!payload.exp || payload.exp < Date.now()) {
    return null;
  }

  return payload;
}

function parseStoredPassword() {
  return process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD || '';
}

function verifyScryptPassword(password: string, stored: string) {
  const [, salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const derived = scryptSync(password, salt, Buffer.from(hash, 'hex').length).toString('hex');
  return timingSafeEqual(Buffer.from(derived, 'hex'), Buffer.from(hash, 'hex'));
}

export function verifyAdminCredentials(email: string, password: string) {
  const storedEmail = process.env.ADMIN_EMAIL || '';
  const storedPassword = parseStoredPassword();

  if (!storedEmail || !storedPassword) return false;
  if (email.trim().toLowerCase() !== storedEmail.trim().toLowerCase()) return false;

  if (storedPassword.startsWith('scrypt:')) {
    return verifyScryptPassword(password, storedPassword);
  }

  return safeEqual(password, storedPassword);
}

export async function createAdminSession(email: string) {
  const store = await cookies();
  const session = encodeSession({ email, exp: Date.now() + SESSION_TTL_MS });
  store.set(SESSION_COOKIE, session, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getAdminSession() {
  const store = await cookies();
  return decodeSession(store.get(SESSION_COOKIE)?.value);
}

export function getAdminSessionFromRequest(request: NextRequest) {
  return decodeSession(request.cookies.get(SESSION_COOKIE)?.value);
}

export function requireAdminApi(request: NextRequest) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}

export function generatePasswordHash(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}
