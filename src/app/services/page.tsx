import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: '서비스 안내',
  description: '김미애만신 상담 서비스 - 사주, 궁합, 신점, 택일, 기업상담 등 다양한 전문 상담 서비스를 제공합니다.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
