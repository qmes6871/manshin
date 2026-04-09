import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

const TOKEN_NAME = 'manshin_admin';
const STATS_FILE = path.join(process.cwd(), 'src', 'data', 'visitors.json');

interface VisitRecord {
  date: string;
  page: string;
  count: number;
}

async function readStats(): Promise<VisitRecord[]> {
  try {
    const data = await fs.readFile(STATS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function GET() {
  const cookieStore = await cookies();
  if (!cookieStore.get(TOKEN_NAME)?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const records = await readStats();

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  // Start of this week (Monday)
  const weekStart = new Date(now);
  const day = weekStart.getDay();
  weekStart.setDate(weekStart.getDate() - (day === 0 ? 6 : day - 1));
  const weekStartStr = weekStart.toISOString().slice(0, 10);

  const monthStr = todayStr.slice(0, 7);

  const sumByFilter = (fn: (r: VisitRecord) => boolean) =>
    records.filter(fn).reduce((s, r) => s + r.count, 0);

  const today = sumByFilter((r) => r.date === todayStr);
  const yesterdayCount = sumByFilter((r) => r.date === yesterdayStr);
  const thisWeek = sumByFilter((r) => r.date >= weekStartStr);
  const thisMonth = sumByFilter((r) => r.date.startsWith(monthStr));
  const total = records.reduce((s, r) => s + r.count, 0);

  // Daily data for last 14 days
  const dailyMap = new Map<string, number>();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dailyMap.set(d.toISOString().slice(0, 10), 0);
  }
  for (const r of records) {
    if (dailyMap.has(r.date)) {
      dailyMap.set(r.date, (dailyMap.get(r.date) || 0) + r.count);
    }
  }
  const dailyData = Array.from(dailyMap, ([date, count]) => ({ date, count }));

  // Page data
  const pageMap = new Map<string, number>();
  for (const r of records) {
    pageMap.set(r.page, (pageMap.get(r.page) || 0) + r.count);
  }
  const pageData = Array.from(pageMap, ([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count);

  return NextResponse.json({ today, yesterday: yesterdayCount, thisWeek, thisMonth, total, dailyData, pageData });
}
