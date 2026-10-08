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

/**
 * The hero leads with a shipped system rather than a description of skills.
 *
 * The previous version opened with "forecasting, optimisation and deep
 * learning, built to be acted on", which is a claim about a person. This opens
 * with a thing that exists, the problem it was pointed at, what it runs on and
 * what it costs to get wrong. A reader can verify all of it. `bridge` then
 * hands off to the research work so one production build does not crowd out
 * six pieces of evidence that this is a data scientist and not a web developer.
 */
export const LINKEDIN_URL = "https://www.linkedin.com/in/laud-asante-938382103/";

export const hero = {
  kicker: "Laud Asante · Data Science & AI · Hull, UK",
  headline: "A recruitment agency's whole operation, ",
  headlineEmphasis: "in one login",
  // The client is not named here, and will not be until they have agreed to it.
  // Naming a company, its city and its internal compliance process on a public
  // page is their disclosure to make, not mine. The engineering numbers below
  // are my own work product and stay.
  lede: "A UK recruitment agency places temporary workers into warehouse, care and hospitality jobs, and the rules deciding who could take which shift lived in people's heads. I built the portal that writes them down, and shipped it: TypeScript and Postgres on Railway, 47 API routes, 445 automated tests. The rule that keeps a student inside their visa hour cap carries 35 of those tests on its own, because a wrong answer there costs somebody their right to remain in the country.",
  bridge:
    "That is the build that had to survive contact with real people. The projects below are the research behind it: forecasting, anomaly detection and deep learning, including the two where the honest finding was that I was wrong.",
  ctas: [
    { label: "Request CV ✉", href: CV_REQUEST_MAILTO, primary: true },
    { label: "GitHub ↗", href: "https://github.com/Laud1ens" },
    { label: "LinkedIn ↗", href: LINKEDIN_URL, status: "in-progress" },
  ] as LinkCta[],
  stats: [
    { value: 0.887, decimals: 3, label: "R², county-level case forecast" },
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
  /** Why there is no public repo. Rendered in place of the link, so a closed
   *  codebase reads as a decision rather than as a card somebody forgot to
   *  finish. Leave unset whenever `repoUrl` is set. */
  repoNote?: string;
  visual?: ProjectVisual;
  detail?: ProjectDetail;
}

export const projects: Project[] = [
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
      intro: "The client is a UK recruitment agency placing temporary workers into warehouse, care and hospitality roles. They are not named here, and will not be until they have said they are happy to be: how a company handles right-to-work checks is its disclosure to make rather than mine. The work of running it was spread across spreadsheets, phone calls and the memory of whoever had been there longest. This portal is one login that routes each person to the interface for their stage: agency admin, coordinator, a recruit mid-onboarding, or an active worker on the books. It is deployed and it is not finished, and the part that is unfinished is written down below rather than left for someone to discover.",
      dataset: {
        name: "The agency's own operation, plus 19 pages of its published site",
        source: "The agency's own public website, pulled into the assistant's knowledge base, and its existing shift and compliance process",
        body: "There is no public dataset here. The inputs are the agency's real working rules: which documents clear somebody to take a shift, how many hours a student visa holder may work in term time against a vacation, how a leaver's record is split between what must be deleted and what a statute requires be kept. The assistant's knowledge comes from a fixed list of 19 pages taken from the agency's own sitemap, chunked into roughly 93 passages. A crawl was deliberately rejected: it follows sixty pages of press releases, and a knowledge base that answers 'what does this agency do' with a 2020 story about covid testing is worse than one that cannot answer at all.",
        facts: [
          { label: "Lines of TypeScript and SQL", value: "29,310" },
          { label: "Automated tests", value: "445" },
          { label: "API routes", value: "47" },
          { label: "Permission ranks", value: "4" },
        ],
      },
      sections: [
        {
          heading: "What it is designed to save, and who for",
          body: "The agency's workforce turns over constantly, and the portal is sized for roughly 1,200 worker sessions a month across shift offers, availability, document uploads and payslip questions. The saving is not the software, it is the phone call that does not happen: a worker who can see their offers, their hours against their legal cap and what is still missing from their file does not ring a coordinator to ask. That is a design target taken from the agency's own numbers, not an adoption figure. Whether they move their day-to-day operation onto it is their decision, and I do not claim it here.",
          stat: { value: "~1,200", label: "Monthly worker sessions it is built to carry" },
        },
        {
          heading: "The rule that mattered most, and why it has 35 tests",
          body: "A student visa holder may work 20 hours in term time and up to 48 in an official vacation. Getting it wrong risks their right to remain in the country. One rule decides everything: a day is a vacation day only when a coordinator has verified a term-date letter, the day falls inside it, and the record has not expired. Every other day is term time. Vacation periods are stored rather than term periods, so a missing, rejected or expired record falls back to the restrictive 20 rather than quietly opening up to 48. A week straddling a boundary takes the lowest cap of any of its days.",
          stat: { value: "20 vs 48", label: "Weekly hour cap the rule has to get right" },
        },
        {
          heading: "Where the assistant is allowed to say nothing",
          body: "The in-app assistant retrieves passages from the agency's own pages and answers with citations. It embeds questions and documents with different task types, because a question and the passage answering it share almost no words, and without that asymmetry the relevance cut-off has to sit so low it stops excluding anything. Below the cut-off it says it is not sure and gives the office number. It is also instructed never to fake a human handover, and no tool it can call takes a user id as a parameter, so text a worker types cannot reach another worker's record through it.",
        },
        {
          heading: "The 25% that is not done",
          body: "Four things. The retrieval cut-off is currently 0.55, which was reasoned rather than measured, and the harness that would tune it has been written but not run against a live key. Elevated admin accounts have no second factor, which is the single biggest remaining security win. The database volume has no scheduled backup, which costs nothing today and costs payroll records the moment real workers are on it. And every data retention period in the leaver flow is flagged unconfirmed on screen, because they are the standard published UK periods rather than advice from anybody qualified to give it.",
        },
        {
          heading: "The outage I caused, and what it taught me",
          body: "A deploy crash-looped and took the site down. Postgres will not let a newly added enum value be used in the same transaction that adds it, so the migration was correctly split in two. What defeated the split was that the ORM's own migration runner wraps the entire pending set in one transaction, so every restart reapplied the first half, failed on the second, rolled both back and tried again. The fix was a hand-rolled runner giving each migration its own transaction, and a test that applies all twenty migrations to a real Postgres compiled to WebAssembly. Reading SQL is not the same as executing it, which is exactly how that reached production.",
        },
      ],
      plainEnglish: "A recruitment agency has a lot of rules that live in people's heads: who is allowed to take which shift, how many hours a student is legally allowed to work this week, what paperwork is still missing before somebody can start. When those rules live in heads, they get applied differently depending on who is asking and how busy the office is. This is one website where everybody, from the agency owner to someone on their first shift, sees the same answer to the same question. It also has a chat assistant that answers questions out of the agency's own published information and, importantly, admits when it does not know instead of guessing. It is live, it is not finished, and the unfinished parts are listed openly rather than hidden.",
    },
    visual: {
      type: "radialStat",
      value: 445,
      label: "Automated tests guarding the rules",
    },
  },
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
    title: "Does mobility data actually improve COVID-19 forecasting? Nine configurations, across 3,219 US counties",
    role: "Submitted 17 Aug 2026 · Defended 1 Sep 2026 · Supervised by Dr. Tongxin Chen",
    what: "Tested whether county-to-county human movement data improves weekly COVID-19 case prediction beyond a county's own recent history, across 3,219 US counties and 96 weeks. Nine configurations: four matched pairs differing only in whether mobility was supplied, plus a graph-attention arm consuming the flow network directly, scored on 57,942 common county-weeks.",
    outcome: "It does not. Mobility was statistically indistinguishable from zero for XGBoost (p=0.926) and LSTM (p=0.553). The classical family appeared to lose 0.1894 in R², but that was an artefact of asking for a 52-week seasonal cycle from 55 weeks of training data: refit honestly, the loss was 0.0041, so 98% of my own headline finding turned out to be specification rather than data.",
    impact: "a worked argument for testing a data source by matched ablation rather than by improvement over a naive benchmark, and for checking whether an effect you have attributed to data is really a property of the model carrying it, relevant to any team about to buy a feature stream on the strength of a benchmark.",
    repoNote: "Private until results are released",
    detail: {
      kicker: "Submitted and defended",
      headline: "The expensive data source did not help, and the evidence that it hurt was mostly my own model specification.",
      intro: "Phone location data made human movement measurable at the same resolution as epidemic reporting, so mobility features went into COVID-19 forecasting almost everywhere. Whether they beat a county's own recent case history is tested much less often. This asks that question directly, with matched pairs that differ in one thing only, and the answer is no.",
      dataset: {
        name: "US county COVID-19 cases, inter-county mobility flows, socioeconomic context",
        source: "Johns Hopkins case counts, GeoDS weekly flow records, American Community Survey",
        body: "Weekly case counts for 3,219 counties over 96 weeks from March 2020 to December 2021, joined to 55.6 million records of estimated county-to-county movement and twelve socioeconomic variables. Eight of the nine configurations are four matched pairs: identical model, identical tuning, the only difference being whether mobility features are supplied. The ninth consumes the flow network as an explicit graph. Matching is the whole design, because a comparison that changes two things at once cannot attribute the result to either.",
        facts: [
          { label: "US counties", value: "3,219" },
          { label: "Mobility flow records", value: "55.6M" },
          { label: "Configurations", value: "9" },
          { label: "County-weeks scored", value: "57,942" },
        ],
      },
      sections: [
        {
          heading: "What won, and by how little it mattered",
          body: "XGBoost with mobility led at R squared 0.8872. XGBoost without mobility reached 0.8870. The two arms are separated by 0.0002, and a Diebold-Mariano test puts that at p = 0.926, which is another way of saying the mobility data bought nothing. The LSTM pair told the same story at p = 0.553. Accuracy also hides trouble: SARIMA looks respectable at 0.7641 on a log scale while its error in actual cases is 2,734 against 517 for the leader, because a fit that is fine in aggregate can still be badly wrong on the largest counties.",
          stat: { value: "0.0002", label: "R squared gained from mobility, XGBoost, p = 0.926" },
        },
        {
          heading: "The finding I had to take away from myself",
          body: "The seasonal classical pair looked dramatic: supplying mobility cost 0.1894 in R squared, clearly significant. It was the most quotable number in the study and it was close to meaningless. A 52-week seasonal period cannot be identified from 55 weeks of training data, so the model was being asked for something the window could not support. Refitted without the seasonal term, the same comparison cost 0.0041. The sign held and the significance held, but 98 percent of the effect belonged to the specification, not to the data. Chasing that down cost weeks and removed my best headline.",
          stat: { value: "98%", label: "Of the apparent mobility penalty was specification, not data" },
        },
        {
          heading: "The graph arm, which was the interesting part of the hypothesis",
          body: "If mobility is going to help anywhere, it should help most when represented as what it actually is, a directed weighted network. The graph-attention model reached 0.5593 against 0.8163 for an LSTM given the same mobility information as flat columns, a gap of 0.2570 in favour of the simpler representation. It was not a convergence failure: the best validation loss was roughly eighteen times the recurrent model's, so the shortfall is there during training. It also absorbed none of the spatial dependence it was introduced to capture. Moran's I on residuals was significant in all 18 test weeks for every configuration tested, including the graph one.",
        },
        {
          heading: "Where the error lands",
          body: "Aggregate accuracy says nothing about who the model is wrong about. Split by socioeconomic quartile, every configuration had unequal error, with disparity ratios from 1.15 to 2.10 and the widest gaps on income. The least accurate model was the most equal one, which is an uncomfortable trade to have to report and the reason it is reported here rather than left out.",
        },
        {
          heading: "Status",
          body: "Submitted on 17 August 2026 and defended at viva on 1 September 2026, supervised by Dr Tongxin Chen, with results due later in the year. The numbers above come from the submitted report rather than from an earlier draft, which matters because this study changed its own headline twice on the way through. A null result is where a viva either holds or falls apart, particularly once you have told the room that your own strongest evidence was an artefact. It held.",
        },
      ],
      plainEnglish: "Everyone assumed that knowing how much people travelled between areas would help predict where an outbreak went next. It is an expensive dataset and the reasoning is sensible. I tested it properly, by running the same models twice, once with the travel data and once without, changing nothing else. It made no useful difference. I also found something that made me uncomfortable: my own strongest evidence that the travel data was harmful was wrong, caused by a setting in my model rather than by the data itself. Finding that out cost me my best result. Reporting it anyway is the point.",
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
          heading: "A pattern that cuts against intuition",
          body: "A chi-square test confirmed machine type predicts failure risk (χ² = 13.75, p = 0.001), and the direction ran counter to expectation: low-power machines failed more often than high-power ones, 3.9% against 2.1%. That's worth checking before the failure flag gets read as a simple hardware-quality signal.",
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
