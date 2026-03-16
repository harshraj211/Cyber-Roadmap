// api/chat.js — Vercel serverless function (CommonJS)
// API key stays here on the server, never reaches the browser

module.exports = async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) { res.status(500).json({ error: "GROQ_API_KEY not set in environment variables" }); return; }

  const { messages, topic, branch } = req.body || {};
  if (!messages || !Array.isArray(messages)) { res.status(400).json({ error: "messages array required" }); return; }

  const systemPrompt = `You are a cybersecurity study assistant helping someone learning ${branch || "cybersecurity"}.
They are studying: "${topic || "general cybersecurity"}".
Explain concepts clearly, give real examples, keep responses to 2-3 paragraphs max.`;

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error("Groq error:", JSON.stringify(data));
      res.status(groqRes.status).json({ error: data.error?.message || "Groq API error" });
      return;
    }

    const reply = data.choices?.[0]?.message?.content || "No response";
    res.status(200).json({ reply });

  } catch (err) {
    console.error("Handler error:", err.message);
    res.status(500).json({ error: err.message });
  }
};