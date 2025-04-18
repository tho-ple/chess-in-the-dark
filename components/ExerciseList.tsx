'use client';
import { useState } from 'react';
import { ColorSquareExercise } from './exercises/ColorsSquareExercise';
import { SafeAttackExercise } from './exercises/SafeAttackExercise';
import { ConnectSquaresExercise } from './exercises/ConnectSquaresExercise';
import { KnightTourExercise } from './exercises/KnightTourExercise';

type ExerciseItem = {
  name: string;
  description: string;
  component: React.JSX.Element;
};

const exercises: ExerciseItem[] = [
  {
    name: 'Color of the Square',
    description: 'Identify whether the given square is black or white.',
    component: <ColorSquareExercise />,
  },
  {
    name: 'Safe Attack',
    description:
      'Choose the square where your piece can attack safely without being captured.',
    component: <SafeAttackExercise />,
  },
  {
    name: 'Connect the Squares',
    description: 'Find a square from which the given piece can attack two targets.',
    component: <ConnectSquaresExercise />,
  },
  {
    name: 'Knight Tour',
    description: 'Find the square the Knight need to pass to reach the other square.',
    component: <KnightTourExercise />,
  },
];

export const ExerciseList = () => {
  const [selectedExercise, setSelectedExercise] = useState<null | ExerciseItem>(null);

  return (
    <div>
      {!selectedExercise ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Select an Exercise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercises.map((exercise) => (
              <button
                key={exercise.name}
                onClick={() => setSelectedExercise(exercise)}
                className="text-left p-6 border border-white/20 rounded-xl hover:bg-white/10 hover:shadow-lg shadow-white/10 transition"
              >
                <h3 className="text-lg font-semibold mb-1">{exercise.name}</h3>
                <p className="text-sm text-white/60">{exercise.description}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedExercise(null)}
            className="text-sm text-white/60 hover:underline"
          >
            ← Back to exercise list
          </button>
          {selectedExercise.component}
        </div>
      )}
    </div>
  );
};
