export interface GameQuestion {
  id: number;
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[]
}

export interface Answer {
  text: string;
  correct: boolean;
}

