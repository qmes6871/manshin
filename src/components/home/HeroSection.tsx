'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="/images/hero-main.jpg"
          alt="김미애 만신 굿 공연"
          fill
          className="object-cover object-center scale-110"
          priority
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/40 to-dark-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/40" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] animate-glow" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block text-xs md:text-sm tracking-[0.2em] uppercase text-gold/90 font-medium border-l-2 border-gold/60 pl-4">
              국가무형문화재 서울새남굿 이수자
            </span>
          </motion.div>

          {/* Main title */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[1.05] tracking-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              <span className="text-white">당신의 삶에</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[1.05] tracking-tight text-shimmer"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              답을 찾고 싶을 때
            </motion.h1>
          </div>

          {/* Sub text + CTA */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-gray-300 text-base md:text-lg max-w-md leading-relaxed"
            >
              흐름을 읽고 길을 밝혀드립니다.
              <br />
              타고난 운명과 현재의 기운을 정확히 짚어
              지금 가장 필요한 방향을 안내해드립니다.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex gap-4"
            >
              <Button href="/reservation" size="lg">
                상담 예약
              </Button>
              <Button href="/services" variant="outline" size="lg">
                서비스 안내
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom scroll line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1.3 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent origin-left"
      />
    </section>
  );
}
