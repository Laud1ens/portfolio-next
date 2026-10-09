export interface Stat {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  /** Plain-English line under the label: what the number means, not just
   *  what it's called. Added 9 Oct 2026 so a bare 0.887 isn't left to speak
   *  for itself. */
  meaning?: string;
}

export interface LinkCta {
  label: string;
  href: string;
  primary?: boolean;
  /** Set when the destination itself (profile/page) is still being polished.
   * Renders a small "Updating" badge instead of implying it's finished. */
  status?: "in-progress";
}

/** Opens Gmail's compose window with the message already drafted, so the
 *  sender only fills in the bracketed bits. Deliberately casual: a blank
 *  mailto gets ignored, a half-written one gets finished and sent. */
const CV_REQUEST_BODY = [
  "Hi Laud,",
  "",
  "I came across your portfolio through [LinkedIn / a friend / browsing online / somewhere else - say which].",
  "",
  "What caught my interest was your work on [which project or which area].",
  "",
  "Could you send your CV over? Happy to take it from there.",
  "",
  "Or if there is a project on my side you might want to work on, I have put a bit about it below and you can come back to me.",
  "",
  "About the project (optional):",
  "",
  "",
  "My details",
  "Name:",
  "Organisation:",
  "Role:",
  "Email:",
  "Phone:",
  "",
  "Thanks",
].join("\n");

export const CV_REQUEST_MAILTO =
  "https://mail.google.com/mail/?view=cm&fs=1&to=asantelaud%40gmail.com" +
  "&su=" +
  encodeURIComponent("Your CV, and possibly a project") +
  "&body=" +
  encodeURIComponent(CV_REQUEST_BODY);

/**
 * Changed 9 Oct 2026, per Laud: the hero now leads with him, his journey and
 * what that means for a business reading this cold, rather than opening on
 * the staffing portal. `lede` and `bridge` are now two full paragraphs of
 * equal visual weight (bridge dropped its blockquote styling in hero.tsx),
 * not a headline paragraph plus a one-line hand-off. Every claim in both is
 * still something the CV and the projects below can back up: the GHS 3.2M
 * target, the MSc, the portal. Nothing here is a number invented for the
 * pitch.
 */
export const LINKEDIN_URL = "https://www.linkedin.com/in/laud-asante-938382103/";

export const hero = {
  kicker: "Laud Asante · Data Science & AI · Hull, UK",
  headline: "I spent six years being the person a forecast happened to, ",
  headlineEmphasis: "now I build the forecast",
  lede: "I spent six years inside the forecast rather than reading about it: setting prices, carrying a GHS 3.2 million monthly target across five distributor accounts, and finding out at 7am whether a gap in the numbers was demand, distribution, or the depot recording it wrong. FMCG manufacturing and distribution teach you what a model has to survive once it leaves the notebook, because the people downstream of a wrong number are real, and the consequences land on their shift, their stock, or their pay. I added an MSc in Artificial Intelligence and Data Science at the University of Hull to that experience so I could build the models myself instead of only absorbing what they produced. What I bring to a technical problem is six years of knowing what a number is going to do to the person who receives it, not just whether the number is accurate. That combination, commercial grounding first and the technical build second, is what the work below is evidence of.",
  bridge:
    "For a business, that means I can take a forecasting, pricing or operational problem from a vague question through to a shipped, tested system, not a notebook that ran once. I build end to end: data pipelines, demand forecasting and ML models in Python and SQL, dashboards a non-technical stakeholder can actually read, and production systems with the tests and audit trail a regulated or customer-facing environment needs. I am also honest about what a model does and does not know, which the projects below show directly: two of them are published corrections to my own earlier work, because a result that survives being checked is worth more than one that only survives being presented. If a business needs someone who can own a number from the raw data through to the decision it drives, and explain either one in the room, that is the work I do. The staffing portal below is the clearest single example: a production system a UK recruitment agency runs its real operation on, not a demo.",
  ctas: [
    { label: "Request CV ✉", href: CV_REQUEST_MAILTO, primary: true },
    { label: "GitHub ↗", href: "https://github.com/Laud1ens" },
    { label: "LinkedIn ↗", href: LINKEDIN_URL, status: "in-progress" },
  ] as LinkCta[],
  stats: [
    {
      value: 0.887,
      decimals: 3,
      label: "R², county-level case forecast",
      meaning: "Nine model configurations compared head to head; what the data could actually support, not what looked best on paper.",
    },
    {
      value: 94.7,
      suffix: "%",
      decimals: 1,
      label: "Precision, machine-failure detection",
      meaning: "Of the machines the model flagged, 19 in 20 were really about to fail, not a false alarm.",
    },
    {
      value: 0.974,
      decimals: 3,
      label: "AUC-ROC, sarcasm detection",
      meaning: "How well it separated sarcasm on data it was trained on, before testing found the limit of that number.",
    },
  ] as Stat[],
};

export const about = {
  paragraphs: [
    "I tell stories with data. Because behind every number, there's a decision waiting to be made.",
    "My background started in fast-paced sales and operational environments, where reading patterns under pressure wasn't optional. It was survival. That instinct for finding signal in noise is now what I bring to machine learning and data science, backed by an MSc in Data Science and Artificial Intelligence at the University of Hull.",
    // The old version of this paragraph re-told three project results in full,
    // which the project cards below already do properly and at length. Saying
    // it twice made the page longer without making the case stronger, so this
    // now says how I work and leaves the evidence to the work.
    "I work across the full ML pipeline: wrangling messy real-world data, engineering features that actually matter, selecting and tuning models for the metric the problem calls for rather than the one that flatters the result, and translating what comes out into a decision a non-technical team can act on. The projects below are the evidence, including the two where the honest finding was that my hypothesis was wrong.",
    "I write Python, think statistically, and explain findings in plain language. I care about why a model works, not just that it does. Open to data scientist, ML/DL and graduate roles across the UK, and you can ask Laudbot in the corner about any of it.",
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
    role: "Distributor Analytics and Demand Forecaster",
    company: "Sweet Nutrition Limited",
    period: "Jun 2022 – Aug 2025",
    location: "Kumasi, Ghana",
    // The "5 territories and 200+ accounts" that used to sit here were Sunda's
    // Accra numbers, duplicated onto this role at some point. Removed rather
    // than re-guessed: a figure attached to the wrong employer is the kind of
    // thing that falls apart in the one interview you wanted to pass.
    description:
      "Managed a defined sales territory to target, developed and executed the sales plans behind it, and tracked market and competitor movement. Produced AI-assisted trend analysis and KPI dashboards for senior leadership.",
  },
  {
    role: "Senior Analytics Executive",
    company: "Classfam Pharmaceuticals",
    period: "May 2021 – May 2022",
    location: "Cape Coast, Ghana",
    description:
      "Promoted from Sales Analytics and Reporting Manager to Senior Analytics Executive within the branch, leading sales operations and product distribution across pharmaceutical and FMCG sectors and applying data-integrity and audit-trail standards directly analogous to production ML data governance. Built and ran the weekly customer-performance tracker covering 180+ pharmacy, chemical-shop and clinic accounts across the Cape Coast and Central Region territory, logging each account's order activity against the week.",
  },
  {
    role: "Sales & Territory Management",
    company: "Sunda Invest Limited",
    period: "Mar 2018 – Apr 2021",
    location: "Accra & Western Region, Ghana",
    description:
      "Directly managed five key distributor accounts — twenty van sales teams reaching 200+ wholesaler and sub-distributor accounts, 7 supermarkets and 3 online/modern-trade vendors, with every order from outside the five routed to whichever distributor covered that Accra location — against a combined target of GHS 3.2 million a month. My reporting work got me pulled into Sunda's analytics team, and I moved to working remotely from there: ran the backoffice tracking each distributor's credit exposure and payment status, and built the daily Excel and Power BI reporting the distributors and their van teams worked to — month-to-date volume, achievement by product category, and the commission each contract was on track to pay. The weakest of the five was up 23.75% by my final month on it, and the top distributor earned 18.61% more in commission by buying against category targets it had previously ignored. Promoted into a second line of management, supervising the Cape Coast, Takoradi, Tarkwa and Prestea managers rather than salesmen directly — their combined distributor targets of about GHS 7 million became my secondary target, on top of keeping the analytics role running and reporting from the new region. Hitting it meant analysing team, sales, distributor and customer/supermarket-audit performance across the four territories to separate gaps that were structural from gaps that were personal, then working them through the managers who held each portfolio rather than around them. Also worked with the marketing team on market-collected pricing data to help set consumer, retail and ex-factory prices across the range.",
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

/** Changed 8 Oct 2026, per Laud's instruction: four fixed questions instead of
 *  a report with a dataset table, a findings grid and a plain-English
 *  restatement. What I set out to build, how I thought about it, what I used,
 *  what it found. Every number is still produced by the project's own code. */
export interface ProjectDetail {
  kicker: string;
  headline: string;
  /** What I set out to build. One or two sentences. */
  built: string;
  /** How I thought about it: the process, the design decision, the trap avoided. */
  process: string;
  /** Short tool/skill names, rendered as chips, not prose. */
  tools: string[];
  /** What it found, or the impact. Carries the project's real numbers. */
  impact: string;
  /** Optional pulled-out number. Kept short: it renders large. */
  stat?: { value: string; label: string };
  figure?: DetailFigure;
}

export interface Project {
  tag: string;
  title: string;
  role: string;
  what: string;
  outcome: string;
  impact: string;
  repoUrl?: string;
  /** Why there is no public repo. Rendered in place of the link, so a closed
   *  codebase reads as a decision rather than as a card somebody forgot to
   *  finish. Leave unset whenever `repoUrl` is set. */
  repoNote?: string;
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
      built: "A benchmark of eight anomaly detectors on NSL-KDD intrusion data, scored against 17 attack types held out of training and a false-positive budget fixed before the test set was touched.",
      process: "A model that wins on the headline metric is answering a different question from a model that still works once the data drifts. Every threshold was calibrated on clean traffic at a 1% false-positive budget, then frozen, so the test set could not quietly inflate the numbers.",
      tools: ["Python", "Scikit-learn", "NSL-KDD", "ROC-AUC", "Mann-Whitney test"],
      impact: "A Random Forest scoring a perfect 1.0000 ROC-AUC caught just 5.1% of unseen attacks once held to its real false-positive budget, against 33.2% for an Isolation Forest that looked worse on the headline number: 6.4x more novel attacks for the same false-alarm cost. Two hypotheses were tested and failed, and both are in the write-up.",
      stat: { value: "6.4x", label: "More unseen attacks caught, same false-alarm cost" },
      figure: {
        src: "/figures/anomaly-threshold-drift.png",
        alt: "Chart showing realised false-positive rate against the 1% calibration target for each detector",
        caption: "Every detector's realised false-positive rate against the 1% budget it was calibrated for. The Random Forest runs at 9.75%, the Isolation Forest at 1.70%.",
      },
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
    tag: "Production System · Live on this site",
    title: "Laudbot: An Assistant Instructed to Say No Rather Than Guess",
    role: "Solo build · live on Railway, powered by Gemini",
    what: "Built the chat widget on this site: a Gemini-powered assistant that answers visitor questions about my background, projects and availability from a corpus generated directly out of this site's own content, so it cannot drift out of sync with what the page itself says.",
    outcome: "The whole corpus is roughly 10,800 tokens and is stuffed directly into the prompt rather than retrieved, a deliberate choice at this size over standing up a vector index for a few hundred passages: this is a context-window assistant, not RAG. Sensitive questions (salary, notice period, visa, references, negotiation, feedback) are caught by regex before any model call and routed to email instead of answered, so that rule cannot be talked around.",
    impact: "the one part of the site that is not static text: a visitor who wants to know something specific can ask instead of searching the page, and it costs nothing to keep in sync since the corpus regenerates from the same content every build.",
    repoNote: "Built into this site's own codebase, not a separate repo",
  },
  {
    tag: "MSc Dissertation · University of Hull",
    title: "Does mobility data actually improve COVID-19 forecasting? Nine configurations, across 3,219 US counties",
    role: "Submitted 17 Aug 2026 · Defended 1 Sep 2026 · Supervised by Dr. Tongxin Chen",
    what: "Tested whether county-to-county human movement data improves weekly COVID-19 case prediction beyond a county's own recent history, across 3,219 US counties and 96 weeks. Nine configurations: four matched pairs differing only in whether mobility was supplied, plus a graph-attention arm consuming the flow network directly, scored on 57,942 common county-weeks.",
    outcome: "It does not. Mobility was statistically indistinguishable from zero for XGBoost (p=0.926) and LSTM (p=0.553). The classical family appeared to lose 0.1894 in R², but that was an artefact of asking for a 52-week seasonal cycle from 55 weeks of training data: refit honestly, the loss was 0.0041, so 98% of my own headline finding turned out to be specification rather than data.",
    impact: "a worked argument for testing a data source by matched ablation rather than by improvement over a naive benchmark, and for checking whether an effect you have attributed to data is really a property of the model carrying it, relevant to any team about to buy a feature stream on the strength of a benchmark.",
    repoNote: "Private until results are released",
    detail: {
      kicker: "Submitted and defended",
      headline: "The expensive data source did not help, and the evidence that it hurt was mostly my own model specification.",
      built: "A test of whether county-to-county mobility data improves COVID-19 case forecasting beyond a county's own recent history, across 3,219 US counties and 96 weeks, using matched pairs that differ in one thing only: whether mobility is supplied.",
      process: "Matching is the whole design: a comparison that changes two things at once cannot attribute the result to either. Four matched pairs plus a graph-attention arm consuming the mobility network directly, scored on 57,942 county-weeks, each pair identical except for the mobility features.",
      tools: ["Python", "XGBoost", "LSTM", "GAT-LSTM", "SARIMA", "Diebold-Mariano test"],
      impact: "Mobility was statistically indistinguishable from zero (XGBoost p=0.926, LSTM p=0.553). The classical family appeared to lose 0.1894 in R² from mobility, looking like the headline finding, until refitting without an unidentifiable 52-week seasonal term on 55 weeks of data cut that to 0.0041: 98% of my own best result was specification, not data. Submitted 17 Aug 2026, defended 1 Sep 2026.",
      stat: { value: "98%", label: "Of the apparent mobility penalty was specification, not data" },
    },
    visual: {
      type: "comparisonBar",
      headlineStat: { value: 0.887, decimals: 3, label: "Best R², XGBoost with mobility" },
      primary: { label: "LSTM, flat", value: 0.816 },
      secondary: { label: "GAT-LSTM, graph", value: 0.559 },
      primaryCaption: "Same mobility data, flat vs graph (R²)",
      valueDecimals: 3,
    },
  },
  {
    tag: "Personal Project · Full-Stack AI Product",
    title: "NexaHeat FX: Forex Intelligence Platform",
    role: "Solo build · ongoing",
    what: "Designed and built a browser-based FX intelligence tool from scratch, integrating live market data (Twelve Data) with three LLM providers (Claude, Groq, Gemini) to generate real-time market commentary and signals.",
    outcome: "Shipped a working end-to-end product independently, now scoping a market-prediction layer starting with XGBoost and progressing toward a Temporal Fusion Transformer.",
    impact: "proof I can ship a working, multi-API AI product end-to-end, not just a notebook, relevant to Engineering & Product Managers hiring for applied AI roles.",
    repoNote: "Private, holds live API keys",
    detail: {
      kicker: "Shipped, not notebooked",
      headline: "A working browser product wiring live market data to three separate LLM providers.",
      built: "A browser-based FX intelligence tool: a live currency-strength heatmap and order-flow engine, with Claude, Groq and Gemini generating market commentary and signals on top of a live Twelve Data feed.",
      process: "Streaming data rather than a fixed file drives the whole architecture. Rate limits, partial responses, provider disagreement and malformed payloads are ordinary operating conditions here, not edge cases, so the interface has to stay honest while any of them are happening. Three providers rather than one, so a single vendor outage does not take the product down.",
      tools: ["Next.js", "Twelve Data API", "Claude", "Groq", "Gemini"],
      impact: "A shipped, end-to-end product rather than a notebook, with real users' expectations attached. No accuracy figure appears anywhere: the prediction layer (an XGBoost baseline, then a Temporal Fusion Transformer) is still being scoped, and the numbers get published when a real backtest exists.",
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
      built: "A comparison of six approaches, Naive Bayes, Logistic Regression, LSTM, GRU and MiniLM frozen and fine-tuned, for detecting sarcasm across 28,503 news headlines, then stress-tested on 24 hand-built out-of-domain sentences.",
      process: "The two label classes come from two different publications, which makes labelling reliable but lets a model win by learning house style instead of sarcasm. The out-of-domain probe exists specifically to catch that before trusting the leaderboard.",
      tools: ["Python", "PyTorch", "MiniLM Transformer", "LSTM / GRU", "McNemar's test"],
      impact: "Fine-tuned MiniLM won in-domain at 92% accuracy (0.974 AUC-ROC, confirmed real by McNemar's test, p<0.001), then collapsed to 50%, chance level, out of domain: identical to the far simpler LSTM baseline. It had learned a publication's stylistic fingerprint, not sarcasm.",
      stat: { value: "50%", label: "Out-of-domain accuracy, identical to guessing" },
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
      built: "A STATS19 road-collision study (461,352 records) alongside a separate SNAP Facebook ego-network exercise (4,039 nodes), covering association rule mining, spatial clustering, time-series forecasting and community detection. Graded Distinction.",
      process: "Revisited after marking, against the raw database rather than the write-up. The motorcycle analysis had selected STATS19 codes 2-4 and labelled them up to 500cc; those codes actually sit one class lower, and code 5, the real over-500cc class, was excluded entirely, a one-digit filtering error.",
      tools: ["Python", "Pandas", "GeoPandas", "NetworkX", "DBSCAN / K-Means", "Association rule mining"],
      impact: "The excluded class carried the highest killed-or-seriously-injured rate in the dataset, 46.4% against 23.9% for the smallest machines, dropping 20,950 motorcycles (31.1% of all of them) and biasing the severity finding downward. Scored against a seasonal-naive benchmark the original never used, the forecast model also lost to simply repeating last year on the largest force (-2.7% skill).",
      stat: { value: "31.1%", label: "Of motorcycles excluded by the original filter" },
      figure: {
        src: "/figures/roads-motorcycles-corrected.png",
        alt: "Two charts of motorcycle collisions by hour and weekday across all four engine classes",
        caption: "The corrected analysis, with all four STATS19 engine classes including the over-500cc group that was previously excluded.",
      },
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
      built: "A predictive-maintenance classifier on the AI4I2020 industrial dataset (10,000 machine records), engineering sensor-derived features and choosing evaluation metrics that survive severe class imbalance rather than raw accuracy.",
      process: "A system that ignores every sensor and says \"fine\" every time scores 96.6%, so accuracy is never reported as a result here. Gradient Boosting was selected on F1 against Random Forest and Logistic Regression, then cross-validated five ways rather than trusting one flattering split.",
      tools: ["Python", "Scikit-learn", "Gradient Boosting", "Chi-square testing", "Cross-validation"],
      impact: "94.7% precision with cross-validated recall of 0.761 ± 0.057. Tool wear bands show risk flat at ~2.2% then tripling to 6.06% past a critical threshold, a maintenance decision available without deploying anything, and a chi-square test (p=0.001) found low-power machines fail more often than high-power ones, counter to the obvious read. A claimed dominant signal (tool wear) was withdrawn once two importance methods disagreed on it under re-analysis.",
      stat: { value: "94.7%", label: "Precision, machine-failure detection" },
      figure: {
        src: "/figures/ai4i-toolwear-band.png",
        alt: "Bar chart of machine failure rate across four tool wear bands",
        caption: "Failure rate by tool wear band. Flat at roughly 2.2% across the first three, then 6.06% once wear turns critical.",
      },
    },
    visual: {
      type: "radialStat",
      value: 94.7,
      suffix: "%",
      decimals: 1,
      label: "Precision, machine-failure detection",
    },
  },
  {
    tag: "Production System · UK recruitment client · In build",
    title: "Staffing Operations Portal: A Recruitment Agency's Whole Operation in One Login",
    role: "Solo build · deployed on Railway · roughly 75% of its own roadmap",
    what: "Built a production staffing platform end to end: a cascading shift-allocation engine, right-to-work document verification, a four-rank permission model, encrypted bank details and National Insurance numbers, and a multilingual in-app assistant that answers worker questions from the agency's own published policies with citations.",
    outcome: "29,310 lines of TypeScript and SQL across 233 files, 47 API routes, 20 database migrations and 445 automated tests, live on Railway. The hour-cap logic that decides how many hours a student visa holder may legally work has 35 tests of its own, because a wrong answer there is a legal problem for two parties rather than a bad rota.",
    impact: "the first system I have built where being wrong costs somebody their visa status or their wages rather than a point of accuracy, which is where I learned that most production ML fails for reasons that look like permissions and audit trails, not like a loss curve.",
    repoNote: "Client codebase, private",
    detail: {
      kicker: "Still building, and saying so",
      headline: "A staffing agency runs on rules nobody wrote down. This is what happened when I wrote them down.",
      built: "A production staffing platform for a UK recruitment agency: a cascading shift-allocation engine, right-to-work document verification, a four-rank permission model, encrypted bank details and National Insurance numbers, and a multilingual in-app assistant answering worker questions from the agency's own published policies with citations.",
      process: "The agency's real working rules, not a public dataset: which documents clear somebody for a shift, how many hours a student visa holder may work in term time against a vacation, how a leaver's record splits between what must be deleted and what a statute requires be kept. One rule decided everything in the hour-cap logic, so it carries 35 tests of its own.",
      tools: ["TypeScript", "PostgreSQL", "Railway", "Retrieval with citations", "Automated testing"],
      impact: "29,310 lines of TypeScript and SQL, 445 automated tests, live on Railway, sized for roughly 1,200 worker sessions a month. Four things are openly unfinished: the retrieval cut-off is reasoned rather than measured, elevated admin accounts have no second factor, the database has no scheduled backup, and every data-retention period is flagged unconfirmed. A deploy crash-loop from a Postgres migration-ordering bug taught me more about production failure modes than any model has.",
      stat: { value: "445", label: "Automated tests guarding the rules" },
    },
    visual: {
      type: "radialStat",
      value: 445,
      label: "Automated tests guarding the rules",
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

/** Work in flight, and work deliberately not started yet.
 *
 *  This section exists because a portfolio of finished things reads as a
 *  person who has stopped. It is also the only honest place to put the gaps:
 *  "Next up" items are named with what is missing, not dressed up as
 *  experience. Nothing moves from "Next up" to "Building" until it has
 *  actually been started.
 *
 *  `aiming` is the field a hiring manager actually reads. "I am building X"
 *  is a hobby; "I am building X so that Y becomes measurable" is an
 *  engineering decision, and the second one is what the stage labels are
 *  there to keep honest. */
export type WipStage = "Building" | "Scoping" | "Next up";

export interface WipItem {
  title: string;
  stage: WipStage;
  /** What it is, in one or two plain sentences. */
  what: string;
  /** Why this specific thing matters for an AI engineering role. */
  whyItMatters: string;
  /** The outcome that would count as done. Not a wish, a finish line. */
  aiming: string;
  /** Where it actually stands today, including what is not proven. */
  status: string;
  tools?: string[];
}

export const currentlyWorkingOn: WipItem[] = [
  {
    title: "Tuning the relevance floor with a real eval set",
    stage: "Building",
    what: "A fixed question set with known answers, scored on two things: did retrieval surface the right passage, and did the assistant correctly refuse the questions the corpus does not cover.",
    whyItMatters:
      "The interesting part of retrieval is not the embedding call, it is the refusal. A nearest-neighbour search always returns neighbours, so without a cut-off, asking a staffing assistant who won the 1966 World Cup hands the model the five least unrelated paragraphs it has and invites a confident wrong answer. The floor is what buys the ability to say 'I don't know'.",
    aiming:
      "One number I can defend: the relevance threshold where questions the corpus answers separate cleanly from questions it does not. Right now 0.55 is a reasoned guess and I say so in the code.",
    status:
      "Harness written, not yet run against a live key. The twelve answerable and twelve unanswerable questions are chosen. What is missing is the run itself and the threshold it prints.",
    tools: ["Gemini embeddings", "Cosine similarity", "Precision at k", "Refusal rate"],
  },
  {
    title: "Containerised deployment I actually control",
    stage: "Building",
    what: "A hand-written multi-stage Dockerfile for this site, so the runtime is something I define rather than something a build platform infers on my behalf.",
    whyItMatters:
      "Everything I run today is deployed by a system that picks the container for me. That works until it does not, and it means I cannot reproduce production locally to debug it. For a role that ships models, that is the gap worth closing first.",
    aiming:
      "The same image running on my machine and on the host, so a production bug can be reproduced locally instead of debugged by redeploying.",
    status:
      "Dockerfile and .dockerignore written and in the repository, multi-stage with a non-root user and Next.js standalone output. Not yet proven by a build: this laptop has 7.7GB of RAM against Docker Desktop's 8GB minimum, so the next step is Docker Engine inside WSL2, which fits where Desktop does not.",
    tools: ["Docker", "Multi-stage builds", "WSL2", "Railway"],
  },
  {
    title: "Scheduled retraining rather than remembered retraining",
    stage: "Scoping",
    what: "Moving the portal's knowledge refresh and the forecasting retrains off a button and onto a scheduler with retries, backfill and a run history.",
    whyItMatters:
      "The knowledge base behind the staffing assistant is refreshed by someone pressing a button, which I chose deliberately over a silent nightly cron: a job that quietly stops working goes unnoticed for a month. That reasoning stops holding the moment there is more than one pipeline, and this is the point where an orchestrator earns its complexity instead of being added because everyone lists it.",
    aiming:
      "A failed refresh that pages me rather than one that leaves yesterday's answers live and looking healthy.",
    status:
      "Comparing Dagster against Airflow on one criterion that matters here: whether a failed partition can be re-run on its own without replaying the whole schedule. Nothing written yet.",
    tools: ["Dagster", "Airflow", "Cron", "Structured logging"],
  },
  {
    title: "Experiment tracking, because my dissertation needed it and did not have it",
    stage: "Scoping",
    what: "Putting runs, parameters, metrics and artefacts behind MLflow instead of notebook cells and filenames.",
    whyItMatters:
      "Nine configurations across 3,219 counties were compared on figures I recorded by hand. The result held up in a viva, but the process would not survive a colleague asking which hyperparameters produced the 0.8872. It also let a headline number stand for weeks before I traced it back to a specification error rather than to the data. Reproducibility is the part of the work that catches that in days instead.",
    aiming:
      "Any number on this site traceable back to the exact run, commit and parameter set that produced it.",
    status:
      "Not yet installed. The honest trigger is the NexaHeat backtest below, which will produce more runs than I can track by hand, and that is when this becomes real rather than tidy.",
    tools: ["MLflow", "Weights & Biases", "DVC"],
  },
  {
    title: "Prediction layer for NexaHeat FX",
    stage: "Scoping",
    what: "An XGBoost baseline first, then a Temporal Fusion Transformer, over the live currency data the platform already ingests.",
    whyItMatters:
      "The platform currently explains what the market is doing. It does not forecast, and I have not pretended otherwise anywhere on this site. Adding a forecast means owning a backtest that can embarrass me, which is the right order to do it in.",
    aiming:
      "A walk-forward backtest published whichever way it comes out, including the case where the simple baseline beats the expensive model. That is what happened in my dissertation, where the graph architecture lost to the same data in flat columns by 0.2570 in R squared.",
    status:
      "Scoping. No accuracy figure appears anywhere on this site, because no backtest has been run. The numbers go up when they exist.",
    tools: ["XGBoost", "Temporal Fusion Transformer", "Walk-forward validation"],
  },
  {
    title: "pgvector, when the corpus earns it",
    stage: "Next up",
    what: "Moving stored embeddings out of a JSON column and into pgvector with an index, once the corpus outgrows scanning it in full.",
    whyItMatters:
      "At ninety-odd chunks, comparing a question against every stored vector is a few hundred kilobytes and a few milliseconds, and it avoids migrating a volume that holds live worker records. Adding a vector index today would be resume-driven engineering. Knowing the exact condition that changes the answer is the part worth having.",
    aiming:
      "A documented trigger rather than a rewrite: when full-scan retrieval crosses roughly 200ms, migrate, and add back the vector normalisation that cosine similarity currently makes unnecessary.",
    status:
      "Not started, on purpose. The trigger and the one trap in the migration are both already written into the portal's own notes so the decision survives me forgetting it.",
    tools: ["pgvector", "Postgres", "HNSW indexing"],
  },
  {
    title: "A second model behind Laudbot, for the day Gemini is the one that's down",
    stage: "Scoping",
    what: "Adding Grok as a fallback provider for the site's chat widget, so a Gemini outage or rate limit does not take the assistant down.",
    whyItMatters:
      "Laudbot runs on a single provider today. That is fine until the one afternoon it is not, and a recruiter asking it a question is exactly the wrong moment to find out.",
    aiming:
      "A provider swap invisible to whoever is asking: Gemini first, Grok on failure, with no change to the question-answering behaviour either side notices.",
    status:
      "Not started. The corpus and prompt are provider-agnostic already, so the work is the swap logic and a second API key, not a rebuild.",
    tools: ["Gemini", "Grok (xAI)", "Provider fallback"],
  },
  {
    title: "A voice receptionist for people who can't take every call",
    stage: "Next up",
    what: "An AI phone receptionist for small businesses and high-value callers, COOs and MDs among them, that takes the call, collects what matters, and routes it or summarises it to the right person or department.",
    whyItMatters:
      "The calls that get missed are often the ones that mattered most, and the person who should have taken it usually finds out hours later from a voicemail they did not have time to listen to properly.",
    aiming:
      "A call handled well enough that the person on the other end does not notice it was not a person, and a summary that tells the right department what actually needs attention rather than a transcript they have to read in full.",
    status: "Idea stage. Not started.",
    tools: ["Voice AI", "Speech-to-text", "LLM summarisation", "Call routing"],
  },
  {
    title: "Generate a landing page or an ad for whoever asks",
    stage: "Next up",
    what: "A request flow, likely through this site or Laudbot, where a visitor can ask for a short ad video or a landing page built from a brief and get a live URL back.",
    whyItMatters:
      "The fastest way to show what an automation or design skill can do is to let someone ask for it and watch it happen, rather than read a description of it happening to somebody else.",
    aiming:
      "A visitor types what they want and gets something real and inspectable back: a live link, not a mockup screenshot.",
    status: "Idea stage. Not started.",
    tools: ["Video generation", "Landing page generation", "Agentic workflows"],
  },
  {
    title: "A WhatsApp responder for small Hull businesses, for off-hours and busy minutes",
    stage: "Next up",
    what: "An AI customer-service automation on WhatsApp for small and medium Hull businesses: answering client questions outside business hours or during a rush, booking appointments, and handling whatever else a given business needs wired in.",
    whyItMatters:
      "A small business without a receptionist loses the customer who messages at 9pm or during the lunchtime rush, not because the business could not have helped, but because nobody saw the message in time.",
    aiming:
      "A business owner who can point WhatsApp at this and stop losing the customers who message outside opening hours.",
    status: "Idea stage. Not started.",
    tools: ["WhatsApp Business API", "LLM", "Appointment scheduling", "Integrations"],
  },
];

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

/** Tooling, with the reason attached.
 *
 *  A list of logos proves nothing. What a reader can actually assess is whether
 *  a choice was made for a reason, and whether the person can name what they
 *  gave up by making it. So every entry carries the alternative that was not
 *  taken and why.
 *
 *  `stackLearning` is the second half and the harder one to write. "Currently
 *  learning X" is worth nothing on its own, because everybody writes it and
 *  nobody can be held to it. What makes it checkable is naming the specific
 *  thing being built with it, and the outcome that would prove the learning
 *  actually happened. Anything that cannot survive that structure does not go
 *  on the list. */
export interface ToolChoice {
  tool: string;
  /** Where it actually ran. */
  usedOn: string;
  /** The named alternative that lost. */
  insteadOf: string;
  /** Why, specifically. Not "it's faster". */
  because: string;
}

/** A tool being learned, with the work that is teaching it. */
export interface ToolLearning {
  tool: string;
  /** Where it currently sits. Mirrors the WIP stages so the two agree. */
  stage: WipStage;
  /** The concrete thing being done with it right now. */
  doing: string;
  /** What would count as having learned it. Falsifiable, not a feeling. */
  proof: string;
}

export const stackChoices: ToolChoice[] = [
  {
    tool: "In-memory cosine similarity",
    usedOn: "Retrieval for the staffing portal's assistant",
    insteadOf: "pgvector",
    because:
      "The self-hosted Postgres has no pgvector extension, and adding it means migrating a volume holding live worker documents. The corpus is a few hundred chunks of 768 numbers, so scoring every one is under a millisecond and is dwarfed by the embedding call that produced the query. pgvector is the right answer at tens of thousands of chunks. This is not that.",
  },
  {
    tool: "768-dimension embeddings",
    usedOn: "The same retrieval pipeline",
    insteadOf: "The model's native 3,072",
    because:
      "Every vector is read into memory in full on every question. At 3,072 that is four times the bytes and four times the multiplications, for a quality difference that a corpus of ninety chunks from one small website cannot measure. Truncating also means the vectors need normalising by hand, except that cosine similarity already divides by both lengths, so it cancels. Anyone swapping cosine for a raw dot product has to add that normalisation back in the same commit.",
  },
  {
    tool: "Asymmetric embedding, query and document",
    usedOn: "The same retrieval pipeline",
    insteadOf: "Embedding both sides identically",
    because:
      "A passage that answers a question rarely looks like the question. 'How much notice do I need to give?' and 'Shifts must be cancelled at least 24 hours before the start time' share almost no words. Telling the model which side it is embedding puts the two in the same region. Without it the relevance floor has to sit so low that it stops excluding anything.",
  },
  {
    tool: "Three LLM providers",
    usedOn: "NexaHeat FX",
    insteadOf: "One provider",
    because:
      "Claude, Groq and Gemini all generate the commentary, so a single vendor outage or rate limit does not take the product down. On a live market feed, rate limits and malformed payloads are ordinary operating conditions rather than edge cases.",
  },
  {
    tool: "Railway",
    usedOn: "This site, the staffing portal, and a self-hosted n8n",
    insteadOf: "AWS or GCP",
    because:
      "One person maintaining three services does not need IAM policies and a VPC to get a container onto the internet. The trade is real and I can name it: the platform decides my runtime, which is exactly why writing my own Dockerfile is in progress above rather than left as a gap.",
  },
  {
    tool: "Isolation Forest",
    usedOn: "Anomaly detection under distribution shift",
    insteadOf: "Random Forest",
    because:
      "The Random Forest scored a perfect 1.0000 under random cross-validation and then caught 5.1% of genuinely unseen attacks once held to the 1% false-positive budget it was calibrated for. The Isolation Forest, which loses badly on the headline benchmark, caught 33.2%. Picking the better leaderboard number would have been the wrong call by a factor of six.",
  },
  {
    tool: "Matched pairs and a Diebold-Mariano test",
    usedOn: "County-level forecasting across 3,219 US counties",
    insteadOf: "Improvement over a naive benchmark",
    because:
      "Mobility features beat a naive benchmark comfortably, which is the comparison most papers report and it proves nothing. Held against the identical model without them, they were worth 0.0002 in R squared at p = 0.926. The same discipline caught my own error later: 98 percent of the penalty I had attributed to mobility data turned out to belong to the model specification carrying it.",
  },
  {
    tool: "Precision and cross-validated recall",
    usedOn: "Predictive maintenance on 10,000 machine records",
    insteadOf: "Accuracy",
    because:
      "Only 3.39% of the machines actually fail. A model that predicts 'no failure' every single time scores 96.6% accuracy and is worth nothing. The base rate decides which metric is allowed to be the headline.",
  },
];

export const stackLearning: ToolLearning[] = [
  {
    tool: "Docker",
    stage: "Building",
    doing:
      "Writing a multi-stage Dockerfile for this site: a cached dependency layer, a build layer, and a runtime layer holding the traced server and nothing else, running as a non-root user. The standalone output it depends on is behind a build flag, because switching it on unconditionally would break the platform deploy that currently keeps the site up.",
    proof:
      "The same image running locally and on the host, so a production bug can be reproduced on my laptop instead of debugged by redeploying. The build itself is the next step: 7.7GB of RAM is under Docker Desktop's 8GB minimum, so this goes through Docker Engine in WSL2, which is about 2GB rather than 6 and has no Windows version gate.",
  },
  {
    tool: "Dagster and Airflow",
    stage: "Scoping",
    doing:
      "Choosing between them on one criterion that matters for what I actually run: whether a single failed partition can be re-run on its own without replaying the whole schedule. The staffing portal's knowledge refresh is a button today, which I chose over a nightly cron on purpose, because a silent job that stops working goes unnoticed for a month.",
    proof:
      "A refresh that fails loudly and retries, instead of one that leaves yesterday's answers live and looking healthy. Until there is more than one pipeline, the button is still the right answer and I am not pretending otherwise.",
  },
  {
    tool: "MLflow",
    stage: "Scoping",
    doing:
      "Working out how to put runs, parameters and artefacts behind a tracking server before the next set of experiments, rather than after. Nine configurations across 3,219 counties were compared on figures recorded by hand. That held up in a viva and would not survive a colleague asking which hyperparameters produced the 0.8872.",
    proof:
      "Any number published on this site traceable back to the run, commit and parameter set that produced it. The honest trigger is the NexaHeat backtest, which will generate more runs than I can track by hand.",
  },
  {
    tool: "pgvector",
    stage: "Next up",
    doing:
      "Not installing it, deliberately, and knowing exactly what would change that. Retrieval currently scans every stored vector in full, which at ninety-odd chunks is a few hundred kilobytes and a few milliseconds, against migrating a database volume that holds live worker documents.",
    proof:
      "A documented trigger rather than a rewrite: when full-scan retrieval crosses roughly 200ms, migrate to an indexed column, and add back the vector normalisation that cosine similarity currently makes unnecessary. That trap is already written into the code so the decision survives me forgetting it.",
  },
  {
    tool: "Kubernetes",
    stage: "Next up",
    doing:
      "Learning what it does before claiming I can run it. It orchestrates services across many nodes; I run three services that each fit comfortably on one. The prerequisite is the Docker work above, because a container you cannot build is not a container you can schedule.",
    proof:
      "I would rather be asked about this in an interview and give this answer than list it and be asked to walk through a deployment I have debugged. It goes on the list the day I have a workload that outgrows a single container.",
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
    { label: "Request CV", href: CV_REQUEST_MAILTO },
    { label: "GitHub", href: "https://github.com/Laud1ens" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/laud-asante-938382103/", status: "in-progress" },
  ] as LinkCta[],
};
