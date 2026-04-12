/**
 * Daily Gemini usage cap (UTC day), persisted under `data/ask-q-gemini-daily.json`.
 * On multi-instance or read-only serverless FS, counts may reset or diverge — use a shared store for strict global caps.
 */
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const USAGE_FILE = path.join(DATA_DIR, "ask-q-gemini-daily.json");

type UsageFile = {
  /** UTC calendar date `YYYY-MM-DD` — quota resets at next UTC midnight. */
  day: string;
  count: number;
};

function utcDayString(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Max successful Gemini-backed Ask Q replies per UTC day (reserved slot before the call). */
export function getGeminiDailyMax(): number {
  const raw = process.env.ASK_Q_GEMINI_DAILY_MAX?.trim();
  if (!raw) return 100;
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) return 100;
  return Math.min(n, 100_000);
}

async function readUsage(): Promise<UsageFile> {
  try {
    const raw = await readFile(USAGE_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      "day" in parsed &&
      "count" in parsed &&
      typeof (parsed as UsageFile).day === "string" &&
      typeof (parsed as UsageFile).count === "number"
    ) {
      return { day: (parsed as UsageFile).day, count: Math.max(0, (parsed as UsageFile).count) };
    }
  } catch {
    /* missing or invalid */
  }
  return { day: utcDayString(), count: 0 };
}

async function writeUsage(data: UsageFile): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(USAGE_FILE, JSON.stringify(data), "utf8");
}

/**
 * Reserves one slot for a Gemini call (counts against daily max before the network request).
 * Call {@link releaseGeminiDailySlot} if the request fails before a successful response.
 */
export async function reserveGeminiDailySlot(): Promise<{ ok: true } | { ok: false; day: string; count: number; max: number }> {
  const max = getGeminiDailyMax();
  let data = await readUsage();
  const day = utcDayString();
  if (data.day !== day) {
    data = { day, count: 0 };
  }
  if (data.count >= max) {
    return { ok: false, day, count: data.count, max };
  }
  data = { day, count: data.count + 1 };
  await writeUsage(data);
  return { ok: true };
}

/** Undo a reserved slot when Gemini fails after reserve. */
export async function releaseGeminiDailySlot(): Promise<void> {
  let data = await readUsage();
  const day = utcDayString();
  if (data.day !== day) return;
  data = { day, count: Math.max(0, data.count - 1) };
  await writeUsage(data);
}
