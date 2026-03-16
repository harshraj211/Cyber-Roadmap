// test-server.js
// Run with: node test-server.js
// Tests your Groq API key directly without needing Vercel

const http = require("http");
const fs   = require("fs");
const path = require("path");

// Load .env manually (no dotenv package needed)
try {
  const env = fs.readFileSync(".env", "utf8");
  env.split("\n").forEach(line => {
    const [key, ...val] = line.split("=");
    if (key && val.length) process.env[key.trim()] = val.join("=").trim();
  });
} catch(e) {}

const PORT = 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

console.log("GROQ_API_KEY loaded:", GROQ_API_KEY ? "YES ✓ (starts with " + GROQ_API_KEY.slice(0,8) + "...)" : "NO ✗ — check your .env file");

const server = http.createServer(async (req, res) => {

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.writeHead(200); res.end(); return; }

  // API route
  if (req.method === "POST" && req.url === "/api/chat") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const { messages, topic, branch } = JSON.parse(body);

        const systemPrompt = `You are a cybersecurity study assistant helping someone learning ${branch || "cybersecurity"}.
They are studying: "${topic || "general cybersecurity"}".
Explain concepts clearly, give real examples, keep responses to 2-3 paragraphs.`;

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
          console.error("Groq error:", data);
          res.writeHead(500, {"Content-Type": "application/json"});
          res.end(JSON.stringify({ error: data.error?.message || "Groq API error" }));
          return;
        }

        const reply = data.choices?.[0]?.message?.content || "No response";
        console.log("✓ Groq replied:", reply.slice(0, 80) + "...");

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({ reply }));

      } catch(err) {
        console.error("Server error:", err);
        res.writeHead(500, {"Content-Type": "application/json"});
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Serve static files
  let filePath = req.url === "/" ? "/index.html" : req.url;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  const mime = {
    ".html": "text/html", ".css": "text/css", ".js": "application/javascript",
    ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml"
  }[ext] || "text/plain";

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end("Not found"); return; }
    res.writeHead(200, {"Content-Type": mime});
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n✓ Server running at http://localhost:${PORT}`);
  console.log(`  Open http://localhost:${PORT} in your browser`);
  console.log(`  Press Ctrl+C to stop\n`);
});