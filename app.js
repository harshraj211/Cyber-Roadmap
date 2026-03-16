// ═══════════════════════════════════════════════════════════════
// APP.JS — CyberNav Tracker (v2 — Rich Cards)
// ═══════════════════════════════════════════════════════════════

let currentFilter = "all";
let charts = {};

// ── SOUND ──
const SFX = {
  ctx: null,
  init() { if (!this.ctx) try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {} },
  play(type) {
    if (!state.soundEnabled) return;
    try {
      this.init(); if (!this.ctx) return;
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.connect(g); g.connect(this.ctx.destination);
      const t = this.ctx.currentTime;
      if (type==="done")  { o.frequency.setValueAtTime(523,t); o.frequency.setValueAtTime(659,t+.08); g.gain.setValueAtTime(.18,t); g.gain.exponentialRampToValueAtTime(.001,t+.3); o.start(t); o.stop(t+.3); }
      if (type==="rank")  { [440,554,659,880].forEach((f,i)=>{ const o2=this.ctx.createOscillator(),g2=this.ctx.createGain(); o2.connect(g2); g2.connect(this.ctx.destination); o2.frequency.value=f; g2.gain.setValueAtTime(.12,t+i*.1); g2.gain.exponentialRampToValueAtTime(.001,t+i*.1+.3); o2.start(t+i*.1); o2.stop(t+i*.1+.3); }); }
      if (type==="click") { o.frequency.setValueAtTime(800,t); g.gain.setValueAtTime(.05,t); g.gain.exponentialRampToValueAtTime(.001,t+.08); o.start(t); o.stop(t+.08); }
    } catch(e) {}
  }
};

// ── ONBOARDING ──
function initOnboarding() {
  const grid = document.querySelector(".ob-branches-grid");
  grid.innerHTML = Object.values(BRANCH_META).map(b => `
    <div class="ob-branch-card" data-branch="${b.id}" onclick="selectBranch('${b.id}')" style="--bclr:${b.color}">
      <div class="ob-branch-icon">${b.icon}</div>
      <div class="ob-branch-name">${b.name}</div>
      <div class="ob-branch-tagline">${b.tagline}</div>
      <div class="ob-branch-meta">
        <span class="ob-tag" style="background:${b.color}18;color:${b.color};border:1px solid ${b.color}28">₹${b.salary}</span>
        <span class="ob-demand" style="color:${b.color}">🔥 ${b.demand}% demand</span>
      </div>
    </div>`).join("");
}

function selectBranch(id) {
  state.branch = id;
  document.querySelectorAll(".ob-branch-card").forEach(c => c.classList.toggle("selected", c.dataset.branch === id));
  SFX.play("click");
  setTimeout(() => goToStep(2), 300);
}

function selectLevel(level) {
  state.level = level;
  document.querySelectorAll(".ob-level-card").forEach(c => c.classList.toggle("selected", c.dataset.level === level));
  SFX.play("click");
  updateConfirmStep();
  setTimeout(() => goToStep(3), 300);
}

function updateConfirmStep() {
  const branch = BRANCH_META[state.branch], plan = BRANCH_PLANS[state.branch]?.[state.level];
  if (!branch || !plan) return;
  document.getElementById("ob-confirm-icon").textContent  = branch.icon;
  document.getElementById("ob-confirm-name").textContent  = branch.name;
  document.getElementById("ob-confirm-level").textContent = state.level.charAt(0).toUpperCase()+state.level.slice(1)+" Level";
  const totalTopics = plan.phases.reduce((a,p)=>a+p.topics.length,0);
  document.getElementById("ob-confirm-stats").innerHTML = `
    <div class="ob-cs-item"><div class="ob-cs-val">${plan.phases.length}</div><div class="ob-cs-lbl">Phases</div></div>
    <div class="ob-cs-item"><div class="ob-cs-val">${totalTopics}</div><div class="ob-cs-lbl">Topics</div></div>
    <div class="ob-cs-item"><div class="ob-cs-val">${branch.salary}</div><div class="ob-cs-lbl">Salary</div></div>
    <div class="ob-cs-item"><div class="ob-cs-val">${branch.topRole.split(" ")[0]}</div><div class="ob-cs-lbl">Top Role</div></div>`;
  document.getElementById("ob-confirm-phases").innerHTML = plan.phases.map(p=>`
    <div class="ob-phase-preview" style="border-color:${p.color}28;background:${p.color}08">
      <span style="color:${p.color};font-size:16px">${p.icon}</span>
      <div>
        <div style="font-size:12px;font-weight:600;color:${p.color}">${p.name}: ${p.label}</div>
        <div style="font-size:10px;color:var(--muted);margin-top:2px">${p.topics.length} topics · ${p.milestones.slice(0,2).join(" · ")}</div>
      </div>
    </div>`).join("");
}

function goToStep(n) {
  [1,2,3].forEach(i => {
    const el = document.getElementById(`ob-step-${i}`);
    el.classList.toggle("ob-hidden", i!==n);
    el.classList.toggle("ob-active", i===n);
  });
}

function launchTracker() {
  if (!state.branch || !state.level) return;
  state.startDate = state.startDate || new Date().toISOString().slice(0,10);
  saveState();
  document.getElementById("onboarding").style.display = "none";
  document.getElementById("app").classList.remove("app-hidden");
  applyTheme();
  initApp();
}

// ── APP INIT ──
function initApp() {
  const branch = BRANCH_META[state.branch], plan = getPlan();
  if (!branch || !plan) return;
  document.getElementById("nav-branch-pill").innerHTML = `${branch.icon} ${branch.name}`;
  document.getElementById("sb-icon").textContent  = branch.icon;
  document.getElementById("sb-name").textContent  = branch.name;
  document.getElementById("sb-level").textContent = state.level.charAt(0).toUpperCase()+state.level.slice(1);
  document.documentElement.style.setProperty("--ac", branch.color);
  document.documentElement.style.setProperty("--ac-glow", branch.color+"33");
  document.getElementById("sb-quote").textContent = `"${MOTIVATIONAL_QUOTES[Math.floor(Date.now()/86400000)%MOTIVATIONAL_QUOTES.length]}"`;
  document.getElementById("roadmap-title").textContent = `📍 ${branch.name} Roadmap`;
  if (state.examDate) document.getElementById("exam-date-input").value = state.examDate;
  document.getElementById("btn-sound").textContent = state.soundEnabled===false?"🔇":"🔊";
  initSearch();
  renderAll();
  setTimeout(()=>{ initCharts(); renderStatsSection(); }, 200);
}

// ── RENDER ALL ──
function renderAll() {
  renderTodayHero();
  renderStats();
  renderXpBar();
  renderPhases();
  renderResources();
  renderCerts();
  renderCareer();
  renderStatsSection();
  renderExamCountdown();
}

// ── TODAY'S HERO ──
function renderTodayHero() {
  const el = document.getElementById("today-hero"); if (!el) return;
  const plan = getPlan(), branch = BRANCH_META[state.branch];
  const next = getNextTopic();
  const { done, total, pct, streak } = calcStats();

  if (!next) {
    el.innerHTML = `<div class="hero-complete">
      <div style="font-size:48px">🏆</div>
      <div>
        <div style="font-size:18px;font-weight:700;color:var(--ac)">Roadmap Complete!</div>
        <div style="font-size:12px;color:var(--text2);margin-top:4px">Every topic done in ${branch.name}. Time to get that cert!</div>
      </div>
    </div>`;
    return;
  }

  const phase = plan.phases[next.pi], topic = phase.topics[next.ti];
  const xp = getXpForTopic(next.pi, next.ti);
  const isCert = topic.includes("🏆");
  const phaseTopicsDone = phase.topics.filter((_,ti)=>state.progress[key(next.pi,ti)]==="done").length;

  el.innerHTML = `
  <div class="hero-inner" style="--hclr:${phase.color}">
    <div class="hero-left">
      <div class="hero-eyebrow">
        <span class="hero-badge" style="background:${phase.color}22;color:${phase.color};border:1px solid ${phase.color}33">${phase.icon} ${phase.name}</span>
        ${streak>0?`<span class="hero-streak">🔥 ${streak} streak</span>`:""}
        ${isCert?`<span class="hero-cert-badge">🏆 CERT MILESTONE</span>`:""}
      </div>
      <div class="hero-topic-label">📌 Up next:</div>
      <div class="hero-topic-title">${topic}</div>
      <div class="hero-sub-row">
        <span style="color:var(--muted);font-size:11px">${phase.label}</span>
        <span class="hero-xp-pill" style="background:${phase.color}18;color:${phase.color}">+${xp} XP</span>
      </div>
      <div class="hero-actions">
        <button class="hero-btn-done" onclick="quickAction(${next.pi},${next.ti},'done')" style="background:${phase.color};color:#000">✅ Mark Done</button>
        <button class="hero-btn-skip" onclick="quickAction(${next.pi},${next.ti},'skip')">⏭ Skip</button>
        <button class="hero-btn-rev"  onclick="quickAction(${next.pi},${next.ti},'revision')">🔖 Flag</button>
      </div>
    </div>
    <div class="hero-right">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="38" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="8"/>
        <circle cx="48" cy="48" r="38" fill="none" stroke="${phase.color}" stroke-width="8"
          stroke-dasharray="${2*Math.PI*38}" stroke-dashoffset="${2*Math.PI*38*(1-pct/100)}"
          stroke-linecap="round" transform="rotate(-90 48 48)"
          style="transition:stroke-dashoffset .8s ease;filter:drop-shadow(0 0 8px ${phase.color}88)"/>
      </svg>
      <div class="hero-ring-overlay">
        <div style="font-family:var(--font-mono);font-size:22px;font-weight:700;color:${phase.color}">${pct}%</div>
        <div style="font-size:8px;color:var(--muted);text-transform:uppercase;letter-spacing:1px">done</div>
      </div>
      <div style="margin-top:8px;text-align:center">
        <div style="font-family:var(--font-mono);font-size:13px;font-weight:700">${done}<span style="color:var(--muted);font-weight:400">/${total}</span></div>
        <div style="font-size:9px;color:var(--muted)">topics complete</div>
      </div>
    </div>
  </div>`;
}

// ── QUICK ACTION ──
function quickAction(pi, ti, action) {
  const k = key(pi, ti);
  if (action==="done") {
    if (state.progress[k]==="done") { delete state.progress[k]; state.xp=Math.max(0,state.xp-getXpForTopic(pi,ti)); }
    else { if(state.progress[k]!=="done"){const xp=getXpForTopic(pi,ti);state.xp+=xp;showToast(`+${xp} XP! ✅`,"✅","#34d399");SFX.play("done");} state.progress[k]="done"; }
  } else if (action==="skip") {
    if (state.progress[k]==="skip") delete state.progress[k]; else state.progress[k]="skip";
  } else if (action==="revision") {
    if (!state.revisionTags) state.revisionTags={};
    if (state.revisionTags[k]) { delete state.revisionTags[k]; showToast("Revision flag removed","🔖","#fbbf24"); }
    else { state.revisionTags[k]=true; showToast("Flagged for revision 🔖","🔖","#fbbf24"); }
  } else if (action==="undo") {
    if (state.progress[k]==="done") state.xp=Math.max(0,state.xp-getXpForTopic(pi,ti));
    delete state.progress[k];
    if (state.revisionTags) delete state.revisionTags[k];
    showToast("Undone ↩","↩","#888");
  }
  saveState(); renderAll(); checkPhaseComplete(pi);
}

function saveCardField(pi, ti, field, value) {
  const k = key(pi, ti);
  if (field==="mins") { const v=parseInt(value)||0; if(v>0) state.studyTime[k]=v; else delete state.studyTime[k]; }
  else if (field==="notes") { const v=value.trim(); if(v) state.notes[k]=v; else delete state.notes[k]; }
  saveState();
  renderStats(); renderXpBar(); renderTodayHero(); renderStatsSection();
}

// ── STATS ──
function renderStats() {
  const s = calcStats(); if (!s.total) return;
  countUp(document.getElementById("sb-done"), s.done);
  countUp(document.getElementById("sb-pct"),  s.pct, "%");
  countUp(document.getElementById("sb-streak"), s.streak);
  const hrs=Math.floor(s.totalMins/60), mins=s.totalMins%60;
  const timeEl = document.getElementById("sb-time");
  if (timeEl) timeEl.textContent = s.totalMins>0?(hrs>0?`${hrs}h`:`${mins}m`):"—";
  const ring = document.getElementById("ring-fill");
  if (ring) ring.style.strokeDashoffset = 251-(s.pct/100*251);
  const rp = document.getElementById("ring-pct"); if(rp) rp.textContent = s.pct+"%";
}

function renderStatsSection() {
  const s = calcStats(); if (!s.total) return;
  const hrs=Math.floor(s.totalMins/60),mins=s.totalMins%60;
  setVal("sc-done",   s.done);
  setVal("sc-pct",    s.pct+"%");
  setVal("sc-streak", s.streak);
  setVal("sc-best",   s.bestStreak||s.streak);
  setVal("sc-xp",     state.xp.toLocaleString());
  setVal("sc-hrs",    s.totalMins>0?(hrs>0?`${hrs}h ${mins}m`:`${mins}m`):"—");
  document.getElementById("phase-breakdown").innerHTML = (s.phases||[]).map(p=>`
    <div class="pb-row" style="border-left:3px solid ${p.color}">
      <div class="pb-phase-name" style="color:${p.color}">${p.icon} ${p.name}: ${p.label}</div>
      <div class="pb-bar-wrap">
        <div class="pb-bar"><div class="pb-bar-fill" style="width:${p.phasePct}%;background:${p.color}"></div></div>
        <span class="pb-pct" style="color:${p.color}">${p.phasePct}%</span>
      </div>
      <div class="pb-detail">
        <span style="color:#34d399">✅ ${p.phaseDone}</span>
        <span style="color:#60a5fa">⏭ ${p.phaseSkip}</span>
        <span style="color:#fbbf24">⏱ ${Math.floor(p.phaseMins/60)}h${p.phaseMins%60}m</span>
      </div>
    </div>`).join("");
  updateCharts();
}

function renderXpBar() {
  const rank=getRank(state.xp), next=getNextRank(state.xp);
  const prevRank = document.getElementById("xp-rank-name")?.dataset.rank||"";
  document.getElementById("xp-icon").textContent      = rank.icon;
  document.getElementById("xp-rank-name").textContent = rank.name;
  document.getElementById("xp-rank-name").style.color = rank.color;
  document.getElementById("xp-rank-name").dataset.rank = rank.name;
  document.getElementById("xp-total").textContent     = state.xp.toLocaleString()+" XP";
  if (prevRank && prevRank!==rank.name && prevRank!=="") { showToast(`🎉 Rank up! ${rank.icon} ${rank.name}`,"🏅",rank.color); launchConfetti(); SFX.play("rank"); }
  const fill=document.getElementById("xp-bar-fill"), lbl=document.getElementById("xp-bar-label");
  if (next) { const pct=Math.round(((state.xp-rank.min)/(next.min-rank.min))*100); if(fill)fill.style.width=pct+"%"; if(lbl)lbl.textContent=`${state.xp-rank.min}/${next.min-rank.min} XP → ${next.name}`; }
  else { if(fill)fill.style.width="100%"; if(lbl)lbl.textContent="MAX RANK 👑"; }
}

// ── PHASES — RICH CARD GRID ──
function renderPhases() {
  const plan=getPlan(); if (!plan) return;
  const s=calcStats(), next=getNextTopic();
  document.getElementById("phases-container").innerHTML = plan.phases.map((phase,pi)=>{
    const ps=s.phases?.[pi]||{};
    let topics = phase.topics.map((topic,ti)=>({topic,pi,ti}));
    if (currentFilter==="done")     topics=topics.filter(t=>state.progress[key(t.pi,t.ti)]==="done");
    else if (currentFilter==="pending")  topics=topics.filter(t=>!state.progress[key(t.pi,t.ti)]);
    else if (currentFilter==="revision") topics=topics.filter(t=>state.revisionTags?.[key(t.pi,t.ti)]);
    if (currentFilter!=="all" && topics.length===0) return "";
    return `
    <div class="phase-block" id="phase-${pi}" style="--pclr:${phase.color}">
      <div class="phase-hdr" onclick="togglePhase(${pi})">
        <div class="phase-hdr-left">
          <span class="phase-icon-badge" style="background:${phase.color}18;color:${phase.color};border-color:${phase.color}28">${phase.icon}</span>
          <div>
            <div class="phase-name" style="color:${phase.color}">${phase.name}</div>
            <div class="phase-label">${phase.label}</div>
          </div>
        </div>
        <div class="phase-hdr-right">
          <div class="phase-pct-badge" style="background:${phase.color}18;color:${phase.color}">${ps.phasePct||0}%</div>
          <div class="phase-topic-count">${ps.phaseDone||0}/${phase.topics.length}</div>
          <span class="phase-chevron" id="phase-chev-${pi}">▾</span>
        </div>
      </div>
      <div class="phase-progress-bar"><div class="phase-progress-fill" style="width:${ps.phasePct||0}%;background:${phase.color}"></div></div>
      <div class="milestones-row">
        ${phase.milestones.map((m,mi)=>{
          const thresh=Math.floor((mi+1)/phase.milestones.length*phase.topics.length);
          const unlocked=(ps.phaseDone||0)>=thresh;
          return `<div class="milestone-chip ${unlocked?"unlocked":""}" style="${unlocked?`background:${phase.color}18;border-color:${phase.color}40;color:${phase.color}`:""}">
            ${unlocked?"✅":"🔒"} ${m}</div>`;
        }).join("")}
      </div>
      <div class="phase-body" id="phase-body-${pi}">
        <div class="topic-cards-grid">
          ${topics.map(({topic,pi:p,ti})=>renderTopicCard(topic,p,ti,phase,next)).join("")}
        </div>
      </div>
    </div>`;
  }).filter(Boolean).join("");
}

// ── RICH TOPIC CARD ──
function renderTopicCard(topic, pi, ti, phase, next) {
  const k=key(pi,ti), st=state.progress[k], rev=state.revisionTags?.[k];
  const note=state.notes?.[k]||"", mins=state.studyTime?.[k]||0;
  const isNext=next&&next.pi===pi&&next.ti===ti, xp=getXpForTopic(pi,ti);
  const isCert=topic.includes("🏆");
  const cls=["tc2",st==="done"?"tc2-done":st==="skip"?"tc2-skip":"",isNext?"tc2-next":"",isCert?"tc2-cert":"",rev?"tc2-rev":""].filter(Boolean).join(" ");
  return `
  <div class="${cls}" id="tc-${pi}-${ti}" style="--pclr:${phase.color}">
    <div class="tc2-top">
      <div class="tc2-badges">
        <span class="tc2-phase-badge" style="background:${phase.color}18;color:${phase.color}">${phase.icon} ${phase.name}</span>
        <span class="tc2-xp-badge" style="color:${phase.color}">+${xp} XP</span>
        ${isNext?`<span class="tc2-next-badge">▶ NEXT</span>`:""}
        ${rev?`<span style="font-size:11px">🔖</span>`:""}
        ${isCert?`<span style="font-size:11px">🏆</span>`:""}
      </div>
      <div class="tc2-num">#${ti+1}</div>
    </div>
    <div class="tc2-title">${topic}</div>
    <div class="tc2-input-row">
      <div class="tc2-mins-group">
        <span class="tc2-input-lbl">⏱ mins</span>
        <input type="number" min="0" max="999" class="tc2-mins-input" placeholder="0"
          value="${mins||""}" onclick="event.stopPropagation()"
          onchange="saveCardField(${pi},${ti},'mins',this.value)"/>
        <span class="tc2-input-unit">min</span>
      </div>
    </div>
    <textarea class="tc2-notes" placeholder="Notes…"
      onclick="event.stopPropagation()"
      onblur="saveCardField(${pi},${ti},'notes',this.value)"
    >${escHtml(note)}</textarea>
    <div class="tc2-actions">
      <button class="tc2-btn-done ${st==="done"?"tc2-active-done":""}"
        onclick="event.stopPropagation();quickAction(${pi},${ti},'done')"
        style="${st==="done"?`background:${phase.color};border-color:${phase.color};color:#000`:""}">
        ✅
      </button>
      <button class="tc2-btn-skip ${st==="skip"?"tc2-active-skip":""}"
        onclick="event.stopPropagation();quickAction(${pi},${ti},'skip')">
        ✕
      </button>
      <button class="tc2-btn-rev ${rev?"tc2-active-rev":""}"
        onclick="event.stopPropagation();quickAction(${pi},${ti},'revision')"
        style="${rev?"color:#fbbf24;border-color:#fbbf2455":""}">
        🔖
      </button>
      <button class="tc2-btn-undo" onclick="event.stopPropagation();quickAction(${pi},${ti},'undo')">↩</button>
      <button class="tc2-btn-pomo" onclick="event.stopPropagation();setPomoTopic(${pi},${ti})" title="Link this topic to Pomodoro timer">🍅</button>
    </div>
  </div>`;
}

function togglePhase(pi) {
  const body=document.getElementById(`phase-body-${pi}`), chev=document.getElementById(`phase-chev-${pi}`);
  if (!body) return;
  const c=body.classList.toggle("collapsed");
  if (chev) chev.textContent=c?"▸":"▾";
}

function checkPhaseComplete(pi) {
  const plan=getPlan(); if (!plan) return;
  const phase=plan.phases[pi];
  const allDone=phase.topics.every((_,ti)=>state.progress[key(pi,ti)]==="done"||state.progress[key(pi,ti)]==="skip");
  if (!allDone||(state.lastMilestone||0)>=pi+1) return;
  state.lastMilestone=pi+1;
  const xpReward=200+pi*100; state.xp+=xpReward; saveState();
  document.getElementById("boss-emoji").textContent = phase.icon;
  document.getElementById("boss-title").textContent = `${phase.name} Complete!`;
  document.getElementById("boss-msg").textContent   = `You finished "${phase.label}". Keep going!`;
  document.getElementById("boss-xp").textContent    = `+${xpReward} XP`;
  document.getElementById("boss-modal").classList.add("show");
  launchConfetti(); SFX.play("rank");
}

// ── RESOURCES ──
function renderResources() {
  const res=BRANCH_RESOURCES[state.branch]; if (!res) return;
  document.getElementById("resources-container").innerHTML = res.map(cat=>`
    <div class="res-cat">
      <div class="res-cat-title">${cat.cat}</div>
      <div class="res-grid">
        ${cat.items.map(r=>`
        <div class="res-card ${state.resources?.[r.name]?"res-done":""}">
          <div class="res-card-top">
            <div class="res-card-name"><a href="${r.url}" target="_blank" rel="noopener" style="${state.resources?.[r.name]?"text-decoration:line-through;opacity:.5":""}">${r.name}</a></div>
            <span class="res-badge ${r.cost==="free"?"badge-free":r.cost.includes("trial")?"badge-trial":"badge-paid"}">${r.cost.toUpperCase()}</span>
          </div>
          <div class="res-what">${r.what}</div>
          <div class="res-tip">💡 ${r.tip}</div>
          <div class="res-stars">${"★".repeat(r.stars)}${"☆".repeat(5-r.stars)}</div>
          <label class="res-check-label"><input type="checkbox" ${state.resources?.[r.name]?"checked":""} onchange="toggleResource('${escHtml(r.name)}',this.checked)" onclick="event.stopPropagation()"/> Completed</label>
        </div>`).join("")}
      </div>
    </div>`).join("");
}

function toggleResource(name, checked) {
  if (!state.resources) state.resources={};
  if (checked) state.resources[name]=true; else delete state.resources[name];
  saveState();
  const total=(BRANCH_RESOURCES[state.branch]||[]).reduce((a,c)=>a+c.items.length,0);
  showToast(`${Object.keys(state.resources).length}/${total} resources ✓`,"📚","#a78bfa");
  SFX.play("click");
}

// ── CERTS ──
function renderCerts() {
  const certs=BRANCH_CERTS[state.branch]; if (!certs) return;
  document.getElementById("cert-tbody").innerHTML = certs.map(c=>`
    <tr>
      <td style="font-weight:600">${c.name}</td>
      <td style="color:#fbbf24">${c.cost}</td>
      <td>${c.diff}</td>
      <td style="color:var(--text2)">${c.time}</td>
      <td>${"⭐".repeat(c.job)}</td>
      <td class="${c.vtype==="do"?"v-do":c.vtype==="skip"?"v-skip":"v-late"}">${c.verdict}</td>
      <td><a href="${c.url}" target="_blank" rel="noopener" style="color:var(--ac);font-size:10px">↗</a></td>
    </tr>
    <tr><td colspan="7" style="font-size:9.5px;color:var(--muted);padding:2px 14px 12px;border-bottom:1px solid var(--border)">💡 ${c.reason}</td></tr>
  `).join("");
}

// ── CAREER ──
function renderCareer() {
  const careers=BRANCH_CAREERS[state.branch]; if (!careers) return;
  document.getElementById("career-grid").innerHTML = careers.map(r=>`
    <div class="career-card">
      <div class="career-icon">${r.icon}</div>
      <div class="career-title">${r.title}</div>
      <div class="career-sal">${r.sal}</div>
      <div class="career-skills">${r.skills}</div>
      <div class="career-helps">${r.helps}</div>
      <a href="${r.link}" target="_blank" rel="noopener" class="career-link">View Jobs ↗</a>
    </div>`).join("");
}

// ── CHARTS ──
function initCharts() {
  const isDark=document.documentElement.getAttribute("data-theme")==="dark";
  const gridC=isDark?"rgba(255,255,255,.04)":"rgba(0,0,0,.07)";
  Chart.defaults.font.family="'JetBrains Mono',monospace";
  Chart.defaults.color=isDark?"#555":"#aaa";
  const plan=getPlan(); if (!plan) return;
  const colors=plan.phases.map(p=>p.color);
  if (charts.phases) charts.phases.destroy();
  if (charts.time)   charts.time.destroy();
  const pCanvas=document.getElementById("chart-phases"); if (!pCanvas) return;
  charts.phases=new Chart(pCanvas,{type:"bar",data:{labels:plan.phases.map(p=>p.name),datasets:[{label:"% Complete",data:plan.phases.map(()=>0),backgroundColor:colors.map(c=>c+"33"),borderColor:colors,borderWidth:2,borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:gridC}},y:{grid:{color:gridC},beginAtZero:true,max:100}}}});
  const tCanvas=document.getElementById("chart-time"); if (!tCanvas) return;
  charts.time=new Chart(tCanvas,{type:"doughnut",data:{labels:plan.phases.map(p=>p.name),datasets:[{data:plan.phases.map(()=>0),backgroundColor:colors.map(c=>c+"44"),borderColor:colors,borderWidth:2,hoverOffset:6}]},options:{responsive:true,maintainAspectRatio:false,cutout:"65%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:10},usePointStyle:true}}}}});
}

function updateCharts() {
  const plan=getPlan(); if (!plan||!charts.phases) return;
  const s=calcStats();
  if (s.phases) {
    charts.phases.data.datasets[0].data=s.phases.map(p=>p.phasePct); charts.phases.update("none");
    const td=s.phases.map(p=>p.phaseMins); charts.time.data.datasets[0].data=td.some(t=>t>0)?td:[1]; charts.time.update("none");
  }
}

// ── MISC ──
function renderExamCountdown() {
  const cd=getExamCountdown(), el=document.getElementById("sb-exam-display"); if (!el) return;
  if (!cd){el.textContent="No exam date set";el.style.color="var(--muted)";return;}
  const color=cd.passed?"#888":cd.days<=7?"#f87171":cd.days<=14?"#fbbf24":"#34d399";
  el.style.color=color; el.textContent=cd.passed?"Exam date passed":cd.days===0?"🔥 Exam today!":`${cd.days} days to exam`;
}
function saveExamDate() { state.examDate=document.getElementById("exam-date-input").value||null; saveState(); renderExamCountdown(); showToast("Exam date saved! 🎯","🎯","#34d399"); }
function setFilter(f,el) { currentFilter=f; document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active")); el.classList.add("active"); renderPhases(); }

function initSearch() {
  const input=document.getElementById("search-input"), res=document.getElementById("search-results"); if (!input) return;
  input.addEventListener("input",()=>{
    const q=input.value.trim().toLowerCase(); if (q.length<2){res.classList.remove("show");return;}
    const plan=getPlan(); if (!plan) return;
    const matches=[];
    plan.phases.forEach((phase,pi)=>phase.topics.forEach((topic,ti)=>{if(topic.toLowerCase().includes(q))matches.push({topic,pi,ti,phase});}));
    res.innerHTML=!matches.length?`<div class="sr-item"><span style="color:var(--muted)">No results</span></div>`:matches.slice(0,7).map(m=>`<div class="sr-item" onclick="jumpToTopic(${m.pi},${m.ti});document.getElementById('search-input').value='';document.getElementById('search-results').classList.remove('show')"><span class="sr-phase" style="color:${m.phase.color}">${m.phase.icon} ${m.phase.name}</span><span class="sr-topic">${m.topic}</span></div>`).join("");
    res.classList.add("show");
  });
  input.addEventListener("keydown",e=>{if(e.key==="Escape"){res.classList.remove("show");input.blur();}});
  document.addEventListener("click",e=>{if(!input.contains(e.target)&&!res.contains(e.target))res.classList.remove("show");});
}

function jumpToTopic(pi,ti) {
  currentFilter="all"; document.querySelectorAll(".filter-btn").forEach(b=>b.classList.toggle("active",b.textContent.trim()==="All")); renderPhases();
  const body=document.getElementById(`phase-body-${pi}`); if(body?.classList.contains("collapsed"))togglePhase(pi);
  document.getElementById("roadmap")?.scrollIntoView({behavior:"smooth"});
  setTimeout(()=>{ const card=document.getElementById(`tc-${pi}-${ti}`); card?.scrollIntoView({behavior:"smooth",block:"center"}); card?.classList.add("tc2-highlight"); setTimeout(()=>card?.classList.remove("tc2-highlight"),1800); },250);
}

function sbNav(el) { document.querySelectorAll(".sb-nav-link").forEach(l=>l.classList.remove("active")); el.classList.add("active"); document.querySelector(el.getAttribute("href"))?.scrollIntoView({behavior:"smooth"}); }
function toggleSound() { state.soundEnabled=!state.soundEnabled; saveState(); document.getElementById("btn-sound").textContent=state.soundEnabled?"🔊":"🔇"; showToast(state.soundEnabled?"Sound on 🔊":"Sound off 🔇",state.soundEnabled?"🔊":"🔇","#888"); }
function toggleTheme() { const t=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark"; state.theme=t; document.documentElement.setAttribute("data-theme",t); saveState(); if(charts.phases){initCharts();renderStatsSection();} }
function applyTheme() { document.documentElement.setAttribute("data-theme",state.theme||"dark"); }
function confirmReset() { if(confirm("Switch branch or reset? This will clear your progress. Are you sure?")){resetState();location.reload();} }

function exportData() {
  const {done,total}=calcStats();
  const blob=new Blob([JSON.stringify({version:1,exported:new Date().toISOString(),branch:state.branch,level:state.level,state},null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`cybernav_${state.branch}_${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(url);
  showToast(`Exported (${done}/${total})!`,"⬇️","#34d399");
}
function importData(e) {
  const file=e.target.files[0]; if (!file) return;
  const reader=new FileReader();
  reader.onload=evt=>{try{const p=JSON.parse(evt.target.result);if(p.state?.branch)Object.assign(state,p.state);saveState();launchTracker();showToast("Imported! 📦","⬆️","#60a5fa");}catch{showToast("Could not read file","❌","#f87171");}e.target.value="";};
  reader.readAsText(file);
}
function exportNotes() {
  const md=exportNotesMarkdown(),blob=new Blob([md],{type:"text/markdown"}),url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download=`cybernav_journal_${state.branch}_${new Date().toISOString().slice(0,10)}.md`;a.click();URL.revokeObjectURL(url);
  showToast("Journal exported 📓","📓","#34d399");
}
function openLinkedIn() { document.getElementById("li-text").value=generateLinkedInPost(); document.getElementById("linkedin-modal").classList.add("show"); }
function copyLinkedIn() { navigator.clipboard.writeText(document.getElementById("li-text").value).then(()=>showToast("Post copied! 🚀","💼","#0077b5")); }
function closeModal(id) { document.getElementById(id)?.classList.remove("show"); }
document.addEventListener("keydown",e=>{ if(e.key==="Escape") document.querySelectorAll(".modal-overlay.show").forEach(m=>m.classList.remove("show")); });

let toastTimer=null;
function showToast(msg,icon="✅",color="#34d399") {
  const t=document.getElementById("toast"); if (!t) return;
  document.getElementById("toast-msg").textContent=msg; document.getElementById("toast-icon").textContent=icon;
  t.style.borderColor=color+"44"; t.style.transform="translateY(0)"; t.style.opacity="1";
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>{t.style.transform="translateY(80px)";t.style.opacity="0";},3200);
}

function launchConfetti() {
  const canvas=document.getElementById("confetti-canvas"),ctx=canvas.getContext("2d");
  canvas.width=window.innerWidth;canvas.height=window.innerHeight;canvas.style.display="block";
  const branch=BRANCH_META[state.branch];
  const COLORS=["#60a5fa","#34d399","#fbbf24","#f87171","#a78bfa","#f472b6",branch?.color||"#fff"];
  const pieces=Array.from({length:120},()=>({x:Math.random()*canvas.width,y:-20,w:Math.random()*10+3,h:Math.random()*5+2,r:Math.random()*Math.PI*2,vx:(Math.random()-.5)*4,vy:Math.random()*4+2,vr:(Math.random()-.5)*.2,color:COLORS[~~(Math.random()*COLORS.length)],opacity:1}));
  let frame=0;
  const tick=()=>{ctx.clearRect(0,0,canvas.width,canvas.height);pieces.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;if(frame>100)p.opacity=Math.max(0,p.opacity-.012);ctx.save();ctx.globalAlpha=p.opacity;ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.color;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();});frame++;if(frame<260&&pieces.some(p=>p.opacity>0))requestAnimationFrame(tick);else{ctx.clearRect(0,0,canvas.width,canvas.height);canvas.style.display="none";}};
  requestAnimationFrame(tick);
}

function setVal(id,v){const e=document.getElementById(id);if(e)e.textContent=v;}
function escHtml(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function key(pi,ti){return `${pi}:${ti}`;}
const countUpState={};
function countUp(el,target,suffix=""){
  if(!el)return;const k=el.id||Math.random().toString();clearInterval(countUpState[k]);
  const start=parseInt(el.textContent)||0;if(start===target){el.textContent=target+suffix;return;}
  const step=target>start?1:-1,diff=Math.abs(target-start),delay=diff>30?12:30;let cur=start;
  countUpState[k]=setInterval(()=>{cur+=step;el.textContent=cur+suffix;if(cur===target)clearInterval(countUpState[k]);},delay);
}

// ══════════════════════════════════════════════
// POMODORO TIMER
// ══════════════════════════════════════════════
const POMO = {
  mode:      "work",   // work | short | long
  durations: { work: 25, short: 5, long: 15 },
  total:     25 * 60,
  remaining: 25 * 60,
  running:   false,
  interval:  null,
  sessions:  0,        // completed work sessions
  todayMins: 0,        // total focus minutes today
  activePi:  -1,
  activeTi:  -1,
};

// Circumference of r=82 circle ≈ 515.2
const POMO_CIRC = 2 * Math.PI * 82;

function togglePomodoro() {
  const panel    = document.getElementById("pomo-panel");
  const backdrop = document.getElementById("pomo-backdrop");
  const open     = panel.classList.toggle("open");
  backdrop.classList.toggle("show", open);
  if (open) syncPomoDisplay();
}

function setPomoMode(mode) {
  POMO.mode = mode;
  if (POMO.running) pomodoroReset();
  POMO.total     = POMO.durations[mode] * 60;
  POMO.remaining = POMO.total;

  document.querySelectorAll(".pomo-mode").forEach(b => b.classList.remove("active"));
  document.getElementById(`pm-${mode}`)?.classList.add("active");

  const panel = document.getElementById("pomo-panel");
  panel.classList.toggle("break-mode", mode !== "work");

  syncPomoDisplay();
}

function updatePomoSettings() {
  POMO.durations.work  = parseInt(document.getElementById("pomo-work-min").value)  || 25;
  POMO.durations.short = parseInt(document.getElementById("pomo-short-min").value) || 5;
  POMO.durations.long  = parseInt(document.getElementById("pomo-long-min").value)  || 15;
  if (!POMO.running) {
    POMO.total     = POMO.durations[POMO.mode] * 60;
    POMO.remaining = POMO.total;
    syncPomoDisplay();
  }
}

function pomodoroStartStop() {
  if (POMO.running) {
    // Pause
    clearInterval(POMO.interval);
    POMO.running = false;
    document.getElementById("pomo-start-btn").textContent = "▶ Resume";
    document.getElementById("pomo-start-btn").classList.remove("pomo-running-btn");
    document.getElementById("btn-pomodoro").classList.remove("pomo-running");
  } else {
    // Start / resume
    POMO.running = true;
    document.getElementById("pomo-start-btn").textContent = "⏸ Pause";
    document.getElementById("pomo-start-btn").classList.add("pomo-running-btn");
    document.getElementById("btn-pomodoro").classList.add("pomo-running");

    // Attach to current "up next" topic if none selected
    if (POMO.activePi === -1) {
      const next = getNextTopic();
      if (next) { POMO.activePi = next.pi; POMO.activeTi = next.ti; updatePomoTopicRow(); }
    }

    POMO.interval = setInterval(() => {
      POMO.remaining--;
      if (POMO.mode === "work") POMO.todayMins = (POMO.todayMins || 0) + (1/60);
      syncPomoDisplay();

      if (POMO.remaining <= 0) {
        pomodoroComplete();
      }
    }, 1000);
  }
}

function pomodoroReset() {
  clearInterval(POMO.interval);
  POMO.running   = false;
  POMO.total     = POMO.durations[POMO.mode] * 60;
  POMO.remaining = POMO.total;
  document.getElementById("pomo-start-btn").textContent = "▶ Start";
  document.getElementById("pomo-start-btn").classList.remove("pomo-running-btn");
  document.getElementById("btn-pomodoro").classList.remove("pomo-running");
  syncPomoDisplay();
}

function pomodoroComplete() {
  clearInterval(POMO.interval);
  POMO.running = false;
  document.getElementById("pomo-start-btn").textContent = "▶ Start";
  document.getElementById("pomo-start-btn").classList.remove("pomo-running-btn");
  document.getElementById("btn-pomodoro").classList.remove("pomo-running");

  SFX.play("rank");

  if (POMO.mode === "work") {
    // Auto-log time to active topic
    if (POMO.activePi >= 0 && POMO.activeTi >= 0) {
      const k    = key(POMO.activePi, POMO.activeTi);
      const prev = state.studyTime[k] || 0;
      const add  = POMO.durations.work;
      state.studyTime[k] = prev + add;
      saveState();
      // Update the card input live
      const input = document.querySelector(`#tc-${POMO.activePi}-${POMO.activeTi} .tc2-mins-input`);
      if (input) input.value = state.studyTime[k];
      renderStats(); renderXpBar(); renderTodayHero(); renderStatsSection();
      showToast(`+${add} min logged to topic! 🍅`, "🍅", "#f87171");
    }

    POMO.sessions++;
    updateSessionDots();
    showToast("🍅 Work session done! Take a break.", "🍅", "#f87171");

    // Auto-switch to break
    const nextMode = POMO.sessions % 4 === 0 ? "long" : "short";
    setTimeout(() => setPomoMode(nextMode), 800);
  } else {
    showToast("Break over — back to work! 💪", "⚡", "#34d399");
    setTimeout(() => setPomoMode("work"), 800);
  }
}

function syncPomoDisplay() {
  const mins = Math.floor(POMO.remaining / 60);
  const secs = POMO.remaining % 60;
  const display = `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
  const el = document.getElementById("pomo-display"); if (el) el.textContent = display;

  // Update browser tab title when running
  if (POMO.running) document.title = `${display} 🍅 CyberNav`;
  else document.title = "⚡ CyberNav — Cybersecurity Career Tracker";

  // Ring progress
  const pct    = POMO.remaining / POMO.total;
  const offset = POMO_CIRC * (1 - pct);
  const ring   = document.getElementById("pomo-ring-prog");
  if (ring) ring.style.strokeDashoffset = offset;

  // State label
  const lbl = document.getElementById("pomo-state-lbl");
  if (lbl) lbl.textContent = POMO.mode === "work" ? "FOCUS" : POMO.mode === "short" ? "SHORT BREAK" : "LONG BREAK";

  // Total today
  const ttl = document.getElementById("pomo-total-today");
  if (ttl) ttl.textContent = Math.floor(POMO.todayMins) + " min";
}

function updateSessionDots() {
  for (let i = 0; i < 4; i++) {
    const dot = document.getElementById(`pd-${i}`);
    if (dot) dot.classList.toggle("filled", i < (POMO.sessions % 4) || (POMO.sessions % 4 === 0 && POMO.sessions > 0 && i < 4));
  }
}

function updatePomoTopicRow() {
  const plan = getPlan();
  const nameEl = document.getElementById("pomo-topic-name"); if (!nameEl) return;
  if (POMO.activePi >= 0 && POMO.activeTi >= 0) {
    const topic = plan?.phases[POMO.activePi]?.topics[POMO.activeTi];
    nameEl.textContent = topic || "—";
  } else {
    nameEl.textContent = "— select a topic —";
  }
}

// Called from topic card to attach pomo to this topic
function setPomoTopic(pi, ti) {
  POMO.activePi = pi; POMO.activeTi = ti;
  updatePomoTopicRow();
  showToast("Timer linked to this topic 🍅", "🍅", "#f87171");
  // Open pomo panel
  const panel = document.getElementById("pomo-panel");
  if (!panel.classList.contains("open")) togglePomodoro();
}
// ══════════════════════════════════════════════
// ML ENGINE INTEGRATIONS
// ══════════════════════════════════════════════

// ── Progress re-recommendation banner ──
function checkProgressRecommendation() {
  if (state.progressRecoShown) return;
  const reco = ML_ENGINE.getProgressRecommendation();
  if (!reco) return;

  const banner = document.getElementById("preco-banner");
  if (!banner) return;

  document.getElementById("preco-icon").textContent   = reco.icon;
  document.getElementById("preco-title").textContent  = `ML suggests: ${reco.name} (${reco.confidence}% match)`;
  document.getElementById("preco-reason").textContent = reco.reason;
  document.getElementById("preco-explore-btn").onclick = () => {
    showToast(`Explore ${reco.name} at cybernav.vercel.app`, reco.icon, reco.color);
    dismissProgressReco();
  };
  banner.style.display = "block";
  state.progressRecoShown = true;
  saveState();
}

function dismissProgressReco() {
  document.getElementById("preco-banner").style.display = "none";
}

// ── Cert recommender (sidebar) ──
function updateCertRecommender() {
  const reco    = ML_ENGINE.getCertRecommendation();
  const el      = document.getElementById("sb-cert-reco");
  const content = document.getElementById("sb-cert-reco-content");
  if (!reco?.length || !el || !content) return;

  el.style.display = "block";
  content.innerHTML = reco.map(({ cert, readiness, reasons }) => {
    const color = readiness >= 70 ? "#34d399" : readiness >= 40 ? "#fbbf24" : "#60a5fa";
    return `
      <div class="cert-reco-item">
        <div class="cert-reco-name">${cert.name}</div>
        <div class="cert-reco-bar-wrap">
          <div class="cert-reco-bar">
            <div style="width:${readiness}%;height:100%;background:${color};border-radius:99px;transition:width .8s ease"></div>
          </div>
          <span class="cert-reco-pct" style="color:${color}">${readiness}%</span>
        </div>
        <div class="cert-reco-reasons">${reasons.slice(0,2).join(" · ")}</div>
      </div>`;
  }).join("");
}

// ── Phase quiz trigger button ──
function triggerPhaseQuiz() {
  const plan = getPlan(); if (!plan) return;
  let targetPhase = -1;
  for (let pi = plan.phases.length - 1; pi >= 0; pi--) {
    const done = plan.phases[pi].topics.filter((_,ti) =>
      state.progress?.[`${pi}:${ti}`] === "done"
    ).length;
    if (done >= 3) { targetPhase = pi; break; }
  }
  if (targetPhase < 0) {
    showToast("Complete at least 3 topics in a phase first!", "🧠", "#fbbf24");
    return;
  }
  WEEKLY_QUIZ.start(targetPhase);
}

// ── Override checkPhaseComplete to offer quiz on phase finish ──
const _origCheckPhaseComplete = checkPhaseComplete;
function checkPhaseComplete(pi) {
  const plan = getPlan(); if (!plan) return;
  const phase = plan.phases[pi];
  const allDone = phase.topics.every((_,ti) =>
    state.progress?.[key(pi,ti)] === "done" || state.progress?.[key(pi,ti)] === "skip"
  );
  if (!allDone || (state.lastMilestone||0) >= pi+1) return;

  state.lastMilestone = pi + 1;
  const xpReward = 200 + pi * 100;
  state.xp += xpReward;
  saveState();

  document.getElementById("boss-emoji").textContent = phase.icon;
  document.getElementById("boss-title").textContent = `${phase.name} Complete!`;
  document.getElementById("boss-msg").innerHTML = `
    You finished <strong>${phase.label}</strong>.<br/>
    <button class="btn-ac" style="margin-top:12px;font-size:12px"
      onclick="closeModal('boss-modal');setTimeout(()=>WEEKLY_QUIZ.start(${pi}),300)">
      🧠 Take Phase Quiz (+${5*25} bonus XP)
    </button>`;
  document.getElementById("boss-xp").textContent = `+${xpReward} XP`;
  document.getElementById("boss-modal").classList.add("show");
  launchConfetti(); SFX.play("rank");
}

// ── Override renderAll to run ML checks ──
const _origRenderAll = renderAll;
function renderAll() {
  renderTodayHero();
  renderStats();
  renderXpBar();
  renderPhases();
  renderResources();
  renderCerts();
  renderCareer();
  renderStatsSection();
  renderExamCountdown();

  // ML features
  updateCertRecommender();
  checkProgressRecommendation();

  // Show phase quiz button when enough topics are done
  const plan = getPlan();
  const quizBtn = document.getElementById("btn-phase-quiz");
  if (quizBtn && plan) {
    const hasEnough = plan.phases.some((phase, pi) =>
      phase.topics.filter((_,ti) => state.progress?.[`${pi}:${ti}`] === "done").length >= 3
    );
    quizBtn.style.display = hasEnough ? "inline-flex" : "none";
  }
}

// ── Save quiz answers to state (used by progress re-reco) ──
const _origShowMLResult = showMLResult;
function showMLResult(result, answers) {
  state.quizAnswers = answers;
  saveState();
  _origShowMLResult(result, answers);
}