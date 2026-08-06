export const content = {
  name: "Deepak Shambhu Paswan",
  handle: "deepakOS",
  tagline: "Data Analyst · BI · Full-Stack Developer",
  summary:
    "Aspiring Data Analyst and full-stack developer with a strong foundation in data visualization, business intelligence, and web development. I love turning messy data into clear stories and building products people enjoy using. Currently pursuing B.Sc. IT and actively working on dashboards, automation, and web apps.",
  languages: ["English", "Hindi", "Marathi"],
  interests: [
    "IT Support",
    "Automation",
    "Data Visualization",
    "Full-Stack Web Dev",
    "Retro tech & games",
  ],
  contact: {
    email: "deepakpaswan5632@gmail.com",
    phone: "+91 96017 81978",
    linkedin: "https://linkedin.com/in/diiipak-paswan",
    github: "https://github.com/Dipak0502",
  },
  education: [
    {
      school: "N.B Mehta Science College",
      degree: "B.Sc. Information Technology",
      period: "2024 — 2026",
      note: "Focus on data analytics, databases, web development.",
    },
    {
      school: "PG Junior College, Bordi",
      degree: "HSC — Science",
      period: "2022 — 2023",
      note: "Higher Secondary, Science stream.",
    },
  ],
  skills: [
    {
      group: "Data & Visualization",
      items: [
        { name: "Power BI", level: 88 },
        { name: "Excel / Sheets", level: 90 },
        { name: "SQL", level: 82 },
        { name: "Python (pandas)", level: 75 },
      ],
    },
    {
      group: "Web & Programming",
      items: [
        { name: "React + TypeScript", level: 78 },
        { name: "HTML / CSS / Tailwind", level: 85 },
        { name: "Node.js", level: 65 },
        { name: "Git / GitHub", level: 80 },
      ],
    },
    {
      group: "Tools & Platforms",
      items: [
        { name: "MS Office", level: 92 },
        { name: "Figma", level: 70 },
        { name: "VS Code", level: 90 },
      ],
    },
    {
      group: "Security & Auth",
      items: [
        { name: "OAuth basics", level: 60 },
        { name: "JWT / Sessions", level: 62 },
      ],
    },
    {
      group: "Soft Skills",
      items: [
        { name: "Communication", level: 85 },
        { name: "Problem Solving", level: 88 },
        { name: "Teamwork", level: 90 },
      ],
    },
  ],
  projects: [
    {
      id: "uber",
      name: "Uber Trips Dashboard",
      stack: "Power BI · DAX · Excel",
      description:
        "Interactive BI dashboard analyzing Uber trip data — booking patterns, peak hours, cancellations, and revenue trends.",
      bullets: [
        "Cleaned & modeled 100k+ trip rows with Power Query",
        "Built KPI cards, drill-through pages, and time-series visuals",
        "Surfaced peak-demand windows for driver allocation",
      ],
      link: "https://github.com/Dipak0502",
    },
    {
      id: "blinkit",
      name: "Blinkit Sales Dashboard",
      stack: "Power BI · SQL",
      description:
        "End-to-end sales analytics for a quick-commerce dataset — category performance, outlet trends, item ratings.",
      bullets: [
        "Star-schema data model with fact/dim tables",
        "DAX measures for YoY sales, avg rating, fat-content mix",
        "Slicers for outlet type, size, and location tier",
      ],
      link: "https://github.com/Dipak0502",
    },
    {
      id: "vitalguard",
      name: "VitalGuard",
      stack: "React · TypeScript · Node",
      description:
        "Full-stack health-monitoring web app concept — track vitals, set reminders, and visualize trends.",
      bullets: [
        "Auth flow with session handling",
        "Responsive dashboard with chart components",
        "Modular component library",
      ],
      link: "https://github.com/Dipak0502",
    },
    {
      id: "dashforge",
      name: "DashForge",
      stack: "React · TypeScript · Vite · Tailwind CSS · Apache ECharts",
      description:
        "A client-side data dashboard builder: drop in a CSV or Excel file and instantly get interactive charts, KPI tiles, filters, and exportable PDF/PNG/CSV reports — no server, no data upload.",
      bullets: [
        "Smart column type inference with an override editor",
        "Auto-generated ECharts visualizations with a chart editor",
        "Live filtering, KPI computation, and one-click export",
        "Dark/light theme toggle and a built-in sample retail dataset",
      ],
      link: "https://github.com/Dipak0502",
    },
  ],
  certifications: [
    {
      name: "Deloitte Australia — Data Analytics Job Simulation",
      issuer: "Forage",
      date: "June 2026",
    },
    {
      name: "Microsoft Office Specialist",
      issuer: "Microsoft",
      date: "—",
    },
  ],
};

export type Content = typeof content;
