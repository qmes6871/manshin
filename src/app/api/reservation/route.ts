import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'reservations.json');

async function readReservations() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveReservations(reservations: unknown[]) {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(reservations, null, 2), 'utf-8');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, phone, gender, birthDate, calendarType, serviceType, preferredDate, preferredTime, consultMethod } = body;

    if (!name || !phone || !gender || !birthDate || !calendarType || !serviceType || !preferredDate || !preferredTime || !consultMethod) {
      return NextResponse.json({ error: '필수 항목을 모두 입력해주세요.' }, { status: 400 });
    }

    const reservation = {
      id: `res_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      ...body,
      createdAt: new Date().toISOString(),
    };

    const reservations = await readReservations();
    reservations.push(reservation);
    await saveReservations(reservations);

    // TODO: nodemailer 이메일 알림 (SMTP 설정 후 활성화)
    // const transporter = nodemailer.createTransport({ ... });
    // await transporter.sendMail({ ... });

    return NextResponse.json({ success: true, id: reservation.id });
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
