"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function AutoAdvanceOnBottom({ nextHref }: { nextHref?: string }) {
  const router = useRouter();
  const cooldownRef = useRef(0);

  useEffect(() => {
    if (!nextHref) return;

    function onWheel(event: WheelEvent) {
      if (event.deltaY <= 20) return;
      const now = Date.now();
      if (now - cooldownRef.current < 1200) return;

      const scrolled = window.scrollY + window.innerHeight;
      const bottom = document.documentElement.scrollHeight - 8;
      if (scrolled < bottom) return;
      if (!nextHref) return;

      cooldownRef.current = now;
      router.push(nextHref);
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [nextHref, router]);

  return null;
}
