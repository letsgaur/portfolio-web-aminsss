import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Users,
  Briefcase,
  ImageIcon,
  ExternalLink,
  FileText,
  Presentation,
  BarChart3,
  Figma,
  Github as GithubIcon,
  Globe,
  X,
} from "lucide-react";
import { getProjectBySlug, projects, type Project } from "@/lib/projects";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Aminah Portfolio" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} | Aminah Portfolio`;
    return {
      meta: [
        { title },
        { name: "description", content: project.description },
        { property: "og:title", content: title },
        { property: "og:description", content: project.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudyPage,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-mono text-sm text-sky mb-3">// 404</div>
        <h1 className="text-3xl font-bold text-navy tracking-tight">
          Project not found
        </h1>
        <p className="mt-3 text-slate-muted">
          That case study doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 font-medium hover:bg-sky hover:text-white transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
}

/* --------------------------------- Utils ---------------------------------- */

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

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-6">
      <div className="font-mono text-sm text-sky mb-2">
        // {index}. {title}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-navy tracking-tight">
        {title}
      </h2>
    </div>
  );
}

/* --------------------------------- Sub-nav -------------------------------- */

function BackBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-background/85 backdrop-blur-md border-b border-[color:var(--border)]">
      <div className="mx-auto max-w-[1140px] px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-sm text-navy/80 hover:text-sky transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Portfolio
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            hash="projects"
            className="hidden md:inline font-mono text-xs uppercase text-navy/70 hover:text-navy px-3 py-2"
          >
            all projects
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

/* --------------------------------- Hero ----------------------------------- */

function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="relative pt-32 pb-14 md:pt-40 md:pb-20 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(var(--navy) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="absolute -z-0 left-1/2 top-24 -translate-x-1/2 h-[420px] w-[520px] rounded-full blur-3xl animate-blob"
        style={{
          background:
            "radial-gradient(circle, oklch(0.85 0.09 235 / 0.4), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-[1140px] px-6">
        <Reveal>
          <div className="font-mono text-sm text-sky mb-4">
            // {project.fileLabel}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-navy tracking-tight leading-[1.05]">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-muted leading-[1.7]">
            {project.description}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-3">
            <MetaChip icon={Briefcase} label="Role" value={project.role} />
            {project.duration && (
              <MetaChip icon={Calendar} label="Duration" value={project.duration} />
            )}
            {project.team && (
              <MetaChip icon={Users} label="Team" value={project.team} />
            )}
            {project.client && (
              <MetaChip icon={Globe} label="Client" value={project.client} />
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="font-mono text-[12px] px-2.5 py-1 rounded-md bg-sky-tint/50 text-navy border border-sky-tint"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 aspect-[16/8] rounded-2xl overflow-hidden bg-[color:var(--muted)] border border-[color:var(--border)] shadow-[0_20px_50px_-24px_rgba(15,23,42,0.35)] relative">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-4 rounded-xl border-2 border-dashed border-[color:var(--border)] flex flex-col items-center justify-center text-slate-muted">
                <ImageIcon className="h-10 w-10 mb-2 opacity-60" />
                <span className="font-mono text-[12px] uppercase tracking-wider">
                  hero image placeholder
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MetaChip({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="inline-flex items-center gap-3 rounded-xl bg-card border border-[color:var(--border)] px-4 py-2.5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.25)]">
      <div className="rounded-lg p-2 bg-sky-tint/50">
        <Icon className="h-4 w-4 text-navy" />
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-slate-muted">
          {label}
        </div>
        <div className="text-sm font-medium text-navy">{value}</div>
      </div>
    </div>
  );
}

/* ----------------------------- Content blocks ----------------------------- */

function Prose({ index, title, children }: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative py-14 md:py-16">
      <div className="mx-auto max-w-[860px] px-6">
        <Reveal>
          <SectionLabel index={index} title={title} />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="text-slate-muted leading-[1.75] text-[17px] space-y-4">
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ObjectivesList({ items }: { items: string[] }) {
  return (
    <section className="relative py-14 md:py-16">
      <div className="mx-auto max-w-[860px] px-6">
        <Reveal>
          <SectionLabel index="04" title="Objectives" />
        </Reveal>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-xl bg-card border border-[color:var(--border)] p-4 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.25)]"
            >
              <span className="font-mono text-sky text-sm mt-0.5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-navy leading-[1.65]">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ResultsList({ items }: { items: string[] }) {
  return (
    <section className="relative py-14 md:py-16 bg-muted/40">
      <div className="mx-auto max-w-[860px] px-6">
        <Reveal>
          <SectionLabel index="10" title="Results" />
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-xl bg-card border border-[color:var(--border)] p-5 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.25)]"
            >
              <div
                className="font-mono text-xs mb-2"
                style={{ color: "var(--code-green)" }}
              >
                ✓ result_{String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-navy leading-[1.6]">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Gallery -------------------------------- */

function Gallery({ items }: { items: NonNullable<Project["gallery"]> }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="relative py-14 md:py-16">
      <div className="mx-auto max-w-[1140px] px-6">
        <Reveal>
          <SectionLabel index="08" title="Gallery" />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((g, i) => (
            <motion.button
              type="button"
              key={g.src + i}
              onClick={() => setOpenIdx(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group rounded-xl overflow-hidden bg-card border border-[color:var(--border)] shadow-[0_10px_30px_-20px_rgba(15,23,42,0.3)] hover:border-sky/50 transition-all"
            >
              <div className="aspect-[4/3] bg-[color:var(--muted)] overflow-hidden">
                <img
                  src={g.src}
                  alt={g.caption ?? "Project screenshot"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </div>
              {g.caption && (
                <div className="px-4 py-3 font-mono text-[12px] text-slate-muted text-left">
                  {g.caption}
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {openIdx !== null && (
        <div
          className="fixed inset-0 z-[60] bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setOpenIdx(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIdx(null)}
            aria-label="Close"
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/90 border border-[color:var(--border)] flex items-center justify-center text-navy hover:scale-105 transition-transform"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={items[openIdx].src}
            alt={items[openIdx].caption ?? ""}
            className="max-h-[85vh] max-w-[92vw] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

/* ----------------------------------- CTA ---------------------------------- */

function CTASection({ project }: { project: Project }) {
  const links: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [];
  if (project.liveUrl) links.push({ href: project.liveUrl, label: "Live Demo", icon: Globe });
  if (project.githubUrl)
    links.push({ href: project.githubUrl, label: "GitHub Repository", icon: GithubIcon });
  if (project.documentationUrl)
    links.push({ href: project.documentationUrl, label: "View Documentation", icon: FileText });
  if (project.presentationUrl)
    links.push({ href: project.presentationUrl, label: "View Presentation", icon: Presentation });
  if (project.dashboardUrl)
    links.push({ href: project.dashboardUrl, label: "View Dashboard", icon: BarChart3 });
  if (project.figmaUrl) links.push({ href: project.figmaUrl, label: "Open Figma", icon: Figma });

  if (links.length === 0) return null;

  return (
    <section className="relative py-16 md:py-20">
      <div className="mx-auto max-w-[860px] px-6">
        <Reveal>
          <div className="rounded-2xl bg-card border border-[color:var(--border)] p-8 md:p-10 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.3)] text-center">
            <div className="font-mono text-sm text-sky mb-2">// explore_more()</div>
            <h3 className="text-2xl md:text-3xl font-bold text-navy tracking-tight">
              Want to dive deeper?
            </h3>
            <p className="mt-3 text-slate-muted leading-[1.7] max-w-xl mx-auto">
              Open the resources below to see the full documentation, dashboard,
              or live experience — no downloads required.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              {links.map((l) => {
                const Icon = l.icon;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-lg bg-foreground text-background font-medium px-5 py-2.5 shadow-[0_10px_30px_-14px_rgba(15,23,42,0.4)] hover:bg-sky hover:text-white transition-all duration-200 hover:scale-[1.03]"
                  >
                    <Icon className="h-4 w-4" />
                    {l.label}
                    <ExternalLink className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- Related projects ----------------------------- */

function RelatedProjects({ currentSlug }: { currentSlug: string }) {
  const others = projects.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (others.length === 0) return null;
  return (
    <section className="relative py-16 md:py-20 border-t border-[color:var(--border)]">
      <div className="mx-auto max-w-[1140px] px-6">
        <Reveal>
          <div className="mb-8">
            <div className="font-mono text-sm text-sky mb-2">// next_up</div>
            <h3 className="text-2xl md:text-3xl font-bold text-navy tracking-tight">
              Other case studies
            </h3>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {others.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group block rounded-xl bg-card border border-[color:var(--border)] p-5 h-full hover:border-sky/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.25)]"
              >
                <div className="font-mono text-[11px] text-sky mb-2">// {p.fileLabel}</div>
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-lg font-bold text-navy tracking-tight group-hover:text-sky transition-colors">
                    {p.title}
                  </h4>
                  <ArrowUpRight className="h-4 w-4 text-slate-muted group-hover:text-sky transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1" />
                </div>
                <p className="mt-2 text-sm text-slate-muted line-clamp-2 leading-[1.6]">
                  {p.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Page ---------------------------------- */

function CaseStudyPage() {
  const { project } = Route.useLoaderData();

  return (
    <main className="relative min-h-screen">
      <BackBar />
      <ProjectHero project={project} />

      <Prose index="01" title="Overview">
        <p>{project.overview}</p>
      </Prose>

      <div className="bg-muted/40">
        <Prose index="02" title="Problem Statement">
          <p>{project.problem}</p>
        </Prose>
      </div>

      <ObjectivesList items={project.objectives} />

      <div className="bg-muted/40">
        <Prose index="05" title="My Role">
          <p>{project.roleDetail}</p>
        </Prose>
      </div>

      {project.process && (
        <Prose index="06" title={project.process.heading || "Business Process"}>
          <p>{project.process.body}</p>
        </Prose>
      )}

      <div className="bg-muted/40">
        <Prose index="07" title="Solution">
          <p>{project.solution}</p>
        </Prose>
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <Gallery items={project.gallery} />
      )}

      <Prose index="09" title="Challenges">
        <p>{project.challenges}</p>
      </Prose>

      <ResultsList items={project.results} />

      <Prose index="11" title="Reflection">
        <p>{project.reflection}</p>
      </Prose>

      <CTASection project={project} />
      <RelatedProjects currentSlug={project.slug} />

      <footer className="border-t border-[color:var(--border)] py-10">
        <div className="mx-auto max-w-[1140px] px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[12px] text-slate-muted">
          <Link to="/" className="hover:text-navy transition-colors inline-flex items-center gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            back to portfolio
          </Link>
          <span>© {new Date().getFullYear()} Aminah</span>
        </div>
      </footer>
    </main>
  );
}
