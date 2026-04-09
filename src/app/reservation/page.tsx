import type { Metadata } from 'next';
import ReservationClient from './ReservationClient';

export const metadata: Metadata = {
  title: '상담예약',
  description: '김미애만신 상담 예약 - 사주, 궁합, 신점, 택일 상담을 온라인으로 편리하게 예약하세요.',
};

export default function ReservationPage() {
  return <ReservationClient />;
}
