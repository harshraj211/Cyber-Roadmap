// ═══════════════════════════════════════════════
// CHAT.JS — AI Study Assistant (Frontend)
// Calls /api/chat — API key stays on the server
// ═══════════════════════════════════════════════

const CHAT = {

  history: [],      // conversation history sent to API
  open:    false,
  activeTopic: null,

  // ── Open/close the chat panel ──
  toggle() {
    this.open = !this.open;
    document.getElementById("chat-panel")?.classList.toggle("open", this.open);
    document.getElementById("chat-backdrop")?.classList.toggle("show", this.open);
    if (this.open) {
      document.getElementById("chat-input")?.focus();
      // If no messages yet, show welcome
      if (!this.history.length) this.showWelcome();
    }
  },

  // ── Set the topic context (called when user opens chat from a topic card) ──
  setTopic(topic, branchName) {
    this.activeTopic = topic;
    if (!this.open) this.toggle();
    // Show context chip
    const chip = document.getElementById("chat-topic-chip");
    if (chip) {
      chip.textContent = `Studying: ${topic}`;
      chip.style.display = "inline-block";
    }
    // Pre-fill a suggested question
    const input = document.getElementById("chat-input");
    if (input && !input.value) {
      input.value = `Explain "${topic}" in simple terms`;
      input.focus();
    }
  },

  // ── Welcome message ──
  showWelcome() {
    const branch = BRANCH_META[state.branch];
    const next   = getNextTopic();
    const plan   = getPlan();
    const topic  = next ? plan?.phases[next.pi]?.topics[next.ti] : null;

    this.addBubble("assistant", `Hi! I'm your ${branch?.name || "cybersecurity"} study assistant. 👋

Ask me anything about your roadmap topics — I'll explain concepts, give examples, or help you understand something that's confusing.

${topic ? `I can see you're currently working on **"${topic}"** — want me to explain it?` : "What would you like to learn about today?"}`);
  },

  // ── Send a message ──
  async send() {
    const input = document.getElementById("chat-input");
    const text  = input?.value?.trim();
    if (!text) return;

    input.value = "";
    input.disabled = true;
    document.getElementById("chat-send-btn").disabled = true;

    // Add user bubble
    this.addBubble("user", text);
    this.history.push({ role: "user", content: text });

    // Show typing indicator
    const typingId = this.addTyping();

    try {
      const branch = BRANCH_META[state.branch];
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: this.history,
          topic:    this.activeTopic || "general cybersecurity",
          branch:   branch?.name || "cybersecurity",
        }),
      });

      this.removeTyping(typingId);

      if (!response.ok) {
        const err = await response.json();
        this.addBubble("assistant", `Sorry, something went wrong: ${err.error || "Unknown error"}. Try again.`);
        return;
      }

      const data = await response.json();
      const reply = data.reply;

      // Add assistant reply
      this.addBubble("assistant", reply);
      this.history.push({ role: "assistant", content: reply });

      // Keep history to last 10 messages (5 turns) to avoid token limits
      if (this.history.length > 10) {
        this.history = this.history.slice(-10);
      }

    } catch (err) {
      this.removeTyping(typingId);
      this.addBubble("assistant", "Network error. Make sure you're connected and try again.");
    } finally {
      input.disabled = false;
      document.getElementById("chat-send-btn").disabled = false;
      input.focus();
    }
  },

  // ── Add a message bubble to the chat ──
  addBubble(role, text) {
    const container = document.getElementById("chat-messages");
    if (!container) return;

    const bubble = document.createElement("div");
    bubble.className = `chat-bubble chat-bubble-${role}`;

    // Convert basic markdown: **bold**, `code`, newlines
    const html = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br/>");

    bubble.innerHTML = `
      <div class="chat-bubble-inner">${html}</div>
      <div class="chat-bubble-time">${new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</div>
    `;

    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
    return bubble;
  },

  // ── Typing indicator ──
  addTyping() {
    const container = document.getElementById("chat-messages");
    if (!container) return null;
    const id = "typing-" + Date.now();
    const el = document.createElement("div");
    el.id = id;
    el.className = "chat-bubble chat-bubble-assistant chat-typing";
    el.innerHTML = `<div class="chat-bubble-inner"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
    return id;
  },

  removeTyping(id) {
    if (id) document.getElementById(id)?.remove();
  },

  // ── Clear history ──
  clear() {
    this.history = [];
    this.activeTopic = null;
    const container = document.getElementById("chat-messages");
    if (container) container.innerHTML = "";
    const chip = document.getElementById("chat-topic-chip");
    if (chip) chip.style.display = "none";
    this.showWelcome();
  },
};

// ── Keyboard shortcut: Enter to send ──
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey && document.activeElement?.id === "chat-input") {
    e.preventDefault();
    CHAT.send();
  }
});