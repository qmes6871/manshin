'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Phone, Shield } from 'lucide-react';

export default function CTASection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/images/prayer.jpg"
          alt="상담 배경"
          fill
          className="object-cover scale-110"
        />
      </motion.div>
      <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-dark-900/80" />

      {/* Gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-gold/50" />
          <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-medium">Contact</span>
          <div className="w-12 h-px bg-gold/50" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          지금 바로
          <br />
          <span className="text-shimmer">상담을 시작하세요</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-lg mb-12 leading-relaxed max-w-xl mx-auto"
        >
          전화 상담 · 방문 상담 모두 가능합니다.
          <br />
          사전 예약 후 편안하게 상담받으세요.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12"
        >
          <Button href="/reservation" size="lg">
            온라인 예약하기
          </Button>
          <a
            href="sms:010-8114-8069"
            className="group inline-flex items-center gap-3 glass-gold rounded-full px-7 py-4 text-gold hover:bg-gold/10 transition-all duration-300"
          >
            <Phone size={20} />
            <span className="text-lg font-medium">010-8114-8069</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="inline-flex items-center gap-2 text-gray-600 text-sm"
        >
          <Shield size={14} />
          <span>모든 상담 내용은 철저한 비밀 보장을 원칙으로 합니다</span>
        </motion.div>
      </div>
    </section>
  );
}
