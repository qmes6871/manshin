import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

const TOKEN_NAME = 'manshin_admin';
const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'reservations.json');

async function checkAuth() {
  const cookieStore = await cookies();
  return !!cookieStore.get(TOKEN_NAME)?.value;
}

async function readReservations() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Get all reservations (newest first)
export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const reservations = await readReservations();
  reservations.sort((a: { createdAt: string }, b: { createdAt: string }) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(reservations);
}

// Delete a reservation
export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }

  const reservations = await readReservations();
  const filtered = reservations.filter((r: { id: string }) => r.id !== id);

  if (filtered.length === reservations.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');

  return NextResponse.json({ ok: true });
}
