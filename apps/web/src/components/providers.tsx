"use client";

import { Toaster } from "@bio/ui/components/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useRef, useState } from "react";

import { queryClient } from "@/utils/orpc";

import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        {children}
        <CustomCursor />
        <ReactQueryDevtools />
      </QueryClientProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
}

function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [suppressed, setSuppressed] = useState(false);
  const [pressed, setPressed] = useState(false);
  const visibleRef = useRef(false);
  const suppressedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("matchMedia" in window)) {
      setEnabled((navigator.maxTouchPoints ?? 0) === 0);
      return;
    }

    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const wrapEl = wrapRef.current;
    if (!enabled || !wrapEl) return;

    document.documentElement.dataset.customCursor = "on";

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-bio-custom-cursor", "true");
    styleEl.textContent = `
      @media (pointer: fine) {
        html[data-custom-cursor="on"], html[data-custom-cursor="on"] * { cursor: none !important; }
        html[data-custom-cursor="on"] input,
        html[data-custom-cursor="on"] textarea,
        html[data-custom-cursor="on"] select,
        html[data-custom-cursor="on"] [contenteditable="true"] { cursor: text !important; }
      }
    `;
    document.head.appendChild(styleEl);

    const onPointerMove = (e: PointerEvent) => {
      wrapEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      const target = e.target as HTMLElement | null;
      const suppress =
        !!target?.closest("input, textarea, select, option") || !!target?.closest("[contenteditable='true']");
      if (suppress !== suppressedRef.current) {
        suppressedRef.current = suppress;
        setSuppressed(suppress);
      }
    };

    const onPointerLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const onPointerEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };
    const onPointerDown = () => setPressed(true);
    const onPointerUp = () => setPressed(false);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointerenter", onPointerEnter);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    return () => {
      delete document.documentElement.dataset.customCursor;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerenter", onPointerEnter);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      styleEl.remove();
    };
  }, [enabled]);

  if (!enabled) return null;

  const cursorOpacity = visible && !suppressed ? 1 : 0;
  const cursorScale = pressed ? 0.92 : 1;

  return (
    <div
      ref={wrapRef}
      data-visible={visible ? "true" : "false"}
      data-suppressed={suppressed ? "true" : "false"}
      data-pressed={pressed ? "true" : "false"}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2147483647,
        pointerEvents: "none",
        transform: "translate3d(-100px, -100px, 0)",
        willChange: "transform",
      }}
    >
      <div
        style={{
          position: "relative",
          height: 56,
          width: 56,
          borderRadius: 9999,
          background: "rgba(0, 0, 0, 0.88)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.18), 0 14px 30px rgba(0,0,0,0.25)",
          opacity: cursorOpacity,
          transform: `scale(${cursorScale})`,
          transition: "opacity 150ms ease, transform 140ms ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: 2,
            width: 14,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.92)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: 14,
            width: 2,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.92)",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}
