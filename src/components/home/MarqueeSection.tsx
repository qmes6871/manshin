'use client';

import { motion } from 'framer-motion';

const words = ['사주', '궁합', '신점', '택일', '운세', '재물', '건강', '사업', '연애'];

export default function MarqueeSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-6 md:py-8 bg-dark-900 border-y border-dark-700/50 overflow-hidden"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <span key={i} className="flex items-center mx-6 md:mx-10">
            <span className="text-xl md:text-2xl font-light tracking-widest text-gray-600 uppercase">
              {word}
            </span>
            <span className="ml-6 md:ml-10 w-1.5 h-1.5 rounded-full bg-gold/30" />
          </span>
        ))}
      </div>
    </motion.section>
  );
}
