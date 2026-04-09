'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const photos = [
  { src: '/images/ritual-crown.jpg', alt: '전통 관복 공연' },
  { src: '/images/shrine.jpg', alt: '신당 제단' },
  { src: '/images/ritual-hat.jpg', alt: '굿 의식' },
  { src: '/images/altar.jpg', alt: '제단 전경' },
  { src: '/images/drum-ritual.jpg', alt: '장구 연주' },
  { src: '/images/entrance.jpg', alt: '국가무형문화재' },
  { src: '/images/ritual-yellow.jpg', alt: '황색 도포 의식' },
  { src: '/images/event.jpg', alt: '문화재 행사' },
];

export default function GallerySection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-15%']);

  return (
    <section ref={containerRef} className="py-28 md:py-40 bg-dark-900 relative overflow-hidden noise">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-px bg-gold/50" />
          <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-medium">Gallery</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-black text-white leading-tight"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          활동 기록
        </motion.h2>
      </div>

      {/* Horizontal scroll gallery */}
      <motion.div className="flex gap-4 md:gap-6 pl-6 md:pl-12" style={{ x }}>
        {photos.map((photo, index) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="relative flex-shrink-0 w-[260px] md:w-[360px] aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-dark-900/5 transition-all duration-500" />

            {/* Label on hover */}
            <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <div className="p-5 bg-gradient-to-t from-dark-900/90 to-transparent pt-12">
                <p className="text-white text-sm font-medium">{photo.alt}</p>
              </div>
            </div>

            {/* Index number */}
            <div className="absolute top-4 left-4">
              <span className="text-white/20 text-xs font-mono">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
