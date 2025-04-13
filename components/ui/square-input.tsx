'use client';
import { useState, useEffect } from 'react';

type SquareInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  allowMultiple?: boolean;
};

const isValidSquare = (sq: string) => /^[A-H][1-8]$/.test(sq);

export const SquareInput = ({
  value,
  onChange,
  placeholder = 'Enter square(s)',
  allowMultiple = false,
}: SquareInputProps) => {
  const [input, setInput] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    // Normalize input: turn spaces into commas, remove extras
    const raw = input.toUpperCase().replace(/\s+/g, ',');
    const cleanedSquares = raw
      .split(',')
      .map((sq) => sq.trim())
      .filter(Boolean);

    if (allowMultiple) {
      const allValid = cleanedSquares.every(isValidSquare);
      setIsValid(allValid);
      onChange(cleanedSquares.join(','));
    } else {
      // Must be exactly one valid square
      const valid = cleanedSquares.length === 1 && isValidSquare(cleanedSquares[0]);
      setIsValid(valid);
      onChange(cleanedSquares[0] || '');
    }
  }, [input, allowMultiple, onChange]);

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
          {allowMultiple
            ? 'Enter valid squares (A1–H8), separated by space or comma.'
            : 'Enter one valid square (A1–H8). Do not enter multiple.'}
        </p>
      )}
    </div>
  );
};
