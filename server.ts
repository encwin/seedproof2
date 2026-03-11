import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("seedproof.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  );

  CREATE TABLE IF NOT EXISTS ventures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    name TEXT,
    description TEXT,
    status TEXT DEFAULT 'Draft',
    FOREIGN KEY(userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS canvas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ventureId INTEGER,
    problem TEXT,
    solution TEXT,
    targetUsers TEXT,
    uvp TEXT,
    marketSize TEXT,
    traction TEXT,
    revenueModel TEXT,
    costStructure TEXT,
    competition TEXT,
    foundingTeam TEXT,
    advisors TEXT,
    ask TEXT,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(ventureId) REFERENCES ventures(id)
  );

  CREATE TABLE IF NOT EXISTS milestones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ventureId INTEGER,
    title TEXT,
    description TEXT,
    date TEXT,
    evidenceLink TEXT,
    status TEXT DEFAULT 'Pending',
    FOREIGN KEY(ventureId) REFERENCES ventures(id)
  );

  CREATE TABLE IF NOT EXISTS dataroom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ventureId INTEGER,
    fileName TEXT,
    fileType TEXT,
    fileUrl TEXT,
    uploadedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(ventureId) REFERENCES ventures(id)
  );
`);

try { db.exec("ALTER TABLE canvas ADD COLUMN costStructure TEXT"); } catch(e) {}
try { db.exec("ALTER TABLE canvas ADD COLUMN foundingTeam TEXT"); } catch(e) {}
try { db.exec("ALTER TABLE canvas ADD COLUMN advisors TEXT"); } catch(e) {}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth Mock API
  app.post("/api/auth/signup", (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const info = db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)").run(name, email, password, role);
      res.json({ id: info.lastInsertRowid, name, email, role });
    } catch (e) {
      res.status(400).json({ error: "Email already exists" });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Venture API
  app.get("/api/ventures/:userId", (req, res) => {
    const ventures = db.prepare("SELECT * FROM ventures WHERE userId = ?").all(req.params.userId);
    res.json(ventures);
  });

  app.post("/api/ventures", (req, res) => {
    const { userId, name, description } = req.body;
    const info = db.prepare("INSERT INTO ventures (userId, name, description) VALUES (?, ?, ?)").run(userId, name, description);
    const ventureId = info.lastInsertRowid;
    // Create empty canvas for the venture
    db.prepare("INSERT INTO canvas (ventureId) VALUES (?)").run(ventureId);
    res.json({ id: ventureId, name, description });
  });

  app.delete("/api/ventures/:id", (req, res) => {
    const ventureId = req.params.id;
    // Delete related data first
    db.prepare("DELETE FROM canvas WHERE ventureId = ?").run(ventureId);
    db.prepare("DELETE FROM milestones WHERE ventureId = ?").run(ventureId);
    db.prepare("DELETE FROM dataroom WHERE ventureId = ?").run(ventureId);
    // Delete the venture
    db.prepare("DELETE FROM ventures WHERE id = ?").run(ventureId);
    res.json({ success: true });
  });

  // Canvas API
  app.get("/api/canvas/:ventureId", (req, res) => {
    const canvas = db.prepare("SELECT * FROM canvas WHERE ventureId = ?").get(req.params.ventureId);
    res.json(canvas || {});
  });

  app.put("/api/canvas/:ventureId", (req, res) => {
    const { problem, solution, targetUsers, uvp, marketSize, traction, revenueModel, costStructure, competition, foundingTeam, advisors, ask } = req.body;
    db.prepare(`
      UPDATE canvas SET 
        problem = ?, solution = ?, targetUsers = ?, uvp = ?, marketSize = ?, 
        traction = ?, revenueModel = ?, costStructure = ?, competition = ?, foundingTeam = ?, advisors = ?, ask = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE ventureId = ?
    `).run(problem, solution, targetUsers, uvp, marketSize, traction, revenueModel, costStructure, competition, foundingTeam, advisors, ask, req.params.ventureId);
    res.json({ success: true });
  });

  // Milestones API
  app.get("/api/milestones/:ventureId", (req, res) => {
    const milestones = db.prepare("SELECT * FROM milestones WHERE ventureId = ?").all(req.params.ventureId);
    res.json(milestones);
  });

  app.post("/api/milestones", (req, res) => {
    const { ventureId, title, description, date, evidenceLink } = req.body;
    db.prepare("INSERT INTO milestones (ventureId, title, description, date, evidenceLink) VALUES (?, ?, ?, ?, ?)").run(ventureId, title, description, date, evidenceLink);
    res.json({ success: true });
  });

  app.put("/api/milestones/:id", (req, res) => {
    const { title, description, date, evidenceLink } = req.body;
    db.prepare("UPDATE milestones SET title = ?, description = ?, date = ?, evidenceLink = ? WHERE id = ?").run(title, description, date, evidenceLink, req.params.id);
    res.json({ success: true });
  });

  // Data Room API
  app.get("/api/dataroom/:ventureId", (req, res) => {
    const files = db.prepare("SELECT * FROM dataroom WHERE ventureId = ?").all(req.params.ventureId);
    res.json(files);
  });

  app.post("/api/dataroom", (req, res) => {
    const { ventureId, fileName, fileType, fileUrl } = req.body;
    db.prepare("INSERT INTO dataroom (ventureId, fileName, fileType, fileUrl) VALUES (?, ?, ?, ?)").run(ventureId, fileName, fileType, fileUrl);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
