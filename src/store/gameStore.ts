import { create } from 'zustand'

interface Character {
  id: string;
  value: string;
  isCorrect: boolean;
  originalIndex: number;
}

interface GameState {
  characters: Character[];
  score: number;
  mistakes: number;
  timeElapsed: number;
  isGameComplete: boolean;
  setCharacters: (characters: Character[]) => void;
  incrementScore: () => void;
  incrementMistakes: () => void;
  updateTime: (time: number) => void;
  setGameComplete: (isComplete: boolean) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  characters: [],
  score: 0,
  mistakes: 0,
  timeElapsed: 0,
  isGameComplete: false,

  setCharacters: (characters) => set({ characters }),
  
  incrementScore: () => set((state) => ({ 
    score: state.score + 10 
  })),
  
  incrementMistakes: () => set((state) => ({ 
    mistakes: state.mistakes + 1 
  })),
  
  updateTime: (time) => set({ timeElapsed: time }),
  
  setGameComplete: (isComplete) => set({ isGameComplete: isComplete }),
  
  resetGame: () => set({
    characters: [],
    score: 0,
    mistakes: 0,
    timeElapsed: 0,
    isGameComplete: false,
  }),
}));
