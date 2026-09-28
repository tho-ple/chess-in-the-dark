'use client';
import { useState } from 'react';
import { getRandomScenario } from '@/lib/utils';
import { ToggleBoardButton } from '../ToggleBoardButton';

const buildRect = (maxFile: string, maxRank: number): string[] => {
  const files = 'ABCDEFGH'.slice(0, maxFile.charCodeAt(0) - 64);
  const ranks = Array.from({ length: maxRank }, (_, i) => i + 1);

  return ranks.flatMap((rank) =>
    files.split('').map((file) => `${file}${rank}`)
  );
};

type Level = {
  label: string;
  squares: string[];
};

const LEVELS: Level[] = [
  { label: 'a1 - b2', squares: buildRect('B', 2) },
  { label: 'a1 - d2', squares: buildRect('D', 2) },
  { label: 'a1 - d4', squares: buildRect('D', 4) },
  { label: 'a1 - f4', squares: buildRect('F', 4) },
  { label: 'a1 - h4', squares: buildRect('H', 4) },
  { label: 'a1 - h6', squares: buildRect('H', 6) },
  { label: 'the whole board', squares: buildRect('H', 8) },
];

const STREAKS_PER_LEVEL = 10;

const getLevel = (streak: number) =>
  Math.min(Math.floor(streak / STREAKS_PER_LEVEL), LEVELS.length - 1);

const isWhiteSquare = (square: string): boolean => {
  const fileCode = square.charCodeAt(0); // A=65
  const rank = parseInt(square[1], 10);

  return (fileCode % 2 === 0) !== (rank % 2 === 0);
};

export const GuessSquareExercise = () => {
  const [streak, setStreak] = useState(0);
  const [currentSquare, setCurrentSquare] = useState(() =>
    getRandomScenario(LEVELS[0].squares)
  );
  const [feedback, setFeedback] = useState<null | 'correct' | 'wrong'>(null);

  const level = getLevel(streak);
  const currentLevel = LEVELS[level];

  const handleAnswer = (color: 'white' | 'black') => {
    if (feedback !== null) return;

    const correct = isWhiteSquare(currentSquare) ? 'white' : 'black';
    const nextStreak = color === correct ? streak + 1 : 0;

    setStreak(nextStreak);
    setFeedback(color === correct ? 'correct' : 'wrong');

    const nextLevel = getLevel(nextStreak);
    const nextSquare = getRandomScenario(LEVELS[nextLevel].squares);

    setTimeout(() => {
      setCurrentSquare(nextSquare);
      setFeedback(null);
    }, 800);
  };

  return (
    <div className="p-6 border border-white/20 rounded-xl text-center max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Color of the Square (progressive)</h2>
      <p className="text-sm text-white/60">
        Name the color of the square from memory.
      </p>

      <div className="text-5xl font-mono">{currentSquare}</div>

      <div className="flex justify-center gap-4">
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

      {feedback === 'correct' && (
        <div className="text-green-400 font-semibold">✔ Correct!</div>
      )}
      {feedback === 'wrong' && (
        <div className="text-red-400 font-semibold">✘ Wrong</div>
      )}

      <div className="flex gap-1 mt-6">
        {LEVELS.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 flex-1 rounded transition-all ${
              level + 1 >= idx + 1 ? 'bg-white/80' : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-white/40">
        <div>
          Level {level + 1} of {LEVELS.length} — {currentLevel.label}
        </div>
        <div>
          Streak: <span className="text-white font-bold">{streak}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <ToggleBoardButton />
      </div>
    </div>
  );
};
