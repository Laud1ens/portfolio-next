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
  /** Set when the destination itself (profile/page) is still being polished.
   * Renders a small "Updating" badge instead of implying it's finished. */
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
    { value: 94.7, suffix: "%", decimals: 1, label: "Precision, machine-failure detection" },
    { value: 0.974, decimals: 3, label: "AUC-ROC, sarcasm detection" },
  ] as Stat[],
};

export const about = {
  paragraphs: [
    "I tell stories with data. Because behind every number, there's a decision waiting to be made.",
    "My background started in fast-paced sales and operational environments, where reading patterns under pressure wasn't optional. It was survival. That instinct for finding signal in noise is now what I bring to machine learning and data science, backed by an MSc in Data Science and Artificial Intelligence at the University of Hull.",
    "I work across the full ML pipeline: wrangling messy real-world data, engineering features that actually matter, selecting and tuning models with care for the right metrics (not just accuracy), and translating outputs into decisions non-technical teams can act on. Recent projects include a predictive maintenance classifier on 10,000 machine records where only 3.39% of machines actually fail, a base rate that makes accuracy meaningless and precision and cross-validated recall the numbers worth reporting; a six-model NLP comparison for sarcasm detection that reached 0.974 AUC-ROC in-domain and then collapsed to chance level on out-of-domain text, which turned out to be the more useful finding; and a seven-model forecasting benchmark across 3,219 US counties where the simplest model is currently beating the most complex one.",
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

export type ProjectVisual =
  | {
      type: "comparisonBar";
      headlineStat?: { value: number; decimals?: number; suffix?: string; label: string };
      primary: { label: string; value: number };
      secondary: { label: string; value: number };
      primaryCaption: string;
      valueDecimals?: number;
    }
  | { type: "flow"; nodes: [string, string, string]; captions?: [string?, string?, string?] }
  | { type: "radialStat"; value: number; suffix?: string; decimals?: number; label: string };

export interface Project {
  tag: string;
  title: string;
  role: string;
  what: string;
  outcome: string;
  impact: string;
  repoUrl?: string;
  visual?: ProjectVisual;
}

export const projects: Project[] = [
  {
    tag: "Independent Research · Anomaly Detection",
    title: "Anomaly Detection Under Distribution Shift: NSL-KDD & SECOM",
    role: "Solo study · Jul 2026",
    what: "Benchmarked eight detectors (supervised and one-class) on NSL-KDD intrusion data, evaluating them against 17 attack types deliberately held out of training, with every decision threshold calibrated on held-out traffic at a fixed 1% false-positive rate and then frozen.",
    outcome: "A Random Forest scoring a perfect ROC-AUC of 1.0000 under random cross-validation detects just 5.1% of unseen attacks once held to the false-positive budget it was actually calibrated for, against 33.2% for an Isolation Forest. Its apparent 83.2% detection rate came from silently running at 9.75% false positives, nearly ten times its budget.",
    impact: "a concrete demonstration that a detection rate reported without its false-positive rate ranks models in the wrong order, plus two failed hypotheses and an underpowered significance test documented rather than buried, which is the evidence trail a Security or ML Lead needs before trusting a benchmark number.",
    repoUrl: "https://github.com/Laud1ens/anomaly-detection-under-drift",
    visual: {
      type: "comparisonBar",
      headlineStat: { value: 6.4, decimals: 1, suffix: "x", label: "More unseen attacks caught, same false-alarm cost" },
      primary: { label: "Isolation Forest", value: 33.2 },
      secondary: { label: "Random Forest", value: 5.1 },
      primaryCaption: "Novel-attack detection at a true 1% FPR (%)",
      valueDecimals: 1,
    },
  },
  {
    tag: "MSc Dissertation · University of Hull",
    title: "US County-Level Forecasting: SARIMA vs XGBoost vs GAT-LSTM",
    role: "Aug 2025 – Nov 2026 · Supervised by Dr. Tongxin Chen",
    what: "Building a four-notebook, seven-model forecasting pipeline (SARIMA, SARIMAX, XGBoost, LSTM, GAT-LSTM variants) benchmarked across 3,219 US counties, engineering mobility-graph features from weekly flow data.",
    outcome: "Current headline result: SARIMA leads with R²=0.745, outperforming the more complex GAT-LSTM architectures so far, an evidence-based case in progress for choosing the simpler model that actually generalises.",
    impact: "a documented, evidence-based case for choosing the simpler model that actually works over the more sophisticated one that doesn't, useful to any Data Science or ML Team Lead deciding where to spend model-complexity budget.",
    visual: {
      type: "comparisonBar",
      headlineStat: { value: 0.745, decimals: 3, label: "SARIMA R², current leader" },
      primary: { label: "XGBoost", value: 0.593 },
      secondary: { label: "GAT-LSTM", value: -0.007 },
      primaryCaption: "Earlier benchmark (R²)",
    },
  },
  {
    tag: "Personal Project · Full-Stack AI Product",
    title: "NexaHeat FX: Forex Intelligence Platform",
    role: "Solo build · ongoing",
    what: "Designed and built a browser-based FX intelligence tool from scratch, integrating live market data (Twelve Data) with three LLM providers (Claude, Groq, Gemini) to generate real-time market commentary and signals.",
    outcome: "Shipped a working end-to-end product independently, now scoping a market-prediction layer starting with XGBoost and progressing toward a Temporal Fusion Transformer.",
    impact: "proof I can ship a working, multi-API AI product end-to-end, not just a notebook, relevant to Engineering & Product Managers hiring for applied AI roles.",
    visual: {
      type: "flow",
      nodes: ["Market Data", "Multi-LLM Signal Engine", "Live Commentary"],
      captions: ["Twelve Data", "Claude · Groq · Gemini", "& Signals"],
    },
  },
  {
    tag: "NLP · Module 771767",
    title: "Sarcasm Detection: Deployment-Ready Model Comparison",
    role: "Coursework, MSc AI & Data Science",
    what: "Compared six approaches (Naive Bayes, Logistic Regression, LSTM, GRU, and a fine-tuned/frozen MiniLM Transformer) for detecting sarcasm across 28,503 headlines, then stress-tested every model on 24 out-of-domain sentences.",
    outcome: "Fine-tuned MiniLM reached 92% in-domain accuracy (0.974 AUC-ROC) but collapsed to 50% (chance level) out-of-domain, identical to the weaker LSTM baseline and confirmed via McNemar's test (p<0.001).",
    impact: "shows the statistical rigor to prove a model actually won, and the honesty to show where it breaks: the check a Data Science Manager looks for before trusting a model claim in production.",
    repoUrl: "https://github.com/Laud1ens/Sarcasm-detection-using-AI---NLP-Project",
    visual: {
      type: "comparisonBar",
      primary: { label: "In-domain", value: 92 },
      secondary: { label: "Out-of-domain", value: 50 },
      primaryCaption: "MiniLM accuracy (%)",
      valueDecimals: 0,
    },
  },
  {
    tag: "Big Data · Module 771762",
    title: "UK Road Safety & Social Network Analysis",
    role: "Coursework, MSc AI & Data Science",
    what: "Mined UK STATS19 road accident records alongside SNAP Facebook ego-network graph data to surface geographic and social patterns at scale.",
    outcome: "Delivered a combined structured-data and network-graph analysis, built to High Distinction standard.",
    impact: "turns large, messy public safety datasets into geography-specific, decision-ready patterns, useful to Local Authority & Transport Analytics Managers.",
    visual: {
      type: "flow",
      nodes: ["STATS19 Road Records", "SNAP Facebook Networks", "Geo + Social Insights"],
    },
  },
  {
    tag: "Applied ML · Personal Project",
    title: "Manufacturing Analytics: Predictive Maintenance (AI4I2020)",
    role: "Solo build",
    what: "Built a predictive maintenance classifier on the AI4I2020 industrial dataset (10,000 machine records), engineering sensor-derived features and focusing evaluation choices on what actually holds up under class imbalance rather than raw accuracy.",
    outcome: "Failures are 3.39% of the dataset, so predicting \"no failure\" every time already scores 96.6% accuracy. No accuracy figure is reported anywhere in the project. Gradient Boosting, selected on F1, reached 94.7% precision with cross-validated recall of 0.761 ± 0.057 across 5 stratified folds, holding 76-84% recall on every machine type including the low-grade units that fail at nearly twice the rate.",
    impact: "gives a Plant or Operations Manager a decision-ready early-warning signal for machine failure, cutting unplanned downtime risk.",
    repoUrl: "https://github.com/Laud1ens/Manufacturing-Analytics-Predictive-Maintenance-AI4I2020",
    visual: {
      type: "radialStat",
      value: 94.7,
      suffix: "%",
      decimals: 1,
      label: "Precision, machine-failure detection",
    },
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
    title: "Gradient Descent finally clicked for me - and here is what changed.",
    teaser: "For a long time, I genuinely struggled to grasp what gradient descent actually was, and more importantly, where it fit in the bigger picture of AI.",
    impressions: 312,
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7463036844625088512/",
  },
  {
    title: "Sarcasm Detection Using 5 AI Models - Non-Technical Read",
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
