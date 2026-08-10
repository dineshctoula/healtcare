import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Brain, AlertCircle, HelpCircle } from 'lucide-react';
import { fetchExamQuestions, submitExamAnswers } from '../services/api';

interface Question {
  id: string;
  category: 'Doctor' | 'Nurse';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const ExamPrepHub: React.FC = () => {
  const [category, setCategory] = useState<'Doctor' | 'Nurse'>('Doctor');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [qId: string]: number }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadQuestions();
  }, [category]);

  const loadQuestions = async () => {
    setLoading(true);
    setSubmitted(false);
    setAnswers({});
    setEvaluation(null);

    try {
      const data = await fetchExamQuestions(category);
      if (data && data.length > 0) {
        setQuestions(data);
      } else {
        // Fallback questions if backend API call yields empty during initial start
        setQuestions(getFallbackQuestions(category));
      }
    } catch (err) {
      setQuestions(getFallbackQuestions(category));
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = async () => {
    const formattedAnswers = Object.entries(answers).map(([qId, idx]) => ({
      questionId: qId,
      selectedIndex: idx,
    }));

    try {
      const res = await submitExamAnswers(formattedAnswers);
      setEvaluation(res);
      setSubmitted(true);
    } catch (err) {
      // Local fallback calculation if backend offline
      let score = 0;
      const results = questions.map(q => {
        const sel = answers[q.id];
        const isCorrect = sel === q.correctIndex;
        if (isCorrect) score++;
        return {
          questionId: q.id,
          question: q.question,
          selectedIndex: sel,
          correctIndex: q.correctIndex,
          isCorrect,
          explanation: q.explanation,
        };
      });
      setEvaluation({
        score,
        total: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        passed: (score / questions.length) >= 0.7,
        results,
      });
      setSubmitted(true);
    }
  };

  const getFallbackQuestions = (cat: 'Doctor' | 'Nurse'): Question[] => {
    if (cat === 'Doctor') {
      return [
        {
          id: 'q1',
          category: 'Doctor',
          question: 'A 54-year-old male presents with acute substernal chest pain radiating to the left arm for 45 minutes. ECG shows ST elevation in leads II, III, and aVF. What is the immediate first-line management protocol according to DHA emergency guidelines?',
          options: [
            'Aspirin 300mg chewable + Immediate Cath Lab activation for primary PCI',
            'Oral Beta Blockers + IV Morphine only',
            'Outpatient echocardiography referral within 48 hours',
            'Sublingual Nitroglycerin with serial Troponin at 6 hours'
          ],
          correctIndex: 0,
          explanation: 'Inferior STEMI (leads II, III, aVF) requires immediate dual antiplatelet therapy and urgent reperfusion via Primary PCI.'
        },
        {
          id: 'q2',
          category: 'Doctor',
          question: 'Which of the following documents is MANDATORY for DHA Specialist License assessment without additional clinical examination under the unified PQR?',
          options: [
            'Board Certification recognized under Tier 1 (e.g. UK CCT / US ABMS Board)',
            'Basic First Aid certificate from any international center',
            'Hospital recommendation letter written within 5 years',
            'General practice registration from any non-accredited board'
          ],
          correctIndex: 0,
          explanation: 'Tier 1 qualifications grant direct Specialist licensure exemption from written Prometric exam under UAE Unified PQR.'
        }
      ];
    } else {
      return [
        {
          id: 'q3',
          category: 'Nurse',
          question: 'When administering concentrated IV Potassium Chloride (KCl) to an adult patient in an acute care setting, which nursing safety action is mandatory?',
          options: [
            'Never administer IV push; always use a calibrated infusion pump with diluted solution',
            'Administer rapid IV bolus over 2 minutes via peripheral line',
            'Mix with blood transfusion products',
            'Administer intramuscularly into the gluteal muscle'
          ],
          correctIndex: 0,
          explanation: 'Potassium Chloride IV push is LETHAL. It must ALWAYS be diluted and infused slowly via a volumetric pump with cardiac monitoring.'
        },
        {
          id: 'q4',
          category: 'Nurse',
          question: 'In accordance with DHA Infection Control Guidelines, what is the single most effective intervention to prevent Hospital-Acquired Infections (HAIs)?',
          options: [
            'Strict hand hygiene following the WHO 5 Moments protocol',
            'Routine administration of prophylactic oral antibiotics',
            'Double gloving for all non-invasive patient interactions',
            'Spraying chemical disinfectant on patient bedding twice daily'
          ],
          correctIndex: 0,
          explanation: 'Proper hand hygiene adhering to WHO 5 Moments remains the gold standard in reducing HAI transmission rates.'
        }
      ];
    }
  };

  return (
    <section id="exam-hub" className="py-20 relative bg-slate-950/80 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
            <Brain className="w-3.5 h-3.5" />
            <span>Interactive DHA / Prometric Exam Demo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Practice Real Clinical <span className="gradient-text-emerald">DHA Prometric Questions</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Test your clinical knowledge with actual recalled examination scenarios evaluated by our certified DHA training educators in Dubai.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setCategory('Doctor')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              category === 'Doctor'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-500 text-white shadow-lg'
                : 'glass-panel text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            Doctor / Specialist Exam Module
          </button>

          <button
            onClick={() => setCategory('Nurse')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              category === 'Nurse'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-500 text-white shadow-lg'
                : 'glass-panel text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            Registered Nurse Exam Module
          </button>
        </div>

        {/* Main Exam Quiz Area */}
        <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-10 rounded-2xl border-slate-800 space-y-8">
          
          {loading ? (
            <div className="py-16 text-center text-slate-400 font-semibold animate-pulse">
              Loading High-Yield DHA Prometric Question Bank...
            </div>
          ) : (
            <>
              {/* Question List */}
              <div className="space-y-8">
                {questions.map((q, idx) => {
                  const selected = answers[q.id];
                  const evalResult = evaluation?.results?.find((r: any) => r.questionId === q.id);

                  return (
                    <div key={q.id} className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                      
                      <div className="flex items-start justify-between gap-4">
                        <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-extrabold border border-emerald-500/30">
                          Question {idx + 1} of {questions.length}
                        </span>
                        <span className="text-[11px] text-slate-500 font-semibold uppercase">{q.category} Specialty</span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                        {q.question}
                      </h4>

                      {/* Options */}
                      <div className="space-y-2 pt-2">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = selected === oIdx;
                          let optionClass = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700';

                          if (submitted) {
                            if (oIdx === q.correctIndex) {
                              optionClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                            } else if (isSelected && oIdx !== q.correctIndex) {
                              optionClass = 'bg-red-500/20 border-red-500 text-red-300 font-bold';
                            }
                          } else if (isSelected) {
                            optionClass = 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-md';
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={submitted}
                              onClick={() => handleSelectOption(q.id, oIdx)}
                              className={`w-full text-left p-3.5 rounded-xl text-xs transition-all border flex items-center justify-between ${optionClass}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-bold">
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>

                              {submitted && oIdx === q.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              )}
                              {submitted && isSelected && oIdx !== q.correctIndex && (
                                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Box on Submit */}
                      {submitted && evalResult && (
                        <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1 text-xs">
                          <span className="font-bold text-amber-400 flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5" /> Clinical Rationale & Exam Tip:
                          </span>
                          <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {submitted && evaluation && (
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-medium">Your Score:</span>
                      <span className="font-extrabold text-white text-base">{evaluation.score} / {evaluation.total}</span>
                    </div>

                    <div className={`px-3 py-1 rounded-full font-extrabold text-xs flex items-center gap-1.5 ${
                      evaluation.passed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-red-500/20 text-red-400 border border-red-500/40'
                    }`}>
                      {evaluation.passed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      <span>{evaluation.passed ? 'PASSED (70%+ Benchmarks)' : 'NEEDS REVISION'}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 w-full sm:w-auto ml-auto">
                  {submitted ? (
                    <button
                      onClick={loadQuestions}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 glass-panel hover:bg-slate-800 text-white font-bold text-xs rounded-xl border-slate-700"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retry Practice Exam
                    </button>
                  ) : (
                    <button
                      disabled={Object.keys(answers).length < questions.length}
                      onClick={handleSubmitQuiz}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/60"
                    >
                      <span>Submit Exam Answers</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            </>
          )}

        </div>
      </div>
    </section>
  );
};
