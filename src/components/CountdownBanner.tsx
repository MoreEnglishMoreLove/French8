import React, { useEffect, useState } from 'react';
import { StudentSession } from '../types';
import { formatRemainingTime, TEACHER_WHATSAPP_NUMBER, getRequestCodeWhatsAppUrl } from '../utils/crypto';
import { Clock, ShieldCheck, UserCheck, MessageCircle, LogOut, Sparkles, AlertTriangle } from 'lucide-react';

interface CountdownBannerProps {
  session: StudentSession;
  onLogout: () => void;
  onOpenTeacherPortal: () => void;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({
  session,
  onLogout,
  onOpenTeacherPortal,
}) => {
  const [timeState, setTimeState] = useState(() => formatRemainingTime(session.expiresAt));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeState(formatRemainingTime(session.expiresAt));
    }, 1000);
    return () => clearInterval(timer);
  }, [session.expiresAt]);

  return (
    <header className="bg-slate-900/95 border-b border-indigo-900/60 backdrop-blur-md sticky top-0 z-40 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Brand & Student Info */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/30">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-sm sm:text-base tracking-wide text-white">
                    MORE ENGLISH MORE LOVE
                  </h1>
                  <span className="hidden sm:inline-flex items-center text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    إشراف: المعلمة جيداء صقر
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
                    <UserCheck className="w-3.5 h-3.5" />
                    {session.studentName}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {session.activationCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile quick actions */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={onOpenTeacherPortal}
                className="text-[11px] px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
                title="بوابة المعلمة"
              >
                المعلمة
              </button>
              <button
                onClick={onLogout}
                className="text-xs p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Countdown & Device Protection */}
          <div className="flex items-center flex-wrap justify-center gap-3 w-full md:w-auto">
            {timeState.isExpired ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-xs font-bold">
                <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                <span>انتهت صلاحية الـ 6 أشهر - يرجى تجديد الكود</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-indigo-800/40 shadow-inner">
                <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                <div className="text-xs flex items-center gap-1.5">
                  <span className="text-slate-400">متبقي من الصلاحية (180 يوماً):</span>
                  <span className="font-bold text-amber-300 font-mono">
                    {timeState.days} يوم و {timeState.hours} س و {timeState.minutes} د و {timeState.seconds} ث
                  </span>
                </div>
              </div>
            )}

            <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>مفعل ومقفل على هذا الجهاز</span>
            </div>

            {/* Desktop Teacher Portal and WhatsApp Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href={getRequestCodeWhatsAppUrl(session.studentName)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-white transition-all shadow-sm"
                title={`تواصل مع المعلمة جيداء صقر عبر واتساب (${TEACHER_WHATSAPP_NUMBER})`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>واتساب المعلمة</span>
              </a>

              <button
                onClick={onOpenTeacherPortal}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-200 transition-all"
              >
                <span>بوابة المعلمة</span>
              </button>

              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-red-950/60 hover:text-red-300 border border-slate-700 hover:border-red-800/50 text-slate-300 transition-all"
                title="تسجيل الخروج أو إدخال كود جديد"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>خروج</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
