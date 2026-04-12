"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { assembleAskQContext } from "@/lib/askQRetrieval";
import type { AskQSource } from "@/lib/askQRetrieval";

export type AskQMessageRole = "user" | "assistant";

export type AskQMessage = {
  id: string;
  role: AskQMessageRole;
  content: string;
  createdAt: number;
  sources?: readonly AskQSource[];
};

type AskQContextValue = {
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
  messages: AskQMessage[];
  sendMessage: (text: string) => void;
  composing: boolean;
  panelTitleId: string;
};

const AskQContext = createContext<AskQContextValue | null>(null);

export function AskQProvider({ children }: { children: ReactNode }) {
  const panelTitleId = useId();
  const [panelOpen, setPanelOpen] = useState(false);
  const [messages, setMessages] = useState<AskQMessage[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      content:
        "Ask Q sends your question to the docs site server: it retrieves glossary, terminology registry, and nav matches, then (when GEMINI_API_KEY is set) asks Gemini to answer in natural language using only that context. Sources always come from retrieval. If the API is unavailable, answers fall back to retrieval-only text on the client.",
      createdAt: Date.now(),
    },
  ]);
  const [composing, setComposing] = useState(false);
  const inFlightRef = useRef(false);

  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);
  const togglePanel = useCallback(() => setPanelOpen((o) => !o), []);

  const sendMessage = useCallback(async (text: string) => {
    const body = text.trim();
    if (!body || inFlightRef.current) return;
    inFlightRef.current = true;
    setComposing(true);

    const userId = `u-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", content: body, createdAt: Date.now() },
    ]);

    const assistantId = `a-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    try {
      const res = await fetch("/api/ask-q", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: body }),
      });
      const data: unknown = await res.json().catch(() => null);
      const record = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
      const answer = typeof record.answer === "string" ? record.answer : null;
      const sources = Array.isArray(record.sources) ? record.sources : null;

      if (!res.ok || !answer) {
        throw new Error(typeof record.error === "string" ? record.error : `ask-q ${res.status}`);
      }

      const normalizedSources = sources
        ?.filter((s): s is { href: string; title: string } => {
          if (!s || typeof s !== "object") return false;
          const o = s as Record<string, unknown>;
          return typeof o.href === "string" && typeof o.title === "string";
        })
        .map((s) => ({ href: s.href, title: s.title }));

      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: answer,
          sources: normalizedSources && normalizedSources.length > 0 ? normalizedSources : undefined,
          createdAt: Date.now(),
        },
      ]);
    } catch {
      const { answer, sources } = assembleAskQContext(body);
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: answer,
          sources,
          createdAt: Date.now(),
        },
      ]);
    } finally {
      inFlightRef.current = false;
      setComposing(false);
    }
  }, []);

  const value = useMemo<AskQContextValue>(
    () => ({
      panelOpen,
      openPanel,
      closePanel,
      togglePanel,
      messages,
      sendMessage,
      composing,
      panelTitleId,
    }),
    [panelOpen, openPanel, closePanel, togglePanel, messages, sendMessage, composing, panelTitleId],
  );

  return <AskQContext.Provider value={value}>{children}</AskQContext.Provider>;
}

export function useAskQ(): AskQContextValue {
  const ctx = useContext(AskQContext);
  if (!ctx) throw new Error("useAskQ must be used within AskQProvider");
  return ctx;
}
