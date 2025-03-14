// backend/server.js
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 辅助函数：记录搜索历史
const recordSearch = (query) => {
  if (query && query.trim()) {
    db.run("INSERT INTO search_history (query) VALUES (?)", [query.trim()], (err) => {
      if (err) console.error("Error recording search:", err.message);
    });
  }
};

// 搜索接口：返回法律条目和案例（匹配 title 或 content）
app.get("/search", (req, res) => {
  const query = req.query.q || "";
  recordSearch(query);
  const likeQuery = `%${query}%`;
  const lawSql = "SELECT * FROM laws WHERE title LIKE ? OR content LIKE ?";
  const appSql = "SELECT * FROM law_applications WHERE title LIKE ? OR full_content LIKE ?";

  db.all(lawSql, [likeQuery, likeQuery], (err, lawRows) => {
    if (err) return res.status(500).json({ error: err.message });
    db.all(appSql, [likeQuery, likeQuery], (err, appRows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ laws: lawRows, applications: appRows });
    });
  });
});

// 分类搜索接口：根据类别查询法律条目和案例
app.get("/category", (req, res) => {
  const cat = req.query.name || "";
  const lawSql = "SELECT * FROM laws WHERE category = ?";
  const appSql = "SELECT * FROM law_applications WHERE category = ?";
  db.all(lawSql, [cat], (err, lawRows) => {
    if (err) return res.status(500).json({ error: err.message });
    db.all(appSql, [cat], (err, appRows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ laws: lawRows, applications: appRows });
    });
  });
});

// 获取某个法律条目的详情以及关联的案例
app.get("/laws/:id", (req, res) => {
  const lawId = req.params.id;
  db.get("SELECT * FROM laws WHERE id = ?", [lawId], (err, lawRow) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!lawRow) return res.status(404).json({ error: "Law not found" });
    const relSql = `
      SELECT la.*
      FROM law_applications la
      JOIN law_application_relation lar ON la.id = lar.application_id
      WHERE lar.law_id = ?
    `;
    db.all(relSql, [lawId], (err, appRows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ law: lawRow, applications: appRows });
    });
  });
});

// 获取某个案例的完整详情
app.get("/applications/:id", (req, res) => {
  const appId = req.params.id;
  db.get("SELECT * FROM law_applications WHERE id = ?", [appId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Application not found" });
    res.json(row);
  });
});

// 获取最近的搜索历史（最新5条）
app.get("/history", (req, res) => {
  db.all("SELECT query, created_at FROM search_history ORDER BY created_at DESC LIMIT 5", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
