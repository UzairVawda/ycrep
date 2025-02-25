import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatNumber(totalViews: number) {
  return totalViews > 1 ? `${totalViews} views` : `${totalViews} view`;
}
