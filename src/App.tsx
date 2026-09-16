/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StudentSession } from './types';
import {
  getActiveStudentSession,
  activateStudentSession,
  clearStudentSession,
  isSessionExpired,
  TEACHER_WHATSAPP_NUMBER,
  getRequestCodeWhatsAppUrl,
} from './utils/crypto';
import { LockScreen } from './components/LockScreen';
import { CountdownBanner } from './components/CountdownBanner';
import { CurriculumViewer } from './components/CurriculumViewer';
import { TeacherDashboard } from './components/TeacherDashboard';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [session, setSession] = useState<StudentSession | null>(() => getActiveStudentSession());
  const [isTeacherDashboardOpen, setIsTeacherDashboardOpen] = useState(false);
  const [prefillName, setPrefillName] = useState('');
  const [prefillCode, setPrefillCode] = useState('');

  // Check expiration periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (session && isSessionExpired(session)) {
        clearStudentSession();
        setSession(null);
      }
    }, 60000); // check every minute

    return () => clearInterval(interval);
  }, [session]);

  const handleActivate = (studentName: string, code: string) => {
    const newSession = activateStudentSession(studentName, code);
    setSession(newSession);
  };

  const handleLogout = () => {
    if (window.confirm('هل أنت متأكد من تسجيل الخروج من حساب الطالب؟')) {
      clearStudentSession();
      setSession(null);
    }
  };

  const handleSelectStudentForLogin = (studentName: string, code: string) => {
    // Automatically activate from teacher portal test or prefill
    handleActivate(studentName, code);
    setIsTeacherDashboardOpen(false);
  };

  const isCurrentSessionValid = session && !isSessionExpired(session);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Cairo',sans-serif] selection:bg-indigo-500 selection:text-white relative">
      
      {/* If student has no session or expired, show Lock Screen */}
      {!isCurrentSessionValid ? (
        <LockScreen
          onActivateSuccess={handleActivate}
          onOpenTeacherDashboard={() => setIsTeacherDashboardOpen(true)}
          prefillName={prefillName}
          prefillCode={prefillCode}
        />
      ) : (
        /* If student has active session, show Countdown Banner & Full Curriculum */
        <div className="min-h-screen flex flex-col justify-between">
          <div>
            <CountdownBanner
              session={session}
              onLogout={handleLogout}
              onOpenTeacherPortal={() => setIsTeacherDashboardOpen(true)}
            />
            <main>
              <CurriculumViewer />
            </main>
          </div>

          {/* Footer */}
          <footer className="mt-12 border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                تطبيق <span className="text-slate-300 font-bold">MORE ENGLISH MORE LOVE</span> • إشراف المعلمة <span className="text-indigo-400 font-bold">جيداء صقر</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                <span>صلاحية الكود: 180 يوماً</span>
                <span>•</span>
                <span>تشفير رياضي داخلي (Client-Side)</span>
                <span>•</span>
                <button
                  onClick={() => setIsTeacherDashboardOpen(true)}
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  بوابة المعلمة
                </button>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Hidden/Modal Teacher Dashboard protected by PIN */}
      {isTeacherDashboardOpen && (
        <TeacherDashboard
          onClose={() => setIsTeacherDashboardOpen(false)}
          onSelectStudentForLogin={handleSelectStudentForLogin}
        />
      )}

      {/* Floating WhatsApp Quick Support Button */}
      <aside aria-label="Support">
        <a
          href={getRequestCodeWhatsAppUrl(session?.studentName || '')}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 left-5 z-40 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2.5 rounded-full shadow-2xl hover:scale-105 transition-all text-xs font-bold border border-emerald-400/40"
          title={`تواصل مباشرة مع المعلمة جيداء صقر عبر واتساب (${TEACHER_WHATSAPP_NUMBER})`}
        >
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <span className="hidden sm:inline">واتساب المعلمة: جيداء صقر</span>
        </a>
      </aside>

    </div>
  );
}

