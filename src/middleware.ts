import { type NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'urban_sport_admin_session';
const textEncoder = new TextEncoder();

type SessionPayload = {
  email: string;
  exp: number;
};

function getSessionSecret() {
  return process.env.SESSION_SECRET || 'local-dev-session-secret-change-me';
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  return atob(padded);
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(getSessionSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signature = await crypto.subtle.sign('HMAC', key, textEncoder.encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

async function getAdminSessionFromRequest(request: NextRequest): Promise<SessionPayload | null> {
  const value = request.cookies.get(SESSION_COOKIE)?.value;
  if (!value) return null;

  const [body, signature] = value.split('.');
  if (!body || !signature) return null;

  const expected = await sign(body);
  if (signature !== expected) return null;

  try {
    const payload = JSON.parse(decodeBase64Url(body)) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = await getAdminSessionFromRequest(request);
    if (!session) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static  (static assets)
     * - _next/image   (image optimisation)
     * - favicon.ico
     * - public image and font files
     * - api routes handled outside auth (e.g. webhooks)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|pdf)).*)',
  ],
};
