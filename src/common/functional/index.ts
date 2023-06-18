export * from "./authToken";

import { formatRelative } from "date-fns";

export function parseTime(date: Date): string {
  return formatRelative(date, new Date());
}

export async function delay(timeout: number): Promise<void> {
  return new Promise((res) => setTimeout(res, timeout))
}
