'use client';

import { motion } from 'framer-motion';

const reasons = [
  '일이 풀리지 않고 계속 막히는 느낌이 드는 분',
  '미래에 대한 방향이 불안한 분',
  '중요한 선택을 앞두고 있는 분',
  '인간관계나 연애 문제로 고민하는 분',
  '사업, 금전 흐름이 궁금한 분',
];

export default function RecommendSection() {
  return (
    <section className="py-28 md:py-40 bg-dark-800 relative noise overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Title */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-gold/50" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-medium">For You</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-black text-white leading-tight mb-6"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              이런 분들께
              <br />
              <span className="text-gold">추천드립니다</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 leading-relaxed"
            >
              혼자 끌어안고 계신 고민, 함께 나누면 길이 보입니다.
            </motion.p>
          </div>

          {/* Right — List */}
          <div className="space-y-4">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex items-center gap-6 p-6 rounded-2xl glass hover:glass-gold transition-all duration-500 cursor-default"
              >
                <span
                  className="flex-shrink-0 text-2xl font-black text-gold/20 group-hover:text-gold/50 transition-colors"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-gray-300 text-lg group-hover:text-white transition-colors">
                  {reason}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
