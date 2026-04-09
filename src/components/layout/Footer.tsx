import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-600/50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-gold">김미애</span>만신
            </h3>
            <p className="text-gray-500 leading-relaxed mb-3">
              국가무형문화재 서울새남굿 이수자
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              정확하고 따뜻한 상담으로<br />
              당신의 삶에 밝은 길을 밝혀드립니다.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">연락처</h4>
            <div className="flex flex-col gap-3">
              <a href="sms:010-8114-8069" className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors">
                <Phone size={18} />
                <span>010-8114-8069 (문자 추천)</span>
              </a>
              <a href="http://pf.kakao.com/_nMHVX/chat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors">
                <MessageCircle size={18} />
                <span>카카오채널 상담</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} />
                <span>경기도 파주시 동산6길 10-8</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold mb-4">상담시간</h4>
            <div className="flex items-start gap-3 text-gray-400">
              <Clock size={18} className="mt-0.5" />
              <div>
                <p>평일: 09:00 - 21:00</p>
                <p>주말: 10:00 - 18:00</p>
                <p className="text-gray-600 mt-1 text-sm">예약제로 운영됩니다</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-600/50 mt-12 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} 김미애만신. All rights reserved.</p>
          <p className="mt-1 text-gray-700">고유번호: 318-82-75688</p>
        </div>
      </div>
    </footer>
  );
}
