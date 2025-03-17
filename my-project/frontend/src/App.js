// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LawDetail from "./LawDetail";
import CategoryPage from "./CategoryPage";
import ApplicationDetail from "./ApplicationDetail";
import TagPage from "./TagPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/laws/:id" element={<LawDetail />} />
        <Route path="/applications/:id" element={<ApplicationDetail />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/tag/:tag" element={<TagPage />} />
      </Routes>
    </Router>
  );
}

export default App;
