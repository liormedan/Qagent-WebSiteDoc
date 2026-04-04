import type { DocPageContent } from "@/lib/docs";

export const audioSandboxScenarioExamplesContent: DocPageContent = {
  slug: "audio-sandbox/scenario-examples",
  title: "Audio Sandbox Scenario Examples",
  description: "End-to-end scenarios for query, analysis, and pre-planning enrichment.",
  sections: [
    {
      title: "Scenario 1: Where did they say hello?",
      body: [
        "User input: Where did they say hello?",
        "Q interpretation: audio_query.text_search.",
        "Sandbox query: type=text, query=hello.",
        "Sandbox result: match at 42.3-42.8 sec, confidence 0.91.",
        "Q final response: reports timestamp and optional replay region.",
      ],
    },
    {
      title: "Scenario 2: Find the noisiest section",
      body: [
        "User input: Find the noisiest section.",
        "Q interpretation: audio_analysis.acoustic_peak.",
        "Sandbox query: type=acoustic, query=max_noise_segment.",
        "Sandbox result: region 115.0-121.2 sec, noiseLevel=high.",
        "Q final response: returns region and confidence with rationale.",
      ],
    },
    {
      title: "Scenario 3: Where are long silence regions?",
      body: [
        "User input: Where are long silence regions?",
        "Q interpretation: audio_query.structural_silence.",
        "Sandbox query: type=structural, query=long_silence, constraints={ minDurationSec: 3 }.",
        "Sandbox result: segments at 12-16 sec and 203-208 sec.",
        "Q final response: lists candidate regions.",
      ],
    },
    {
      title: "Scenario 4: Before denoise, check if noise exists",
      body: [
        "User input: Before denoise, check if noise exists.",
        "Q interpretation: processing request with required pre-check.",
        "Sandbox query: type=acoustic, query=noise_presence.",
        "Sandbox result: noiseLevel=low, localized at 88-92 sec.",
        "Q final response: refined intent suggests targeted denoise only for that region.",
      ],
    },
  ],
};