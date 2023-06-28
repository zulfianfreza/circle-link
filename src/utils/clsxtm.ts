import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function clsxtm(...input: ClassValue[]) {
  return twMerge(clsx(...input));
}
