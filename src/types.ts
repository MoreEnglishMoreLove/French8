export interface StudentSession {
  studentName: string;
  normalizedName: string;
  activationCode: string;
  activatedAt: number; // timestamp
  expiresAt: number;   // timestamp (180 days after activatedAt)
  deviceId: string;
}

export interface GeneratedCodeRecord {
  id: string;
  studentName: string;
  code: string;
  createdAt: number;
  notes?: string;
}

export interface ExerciseChoice {
  id: string;
  textFr: string;
  textAr: string;
  isCorrect?: boolean;
}

export interface QuestionItem {
  id: string;
  promptFr: string;
  promptAr?: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'true-false' | 'sentence-ordering';
  options?: ExerciseChoice[];
  correctAnswer: string | string[];
  explanationAr: string;
  hintAr?: string;
}

export interface MatchingPair {
  id: string;
  leftFr: string;
  leftAr: string;
  rightFr: string;
  rightAr: string;
  matchId: string;
}

export interface CurriculumSection {
  id: string;
  sectionNumber: number;
  titleAr: string;
  titleFr: string;
  subtitleAr: string;
  unit: string;
  pagesRef: string;
  iconName: string;
  summaryAr: string;
  color: string;
}

export interface WorksheetData {
  id: string;
  number: number;
  titleAr: string;
  titleFr: string;
  pageRef: string;
  totalMarks: number;
  descriptionAr: string;
  questions: WorksheetQuestion[];
  modelSolutionsAr: string[];
}

export interface WorksheetQuestion {
  id: string;
  titleFr: string;
  titleAr: string;
  type: 'mcq' | 'fill' | 'matching' | 'boolean' | 'categorize';
  instructionFr: string;
  instructionAr: string;
  items: {
    id: string;
    textFr: string;
    textAr?: string;
    options?: string[];
    correctAnswer: string;
    explanationAr: string;
  }[];
}
