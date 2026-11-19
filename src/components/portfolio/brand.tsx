import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export const NAME_DISPLAY_MS = 3000;
const FULL_NAME = "Gyampo Ayeh Ebenezer Derrick";

export function Brand() {
  const [expanded, setExpanded] = useState(false);
  const [letters, setLetters] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!expanded) { setLetters(0); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLetters(FULL_NAME.length);
      return;
    }
    const interval = setInterval(() => setLetters((n) => Math.min(n + 1, FULL_NAME.length)), 24);
    return () => clearInterval(interval);
  }, [expanded]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function tap() {
    if (timer.current) clearTimeout(timer.current);
    setExpanded(true);
    timer.current = setTimeout(() => setExpanded(false), NAME_DISPLAY_MS);
  }

  return (
    <Button variant="ghost" aria-label={FULL_NAME} aria-expanded={expanded}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") setExpanded(true); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") setExpanded(false); }}
      onFocus={() => setExpanded(true)} onBlur={() => setExpanded(false)} onClick={tap}
      className={`brand h-auto justify-start rounded-none p-0 font-display text-ink-foreground hover:bg-transparent hover:text-secondary ${expanded ? "brand-expanded" : ""}`}>
      <span>{expanded ? FULL_NAME.slice(0, letters) : "G.A.E.D"}</span>
    </Button>
  );
}