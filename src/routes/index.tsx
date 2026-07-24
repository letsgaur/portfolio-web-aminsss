import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Mail,
  Phone,
  Linkedin,
  Github,
  Trophy,
  Award,
  Code2,
  ImageIcon,
} from "lucide-react";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aminah — Information Systems Student & Developer" },
      {
        name: "description",
        content:
          "Portfolio of Aminah, an Information Systems student focused on data analysis, business systems, and web development.",
      },
      { property: "og:title", content: "Aminah — Information Systems Student & Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Aminah, an Information Systems student focused on data analysis, business systems, and web development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "achievements", label: "achievements" },
  { id: "contact", label: "contact" },
];

const SKILLS: { category: string; items: string[] }[] = [
  {
    category: "Data & Analysis",
    items: ["Excel (VLOOKUP, PivotTables, SUMIFS)", "Power BI", "Looker Studio", "SQL / MySQL", "Python"],
  },
  {
    category: "Web Development",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Node.js"],
  },
  {
    category: "Business & Systems",
    items: ["ERD", "Business Process Analysis", "ERP (Odoo)", "Requirement Gathering"],
  },
  {
    category: "Design",
    items: ["Figma", "UI/UX Design", "Wireframing"],
  },
];

/* ----------------------------- Building blocks ---------------------------- */

function DotGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "radial-gradient(var(--navy) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    />
  );
}

function CircuitAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 120"
      className={"pointer-events-none absolute opacity-30 " + className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      style={{ color: "var(--sky)" }}
    >
      <path d="M2 60 H60 L80 40 H140 L160 60 H198" />
      <circle cx="60" cy="60" r="2.5" fill="currentColor" />
      <circle cx="140" cy="40" r="2.5" fill="currentColor" />
      <circle cx="160" cy="60" r="2.5" fill="currentColor" />
      <path d="M100 60 V100 H180" />
      <circle cx="180" cy="100" r="2.5" fill="currentColor" />
    </svg>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="font-mono text-sm text-sky mb-3">
        // {index}. {title}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-navy tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------- Nav ----------------------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      Boolean,
    ) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 " +
        (scrolled
          ? "bg-white/85 backdrop-blur-md shadow-[0_4px_24px_-12px_rgba(15,23,42,0.15)]"
          : "bg-transparent")
      }
    >
      <div className="mx-auto max-w-[1140px] px-6 py-4 flex items-center justify-between">
        <a
          href="#top"
          className="font-mono text-sm text-navy tracking-tight"
        >
          <span className="text-sky">&lt;</span>aminah
          <span className="text-sky">/&gt;</span>
        </a>
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs uppercase">
          {NAV.map((n) => {
            const isActive = active === n.id;
            return (
              <a
                key={n.id}
                href={"#" + n.id}
                className="relative px-3 py-2 text-navy/70 hover:text-navy transition-colors"
              >
                {n.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-sky rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

/* --------------------------------- Hero ----------------------------------- */

const TAGLINE = "Information Systems Student | Data & Business Analyst | Web Developer";

function Hero() {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? TAGLINE : "");
  const [doneTyping, setDoneTyping] = useState(!!reduce);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(TAGLINE.slice(0, i));
      if (i >= TAGLINE.length) {
        clearInterval(id);
        setDoneTyping(true);
      }
    }, 32);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      <DotGrid />
      <div
        aria-hidden
        className="absolute -z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full blur-3xl animate-blob"
        style={{
          background:
            "radial-gradient(circle, oklch(0.85 0.09 235 / 0.55), transparent 65%)",
        }}
      />
      <CircuitAccent className="right-4 top-32 w-[220px] hidden md:block" />
      <CircuitAccent className="left-2 bottom-16 w-[180px] rotate-180 hidden md:block" />

      <div className="relative mx-auto max-w-[1140px] px-6 py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-sm text-sky mb-6"
        >
          // hello_world.ts
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-extrabold text-navy tracking-tight leading-[1.05]"
        >
          Aminah
        </motion.h1>

        <div className="mt-6 max-w-2xl font-mono text-base md:text-lg text-slate-muted min-h-[3.5rem]">
          <span>{typed}</span>
          <span
            className={
              "inline-block ml-0.5 -mb-0.5 w-[2px] h-[1.1em] align-middle bg-sky " +
              (doneTyping ? "cursor-blink" : "")
            }
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={doneTyping ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-navy text-white font-medium px-6 py-3 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.4)] hover:bg-sky hover:shadow-[0_16px_40px_-12px_oklch(0.75_0.11_235/0.55)] transition-all duration-200 hover:scale-[1.04]"
          >
            View My Work
            <ArrowDown className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------- About ---------------------------------- */

function TerminalSkills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] bg-terminal"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-white/40">
          ~/aminah/skills.ts
        </span>
      </div>
      <div className="p-6 font-mono text-[13px] leading-relaxed text-white/80">
        {SKILLS.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.15 + gi * 0.15 }}
            className="mb-4"
          >
            <div>
              <span className="text-[#c586c0]">const</span>{" "}
              <span className="text-sky">
                {group.category.replace(/[^A-Za-z]/g, "")}
              </span>{" "}
              <span className="text-white/60">=</span>{" "}
              <span className="text-white/60">[</span>
            </div>
            {group.items.map((s) => (
              <div key={s} className="pl-6">
                <span style={{ color: "var(--code-green)" }}>{'"' + s + '"'}</span>
                <span className="text-white/60">,</span>
              </div>
            ))}
            <div className="text-white/60">];</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <DotGrid />
      <CircuitAccent className="right-0 top-10 w-[200px] hidden lg:block" />

      <div className="relative mx-auto max-w-[1140px] px-6">
        <Reveal>
          <div className="mb-10 flex items-baseline gap-3">
            <span className="font-mono text-sky text-2xl">&lt;/&gt;</span>
            <div>
              <div className="font-mono text-sm text-sky mb-2">// 01. About Me</div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy tracking-tight">
                About Me
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div className="space-y-5">
              <p className="text-lg text-slate-muted leading-[1.7]">
                I&apos;m an <span className="text-navy font-medium">Information Systems student</span> at
                Universitas Pembangunan Nasional Veteran Jakarta, drawn to the point where data,
                business, and code meet.
              </p>
              <p className="text-lg text-slate-muted leading-[1.7]">
                I love turning messy datasets into decisions, mapping business processes into
                systems that actually work, and shipping clean, considered web interfaces on top.
                Curious by default, precise by habit.
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_10px_30px_-16px_rgba(15,23,42,0.25)] border border-[color:var(--border)]"
              >
                <div className="rounded-xl bg-sky-tint/60 p-2.5">
                  <Trophy className="h-5 w-5 text-navy" />
                </div>
                <div>
                  <div className="font-mono text-[11px] text-slate-muted uppercase tracking-wider">
                    Current GPA
                  </div>
                  <div className="text-2xl font-bold text-navy leading-none mt-1">
                    3.84 <span className="text-slate-muted text-base font-medium">/ 4.00</span>
                  </div>
                </div>
              </motion.div>

              <div className="pt-4 space-y-5">
                {SKILLS.map((group, gi) => (
                  <Reveal key={group.category} delay={0.05 * gi}>
                    <div>
                      <div className="font-mono text-xs text-navy/60 uppercase tracking-wider mb-2">
                        {group.category}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((s, i) => (
                          <motion.span
                            key={s}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{
                              duration: 0.35,
                              delay: i * 0.04,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="font-mono text-[12px] px-2.5 py-1 rounded-md bg-sky-tint/50 text-navy border border-sky-tint hover:-translate-y-0.5 hover:bg-sky-tint transition-all duration-200"
                          >
                            {s}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <TerminalSkills />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Projects -------------------------------- */

function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group rounded-2xl bg-card border border-[color:var(--border)] overflow-hidden shadow-[0_10px_30px_-18px_rgba(15,23,42,0.25)] hover:shadow-[0_24px_50px_-20px_rgba(15,23,42,0.35)] transition-shadow duration-300"
    >
      <div className="aspect-[16/9] bg-[color:var(--muted)] relative overflow-hidden">
        <div className="absolute inset-3 rounded-xl border-2 border-dashed border-[color:var(--border)] flex flex-col items-center justify-center text-slate-muted transition-transform duration-500 group-hover:scale-[1.05]">
          <ImageIcon className="h-8 w-8 mb-2 opacity-60 group-hover:animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider">
            add image here
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="font-mono text-[12px] text-sky mb-2">// {p.fileLabel}</div>
        <h3 className="text-xl font-bold text-navy tracking-tight">{p.title}</h3>
        <p className="mt-3 text-slate-muted leading-[1.65]">{p.description}</p>
        <div className="mt-4 font-mono text-[12px] text-navy/70">
          <span className="text-slate-muted">role: </span>
          <span style={{ color: "var(--code-green)" }}>{'"' + p.role + '"'}</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
          className="mt-4 flex flex-wrap gap-1.5"
        >
          {p.techStack.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-sky-tint/40 text-navy border border-sky-tint/70"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36 bg-white/40">
      <div className="mx-auto max-w-[1140px] px-6">
        <Reveal>
          <SectionLabel index="02" title="Featured Projects" />
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Achievements ------------------------------ */

const ACHIEVEMENTS = [
  {
    title: "P2MW — National Entrepreneurship Funding",
    subtitle: "Program Pembinaan Mahasiswa Wirausaha",
    body:
      "Awarded national student entrepreneurship funding by the Indonesian government for developing PRONUTS — a protein donut brand using Bambara groundnut flour as an alternative ingredient.",
  },
  {
    title: "2nd Place — Expo Berdampak (F&B)",
    subtitle: "3rd Unsika Entrepreneurship Expo (UNEX) 2026",
    body:
      "Runner-up in a national-scale business idea competition, awarded for developing PRONUTS in the Food & Beverage category.",
  },
];

function Achievements() {
  return (
    <section id="achievements" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1140px] px-6">
        <Reveal>
          <SectionLabel index="03" title="Achievements" />
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl bg-card p-8 border border-[color:var(--border)] shadow-[0_10px_30px_-18px_rgba(15,23,42,0.25)] overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute inset-y-0 -left-1/2 w-1/2 pointer-events-none animate-shimmer"
                style={{
                  background:
                    "linear-gradient(120deg, transparent, oklch(0.79 0.13 85 / 0.18), transparent)",
                }}
              />
              <div
                aria-hidden
                className="absolute left-0 top-0 h-full w-1"
                style={{ background: "var(--gold)" }}
              />
              <div className="flex items-start gap-4">
                <div className="rounded-xl p-3 border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10">
                  <Award className="h-6 w-6" style={{ color: "var(--gold)" }} />
                </div>
                <div>
                  <div className="font-mono text-[11px] text-slate-muted uppercase tracking-wider">
                    {a.subtitle}
                  </div>
                  <h3 className="mt-1 text-xl font-bold text-navy tracking-tight">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-slate-muted leading-[1.65]">{a.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Contact --------------------------------- */

const CONTACTS = [
  { icon: Mail, label: "aminah.lasas@email.com", href: "mailto:aminah.lasas@email.com" },
  { icon: Phone, label: "+62 858-9486-6741", href: "tel:+6285894866741" },
  { icon: Linkedin, label: "linkedin.com/in/aminah2805", href: "https://linkedin.com/in/aminah2805" },
  { icon: Github, label: "github.com/letsgaur", href: "https://github.com/letsgaur" },
];

function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-36 bg-white/40">
      <div className="mx-auto max-w-[1140px] px-6">
        <Reveal>
          <div className="mb-10">
            <div className="font-mono text-sm text-sky mb-3">// 04. let&apos;s connect();</div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy tracking-tight">
              Let&apos;s build something together
            </h2>
            <p className="mt-4 text-slate-muted max-w-2xl leading-[1.7]">
              Open to internships, collaborations, and interesting problems in data,
              systems, and product. The fastest way to reach me is email.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACTS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 22,
                  delay: i * 0.08,
                }}
                whileHover={{ scale: 1.04 }}
                className="group rounded-2xl bg-card p-5 border border-[color:var(--border)] flex items-center gap-3 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.2)] hover:shadow-[0_18px_40px_-18px_oklch(0.75_0.11_235/0.5)] transition-all"
              >
                <div className="rounded-xl p-2.5 bg-sky-tint/50 group-hover:bg-sky transition-colors duration-200">
                  <Icon className="h-5 w-5 text-navy group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[11px] text-slate-muted uppercase tracking-wider">
                    {c.icon === Mail
                      ? "email"
                      : c.icon === Phone
                        ? "phone"
                        : c.icon === Linkedin
                          ? "linkedin"
                          : "github"}
                  </div>
                  <div className="font-mono text-[13px] text-navy truncate">
                    {c.label}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Footer --------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] py-10">
      <div className="mx-auto max-w-[1140px] px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[12px] text-slate-muted">
        <div>
          <span className="text-sky">&lt;</span>aminah
          <span className="text-sky">/&gt;</span> — designed & built with care
        </div>
        <div className="flex items-center gap-3">
          <a href="mailto:aminah.lasas@email.com" className="hover:text-navy transition-colors">
            <Mail className="h-4 w-4" />
          </a>
          <a href="https://linkedin.com/in/aminah2805" target="_blank" rel="noreferrer" className="hover:text-navy transition-colors">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="https://github.com/letsgaur" target="_blank" rel="noreferrer" className="hover:text-navy transition-colors">
            <Github className="h-4 w-4" />
          </a>
          <span className="ml-2">© {new Date().getFullYear()} Aminah</span>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- Page ----------------------------------- */

function Portfolio() {
  return (
    <main className="relative min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
      {/* Small floating dev flourish */}
      <div className="pointer-events-none fixed bottom-4 right-4 font-mono text-[10px] text-slate-muted/60 hidden md:block">
        <Code2 className="inline h-3 w-3 mr-1 -mt-0.5" />
        built with react + tailwind
      </div>
    </main>
  );
}
