import type { DocPageContent } from "@/lib/docs";

export const audioSandboxSessionModelContent: DocPageContent = {
  slug: "audio-sandbox/session-model",
  title: "Audio Sandbox Session Model",
  description: "Session contract for audio file lifecycle inside sandbox.",
  sections: [
    {
      title: "Session Contract",
      body: [
        "Session is created when a file is loaded into sandbox.",
        "Q can query only when session status is ready or scanning.",
      ],
      code: `interface AudioSandboxSession {
  sessionId: string;
  fileId: string;
  durationSec: number;
  sampleRateHz?: number;
  channels?: number;
  status: "idle" | "loading" | "ready" | "scanning" | "error";
}`,
    },
    {
      title: "Lifecycle Notes",
      body: [
        "loading -> ready after decode + index initialization.",
        "scanning is transient during query execution.",
        "error blocks query responses until recovery/reload.",
      ],
    },
  ],
};