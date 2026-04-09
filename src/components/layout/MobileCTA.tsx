'use client';

import { Phone, CalendarCheck } from 'lucide-react';
import Link from 'next/link';

export default function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-dark-900/95 backdrop-blur-md border-t border-gold/10 safe-area-bottom">
      <div className="grid grid-cols-2 divide-x divide-dark-600/50">
        <a
          href="sms:010-8114-8069"
          className="flex items-center justify-center gap-2 py-4 text-gray-300 hover:bg-dark-800 transition-colors"
        >
          <Phone size={18} />
          <span className="font-medium text-sm">문자상담</span>
        </a>
        <Link
          href="/reservation"
          className="flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-gold to-amber-600 text-dark-900 font-semibold transition-colors"
        >
          <CalendarCheck size={18} />
          <span className="font-medium text-sm">예약하기</span>
        </Link>
      </div>
    </div>
  );
}
