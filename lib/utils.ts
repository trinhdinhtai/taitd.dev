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
