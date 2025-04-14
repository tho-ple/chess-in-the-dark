'use client';
import { useState, useEffect } from 'react';
import { SquareInput } from '@/components/ui/square-input';
import { getRandomScenario } from '@/lib/utils';
import { ConnectSquaresScenario } from '@/types/exercise-types';
import { scenarios } from '@/data/connect-squares-scenarios';
import { ToggleBoardButton } from '../ToggleBoardButton';


export const ConnectSquaresExercise = () => {
    const [currentScenario, setCurrentScenario] = useState(() =>
        getRandomScenario(scenarios)
    );
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
        setCurrentScenario(getRandomScenario(scenarios));;
    };

    useEffect(() => {
        if (feedback === 'correct') {
            const timer = setTimeout(() => {
                handleNext();
            }, 1000); // delay in milliseconds
            return () => clearTimeout(timer);
        }
    }, [feedback]);

    return (
        <div className="p-6 border border-white/20 rounded-xl text-left max-w-xl mx-auto space-y-4">
            <h2 className="text-xl font-semibold">Connect the Squares</h2>

            <p className="text-lg">
                From which square can a <strong>{currentScenario.piece}</strong> attack{' '}
                <strong>{currentScenario.squareA}</strong> and{' '}
                <strong>{currentScenario.squareB}</strong>
                {currentScenario.squareC && (
                    <>
                        {' '}and <strong>{currentScenario.squareC}</strong>
                    </>
                )}
                ?
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

            {(feedback === 'wrong') && (
                <button
                    onClick={handleNext}
                    className="mt-4 text-sm text-white/60 hover:underline"
                >
                    Try again
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
