import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeHeader } from '@/components/FadeHeader';


// Placeholder for exercise component
const BlindfoldExercise = () => {
  return (
    <Card className="bg-black text-white p-4 mb-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-2">Exercise 1: Knight Path</h2>
        <p>Visualize the path of a knight from e4 to g5 in 3 moves without seeing the board.</p>
        <Button className="mt-2 bg-white text-black hover:bg-gray-200">Start Exercise</Button>
      </CardContent>
    </Card>
  );
};

// Component for listing all exercises
const ExerciseList = () => {
  const exercises = [
    { id: 1, name: "Knight Path", component: <BlindfoldExercise /> },
    // Additional exercises can be added here
  ];

  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <div key={exercise.id}>{exercise.component}</div>
      ))}
    </div>
  );
};

// Main page layout
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <FadeHeader />
      <ExerciseList />
    </main>
  );
}
