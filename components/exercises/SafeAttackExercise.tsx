'use client';
import { useState } from 'react';
import { ToggleBoardButton } from '../ToggleBoardButton';
import { SquareInput } from '@/components/ui/square-input';

type SafeAttackScenario = {
  id: number;
  attacker: string;
  attackerSquare: string;
  targetPiece: string;
  targetSquare: string;
  blockerPiece: string;
  blockerSquare: string;
  correctAnswer: string;
  explanation: string;
};

const scenarios: SafeAttackScenario[] = [
  {
    id: 1,
    attacker: 'Knight',
    attackerSquare: 'E5',
    targetPiece: 'Rook',
    targetSquare: 'B4',
    blockerPiece: 'Rook',
    blockerSquare: 'H3',
    correctAnswer: 'C6',
    explanation:
      'C6: Attacking the Rook on B4 without being attack by the Rook on H3',
  },
];


export const SafeAttackExercise = () => {
  const [currentScenario] = useState(scenarios[0]); // later: random or next
  const [input, setInput] = useState('');
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<null | 'correct' | 'wrong'>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    const normalized = input.trim().toUpperCase();
    if (normalized === currentScenario.correctAnswer.toUpperCase()) {
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
    // later: cycle through or randomize scenarios
  };

  return (
    <div className="p-6 border border-white/20 rounded-xl text-left max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Safe Attack Exercise</h2>

      <p>
        You have a <strong>{currentScenario.attacker}</strong> on{' '}
        <strong>{currentScenario.attackerSquare}</strong>. An enemy{' '}
        <strong>{currentScenario.targetPiece}</strong> is on{' '}
        <strong>{currentScenario.targetSquare}</strong>, and another enemy{' '}
        <strong>{currentScenario.blockerPiece}</strong> is on{' '}
        <strong>{currentScenario.blockerSquare}</strong>.
      </p>

      <p>Which square can you safely move to, to attack?</p>

      <SquareInput
        value={input}
        onChange={setInput}
        placeholder="Enter square (e.g. C3)"
        allowMultiple={false}
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
          {currentScenario.explanation}
        </div>
      )}

      {(feedback === 'correct' || feedback === 'wrong') && (
        <button
          onClick={handleNext}
          className="mt-4 text-sm text-white/60 hover:underline"
        >
          Try again (Next scenario support coming soon)
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
