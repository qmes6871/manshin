'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Eye, Heart, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';

const timeline = [
  { year: '영적 감각', desc: '어린 시절부터 남다른 영적 감각을 가지고 성장' },
  { year: '입문 수련', desc: '사주팔자와 신점을 깊이 연구하며 수련 시작' },
  { year: '서울새남굿', desc: '서울새남굿 보존회 이수자로 국가무형문화재 전수' },
  { year: '상담 활동', desc: '수많은 분들의 고민을 함께 나누며 상담 진행 중' },
];

const philosophies = [
  {
    icon: <Eye size={22} />,
    title: '정확한 풀이',
    desc: '사주의 이론적 근거와 영적 통찰을 결합하여 보다 정확하고 깊이 있는 상담을 제공합니다.',
  },
  {
    icon: <Heart size={22} />,
    title: '맞춤형 상담',
    desc: '일률적인 해석이 아닌, 내담자 개개인의 상황과 고민에 맞춘 실질적인 조언을 드립니다.',
  },
  {
    icon: <Shield size={22} />,
    title: '따뜻한 공감',
    desc: '상담은 마음의 치유이기도 합니다. 진심 어린 공감으로 마음의 짐을 덜어드립니다.',
  },
];

export default function AboutClient() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  return (
    <div>
      {/* ─── Hero ─── */}
      <section ref={heroRef} className="relative h-[70vh] md:h-[80vh] overflow-hidden flex items-end">
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <Image
            src="/images/55.jpg"
            alt="김미애 만신 굿 공연"
            fill
            className="object-cover scale-110"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/30 to-dark-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/70 to-transparent" />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-16 md:pb-24"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-5"
          >
            <span className="inline-block text-xs md:text-xs tracking-[0.3em] uppercase text-gold/80 font-medium border-l-2 border-gold/60 pl-4">
              About
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
              진심으로 다가가는
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-shimmer leading-[1.05]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              따뜻한 상담
            </motion.h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent origin-left"
        />
      </section>

      {/* ─── Profile + Story ─── */}
      <section className="py-28 md:py-40 bg-dark-900 relative noise overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Photo column */}
            <motion.div
              className="lg:col-span-5 lg:sticky lg:top-28"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/profile.jpg"
                    alt="김미애 만신"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-transparent to-transparent" />
                </div>

                {/* Decorative frame */}
                <div className="absolute -top-3 -left-3 w-20 h-20 border-l-2 border-t-2 border-gold/20 rounded-tl-2xl" />
                <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-gold/20 rounded-br-2xl" />

                {/* Name badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-gold rounded-xl px-6 py-4">
                    <p className="text-gold text-lg font-bold" style={{ fontFamily: 'var(--font-serif)' }}>김미애 만신</p>
                    <p className="text-gray-400 text-sm mt-1">국가무형문화재 서울새남굿 이수자</p>
                  </div>
                </div>
              </div>

              {/* Award photo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-6 relative aspect-[16/10] rounded-2xl overflow-hidden"
              >
                <Image
                  src="/images/66.jpg"
                  alt="국가무형문화유산 서울새남굿 행사"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-dark-900/20" />
              </motion.div>
            </motion.div>

            {/* Text column */}
            <div className="lg:col-span-7">
              {/* Section label */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-px bg-gold/50" />
                <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-medium">Story</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-8"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                사주와 신점으로
                <br />
                <span className="text-gold">삶의 답을 찾다</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-5 text-gray-300 text-base md:text-lg leading-relaxed mb-16"
              >
                <p>
                  인왕산 신당 김미애 만신입니다.
                </p>
                <p>
                  저는 유년시절 아홉 살에 말문이 터지고, 열세 살에 신내림을 받아 40여 년 세월을 신령님 몸주로 살아왔습니다.
                  큰 만신이 되기 위해 오랜 시간 기도와 공부에 전념해 왔으며, 35세에 국가무형문화재 서울새남굿 제104호 전수장학생이 되었고, 38세에는 단독으로 이수자 시험에 합격하여 현재는 이사로 임명받아 활동하고 있습니다.
                </p>
                <p>
                  오랜 세월 한길을 운명이라 여기며 걸어오면서, 저는 늘 양심과 신뢰, 그리고 명예를 가장 중요하게 생각해왔습니다.
                  저 역시 인생을 살면서 수많은 우여곡절을 겪어왔지만, 부족하나마 늘 정성과 기도, 그리고 선한 마음으로 하나씩 이겨내고자 노력해왔습니다. 지금 이 자리까지 올 수 있었던 것은 모두 신령님의 뜻과 보살핌 덕분이라 생각하며, 그저 감사한 마음으로 하루하루를 살아가고 있습니다.
                </p>
                <p>
                  어린 시절부터 남다른 영적 감각을 지니고 있었던 저는 이를 바탕으로 사주팔자와 신점을 깊이 연구해왔고, 오랜 경험과 수많은 상담을 통해 내담자 한 분 한 분의 삶을 더욱 깊이 들여다보게 되었습니다.
                  저는 단순히 운세만을 이야기하는 것이 아니라, 내담자의 상황과 마음을 깊이 공감하고 그 안에서 실질적인 방향을 제시하는 것을 가장 중요하게 생각합니다.
                </p>
                <p>
                  사업, 취업, 연애, 결혼, 건강, 이사 등 삶을 살아가며 누구나 한 번쯤은 막막하고 답답한 순간을 마주하게 됩니다. 그럴 때 혼자 끌어안고 고민하기보다, 편안한 마음으로 찾아와 이야기를 나누셨으면 합니다.
                  저의 오랜 경험과 지식, 그리고 신령님의 뜻을 바탕으로 인연 닿는 분들께 길흉화복을 점쳐드리고, 앞으로 나아갈 길에 작은 빛이 되어드리고 싶습니다.
                </p>
              </motion.div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass-gold rounded-2xl p-8 mb-16"
              >
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed" style={{ fontFamily: 'var(--font-serif)' }}>
                  &ldquo;좋은 상담은 단순한 예측이 아니라,
                  <br />
                  내담자가 스스로 자신의 길을 찾을 수 있도록 돕는 것이라 믿습니다.&rdquo;
                </p>
                <p className="text-gold/70 text-sm mt-4">— 김미애 만신</p>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-px bg-gold/50" />
                <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-medium">Journey</span>
              </motion.div>

              <div className="space-y-0">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex gap-6 relative"
                  >
                    {/* Vertical line */}
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-gold/30 group-hover:bg-gold border-2 border-dark-900 transition-colors relative z-10" />
                      {index < timeline.length - 1 && (
                        <div className="w-px flex-1 bg-dark-600/50" />
                      )}
                    </div>

                    <div className="pb-10">
                      <p className="text-gold text-sm font-semibold mb-1">{item.year}</p>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Philosophy (Bento) ─── */}
      <section className="py-28 md:py-40 bg-dark-800 relative noise overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-gold/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-medium">Philosophy</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-black text-white leading-tight mb-16"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            이런 점이
            <br />
            <span className="text-gold">다릅니다</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {philosophies.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="group glass hover:glass-gold rounded-2xl p-8 md:p-10 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
                    {item.icon}
                  </div>
                  <span
                    className="text-3xl font-black text-dark-600 group-hover:text-gold/20 transition-colors"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  className="text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gallery strip ─── */}
      <section className="py-28 md:py-40 bg-dark-900 relative noise overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-gold/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-medium">Activity</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            활동 모습
          </motion.h2>
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-7xl mx-auto px-6 md:px-12">
          {[
            { src: '/images/22.jpg', alt: '활동 모습', tall: true },
            { src: '/images/33.jpg', alt: '활동 모습', tall: false },
            { src: '/images/44.jpg', alt: '활동 모습', tall: false },
            { src: '/images/77.jpg', alt: '활동 모습', tall: true },
            { src: '/images/ritual-crown.jpg', alt: '전통 관복 공연', tall: false },
            { src: '/images/ocean-prayer.jpg', alt: '해변 기도', tall: false },
            { src: '/images/shrine.jpg', alt: '신당 제단', tall: false },
            { src: '/images/entrance.jpg', alt: '국가무형문화재', tall: false },
            { src: '/images/drum-ritual.jpg', alt: '장구 연주', tall: false },
            { src: '/images/ritual-yellow.jpg', alt: '굿 의식', tall: false },
          ].map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`relative rounded-xl overflow-hidden group cursor-pointer ${photo.tall ? 'row-span-2 aspect-[3/5]' : 'aspect-square'}`}
            >
              <Image src={photo.src} alt={photo.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-dark-900/5 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/prayer.jpg"
            alt="상담 배경"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm" />
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
            편안하게
            <br />
            <span className="text-shimmer">상담받으세요</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mb-10"
          >
            삶의 모든 영역에서 고민이 있으시다면, 언제든 찾아와 주세요.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button href="/reservation" size="lg">
              상담 예약하기
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
