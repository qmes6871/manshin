import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: '소개',
  description: '국가무형문화재 서울새남굿 이수자 김미애 만신 소개 - 40년 이상의 경력으로 정확하고 따뜻한 사주, 신점 상담을 해드립니다.',
};

export default function AboutPage() {
  return <AboutClient />;
}
