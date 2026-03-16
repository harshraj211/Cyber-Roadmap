// ═══════════════════════════════════════════════
// ML QUIZ ENGINE — CyberNav v4
// Integrates cybernav_ml.js (CN_ML) with onboarding
// ═══════════════════════════════════════════════

// ── QUIZ QUESTIONS ──
// Order matches CN_ML features: [offense, coding, docs, malware, network, risk, forensics, cloud]
const QUIZ_QUESTIONS = [
  {
    id: "prefers_offense",
    question: "When it comes to cybersecurity, do you prefer attacking or defending?",
    hint: "Neither is wrong — red teamers attack, blue teamers defend, and most roles blend both.",
    options: [
      { value: 0, icon: "🛡️", label: "Defending systems",    sub: "Building defenses, detecting threats, protecting infrastructure" },
      { value: 1, icon: "⚔️", label: "Both equally",         sub: "I want to understand both sides of the fight" },
      { value: 2, icon: "💀", label: "Attacking systems",    sub: "Finding vulnerabilities, breaking things ethically" },
    ]
  },
  {
    id: "coding_comfort",
    question: "How comfortable are you with coding and scripting?",
    hint: "Not all cybersecurity roles require heavy coding — GRC and network roles use very little.",
    options: [
      { value: 0, icon: "🤷", label: "Not comfortable",      sub: "I know very little or no programming" },
      { value: 1, icon: "🐍", label: "Basic Python / CLI",   sub: "I can write simple scripts and use the command line" },
      { value: 2, icon: "💻", label: "Comfortable coder",    sub: "I write code regularly and enjoy it" },
    ]
  },
  {
    id: "likes_docs_policy",
    question: "Do you enjoy reading policies, frameworks, and compliance documents?",
    hint: "This distinguishes GRC / compliance roles from technical hands-on roles.",
    options: [
      { value: 0, icon: "😴", label: "Not really",           sub: "I'd rather be hands-on with tools and systems" },
      { value: 1, icon: "📄", label: "It's fine in moderation", sub: "I can handle documentation when needed" },
      { value: 2, icon: "📋", label: "Yes, I enjoy it",      sub: "Risk frameworks, auditing, governance — I find this interesting" },
    ]
  },
  {
    id: "malware_curiosity",
    question: "How curious are you about how malware actually works internally?",
    hint: "Malware analysts and DFIR professionals dig deep into how malicious code behaves.",
    options: [
      { value: 0, icon: "😐", label: "Not very curious",     sub: "I prefer working at a higher level" },
      { value: 1, icon: "🔍", label: "Somewhat curious",     sub: "I'd like to understand the basics of how attacks work" },
      { value: 2, icon: "🦠", label: "Very curious",         sub: "I want to reverse engineer malware and understand every detail" },
    ]
  },
  {
    id: "network_interest",
    question: "How interested are you in networking — firewalls, routing, packet analysis?",
    hint: "Network security engineers spend most of their time on routers, switches, firewalls, and traffic analysis.",
    options: [
      { value: 0, icon: "📶", label: "Not very interested",  sub: "Networking isn't my main focus" },
      { value: 1, icon: "🌐", label: "Moderately interested",sub: "I understand networking basics and find it somewhat interesting" },
      { value: 2, icon: "🔧", label: "Very interested",      sub: "I love networking — VLANs, BGP, packet captures, firewall rules" },
    ]
  },
  {
    id: "risk_compliance",
    question: "Are you interested in organizational risk management and regulatory compliance?",
    hint: "GRC professionals help companies comply with ISO 27001, GDPR, SOC 2, and other frameworks.",
    options: [
      { value: 0, icon: "🙅", label: "Not interested",       sub: "I prefer technical hands-on security work" },
      { value: 1, icon: "⚖️", label: "Somewhat interested",  sub: "I see the value but it's not my primary passion" },
      { value: 2, icon: "📊", label: "Very interested",      sub: "Risk assessment, auditing, and governance excites me" },
    ]
  },
  {
    id: "forensics_mindset",
    question: "Do you have an investigator's mindset — finding clues, building timelines, solving incidents?",
    hint: "DFIR and SOC analysts think like detectives — they reconstruct what happened after a breach.",
    options: [
      { value: 0, icon: "🤔", label: "Not really",           sub: "I prefer building or breaking things over investigating" },
      { value: 1, icon: "🕵️", label: "Somewhat",             sub: "I enjoy incident investigation as part of a broader role" },
      { value: 2, icon: "🔬", label: "Absolutely",           sub: "I love piecing together evidence and understanding what happened" },
    ]
  },
  {
    id: "cloud_comfort",
    question: "How comfortable are you with cloud platforms like AWS, Azure, or Google Cloud?",
    hint: "Cloud security roles work almost entirely in cloud environments. No cloud = start with fundamentals.",
    options: [
      { value: 0, icon: "❓", label: "Not comfortable",      sub: "I haven't worked much with cloud platforms" },
      { value: 1, icon: "☁️", label: "Some experience",      sub: "I've used cloud services but don't know security deeply" },
      { value: 2, icon: "🚀", label: "Very comfortable",     sub: "I work with cloud platforms regularly and want to secure them" },
    ]
  },
];

// ── QUIZ STATE ──
let quizAnswers = new Array(8).fill(-1); // -1 = unanswered
let quizCurrentQ = 0;

// ── INIT ──
function initQuiz() {
  quizAnswers = new Array(8).fill(-1);
  quizCurrentQ = 0;
  renderQuestion(0);
  updateQuizProgress();
}

// ── RENDER QUESTION ──
function renderQuestion(idx) {
  const q = QUIZ_QUESTIONS[idx];
  const answered = quizAnswers[idx];

  const wrap = document.getElementById("quiz-question-wrap");
  wrap.innerHTML = `
    <div class="ob-quiz-card">
      <div class="ob-quiz-qnum">Question ${idx + 1} of ${QUIZ_QUESTIONS.length} · ${q.id.replace(/_/g," ")}</div>
      <div class="ob-quiz-question">${q.question}</div>
      <div class="ob-quiz-hint">${q.hint}</div>
      <div class="ob-quiz-options">
        ${q.options.map(opt => `
          <div class="ob-quiz-option ${answered === opt.value ? 'selected' : ''}"
               onclick="selectAnswer(${idx}, ${opt.value})">
            <div class="ob-quiz-option-icon">${opt.icon}</div>
            <div class="ob-quiz-option-text">
              <div class="ob-quiz-option-label">${opt.label}</div>
              <div class="ob-quiz-option-sub">${opt.sub}</div>
            </div>
            <div class="ob-quiz-option-dot"></div>
          </div>
        `).join("")}
      </div>
    </div>`;

  // Show/hide prev button
  const prevBtn = document.getElementById("quiz-prev-btn");
  if (prevBtn) prevBtn.style.display = idx > 0 ? "inline-block" : "none";
}

// ── SELECT ANSWER ──
function selectAnswer(qIdx, value) {
  quizAnswers[qIdx] = value;
  SFX.play("click");

  // Animate selection then auto-advance
  renderQuestion(qIdx);
  updateQuizProgress();

  setTimeout(() => {
    if (qIdx < QUIZ_QUESTIONS.length - 1) {
      quizCurrentQ = qIdx + 1;
      renderQuestion(quizCurrentQ);
      updateQuizProgress();
    } else {
      // All questions answered — run prediction
      runMLPrediction();
    }
  }, 380);
}

function quizPrev() {
  if (quizCurrentQ > 0) {
    quizCurrentQ--;
    renderQuestion(quizCurrentQ);
    updateQuizProgress();
  }
}

function updateQuizProgress() {
  const answered = quizAnswers.filter(a => a !== -1).length;
  const pct = Math.round((quizCurrentQ / QUIZ_QUESTIONS.length) * 100);
  const fillEl = document.getElementById("quiz-prog-fill");
  const lblEl  = document.getElementById("quiz-prog-label");
  if (fillEl) fillEl.style.width = pct + "%";
  if (lblEl)  lblEl.textContent  = `Question ${Math.min(quizCurrentQ + 1, QUIZ_QUESTIONS.length)} of ${QUIZ_QUESTIONS.length}`;
}

// ── RUN ML PREDICTION ──
function runMLPrediction() {
  // Make sure CN_ML is loaded
  if (typeof CN_ML === "undefined") {
    showToast("ML model not loaded — picking manually", "⚠️", "#fbbf24");
    goToStep(1);
    return;
  }

  // Replace -1 (unanswered) with 1 (middle/neutral)
  const answers = quizAnswers.map(a => a === -1 ? 1 : a);
  const result = CN_ML.predict(answers);

  showMLResult(result, answers);
}

// ── SHOW ML RESULT ──
function showMLResult(result, answers) {
  const branch = BRANCH_META[result.branch];
  const medals = ["🥇", "🥈", "🥉"];

  // Build answer summary chips
  const answerChips = QUIZ_QUESTIONS.map((q, i) => {
    const val = answers[i];
    const opt = q.options.find(o => o.value === val);
    return `<span class="ob-ml-ans-chip">${opt ? opt.icon : "?"} ${opt ? opt.label : "?"}</span>`;
  }).join("");

  const resultEl = document.getElementById("ob-ml-result");
  resultEl.innerHTML = `
    <div class="ob-ml-top" style="--ml-color:${branch.color};border-color:${branch.color}33">
      <div class="ob-ml-badge">🤖 ML Recommendation — ${result.confidence}% confidence</div>

      <div class="ob-ml-branch-row">
        <div class="ob-ml-icon">${branch.icon}</div>
        <div>
          <div class="ob-ml-branch-name" style="color:${branch.color}">${branch.name}</div>
          <div class="ob-ml-branch-sub">${branch.tagline}</div>
        </div>
      </div>

      <div class="ob-ml-confidence-row">
        <div class="ob-ml-conf-bar">
          <div class="ob-ml-conf-fill" id="ml-conf-fill" style="width:0%;background:${branch.color};color:${branch.color}"></div>
        </div>
        <div class="ob-ml-conf-pct" style="color:${branch.color}" id="ml-conf-pct">0%</div>
      </div>

      <div class="ob-ml-top3">
        ${result.top3.map((t, i) => {
          const b = BRANCH_META[t.branch];
          return `<div class="ob-ml-pill" style="${i===0?`border-color:${branch.color}55;background:${branch.color}11`:``}">
            <span class="ob-ml-pill-rank">${medals[i]}</span>
            <span>${b.icon} ${b.name}</span>
            <span class="ob-ml-pill-pct">${t.confidence}%</span>
          </div>`;
        }).join("")}
      </div>

      <div style="font-size:10px;color:var(--muted);margin-bottom:14px">Your answers:</div>
      <div class="ob-ml-answers">${answerChips}</div>

      <div class="ob-ml-actions">
        <button class="ob-ml-accept" style="background:${branch.color};color:#000"
          onclick="acceptMLResult('${result.branch}')">
          Accept — ${branch.name} →
        </button>
        <button class="ob-ml-manual" onclick="goToStep(1)">
          Pick a different branch
        </button>
      </div>
    </div>`;

  // Show result step
  [0,1,2,3,"ml"].forEach(s => {
    const el = document.getElementById(`ob-step-${s}`);
    if (el) el.classList.add("ob-hidden");
  });
  document.getElementById("ob-step-ml").classList.remove("ob-hidden");

  // Animate confidence bar after render
  setTimeout(() => {
    const fill = document.getElementById("ml-conf-fill");
    const pct  = document.getElementById("ml-conf-pct");
    if (fill) fill.style.width = result.confidence + "%";
    if (pct)  pct.textContent  = result.confidence + "%";
  }, 100);

  SFX.play("rank");
}

// ── ACCEPT ML RESULT → go straight to level picker ──
function acceptMLResult(branchId) {
  state.branch = branchId;
  // Highlight the branch card if visible
  document.querySelectorAll(".ob-branch-card").forEach(c =>
    c.classList.toggle("selected", c.dataset.branch === branchId)
  );
  SFX.play("click");
  goToStep(2); // Jump straight to level selection
}

// ── OVERRIDE goToStep to handle step 0 and ml ──
const _origGoToStep = typeof goToStep !== "undefined" ? goToStep : null;

function goToStep(n) {
  const allSteps = ["ob-step-0", "ob-step-ml", "ob-step-1", "ob-step-2", "ob-step-3"];
  allSteps.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("ob-hidden");
  });

  let targetId;
  if (n === 0)       targetId = "ob-step-0";
  else if (n === "ml") targetId = "ob-step-ml";
  else               targetId = `ob-step-${n}`;

  const target = document.getElementById(targetId);
  if (target) {
    target.classList.remove("ob-hidden");
    target.classList.add("ob-active");
  }
}