import { useEffect, useRef, useState } from "react";
import photos from "@/assets/photos.json";

function useScrollProgress(onProgress: (progress: number) => void, leadInViewports = 0) {
  const ref = useRef<HTMLElement>(null);
  const callback = useRef(onProgress);
  callback.current = onProgress;
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        callback.current(1);
        return;
      }
      const rect = el.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const rawProgress = -rect.top / distance;
      const startProgress = -(window.innerHeight * leadInViewports) / distance;
      const progress = (rawProgress - startProgress) / (1 - startProgress);
      callback.current(Math.max(0, Math.min(1, progress)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return ref;
}

export function HeroScene() {
  const stage = useRef<HTMLDivElement>(null);
  const ref = useScrollProgress((p) => stage.current?.style.setProperty("--spread", String(Math.min(1, p * 2.8))));
  return (
    <section id="top" ref={ref} className="hero-journey grain bg-ink text-ink-foreground">
      <div className="hero-scene">
        <div className="hero-word text-outline font-display" aria-hidden="true">GYAMPO</div>
        <div ref={stage} className="portrait-stage">
          <img src={photos[24]} alt="Gyampo at a campus event" className="side-portrait side-left" loading="eager" fetchPriority="high" decoding="async" />
          <img src={photos[94]} alt="Gyampo at his graduation" className="side-portrait side-right" loading="eager" fetchPriority="high" decoding="async" />
          <img src={photos[23]} alt="Gyampo Ayeh Ebenezer Derrick in a brown suit" className="main-portrait" loading="eager" fetchPriority="high" decoding="async" />
        </div>
      </div>
    </section>
  );
}

const statement = [
  "I believe leadership is a service you can see.",
  "Laptops in students’ hands, clean washrooms, open help desks, and a voice for every fresher who walks through the gates of Legon.",
  "As a pharmacist, I bring that same spirit of service to the health and wellbeing of my community.",
];
const length = statement.join("").length;
const typingRange = 1;

export function ScrollStatement() {
  const [count, setCount] = useState(0);
  const [outside, setOutside] = useState(false);
  const [fadeVersion, setFadeVersion] = useState(0);
  const completed = useRef(false);
  const wasOutside = useRef(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const ref = useScrollProgress((progress) => {
    if (!completed.current) {
      const nextCount = Math.floor(Math.min(1, progress / typingRange) * length);
      setCount(nextCount);
      if (nextCount >= length) completed.current = true;
    }
  }, 0.45);
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (wasOutside.current && completed.current) setFadeVersion((version) => version + 1);
        wasOutside.current = false;
        setOutside(false);
      } else if (completed.current) {
        wasOutside.current = true;
        setOutside(true);
      }
    });
    observer.observe(page);
    return () => observer.disconnect();
  }, []);
  let offset = 0;
  return (
    <section ref={ref} className="statement-journey bg-background">
      <div ref={pageRef} className={`statement-page mx-auto flex max-w-5xl flex-col justify-center gap-7 px-6${outside ? " is-outside" : ""}${fadeVersion > 0 ? " is-returning" : ""}`}>
        {statement.map((text, i) => {
          const visible = text.slice(0, Math.max(0, count - offset));
          offset += text.length;
          return <p key={`${text}-${fadeVersion}`} aria-label={text} className={`statement-line font-serif ${i === 0 ? "statement-lead text-primary" : i === 1 ? "text-foreground" : "italic text-accent"}`}>
            <span aria-hidden="true" className="invisible">{text}</span>
            <span aria-hidden="true" className="typed-line">{visible}</span>
          </p>;
        })}
      </div>
    </section>
  );
}

export function useCenteredPhotos() {
  useEffect(() => {
    const media = window.matchMedia("(hover: none)");
    if (!media.matches) return;
    const strips = Array.from(document.querySelectorAll<HTMLElement>(".photo-strip"));
    const timer = setInterval(() => {
      strips.forEach((strip) => {
        const rect = strip.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const images = Array.from(strip.querySelectorAll<HTMLImageElement>("img"));
        let nearest: HTMLImageElement | undefined;
        let distance = Infinity;
        images.forEach((image) => {
          const bounds = image.getBoundingClientRect();
          const d = Math.abs(bounds.left + bounds.width / 2 - window.innerWidth / 2);
          if (d < distance) { nearest = image; distance = d; }
        });
        images.forEach((image) => image.classList.toggle("is-centered", image === nearest));
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);
}
