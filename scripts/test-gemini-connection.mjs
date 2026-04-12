#!/usr/bin/env node
/**
 * בדיקת חיבור ל-Gemini (אותו SDK כמו בפרויקט).
 *
 * שימוש:
 *   npm run test:gemini
 *   npm run test:gemini -- "הודעה משלך"
 *
 * דורש GEMINI_API_KEY (מומלץ ב-.env.local — הסקריפט טוען אותו אוטומטית).
 * אופציונלי: GEMINI_MODEL (ברירת מחדל כמו באפליקציה: gemini-3-flash-preview)
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const DEFAULT_MODEL = "gemini-3-flash-preview";

function parseEnvFile(text) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  for (const rawLine of text.split(/\r?\n/)) {
    let line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    if (line.toLowerCase().startsWith("export ")) line = line.slice(7).trim();
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (key) process.env[key] = val;
  }
}

function loadEnvFiles() {
  for (const name of [".env.local", ".env"]) {
    const p = join(process.cwd(), name);
    if (!existsSync(p)) continue;
    parseEnvFile(readFileSync(p, "utf8"));
  }
}

loadEnvFiles();

const apiKey = process.env.GEMINI_API_KEY?.trim();
const modelName = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
const userMessage =
  process.argv.slice(2).join(" ").trim() ||
  "Reply in one short sentence: confirm you received this connectivity test for WaveQ docs.";

async function main() {
  if (!apiKey) {
    const hasLocal = existsSync(join(process.cwd(), ".env.local"));
    const hasEnv = existsSync(join(process.cwd(), ".env"));
    console.error("חסר GEMINI_API_KEY.");
    console.error(
      hasLocal || hasEnv
        ? "נמצא .env.local / .env אבל המפתח ריק, בשם שגה, או בשורה שמתחילה ב־# (הערה). צריך שורה: GEMINI_API_KEY=... בשורה אחת מלאה."
        : "צור .env.local בשורש הפרויקט עם: GEMINI_API_KEY=...",
    );
    process.exit(1);
  }

  console.log("מפתח נטען, אורך תווים:", apiKey.length, "(בדיקה בלבד — לא מדפיסים את המפתח)");
  console.log("מודל:", modelName);
  console.log("שולח:", userMessage);
  console.log("---");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName });

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const result = await model.generateContent(userMessage);
      const text = result.response.text()?.trim();
      if (text) {
        console.log("תשובה:");
        console.log(text);
        return;
      }
    } catch (e) {
      const msg = String(e?.message || e);
      const retryable = /503|429|UNAVAILABLE|RESOURCE_EXHAUSTED|high demand/i.test(msg);
      if (retryable && attempt < 3) {
        const wait = 2000 * attempt;
        console.warn(`ניסיון ${attempt} נכשל (עומס זמני). ממתין ${wait / 1000}s…`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      throw e;
    }
  }
  console.error("תשובה ריקה מהמודל.");
  process.exit(2);
}

main().catch((err) => {
  console.error("שגיאה:", err?.message || err);
  process.exit(3);
});
