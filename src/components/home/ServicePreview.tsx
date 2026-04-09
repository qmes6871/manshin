'use client';

import { motion } from 'framer-motion';
import { Star, Heart, Compass } from 'lucide-react';
import Button from '@/components/ui/Button';

const services = [
  {
    icon: <Star size={24} />,
    title: '사주상담',
    desc: '타고난 사주팔자를 기반으로 인생의 흐름과 시기를 분석합니다.',
    detail: '진로 · 재물 · 인간관계',
    accent: 'from-violet-500/20 via-purple-500/10',
    border: 'hover:border-violet-500/30',
    span: 'md:col-span-2 md:row-span-2',
    big: true,
  },
  {
    icon: <Heart size={24} />,
    title: '궁합',
    desc: '두 사람의 사주를 비교하여 관계의 방향을 알려드립니다.',
    detail: '연애 · 결혼 · 사업 파트너',
    accent: 'from-rose-500/20 via-pink-500/10',
    border: 'hover:border-rose-500/30',
    span: 'md:col-span-1',
    big: false,
  },
  {
    icon: <Compass size={24} />,
    title: '신점',
    desc: '영적 통찰로 현재와 미래의 흐름을 구체적으로 짚어드립니다.',
    detail: '현재 상황 · 미래 방향 · 해답',
    accent: 'from-amber-500/20 via-orange-500/10',
    border: 'hover:border-amber-500/30',
    span: 'md:col-span-1',
    big: false,
  },
];

export default function ServicePreview() {
  return (
    <section className="py-28 md:py-40 bg-dark-800 relative noise overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-px bg-gold/50" />
          <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-medium">Services</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-black text-white leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            어떤 고민이든
            <br />
            <span className="text-gold">정확히 짚어드립니다</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button href="/services" variant="outline">
              전체 서비스 보기
            </Button>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${service.span} group relative rounded-2xl border border-dark-600/50 ${service.border} transition-all duration-500 overflow-hidden`}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              <div className={`relative z-10 p-8 ${service.big ? 'md:p-12' : ''} h-full flex flex-col`}>
                <div className="flex items-center gap-3 mb-auto">
                  <div className="text-gold">{service.icon}</div>
                  <span className="text-xs tracking-wider text-gray-500 uppercase">{service.detail}</span>
                </div>

                <div className={`${service.big ? 'mt-16 md:mt-24' : 'mt-10'}`}>
                  <h3 className={`${service.big ? 'text-3xl md:text-4xl' : 'text-2xl'} font-bold text-white mb-3`}
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{service.desc}</p>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
