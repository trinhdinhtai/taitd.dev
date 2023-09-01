import { Post } from "@/.contentlayer/generated";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { compareDesc } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sortByDate = (a: Post, b: Post) =>
  compareDesc(
    new Date(a.lastUpdatedDate || a.publishedDate),
    new Date(b.lastUpdatedDate || b.publishedDate),
  );

export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200; // Average humans read about 200-250 words per minute.
  const noOfWords = text.split(/\s/g).length;

  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);

  return readTime;
};
