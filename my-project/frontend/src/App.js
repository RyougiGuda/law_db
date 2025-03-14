// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LawDetail from "./LawDetail";
import CategoryPage from "./CategoryPage";
import ApplicationDetail from "./ApplicationDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/laws/:id" element={<LawDetail />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/applications/:id" element={<ApplicationDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
