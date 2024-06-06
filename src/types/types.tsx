export interface Questions {
  question: string;
  options: string[];
  answer: string;
}

export interface QuizData {
  title: string;
  icon: string;
  questions: Questions[];
}
