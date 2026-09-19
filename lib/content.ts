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

export const hero = {
  kicker: "Laud Asante · Data Science & AI",
  headline: "Forecasting, optimisation and deep learning, ",
  headlineEmphasis: "built to be acted on",
  lede: "MSc Data Science & Artificial Intelligence student at the University of Hull. I build time-series forecasts, neural networks and optimisation pipelines, then translate the output into a decision a manager can actually use.",
  ctas: [
    { label: "Request CV ✉", href: CV_REQUEST_MAILTO, primary: true },
    { label: "GitHub ↗", href: "https://github.com/Laud1ens" },
    { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/laud-asante-938382103/", status: "in-progress" },
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

/** A single hard fact about the source data, rendered as a small stat chip. */
export interface DatasetFact {
  label: string;
  value: string;
}

/** Long-form expansion revealed on scroll. Every figure and number here is
 *  produced by the project's own code; nothing is illustrative. */
export interface ProjectDetail {
  kicker: string;
  headline: string;
  /** One paragraph orienting the reader before any detail. */
  intro: string;
  /** Where the data came from and what is actually in it. */
  dataset: {
    name: string;
    source: string;
    body: string;
    facts: DatasetFact[];
  };
  /** The findings themselves. */
  sections: DetailSection[];
  /** The same result explained without jargon. */
  plainEnglish: string;
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
      intro: "Intrusion detection models are usually judged on how well they spot attacks they have already seen. That is the easy half of the problem. The interesting question is what happens when a genuinely new attack arrives, and whether the model's alarm threshold still means what it meant on the day it was calibrated. This study was built to answer that, and the answer inverted the leaderboard.",
      dataset: {
        name: "NSL-KDD",
        source: "Canadian Institute for Cybersecurity, University of New Brunswick",
        body: "Network connection records labelled as normal traffic or one of many attack types. The test set deliberately contains 17 attack types that appear nowhere in training, which is what makes it usable for measuring genuine novelty rather than memorisation. Every threshold was calibrated on held-out normal traffic at a fixed 1% false-positive budget, then frozen before the test set was touched.",
        facts: [
          { label: "Training records", value: "125,973" },
          { label: "Test records", value: "22,544" },
          { label: "Unseen attack types", value: "17" },
          { label: "Novel records in test", value: "3,750" },
        ],
      },
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
      plainEnglish: "Think of a smoke alarm tested only with the kind of smoke it was built for. It passes perfectly, so you fit it and forget it. Then a different kind of fire starts, and the alarm stays quiet. Worse, the one you rejected as too twitchy turns out to catch six times more of the fires you did not anticipate, for the same number of false alarms a week. The lesson is not that one detector is better. It is that a detection rate quoted without the false-alarm rate that came with it will rank your options in the wrong order.",
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
      intro: "The premise of most forecasting research is that more structure wins: give a model the graph of how people move between places and it should beat a model that only sees one county's own history. This dissertation tests that premise at national scale rather than assuming it, and so far the premise is losing.",
      dataset: {
        name: "US county-level COVID-19 case series with inter-county mobility",
        source: "Public county case reporting, joined to weekly mobility flow data",
        body: "Weekly case counts for every county in the contiguous United States, paired with a mobility graph whose edges are weekly flows between counties. The graph is what the GAT-LSTM architectures consume as neighbourhood structure. The classical models see only each county's own history, which is precisely the comparison that makes the benchmark meaningful.",
        facts: [
          { label: "US counties", value: "3,219" },
          { label: "Models benchmarked", value: "7" },
          { label: "Notebooks in pipeline", value: "4" },
          { label: "Current best R squared", value: "0.745" },
        ],
      },
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
          body: "This is live dissertation work supervised by Dr Tongxin Chen, submitting November 2026. The numbers above are current, not final, and the ranking could still change as the remaining architectures are tuned. They are quoted here as work in progress rather than as a conclusion.",
        },
      ],
      plainEnglish: "Imagine predicting how busy a shop will be next week. One method looks only at how busy that shop has been. Another also looks at traffic between all the surrounding towns, on the reasonable theory that people move around. The second method is far more sophisticated and much more expensive to build. Right now, across more than three thousand areas, the simple method is winning. That is worth knowing before an organisation spends a year building the complicated one.",
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
      intro: "Almost everything in a data science portfolio is a notebook that ran once on a static file. This is the opposite: a live product with real-time inputs, three third-party model providers, and all the failure modes that only appear when something is actually running and someone is actually looking at it.",
      dataset: {
        name: "Live foreign-exchange market feed",
        source: "Twelve Data API, with Claude, Groq and Gemini as reasoning providers",
        body: "Streaming currency pair data rather than a fixed file. That distinction drives the whole architecture: rate limits, partial responses, provider disagreement and malformed payloads are ordinary operating conditions, not edge cases, and the interface has to stay honest while any of them are happening.",
        facts: [
          { label: "LLM providers", value: "3" },
          { label: "Market data source", value: "Twelve Data" },
          { label: "Build", value: "Solo, end to end" },
          { label: "Prediction layer", value: "In scoping" },
        ],
      },
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
      plainEnglish: "This is a working website that watches currency markets and explains, in ordinary language, what is happening and why it might matter. It asks three different AI services rather than one, so that if a provider goes down or gives a strange answer the tool keeps working. It does not predict prices, and it does not pretend to. The prediction part is being built next, and the numbers will be published when they are real.",
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
      intro: "Sarcasm is the case where literal meaning and intended meaning point in opposite directions, which is why sentiment tools handle it so badly. This project compared six approaches to detecting it, found a clear winner, and then asked the question that decides whether a model is real: does it still work on text it has never seen the style of?",
      dataset: {
        name: "Sarcasm Headlines Dataset",
        source: "News headlines from a satirical and a straight publication",
        body: "Headlines labelled sarcastic or not, which makes labelling reliable but introduces a trap: the two classes come from two different publications, so a model can score well by learning house style instead of sarcasm. A separate hand-built probe of 24 out-of-domain sentences was used to test exactly that.",
        facts: [
          { label: "Headlines", value: "28,503" },
          { label: "Approaches compared", value: "6" },
          { label: "Out-of-domain probes", value: "24" },
          { label: "Significance test", value: "McNemar, p < 0.001" },
        ],
      },
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
      plainEnglish: "The model was trained on headlines from two publications: one satirical, one serious. It scored brilliantly, and it achieved that by learning to recognise which newspaper a headline came from, not by understanding sarcasm. Shown sarcastic sentences written by ordinary people, it was no better than flipping a coin. Twenty-four test sentences were enough to reveal that. Without them it would have looked ready to ship.",
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
      intro: "This was submitted, marked and finished. Going back to it afterwards, against the raw database rather than the write-up, turned up a filtering error that had quietly reshaped one of the headline findings. Everything below is the corrected version, with the size of the original error stated rather than smoothed over.",
      dataset: {
        name: "STATS19 road casualty records, plus SNAP ego-networks",
        source: "UK Department for Transport, and Stanford SNAP",
        body: "STATS19 is the national record of road collisions reported to police, one row per collision, joined to casualty and vehicle tables. Codes are numeric and their meanings are not self-evident, which is exactly where the error came from. The social network half uses Stanford's anonymised Facebook ego-networks, and the two datasets share no entities: they are parallel exercises in different techniques, not an integrated study.",
        facts: [
          { label: "Collision records", value: "461,352" },
          { label: "Casualty records", value: "600,332" },
          { label: "Vehicle records", value: "849,091" },
          { label: "Network nodes / edges", value: "4,039 / 88,234" },
        ],
      },
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
      plainEnglish: "Motorcycles in this national database are recorded in four engine-size categories, numbered 2 to 5. The original analysis used 2, 3 and 4, and labelled them as though they were the full range. They are not: the largest bikes are category 5, and they were left out entirely. That removed one motorbike in three from the study, and specifically the ones most likely to be involved in a fatal or serious collision. So the work concluded motorcycle collisions were less severe, and more of a weekday commuting problem, than they really are. One wrong number in a filter, and a road safety finding points at the wrong riders.",
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
      intro: "Rare events break the metric everyone reaches for first. When almost nothing fails, a model can be spectacularly accurate and completely useless at the same time, and the number on the slide will not tell you which one you have. This project is built around refusing that number and reporting the ones that survive the imbalance.",
      dataset: {
        name: "AI4I 2020 Predictive Maintenance Dataset",
        source: "Matzka (2020), UCI Machine Learning Repository, CC BY 4.0",
        body: "Ten thousand snapshots of a milling machine: air and process temperature, rotational speed, torque and tool wear, with a binary failure flag. It is synthetic, generated to reproduce realistic failure dynamics rather than logged from a real plant, and it holds no timestamps linking rows into a machine's history. Both facts bound what it can honestly support.",
        facts: [
          { label: "Machine records", value: "10,000" },
          { label: "Actual failures", value: "339" },
          { label: "Failure rate", value: "3.39%" },
          { label: "Naive-model accuracy", value: "96.6%" },
        ],
      },
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
      plainEnglish: "Out of ten thousand machines, only 339 actually broke. So a system that shrugs and says everything is fine, every single time, is right 96.6% of the time. That sounds like a triumph and is worth nothing, because it never once warns you. The honest questions are different: of the machines that really did break, how many did we catch, and of the alarms we raised, how many were real. This model catches roughly three in four breakdowns and is right about 95% of the time it raises an alarm. The most useful thing in the whole study needs no model at all: once a cutting tool passes about 150 minutes of wear, the failure rate roughly triples.",
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

/** Work in flight, and work deliberately not started yet.
 *
 *  This section exists because a portfolio of finished things reads as a
 *  person who has stopped. It is also the only honest place to put the gaps:
 *  "Next up" items are named with what is missing, not dressed up as
 *  experience. Nothing moves from "Next up" to "Building" until it has
 *  actually been started. */
export type WipStage = "Building" | "Scoping" | "Next up";

export interface WipItem {
  title: string;
  stage: WipStage;
  /** What it is, in one or two plain sentences. */
  what: string;
  /** Why this specific thing matters for an AI engineering role. */
  whyItMatters: string;
  /** Where it actually stands today, including what is not proven. */
  status: string;
  tools?: string[];
}

export const currentlyWorkingOn: WipItem[] = [
  {
    title: "Staffing platform for a Hull recruitment agency",
    stage: "Building",
    what: "A production recruitment portal: shift allocation, document verification, a four-rank permission model, and an in-app assistant that answers staff questions from the agency's own published policies.",
    whyItMatters:
      "It is the only system I have built that holds real people's working hours and bank details, so it is where I have had to think about field encryption, role boundaries and audit trails rather than only about model accuracy. Most ML work fails in production for reasons that look like this, not like a loss curve.",
    status:
      "Built and deployed on Railway. 49,075 lines of TypeScript across 316 files, with 19 test suites. I do not claim adoption figures, because whether the agency has switched their day-to-day operation onto it is their decision and not yet confirmed.",
    tools: ["Next.js", "Postgres", "Drizzle", "Auth.js", "Gemini", "Railway"],
  },
  {
    title: "Retrieval pipeline behind that assistant",
    stage: "Building",
    what: "Scrape, chunk, embed, retrieve, cite. Cosine similarity computed in memory against stored vectors rather than in a vector database, with a relevance floor so the assistant is able to return nothing at all.",
    whyItMatters:
      "The interesting part of retrieval is not the embedding call, it is the refusal. Without a floor, a nearest-neighbour search always returns neighbours, so asking it who won the 1966 World Cup hands the model the five least unrelated paragraphs about a staffing agency and invites a confident wrong answer. The floor is what buys the ability to say 'I don't know'.",
    status:
      "Built and unit tested. The relevance floor is currently 0.55 and is a reasoned starting point, not a tuned value. Tuning it properly needs a labelled question set, which is the next item on this list.",
    tools: ["Gemini embeddings", "Cosine similarity", "Chunking with overlap"],
  },
  {
    title: "Evaluation harness for both assistants",
    stage: "Next up",
    what: "A fixed question set with known answers, scored on two things: did retrieval surface the right passage, and did the bot correctly refuse the questions it should not answer.",
    whyItMatters:
      "I can currently tell you exactly what is unproven about my own retrieval, which is better than not knowing, but it is not the same as having measured it. Being able to say a change improved answer quality by a number is the difference between tuning and guessing.",
    status: "Not started. Named here because it is the honest gap, not because it is done.",
  },
  {
    title: "Prediction layer for NexaHeat FX",
    stage: "Scoping",
    what: "An XGBoost baseline first, then a Temporal Fusion Transformer, over the live currency data the platform already ingests.",
    whyItMatters:
      "The platform currently explains what the market is doing. It does not forecast, and I have not pretended otherwise anywhere on this site. Adding a forecast means owning a backtest that can embarrass me, which is the right order to do it in.",
    status:
      "Scoping. No accuracy figure is published anywhere, because no backtest has been run yet. The numbers go up when they exist.",
    tools: ["XGBoost", "Temporal Fusion Transformer"],
  },
  {
    title: "Containerised deployment I actually control",
    stage: "Next up",
    what: "Docker images for the portfolio and the staffing portal, so the runtime is something I define rather than something a platform infers for me.",
    whyItMatters:
      "Everything I run today is deployed by a build system that decides the container on my behalf. That works until it does not, and it means I cannot reproduce a production environment locally. For an AI engineering role that ships models, that gap is the one worth closing first.",
    status:
      "Not started. Listed deliberately rather than quietly left off, because pretending otherwise is the sort of thing that falls apart in a technical interview.",
  },
  {
    title: "Final dissertation architectures",
    stage: "Building",
    what: "Tuning the remaining graph-attention and LSTM variants against the SARIMA baseline across 3,219 US counties.",
    whyItMatters:
      "The result so far is that the simplest model wins, which is the more useful finding and the harder one to publish. Finishing it properly means giving the complex models a genuine chance to beat the baseline before concluding they do not.",
    status: "In progress, supervised by Dr Tongxin Chen, submitting November 2026.",
    tools: ["SARIMA", "XGBoost", "GAT-LSTM", "PyTorch"],
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
 *  `notYet` is not a wish list. It is the set of tools a reader might
 *  reasonably expect to see here and does not, with the real reason, so that
 *  nothing on this page has to be walked back in an interview. */
export interface ToolChoice {
  tool: string;
  /** Where it actually ran. */
  usedOn: string;
  /** The named alternative that lost. */
  insteadOf: string;
  /** Why, specifically. Not "it's faster". */
  because: string;
}

export interface ToolGap {
  tool: string;
  /** The honest reason it has not been used, not an excuse. */
  reason: string;
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
      "One person maintaining three services does not need IAM policies and a VPC to get a container onto the internet. The trade is real and I can name it: the platform decides my runtime, which is exactly why containerising it myself is on the Next up list above.",
  },
  {
    tool: "Isolation Forest",
    usedOn: "Anomaly detection under distribution shift",
    insteadOf: "Random Forest",
    because:
      "The Random Forest scored a perfect 1.0000 under random cross-validation and then caught 5.1% of genuinely unseen attacks once held to the 1% false-positive budget it was calibrated for. The Isolation Forest, which loses badly on the headline benchmark, caught 33.2%. Picking the better leaderboard number would have been the wrong call by a factor of six.",
  },
  {
    tool: "SARIMA",
    usedOn: "County-level forecasting across 3,219 US counties",
    insteadOf: "GAT-LSTM",
    because:
      "The graph models encode mobility flows between counties and should win. So far they do not: SARIMA leads at R squared 0.745. The extra structure has not yet paid for itself, and reporting that is more useful than tuning the complex model until it agrees with the hypothesis.",
  },
  {
    tool: "Precision and cross-validated recall",
    usedOn: "Predictive maintenance on 10,000 machine records",
    insteadOf: "Accuracy",
    because:
      "Only 3.39% of the machines actually fail. A model that predicts 'no failure' every single time scores 96.6% accuracy and is worth nothing. The base rate decides which metric is allowed to be the headline.",
  },
];

export const stackGaps: ToolGap[] = [
  {
    tool: "Docker",
    reason:
      "Not used yet. Everything I run is containerised by a platform build system on my behalf, which means I cannot reproduce production locally. First item on the list to close.",
  },
  {
    tool: "Kubernetes",
    reason:
      "Not used, and not needed yet. It solves orchestration across many services and many nodes. I run three services that each fit on one. Reaching for it now would be a line on a CV rather than a solution to a problem I have.",
  },
  {
    tool: "Airflow or Dagster",
    reason:
      "Not used. My pipelines are notebooks and scripts run on demand, not scheduled DAGs with retries and backfills. The day one of them needs to run nightly and recover from a partial failure is the day this earns its place.",
  },
  {
    tool: "MLflow or Weights & Biases",
    reason:
      "Not used. Experiment tracking so far has been notebooks and written notes, which is workable for a seven-model benchmark by one person and stops being workable the moment a second person needs to reproduce a run.",
  },
  {
    tool: "pgvector",
    reason:
      "Deliberately not used, for the reason given above. Listed here so the absence reads as a decision rather than an oversight.",
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
