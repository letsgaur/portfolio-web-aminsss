// Add or edit projects here — each object in this array becomes a project card automatically
// and drives its dedicated case study page at /projects/{slug}.

export type ProjectSection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  fileLabel: string;
  description: string;
  role: string;
  techStack: string[];

  // Case study fields (all optional except overview/problem/objectives which
  // are always rendered — provide sensible defaults per project below).
  image?: string;
  gallery?: { src: string; caption?: string }[];
  duration?: string;
  team?: string;
  client?: string;

  overview: string;
  problem: string;
  objectives: string[];
  roleDetail: string;
  process?: ProjectSection;
  solution: string;
  challenges: string;
  results: string[];
  reflection: string;

  // Optional external resources — buttons only render when the URL exists.
  liveUrl?: string;
  githubUrl?: string;
  documentationUrl?: string;
  presentationUrl?: string;
  dashboardUrl?: string;
  figmaUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "plotlyst",
    title: "Plotlyst",
    fileLabel: "plotlyst.jsx",
    description:
      "A deployed full-stack web application for rating and reviewing books, movies, and series, inspired by Letterboxd.",
    role: "UI/UX Designer",
    techStack: ["React", "Next.js", "Node.js", "Express", "Database"],
    duration: "3 months",
    team: "4 people",
    overview:
      "Plotlyst is a full-stack review platform where users can rate and journal books, movies, and series in one place. It focuses on a clean reading/watching log with lightweight social features.",
    problem:
      "Existing review platforms are fragmented — one app for books, another for films, another for series — and users struggle to keep a unified record of what they consume and how they felt about it.",
    objectives: [
      "Provide a single, unified space to rate and review multiple content types.",
      "Deliver a fast, minimal, and readable interface inspired by Letterboxd.",
      "Support personal journaling alongside public reviews.",
    ],
    roleDetail:
      "I led the UI/UX design: wireframes, interaction flows, component library, and the final visual direction. I paired closely with developers to make sure the design translated cleanly into the React/Next.js implementation.",
    process: {
      heading: "Design Thinking Process",
      body: "Empathize → Define → Ideate → Prototype → Test. User interviews surfaced the fragmented-tracking pain point; wireframes and clickable Figma prototypes were validated with target users before hand-off.",
    },
    solution:
      "A responsive Next.js app with a unified rating model across content types, review threads, personal watch/read logs, and profile pages. Server-rendered lists keep browsing fast, and a shared component library keeps the UI consistent.",
    challenges:
      "Balancing three different content types under one rating model without cluttering the UI. Also, syncing design tokens with the developers' Tailwind setup required a shared Figma component library.",
    results: [
      "Deployed full-stack MVP with book, film, and series entries.",
      "Cohesive design system reused across all pages.",
      "Positive usability feedback from initial test users.",
    ],
    reflection:
      "This project taught me how much clarity the design system brings to a small team. Next time I'd invest in the tokens layer even earlier and pair-review components with the front-end devs sooner.",
  },
  {
    slug: "mbg-distribution-analysis",
    title: "MBG Distribution Analysis",
    fileLabel: "mbg-analysis.py",
    description:
      "Data analysis project on a government program dataset covering 4.8M records across 36 provinces, producing 3 analytical dashboards.",
    role: "Data Analyst",
    techStack: ["Python", "Power BI", "Excel"],
    duration: "6 weeks",
    team: "Solo",
    client: "Academic — Government dataset",
    overview:
      "An end-to-end analysis of a national distribution program covering 4.8M records across 36 provinces. The output was three focused dashboards that turn a raw operational dataset into decision-ready views.",
    problem:
      "The raw dataset was too large and noisy to interpret directly. Stakeholders needed to see distribution coverage, regional gaps, and time trends without wading through millions of rows.",
    objectives: [
      "Clean and standardize 4.8M records across 36 provinces.",
      "Surface distribution coverage and regional disparities.",
      "Deliver dashboards that non-analysts can actually read.",
    ],
    roleDetail:
      "I owned the full pipeline: data cleaning in Python, exploratory analysis, and dashboard design in Power BI. I defined the KPIs, the visual hierarchy, and the drill-down structure.",
    process: {
      heading: "Data Analysis Process",
      body: "Collect → Clean → Explore → Model → Visualize → Communicate. Python handled cleaning and joins; Power BI handled the interactive layer.",
    },
    solution:
      "Three dashboards: (1) national coverage overview, (2) province-level comparison with drill-downs, and (3) time-series trend view. Each answers a specific stakeholder question rather than being a generic report.",
    challenges:
      "Memory constraints when loading 4.8M rows and inconsistent province naming across sources. Solved by chunked processing in pandas and a canonical province lookup table.",
    results: [
      "3 production-ready dashboards delivered.",
      "Cleaned dataset reduced anomalies by over 90%.",
      "Regional coverage gaps identified and quantified.",
    ],
    reflection:
      "Working at this scale reinforced how much the value lives in the cleaning step, not the charts. I'd invest even more upfront in a reusable cleaning script for the next iteration.",
  },
  {
    slug: "erp-odoo-haruma",
    title: "ERP Odoo Implementation — PT Haruma Indonesia",
    fileLabel: "haruma-erp.js",
    description:
      "Implemented an ERP system covering CRM, Purchase, Inventory, and Manufacturing modules for a simulated manufacturing business.",
    role: "Business / System Analyst",
    techStack: ["Odoo", "MySQL"],
    duration: "1 semester",
    team: "5 people",
    client: "PT Haruma Indonesia (simulated)",
    overview:
      "A full Odoo ERP rollout for a simulated manufacturing company, integrating CRM, Purchase, Inventory, and Manufacturing so that sales orders flow cleanly through to production and stock.",
    problem:
      "The company operated in silos — sales, purchasing, and production tracked their own spreadsheets. Stock levels were unreliable and manufacturing orders were reactive.",
    objectives: [
      "Integrate CRM, Purchase, Inventory, and Manufacturing into one system.",
      "Automate stock updates and bill-of-materials workflows.",
      "Give management a single source of truth for operations.",
    ],
    roleDetail:
      "As the Business/System Analyst I gathered requirements from each department, mapped as-is vs to-be processes in BPMN, configured the Odoo modules to match, and documented the final SOPs.",
    process: {
      heading: "Business Process (BPMN)",
      body: "As-is process mapping → gap analysis → to-be BPMN → module configuration → UAT. Each module was validated with a scripted end-to-end scenario before sign-off.",
    },
    solution:
      "A configured Odoo instance where a customer quote in CRM triggers a sales order, which auto-generates purchase requisitions and manufacturing orders. Inventory updates in real time across all modules.",
    challenges:
      "Aligning bill-of-materials data with real production steps and translating stakeholder language into Odoo's configuration model. Solved with iterative walkthroughs and BPMN diagrams as a shared vocabulary.",
    results: [
      "End-to-end order-to-delivery flow working across 4 modules.",
      "Documented SOPs and BPMN diagrams for each module.",
      "Successful UAT sign-off against scripted scenarios.",
    ],
    reflection:
      "ERP work is 20% software and 80% shared understanding. Diagrams and demos moved the project forward far more than configuration screens did.",
  },
  {
    slug: "skillforge",
    title: "SkillForge",
    fileLabel: "skillforge.jsx",
    description:
      "Business process analysis and requirement gathering for a hybrid learning platform, including system documentation and interface prototypes.",
    role: "Front-End Developer & Business Analyst",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    duration: "2 months",
    team: "3 people",
    overview:
      "SkillForge is a hybrid learning platform concept combining self-paced content with live mentor sessions. I contributed as both business analyst and front-end developer, bridging requirements and UI.",
    problem:
      "Learners drop off in fully self-paced courses, but pure live classes don't scale. The platform needed a hybrid model, and the team needed clear requirements before writing any code.",
    objectives: [
      "Define the hybrid learning workflow end-to-end.",
      "Produce clear system documentation and interface prototypes.",
      "Ship a working front-end that matches the documented flows.",
    ],
    roleDetail:
      "I ran the requirement gathering, wrote the system documentation, and then implemented the core front-end screens in React/Next.js with Tailwind CSS.",
    process: {
      heading: "Requirement Gathering → UI Prototype",
      body: "Stakeholder interviews → use-case list → wireframes → hi-fi prototype in Figma → React implementation of the priority flows.",
    },
    solution:
      "A React/Next.js front-end with course browsing, mentor scheduling, and a hybrid course detail view. All screens map directly to a documented use case so scope stays honest.",
    challenges:
      "Keeping the front-end honest to the documented requirements while the design iterated. Solved with a lightweight component library and a shared checklist between design and dev.",
    results: [
      "Complete requirement + system documentation delivered.",
      "High-fidelity prototype validated with target users.",
      "Priority front-end flows implemented in React/Next.js.",
    ],
    reflection:
      "Wearing both the analyst and developer hats made me appreciate how much rework good documentation prevents. Small upfront investment, big downstream savings.",
  },
  {
    slug: "asset-master-data-cleaning",
    title: "Asset Master Data Cleaning & Reconciliation Audit",
    fileLabel: "asset-audit.xlsx",
    description:
      "Built a data cleaning and audit reconciliation workflow using advanced Excel formulas to standardize records and detect discrepancies.",
    role: "Data Analyst",
    techStack: ["Excel", "VLOOKUP", "COUNTIFS", "SUMIFS"],
    duration: "4 weeks",
    team: "Solo",
    overview:
      "A structured Excel workflow for cleaning asset master data and reconciling records against an audit source of truth, using advanced formulas as the analysis engine.",
    problem:
      "The asset master file had duplicate entries, inconsistent naming, and discrepancies against the audit list. Manual reconciliation was slow and error-prone.",
    objectives: [
      "Standardize asset records into a consistent schema.",
      "Automate discrepancy detection between master and audit lists.",
      "Produce a reviewable audit trail of every change.",
    ],
    roleDetail:
      "I designed the reconciliation workbook end-to-end: cleaning rules, lookup layer, discrepancy flags, and the summary dashboard sheet that management actually opens.",
    process: {
      heading: "Data Cleaning & Reconciliation",
      body: "Profile → standardize → dedupe → cross-check against audit source with VLOOKUP/COUNTIFS/SUMIFS → flag discrepancies → summarize.",
    },
    solution:
      "A layered workbook: a raw sheet, a cleaned sheet, a lookup sheet against the audit list, and a summary sheet that surfaces mismatches, missing records, and totals side-by-side.",
    challenges:
      "Handling inconsistent asset names and codes without accidentally merging distinct assets. Solved with a controlled lookup table and a manual-review flag rather than silent auto-correction.",
    results: [
      "Master file standardized and deduplicated.",
      "Discrepancies against audit list surfaced automatically.",
      "Reusable workbook template for future audit cycles.",
    ],
    reflection:
      "Excel is underrated as an analysis tool when the workbook is designed as layers rather than one giant sheet. That structural discipline was the real deliverable.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
