'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function IntroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const textX = useTransform(scrollYProgress, [0.1, 0.4], [60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  return (
    <section ref={sectionRef} className="py-28 md:py-40 bg-dark-900 relative noise overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="w-12 h-px bg-gold/50" />
          <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-medium">About</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Photo — 5 columns */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
                <Image
                  src="/images/profile.jpg"
                  alt="김미애 만신"
                  fill
                  className="object-cover"
                />
              </motion.div>
              {/* Glass overlay at bottom */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent">
                <div className="glass-gold rounded-xl px-5 py-3 inline-block">
                  <p className="text-gold text-sm font-semibold">국가무형문화재</p>
                  <p className="text-gray-400 text-xs">서울새남굿 보존회 이수자</p>
                </div>
              </div>
            </div>

            {/* Decorative frame */}
            <div className="absolute -top-3 -left-3 w-20 h-20 border-l-2 border-t-2 border-gold/20 rounded-tl-2xl" />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-gold/20 rounded-br-2xl" />
          </motion.div>

          {/* Text — 7 columns */}
          <motion.div
            className="lg:col-span-7 lg:pl-8"
            style={{ x: textX, opacity: textOpacity }}
          >
            <h2
              className="text-3xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.15] mb-8"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              수많은 선택의 순간,
              <br />
              <span className="text-gold">혼자 고민하지 마세요</span>
            </h2>

            <div className="space-y-5 text-gray-300 text-base md:text-lg leading-relaxed mb-12">
              <p>
                김미애만신은 단순한 점사가 아닌,
                <span className="text-gray-300"> 삶의 방향을 잡아드리는 상담</span>을 제공합니다.
              </p>
              <p>
                막막한 미래가 궁금할 때, 중요한 결정을 앞두고 있을 때,
                인간관계와 금전, 사업 흐름이 고민될 때 —
                지금의 흐름을 정확히 짚어드립니다.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: '40+', label: '년 경력' },
                { number: '국가', label: '무형문화재' },
                { number: '1:1', label: '맞춤 상담' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass rounded-xl p-5 text-center"
                >
                  <p className="text-2xl md:text-3xl font-black text-gold mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                    {stat.number}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
