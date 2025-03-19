// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LawDetail from "./LawDetail";
import CategoryPage from "./CategoryPage";
import ApplicationDetail from "./ApplicationDetail";
import CountryPage from "./CountryPage"; // 新增导入 CountryPage
function App() {
  const basename = process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : "/";
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/laws/:id" element={<LawDetail />} />
        <Route path="/applications/:id" element={<ApplicationDetail />} />
        <Route path="/category/:name" element={<CategoryPage />} />
         <Route path="/country/:name" element={<CountryPage />} /> {/* 新增国家路由 */}
      </Routes>
    </Router>
  );
}

export default App;
