import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRandomScenario = <T>(scenarios: T[]): T => {
  const index = Math.floor(Math.random() * scenarios.length);
  return scenarios[index];
};
