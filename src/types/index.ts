export interface Poem {
  id: number;
  title: string;
  author: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Character {
  id: string;
  value: string;
  isCorrect: boolean;
  originalIndex: number;
}

export interface GameState {
  score: number;
  timeElapsed: number;
  isGameComplete: boolean;
  mistakes: number;
}
