import React, { useState } from 'react';
import {
  validateActivationCode,
  TEACHER_WHATSAPP_NUMBER,
  getRequestCodeWhatsAppUrl,
  TEACHER_ADMIN_PIN,
} from '../utils/crypto';
import {
  Lock,
  Sparkles,
  KeyRound,
  User,
  ArrowRight,
  MessageCircle,
  Shield,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  GraduationCap,
} from 'lucide-react';

interface LockScreenProps {
  onActivateSuccess: (studentName: string, code: string) => void;
  onOpenTeacherDashboard: () => void;
  prefillName?: string;
  prefillCode?: string;
}

export const LockScreen: React.FC<LockScreenProps> = ({
  onActivateSuccess,
  onOpenTeacherDashboard,
  prefillName = '',
  prefillCode = '',
}) => {
  const [studentName, setStudentName] = useState(prefillName);
  const [activationCode, setActivationCode] = useState(prefillCode);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Admin PIN prompt state
  const [showPinModal, setShowPinModal] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanName = studentName.trim();
    const cleanCode = activationCode.trim();

    if (!cleanName) {
      setErrorMessage('يرجى إدخال اسم الطالب الكامل.');
      return;
    }

    if (!cleanCode) {
      setErrorMessage('يرجى إدخال كود التفعيل السري الخاص بك.');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      const isValid = validateActivationCode(cleanName, cleanCode);
      setIsVerifying(false);

      if (isValid) {
        setSuccessMessage('تم التحقق الرياضي بنجاح! جاري فتح المنهاج لمدة 6 أشهر (180 يوماً)...');
        setTimeout(() => {
          onActivateSuccess(cleanName, cleanCode);
        }, 600);
      } else {
        setErrorMessage(
          'كود التفعيل غير مطابق للاسم المدخل. الكود مرمز رياضياً باسمك حصراً. تأكد من كتابة الاسم كما أرسلته المعلمة جيداء صقر، أو تواصل معها عبر الواتساب للحصول على كودك الجديد.'
        );
      }
    }, 350);
  };

  const handleAdminPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');

    if (adminPinInput.trim() === TEACHER_ADMIN_PIN) {
      setShowPinModal(false);
      setAdminPinInput('');
      onOpenTeacherDashboard();
    } else {
      setPinError('رمز الدخول السري غير صحيح. هذه البوابة مخصصة للمعلمة جيداء صقر فقط.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-['Cairo',sans-serif]">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-600/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Top Bar with Teacher Portal Trigger */}
      <nav className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <span className="font-extrabold tracking-wider text-sm sm:text-base text-white">
            MORE ENGLISH MORE LOVE
          </span>
        </div>

        {/* Teacher Portal Button with Lock */}
        <button
          onClick={() => {
            setAdminPinInput('');
            setPinError('');
            setShowPinModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-indigo-950 border border-indigo-700/40 text-indigo-300 text-xs font-semibold transition-all hover:border-indigo-500 shadow-sm"
        >
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>بوابة المعلمة</span>
        </button>
      </nav>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-lg">
          
          {/* Card Frame */}
          <div className="bg-slate-900/90 border border-indigo-800/50 rounded-3xl p-6 sm:p-9 shadow-2xl backdrop-blur-xl relative">
            
            {/* Top Badge */}
            <div className="text-center space-y-2 mb-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-1 shadow-inner">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>المنصة التعليمية التفاعلية الحصرية</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-blue-200 tracking-tight">
                MORE ENGLISH MORE LOVE
              </h1>
              
              <div className="inline-block bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent font-bold text-sm sm:text-base">
                بإشراف وتدريس المعلمة جيداء صقر
              </div>

              <p className="text-xs text-slate-400 max-w-md mx-auto pt-1 leading-relaxed">
                المنهاج التفاعلي الكامل وأوراق العمل والحلول النموذجية المعتمدة (الوحدة الأولى - الصف التاسع / 3ème)
              </p>
            </div>

            {/* Lock Notice */}
            <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-3.5 mb-6 flex items-center gap-3 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div className="leading-snug">
                <span className="font-bold text-white block">محتوى تعليمي محمي ومشفر:</span>
                ادخل اسمك وكود التفعيل الخاص بك للدخول إلى المنهاج وفتح كافة الأقسام لمدة 6 أشهر كاملة.
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs font-medium flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Activation Form */}
            <form onSubmit={handleActivate} className="space-y-4">
              
              {/* Student Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  اسم الطالب الكامل :
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="اكتب اسمك الكامل (مثال: أحمد محمد)"
                    value={studentName}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      setErrorMessage('');
                    }}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pr-10 pl-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Secret Activation Code */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    كود التفعيل السري :
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    MEML-XXXX-XXXX
                  </span>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="MEML-XXXX-XXXX"
                    value={activationCode}
                    onChange={(e) => {
                      setActivationCode(e.target.value);
                      setErrorMessage('');
                    }}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pr-10 pl-4 py-3 text-sm text-amber-300 font-mono tracking-wider placeholder-slate-600 uppercase focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full mt-2 py-3.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>جاري التحقق الرياضي المشفر...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>تفعيل الحساب والدخول للمنهاج</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Helper */}
            <div className="mt-4 text-center">
              <span className="text-[11px] text-slate-400">
                🔒 الحساب يُقفل تلقائياً على هذا الجهاز ويبقى مفتوحاً لمدة 180 يوماً.
              </span>
            </div>

          </div>

          {/* Section: How to get code? WhatsApp Contact */}
          <div className="mt-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-400">
              <HelpCircle className="w-4 h-4" />
              <span>كيف أحصل على كود تفعيل؟</span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              تواصل مباشرة مع المعلمة <span className="font-bold text-white">جيداء صقر</span> عبر تطبيق واتساب للحصول على كود التفعيل المخصص لاسمك فوراً:
            </p>

            <a
              href={getRequestCodeWhatsAppUrl(studentName)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/20 hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>طلب كود التفعيل عبر واتساب (+963933036079)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-4 py-4 text-center text-slate-400 text-xs z-10 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-900">
        <div>
          تطبيق <span className="font-semibold text-slate-300">MORE ENGLISH MORE LOVE</span> © جميع الحقوق محفوظة للمعلمة <span className="font-semibold text-indigo-400">جيداء صقر</span>
        </div>
        <div className="text-[11px] text-slate-400">
          هندسة تحقق ذكية ومستقلة 100% • Netlify Ready • تشفير رياضي محلي
        </div>
      </footer>

      {/* Admin PIN Dialog Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-700/60 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold">
                <Lock className="w-5 h-5 text-amber-400" />
                <span>دخول بوابة المعلمة</span>
              </div>
              <button
                onClick={() => setShowPinModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                إلغاء
              </button>
            </div>

            <p className="text-xs text-slate-300">
              هذه البوابة مخصصة حصراً للمعلمة <span className="text-amber-300 font-bold">جيداء صقر</span> لإصدار أكواد التفعيل للطلاب. يرجى إدخال الرمز السري الدائم (Admin PIN):
            </p>

            {pinError && (
              <div className="p-2.5 rounded-lg bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-semibold">
                {pinError}
              </div>
            )}

            <form onSubmit={handleAdminPinSubmit} className="space-y-3">
              <div>
                <input
                  type="password"
                  autoFocus
                  required
                  placeholder="أدخلي الرمز السري (Admin PIN)"
                  value={adminPinInput}
                  onChange={(e) => setAdminPinInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all"
                >
                  تأكيد ودخول اللوحة
                </button>
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  رجوع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
