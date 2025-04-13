'use client';
import { useState } from 'react';
import { SquareInput } from '@/components/ui/square-input';

type ConnectSquaresScenario = {
    id: number;
    piece: string;
    squareA: string;
    squareB: string;
    correctAnswer: string | string[];
    explanation: string;
};

const scenarios: ConnectSquaresScenario[] = [
    {
        id: 1,
        piece: 'Bishop',
        squareA: 'G5',
        squareB: 'G1',
        correctAnswer: ['C3', 'F4'],
        explanation: 'Bishop on C3 or F4 can attack both G5 and G1.',
    },
];


export const ConnectSquaresExercise = () => {
    const [currentScenario] = useState(scenarios[0]); // Expand later
    const [input, setInput] = useState('');
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState<null | 'correct' | 'wrong'>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleSubmit = () => {
        const normalized = input
          .toUpperCase()
          .replace(/\s+/g, '')
          .split(',')
          .filter(Boolean);
      
        const correctAnswers = getCorrectAnswers(currentScenario);
      
        const isMatch =
          normalized.length === correctAnswers.length &&
          normalized.every((sq) => correctAnswers.includes(sq)) &&
          correctAnswers.every((sq) => normalized.includes(sq));
      
        if (isMatch) {
          setFeedback('correct');
          setStreak((prev) => prev + 1);
        } else {
          setFeedback('wrong');
          setStreak(0);
        }
      
        setShowExplanation(true);
      };

    const getCorrectAnswers = (scenario: ConnectSquaresScenario) => {
        return Array.isArray(scenario.correctAnswer)
          ? scenario.correctAnswer.map((s) => s.toUpperCase())
          : [scenario.correctAnswer.toUpperCase()];
      };

    const handleNext = () => {
        setInput('');
        setFeedback(null);
        setShowExplanation(false);
        // Later: load random or next scenario
    };

    return (
        <div className="p-6 border border-white/20 rounded-xl text-left max-w-xl mx-auto space-y-4">
            <h2 className="text-xl font-semibold">Connect the Squares</h2>

            <p>
                Which square could a <strong>{currentScenario.piece}</strong> be on to attack both{' '}
                <strong>{currentScenario.squareA}</strong> and{' '}
                <strong>{currentScenario.squareB}</strong>?
            </p>

            <SquareInput
                value={input}
                onChange={setInput}
                placeholder="Enter square (e.g. C3)"
                allowMultiple={true}
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
                    <br />
                    Correct answers: {getCorrectAnswers(currentScenario).join(', ')}
                </div>
            )}

            {(feedback === 'correct' || feedback === 'wrong') && (
                <button
                    onClick={handleNext}
                    className="mt-4 text-sm text-white/60 hover:underline"
                >
                    Try again (More scenarios coming soon)
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
