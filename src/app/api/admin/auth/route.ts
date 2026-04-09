import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'manshin2024!';
const TOKEN_NAME = 'manshin_admin';

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Check auth
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME);
  if (!token?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}

// Login
export async function POST(request: NextRequest) {
  const { password } = await request.json();
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = generateToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(TOKEN_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  return response;
}

// Logout
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete({ name: TOKEN_NAME, path: '/' });
  return response;
}
