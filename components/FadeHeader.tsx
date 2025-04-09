// components/FadeHeader.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from "next/link";

export const FadeHeader = () => {
  const [fadeChess, setFadeChess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeChess(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">
        <span className="relative inline-block mr-2">
          <span
            className={`transition-opacity duration-2000 ${fadeChess ? 'opacity-0' : 'opacity-100'
              }`}
          >
            <Link href="/">
              Chess
            </Link>
          </span>
          <span
            className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-white"
            aria-hidden
          />
        </span>
        in the Dark
      </h1>
      <p className="text-lg mb-6">
        Train your blindfold chess skills with a series of focused exercises.
      </p>
    </div>
  );
};
