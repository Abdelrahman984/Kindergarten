import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// merge and deduplicate class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// percentage calculation
export const getPercentage = (count: number, total: number): string => {
  if (total === 0) return "0%";
  return `${((count / total) * 100).toFixed(0)}%`;
};

// avatar colors
export const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-indigo-500",
  "bg-cyan-500",
];

export function getColorIndex(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % avatarColors.length;
}
