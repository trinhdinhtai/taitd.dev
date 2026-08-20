import { format, parseISO } from "date-fns"

/** Formats a date as `yyyy/MM/dd`. */
export function formatDate(date: string | Date): string {
  return format(typeof date === "string" ? parseISO(date) : date, "yyyy/MM/dd")
}
