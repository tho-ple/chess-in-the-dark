'use client';
import { useState, useEffect } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const isValidSquare = (sq: string) => /^[A-H][1-8]$/.test(sq);

export const MultiSquareInput = ({
  value,
  onChange,
  placeholder = 'Enter squares (e.g. A1, C3)',
}: Props) => {
  const [input, setInput] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setInput(value);
  }, [value]);

  useEffect(() => {
    const raw = input.toUpperCase().replace(/\s+/g, ',');
    const squares = raw
      .split(',')
      .map((sq) => sq.trim())
      .filter(Boolean);

    const allValid = squares.every(isValidSquare);
    setIsValid(allValid);
    onChange(squares.join(','));
  }, [input, onChange]);

  return (
    <div className="w-full">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className={`w-full p-2 bg-black border ${
          isValid ? 'border-white/30' : 'border-red-500'
        } rounded text-white placeholder-white/40`}
      />
      {!isValid && (
        <p className="text-sm text-red-500 mt-1">
          Enter valid squares (A1–H8), separated by commas or spaces.
        </p>
      )}
    </div>
  );
};
