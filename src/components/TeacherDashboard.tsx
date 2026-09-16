import React, { useState, useEffect } from 'react';
import {
  generateActivationCode,
  validateActivationCode,
  getTeacherGeneratedCodes,
  saveTeacherGeneratedCode,
  deleteTeacherCodeRecord,
  getSendCodeWhatsAppUrl,
  TEACHER_WHATSAPP_NUMBER,
  TEACHER_ADMIN_PIN,
} from '../utils/crypto';
import { GeneratedCodeRecord } from '../types';
import {
  Key,
  Copy,
  Check,
  Send,
  Trash2,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  RefreshCw,
  X,
  Lock,
} from 'lucide-react';

interface TeacherDashboardProps {
  onClose: () => void;
  onSelectStudentForLogin?: (studentName: string, code: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  onClose,
  onSelectStudentForLogin,
}) => {
  // Generator state
  const [studentInput, setStudentInput] = useState('');
  const [studentNotes, setStudentNotes] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  // History state
  const [records, setRecords] = useState<GeneratedCodeRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Sandbox Tester state
  const [testName, setTestName] = useState('');
  const [testCode, setTestCode] = useState('');
  const [testResult, setTestResult] = useState<boolean | null>(null);

  // Load records
  useEffect(() => {
    setRecords(getTeacherGeneratedCodes());
  }, []);

  // Live generate code as teacher types
  const handleNameChange = (val: string) => {
    setStudentInput(val);
    if (val.trim()) {
      const code = generateActivationCode(val.trim());
      setGeneratedCode(code);
    } else {
      setGeneratedCode('');
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  const handleSaveCode = () => {
    if (!studentInput.trim() || !generatedCode) return;
    const rec = saveTeacherGeneratedCode(studentInput.trim(), generatedCode, studentNotes.trim());
    setRecords(getTeacherGeneratedCodes());
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2500);
  };

  const handleDeleteRecord = (id: string) => {
    if (window.confirm('هل أنتِ متأكدة من حذف هذا السجل؟')) {
      deleteTeacherCodeRecord(id);
      setRecords(getTeacherGeneratedCodes());
    }
  };

  const handleTestCode = () => {
    if (!testName.trim() || !testCode.trim()) return;
    const isValid = validateActivationCode(testName.trim(), testCode.trim());
    setTestResult(isValid);
  };

  const filteredRecords = records.filter(r =>
    r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.notes && r.notes.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center">
      <div className="bg-slate-900 border border-indigo-700/50 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-5 border-b border-indigo-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">
                  بوابة المعلمة جيداء صقر
                </h2>
                <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  لوحة التحكم الإدارية
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                نظام توليد وتشفير الأكواد الحصري المستقل (Client-Side Verification Algorithm)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
            title="إغلاق اللوحة"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-200">
          
          {/* Quick Notice Banner */}
          <div className="bg-blue-950/40 border border-blue-800/40 rounded-xl p-4 flex items-start gap-3 text-xs">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-blue-200">
                خوارزمية رياضية مشفرة وثابتة في الكود (مجانية 100% وبدون خوادم خارجية):
              </div>
              <p className="text-slate-300 leading-relaxed">
                يتم ربط اسم الطالب بمعادلة تشفير داخلية ثابتة لإنتاج كود حصري بصيغة (MEML-XXXX-XXXX).
                عندما يكتب الطالب اسمه وكوده في هاتفه، يقوم التطبيق بمطابقتها محلياً ويفتح المنهاج لمدة 6 أشهر (180 يوماً).
              </p>
            </div>
          </div>

          {/* Section 1: Generate Code */}
          <div className="bg-slate-950/60 border border-indigo-900/60 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 rounded-full bg-indigo-600 text-white font-bold text-xs items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-base text-white">
                  توليد كود تفعيل فوري باسم الطالب
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                صيغة الكود: MEML-XXXX-XXXX
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  اسم الطالب الكامل (عربي أو إنجليزي) :
                </label>
                <input
                  type="text"
                  placeholder="مثال: أحمد محمد علي أو Sara Al-Ahmad"
                  value={studentInput}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  ملاحظات أو الصف (اختياري) :
                </label>
                <input
                  type="text"
                  placeholder="مثال: الصف التاسع - الشعبة أ"
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Generated Code Result Box */}
            {generatedCode && (
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-slate-900 to-indigo-950/80 border-2 border-indigo-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-indigo-300 font-medium block">
                    كود التفعيل الرياضي المشفر لـ ({studentInput.trim()}) :
                  </span>
                  <span className="text-2xl font-black tracking-widest text-amber-400 font-mono select-all">
                    {generatedCode}
                  </span>
                  <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                    ✓ صالح لمدة 6 أشهر (180 يوماً) من لحظة التفعيل الأولى
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleCopy(generatedCode)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCode ? 'تم النسخ!' : 'نسخ الكود'}</span>
                  </button>

                  <a
                    href={getSendCodeWhatsAppUrl(studentInput, generatedCode)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                    title="إرسال رسالة ترحيبية والكود للطالب عبر واتساب"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال عبر واتساب</span>
                  </a>

                  <button
                    onClick={handleSaveCode}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                  >
                    {justSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-amber-400" />}
                    <span>{justSaved ? 'تم الحفظ في السجل!' : 'حفظ بالسجل'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Code Verification Sandbox */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="flex h-6 w-6 rounded-full bg-slate-700 text-white font-bold text-xs items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-base text-white">
                مختبر فحص ومطابقة الأكواد (Code Verification Sandbox)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  اسم الطالب للتجربة:
                </label>
                <input
                  type="text"
                  placeholder="اسم الطالب"
                  value={testName}
                  onChange={(e) => {
                    setTestName(e.target.value);
                    setTestResult(null);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  كود التفعيل المراد فحصه:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MEML-XXXX-XXXX"
                    value={testCode}
                    onChange={(e) => {
                      setTestCode(e.target.value);
                      setTestResult(null);
                    }}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono uppercase focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleTestCode}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all"
                  >
                    فحص
                  </button>
                </div>
              </div>
            </div>

            {testResult !== null && (
              <div
                className={`p-3 rounded-lg text-xs font-bold flex items-center gap-2 ${
                  testResult
                    ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300'
                    : 'bg-red-950/60 border border-red-500/50 text-red-300'
                }`}
              >
                {testResult ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>الكود سليم ومطابق رياضياً 100% لاسم الطالب! سيتمكن الطالب من فتح المنهاج فوراً.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span>الكود غير متطابق مع هذا الاسم. يرجى التأكد من كتابة الاسم أو توليد كود جديد.</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Section 3: Generated Codes History */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 rounded-full bg-slate-700 text-white font-bold text-xs items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-base text-white">
                  سجل الأكواد المولدة للطلاب ({records.length})
                </h3>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                <input
                  type="text"
                  placeholder="بحث باسم الطالب أو الكود..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pr-9 pl-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {filteredRecords.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                {records.length === 0
                  ? 'لم يتم توليد وحفظ أكواد بعد. اكتبي اسم الطالب أعلاه واضغطي "حفظ بالسجل".'
                  : 'لا توجد نتائج مطابقة لبحثك.'}
              </div>
            ) : (
              <div className="divide-y divide-slate-800/80 max-h-60 overflow-y-auto">
                {filteredRecords.map((record) => (
                  <div
                    key={record.id}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-900/50 px-2 rounded-lg transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{record.studentName}</span>
                        {record.notes && (
                          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                            {record.notes}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="font-mono text-amber-300 font-semibold">{record.code}</span>
                        <span>•</span>
                        <span>{new Date(record.createdAt).toLocaleDateString('ar-EG')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopy(record.code)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                        title="نسخ الكود"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={getSendCodeWhatsAppUrl(record.studentName, record.code)}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-xs"
                        title="إرسال للطالب عبر واتساب"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </a>

                      {onSelectStudentForLogin && (
                        <button
                          onClick={() => onSelectStudentForLogin(record.studentName, record.code)}
                          className="px-2 py-1 rounded bg-indigo-700 hover:bg-indigo-600 text-white text-[11px] font-semibold"
                          title="تجربة الدخول بهذا الحساب في التطبيق"
                        >
                          تفعيل الحساب
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteRecord(record.id)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-300 text-xs"
                        title="حذف من السجل"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Security details */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>الرمز السري الإداري المحمي: <span className="font-mono text-indigo-300 font-bold">{TEACHER_ADMIN_PIN}</span></span>
            </div>
            <div className="text-slate-400">
              واتساب المعلمة: <span className="font-mono text-emerald-400 font-bold">{TEACHER_WHATSAPP_NUMBER}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-900 p-4 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
          >
            إغلاق لوحة التحكم
          </button>
        </div>

      </div>
    </div>
  );
};
