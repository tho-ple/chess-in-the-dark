'use client';
import { useState, useEffect } from 'react';
import { generateKnightTour } from '@/lib/utils';
import { ToggleBoardButton } from '../ToggleBoardButton';
import { isKnightMove } from '@/lib/utils';

export const KnightTourExercise = () => {
  const [path, setPath] = useState<string[]>([]);
  const [inputs, setInputs] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<null | 'correct' | 'wrong'>(null);
  const [streak, setStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleNext = () => {
    const newPath = generateKnightTour(4 + Math.floor(Math.random() * 3)); // 4–6 moves
    setPath(newPath);
    setInputs(Array(newPath.length - 2).fill(''));
    setFeedback(null);
    setShowExplanation(false);
  };

  useEffect(() => {
    handleNext();
  }, []);

  const handleInputChange = (value: string, index: number) => {
    const updated = [...inputs];
    updated[index] = value.toUpperCase();
    setInputs(updated);
  };

  const validatePath = (): boolean => {
    const fullPath = [path[0], ...inputs, path[path.length - 1]];
    for (let i = 0; i < fullPath.length - 1; i++) {
      if (!isKnightMove(fullPath[i], fullPath[i + 1])) {
        return false;
      }
    }
    const unique = new Set(fullPath);
    return unique.size === fullPath.length; // no duplicates
  };

  const handleSubmit = () => {
    if (inputs.some((i) => i.trim() === '')) return;

    const isCorrect = validatePath();

    if (isCorrect) {
      setFeedback('correct');
      setStreak((prev) => prev + 1);
    } else {
      setFeedback('wrong');
      setStreak(0);
    }

    setShowExplanation(true);
  };

  return (
    <div className="p-6 border border-white/20 rounded-xl text-left max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Knight Tour</h2>

      <p className="text-lg">
        Enter a valid knight path from <strong>{path[0]}</strong> to <strong>{path[path.length - 1]}</strong>
        , using exactly {path.length - 2} intermediate squares.
      </p>

      <div className="flex space-x-2 text-lg font-mono text-white">
        <span className="px-2 py-1 border border-white/30 rounded">{path[0]}</span>
        {inputs.map((input, idx) => (
          <input
            key={idx}
            value={input}
            onChange={(e) => handleInputChange(e.target.value, idx)}
            className="w-14 text-center px-2 py-1 border border-white/30 bg-black rounded placeholder-white/30"
            placeholder={`_`}
            maxLength={2}
          />
        ))}
        <span className="px-2 py-1 border border-white/30 rounded">{path[path.length - 1]}</span>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
      >
        Submit
      </button>

      {feedback === 'correct' && (
        <div className="text-green-400 font-semibold">✔ Correct!</div>
      )}
      {feedback === 'wrong' && (
        <div className="text-red-400 font-semibold">✘ Wrong path</div>
      )}

      {showExplanation && feedback === 'wrong' && (
        <div className="text-sm text-white/70 mt-2 italic">
          One or more moves were not valid knight moves, or you repeated a square.
          <br />
          Example path: {path.join(' → ')}
        </div>
      )}

      {feedback && (
        <button
          onClick={handleNext}
          className="mt-4 text-sm text-white/60 hover:underline"
        >
          Next
        </button>
      )}

      <div className="flex items-center justify-between text-sm text-white/40 mt-4">
        <div>
          Current Streak: <span className="text-white font-bold">{streak}</span>
        </div>
        <ToggleBoardButton />
      </div>
    </div>
  );
};
