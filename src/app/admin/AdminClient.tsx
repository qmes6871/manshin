'use client';

import { useState, useEffect, useCallback } from 'react';
import { Lock, LogOut, CalendarCheck, BarChart3, Trash2, Eye, Clock, Phone, User, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

interface Reservation {
  id: string;
  name: string;
  phone: string;
  gender: string;
  birthDate: string;
  birthTime: string;
  calendarType: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  consultMethod: string;
  message: string;
  partnerBirthDate?: string;
  partnerBirthTime?: string;
  partnerCalendarType?: string;
  createdAt: string;
}

interface VisitorStats {
  today: number;
  yesterday: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
  dailyData: { date: string; count: number }[];
  pageData: { page: string; count: number }[];
}

// ─── Login Screen ───
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      onLogin();
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-gold" />
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
            관리자 로그인
          </h1>
          <p className="text-gray-500 text-sm mt-2">김미애만신 관리 페이지</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-600 focus:outline-none focus:border-gold/50 transition-colors"
              autoFocus
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-gold to-amber-600 text-dark-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? '확인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Stat Card ───
function StatCard({ label, value, icon, accent }: { label: string; value: number; icon: React.ReactNode; accent: string }) {
  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
        <div className={`w-8 h-8 rounded-lg ${accent} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value.toLocaleString()}</p>
    </div>
  );
}

// ─── Dashboard ───
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<'reservations' | 'stats'>('reservations');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [resRes, statsRes] = await Promise.all([
        fetch('/api/admin/reservations'),
        fetch('/api/admin/stats'),
      ]);
      if (resRes.ok) setReservations(await resRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const deleteReservation = async (id: string) => {
    if (!confirm('이 예약을 삭제하시겠습니까?')) return;
    const res = await fetch(`/api/admin/reservations?id=${id}`, { method: 'DELETE' });
    if (res.ok) setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const serviceColor: Record<string, string> = {
    '사주상담': 'bg-violet-500/20 text-violet-300',
    '궁합': 'bg-rose-500/20 text-rose-300',
    '신점': 'bg-amber-500/20 text-amber-300',
    '택일': 'bg-sky-500/20 text-sky-300',
    '기업·사업 상담': 'bg-indigo-500/20 text-indigo-300',
    '기타': 'bg-gray-500/20 text-gray-300',
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-dark-600/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-white">
              <span className="text-gold">김미애만신</span> 관리
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchData} className="p-2 rounded-lg text-gray-400 hover:text-gold hover:bg-dark-800 transition-colors" title="새로고침">
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-dark-800 transition-colors text-sm">
              <LogOut size={16} />
              <span className="hidden md:inline">로그아웃</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <div className="flex gap-1 bg-dark-800 rounded-xl p-1 w-fit">
          <button
            onClick={() => setTab('reservations')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === 'reservations' ? 'bg-gold/15 text-gold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <CalendarCheck size={16} />
            예약 관리
            {reservations.length > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-gold/20 text-gold">{reservations.length}</span>
            )}
          </button>
          <button
            onClick={() => setTab('stats')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === 'stats' ? 'bg-gold/15 text-gold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <BarChart3 size={16} />
            방문 통계
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw size={24} className="animate-spin text-gold/50" />
          </div>
        ) : tab === 'reservations' ? (
          /* ─── Reservations Tab ─── */
          <div>
            {reservations.length === 0 ? (
              <div className="text-center py-20">
                <CalendarCheck size={48} className="mx-auto text-dark-600 mb-4" />
                <p className="text-gray-500">접수된 예약이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reservations.map((r) => {
                  const expanded = expandedId === r.id;
                  return (
                    <div key={r.id} className="glass rounded-xl overflow-hidden">
                      {/* Summary row */}
                      <div
                        className="flex items-center gap-3 md:gap-4 p-4 md:p-5 cursor-pointer hover:bg-dark-700/30 transition-colors"
                        onClick={() => setExpandedId(expanded ? null : r.id)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${serviceColor[r.serviceType] || 'bg-gray-500/20 text-gray-300'}`}>
                              {r.serviceType}
                            </span>
                            <span className="text-xs text-gray-600">{r.consultMethod}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-white text-sm">{r.name}</span>
                            <span className="text-gray-500 text-xs">{r.phone}</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 hidden md:block">
                          <p className="text-sm text-gray-300">{r.preferredDate} {r.preferredTime}</p>
                          <p className="text-xs text-gray-600">{formatDate(r.createdAt)} 접수</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteReservation(r.id); }}
                            className="p-2 rounded-lg text-gray-600 hover:text-red-400 hover:bg-dark-700 transition-colors"
                            title="삭제"
                          >
                            <Trash2 size={16} />
                          </button>
                          {expanded ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                        </div>
                      </div>

                      {/* Detail */}
                      {expanded && (
                        <div className="px-4 md:px-5 pb-5 pt-1 border-t border-dark-600/50">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-3">
                            <div>
                              <p className="text-gray-600 text-xs mb-1">성별</p>
                              <p className="text-gray-300">{r.gender}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-xs mb-1">생년월일</p>
                              <p className="text-gray-300">{r.birthDate} ({r.calendarType})</p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-xs mb-1">태어난 시간</p>
                              <p className="text-gray-300">{r.birthTime || '모름'}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-xs mb-1">희망 일시</p>
                              <p className="text-gray-300">{r.preferredDate} {r.preferredTime}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-xs mb-1">상담 방식</p>
                              <p className="text-gray-300">{r.consultMethod}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-xs mb-1">접수 일시</p>
                              <p className="text-gray-300">{formatDate(r.createdAt)}</p>
                            </div>
                            {r.partnerBirthDate && (
                              <div className="col-span-2 md:col-span-3">
                                <p className="text-gray-600 text-xs mb-1">상대방 정보</p>
                                <p className="text-gray-300">
                                  {r.partnerBirthDate} ({r.partnerCalendarType}) {r.partnerBirthTime && `/ ${r.partnerBirthTime}`}
                                </p>
                              </div>
                            )}
                            {r.message && (
                              <div className="col-span-2 md:col-span-3">
                                <p className="text-gray-600 text-xs mb-1">문의 내용</p>
                                <p className="text-gray-300 whitespace-pre-wrap">{r.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* ─── Stats Tab ─── */
          <div>
            {!stats ? (
              <div className="text-center py-20">
                <BarChart3 size={48} className="mx-auto text-dark-600 mb-4" />
                <p className="text-gray-500">통계 데이터를 불러올 수 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Summary cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <StatCard label="오늘" value={stats.today} icon={<Eye size={16} className="text-gold" />} accent="bg-gold/10" />
                  <StatCard label="어제" value={stats.yesterday} icon={<Clock size={16} className="text-blue-400" />} accent="bg-blue-500/10" />
                  <StatCard label="이번 주" value={stats.thisWeek} icon={<BarChart3 size={16} className="text-emerald-400" />} accent="bg-emerald-500/10" />
                  <StatCard label="이번 달" value={stats.thisMonth} icon={<BarChart3 size={16} className="text-violet-400" />} accent="bg-violet-500/10" />
                  <StatCard label="전체" value={stats.total} icon={<User size={16} className="text-amber-400" />} accent="bg-amber-500/10" />
                </div>

                {/* Daily chart */}
                <div className="glass rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white mb-4">최근 14일 방문 추이</h3>
                  {stats.dailyData.length === 0 ? (
                    <p className="text-gray-600 text-sm py-8 text-center">아직 방문 데이터가 없습니다.</p>
                  ) : (
                    <div className="space-y-2">
                      {stats.dailyData.map((d) => {
                        const max = Math.max(...stats.dailyData.map((x) => x.count), 1);
                        const pct = (d.count / max) * 100;
                        return (
                          <div key={d.date} className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 w-20 flex-shrink-0">{d.date.slice(5)}</span>
                            <div className="flex-1 h-6 bg-dark-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-gold/60 to-amber-500/40 rounded-full transition-all"
                                style={{ width: `${Math.max(pct, 2)}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400 w-10 text-right">{d.count}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Page stats */}
                <div className="glass rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white mb-4">페이지별 방문</h3>
                  {stats.pageData.length === 0 ? (
                    <p className="text-gray-600 text-sm py-8 text-center">아직 방문 데이터가 없습니다.</p>
                  ) : (
                    <div className="space-y-2">
                      {stats.pageData.map((p) => {
                        const max = Math.max(...stats.pageData.map((x) => x.count), 1);
                        const pct = (p.count / max) * 100;
                        const pageNames: Record<string, string> = {
                          '/': '홈',
                          '/about': '소개',
                          '/services': '서비스',
                          '/reservation': '예약',
                          '/contact': '오시는길',
                        };
                        return (
                          <div key={p.page} className="flex items-center gap-3">
                            <span className="text-xs text-gray-400 w-20 flex-shrink-0">{pageNames[p.page] || p.page}</span>
                            <div className="flex-1 h-6 bg-dark-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-violet-500/50 to-purple-500/30 rounded-full transition-all"
                                style={{ width: `${Math.max(pct, 2)}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400 w-10 text-right">{p.count}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main ───
export default function AdminClient() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch('/api/admin/auth')
      .then((res) => { if (res.ok) setAuthed(true); })
      .finally(() => setChecking(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setAuthed(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <RefreshCw size={24} className="animate-spin text-gold/50" />
      </div>
    );
  }

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={handleLogout} />;
}
