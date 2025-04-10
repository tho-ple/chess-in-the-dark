'use client';
import { useState, useEffect } from 'react';

const getRandomSquare = (): string => {
  const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const file = files[Math.floor(Math.random() * 8)];
  const rank = ranks[Math.floor(Math.random() * 8)];
  return `${file}${rank}`;
};

const isWhiteSquare = (square: string): boolean => {
  const fileCode = square.charCodeAt(0); // A=65
  const rank = parseInt(square[1], 10);

  const xor = (a: any, b: any): boolean => {
    return !!a !== !!b;
  };

  return xor(fileCode % 2 === 0, rank % 2 === 0);
};

export const ColorSquareExercise = () => {
  const [currentSquare, setCurrentSquare] = useState(getRandomSquare());
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<null | 'correct' | 'wrong'>(null);

  const handleAnswer = (color: 'white' | 'black') => {
    const correct = isWhiteSquare(currentSquare) ? 'white' : 'black';
    if (color === correct) {
      setStreak((prev) => prev + 1);
      setFeedback('correct');
    } else {
      setStreak(0);
      setFeedback('wrong');
    }

    setTimeout(() => {
      setCurrentSquare(getRandomSquare());
      setFeedback(null);
    }, 800);
  };

  return (
    <div className="p-6 border border-white/20 rounded-xl text-center max-w-md mx-auto">
      <h2 className="text-xl mb-4 font-semibold">What color is this square?</h2>
      <div className="text-5xl font-mono mb-6">{currentSquare}</div>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => handleAnswer('white')}
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
        >
          White
        </button>
        <button
          onClick={() => handleAnswer('black')}
          className="px-4 py-2 bg-black text-white border border-white rounded hover:bg-white hover:text-black transition"
        >
          Black
        </button>
      </div>

      <div className="text-sm text-white/60">
        Current Streak: <span className="text-white font-bold">{streak}</span>
      </div>

      {feedback === 'correct' && (
        <div className="mt-2 text-green-400 font-semibold">✔ Correct!</div>
      )}
      {feedback === 'wrong' && (
        <div className="mt-2 text-red-400 font-semibold">✘ Wrong</div>
      )}
    </div>
  );
};
