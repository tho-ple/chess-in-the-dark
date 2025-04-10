import { FadeHeader } from '@/components/FadeHeader';
import { ExerciseList } from '@/components/ExerciseList';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <FadeHeader />
      <ExerciseList />
    </main>
  );
}
