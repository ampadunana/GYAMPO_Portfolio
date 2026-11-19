import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import photos from "@/assets/photos.json";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/portfolio/brand";
import { HeroScene, ScrollStatement, useCenteredPhotos } from "@/components/portfolio/scroll-scenes";
import { contact } from "@/lib/contact";
import { Mail, Phone, Linkedin, ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gyampo Ayeh Ebenezer Derrick | Student Leader & Pharmacist" },
      { name: "description", content: "Portfolio of Gyampo Ayeh Ebenezer Derrick: 68th UGSRC Vice President, JCR President and Doctor of Pharmacy, University of Ghana." },
      { property: "og:title", content: "Gyampo Ayeh Ebenezer Derrick | Portfolio" },
      { property: "og:description", content: "Leadership, service and pharmacy at the University of Ghana." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const P = photos as string[];

const chapters = [
  {
    no: "01", kicker: "The Leader", title: "Leading together, achieving more.",
    body: "From JCR President of Jean Nelson Aka Hall to the 68th Vice President of the University of Ghana SRC. Building a campus where every student is heard.",
    imgs: [31, 16, 29] as const,
  },
  {
    no: "02", kicker: "The Pharmacist", title: "In a white coat.",
    body: "Doctor of Pharmacy, School of Pharmacy, College of Health Sciences. Health drives and screenings.",
    imgs: [22, 25, 94] as const,
  },
  {
    no: "03", kicker: "The Advocate", title: "A seat at every table.",
    body: "Young emerging political leader with WYDE and ENoP, speaker at summits and conferences across Ghana and beyond.",
    imgs: [34, 43, 35] as const,
  },
];

const impact = [
  { n: 100, s: "", l: "laptops donated | One Student, One Laptop" },
  { n: 68, s: "th", l: "UGSRC administration, serving as Vice President" },
  { n: 97, s: "+", l: "moments of service captured" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-in")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Marquee({ children, reverse }: { children: ReactNode; reverse?: boolean }) {
  return (
    <div className="photo-strip overflow-hidden">
      <div className={`flex w-max ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {children}{children}
      </div>
    </div>
  );
}

function Index() {
  useReveal();
  useCenteredPhotos();
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => i === null ? null : (i + 1) % P.length);
      if (e.key === "ArrowLeft") setOpen((i) => i === null ? null : (i - 1 + P.length) % P.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <main className="overflow-x-clip font-sans">
      <nav className="portfolio-nav fixed inset-x-0 top-0 z-40 bg-ink/95 text-ink-foreground backdrop-blur">
        <div className="nav-inner mx-auto flex max-w-7xl items-center justify-between gap-4 px-6">
          <Brand />
          <div className="nav-links flex shrink-0 items-center gap-5 text-xs font-bold uppercase">
            {[['Story', '#story'], ['Impact', '#impact'], ['Moments', '#gallery'], ['Contact', '#contact']].map(([label, href]) => (
              <Button key={href} asChild variant="ghost" className="h-auto rounded-none p-0 text-inherit hover:bg-transparent hover:text-secondary"><a href={href}>{label}</a></Button>
            ))}
          </div>
        </div>
      </nav>

      <HeroScene />
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 pt-12 md:grid-cols-[1fr_auto] md:items-end md:pb-36">
          <h1 className="font-display text-5xl uppercase leading-none md:text-7xl">
            Ayeh Ebenezer <span className="font-serif italic normal-case text-secondary">Derrick</span>
          </h1>
          <p className="max-w-sm text-lg opacity-80">Student leader. Pharmacist. Advocate.</p>
        </div>
      </section>
      <ScrollStatement />

      {/* CHAPTERS */}
      <section id="story" className="space-y-32 pb-32">
        {chapters.map((c, idx) => (
          <article key={c.no} className={`mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 ${idx % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="reveal relative h-[460px] md:h-[560px]">
              <img src={P[c.imgs[0]]} alt="" className="absolute left-0 top-0 h-[78%] w-[68%] object-cover shadow-xl" />
              <img src={P[c.imgs[1]]} alt="" className="absolute bottom-0 right-0 h-[55%] w-[50%] rotate-3 border-8 border-background object-cover shadow-xl transition duration-500 hover:rotate-0 hover:scale-105" />
              <img src={P[c.imgs[2]]} alt="" className="absolute bottom-6 left-6 h-28 w-28 -rotate-6 rounded-full border-4 border-secondary object-cover md:h-36 md:w-36" />
            </div>
            <div className="reveal">
              <div className="font-display text-[9rem] leading-none text-primary/25 md:text-[12rem]">{c.no}</div>
              <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.3em] text-accent">{c.kicker}</p>
              <h2 className="mt-3 font-display text-5xl uppercase leading-none text-primary md:text-6xl">{c.title}</h2>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">{c.body}</p>
            </div>
          </article>
        ))}
      </section>

      {/* IMPACT */}
      <section id="impact" className="grain bg-primary py-24 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="reveal font-display text-6xl uppercase md:text-8xl">
            Impact, <span className="font-serif italic normal-case text-secondary">not promises.</span>
          </h2>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {impact.map((i) => (
              <div key={i.l} className="reveal border-t-2 border-primary-foreground/40 pt-6">
                <div className="font-display text-8xl text-secondary md:text-9xl"><Counter to={i.n} suffix={i.s} /></div>
                <p className="mt-2 text-lg font-bold">{i.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILMSTRIP */}
      <section className="space-y-4 bg-ink py-16">
        <Marquee>{P.slice(0, 24).map((s) => <img key={s} src={s} alt="" loading="lazy" className="film-photo mx-2 h-56 w-auto object-cover grayscale transition hover:grayscale-0" />)}</Marquee>
        <Marquee reverse>{P.slice(24, 48).map((s) => <img key={s} src={s} alt="" loading="lazy" className="film-photo mx-2 h-56 w-auto object-cover grayscale transition hover:grayscale-0" />)}</Marquee>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-6xl uppercase text-primary md:text-8xl">Moments</h2>
          </div>
          <div className="mt-12 columns-2 gap-4 md:columns-4">
            {P.map((src, i) => (
              <Button variant="ghost" key={src} onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1}`} className="group relative mb-4 block h-auto w-full overflow-hidden rounded-none p-0">
                <img src={src} alt={`Portfolio photo ${i + 1}`} loading="lazy" className="w-full transition duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 flex items-end bg-ink/0 p-3 font-display text-3xl text-secondary opacity-0 transition group-hover:bg-ink/50 group-hover:opacity-100">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="grain relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-secondary">Let's work together</p>
          <h2 className="mt-4 font-display text-6xl uppercase leading-none md:text-8xl">
            Let's build <span className="font-serif italic normal-case text-secondary">more.</span>
          </h2>
          <div className="mt-12 grid gap-6 border-t border-primary-foreground/30 pt-8 md:grid-cols-3">
            {[
              { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, icon: Mail },
              { label: 'Phone', value: contact.phone, href: `tel:${contact.phoneHref}`, icon: Phone },
              { label: 'LinkedIn', value: contact.placeholder ? 'Your LinkedIn profile' : 'Connect on LinkedIn', href: contact.linkedin, icon: Linkedin },
            ].map(({ label, value, href, icon: Icon }) => (
              <div key={label} className="min-w-0">
                <div className="flex items-center gap-3 text-secondary"><Icon size={20} /><span className="text-sm font-bold uppercase">{label}</span></div>
                {contact.placeholder ? <p className="mt-4 break-words text-lg">{value}</p> :
                  <Button asChild variant="link" className="mt-3 h-auto max-w-full justify-start whitespace-normal p-0 text-lg text-primary-foreground"><a href={href} target={label === 'LinkedIn' ? '_blank' : undefined} rel={label === 'LinkedIn' ? 'noopener noreferrer' : undefined}>{value}<ArrowUpRight /></a></Button>}
                {contact.placeholder && <p className="mt-2 text-xs text-primary-foreground/60">Placeholder</p>}
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-primary-foreground/30 pt-6 text-sm opacity-80">
            <span>© {new Date().getFullYear()} Gyampo Ayeh Ebenezer Derrick</span>
            <span>University of Ghana · Legon</span>
          </div>
        </div>
      </footer>

      {open !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink p-4" onClick={() => setOpen(null)}>
          <img src={P[open]} onClick={(e) => e.stopPropagation()} alt={`Portfolio photo ${open + 1}`} className="max-h-[85vh] max-w-full object-contain" />
          <div className="absolute left-6 top-5 font-display text-3xl text-secondary">{String(open + 1).padStart(2, "0")} / {P.length}</div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(null)} className="absolute right-6 top-4 text-ink-foreground" aria-label="Close"><X /></Button>
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + P.length) % P.length); }} className="absolute left-4 top-1/2 font-display text-ink-foreground hover:text-secondary" aria-label="Previous"><ChevronLeft /></Button>
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % P.length); }} className="absolute right-4 top-1/2 font-display text-ink-foreground hover:text-secondary" aria-label="Next"><ChevronRight /></Button>
        </div>
      )}
    </main>
  );
}
