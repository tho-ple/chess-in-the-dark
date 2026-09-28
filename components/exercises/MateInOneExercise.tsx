'use client';
import { useState, useMemo } from 'react';
import { SingleSquareInput } from '@/components/ui/single-square-input';
import { findMateInOneMoves, describePosition } from '@/lib/chess';

type MateScenario = {
  id: number;
  fen: string;
  explanation: string;
};

const scenarios: MateScenario[] = [
  {
    id: 1,
    fen: '7k/4N1pp/8/6N1/8/8/8/6K1 w - - 0 1',
    explanation:
      'Nf7#: Move the Knight from g5 to f7. It gives check, and the King cannot capture it because f7 is out of reach. The escape square g8 is covered by the Knight on e7, so the King has no way out.',
  },
  {
    id: 2,
    fen: '7k/6pp/8/8/8/8/R7/Q5K1 w - - 0 1',
    explanation:
      'Ra8#: Move the Rook from a2 to a8, attacking the King along the back rank. The King cannot run to g8 (covered by the Rook) and is trapped by its own pawns on g7 and h7.',
  },
  {
    id: 3,
    fen: '5B1k/6pp/8/8/8/8/8/Q5K1 w - - 0 1',
    explanation:
      'Qxg7#: Move the Queen from a1 to g7, capturing the pawn. The Bishop on f8 protects the Queen, so the King cannot capture it, and g8 is covered by the Queen. Checkmate.',
  },
];

const SIDE_TO_MOVE = 'w';

export const MateInOneExercise = () => {
  const [scenario, setScenario] = useState(
    () => scenarios[Math.floor(Math.random() * scenarios.length)]
  );
  const [input, setInput] = useState('');
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<null | 'correct' | 'wrong'>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const correctAnswer = useMemo(() => {
    const moves = findMateInOneMoves(scenario.fen, SIDE_TO_MOVE);
    return moves[0]?.to ?? null;
  }, [scenario]);

  const position = useMemo(() => describePosition(scenario.fen), [scenario]);

  const handleSubmit = () => {
    const normalized = input.trim().toUpperCase();
    if (correctAnswer && normalized === correctAnswer) {
      setFeedback('correct');
      setStreak((prev) => prev + 1);
    } else {
      setFeedback('wrong');
      setStreak(0);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    setInput('');
    setFeedback(null);
    setShowExplanation(false);
    setScenario(scenarios[Math.floor(Math.random() * scenarios.length)]);
  };

  return (
    <div className="p-6 border border-white/20 rounded-xl text-left max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Mate in One</h2>

      <p>White to move. Find the move that checkmates in one move.</p>

      <div className="text-sm text-white/60">
        <p>White: {position.white}</p>
        <p>Black: {position.black}</p>
      </div>

      <p>Enter the destination square of the mating move (e.g. F7).</p>

      <SingleSquareInput
        value={input}
        onChange={setInput}
        placeholder="Enter square (e.g. F7)"
      />

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
        <div className="text-red-400 font-semibold">✘ Wrong</div>
      )}

      {showExplanation && (
        <div className="text-sm text-white/70 mt-2 italic">
          {scenario.explanation}
        </div>
      )}

      {(feedback === 'correct' || feedback === 'wrong') && (
        <button
          onClick={handleNext}
          className="mt-4 text-sm text-white/60 hover:underline"
        >
          Next scenario
        </button>
      )}

      <div className="flex items-center justify-between text-sm text-white/40 mt-4">
        <div>
          Current Streak: <span className="text-white font-bold">{streak}</span>
        </div>
      </div>
    </div>
  );
};
