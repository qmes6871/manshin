'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Heart, Compass, CalendarCheck, Building2, ChevronDown, Clock, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const services = [
  {
    icon: <Star size={28} />,
    title: '사주상담',
    description: '사주팔자(四柱八字)를 통해 타고난 운명의 흐름을 파악합니다. 재운, 관운, 건강운, 애정운 등 인생 전반에 걸친 운세를 분석하고 중요한 결정에 대한 방향을 제시합니다.',
    details: ['신년운세 · 월별운세', '재물운 · 사업운', '직장운 · 취업운', '건강운 · 수명'],
    duration: '약 40-60분',
    accent: 'from-violet-500/20 via-purple-500/5',
    border: 'hover:border-violet-500/30',
  },
  {
    icon: <Heart size={28} />,
    title: '궁합',
    description: '두 사람의 사주를 종합적으로 비교 분석하여 궁합을 봅니다. 연인, 부부, 사업 파트너 등 다양한 관계의 궁합을 살펴 더 나은 관계를 위한 조언을 드립니다.',
    details: ['연인 궁합 · 부부 궁합', '사업 파트너 궁합', '결혼 시기 · 배우자 운', '연애운 · 이별 상담'],
    duration: '약 50-70분',
    accent: 'from-rose-500/20 via-pink-500/5',
    border: 'hover:border-rose-500/30',
  },
  {
    icon: <Compass size={28} />,
    title: '신점',
    description: '영적 능력을 통해 과거, 현재, 미래를 살피고 구체적인 해답을 제시합니다. 사주만으로는 알 수 없는 깊은 부분까지 읽어드립니다.',
    details: ['과거 · 현재 · 미래', '잃어버린 것 찾기', '영적 문제 상담', '조상 · 신병 상담'],
    duration: '약 40-60분',
    accent: 'from-amber-500/20 via-orange-500/5',
    border: 'hover:border-amber-500/30',
  },
  {
    icon: <CalendarCheck size={28} />,
    title: '택일',
    description: '중요한 일의 길일을 잡아드립니다. 결혼, 이사, 개업 등 인생의 중요한 순간에 좋은 날을 선택하여 좋은 기운을 받을 수 있도록 도와드립니다.',
    details: ['결혼 택일', '이사 택일', '개업 · 오픈일', '입학 · 시험일'],
    duration: '약 30분',
    accent: 'from-sky-500/20 via-blue-500/5',
    border: 'hover:border-sky-500/30',
  },
  {
    icon: <Building2 size={28} />,
    title: '기업 · 사업 상담',
    description: '사업 운세와 방향을 살펴드립니다. 창업 시기, 사업 확장, 투자 결정 등 비즈니스와 관련된 모든 고민에 대해 상담을 진행합니다.',
    details: ['창업 · 사업 시기', '사업 확장 · 투자', '인사 · 동업 상담', '사무실 · 상가 입지'],
    duration: '약 60-90분',
    accent: 'from-indigo-500/20 via-violet-500/5',
    border: 'hover:border-indigo-500/30',
  },
];

const faqs = [
  {
    question: '처음 방문하는데 어떻게 준비하면 되나요?',
    answer: '본인의 생년월일과 태어난 시간(정확할수록 좋습니다)을 알고 오시면 됩니다. 음력/양력 구분도 확인해 주세요. 궁합의 경우 상대방의 생년월일시도 함께 준비해 주세요.',
  },
  {
    question: '태어난 시간을 모르면 상담이 안 되나요?',
    answer: '태어난 시간을 모르셔도 상담 가능합니다. 다만, 시간을 알면 더 정확한 풀이가 가능하므로 가능하다면 확인해 오시는 것을 추천드립니다.',
  },
  {
    question: '전화/영상 상담도 가능한가요?',
    answer: '네, 방문이 어려우신 분들을 위해 전화상담과 영상상담도 진행하고 있습니다. 예약 시 상담 방식을 선택해 주세요.',
  },
  {
    question: '상담 시간은 어느 정도 걸리나요?',
    answer: '상담 유형에 따라 다르지만, 보통 40분에서 90분 정도 소요됩니다. 시간에 쫓기지 않고 충분히 상담 받으실 수 있습니다.',
  },
];

export default function ServicesClient() {
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
      <section ref={heroRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-end">
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <Image
            src="/images/altar.jpg"
            alt="신당 제단"
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
              Services
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
              전문 상담
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
              서비스 안내
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-gray-400 text-base md:text-lg max-w-lg mt-6"
          >
            사주 · 궁합 · 신점 · 택일 · 기업상담
            <br />
            다양한 고민에 맞는 맞춤 상담을 제공합니다
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent origin-left"
        />
      </section>

      {/* ─── Services List ─── */}
      <section className="py-28 md:py-40 bg-dark-900 relative noise overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={`group relative rounded-2xl border border-dark-600/50 ${service.border} transition-all duration-500 overflow-hidden`}
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative z-10 p-8 md:p-10 lg:p-12">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    {/* Left: main info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
                          {service.icon}
                        </div>
                        <div className="flex items-center gap-3">
                          <h2
                            className="text-2xl md:text-3xl font-bold text-white"
                            style={{ fontFamily: 'var(--font-serif)' }}
                          >
                            {service.title}
                          </h2>
                          <div className="hidden md:flex items-center gap-2 text-gray-600 text-sm">
                            <Clock size={14} />
                            <span>{service.duration}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {service.details.map((detail) => (
                          <span
                            key={detail}
                            className="px-4 py-1.5 rounded-full text-sm text-gray-400 bg-dark-700/60 border border-dark-500/50 group-hover:border-gold/15 transition-colors"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>

                      <div className="md:hidden flex items-center gap-2 text-gray-600 text-sm mt-4">
                        <Clock size={14} />
                        <span>{service.duration}</span>
                      </div>
                    </div>

                    {/* Right: CTA */}
                    <div className="flex-shrink-0 flex items-center lg:pt-3">
                      <a
                        href="/reservation"
                        className="inline-flex items-center gap-2 text-gold/70 group-hover:text-gold transition-colors text-sm font-medium"
                      >
                        <span>예약하기</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Index number */}
                <div className="absolute top-8 right-8 md:top-10 md:right-12">
                  <span
                    className="text-4xl md:text-5xl font-black text-dark-700/50 group-hover:text-gold/10 transition-colors"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process ─── */}
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
            <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-medium">Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white leading-tight mb-16"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            상담 진행 과정
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '01', title: '예약', desc: '온라인 또는 전화로 원하시는 상담과 일시를 예약합니다.' },
              { step: '02', title: '준비', desc: '생년월일시(음/양력)를 확인하고 궁금한 점을 정리해 주세요.' },
              { step: '03', title: '상담', desc: '편안한 분위기에서 깊이 있는 1:1 맞춤 상담이 진행됩니다.' },
              { step: '04', title: '안내', desc: '상담 결과를 바탕으로 실질적인 방향을 안내해 드립니다.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass hover:glass-gold rounded-2xl p-8 transition-all duration-500 relative overflow-hidden"
              >
                <span
                  className="text-5xl font-black text-dark-600 group-hover:text-gold/15 transition-colors block mb-6"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {item.step}
                </span>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>

                {/* Connector line (desktop) */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-gold/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-28 md:py-40 bg-dark-900 relative noise overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left title */}
            <div className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-12 h-px bg-gold/50" />
                <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-medium">FAQ</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black text-white leading-tight"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                자주 묻는
                <br />
                <span className="text-gold">질문</span>
              </motion.h2>
            </div>

            {/* Right FAQ list */}
            <div className="lg:col-span-3 space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <details className="group glass rounded-xl hover:glass-gold transition-all duration-300">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="font-medium text-gray-200 pr-4 text-base">{faq.question}</span>
                      <ChevronDown size={18} className="text-gold/50 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-6 pb-6 text-gray-500 leading-relaxed text-base">
                      {faq.answer}
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/performance.jpg"
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
            상담이
            <br />
            <span className="text-shimmer">필요하신가요?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mb-10"
          >
            편하게 예약하시고, 마음의 짐을 덜어보세요.
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
