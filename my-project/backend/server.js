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

app.get("/search", (req, res) => {
  const query = req.query.q || "";
  const filterType = req.query.filterType || "all";
  const country = req.query.country || "all";
  const tag = req.query.tag || "all";
  recordSearch(query);
  const likeQuery = `%${query}%`;
  const countryFilter = country.toLowerCase() !== "all" ? country : null;
  const tagFilter = tag.toLowerCase() !== "all" ? tag : null;

  if (filterType === "law") {
    let sql = `
      SELECT DISTINCT l.* FROM laws l
      LEFT JOIN law_tags lt ON l.id = lt.law_id
      LEFT JOIN tags t ON lt.tag_id = t.id
      WHERE (l.title LIKE ? OR l.content LIKE ?)
    `;
    let params = [likeQuery, likeQuery];
    if (countryFilter) {
      sql += " AND l.country = ?";
      params.push(countryFilter);
    }
    if (tagFilter) {
      sql += " AND t.name = ?";
      params.push(tagFilter);
    }
    db.all(sql, params, (err, lawRows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ laws: lawRows, applications: [] });
    });
  } else if (filterType === "case" || filterType === "journal" || filterType === "document") {
    let sql = `
      SELECT DISTINCT a.* FROM law_applications a
      LEFT JOIN application_tags at ON a.id = at.application_id
      LEFT JOIN tags t ON at.tag_id = t.id
      WHERE (a.title LIKE ? OR a.full_content LIKE ?)
      AND a.sub_type = ?
    `;
    let params = [likeQuery, likeQuery, filterType];
    if (countryFilter) {
      sql += " AND a.country = ?";
      params.push(countryFilter);
    }
    if (tagFilter) {
      sql += " AND t.name = ?";
      params.push(tagFilter);
    }
    db.all(sql, params, (err, appRows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ laws: [], applications: appRows });
    });
  } else {
    // filterType === "all"
    let lawSql = `
      SELECT DISTINCT l.* FROM laws l
      LEFT JOIN law_tags lt ON l.id = lt.law_id
      LEFT JOIN tags t ON lt.tag_id = t.id
      WHERE (l.title LIKE ? OR l.content LIKE ?)
    `;
    let lawParams = [likeQuery, likeQuery];
    if (countryFilter) {
      lawSql += " AND l.country = ?";
      lawParams.push(countryFilter);
    }
    if (tagFilter) {
      lawSql += " AND t.name = ?";
      lawParams.push(tagFilter);
    }
    let appSql = `
      SELECT DISTINCT a.* FROM law_applications a
      LEFT JOIN application_tags at ON a.id = at.application_id
      LEFT JOIN tags t ON at.tag_id = t.id
      WHERE (a.title LIKE ? OR a.full_content LIKE ?)
    `;
    let appParams = [likeQuery, likeQuery];
    if (countryFilter) {
      appSql += " AND a.country = ?";
      appParams.push(countryFilter);
    }
    if (tagFilter) {
      appSql += " AND t.name = ?";
      appParams.push(tagFilter);
    }
    db.all(lawSql, lawParams, (err, lawRows) => {
      if (err) return res.status(500).json({ error: err.message });
      db.all(appSql, appParams, (err, appRows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ laws: lawRows, applications: appRows });
      });
    });
  }
});
// 分类搜索接口：根据分类名称查询（支持国家过滤）
// 这里使用子查询方式获取每条数据所有关联的分类（用 GROUP_CONCAT 拼接）
app.get("/category", (req, res) => {
  const cat = req.query.name || "";
  const country = req.query.country || "all";
  const countryFilter = (country.toLowerCase() !== "all") ? country : null;

  // 查询法律条目：先找出属于该分类的法律，然后用子查询返回所有关联分类
  let lawSql = `
    SELECT l.*, (
      SELECT GROUP_CONCAT(c.name, ',')
      FROM categories c
      JOIN law_categories lc ON c.id = lc.category_id
      WHERE lc.law_id = l.id
    ) AS categories
    FROM laws l
    WHERE l.id IN (
      SELECT law_id
      FROM law_categories
      WHERE category_id = (SELECT id FROM categories WHERE name = ?)
    )
  `;
  let lawParams = [cat];
  if (countryFilter) {
    lawSql += " AND l.country = ?";
    lawParams.push(countryFilter);
  }

  // 查询应用案例：同理
  let appSql = `
    SELECT a.*, (
      SELECT GROUP_CONCAT(c.name, ',')
      FROM categories c
      JOIN application_categories ac ON c.id = ac.category_id
      WHERE ac.application_id = a.id
    ) AS categories
    FROM law_applications a
    WHERE a.id IN (
      SELECT application_id
      FROM application_categories
      WHERE category_id = (SELECT id FROM categories WHERE name = ?)
    )
  `;
  let appParams = [cat];
  if (countryFilter) {
    appSql += " AND a.country = ?";
    appParams.push(countryFilter);
  }

  db.all(lawSql, lawParams, (err, lawRows) => {
    if (err) return res.status(500).json({ error: err.message });
    db.all(appSql, appParams, (err, appRows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ laws: lawRows || [], applications: appRows || [] });
    });
  });
});

// 获取某个法律条目的详情，并返回该法律的所有关联分类
app.get("/laws/:id", (req, res) => {
  const lawId = req.params.id;
  const lawSql = `
    SELECT l.*, (
      SELECT GROUP_CONCAT(c.name, ',')
      FROM categories c
      JOIN law_categories lc ON c.id = lc.category_id
      WHERE lc.law_id = l.id
    ) AS categories
    FROM laws l
    WHERE l.id = ?
  `;
  db.get(lawSql, [lawId], (err, lawRow) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!lawRow) return res.status(404).json({ error: "Law not found" });
    const relSql = `
      SELECT a.*, (
        SELECT GROUP_CONCAT(c.name, ',')
        FROM categories c
        JOIN application_categories ac ON c.id = ac.category_id
        WHERE ac.application_id = a.id
      ) AS categories
      FROM law_applications a
      JOIN law_application_relation lar ON a.id = lar.application_id
      WHERE lar.law_id = ?
    `;
    db.all(relSql, [lawId], (err, appRows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ law: lawRow, applications: appRows || [] });
    });
  });
});

// 获取某个应用案例的完整详情，并返回该案例的所有关联分类
app.get("/applications/:id", (req, res) => {
  const appId = req.params.id;
  const appSql = `
    SELECT a.*, (
      SELECT GROUP_CONCAT(c.name, ',')
      FROM categories c
      JOIN application_categories ac ON c.id = ac.category_id
      WHERE ac.application_id = a.id
    ) AS categories
    FROM law_applications a
    WHERE a.id = ?
  `;
  db.get(appSql, [appId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Application not found" });
    res.json(row);
  });
});


// 获取最近搜索历史（最新5条）
app.get("/history", (req, res) => {
  db.all("SELECT query, created_at FROM search_history ORDER BY created_at DESC LIMIT 5", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
