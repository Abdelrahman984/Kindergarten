import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPercentage = (count: number, total: number): string => {
  if (total === 0) return "0%";
  return `${((count / total) * 100).toFixed(0)}%`;
};
