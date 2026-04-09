import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const STATS_FILE = path.join(process.cwd(), 'src', 'data', 'visitors.json');

interface VisitRecord {
  date: string;
  page: string;
  count: number;
}

export async function POST(request: NextRequest) {
  try {
    const { page } = await request.json();
    if (!page || typeof page !== 'string') {
      return NextResponse.json({ error: 'Invalid page' }, { status: 400 });
    }

    const cleanPage = page || "/";
    const today = new Date().toISOString().slice(0, 10);

    let records: VisitRecord[] = [];
    try {
      const data = await fs.readFile(STATS_FILE, 'utf-8');
      records = JSON.parse(data);
    } catch { /* file doesn't exist yet */ }

    const existing = records.find((r) => r.date === today && r.page === cleanPage);
    if (existing) {
      existing.count++;
    } else {
      records.push({ date: today, page: cleanPage, count: 1 });
    }

    // Keep only last 90 days of data
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 90);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    records = records.filter((r) => r.date >= cutoffStr);

    const dir = path.dirname(STATS_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(STATS_FILE, JSON.stringify(records, null, 2), 'utf-8');

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
