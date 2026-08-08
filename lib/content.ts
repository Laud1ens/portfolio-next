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
    { label: "Request CV ✉", href: "mailto:asantelaud@gmail.com?subject=CV%20request&body=Hi%20Laud%2C%0A%0AI%27d%20like%20a%20copy%20of%20your%20CV%20for%20the%20following%20role%3A%0A%0A", primary: true },
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

/** A figure exported from the project's own analysis code, not a stock image. */
export interface DetailFigure {
  src: string;
  alt: string;
  caption: string;
}

export interface DetailSection {
  heading: string;
  body: string;
  /** Optional pulled-out number. Kept short: it renders large. */
  stat?: { value: string; label: string };
}

/** Long-form expansion revealed on scroll. Every figure and number here is
 *  produced by the project's own code; nothing is illustrative. */
export interface ProjectDetail {
  kicker: string;
  headline: string;
  sections: DetailSection[];
  figures?: DetailFigure[];
}

export interface Project {
  tag: string;
  title: string;
  role: string;
  what: string;
  outcome: string;
  impact: string;
  repoUrl?: string;
  visual?: ProjectVisual;
  detail?: ProjectDetail;
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
    detail: {
      kicker: "The benchmark lied",
      headline: "A perfect score on the test set, and almost nothing caught in the field.",
      sections: [
        {
          heading: "What a perfect ROC-AUC actually bought",
          body: "Under random cross-validation the Random Forest scored 1.0000. Flawless. Then it was shown 17 attack types deliberately held out of training, with its decision threshold calibrated on clean traffic at a 1% false-positive budget and then frozen. Held to that budget, it caught 5.1% of the unseen attacks.",
          stat: { value: "5.1%", label: "Novel attacks caught at a true 1% false-positive rate" },
        },
        {
          heading: "Where the missing 78 points went",
          body: "The model appeared to detect 83.2%. It was doing that while flagging 9.75% of all normal traffic, nearly ten times the budget it had been given. Its score distribution had shifted under drift, so the frozen cutoff quietly stopped meaning what it meant at calibration time. The detection rate was real. The price was hidden.",
        },
        {
          heading: "The model that looked worse was better",
          body: "An Isolation Forest, which trails badly on the headline benchmark, held its calibration to within 1.7x and caught 33.2% at a genuine 1% false-positive rate. That is 6.4 times more novel attacks for the same cost in analyst time. A detection rate quoted without its false-positive rate does not just overstate performance, it ranks the models in the wrong order.",
          stat: { value: "6.4x", label: "More unseen attacks caught, same analyst cost" },
        },
        {
          heading: "What was left in rather than tidied away",
          body: "Two hypotheses were tested and failed, including the expectation that supervised models would degrade more than one-class models on novel attacks. The Mann-Whitney test on that comparison returned p = 0.39 across three supervised and five one-class detectors, which is underpowered and reported as such. Both are in the write-up. A benchmark that only contains the results that worked is not a benchmark.",
        },
      ],
      figures: [
        {
          src: "/figures/anomaly-threshold-drift.png",
          alt: "Chart showing realised false-positive rate against the 1% calibration target for each detector",
          caption: "Every detector's realised false-positive rate against the 1% budget it was calibrated for. The Random Forest runs at 9.75%, the Isolation Forest at 1.70%.",
        },
        {
          src: "/figures/anomaly-known-vs-novel.png",
          alt: "Detection rates on known versus novel attack partitions for eight detectors",
          caption: "Detection on attack types seen in training versus the 17 held out. The gap is where deployment performance actually lives.",
        },
      ],
    },
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
    detail: {
      kicker: "In progress",
      headline: "Seven models across 3,219 counties, and the simplest one is currently ahead.",
      sections: [
        {
          heading: "The result so far, and it is not the expected one",
          body: "SARIMA leads on R squared at 0.745, ahead of the graph-attention and LSTM architectures built to beat it. The graph models encode mobility flows between counties, which should help. So far the added structure has not paid for itself against a well-specified classical model.",
          stat: { value: "0.745", label: "SARIMA R squared, currently the leader" },
        },
        {
          heading: "Why that is worth writing up rather than fixing",
          body: "The tempting move is to keep tuning the complex model until it wins. The more useful contribution is an honest benchmark showing where the extra complexity stops earning its keep, on real data, at national scale. A negative result that is properly controlled is more transferable than a positive one that was tuned into existence.",
        },
        {
          heading: "Status and honesty about it",
          body: "This is live dissertation work supervised by Dr Tongxin Chen, submitting August 2026. The numbers above are current, not final, and the ranking could still change as the remaining architectures are tuned. They are quoted here as work in progress rather than as a conclusion.",
        },
      ],
    },
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
    detail: {
      kicker: "Shipped, not notebooked",
      headline: "A working browser product wiring live market data to three separate LLM providers.",
      sections: [
        {
          heading: "What it does",
          body: "Live foreign-exchange data from the Twelve Data API feeds a currency-strength heatmap and an order-flow engine, with Claude, Groq and Gemini generating market commentary and signals on top. Three providers rather than one, so a single vendor outage or rate limit does not take the product down.",
        },
        {
          heading: "Why it is here",
          body: "Most of a data science portfolio is notebooks. Notebooks do not teach you what happens when an API rate-limits mid-request, when providers disagree, or when a response arrives malformed at the exact moment someone is looking at the screen. This one is a product with users' expectations attached, and it was built and shipped solo.",
        },
        {
          heading: "What it does not claim",
          body: "There is no accuracy figure here, because the prediction layer is still being scoped. Adding one would mean quoting a backtest that has not been run. The next step is an XGBoost baseline, then a Temporal Fusion Transformer, and the numbers get published when they exist.",
        },
      ],
    },
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
    detail: {
      kicker: "It was cheating",
      headline: "The best model scored 92% in-domain and exactly chance level the moment the sentences came from somewhere else.",
      sections: [
        {
          heading: "Six approaches, one honest test",
          body: "Naive Bayes, Logistic Regression, LSTM, GRU and MiniLM in both frozen and fine-tuned form were compared on 28,503 news headlines. The fine-tuned MiniLM won convincingly at 92% accuracy and 0.974 AUC-ROC. On this dataset it looked finished.",
          stat: { value: "0.974", label: "AUC-ROC in-domain, the number that flattered it" },
        },
        {
          heading: "Then it met sentences it had not been trained on",
          body: "Every model was stress-tested on 24 out-of-domain sentences. The fine-tuned MiniLM dropped to 50%, which on a two-class problem is a coin toss. It had not learned sarcasm. It had learned the stylistic fingerprint of one publication's headlines, and that fingerprint does not exist outside the training corpus.",
          stat: { value: "50%", label: "Out-of-domain accuracy, identical to guessing" },
        },
        {
          heading: "The weakest model performed the same",
          body: "Out of domain, the transformer matched the far simpler LSTM baseline exactly. Whatever the extra capacity bought in-domain evaporated. The in-domain difference was confirmed as statistically real by McNemar's test at p < 0.001, which makes the collapse more interesting rather than less: a genuine, significant, measurable advantage that transferred not at all.",
        },
        {
          heading: "Why this is the useful result",
          body: "A model comparison that ends at the leaderboard would have shipped the transformer. The out-of-domain probe is cheap, takes 24 sentences, and is the difference between a model that works and a model that appears to. This is the check worth running before trusting any benchmark number, including your own.",
        },
      ],
    },
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
    what: "Mined 461,352 UK STATS19 collision records alongside SNAP Facebook ego-network data (4,039 nodes, 88,234 edges), covering association rule mining, spatial clustering, time-series forecasting and community detection.",
    outcome: "Graded Distinction. Revisiting it afterwards, I found the motorcycle analysis had filtered the wrong STATS19 codes: every engine class was mislabelled by one and the >500cc class was excluded entirely, dropping 20,950 machines, 31.1% of all motorcycles. That class turned out to carry the highest killed-or-seriously-injured rate at 46.4% against 23.9% for the smallest, so the omission had biased the severity finding downward.",
    impact: "the corrected version is the more useful portfolio piece, because it shows coding errors found and quantified against the raw database rather than a clean result presented as if nothing went wrong. Scoring the forecasts against a seasonal-naive benchmark, which the original never did, showed the ETS model loses to simply repeating last year on the Metropolitan force (-2.7% skill) while beating it on Humberside (+23.1%), so reporting error alone had concealed a model adding nothing on the largest force. The rebuilt network analysis runs three community-detection algorithms against each other instead of one, which exposed that the \"long tail\" of small groups is created by the algorithm rather than present in the data.",
    repoUrl: "https://github.com/Laud1ens/uk-road-safety-network-analysis",
    detail: {
      kicker: "Marked, then re-opened",
      headline: "The graded submission had filtered the wrong vehicle codes, and the missing class was the most dangerous one.",
      sections: [
        {
          heading: "One digit, thirty-one per cent of the data",
          body: "The motorcycle analysis selected STATS19 vehicle codes 2, 3 and 4 and labelled them as up-to-125cc, 125-500cc and over-500cc. Those codes are actually 50cc-and-under, 125cc-and-under and 125-to-500cc. Every label sat one class low, and code 5, the real over-500cc class, was excluded entirely.",
          stat: { value: "20,950", label: "Motorcycles dropped, 31.1% of all of them" },
        },
        {
          heading: "Why the omission mattered more than its size",
          body: "The excluded class carries the highest killed-or-seriously-injured rate in the dataset at 46.4%, against 23.9% for the smallest machines. Leaving it out did not just shrink the sample, it biased the severity finding downward. It also removed the only class that breaks the weekday commuting pattern: weekend share sits flat between 23.6% and 25.1% for the three smaller classes, then steps up to 30.9%.",
          stat: { value: "46.4%", label: "KSI rate of the class that was left out" },
        },
        {
          heading: "The forecast that was never checked against doing nothing",
          body: "The original reported forecast error and stopped. Scoring the same models against a seasonal-naive benchmark, simply repeating last year's week, changes the conclusion: the model adds 23.1% skill on Humberside and 2.2% on West Yorkshire, but scores -2.7% on the Metropolitan force. On the largest force in the dataset, the machinery was performing worse than repetition.",
        },
        {
          heading: "The highest-scoring rule was meaningless",
          body: "In the association-rule mining, the top rule by lift is Rain to Wet Road at 4.22. Rain is what makes roads wet. Sorting a rule table by lift puts mechanical relationships at the top, which is why conviction is reported alongside it. The actionable rules are the moderate-lift ones tied to things a highway authority can change: speed limits and street lighting.",
        },
      ],
      figures: [
        {
          src: "/figures/roads-motorcycles-corrected.png",
          alt: "Two charts of motorcycle collisions by hour and weekday across all four engine classes",
          caption: "The corrected analysis, with all four STATS19 engine classes including the over-500cc group that was previously excluded.",
        },
        {
          src: "/figures/roads-clustering.png",
          alt: "Side by side scatter plots of West Yorkshire collisions under K-Means and DBSCAN clustering",
          caption: "K-Means against DBSCAN on the same collisions. Silhouette 0.539 versus 0.265, but DBSCAN leaves 9.5% as noise rather than forcing rural collisions into a cluster.",
        },
      ],
    },
    visual: {
      type: "comparisonBar",
      headlineStat: { value: 31.1, decimals: 1, suffix: "%", label: "Of motorcycles excluded by the original filter" },
      primary: { label: ">500cc (excluded)", value: 46.4 },
      secondary: { label: "<=50cc", value: 23.9 },
      primaryCaption: "Killed or seriously injured rate by engine class (%)",
      valueDecimals: 1,
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
    detail: {
      kicker: "When accuracy is a trap",
      headline: "Only 3.39% of these machines fail, so a model that never predicts failure is already 96.6% accurate.",
      sections: [
        {
          heading: "Why no accuracy figure appears anywhere",
          body: "Failure is rare. A system that ignores every sensor and says \"this machine is fine\" every single time scores 96.6%. That number sounds excellent and means nothing. So accuracy is not reported as a result anywhere in this project, and the metrics that survive the imbalance are used instead.",
          stat: { value: "96.6%", label: "Accuracy of a model that predicts nothing at all" },
        },
        {
          heading: "What the model actually does",
          body: "Gradient Boosting, selected on F1 against Random Forest and Logistic Regression, reaches 94.7% precision. Of 68 real failures in the held-out set it catches 54 and raises 3 false alarms among 1,932 healthy machines. Recall from a single split flatters it, so five-fold cross-validation gives the honest figure: 0.761 plus or minus 0.057, a range rather than a point.",
          stat: { value: "76%", label: "Cross-validated recall, with its uncertainty attached" },
        },
        {
          heading: "The finding that needs no model at all",
          body: "Grouping tool wear into bands shows risk is flat across the first three, at 2.17%, 2.33% and 2.18%, then roughly triples to 6.06% once wear passes the critical threshold. Replacing tools slightly earlier buys almost nothing. Letting them run into that final band is where the risk actually sits. That is a maintenance decision available without deploying anything.",
        },
        {
          heading: "A claim the project had to withdraw",
          body: "The write-up stated tool wear was the dominant predictive signal, confirmed by two independent methods. Re-running both from the raw data contradicted it. Permutation importance ranks rotational speed first with tool wear fourth; the impurity-based method ranks power output first with tool wear third. The two methods disagree with each other, so neither is quoted as definitive. The correction is documented rather than quietly dropped.",
        },
      ],
      figures: [
        {
          src: "/figures/ai4i-toolwear-band.png",
          alt: "Bar chart of machine failure rate across four tool wear bands",
          caption: "Failure rate by tool wear band. Flat at roughly 2.2% across the first three, then 6.06% once wear turns critical.",
        },
        {
          src: "/figures/ai4i-threshold.png",
          alt: "Line chart of recall and precision across decision thresholds from 0.1 to 0.9",
          caption: "The recall and precision trade-off across every cutoff. Where to draw the line is a business decision about the cost of a missed breakdown, not one the model can make.",
        },
      ],
    },
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
  blurb: "Open to Data Scientist, ML/DL, and Graduate roles across the UK. Based in Hull, happy to relocate or work remotely. I don't publish a generic CV: email me with the role and I'll send one written against it, with the detail that actually matters for that position.",
  items: [
    { label: "Email", value: "asantelaud@gmail.com", href: "mailto:asantelaud@gmail.com" },
    { label: "UK", value: "+44 7377 261459", href: "tel:+447377261459" },
    { label: "Ghana (WhatsApp)", value: "+233 26 111 7050", href: "https://wa.me/233261117050" },
    { label: "Location", value: "Hull, UK" },
  ],
  footerLinks: [
    { label: "Request CV", href: "mailto:asantelaud@gmail.com?subject=CV%20request" },
    { label: "GitHub", href: "https://github.com/Laud1ens" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/laud-asante-938382103/", status: "in-progress" },
    { label: "Hugging Face", href: "https://huggingface.co/laud1ens" },
  ] as LinkCta[],
};
