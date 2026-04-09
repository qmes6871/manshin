'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, MessageCircle, Clock, FileText, Shield } from 'lucide-react';
import ReservationForm from '@/components/reservation/ReservationForm';

const sideInfo = [
  {
    icon: <Phone size={18} />,
    title: '빠른 문의',
    content: (
      <div className="space-y-2">
        <a href="sms:010-8114-8069" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors text-sm">
          <Phone size={14} />
          <span>010-8114-8069 (문자 추천)</span>
        </a>
        <a href="http://pf.kakao.com/_nMHVX/chat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors text-sm">
          <MessageCircle size={14} />
          <span>카카오채널 상담</span>
        </a>
      </div>
    ),
  },
  {
    icon: <Clock size={18} />,
    title: '예약 안내',
    content: (
      <ul className="space-y-2 text-sm text-gray-500">
        <li className="flex items-start gap-2">
          <span className="text-gold/50 mt-1">—</span>
          <span>예약 접수 후 영업일 1일 이내 확인 연락</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-gold/50 mt-1">—</span>
          <span>당일 예약은 전화 문의 부탁드립니다</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-gold/50 mt-1">—</span>
          <span>예약 변경/취소는 1일 전까지 가능</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-gold/50 mt-1">—</span>
          <span>방문, 전화, 영상 상담 모두 가능</span>
        </li>
      </ul>
    ),
  },
  {
    icon: <FileText size={18} />,
    title: '준비물',
    content: (
      <p className="text-sm text-gray-500 leading-relaxed">
        생년월일과 태어난 시간(가능한 경우)을 확인해 주세요.
        궁합 상담 시 상대방의 생년월일시도 함께 준비해 주세요.
      </p>
    ),
  },
];

export default function ReservationClient() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div>
      {/* ─── Hero ─── */}
      <section ref={heroRef} className="relative h-[50vh] md:h-[60vh] overflow-hidden flex items-end">
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <Image
            src="/images/entrance.jpg"
            alt="김미애만신 입구"
            fill
            className="object-cover scale-110"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/30 to-dark-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/70 to-transparent" />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-16 md:pb-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-5"
          >
            <span className="inline-block text-xs md:text-xs tracking-[0.3em] uppercase text-gold/80 font-medium border-l-2 border-gold/60 pl-4">
              Reservation
            </span>
          </motion.div>

          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              상담 예약
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-300 text-base md:text-lg max-w-lg mt-4"
          >
            아래 양식을 작성해 주시면 빠르게 확인 후 연락드리겠습니다
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent origin-left"
        />
      </section>

      {/* ─── Form Section ─── */}
      <section className="py-20 md:py-28 bg-dark-900 relative noise overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form — 8 columns */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ReservationForm />
            </motion.div>

            {/* Sidebar — 4 columns */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="lg:sticky lg:top-28 space-y-4">
                {sideInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="glass rounded-xl p-6 hover:glass-gold transition-all duration-500"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                    </div>
                    {item.content}
                  </motion.div>
                ))}

                {/* Privacy note */}
                <div className="flex items-start gap-2 text-gray-600 text-xs px-2 pt-2">
                  <Shield size={12} className="mt-0.5 flex-shrink-0" />
                  <span>모든 개인정보는 상담 목적으로만 사용되며 철저히 보호됩니다.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
