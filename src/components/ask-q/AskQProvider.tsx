"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { assembleAskQContext } from "@/lib/askQRetrieval";
import type { AskQSource } from "@/lib/askQRetrieval";
import type { AskQSuggestion } from "@/lib/ask-q/guidedSuggestions";
import { isAskQResponseMode, type AskQResponseMode } from "@/lib/ask-q/responseMode";

export type AskQMessageRole = "user" | "assistant";

export type AskQMessage = {
  id: string;
  role: AskQMessageRole;
  content: string;
  createdAt: number;
  sources?: readonly AskQSource[];
  /** Present on assistant messages from /api/ask-q or client fallback. */
  mode?: AskQResponseMode;
  /** Server-computed 0–1 from catalog hit strength (optional on client-only paths). */
  confidence?: number;
  /** Grounded next-step links from the guided engine (optional). */
  suggestions?: readonly AskQSuggestion[];
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
  const pathname = usePathname() ?? "";
  const messagesRef = useRef<AskQMessage[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [messages, setMessages] = useState<AskQMessage[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      content:
        "**Q Doc Agent** answers only from WaveQ’s official documentation signals (glossary, terminology registry, and docs index). It is not a general assistant. When the server can use the language model, replies stay grounded in those excerpts; links appear under **Sources**. If the request fails, you still get a catalog-based summary here on the client.",
      createdAt: Date.now(),
    },
  ]);
  const [composing, setComposing] = useState(false);
  const inFlightRef = useRef(false);
  messagesRef.current = messages;

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

    const NOTICE =
      "Something went wrong — showing a documentation-catalog summary below (Q Doc Agent safety fallback).";

    try {
      const historyPayload = messagesRef.current
        .filter((m) => m.id !== "welcome")
        .slice(-4)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/ask-q", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: body,
          pathname: pathname.trim() || undefined,
          ...(historyPayload.length ? { history: historyPayload } : {}),
        }),
      });
      const data: unknown = await res.json().catch(() => null);
      const record = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
      const answer = typeof record.answer === "string" ? record.answer : null;
      const sources = Array.isArray(record.sources) ? record.sources : null;
      const modeRaw = record.mode;
      const mode = isAskQResponseMode(modeRaw) ? modeRaw : undefined;
      const confRaw = record.confidence;
      const confidence =
        typeof confRaw === "number" && Number.isFinite(confRaw) ? Math.min(1, Math.max(0, confRaw)) : undefined;

      const rawSuggestions = record.suggestions;
      let suggestions: AskQSuggestion[] | undefined;
      if (Array.isArray(rawSuggestions)) {
        const parsed: AskQSuggestion[] = [];
        for (const x of rawSuggestions) {
          if (!x || typeof x !== "object") continue;
          const o = x as Record<string, unknown>;
          if (typeof o.label !== "string" || !o.label.trim()) continue;
          const label = o.label.trim();
          const hrefRaw = o.href;
          const href =
            typeof hrefRaw === "string" && hrefRaw.startsWith("/docs/") ? hrefRaw.split("#")[0] : undefined;
          const reason = typeof o.reason === "string" ? o.reason.trim() : undefined;
          parsed.push({ label, href, reason });
          if (parsed.length >= 2) break;
        }
        if (parsed.length) suggestions = parsed;
      }

      const normalizedSources = sources
        ?.filter((s): s is { href: string; title: string } => {
          if (!s || typeof s !== "object") return false;
          const o = s as Record<string, unknown>;
          return typeof o.href === "string" && typeof o.title === "string";
        })
        .map((s) => ({ href: s.href, title: s.title }));

      if (answer?.trim()) {
        setMessages((prev) => [
          ...prev,
          {
            id: assistantId,
            role: "assistant",
            content: answer,
            sources: normalizedSources && normalizedSources.length > 0 ? normalizedSources : undefined,
            mode,
            confidence,
            suggestions,
            createdAt: Date.now(),
          },
        ]);
        return;
      }

      const { answer: localAnswer, sources: localSources } = assembleAskQContext(body, {
        pathname: pathname.trim() || undefined,
      });
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: `${NOTICE}\n\n${localAnswer}`,
          sources: localSources,
          mode: "client_fallback",
          createdAt: Date.now(),
        },
      ]);
    } catch {
      const { answer, sources } = assembleAskQContext(body, {
        pathname: pathname.trim() || undefined,
      });
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: `${NOTICE}\n\n${answer}`,
          sources,
          mode: "client_fallback",
          createdAt: Date.now(),
        },
      ]);
    } finally {
      inFlightRef.current = false;
      setComposing(false);
    }
  }, [pathname]);

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
