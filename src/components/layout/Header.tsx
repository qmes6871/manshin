'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

const navItems = [
  { label: '소개', href: '/about' },
  { label: '서비스', href: '/services' },
  { label: '상담예약', href: '/reservation' },
  { label: '오시는길', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-gold/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <span className="text-gold">김미애</span>
          <span className="text-white">만신</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-400 hover:text-gold transition-colors font-medium text-sm tracking-wide"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="sms:010-8114-8069"
            className="flex items-center gap-2 bg-gold/10 text-gold border border-gold/30 px-5 py-2 rounded-full hover:bg-gold/20 transition-all duration-300"
          >
            <Phone size={16} />
            <span className="text-sm font-medium">상담문의</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-3 -mr-2"
          aria-label="메뉴"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-800/98 backdrop-blur-lg border-t border-gold/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-gold transition-colors font-medium py-2"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="sms:010-8114-8069"
              className="flex items-center justify-center gap-2 bg-gold/10 text-gold border border-gold/30 px-5 py-3 rounded-full hover:bg-gold/20 transition-all mt-2"
            >
              <Phone size={16} />
              <span>상담문의</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
