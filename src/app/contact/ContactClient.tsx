'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, MapPin, Clock, MessageCircle, Navigation, Car, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';

const contactInfo = [
  {
    icon: <Phone size={20} />,
    label: '전화',
    value: '010-8114-8069',
    href: 'sms:010-8114-8069',
    desc: '문자 상담 추천',
  },
  {
    icon: <MessageCircle size={20} />,
    label: '카카오톡',
    value: '카카오채널 상담',
    href: 'http://pf.kakao.com/_nMHVX/chat',
    desc: '카카오톡 문의',
  },
  {
    icon: <MapPin size={20} />,
    label: '주소',
    value: '경기도 파주시 동산6길 10-8',
    href: undefined,
    desc: '방문 상담',
  },
  {
    icon: <Clock size={20} />,
    label: '상담시간',
    value: '평일 09:00-21:00 / 주말 10:00-18:00',
    href: undefined,
    desc: '예약제 운영',
  },
];

export default function ContactClient() {
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
            src="/images/building.jpg"
            alt="김미애만신 건물 외관"
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
              Contact
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
              오시는길
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-300 text-base md:text-lg max-w-lg mt-4"
          >
            편하게 방문해 주세요. 예약제로 운영됩니다.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent origin-left"
        />
      </section>

      {/* ─── Contact Info Cards ─── */}
      <section className="py-28 md:py-40 bg-dark-900 relative noise overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left — Map */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-12 h-px bg-gold/50" />
                <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-medium">Location</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black text-white leading-tight mb-8"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                찾아오시는 방법
              </motion.h2>

              {/* Map placeholder */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-dark-600/50">
                <div className="absolute inset-0 bg-dark-800 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                    <MapPin size={28} className="text-gold" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium mb-1">지도 영역</p>
                    <p className="text-gray-600 text-sm">경기도 파주시 동산6길 10-8</p>
                  </div>
                </div>
              </div>

              {/* Entrance photos */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                >
                  <Image
                    src="/images/entrance.jpg"
                    alt="입구 정면"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-dark-900/5 transition-all" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs text-white/80 bg-dark-900/60 backdrop-blur-sm rounded-full px-3 py-1">입구 정면</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                >
                  <Image
                    src="/images/building.jpg"
                    alt="건물 외관"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-dark-900/5 transition-all" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs text-white/80 bg-dark-900/60 backdrop-blur-sm rounded-full px-3 py-1">건물 외관</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right — Info */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="lg:sticky lg:top-28 space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.08 }}
                    className="group glass hover:glass-gold rounded-xl p-6 transition-all duration-500"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                        {info.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-gray-600 uppercase tracking-wider">{info.label}</p>
                          <span className="text-[10px] text-gray-700">{info.desc}</span>
                        </div>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-white font-medium hover:text-gold transition-colors flex items-center gap-2"
                          >
                            {info.value}
                            <ExternalLink size={12} className="text-gold/50" />
                          </a>
                        ) : (
                          <p className="text-white font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-dark-600 to-transparent my-2" />

                {/* Transport info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="glass rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                      <Navigation size={16} />
                    </div>
                    <h3 className="text-sm font-semibold text-white">대중교통</h3>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-gold/70 text-sm tracking-wider uppercase mb-1">지하철</p>
                      <p className="text-gray-300">OO역 O번 출구에서 도보 O분</p>
                    </div>
                    <div>
                      <p className="text-gold/70 text-sm tracking-wider uppercase mb-1">버스</p>
                      <p className="text-gray-300">OOO 정류장 하차</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="glass rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                      <Car size={16} />
                    </div>
                    <h3 className="text-sm font-semibold text-white">자가용</h3>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-gold/70 text-sm tracking-wider uppercase mb-1">주차</p>
                      <p className="text-gray-300">건물 내 주차 가능</p>
                    </div>
                    <div>
                      <p className="text-gold/70 text-sm tracking-wider uppercase mb-1">네비게이션</p>
                      <p className="text-gray-300">&quot;김미애만신&quot; 또는 주소로 검색</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/prayer.jpg"
            alt="상담 배경"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-dark-900/85 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-dark-900/80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white leading-tight mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            방문 전
            <br />
            <span className="text-shimmer">예약해 주세요</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mb-10"
          >
            편안한 상담을 위해 사전 예약을 부탁드립니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="/reservation" size="lg">
              상담 예약하기
            </Button>
            <a
              href="tel:010-8114-8069"
              className="group inline-flex items-center gap-3 glass-gold rounded-full px-7 py-4 text-gold hover:bg-gold/10 transition-all duration-300"
            >
              <Phone size={18} />
              <span className="font-medium">010-8114-8069</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
