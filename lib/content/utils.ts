import { contentConfig } from "../constants";

/**
 * Calculates estimated reading time based on word count.
 */
export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / contentConfig.wordsPerMinute);
}
