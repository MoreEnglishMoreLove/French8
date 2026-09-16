import React, { useState } from 'react';
import {
  CURRICULUM_SECTIONS,
  UNIT1_VOCABULARY,
  VERBE_DEVOIR,
  VERBE_METTRE,
  CLASSROOM_RULES,
  NEGATION_RULES,
} from '../data/curriculumData';
import { WorksheetRunner } from './WorksheetRunner';
import { speakFrench } from '../utils/speech';
import {
  Headphones,
  MessageSquareQuote,
  BookOpenCheck,
  ShieldAlert,
  PenTool,
  Sparkles,
  FileCheck2,
  Volume2,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Bookmark,
  Share2,
  Printer,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Info,
} from 'lucide-react';

interface CurriculumViewerProps {
  initialSectionId?: string;
}

export const CurriculumViewer: React.FC<CurriculumViewerProps> = ({
  initialSectionId = 'oral-comprehension',
}) => {
  const [activeSectionId, setActiveSectionId] = useState(initialSectionId);

  // Section 1 interactive state
  const [sec1Answers, setSec1Answers] = useState<Record<string, string>>({});
  const [sec1Submitted, setSec1Submitted] = useState(false);

  // Section 3 interactive state
  const [sec3Answers, setSec3Answers] = useState<Record<string, string>>({});
  const [sec3Submitted, setSec3Submitted] = useState(false);

  // Section 4 interactive negation drills
  const [sec4Answers, setSec4Answers] = useState<Record<string, string>>({});
  const [sec4Submitted, setSec4Submitted] = useState(false);

  const activeSection = CURRICULUM_SECTIONS.find((s) => s.id === activeSectionId) || CURRICULUM_SECTIONS[0];

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones':
        return <Headphones className="w-5 h-5" />;
      case 'MessageSquareQuote':
        return <MessageSquareQuote className="w-5 h-5" />;
      case 'BookOpenCheck':
        return <BookOpenCheck className="w-5 h-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />;
      case 'PenTool':
        return <PenTool className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'FileCheck2':
      default:
        return <FileCheck2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-7">
      
      {/* 7 Main Curriculum Navigation Tabs */}
      <div className="bg-slate-900/90 border border-indigo-900/50 p-2.5 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-indigo-300 font-bold">
            <span>منهاج اللغة والمحاور التعليمية الـ 7</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400">إشراف وتدريس: المعلمة جيداء صقر</span>
          </div>
          <span className="text-[11px] text-slate-400">
            انقر على أي قسم لفتح دروسه وتمارينه
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {CURRICULUM_SECTIONS.map((sec) => {
            const isActive = sec.id === activeSectionId;
            const isLastWorksheets = sec.id === 'worksheets-solutions';

            return (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`flex flex-col items-start p-3 rounded-xl text-right transition-all border relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-b from-indigo-900 to-slate-900 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                } ${isLastWorksheets ? 'col-span-2 sm:col-span-2 lg:col-span-1 border-amber-500/40 bg-amber-950/20' : ''}`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-indigo-400" />
                )}

                <div className="flex items-center justify-between w-full mb-2">
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {getSectionIcon(sec.icon)}
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isLastWorksheets ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    القسم {sec.num}
                  </span>
                </div>

                <div className="font-bold text-xs line-clamp-1 text-white">
                  {sec.titleAr}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1 font-mono mt-0.5">
                  {sec.titleFr}
                </div>
                <div className="text-[10px] text-amber-400/80 mt-1 font-semibold">
                  {sec.badge}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: COMPRÉHENSION ET INTERACTION ORALES (p. 6-7) */}
      {activeSectionId === 'oral-comprehension' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Section Hero Banner */}
          <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-slate-900 border border-blue-700/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                <span>الوحدة الأولى (Unité 1)</span>
                <span>•</span>
                <span>الصفحات 6 و 7 من الكتاب المدرسي</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                الفهم والتفاعل الشفهي: قضية التحرش المدرسي (Le harcèlement)
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                تحليل المشهد الصوتي والبصري، التمييز بين المتحدثين، دراسة المفردات الأساسية (se moquer, surnommer, harcèlement)، وتصريف فعل devoir في المضارع.
              </p>
            </div>
            <button
              onClick={() => speakFrench("Compréhension et interaction orales. Le harcèlement scolaire.")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              <span>استمع لمقدمة الوحدة</span>
            </button>
          </div>

          {/* Vocabulary Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Bookmark className="w-4 h-4" />
                <span>مفردات الوحدة الأولى الأساسية (Vocabulaire - Page 6) :</span>
              </div>
              <span className="text-xs text-slate-400">انقر على أي كلمة للاستماع للفظ الفرنسي</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {UNIT1_VOCABULARY.map((v, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 rounded-xl flex items-center justify-between gap-2 transition-colors group"
                >
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-1.5">
                      <span>{v.fr}</span>
                      <button
                        onClick={() => speakFrench(v.fr)}
                        className="text-slate-500 group-hover:text-indigo-400 transition-colors"
                        title="نطق الكلمة"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs text-amber-300 mt-0.5">{v.ar}</div>
                    <div className="text-[10px] text-slate-400 italic mt-0.5">{v.defFr}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grammar Rule: Le verbe DEVOIR au présent */}
          <div className="bg-slate-900/90 border border-indigo-900/50 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>قاعدة التصريف: فعل « devoir » في الحاضر (Le verbe devoir au présent) - Page 7</span>
              </div>
              <span className="text-xs text-emerald-400 font-medium">قاعدة وزارية هامة</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {VERBE_DEVOIR.map((item, i) => (
                <div
                  key={i}
                  onClick={() => speakFrench(`${item.pronom} ${item.form}`)}
                  className="bg-slate-950 p-3.5 rounded-xl border border-indigo-900/40 hover:border-indigo-500 text-center cursor-pointer transition-all hover:scale-105"
                  title="انقر للاستماع للتصريف"
                >
                  <div className="text-xs text-slate-400 font-medium">{item.pronom}</div>
                  <div className="text-base font-black text-amber-300 font-mono my-0.5">
                    {item.form}
                  </div>
                  <div className="text-[11px] text-indigo-200">{item.ar}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Exercise: Exercice B & C */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">
                تمارين الاستماع والتحليل التفاعلية (Exercices B & C)
              </h3>
              <span className="text-xs text-indigo-300">تصحيح فوري</span>
            </div>

            <div className="space-y-4 text-xs">
              {/* Item 1 */}
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <div className="text-slate-200 font-bold flex items-center justify-between">
                  <span>1. Dans le document sonore, tu entends parler :</span>
                  <button onClick={() => speakFrench("Tu entends parler un garçon, deux garçons ou trois garçons ?")} className="text-slate-400 hover:text-white">
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {['un garçon (ولد)', 'deux garçons (ولدان)', 'trois garçons (ثلاثة أولاد)'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSec1Answers({ ...sec1Answers, q1: opt })}
                      className={`p-2 rounded-lg border text-right transition-all ${
                        sec1Answers.q1 === opt
                          ? 'bg-indigo-600 border-indigo-400 text-white font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {sec1Submitted && (
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                    ✓ الإجابة الصحيحة: un garçon (ولد واحد يروي قصته مع زملائه).
                  </div>
                )}
              </div>

              {/* Item 2 */}
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <div className="text-slate-200 font-bold flex items-center justify-between">
                  <span>2. Léo n'est pas paresseux, il est :</span>
                  <button onClick={() => speakFrench("Léo n'est pas paresseux, il est intelligent.")} className="text-slate-400 hover:text-white">
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {['intelligent (ذكي)', 'triste (حزين)', 'méchant (شرير)'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSec1Answers({ ...sec1Answers, q2: opt })}
                      className={`p-2 rounded-lg border text-right transition-all ${
                        sec1Answers.q2 === opt
                          ? 'bg-indigo-600 border-indigo-400 text-white font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {sec1Submitted && (
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                    ✓ الإجابة الصحيحة: intelligent (ذكي).
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSec1Submitted(!sec1Submitted)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
              >
                {sec1Submitted ? 'إخفاء التصحيح' : 'فحص وتصحيح الإجابات'}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 2: PRODUCTION ORALE & CONSEILS (p. 8-9) */}
      {activeSectionId === 'oral-production' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="bg-gradient-to-r from-emerald-900/60 via-teal-900/60 to-slate-900 border border-emerald-700/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <span>الوحدة الأولى (Unité 1)</span>
                <span>•</span>
                <span>الصفحات 8 و 9</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                التعبير الشفهي وأدوات تقديم النصائح (Production orale & Conseils)
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                التفريق بين دور الضحية (une victime) والشاهد (un témoin)، وتطبيق تراكيب النصح الثلاثية المعتمدة مع المعلمة جيداء صقر.
              </p>
            </div>
          </div>

          {/* Roles Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Victime */}
            <div className="bg-slate-900/90 border border-rose-900/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertCircle className="w-5 h-5" />
                <span>Si je suis victime (إذا كنت ضحية) :</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="bg-slate-950 p-2.5 rounded-lg flex items-center justify-between">
                  <span>Je dois parler à un adulte (يجب أن أتحدث إلى شخص بالغ).</span>
                  <button onClick={() => speakFrench("Je dois parler à un adulte.")} className="text-slate-400 hover:text-white">
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </li>
                <li className="bg-slate-950 p-2.5 rounded-lg flex items-center justify-between">
                  <span>Je dois porter plainte à la direction (يجب أن أقدم شكوى للإدارة).</span>
                  <button onClick={() => speakFrench("Je dois porter plainte à la direction.")} className="text-slate-400 hover:text-white">
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </li>
                <li className="bg-slate-950 p-2.5 rounded-lg flex items-center justify-between">
                  <span>Je dois parler à mes parents (يجب أن أخبر والديّ).</span>
                  <button onClick={() => speakFrench("Je dois parler à mes parents.")} className="text-slate-400 hover:text-white">
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Témoin */}
            <div className="bg-slate-900/90 border border-emerald-900/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle className="w-5 h-5" />
                <span>Si je suis témoin (إذا كنت شاهداً) :</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="bg-slate-950 p-2.5 rounded-lg flex items-center justify-between">
                  <span>Je dois soutenir la victime (يجب أن أساند وأدعم الضحية).</span>
                  <button onClick={() => speakFrench("Je dois soutenir la victime.")} className="text-slate-400 hover:text-white">
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </li>
                <li className="bg-slate-950 p-2.5 rounded-lg flex items-center justify-between">
                  <span>Je ne participe pas à l'intimidation (لا أشارك في التنمر أو التخويف).</span>
                  <button onClick={() => speakFrench("Je ne participe pas à l'intimidation.")} className="text-slate-400 hover:text-white">
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </li>
                <li className="bg-slate-950 p-2.5 rounded-lg flex items-center justify-between">
                  <span>Je ne ris pas de la victime (لا أضحك ولا أسخر من الضحية).</span>
                  <button onClick={() => speakFrench("Je ne ris pas de la victime.")} className="text-slate-400 hover:text-white">
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Advice Structures Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="text-amber-300 font-bold text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>أدوات تقديم النصيحة في اللغة الفرنسية (Mes outils : Pour conseiller on dit) :</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
                <div className="text-amber-400 font-bold font-mono">1. Il faut + verbe à l'infinitif</div>
                <div className="text-slate-400 mt-1">يجب + فعل في المصدر</div>
                <div className="text-[11px] text-indigo-300 mt-1 italic">Ex: Il faut lire des histoires.</div>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
                <div className="text-amber-400 font-bold font-mono">2. Tu dois / Vous devez + infinitif</div>
                <div className="text-slate-400 mt-1">يجب عليك / عليكم + فعل في المصدر</div>
                <div className="text-[11px] text-indigo-300 mt-1 italic">Ex: Vous devez bien étudier.</div>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
                <div className="text-amber-400 font-bold font-mono">3. Il est nécessaire de + infinitif</div>
                <div className="text-slate-400 mt-1">من الضروري أن + فعل في المصدر</div>
                <div className="text-[11px] text-indigo-300 mt-1 italic">Ex: Il est nécessaire de faire du sport.</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 3: COMPRÉHENSION DE L'ÉCRIT (p. 10-11) */}
      {activeSectionId === 'written-comprehension' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="bg-gradient-to-r from-violet-900/60 via-purple-900/60 to-slate-900 border border-violet-700/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-violet-300">
                <span>الوحدة الأولى (Unité 1)</span>
                <span>•</span>
                <span>الصفحات 10 و 11</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                الفهم المكتوب: قواعد الصف لتلاميذ الثالث الإعدادي
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                ميثاق قواعد الصف (Les règles de la classe - Les collégiens de 3ème)، تصريف فعل mettre في المضارع، وتمييز السلوكيات الممنوعة.
              </p>
            </div>
          </div>

          {/* The 10 Classroom Rules */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
                <BookOpenCheck className="w-4 h-4 text-amber-400" />
                <span>قواعد الصف الـ 10 المقررة (Les 10 règles de la classe) :</span>
              </h3>
              <span className="text-xs text-slate-400">الصفحة 10</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CLASSROOM_RULES.map((rule) => (
                <div
                  key={rule.num}
                  className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-start gap-3 hover:border-indigo-500/40 transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {rule.num}
                  </span>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>{rule.fr}</span>
                      <button
                        onClick={() => speakFrench(rule.fr)}
                        className="text-slate-500 hover:text-indigo-400"
                        title="استمع للقاعدة"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-amber-300/90 mt-1">
                      {rule.ar}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grammar: Verbe METTRE */}
          <div className="bg-slate-900/90 border border-indigo-900/50 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>تصريف فعل « mettre » في الحاضر (Le verbe mettre au présent) - Page 11</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {VERBE_METTRE.map((item, i) => (
                <div
                  key={i}
                  onClick={() => speakFrench(`${item.pronom} ${item.form}`)}
                  className="bg-slate-950 p-3.5 rounded-xl border border-indigo-900/40 hover:border-indigo-500 text-center cursor-pointer transition-all hover:scale-105"
                  title="انقر للاستماع للتصريف"
                >
                  <div className="text-xs text-slate-400 font-medium">{item.pronom}</div>
                  <div className="text-base font-black text-amber-300 font-mono my-0.5">
                    {item.form}
                  </div>
                  <div className="text-[11px] text-indigo-200">{item.ar}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SECTION 4: GRAMMAIRE - LA NÉGATION (p. 12-13) */}
      {activeSectionId === 'grammar-negation' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="bg-gradient-to-r from-amber-900/60 via-orange-900/60 to-slate-900 border border-amber-700/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <span>الوحدة الأولى (Unité 1)</span>
                <span>•</span>
                <span>الصفحات 12 و 13</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                أدوات وقواعد النفي في الفرنسية (Mes outils : La négation)
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                دراسة تفصيلية لكافة أشكال النفي: ne...pas, ne...personne, ne...jamais, ni...ni, وقاعدة تحول أدوات النكرة والتجزئة إلى de.
              </p>
            </div>
          </div>

          {/* Negation Rules Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NEGATION_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <span className="font-mono text-base font-black text-amber-400">
                    {rule.type}
                  </span>
                  <span className="text-xs font-bold text-indigo-300">
                    {rule.meaningAr}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-slate-400 block text-[11px]">جملة مثبتة:</span>
                    <span className="text-white font-medium">{rule.exampleAffirmative}</span>
                  </div>

                  <div className="bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/40">
                    <span className="text-emerald-400 block text-[11px]">جملة منفية:</span>
                    <span className="text-emerald-200 font-bold flex items-center justify-between">
                      <span>{rule.exampleNegative}</span>
                      <button onClick={() => speakFrench(rule.exampleNegative)} className="text-emerald-400 hover:text-white">
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 pt-1">
                    💡 <span className="text-slate-300 font-semibold">{rule.explanationAr}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ATTENTION Rule Box */}
          <div className="bg-slate-950 border-2 border-amber-500/40 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>قاعدة انتباه هامة جداً في الامتحان (ATTENTION - Page 13) :</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              تتحول أدوات النكرة والتجزئة <span className="font-mono text-amber-300">(un, une, des, du, de la)</span> عند النفي إلى <span className="font-mono text-emerald-400 font-bold">(de / d')</span> ما عدا مع فعل الكينونة <span className="font-mono text-amber-300">(être)</span>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-amber-300 font-bold block mb-1">التحول إلى (de) :</span>
                <div className="space-y-1 text-slate-300">
                  <div>J'ai un chien ➔ <span className="text-emerald-400 font-bold">Je n'ai pas de chien.</span></div>
                  <div>J'ai une voiture ➔ <span className="text-emerald-400 font-bold">Je n'ai pas de voiture.</span></div>
                  <div>Je mange des bananes ➔ <span className="text-emerald-400 font-bold">Je ne mange pas de bananes.</span></div>
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-amber-300 font-bold block mb-1">الاستثناء مع فعل (être) :</span>
                <div className="space-y-1 text-slate-300">
                  <div>C'est de la salade ➔ <span className="text-indigo-300 font-bold">Ce n'est pas de la salade.</span></div>
                  <div>Je suis un homme paresseux ➔ <span className="text-indigo-300 font-bold">Je ne suis pas un homme paresseux.</span></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 5: PRODUCTION ÉCRITE (p. 14-15) */}
      {activeSectionId === 'written-production' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="bg-gradient-to-r from-cyan-900/60 via-blue-900/60 to-slate-900 border border-cyan-700/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                <span>الوحدة الأولى (Unité 1)</span>
                <span>•</span>
                <span>الصفحات 14 و 15</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                التعبير الكتابي: البيئة المدرسية الإيجابية والسلبية
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                تصنيف عناصر البيئة المدرسية (Favorable vs Défavorable)، وقواعد صياغة النصائح المدرسية (Il faut + infinitif / Ne + verbe).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Milieu Favorable */}
            <div className="bg-slate-900/90 border border-emerald-800/50 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <ThumbsUp className="w-5 h-5" />
                <span>Un milieu scolaire favorable (بيئة مدرسية مشجعة وإيجابية) :</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="bg-slate-950 p-2.5 rounded-lg">
                  (a) Les élèves travaillent en groupes (يعمل التلاميذ في مجموعات).
                </li>
                <li className="bg-slate-950 p-2.5 rounded-lg">
                  (d) On garde la classe propre (نحافظ على نظافة الصف).
                </li>
                <li className="bg-slate-950 p-2.5 rounded-lg">
                  (f) Tout le monde joue ensemble (يلعب الجميع معاً بروح ودية).
                </li>
                <li className="bg-slate-950 p-2.5 rounded-lg">
                  (c) Il y a des ateliers artistiques (توجد ورشات وأنشطة فنية وإبداعية).
                </li>
              </ul>
            </div>

            {/* Milieu Défavorable */}
            <div className="bg-slate-900/90 border border-rose-800/50 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <ThumbsDown className="w-5 h-5" />
                <span>Un milieu scolaire défavorable (بيئة مدرسية غير مشجعة ومرفوضة) :</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="bg-slate-950 p-2.5 rounded-lg">
                  (b) On casse les fournitures de l'école (نكسر أدوات ومعدات المدرسة).
                </li>
                <li className="bg-slate-950 p-2.5 rounded-lg">
                  (e) On jette des papiers sur le sol (نرمي الأوراق والقمامة على الأرض).
                </li>
                <li className="bg-slate-950 p-2.5 rounded-lg">
                  (g) Les toilettes sont sales (دورات المياه قذرة وغير معتنى بها).
                </li>
              </ul>
            </div>

          </div>

          {/* School Advice Poster Charter */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              <span>ميثاق نصائح ملصق المدرسة (Conseils pour le collège - Page 15) :</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="p-2.5 bg-slate-950 rounded-lg flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Travaillons en groupes et aidons-nous les uns les autres.</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Gardons la classe propre et respectons le matériel.</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Ne jetons pas les déchets par terre.</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Participons aux ateliers artistiques et aux activités scolaires.</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 6: MON PROJET - AFFICHE DES RÈGLES (p. 18) */}
      {activeSectionId === 'unit-project' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="bg-gradient-to-r from-fuchsia-900/60 via-pink-900/60 to-slate-900 border border-fuchsia-700/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-300">
                <span>الوحدة الأولى (Unité 1)</span>
                <span>•</span>
                <span>الصفحة 18 من المنهاج</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                مشروع الوحدة: إنشاء ملصق إعلاني لنشر قواعد الصف (Mon projet)
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                تصميم ملصق القواعد الإعلاني، دلالات حروف شعار G.R.O.U.P.E، ومصفوفة حل المشكلات الصفية.
              </p>
            </div>
          </div>

          {/* GROUPE Acronym Cards */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>دلالات حروف شعار « G.R.O.U.P.E » الصفي (Page 18)</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { letter: 'G', fr: 'Gestion du temps', ar: 'إدارة الوقت' },
                { letter: 'R', fr: 'Respect de tous', ar: 'احترام الجميع' },
                { letter: 'O', fr: 'Organisation', ar: 'التنظيم' },
                { letter: 'U', fr: 'Un à la fois !', ar: 'واحداً تلو الآخر' },
                { letter: 'P', fr: 'Participation', ar: 'المشاركة الفعالة' },
                { letter: 'E', fr: 'Être au travail', ar: 'التركيز على العمل' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-4 rounded-xl border border-indigo-900/40 text-center space-y-1"
                >
                  <div className="text-3xl font-black text-amber-400 font-mono">
                    {item.letter}
                  </div>
                  <div className="text-xs font-bold text-white">{item.fr}</div>
                  <div className="text-[11px] text-indigo-300">{item.ar}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Problems & Solutions Matrix */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-sm text-indigo-300">
              مصفوفة حل المشكلات المدرسية (Problème ➔ Solution) :
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="text-rose-400 font-bold">❌ On parle pendant le cours (التحدث أثناء الشرح)</div>
                <div className="text-emerald-400 font-bold">➔ Solution : Nous écoutons la maîtresse (نستمع للمعلمة).</div>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="text-rose-400 font-bold">❌ On ne respecte pas les autres (عدم احترام الآخرين)</div>
                <div className="text-emerald-400 font-bold">➔ Solution : Nous respectons tout le monde (نحترم الجميع).</div>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="text-rose-400 font-bold">❌ On jette des déchets par terre (رمي المهملات)</div>
                <div className="text-emerald-400 font-bold">➔ Solution : Nous gardons la classe propre (نحافظ على نظافة الصف).</div>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="text-rose-400 font-bold">❌ On arrive en retard (التأخر عن الحضور)</div>
                <div className="text-emerald-400 font-bold">➔ Solution : Nous arrivons à l'heure (نصل في الموعد المحدد).</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 7: 7 CURRICULUM WORKSHEETS & MODEL SOLUTIONS */}
      {activeSectionId === 'worksheets-solutions' && (
        <div className="animate-fadeIn">
          <WorksheetRunner />
        </div>
      )}

    </div>
  );
};
