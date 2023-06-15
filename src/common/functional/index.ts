export * from "./authToken";

import { formatRelative } from "date-fns";

export function parseTime(date: Date): string {
  return formatRelative(date, new Date());
}
