export interface Stat {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

export interface LinkCta {
  label: string;
  href: string;
  primary?: boolean;
  /** Set when the destination itself (profile/page) is still being polished —
   * renders a small "Updating" badge instead of implying it's finished. */
  status?: "in-progress";
}

export const hero = {
  kicker: "Laud Asante · Data Science & AI",
  headline: "Forecasting, optimisation and deep learning, ",
  headlineEmphasis: "built to be acted on",
  lede: "MSc Data Science & Artificial Intelligence student at the University of Hull. I build time-series forecasts, neural networks and optimisation pipelines, then translate the output into a decision a manager can actually use.",
  ctas: [
    { label: "Download CV ↓", href: "/CV_Laud_Asante.pdf", primary: true },
    { label: "GitHub ↗", href: "https://github.com/Laud1ens" },
    { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/laud-asante-938382103/", status: "in-progress" },
    { label: "Hugging Face ↗", href: "https://huggingface.co/laud1ens" },
  ] as LinkCta[],
  stats: [
    { value: 0.745, decimals: 3, label: "SARIMA R², county forecast" },
    { value: 98.5, suffix: "%", label: "Predictive maintenance accuracy" },
    { value: 4, suffix: "x", label: "Faster reporting cycle" },
  ] as Stat[],
};

export const about = {
  paragraphs: [
    "I tell stories with data. Because behind every number, there's a decision waiting to be made.",
    "My background started in fast-paced sales and operational environments, where reading patterns under pressure wasn't optional. It was survival. That instinct for finding signal in noise is now what I bring to machine learning and data science, backed by an MSc in Data Science and Artificial Intelligence at the University of Hull.",
    "I work across the full ML pipeline: wrangling messy real-world data, engineering features that actually matter, selecting and tuning models with care for the right metrics (not just accuracy), and translating outputs into decisions non-technical teams can act on. Recent projects include a predictive maintenance classifier that hit 98.5% accuracy on 10,000 machine records, an NLP sentiment pipeline reducing manual review time across a large customer corpus, and SQL-driven analytics dashboards that cut a 3-day reporting cycle down to 4 hours.",
    "I write Python, think statistically, and communicate findings in plain language. I care deeply about why a model works, not just that it does. Open to data scientist, ML/DL, and graduate roles across the UK.",
  ],
  pivotCard: {
    title: "How I actually work",
    lines: [
      "// Wrangle messy data → engineer features that matter",
      "// Select and tune models for the right metric",
      "// Validate with proper statistical testing",
      "// Translate output into a decision, not just a score",
      "// FMCG Area Manager → MSc AI & Data Science, Hull",
    ],
  },
};

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
}

export const experience: ExperienceEntry[] = [
  {
    role: "Freelance Data Analysis Mentee",
    company: "Generation Ghana",
    period: "Aug 2025 – Present",
    location: "Remote · Hull, UK",
    description:
      "Structured mentorship programme in data analysis fundamentals and career readiness. Completed practical Excel/SQL data-cleaning projects, strengthened data storytelling for non-technical audiences, and built an analytical project portfolio with dashboards.",
  },
  {
    role: "Area Sales Manager",
    company: "Sweet Nutrition Limited",
    period: "Jun 2022 – Oct 2025",
    location: "Kumasi, Ghana",
    description:
      "Managed a defined sales territory to exceed targets. Developed and executed strategic sales plans, monitored market trends and competitor activity, and produced AI-assisted trend analysis and KPI dashboards for senior leadership across 5 territories and 200+ accounts.",
  },
  {
    role: "Branch Sales Manager, Pharmaceuticals & FMCG",
    company: "Classfam Pharmaceuticals",
    period: "May 2021 – May 2022",
    location: "Cape Coast, Ghana",
    description:
      "Led branch sales operations and product distribution across pharmaceutical and FMCG sectors, applying data-integrity and audit-trail standards directly analogous to production ML data governance.",
  },
  {
    role: "Territory Sales Supervisor",
    company: "Sunda Invest Limited",
    period: "Sep 2019 – Apr 2021",
    location: "Greater Accra, Ghana",
    description:
      "Supervised a team of sales representatives across the Western & Central Market, analysing sales throughput data to identify territory-level efficiency gaps and optimise performance.",
  },
  {
    role: "Territory Sales Manager",
    company: "Sunda Invest Limited",
    period: "Mar 2018 – Aug 2019",
    location: "Western Region, Ghana",
    description:
      "Managed a designated sales territory, leading a team of four to exceed ambitious sales targets, and implemented market-penetration strategies to drive product adoption.",
  },
  {
    role: "Business Development & Training Coordinator",
    company: "The HuD Group",
    period: "Mar 2017 – Feb 2018",
    location: "Adenta, Ghana",
    description:
      "Led business development initiatives and managed social media presence for the consultancy.",
  },
];

export interface Project {
  tag: string;
  title: string;
  role: string;
  what: string;
  outcome: string;
  impact: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    tag: "MSc Dissertation · University of Hull",
    title: "US County-Level Forecasting: SARIMA vs XGBoost vs GAT-LSTM",
    role: "Aug 2025 – Nov 2026 · Supervised by Dr. Tongxin Chen",
    what: "Building a four-notebook, seven-model forecasting pipeline (SARIMA, SARIMAX, XGBoost, LSTM, GAT-LSTM variants) benchmarked across 3,219 US counties, engineering mobility-graph features from weekly flow data.",
    outcome: "Current headline result: SARIMA leads with R²=0.745, outperforming the more complex GAT-LSTM architectures so far — an evidence-based case in progress for choosing the simpler model that actually generalises.",
    impact: "a documented, evidence-based case for choosing the simpler model that actually works over the more sophisticated one that doesn't, useful to any Data Science or ML Team Lead deciding where to spend model-complexity budget.",
  },
  {
    tag: "Personal Project · Full-Stack AI Product",
    title: "NexaHeat FX: Forex Intelligence Platform",
    role: "Solo build · ongoing",
    what: "Designed and built a browser-based FX intelligence tool from scratch, integrating live market data (Twelve Data) with three LLM providers (Claude, Groq, Gemini) to generate real-time market commentary and signals.",
    outcome: "Shipped a working end-to-end product independently, now scoping a market-prediction layer starting with XGBoost and progressing toward a Temporal Fusion Transformer.",
    impact: "proof I can ship a working, multi-API AI product end-to-end, not just a notebook, relevant to Engineering & Product Managers hiring for applied AI roles.",
  },
  {
    tag: "NLP · Module 771767",
    title: "Sarcasm Detection: Deployment-Ready Model Comparison",
    role: "Coursework, MSc AI & Data Science",
    what: "Compared six approaches — Naive Bayes, Logistic Regression, LSTM, GRU, and a fine-tuned/frozen MiniLM Transformer — for detecting sarcasm across 28,503 headlines, then stress-tested every model on 24 out-of-domain sentences.",
    outcome: "Fine-tuned MiniLM reached 92% in-domain accuracy (0.974 AUC-ROC) but collapsed to 50% (chance level) out-of-domain — identical to the weaker LSTM baseline, confirmed via McNemar's test (p<0.001).",
    impact: "shows the statistical rigor to prove a model actually won — and the honesty to show where it breaks — the check a Data Science Manager looks for before trusting a model claim in production.",
    repoUrl: "https://github.com/Laud1ens/Sarcasm-detection-using-AI---NLP-Project",
  },
  {
    tag: "Big Data · Module 771762",
    title: "UK Road Safety & Social Network Analysis",
    role: "Coursework, MSc AI & Data Science",
    what: "Mined UK STATS19 road accident records alongside SNAP Facebook ego-network graph data to surface geographic and social patterns at scale.",
    outcome: "Delivered a combined structured-data and network-graph analysis, built to High Distinction standard.",
    impact: "turns large, messy public safety datasets into geography-specific, decision-ready patterns, useful to Local Authority & Transport Analytics Managers.",
  },
  {
    tag: "Applied ML · Personal Project",
    title: "Manufacturing Analytics: Predictive Maintenance (AI4I2020)",
    role: "Solo build",
    what: "Built a predictive maintenance classifier on the AI4I2020 industrial dataset (10,000 machine records), engineering sensor-derived features and focusing evaluation choices on what actually holds up under class imbalance rather than raw accuracy.",
    outcome: "Reached 98.5% accuracy on held-out machine-failure prediction, validated against imbalance-aware metrics rather than accuracy alone.",
    impact: "gives a Plant or Operations Manager a decision-ready early-warning signal for machine failure, cutting unplanned downtime risk.",
    repoUrl: "https://github.com/Laud1ens/Manufacturing-Analytics-Predictive-Maintenance-AI4I2020",
  },
];

/**
 * More projects get pushed to GitHub over time. Rather than hard-coding a
 * count or a "latest" list that needs a code change per upload, this points
 * to the live profile so newly published repos are discoverable immediately;
 * promote a repo to a full `projects` entry above when it's ready for a
 * proper case-study card.
 */
export const moreProjects = {
  label: "More projects, added as they're published",
  url: "https://github.com/Laud1ens?tab=repositories",
};

export interface WritingPost {
  title: string;
  teaser: string;
  impressions: number;
  url: string;
}

export const writing: WritingPost[] = [
  {
    title: "Gradient Descent finally clicked for me — and here is what changed.",
    teaser: "For a long time, I genuinely struggled to grasp what gradient descent actually was — and more importantly, where it fit in the bigger picture of AI.",
    impressions: 312,
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7463036844625088512/",
  },
  {
    title: "Sarcasm Detection Using 5 AI Models — Non-Technical Read",
    teaser: "I built an AI detector that spots sarcasm. I later found out it was cheating. I tried 'fixing it', and the AI got better at cheating.",
    impressions: 264,
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7484577805104578560/",
  },
  {
    title: "My algorithm found the most dangerous road in West Yorkshire. It didn't feel like a win.",
    teaser: "Read the full story about what the model surfaced, and why finding the answer wasn't the satisfying part.",
    impressions: 79,
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7459992732653199361/",
  },
  {
    title: "The one-line bug that dropped my model to 35% accuracy",
    teaser: "I was training on unscaled data but validating on scaled data. Changed x=x_train to x=x_train_scaled and watched accuracy jump from 35% to 84% in a single run.",
    impressions: 535,
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7433888787413237760/",
  },
];

export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Forecasting & Optimisation",
    skills: [
      "SARIMA / Prophet",
      "Temporal Fusion Transformer",
      "XGBoost / LightGBM",
      "Bayesian Optimisation (Optuna)",
      "Demand Planning",
    ],
  },
  {
    title: "Deep Learning & Neural Networks",
    skills: ["PyTorch", "GNN / GAT", "LSTM / GRU", "Transformers", "Model Interpretability (SHAP)"],
  },
  {
    title: "Data & MLOps",
    skills: [
      "Python",
      "Pandas / NumPy",
      "SQL",
      "GeoPandas",
      "Power BI",
      "Tableau",
      "IBM SPSS",
      "Model Monitoring & Drift",
    ],
  },
  {
    title: "Applied AI",
    skills: ["Claude API / MCP", "RAG & Vector Search", "LLM Orchestration", "n8n Automation", "Statistical Testing"],
  },
];

export const contact = {
  heading: "Let's talk data.",
  blurb: "Open to Data Scientist, ML/DL, and Graduate roles across the UK. Based in Hull, happy to relocate or work remotely.",
  items: [
    { label: "Email", value: "asantelaud@gmail.com", href: "mailto:asantelaud@gmail.com" },
    { label: "UK", value: "+44 7377 261459", href: "tel:+447377261459" },
    { label: "Ghana (WhatsApp)", value: "+233 26 111 7050", href: "https://wa.me/233261117050" },
    { label: "Location", value: "Hull, UK" },
  ],
  footerLinks: [
    { label: "Download CV", href: "/CV_Laud_Asante.pdf" },
    { label: "GitHub", href: "https://github.com/Laud1ens" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/laud-asante-938382103/", status: "in-progress" },
    { label: "Hugging Face", href: "https://huggingface.co/laud1ens" },
  ] as LinkCta[],
};
