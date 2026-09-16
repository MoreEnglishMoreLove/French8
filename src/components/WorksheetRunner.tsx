import React, { useState } from 'react';
import { ALL_WORKSHEETS } from '../data/worksheetsData';
import { WorksheetData } from '../types';
import { speakFrench } from '../utils/speech';
import {
  FileCheck2,
  BookOpen,
  CheckCircle,
  XCircle,
  Volume2,
  Printer,
  RotateCcw,
  Sparkles,
  Award,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Bookmark,
} from 'lucide-react';

export const WorksheetRunner: React.FC = () => {
  const [activeWorksheetIndex, setActiveWorksheetIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'interactive' | 'solution'>('interactive');
  
  // User answers state: key = questionItemId, value = selectedOption
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentWorksheet: WorksheetData = ALL_WORKSHEETS[activeWorksheetIndex];

  // Calculate score when submitted
  const calculateScore = () => {
    let correctCount = 0;
    let totalItems = 0;

    currentWorksheet.questions.forEach((q) => {
      q.items.forEach((item) => {
        totalItems++;
        if (answers[item.id] === item.correctAnswer) {
          correctCount++;
        }
      });
    });

    const percentage = totalItems > 0 ? Math.round((correctCount / totalItems) * 100) : 0;
    const scaledMarks = totalItems > 0 ? Math.round((correctCount / totalItems) * currentWorksheet.totalMarks) : 0;

    return { correctCount, totalItems, percentage, scaledMarks };
  };

  const handleSelectOption = (itemId: string, option: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [itemId]: option,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
  };

  const handleChangeWorksheet = (idx: number) => {
    setActiveWorksheetIndex(idx);
    setAnswers({});
    setIsSubmitted(false);
  };

  const scoreResult = isSubmitted ? calculateScore() : null;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600/20 via-rose-600/20 to-indigo-600/20 border border-amber-500/30 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <FileCheck2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-500/30 text-amber-200 px-2.5 py-0.5 rounded-full font-bold">
                القسم السابع والأخير في المنهاج
              </span>
              <span className="text-xs text-indigo-300 font-semibold">
                إشراف المعلمة جيداء صقر
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              أوراق عمل المنهاج والحلول النموذجية (7 Curriculum Worksheets)
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              أوراق عمل شاملة مطابقة لكافة صور ودروس المنهاج المعتمد مع إمكانية الحل التفاعلي والاطلاع على الشرح والحل النموذجي.
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-slate-950/80 p-1.5 rounded-xl border border-indigo-900/60 shrink-0">
          <button
            onClick={() => setViewMode('interactive')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'interactive'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            حل تفاعلي واختبار
          </button>
          <button
            onClick={() => setViewMode('solution')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'solution'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            الحل النموذجي والشرح
          </button>
        </div>
      </div>

      {/* Worksheets Carousel Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {ALL_WORKSHEETS.map((ws, index) => {
          const isActive = index === activeWorksheetIndex;
          return (
            <button
              key={ws.id}
              onClick={() => handleChangeWorksheet(index)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-indigo-700/50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
              <span>ورقة عمل {ws.number}</span>
              <span className="text-[10px] opacity-75 font-normal">({ws.pageRef.split('-')[1] || ws.pageRef})</span>
            </button>
          );
        })}
      </div>

      {/* Active Worksheet Main Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
        
        {/* Worksheet Sub-header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs text-amber-400 font-bold mb-1 flex items-center gap-2">
              <span>{currentWorksheet.pageRef}</span>
              <span>•</span>
              <span>العلامة الكاملة: {currentWorksheet.totalMarks} درجة</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              {currentWorksheet.titleAr}
            </h3>
            <div className="text-xs text-slate-400 font-mono flex items-center gap-2 mt-0.5">
              <span>{currentWorksheet.titleFr}</span>
              <button
                onClick={() => speakFrench(currentWorksheet.titleFr)}
                className="text-indigo-400 hover:text-indigo-300"
                title="استمع لنطق العنوان بالفرنسية"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة ورقة العمل</span>
            </button>
          </div>
        </div>

        {/* MODE 1: INTERACTIVE SOLVING */}
        {viewMode === 'interactive' && (
          <div className="space-y-6">
            
            {/* Score Banner when submitted */}
            {isSubmitted && scoreResult && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-2 border-indigo-500/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/30 flex items-center justify-center text-amber-400">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300">نتيجتك في هذه الورقة :</div>
                    <div className="text-2xl font-black text-white flex items-center gap-2">
                      <span className="text-amber-400">{scoreResult.scaledMarks}</span> / {currentWorksheet.totalMarks} درجة
                      <span className="text-sm font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                        {scoreResult.percentage}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>إعادة الحل</span>
                  </button>
                  <button
                    onClick={() => setViewMode('solution')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>عرض الحل النموذجي المفصل</span>
                  </button>
                </div>
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-6">
              {currentWorksheet.questions.map((question, qIdx) => (
                <div
                  key={question.id}
                  className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm text-indigo-300">
                        {question.titleAr}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {question.instructionAr}
                      </p>
                    </div>
                    <span className="text-xs bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800 font-bold">
                      سؤال {qIdx + 1}
                    </span>
                  </div>

                  {/* Question Items */}
                  <div className="space-y-4">
                    {question.items.map((item, itemIdx) => {
                      const selected = answers[item.id];
                      const isCorrect = selected === item.correctAnswer;

                      return (
                        <div
                          key={item.id}
                          className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-1 flex-1">
                              <div className="text-sm font-semibold text-white flex items-center gap-2">
                                <span>{item.textFr}</span>
                                <button
                                  onClick={() => speakFrench(item.textFr)}
                                  className="text-slate-400 hover:text-indigo-300"
                                  title="استمع للنطق"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              {item.textAr && (
                                <div className="text-xs text-slate-400">
                                  {item.textAr}
                                </div>
                              )}
                            </div>
                            
                            {/* Validation Icon if submitted */}
                            {isSubmitted && (
                              <div>
                                {isCorrect ? (
                                  <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-800/40">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>صحيح</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-rose-400 text-xs font-bold bg-rose-950/60 px-2 py-1 rounded-lg border border-rose-800/40">
                                    <XCircle className="w-4 h-4" />
                                    <span>خطأ</span>
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Options */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {item.options?.map((option) => {
                              const isThisSelected = selected === option;
                              const isThisTheCorrectAnswer = option === item.correctAnswer;

                              let buttonStyle = 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800';

                              if (isSubmitted) {
                                if (isThisTheCorrectAnswer) {
                                  buttonStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                                } else if (isThisSelected && !isThisTheCorrectAnswer) {
                                  buttonStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                                } else {
                                  buttonStyle = 'bg-slate-950/50 border-slate-800 text-slate-500 opacity-60';
                                }
                              } else if (isThisSelected) {
                                buttonStyle = 'bg-indigo-600 border-indigo-400 text-white font-bold shadow-md';
                              }

                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => handleSelectOption(item.id, option)}
                                  disabled={isSubmitted}
                                  className={`px-3.5 py-2.5 rounded-lg border text-xs text-right transition-all flex items-center justify-between gap-2 ${buttonStyle}`}
                                >
                                  <span>{option}</span>
                                  {isThisSelected && !isSubmitted && (
                                    <div className="w-2 h-2 rounded-full bg-white shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanation if submitted */}
                          {isSubmitted && (
                            <div className="mt-2 pt-2 border-t border-slate-800/60 text-xs text-amber-200/90 bg-amber-950/20 p-2.5 rounded-lg">
                              <span className="font-bold text-amber-300">شرح المعلمة جيداء صقر: </span>
                              {item.explanationAr}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                {isSubmitted
                  ? 'تم تصحيح الإجابات بنجاح. يمكنك استعراض الشرح أو التبديل لأوراق العمل الأخرى.'
                  : 'أجب على كافة الأسئلة ثم اضغط على زر التصحيح للتحقق من إجاباتك.'}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>تصحيح ورقة العمل وحساب الدرجة</span>
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>إعادة المحاولة</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

        {/* MODE 2: OFFICIAL MODEL SOLUTIONS */}
        {viewMode === 'solution' && (
          <div className="space-y-6">
            <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-amber-300 text-sm">
                  الحل النموذجي المعتمد - إشراف وتدريس المعلمة جيداء صقر
                </div>
                <div className="text-slate-300 mt-0.5">
                  هذه الحلول الرسمية والشروحات التفصيلية أُعدت وفقاً للمنهاج الرسمي لضمان حصول الطالب على العلامة التامة.
                </div>
              </div>
            </div>

            {/* Questions with highlighted solutions */}
            <div className="space-y-4">
              {currentWorksheet.questions.map((question) => (
                <div
                  key={question.id}
                  className="bg-slate-950/70 border border-indigo-900/40 rounded-xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-indigo-300">
                      {question.titleAr} ({question.titleFr})
                    </h4>
                    <span className="text-xs text-amber-400 font-bold">حل نموذجي</span>
                  </div>

                  <div className="space-y-3">
                    {question.items.map((item, idx) => (
                      <div key={item.id} className="bg-slate-900/70 p-3.5 rounded-lg border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{item.textFr}</span>
                          <button
                            onClick={() => speakFrench(item.textFr)}
                            className="text-slate-400 hover:text-indigo-300"
                            title="استمع للنطق"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="bg-emerald-950/50 border border-emerald-500/50 p-2.5 rounded-lg flex items-start gap-2 text-xs">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-emerald-300 font-bold block">
                              الإجابة النموذجية: {item.correctAnswer}
                            </span>
                            <span className="text-slate-300 text-[11px] mt-0.5 block">
                              💡 الشرح التعليمي: {item.explanationAr}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* General Solution Notes */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                <span>الخلاصة والقواعد المفتاحية لورقة العمل هذه :</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                {currentWorksheet.modelSolutionsAr.map((note, i) => (
                  <li key={i} className="leading-relaxed">
                    {note}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}

        {/* Footer Navigation Between Worksheets */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => handleChangeWorksheet(Math.max(0, activeWorksheetIndex - 1))}
            disabled={activeWorksheetIndex === 0}
            className="inline-flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
            <span>ورقة العمل السابقة</span>
          </button>

          <span className="text-xs text-slate-400 font-bold">
            {activeWorksheetIndex + 1} من 7 أوراق عمل
          </span>

          <button
            onClick={() => handleChangeWorksheet(Math.min(ALL_WORKSHEETS.length - 1, activeWorksheetIndex + 1))}
            disabled={activeWorksheetIndex === ALL_WORKSHEETS.length - 1}
            className="inline-flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-all"
          >
            <span>ورقة العمل التالية</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
