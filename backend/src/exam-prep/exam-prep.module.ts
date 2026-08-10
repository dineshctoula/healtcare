import { Injectable, Controller, Get, Query, Post, Body, Module } from '@nestjs/common';

export interface ExamQuestion {
  id: string;
  category: 'Doctor' | 'Nurse';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

@Injectable()
export class ExamPrepService {
  private questions: ExamQuestion[] = [
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
      explanation: 'Inferior STEMI (leads II, III, aVF) requires immediate dual antiplatelet therapy (chewable Aspirin + P2Y12 inhibitor) and urgent reperfusion therapy via Primary PCI within 90 minutes door-to-balloon time.'
    },
    {
      id: 'q2',
      category: 'Doctor',
      question: 'Which of the following documents is MANDATORY for DHA Specialist License assessment without additional clinical examination under the unified PQR (Professional Qualification Requirements)?',
      options: [
        'Board Certification recognized under Tier 1 (e.g. UK CCT / US ABMS Board)',
        'Basic First Aid certificate from any international center',
        'Hospital recommendation letter written within 5 years',
        'General practice registration from any non-accredited board'
      ],
      correctIndex: 0,
      explanation: 'Under UAE Unified PQR guidelines, Tier 1 qualifications (such as UK CCT, American Board, Canadian Fellowship, or equivalent) grant direct Specialist/Consultant DHA licensure exemption from written Prometric exam.'
    },
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
      explanation: 'Potassium Chloride IV push is LETHAL. It must ALWAYS be diluted and infused slowly via a volumetric IV infusion pump with cardiac monitoring.'
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
      explanation: 'Proper hand hygiene adhering to WHO 5 Moments before and after patient contact remains the gold standard in reducing HAI transmission rates.'
    }
  ];

  getQuestions(category?: string) {
    if (category) {
      return this.questions.filter(q => q.category.toLowerCase() === category.toLowerCase());
    }
    return this.questions;
  }

  evaluateAnswers(answers: { questionId: string; selectedIndex: number }[]) {
    let score = 0;
    const results = answers.map(ans => {
      const q = this.questions.find(item => item.id === ans.questionId);
      if (!q) return { questionId: ans.questionId, correct: false, explanation: 'Question not found' };

      const isCorrect = q.correctIndex === ans.selectedIndex;
      if (isCorrect) score++;

      return {
        questionId: q.id,
        question: q.question,
        selectedIndex: ans.selectedIndex,
        correctIndex: q.correctIndex,
        isCorrect,
        explanation: q.explanation,
      };
    });

    return {
      score,
      total: answers.length,
      percentage: Math.round((score / answers.length) * 100),
      passed: (score / answers.length) >= 0.7,
      results,
    };
  }
}

@Controller('exam-prep')
export class ExamPrepController {
  constructor(private readonly service: ExamPrepService) {}

  @Get('questions')
  getQuestions(@Query('category') category?: string) {
    return {
      success: true,
      data: this.service.getQuestions(category),
    };
  }

  @Post('submit')
  submitAnswers(@Body() body: { answers: { questionId: string; selectedIndex: number }[] }) {
    const evaluation = this.service.evaluateAnswers(body.answers || []);
    return {
      success: true,
      data: evaluation,
    };
  }
}

@Module({
  controllers: [ExamPrepController],
  providers: [ExamPrepService],
  exports: [ExamPrepService],
})
export class ExamPrepModule {}
