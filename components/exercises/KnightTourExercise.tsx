'use client';
import { useState, useEffect } from 'react';
import { isKnightMove, generateKnightTour } from '@/lib/utils';

export const KnightTourExercise = () => {
  const [path, setPath] = useState<string[]>([]);
  const [inputs, setInputs] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<null | 'correct' | 'wrong'>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const start = path[0];
  const end = path[path.length - 1];
  const numIntermediate = path.length - 2;

  const generateNewPath = () => {
    const newPath = generateKnightTour(Math.floor(Math.random() * 3) + 4); // 4–6 squares
    setPath(newPath);
    setInputs(Array(newPath.length - 2).fill(''));
    setFeedback(null);
    setShowExplanation(false);
  };

  useEffect(() => {
    generateNewPath();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const updated = [...inputs];
    updated[index] = value.toUpperCase().trim();
    setInputs(updated);
  };

  const handleSubmit = () => {
    const userPath = [start, ...inputs, end];

    const allValidMoves = userPath.every((sq) => /^[A-H][1-8]$/.test(sq));
    if (!allValidMoves) {
      setFeedback('wrong');
      setShowExplanation(true);
      return;
    }

    const valid = userPath.every((sq, i) =>
      i === userPath.length - 1 ? true : isKnightMove(sq, userPath[i + 1])
    );

    setFeedback(valid ? 'correct' : 'wrong');
    setShowExplanation(true);
  };

  const handleNext = () => {
    generateNewPath();
  };

  return (
    <div className="p-6 border border-white/20 rounded-xl text-left max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Knight’s Tour</h2>

      <p className="text-lg">
        Connect the knight from <strong>{start}</strong> to <strong>{end}</strong> using valid knight moves.
      </p>

      <div className="flex gap-2 items-center flex-wrap text-white">
        <div className="px-3 py-1 rounded bg-white/10">{start}</div>
        {inputs.map((val, i) => (
          <input
            key={i}
            value={val}
            onChange={(e) => handleInputChange(i, e.target.value)}
            placeholder="_"
            className="w-16 text-center p-2 rounded bg-black border border-white/30 text-white placeholder-white/40"
          />
        ))}
        <div className="px-3 py-1 rounded bg-white/10">{end}</div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
      >
        Submit
      </button>

      {feedback === 'correct' && (
        <div className="text-green-400 font-semibold">✔ Correct knight path!</div>
      )}
      {feedback === 'wrong' && (
        <div className="text-red-400 font-semibold">✘ Invalid knight path</div>
      )}

      {showExplanation && (
        <button
          onClick={handleNext}
          className="mt-4 text-sm text-white/60 hover:underline"
        >
          Try another
        </button>
      )}
    </div>
  );
};
