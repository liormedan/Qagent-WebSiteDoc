import type { DocPageContent } from "@/lib/docs";

export const audioComparisonCanvasUiContent: DocPageContent = {
  slug: "audio-comparison/canvas-ui",
  title: "Audio Comparison Canvas UI",
  description: "Canvas-first UI contract for visualizing A/B waveform changes and driving user decisions.",
  sections: [
    {
      title: "Canvas Components",
      body: [
        "Waveform A/B overlay: stacked or blended waveforms for direct visual contrast.",
        "Split view: side-by-side waveform panes aligned on shared timeline.",
        "Highlighted regions: emphasized intervals where differences were detected.",
        "Change markers: clickable timeline markers mapped to AudioDifference items.",
        "Comparison summary panel: fixed panel with total differences, high-impact count, and recommendation.",
      ],
      code: `interface ComparisonCanvasComponents {
  waveformOverlay: true
  splitView: true
  highlightedRegions: true
  changeMarkers: true
  comparisonSummaryPanel: true
}`,
    },
    {
      title: "UI States",
      body: [
        "original: only source waveform and baseline metadata are visible.",
        "processed: processed waveform preview without active A/B controls.",
        "comparing: dual-version controls, differences, and markers are active.",
      ],
      code: `type ComparisonUiState = 'original' | 'processed' | 'comparing'`,
    },
    {
      title: "Visual Rules",
      body: [
        "Impact to color mapping is fixed for consistent risk signaling across pages.",
        "Marker size scales by impact so high-impact changes are visually prioritized.",
        "Highlight style uses alpha overlays to preserve waveform readability.",
      ],
      code: `impact -> color
low -> blue
medium -> yellow
high -> red

marker size rules
low -> 8px
medium -> 12px
high -> 16px

highlight style
low -> 20% alpha fill
medium -> 32% alpha fill + thin border
high -> 44% alpha fill + strong border`,
    },
    {
      title: "User Actions",
      body: [
        "toggle A/B: switch active listening target while preserving cursor.",
        "play segment: play selected difference region.",
        "zoom difference: zoom canvas to a marker's region.",
        "accept version: mark compared version as selected outcome.",
        "revert: return to base or prior accepted version.",
      ],
      code: `type ComparisonUserAction =
  | 'toggle_ab'
  | 'play_segment'
  | 'zoom_difference'
  | 'accept_version'
  | 'revert'`,
    },
    {
      title: "Comparison Summary Panel Contract",
      body: [
        "Summary panel is the primary decision context above the marker list.",
        "It must always reflect the currently active comparison pair.",
      ],
      code: `interface ComparisonSummaryPanel {
  totalDifferences: number
  highImpactCount: number
  recommendation: string
}`,
    },
  ],
};
