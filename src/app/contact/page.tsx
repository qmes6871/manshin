import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: '오시는길',
  description: '김미애만신 위치 안내 - 주소, 연락처, 오시는 방법을 확인하세요.',
};

export default function ContactPage() {
  return <ContactClient />;
}
