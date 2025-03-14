// frontend/src/HomePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ laws: [], applications: [] });
  const [recentHistory, setRecentHistory] = useState([]);

  // 获取最近搜索历史
  useEffect(() => {
    fetch("http://localhost:5000/history")
      .then((res) => res.json())
      .then((data) => setRecentHistory(data))
      .catch(console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    fetch(`http://localhost:5000/search?q=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => setSearchResults(data))
      .catch(console.error);
  };

  // 点击分类按钮跳转到分类页面
  const handleCategoryClick = (cat) => {
    navigate(`/category/${encodeURIComponent(cat)}`);
  };

  // 点击法律条目时跳转到详情页
  const handleLawClick = (id) => {
    navigate(`/laws/${id}`);
  };

  const handleApplicationClick = (id) => {
  navigate(`/applications/${id}`);
};

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 顶部导航栏略，同前面的设计 */}
      <nav className="bg-[#005B8E] text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold">拉美国家农业法律数据库</span>
          </div>
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 拉美国家农业法律数据库"
              className="w-72 px-3 py-2 rounded-l-md text-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF7300] hover:bg-orange-600 rounded-r-md font-semibold"
            >
              Search
            </button>
          </form>
          <div className="flex items-center space-x-4 text-sm">
            <span className="hover:text-gray-200">History</span>
            <span className="hover:text-gray-200">Folders</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row md:space-x-8">
        <div className="w-full md:w-2/3 mb-6 md:mb-0">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-700 mb-4"
          >
            拉美国家农业法律数据库 首页
          </motion.h2>

          <h4 className="text-xl font-bold text-gray-700 mb-4">Sectors & Resources</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["Business", "Public Law", "Criminal", "IP & IT", "Environment", "Capital Markets", "Restructuring & Insolvency"].map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat)}
                className="text-blue-600 hover:underline text-left"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 搜索结果展示 */}
          <div className="mt-6">
            {(searchResults?.laws?.length > 0 || searchResults?.applications?.length > 0) && (
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Search Results for: {searchQuery}
              </h3>
            )}
            {searchResults?.laws?.map((law) => (
              <div
                key={law.id}
                className="bg-white p-4 rounded-xl shadow-md mb-4 cursor-pointer"
                onClick={() => handleLawClick(law.id)}
              >
                <h2 className="text-2xl font-bold text-gray-800">{law.title}</h2>
                <p className="text-gray-600 mt-2">{law.content.substring(0, 100)}...</p>
                <p className="text-sm text-gray-400 mt-1">Category: {law.category}</p>
              </div>
            ))}
            {searchResults?.applications?.map((appItem) => (
              <div
                key={appItem.id}
                className="bg-white p-4 rounded-xl shadow-md mb-4 cursor-pointer"
                onClick={() => handleApplicationClick(appItem.id)}
              >
                <h2 className="text-2xl font-bold text-gray-800">{appItem.title}</h2>
                <p className="text-gray-600 mt-2">{appItem.description}</p>
                <p className="text-sm text-gray-400 mt-1">Category: {appItem.category}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <h5 className="text-lg font-semibold text-gray-700 mb-3">Recent History</h5>
            {recentHistory.length === 0 ? (
              <p className="text-gray-500">No recent searches.</p>
            ) : (
              recentHistory.map((item, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-semibold text-gray-800">{item.query}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} 拉美国家农业法律数据库. All rights reserved.
        </div>
      </footer>
    </div>
  );
}