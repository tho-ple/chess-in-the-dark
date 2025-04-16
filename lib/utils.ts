import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRandomScenario = <T>(scenarios: T[]): T => {
  const index = Math.floor(Math.random() * scenarios.length);
  return scenarios[index];
};

export const isValidSquare = (sq: string) => /^[A-H][1-8]$/.test(sq);

export const normalizeInput = (input: string) =>
  input.toUpperCase().replace(/[, ]+/g, ',').trim();

export const splitSquares = (input: string) =>
  normalizeInput(input)
    .split(',')
    .map((sq) => sq.trim())
    .filter(Boolean);

export const getKnightMovesFrom = (square: string): string[] => {
  const file = square[0].toUpperCase().charCodeAt(0);
  const rank = parseInt(square[1]);

  const deltas = [
    [1, 2], [2, 1], [2, -1], [1, -2],
    [-1, -2], [-2, -1], [-2, 1], [-1, 2],
  ];

  const moves: string[] = [];

  for (const [df, dr] of deltas) {
    const f = file + df;
    const r = rank + dr;
    if (f >= 65 && f <= 72 && r >= 1 && r <= 8) {
      moves.push(String.fromCharCode(f) + r);
    }
  }

  return moves;
};

export const isKnightMove = (from: string, to: string): boolean => {
  const fileDiff = Math.abs(from.charCodeAt(0) - to.charCodeAt(0));
  const rankDiff = Math.abs(parseInt(from[1]) - parseInt(to[1]));
  return (fileDiff === 1 && rankDiff === 2) || (fileDiff === 2 && rankDiff === 1);
};

export const generateKnightTour = (length: number): string[] => {
  const isOnBoard = (f: number, r: number) => f >= 0 && f < 8 && r >= 0 && r < 8;
  const toCoords = (square: string) => [square.charCodeAt(0) - 65, parseInt(square[1]) - 1];
  const toSquare = (f: number, r: number) => String.fromCharCode(f + 65) + (r + 1);

  const knightMoves = [
    [1, 2], [2, 1], [2, -1], [1, -2],
    [-1, -2], [-2, -1], [-2, 1], [-1, 2],
  ];

  const getRandomSquare = () => 
    String.fromCharCode(65 + Math.floor(Math.random() * 8)) + (1 + Math.floor(Math.random() * 8));

  let start = getRandomSquare();

  const [startF, startR] = toCoords(start);
  const queue: [number, number, string[]][] = [[startF, startR, [start]]];
  const validPaths: string[][] = [];

  while (queue.length > 0) {
    const [f, r, path] = queue.shift()!;
    
    if (path.length === length) {
      validPaths.push(path);
      continue;
    }

    for (const [df, dr] of knightMoves) {
      const nf = f + df;
      const nr = r + dr;
      const next = toSquare(nf, nr);

      if (isOnBoard(nf, nr) && !path.includes(next)) {
        queue.push([nf, nr, [...path, next]]);
      }
    }
  }

  if (validPaths.length === 0) {
    // fallback: try again recursively
    return generateKnightTour(length);
  }

  return validPaths[Math.floor(Math.random() * validPaths.length)];
};
