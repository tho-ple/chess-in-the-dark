'use client';
import { useState, useEffect } from 'react';
import { isValidSquare, splitSquares } from '@/lib/utils';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SingleSquareInput = ({ value, onChange, placeholder = 'Enter square' }: Props) => {
  const [input, setInput] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setInput(value);
  }, [value]);

  useEffect(() => {
    const squares = splitSquares(input.toUpperCase().trim());
  
    if (squares.length === 0) {
      setIsValid(true);
      onChange('');
      return;
    }
  
    const valid = squares.length === 1 && isValidSquare(squares[0]);
    setIsValid(valid);
    onChange(valid ? squares[0] : '');
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
          Enter one valid square (A1–H8). Do not enter multiple.
        </p>
      )}
    </div>
  );
};
