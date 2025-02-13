export interface GameQuestion {
  id: number;
  questions: {
    id: number;
    question: string;
    answers: {
      text: string;
      correct: boolean;
    }[];
  }[];
}
