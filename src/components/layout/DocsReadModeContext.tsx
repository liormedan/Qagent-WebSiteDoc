"use client";

import { createContext, useContext } from "react";

export type DocsReadMode = "overview" | "technical";

export type DocsReadModeContextValue = {
  mode: DocsReadMode;
  setMode: (mode: DocsReadMode) => void;
};

const DocsReadModeContext = createContext<DocsReadModeContextValue | null>(null);

export function DocsReadModeProvider({ value, children }: { value: DocsReadModeContextValue; children: React.ReactNode }) {
  return <DocsReadModeContext.Provider value={value}>{children}</DocsReadModeContext.Provider>;
}

export function useDocsReadMode(): DocsReadModeContextValue {
  const context = useContext(DocsReadModeContext);
  if (!context) {
    return {
      mode: "overview",
      setMode: () => undefined,
    };
  }
  return context;
}
