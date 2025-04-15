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
