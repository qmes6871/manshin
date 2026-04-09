'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, Sparkles } from 'lucide-react';

const serviceTypes = ['사주상담', '궁합', '신점', '택일', '기업·사업 상담', '기타'];
const birthTimes = [
  '모름',
  '자시 (23:00-01:00)',
  '축시 (01:00-03:00)',
  '인시 (03:00-05:00)',
  '묘시 (05:00-07:00)',
  '진시 (07:00-09:00)',
  '사시 (09:00-11:00)',
  '오시 (11:00-13:00)',
  '미시 (13:00-15:00)',
  '신시 (15:00-17:00)',
  '유시 (17:00-19:00)',
  '술시 (19:00-21:00)',
  '해시 (21:00-23:00)',
];
const timeSlots = ['오전 (09:00-12:00)', '오후 (12:00-18:00)', '저녁 (18:00-21:00)'];

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600/60 text-white placeholder-gray-600 focus:border-gold/50 focus:ring-1 focus:ring-gold/20 outline-none transition-all text-sm';

const selectClass =
  'w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600/60 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20 outline-none transition-all text-sm appearance-none';

const labelClass = 'block text-base font-medium text-gray-300 mb-2';

export default function ReservationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serviceType, setServiceType] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const isGunghap = serviceType === '궁합';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h3
          className="text-3xl font-black text-white mb-4"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          예약이 접수되었습니다
        </h3>
        <p className="text-gray-400 mb-2">빠른 시일 내에 연락드리겠습니다.</p>
        <p className="text-gray-600 text-sm mb-8">영업일 기준 1일 이내 확인 전화를 드립니다.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-gold hover:text-gold/80 font-medium transition-colors cursor-pointer"
        >
          새 예약하기
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* ─── 기본 정보 ─── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-2xl font-black text-dark-600"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            01
          </span>
          <h3 className="text-lg font-bold text-white">기본 정보</h3>
          <div className="flex-1 h-px bg-dark-700/80" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>이름 *</label>
            <input name="name" type="text" required placeholder="홍길동" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>연락처 *</label>
            <input name="phone" type="tel" required placeholder="010-0000-0000" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>성별 *</label>
            <select name="gender" required className={selectClass}>
              <option value="">선택해주세요</option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </select>
          </div>
        </div>
      </div>

      {/* ─── 생년월일 ─── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-2xl font-black text-dark-600"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            02
          </span>
          <h3 className="text-lg font-bold text-white">생년월일 정보</h3>
          <div className="flex-1 h-px bg-dark-700/80" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>생년월일 *</label>
            <input name="birthDate" type="date" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>태어난 시간</label>
            <select name="birthTime" className={selectClass}>
              {birthTimes.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>음력/양력 *</label>
            <div className="flex gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="calendarType"
                  value="양력"
                  defaultChecked
                  className="accent-gold"
                />
                <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">양력</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="calendarType"
                  value="음력"
                  className="accent-gold"
                />
                <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">음력</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 상담 정보 ─── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-2xl font-black text-dark-600"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            03
          </span>
          <h3 className="text-lg font-bold text-white">상담 정보</h3>
          <div className="flex-1 h-px bg-dark-700/80" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>상담 유형 *</label>
            <select
              name="serviceType"
              required
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className={selectClass}
            >
              <option value="">선택해주세요</option>
              {serviceTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>상담 방식 *</label>
            <select name="consultMethod" required className={selectClass}>
              <option value="">선택해주세요</option>
              <option value="방문상담">방문상담</option>
              <option value="전화상담">전화상담</option>
              <option value="영상상담">영상상담</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>희망 상담일 *</label>
            <input
              name="preferredDate"
              type="date"
              required
              min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>희망 시간대 *</label>
            <select name="preferredTime" required className={selectClass}>
              <option value="">선택해주세요</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ─── 궁합 - 상대방 정보 ─── */}
      {isGunghap && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-gold rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={18} className="text-gold" />
            <h3 className="text-lg font-bold text-white">상대방 정보 (궁합)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>상대방 생년월일 *</label>
              <input
                name="partnerBirthDate"
                type="date"
                required={isGunghap}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>상대방 태어난 시간</label>
              <select name="partnerBirthTime" className={selectClass}>
                {birthTimes.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>상대방 음력/양력 *</label>
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="partnerCalendarType" value="양력" defaultChecked className="accent-gold" />
                  <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">양력</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="partnerCalendarType" value="음력" className="accent-gold" />
                  <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">음력</span>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 메시지 ─── */}
      <div>
        <label className={labelClass}>문의사항</label>
        <textarea
          name="message"
          rows={4}
          placeholder="궁금한 점이나 상담 시 참고할 내용을 적어주세요"
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* ─── 개인정보 동의 ─── */}
      <div className="glass rounded-xl p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={privacyAgreed}
            onChange={(e) => setPrivacyAgreed(e.target.checked)}
            className="mt-1 accent-gold"
          />
          <div>
            <span className="text-sm font-medium text-gray-300">개인정보 수집 및 이용 동의 *</span>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              상담 예약 및 연락을 위해 이름, 연락처, 생년월일 정보를 수집합니다.
              수집된 정보는 상담 목적으로만 사용되며, 상담 완료 후 3개월 이내에 파기됩니다.
            </p>
          </div>
        </label>
      </div>

      {/* ─── Submit ─── */}
      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-3 rounded-xl text-base">
          예약 접수 중 오류가 발생했습니다. 다시 시도해 주세요.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !privacyAgreed}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gold via-amber-500 to-gold text-dark-900 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-gold/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            접수 중...
          </>
        ) : (
          <>
            <Send size={20} />
            예약 접수하기
          </>
        )}
      </button>
    </form>
  );
}
