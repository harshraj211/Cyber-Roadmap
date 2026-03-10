// ═══════════════════════════════════════════════════════════════
// STATE.JS — CyberNav Tracker
// ═══════════════════════════════════════════════════════════════

const STORAGE_KEY = "cybernav_v1";

const DEFAULT_STATE = {
  // Setup
  branch: null,         // "cloud" | "soc" | "pentest" | etc.
  level: null,          // "beginner" | "intermediate" | "experienced"
  startDate: null,

  // Progress — keyed by "phaseIdx:topicIdx"
  progress: {},         // {"0:3": "done" | "skip"}
  notes: {},            // {"0:3": "text"}
  studyTime: {},        // {"0:3": 45}  minutes
  revisionTags: {},     // {"0:3": true}
  resources: {},        // {"resource name": true}

  // Gamification
  xp: 0,
  lastMilestone: 0,
  bestStreak: 0,

  // Settings
  theme: "dark",
  accent: "cyan",
  soundEnabled: true,

  // Exam dates
  examDate: null,

  // Meta
  version: 1,
  createdAt: null,
};

let state = { ...DEFAULT_STATE };

// ── LOAD / SAVE ──
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch(e) {}
}

function saveState() {
  try {
    if (!state.createdAt) state.createdAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch(e) {}
}

function resetState() {
  state = { ...DEFAULT_STATE };
  saveState();
}

// ── GET PLAN ──
function getPlan() {
  if (!state.branch || !state.level) return null;
  return BRANCH_PLANS[state.branch]?.[state.level] || null;
}

function getBranchMeta() {
  return BRANCH_META[state.branch] || null;
}

// ── KEY HELPERS ──
function key(phaseIdx, topicIdx) { return `${phaseIdx}:${topicIdx}`; }

// ── COMPUTED STATS ──
function calcStats() {
  const plan = getPlan(); if (!plan) return {};
  let total=0, done=0, skipped=0, totalMins=0;

  plan.phases.forEach((phase, pi) => {
    phase.topics.forEach((_, ti) => {
      total++;
      const k = key(pi, ti);
      const st = state.progress[k];
      if (st === "done") done++;
      if (st === "skip") skipped++;
      totalMins += state.studyTime[k] || 0;
    });
  });

  // Streaks — consecutive done/skip items from the beginning
  let streak = 0;
  outer: for (let pi = 0; pi < plan.phases.length; pi++) {
    for (let ti = 0; ti < plan.phases[pi].topics.length; ti++) {
      const st = state.progress[key(pi, ti)];
      if (st === "done" || st === "skip") streak++;
      else break outer;
    }
  }

  // Best streak
  let run = 0, best = state.bestStreak || 0;
  for (let pi = 0; pi < plan.phases.length; pi++) {
    for (let ti = 0; ti < plan.phases[pi].topics.length; ti++) {
      const st = state.progress[key(pi, ti)];
      if (st === "done" || st === "skip") { run++; if(run>best) best=run; }
      else run = 0;
    }
  }
  if (best > (state.bestStreak||0)) { state.bestStreak = best; }

  const pct = total ? Math.round(done / total * 100) : 0;
  const hrs = Math.floor(totalMins/60), mins = totalMins%60;

  // Phase completion
  const phases = plan.phases.map((phase, pi) => {
    const topicCount = phase.topics.length;
    const phaseDone  = phase.topics.filter((_,ti) => state.progress[key(pi,ti)] === "done").length;
    const phaseSkip  = phase.topics.filter((_,ti) => state.progress[key(pi,ti)] === "skip").length;
    const phaseMins  = phase.topics.reduce((a,_,ti) => a + (state.studyTime[key(pi,ti)]||0), 0);
    return { ...phase, phaseIdx: pi, topicCount, phaseDone, phaseSkip, phaseMins,
             phasePct: Math.round((phaseDone+phaseSkip)/topicCount*100) };
  });

  return { total, done, skipped, streak, bestStreak: best, totalMins, hrs, mins, pct, phases };
}

// ── NEXT TOPIC ──
function getNextTopic() {
  const plan = getPlan(); if (!plan) return null;
  for (let pi = 0; pi < plan.phases.length; pi++) {
    for (let ti = 0; ti < plan.phases[pi].topics.length; ti++) {
      if (!state.progress[key(pi, ti)]) return { pi, ti };
    }
  }
  return null;
}

// ── XP FOR TOPIC ──
function getXpForTopic(pi, ti) {
  const plan = getPlan(); if (!plan) return 10;
  let xp = 10;
  const mins = state.studyTime[key(pi, ti)] || 0;
  if (mins >= 30) xp += 10;
  if (mins >= 60) xp += 20;
  if (mins >= 90) xp += 30;
  const topic = plan.phases[pi]?.topics[ti] || "";
  if (topic.includes("🏆") || topic.includes("EXAM") || topic.includes("Certification")) xp += 100;
  if (topic.includes("mock") || topic.includes("Mock")) xp += 30;
  if (topic.includes("Lab") || topic.includes("lab")) xp += 20;
  return xp;
}

// ── EXAM COUNTDOWN ──
function getExamCountdown() {
  if (!state.examDate) return null;
  const d = new Date(state.examDate); d.setHours(0,0,0,0);
  const now = new Date(); now.setHours(0,0,0,0);
  const diff = Math.ceil((d - now) / (1000*60*60*24));
  return { date: d, days: diff, passed: diff < 0 };
}

// ── LINKEDIN POST ──
function generateLinkedInPost() {
  const { done, total, pct } = calcStats();
  const rank = getRank(state.xp);
  const branch = getBranchMeta();
  const plan = getPlan();
  const phase = plan?.phases[getCurrentPhaseIdx()];
  const posts = [
    `🚀 ${done}/${total} topics completed in my ${branch?.name} journey!\n\nCurrently in: ${phase?.label || branch?.label}\nRank achieved: ${rank.icon} ${rank.name} | ${pct}% complete\n\nBuilding toward: ${branch?.topRole}\n\nLearning in public. If you're on a similar path, let's connect!\n\n#Cybersecurity #${branch?.id} #LearningInPublic #InfoSec`,
    `📊 Progress update on my ${branch?.name} roadmap:\n\n✅ ${done} topics done\n⚡ ${state.xp.toLocaleString()} XP earned\n🏅 ${rank.icon} ${rank.name} rank\n\nTop skills I'm building: ${branch?.tags?.join(", ")}\n\nTarget role: ${branch?.topRole}\n\nWho else is learning ${branch?.name}? Drop a comment 👇\n\n#${branch?.name?.replace(/\s/g,"")} #Cybersecurity #CareerChange`,
  ];
  return posts[done % posts.length];
}

function getCurrentPhaseIdx() {
  const plan = getPlan(); if (!plan) return 0;
  for (let pi = plan.phases.length-1; pi >= 0; pi--) {
    const done = plan.phases[pi].topics.filter((_,ti) => state.progress[key(pi,ti)]).length;
    if (done > 0) return pi;
  }
  return 0;
}

// ── NOTES EXPORT ──
function exportNotesMarkdown() {
  const plan = getPlan(); if (!plan) return "";
  const branch = getBranchMeta();
  const { done, total } = calcStats();
  let md = `# 🛡️ ${branch?.name} Study Journal\n\n**Generated:** ${new Date().toLocaleDateString()}\n**Progress:** ${done}/${total} topics · ${state.xp.toLocaleString()} XP\n\n---\n\n`;
  plan.phases.forEach((phase, pi) => {
    md += `## ${phase.icon} ${phase.name} — ${phase.label}\n\n`;
    phase.topics.forEach((topic, ti) => {
      const k = key(pi, ti);
      const st = state.progress[k], note = state.notes[k], mins = state.studyTime[k];
      if (!st && !note) return;
      const statusIcon = st === "done" ? "✅" : st === "skip" ? "⏭️" : "⏳";
      md += `### ${statusIcon} ${topic}\n`;
      if (mins) md += `⏱ ${mins} minutes\n`;
      if (note) md += `\n${note}\n`;
      md += "\n";
    });
  });
  return md;
}