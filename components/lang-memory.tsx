"use client";

import { useEffect } from "react";
import { LANG_SWITCH_KEY, normalizePath } from "@/lib/i18n";

/**
 * After a language switch, put the visitor back at the same relative scroll position
 * so the change feels like the page swapped language in place.
 */
export function LangMemory() {
  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = sessionStorage.getItem(LANG_SWITCH_KEY);
      sessionStorage.removeItem(LANG_SWITCH_KEY);
    } catch {
      return;
    }
    if (!raw) return;

    let data: { path?: string; ratio?: number };
    try {
      data = JSON.parse(raw);
    } catch {
      return;
    }
    if (normalizePath(data.path ?? "") !== normalizePath(window.location.pathname)) return;
    const ratio = Math.min(1, Math.max(0, Number(data.ratio) || 0));
    if (ratio === 0) return;

    const restore = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: ratio * max, behavior: "instant" as ScrollBehavior });
    };

    // Lazy images change the page height after the first jump, so keep re-applying the
    // position while the layout settles — but stop as soon as the visitor scrolls themselves.
    const observer = new ResizeObserver(restore);
    const stop = () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      userEvents.forEach((type) => window.removeEventListener(type, stop));
    };
    const userEvents = ["wheel", "touchstart", "keydown", "mousedown"] as const;
    userEvents.forEach((type) => window.addEventListener(type, stop, { passive: true }));
    const timeout = window.setTimeout(stop, 2000);

    requestAnimationFrame(() => {
      restore();
      observer.observe(document.body);
    });
    return stop;
  }, []);

  return null;
}
