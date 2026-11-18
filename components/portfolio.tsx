"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react"

const portrait = "/images/WhatsApp%20Image%202026-11-17%20at%2012.57.40.jpeg"

const highlights = [
  { number: "01", title: "Medicines safety", detail: "Regulatory exposure at Ghana’s Pharmacy Council and FDA, grounded in a commitment to safer care." },
  { number: "02", title: "Research with a future", detail: "A systematic review exploring artificial intelligence as a core competency in health professions education." },
  { number: "03", title: "Leadership that listens", detail: "Vice-President of the University of Ghana SRC, building community through service and representation." },
]

const roles = [
  { year: "2026", role: "Doctor of Pharmacy graduate", place: "University of Ghana" },
  { year: "2025—26", role: "Vice-President, UGSRC", place: "University of Ghana" },
  { year: "2025—26", role: "Hospital Pharmacy Intern", place: "Korle Bu Teaching Hospital" },
  { year: "2024—25", role: "President, Jean Nelson Aka Hall JCR", place: "University of Ghana" },
  { year: "2023", role: "Regulatory Pharmacy Intern", place: "Food and Drugs Authority, Ghana" },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label"><span />{children}</p>
}

function PhotoJournal({ images }: { images: string[] }) {
  const [expanded, setExpanded] = useState(false)
  const visibleImages = expanded ? images : images.slice(0, 6)

  return (
    <section className="journal section-wrap" id="journal">
      <div className="journal-heading">
        <div>
          <SectionLabel>OUT IN THE WORLD</SectionLabel>
          <h2>A few moments<br />along the way.</h2>
        </div>
        <p>People, places and small milestones that have shaped my time in pharmacy and public service.</p>
      </div>
      <div className="photo-grid">
        {visibleImages.map((src, index) => (
          <figure className={`photo-card photo-card-${index % 6}`} key={src}>
            <Image src={src} alt={`A moment from Ebenezer’s pharmacy, leadership, and community journey, photograph ${index + 1}`} fill sizes="(max-width: 700px) 48vw, 30vw" />
          </figure>
        ))}
      </div>
      {images.length > 6 && (
        <button className="text-button journal-toggle" type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          {expanded ? "Show fewer moments" : `Explore the photo journal · ${images.length} photographs`}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      )}
    </section>
  )
}

export default function Portfolio({ images }: { images: string[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Ebenezer Gyampo Ayeh, home"><span className="wordmark-mark">E.</span><span>EBENEZER<br />GYAMPO AYEH</span></a>
        <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? "navigation navigation-open" : "navigation"} aria-label="Main navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a>
          <a className="nav-contact" href="mailto:ebenezergyampo9@gmail.com" onClick={() => setMenuOpen(false)}>Say hello <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> PHARMACY · PEOPLE · PROGRESS</p>
          <h1>Care is where<br />it <em>all begins.</em></h1>
          <p className="hero-intro">I’m Ebenezer — a pharmacist, researcher and community-minded leader from Ghana. I’m interested in making healthcare safer, smarter and more human.</p>
          <a href="#about" className="hero-link">A little more about me <ArrowDown size={15} /></a>
          <div className="hero-location"><span>BASED IN</span><span>Accra, Ghana <span className="location-dot">·</span> GMT</span></div>
        </div>
        <div className="hero-image-wrap">
          <div className="portrait-frame"><Image src={portrait} alt="Ebenezer Derrick Gyampo Ayeh, Doctor of Pharmacy graduate" fill priority sizes="(max-width: 700px) 88vw, 44vw" /></div>
          <div className="portrait-note"><span>01 / 03</span><span>Curiosity, always.</span></div>
          <span className="portrait-stamp" aria-hidden="true">E<span>·</span>G</span>
        </div>
        <div className="hero-index" aria-hidden="true">UG · 2026</div>
      </section>

      <section className="intro section-wrap" id="about">
        <div className="intro-aside"><SectionLabel>A PRACTICE OF PURPOSE</SectionLabel><span className="intro-aside-note">University of Ghana<br />School of Pharmacy</span></div>
        <div className="intro-content">
          <p className="intro-statement">My work sits at the meeting point of <span>patient care, medicines safety</span> and the belief that good leadership should leave people better than it found them.</p>
          <div className="intro-bottom"><p>From the dispensary to student governance, I’ve learned that meaningful progress starts with listening. I bring that same care to research, public health and every community I’m part of.</p><div className="credential"><strong>PharmD</strong><span>University of Ghana<br />Class of 2026</span></div></div>
        </div>
      </section>

      <section className="focus section-wrap" aria-labelledby="focus-heading">
        <div className="focus-heading"><SectionLabel>WHAT I CARE ABOUT</SectionLabel><h2 id="focus-heading">The work behind<br />the why.</h2></div>
        <div className="focus-list">{highlights.map((item) => <article className="focus-item" key={item.number}><span className="focus-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div><ArrowUpRight className="focus-arrow" size={19} aria-hidden="true" /></article>)}</div>
      </section>

      <section className="experience section-wrap" id="work">
        <div className="experience-intro"><SectionLabel>A TIMELINE OF SERVICE</SectionLabel><h2>Learning by<br />showing up.</h2><p>Every role has offered another way to understand what care can look like — in a hospital, a community or a room full of students.</p></div>
        <div className="role-list">{roles.map((item) => <article className="role-row" key={item.year + item.role}><span className="role-year">{item.year}</span><div><h3>{item.role}</h3><p>{item.place}</p></div><ArrowUpRight size={16} className="role-arrow" aria-hidden="true" /></article>)}</div>
      </section>

      <section className="quote-band"><span className="quote-mark" aria-hidden="true">“</span><blockquote>Good health is personal.<br />Progress should be, too.</blockquote><p>A belief that keeps me curious — and keeps me listening.</p></section>

      <PhotoJournal images={images} />

      <section className="contact section-wrap" id="contact"><div><SectionLabel>THE NEXT CHAPTER</SectionLabel><h2>Let’s make<br />something <em>matter.</em></h2></div><a className="contact-link" href="mailto:ebenezergyampo9@gmail.com"><span>Get in touch</span><ArrowUpRight size={20} /></a><p className="contact-caption">Open to conversations, collaborations<br />and opportunities to serve.</p></section>

      <footer className="site-footer"><a className="wordmark footer-mark" href="#home"><span className="wordmark-mark">E.</span><span>EBENEZER<br />GYAMPO AYEH</span></a><span className="footer-note">Pharmacy graduate · Ghana</span><a className="footer-email" href="mailto:ebenezergyampo9@gmail.com">EMAIL <ArrowUpRight size={13} /></a><span className="copyright">© 2026</span></footer>
    </main>
  )
}
