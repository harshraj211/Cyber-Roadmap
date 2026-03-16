// ═══════════════════════════════════════════════════════════════
// ML ENGINE — CyberNav
// Features:
//   1. Progress-based re-recommendation (at 25% completion)
//   2. Cert recommender (sidebar readiness scores)
//   3. Weekly phase quiz (knowledge check after each phase)
// ═══════════════════════════════════════════════════════════════

const ML_ENGINE = {

  // ── 1. PROGRESS-BASED RE-RECOMMENDATION ─────────────────────
  // After 25% roadmap done, re-analyzes study behavior and
  // suggests a different branch if patterns changed.

  getProgressRecommendation() {
    const plan = getPlan(); if (!plan) return null;
    const { pct, done } = calcStats();

    if (pct < 25) return null;                  // too early
    if (state.progressRecoShown) return null;   // already shown once

    let totalMins = 0, topicsWithTime = 0;
    let revisionCount = 0, skipCount = 0;

    plan.phases.forEach((phase, pi) => {
      phase.topics.forEach((_, ti) => {
        const k = `${pi}:${ti}`;
        const mins = state.studyTime?.[k] || 0;
        const st   = state.progress?.[k];
        const rev  = state.revisionTags?.[k];
        totalMins += mins;
        if (mins > 0) topicsWithTime++;
        if (rev) revisionCount++;
        if (st === "skip") skipCount++;
      });
    });

    const avgMins      = topicsWithTime > 0 ? totalMins / topicsWithTime : 0;
    const skipRate     = done > 0 ? skipCount / done : 0;
    const revisionRate = done > 0 ? revisionCount / done : 0;

    // Adjust quiz answers based on observed behavior
    const base = [...(state.quizAnswers || new Array(8).fill(1))];

    if (revisionRate > 0.3)  base[2] = Math.min(2, base[2] + 1); // thorough → more docs/policy
    if (avgMins > 45)        base[3] = Math.min(2, base[3] + 1); // deep learner → malware/dfir
    if (avgMins > 45)        base[6] = Math.min(2, base[6] + 1);
    if (skipRate > 0.25)     base[0] = Math.min(2, base[0] + 1); // fast mover → offense
    if (skipRate > 0.25)     base[1] = Math.min(2, base[1] + 1);

    if (typeof CN_ML === "undefined") return null;
    const result = CN_ML.predict(base);

    // Only surface if different branch and meaningful confidence
    if (result.branch === state.branch) return null;
    if (result.confidence < 35) return null;

    const reason =
      revisionRate > 0.3   ? "You're thorough and detail-oriented — you flag a lot for revision." :
      skipRate > 0.25      ? "You move fast and prefer practical content over theory." :
      avgMins > 45         ? "You spend deep time on each topic — investigative work might suit you." :
                             "Based on your study patterns so far.";

    return {
      branch:     result.branch,
      name:       BRANCH_META[result.branch]?.name,
      icon:       BRANCH_META[result.branch]?.icon,
      color:      BRANCH_META[result.branch]?.color,
      confidence: result.confidence,
      reason,
    };
  },

  // ── 2. CERT RECOMMENDER ──────────────────────────────────────
  // Scores each cert in the branch by how ready the user is.
  // Based on: topics completed, time logged, mock exam topics done.

  getCertRecommendation() {
    const { pct, phases } = calcStats();
    const certs = BRANCH_CERTS[state.branch];
    if (!certs || !phases) return null;

    const scored = certs.map(cert => {
      let readiness = 0;
      const reasons = [];

      if (cert.vtype === "do") {
        if (pct >= 20) { readiness += 30; reasons.push("Foundations covered"); }
        if (pct >= 40) { readiness += 20; reasons.push("Phase 1 done"); }
        if (pct >= 60) { readiness += 20; reasons.push("Core topics complete"); }
      }
      if (cert.vtype === "late") {
        if (pct < 60) return { cert, readiness: 0, reasons: ["Complete more roadmap first"] };
        readiness += pct - 60;
      }

      // Boost if cert keywords appear in completed topic names
      const plan = getPlan();
      if (plan) {
        plan.phases.forEach((phase, pi) => {
          phase.topics.forEach((topic, ti) => {
            const k = `${pi}:${ti}`;
            if (state.progress?.[k] === "done") {
              const certWords = cert.name.toLowerCase().split(/[\s\/\-]+/);
              const topicLow  = topic.toLowerCase();
              certWords.forEach(w => { if (w.length > 3 && topicLow.includes(w)) readiness += 8; });
              if (topicLow.includes("mock exam") || topicLow.includes("exam prep")) readiness += 15;
              if (topicLow.includes("🏆")) readiness = Math.max(readiness, 90);
            }
          });
        });
      }

      // Boost by study time
      const totalMins = Object.values(state.studyTime || {}).reduce((a, v) => a + v, 0);
      if (totalMins > 300)  { readiness += 10; reasons.push("300+ mins studied"); }
      if (totalMins > 600)  { readiness += 10; reasons.push("600+ mins studied"); }
      if (totalMins > 1200) { readiness += 15; reasons.push("20+ hours studied"); }

      return { cert, readiness: Math.min(99, Math.round(readiness)), reasons };
    });

    return scored
      .filter(s => s.readiness > 0)
      .sort((a, b) => b.readiness - a.readiness)
      .slice(0, 2);
  },
};

// ── WEEKLY QUIZ ENGINE ────────────────────────────────────────

const WEEKLY_QUIZ = {

  // Question bank — matches topic keywords to real exam-style questions
  generateQuestion(topic) {
    const t = topic.toLowerCase();

    if (t.includes("iam") || t.includes("identity"))
      return { q: `In the context of "${topic}", what does least privilege mean?`, options: ["Give users max access for productivity","Grant only minimum permissions needed","All users share the same access level","Admins have access to everything"], correct: 1, explanation: "Least privilege means users get only the permissions required for their job — nothing more. This limits blast radius if an account is compromised." };

    if (t.includes("sql injection") || t.includes("sqli"))
      return { q: "What is the most effective defense against SQL Injection?", options: ["Input validation only","Parameterized queries / prepared statements","Using a WAF","Disabling error messages"], correct: 1, explanation: "Parameterized queries separate SQL code from user data, making injection structurally impossible. WAFs help but aren't sufficient alone." };

    if (t.includes("xss") || t.includes("cross-site scripting"))
      return { q: "Which XSS type persists in the database and affects every user who views the page?", options: ["Reflected XSS","DOM-based XSS","Stored XSS","Blind XSS"], correct: 2, explanation: "Stored (Persistent) XSS is saved in the database and served to every user — making it the most dangerous XSS type." };

    if (t.includes("nmap") || t.includes("scanning"))
      return { q: "What makes a SYN scan (-sS) different from a full TCP connect scan?", options: ["It's slower but more accurate","It sends SYN then RST without completing the handshake — stealthier","It scans UDP instead of TCP","It requires root privileges only"], correct: 1, explanation: "SYN scan (half-open) sends SYN, gets SYN-ACK, then RST instead of completing the handshake. Faster and less visible in application logs." };

    if (t.includes("owasp"))
      return { q: "Which vulnerability topped the OWASP Top 10 in 2021?", options: ["SQL Injection","Broken Authentication","Broken Access Control","Security Misconfiguration"], correct: 2, explanation: "Broken Access Control moved to #1 in 2021, appearing in 94% of apps tested. It lets users act outside their intended permissions." };

    if (t.includes("firewall"))
      return { q: "Key difference between stateful and stateless firewall?", options: ["Stateless is always faster","Stateful tracks connection state; stateless evaluates each packet independently","Stateful only works with TCP","Stateless is newer technology"], correct: 1, explanation: "Stateful firewalls remember active connection state and make smarter decisions. Stateless applies rules to each packet independently." };

    if (t.includes("volatility") || t.includes("memory forensics"))
      return { q: "What does Volatility's 'pslist' plugin show?", options: ["Running network connections","Processes from the EPROCESS linked list","Loaded kernel modules","Open file handles"], correct: 1, explanation: "pslist walks the EPROCESS doubly-linked list. Rootkits can hide from it by unlinking processes — which is why psscan (raw memory scan) is also used." };

    if (t.includes("kerberoasting") || t.includes("kerberos"))
      return { q: "What makes Kerberoasting possible?", options: ["Weak AD passwords","Any authenticated user can request a TGS for any service account","SMB signing disabled","NTLM enabled on domain"], correct: 1, explanation: "Any domain user can request a Kerberos service ticket encrypted with the service account's password hash — which can be cracked offline." };

    if (t.includes("gdpr") || t.includes("privacy"))
      return { q: "Under GDPR, how long to report a breach to supervisory authority?", options: ["24 hours","48 hours","72 hours","7 days"], correct: 2, explanation: "GDPR Article 33 requires notification within 72 hours of becoming aware — unless the breach poses no risk to individuals." };

    if (t.includes("iso 27001") || t.includes("isms"))
      return { q: "What is the Statement of Applicability (SoA) in ISO 27001?", options: ["List of employees with access","Document declaring which Annex A controls apply and why","The IR plan","The risk register"], correct: 1, explanation: "The SoA lists all Annex A controls, states whether each is implemented, and justifies inclusions/exclusions. Mandatory for certification." };

    if (t.includes("metasploit"))
      return { q: "In Metasploit, what is a 'payload' vs an 'exploit'?", options: ["The vulnerability being exploited","Code that runs on the target after exploitation","The target IP address","The scanning module"], correct: 1, explanation: "An exploit gains access. A payload is what executes after — e.g. a reverse shell or Meterpreter session." };

    if (t.includes("wireshark") || t.includes("packet"))
      return { q: "Correct Wireshark filter for HTTP traffic only?", options: ["tcp.port == 80","http","ip.proto == http","display.http"], correct: 1, explanation: "'http' is the correct display filter. 'tcp.port == 80' captures TCP on port 80 but includes non-HTTP traffic." };

    if (t.includes("yara"))
      return { q: "What is YARA primarily used for?", options: ["Real-time network scanning","Pattern-matching rules to identify and classify malware","Fuzzing for vulnerabilities","Generating SSL certs"], correct: 1, explanation: "YARA rules describe malware families using strings, byte patterns, and conditions — used to detect and classify malware samples." };

    if (t.includes("vpn") || t.includes("ipsec"))
      return { q: "Main difference between site-to-site and remote access VPN?", options: ["Site-to-site is more secure","Site-to-site connects networks; remote access connects individual users","Remote access uses IPSec only","They are identical"], correct: 1, explanation: "Site-to-site links two office networks permanently. Remote access lets individual users connect securely from anywhere." };

    if (t.includes("zero trust"))
      return { q: "What is the core principle of Zero Trust architecture?", options: ["Trust everyone inside the network perimeter","Never trust, always verify — regardless of location","Disable all external access","Use VPN for all internal traffic"], correct: 1, explanation: "Zero Trust assumes breach — no user or device is trusted by default, even inside the network. Every request must be verified." };

    if (t.includes("cloud") || t.includes("aws") || t.includes("azure"))
      return { q: "What does the shared responsibility model mean in cloud security?", options: ["Cloud provider handles all security","Customer handles all security","Security is split: provider secures infrastructure, customer secures their data/config","Only applies to public cloud"], correct: 2, explanation: "The cloud provider secures the underlying infrastructure. The customer is responsible for securing their data, configurations, identities, and applications on top of it." };

    // Generic fallback
    return { q: `You studied "${topic}" — what is the PRIMARY reason to understand this?`, options: ["It appears on exams","Understanding it helps identify and mitigate real-world attacks","It is required by compliance frameworks","It is the most common interview question"], correct: 1, explanation: `${topic} is a core security concept. Real professionals study it to understand both attack techniques and the defenses required to counter them.` };
  },

  generateQuestions(phaseIdx, count = 5) {
    const plan = getPlan(); if (!plan) return [];
    const phase = plan.phases[phaseIdx];
    const doneTopic = phase.topics.filter((_, ti) =>
      state.progress?.[`${phaseIdx}:${ti}`] === "done"
    );
    if (doneTopic.length < 3) return [];
    return doneTopic
      .slice(0, count)
      .map(t => this.generateQuestion(t))
      .filter(Boolean)
      .slice(0, count);
  },

  // State
  currentQuiz: null,
  currentQ:    0,
  score:       0,
  answers:     [],

  start(phaseIdx) {
    const questions = this.generateQuestions(phaseIdx);
    if (!questions.length) return false;
    this.currentQuiz = { phaseIdx, questions };
    this.currentQ = 0;
    this.score    = 0;
    this.answers  = [];
    document.getElementById("wq-modal")?.classList.add("show");
    this.render();
    return true;
  },

  render() {
    const { questions } = this.currentQuiz;
    const idx   = this.currentQ;
    const total = questions.length;
    if (idx >= total) { this.showResults(); return; }
    const q   = questions[idx];
    const pct = Math.round((idx / total) * 100);

    document.getElementById("wq-content").innerHTML = `
      <div style="height:4px;background:var(--bg4);border-radius:99px;overflow:hidden;margin-bottom:14px">
        <div style="width:${pct}%;height:100%;background:var(--ac);border-radius:99px;transition:width .4s"></div>
      </div>
      <div style="font-size:10px;color:var(--muted);font-family:var(--font-mono);margin-bottom:12px">
        Question ${idx+1} / ${total} · <span style="color:var(--ac)">+25 XP per correct answer</span>
      </div>
      <div class="wq-question">${q.q}</div>
      <div class="wq-options">
        ${q.options.map((opt, i) => `
          <div class="wq-option" id="wqo-${i}" onclick="WEEKLY_QUIZ.answer(${i})">
            <div class="wq-option-letter">${String.fromCharCode(65+i)}</div>
            <div>${opt}</div>
          </div>`).join("")}
      </div>
      <div id="wq-explanation" style="display:none"></div>`;
  },

  answer(chosen) {
    const q = this.currentQuiz.questions[this.currentQ];
    const correct = chosen === q.correct;
    if (correct) this.score++;
    this.answers.push({ chosen, correct: q.correct, wasCorrect: correct, topic: q.q });

    document.querySelectorAll(".wq-option").forEach((el, i) => {
      el.style.pointerEvents = "none";
      if (i === q.correct) el.classList.add("wq-correct");
      else if (i === chosen && !correct) el.classList.add("wq-wrong");
    });

    const expEl = document.getElementById("wq-explanation");
    if (expEl) {
      expEl.style.display = "block";
      expEl.innerHTML = `
        <div style="font-size:11px;color:${correct?"#34d399":"#f87171"};font-weight:700;margin-bottom:6px">
          ${correct ? "✅ Correct!" : "❌ Incorrect"}
        </div>
        <div style="font-size:11px;color:var(--text2);line-height:1.6">${q.explanation}</div>
        <button class="wq-next-btn" onclick="WEEKLY_QUIZ.next()">
          ${this.currentQ < this.currentQuiz.questions.length - 1 ? "Next →" : "See Results →"}
        </button>`;
    }
  },

  next() {
    this.currentQ++;
    this.render();
  },

  showResults() {
    const total    = this.currentQuiz.questions.length;
    const pct      = Math.round((this.score / total) * 100);
    const xpEarned = this.score * 25;
    const grade    = pct >= 80 ? "🏆 Excellent!" : pct >= 60 ? "✅ Good job!" : "📚 Keep studying";
    const color    = pct >= 80 ? "#34d399"        : pct >= 60 ? "#fbbf24"      : "#f87171";

    state.xp = (state.xp || 0) + xpEarned;

    // Auto-flag wrong topics for revision
    const pi = this.currentQuiz.phaseIdx;
    const plan = getPlan();
    this.answers.forEach((ans, i) => {
      if (!ans.wasCorrect && plan) {
        const ti = plan.phases[pi]?.topics.findIndex((t, j) =>
          state.progress?.[`${pi}:${j}`] === "done"
        );
        if (ti >= 0) {
          if (!state.revisionTags) state.revisionTags = {};
          state.revisionTags[`${pi}:${i}`] = true;
        }
      }
    });

    saveState();

    document.getElementById("wq-content").innerHTML = `
      <div style="text-align:center;padding:20px 0">
        <div style="font-size:52px;margin-bottom:10px">${pct>=80?"🏆":pct>=60?"✅":"📚"}</div>
        <div style="font-size:20px;font-weight:700;color:${color};margin-bottom:4px">${grade}</div>
        <div style="font-family:var(--font-mono);font-size:34px;font-weight:700;margin:10px 0">${this.score}/${total}</div>
        <div style="font-size:11px;color:var(--text2);margin-bottom:16px">${pct}% correct</div>
        <div class="xp-chip" style="display:inline-block;margin-bottom:16px">+${xpEarned} XP earned</div>
        ${this.answers.filter(a=>!a.wasCorrect).length > 0 ? `
        <div style="background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.25);border-radius:10px;padding:10px 12px;margin-bottom:14px;font-size:11px;color:#fbbf24;text-align:left">
          🔖 ${this.answers.filter(a=>!a.wasCorrect).length} topic(s) auto-flagged for revision
        </div>` : ""}
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          <button class="btn-ac" onclick="WEEKLY_QUIZ.close();renderAll()">Continue studying 🚀</button>
          <button class="btn-ghost" onclick="WEEKLY_QUIZ.close()">Close</button>
        </div>
      </div>`;
  },

  close() {
    document.getElementById("wq-modal")?.classList.remove("show");
    this.currentQuiz = null;
  }
};