// Add or edit projects here — each object in this array becomes a project card automatically.
export type Project = {
  title: string;
  fileLabel: string;
  description: string;
  role: string;
  techStack: string[];
  projectLink?: string;
};

export const projects: Project[] = [
  {
    title: "Plotlyst",
    fileLabel: "plotlyst.jsx",
    description:
      "A deployed full-stack web application for rating and reviewing books, movies, and series, inspired by Letterboxd.",
    role: "UI/UX Designer",
    techStack: ["React", "Next.js", "Node.js", "Express", "Database"],
  },
  {
    title: "MBG Distribution Analysis",
    fileLabel: "mbg-analysis.py",
    description:
      "Data analysis project on a government program dataset covering 4.8M records across 36 provinces, producing 3 analytical dashboards.",
    role: "Data Analyst",
    techStack: ["Python", "Power BI", "Excel"],
  },
  {
    title: "ERP Odoo Implementation — PT Haruma Indonesia",
    fileLabel: "haruma-erp.js",
    description:
      "Implemented an ERP system covering CRM, Purchase, Inventory, and Manufacturing modules for a simulated manufacturing business.",
    role: "Business / System Analyst",
    techStack: ["Odoo", "MySQL"],
  },
  {
    title: "SkillForge",
    fileLabel: "skillforge.jsx",
    description:
      "Business process analysis and requirement gathering for a hybrid learning platform, including system documentation and interface prototypes.",
    role: "Front-End Developer & Business Analyst",
    techStack: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Asset Master Data Cleaning & Reconciliation Audit",
    fileLabel: "asset-audit.xlsx",
    description:
      "Built a data cleaning and audit reconciliation workflow using advanced Excel formulas to standardize records and detect discrepancies.",
    role: "Data Analyst",
    techStack: ["Excel", "VLOOKUP", "COUNTIFS", "SUMIFS"],
  },
];
