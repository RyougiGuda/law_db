// frontend/src/HomePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "./config";

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [advancedFilterType, setAdvancedFilterType] = useState("all");
  const [advancedCountry, setAdvancedCountry] = useState("all");
  const [searchResults, setSearchResults] = useState({ laws: [], applications: [] });
  const [recentHistory, setRecentHistory] = useState([]);

  const allCountries = ["巴西", "阿根廷", "墨西哥", "智利", "哥伦比亚", "乌拉圭",  "巴哈马"];
  const allCategories = ["公法／政务／行政", "民法及相关", "刑法及相关", "宪法", "税法", "金融法", "商法","交通法"];
  useEffect(() => {
    fetch(`${API_URL}/history`)
      .then((res) => res.json())
      .then((data) => setRecentHistory(data))
      .catch(console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const url = `${API_URL}/search?q=${encodeURIComponent(searchQuery)}&filterType=${encodeURIComponent(advancedFilterType)}&country=${encodeURIComponent(advancedCountry)}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults({
          laws: Array.isArray(data.laws) ? data.laws : [],
          applications: Array.isArray(data.applications) ? data.applications : [],
        });
        fetch(`${API_URL}/history`)
          .then((res) => res.json())
          .then((historyData) => setRecentHistory(historyData))
          .catch(console.error);
      })
      .catch(console.error);
  };

  const handleCountryClick = (country) => navigate(`/country/${encodeURIComponent(country)}`);
  const handleCategoryClick = (cat) => navigate(`/category/${encodeURIComponent(cat)}`);
  const handleLawClick = (id) => navigate(`/laws/${id}`);
  const handleApplicationClick = (id) => navigate(`/applications/${id}`);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      {/* Top Navigation */}
      <nav className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 text-white shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <span className="text-2xl font-extrabold tracking-tight">拉美国家法律数据库</span>
          </motion.div>
          <form onSubmit={handleSearch} className="flex items-center space-x-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索法律条文..."
              className="w-80 px-4 py-2 rounded-full bg-white/90 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
            />
            <select
              value={advancedFilterType}
              onChange={(e) => setAdvancedFilterType(e.target.value)}
              className="px-4 py-2 rounded-full bg-white/90 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="all">全部</option>
              <option value="law">法律</option>
              <option value="case">案例</option>
              <option value="journal">期刊</option>
              <option value="document">文书</option>
            </select>
            <select
              value={advancedCountry}
              onChange={(e) => setAdvancedCountry(e.target.value)}
              className="px-4 py-2 rounded-full bg-white/90 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="all">全部国家</option>
              {allCountries.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full font-semibold text-white shadow-lg transition-all duration-300"
            >
              搜索
            </button>
          </form>
          <div className="flex items-center space-x-6 text-sm">
            <span className="cursor-pointer hover:text-indigo-200 transition-colors">历史记录</span>
            <span className="cursor-pointer hover:text-indigo-200 transition-colors">文件夹</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row md:space-x-10">
        {/* Left Section */}
        <div className="w-full md:w-2/3">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight"
          >
            拉美国家法律数据库
          </motion.h2>

          {/* Countries Section */}
          <h4 className="text-xl font-semibold text-gray-700 mb-4">所有国家</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {allCountries.map((country, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCountryClick(country)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md px-4 py-3 font-medium transition-all duration-200"
              >
                {country}
              </motion.button>
            ))}
          </div>

          {/* Categories Section */}
          <div className="mt-10">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">所有分类</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {allCategories.map((cat, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick(cat)}
                  className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-md px-4 py-3 font-medium transition-all duration-200"
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Search Results */}
          {(searchResults.laws?.length > 0 || searchResults.applications?.length > 0) && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">搜索结果：{searchQuery}</h3>
              {(searchResults.laws || []).map((law) => (
                <motion.div
                  key={law.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => handleLawClick(law.id)}
                  className="bg-white p-6 rounded-xl shadow-lg mb-6 cursor-pointer hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <h2 className="text-xl font-bold text-gray-800">{law.title}</h2>
                  <p className="text-gray-600 mt-2 line-clamp-2">{law.content}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    国家：{law.country} {law.law_category && `| 分类：${law.law_category}`}
                  </p>
                </motion.div>
              ))}
              {(searchResults.applications || []).map((appItem) => (
                <motion.div
                  key={appItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => handleApplicationClick(appItem.id)}
                  className="bg-white p-6 rounded-xl shadow-lg mb-6 cursor-pointer hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <h2 className="text-xl font-bold text-gray-800">{appItem.title}</h2>
                  <p className="text-gray-600 mt-2 line-clamp-2">{appItem.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    子类型：{appItem.sub_type === "case" ? "案例" : appItem.sub_type === "journal" ? "期刊" : "文书"} | 国家：{appItem.country}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-1/3 mt-10 md:mt-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <h5 className="text-lg font-semibold text-gray-800 mb-4">最近搜索记录</h5>
            {recentHistory.length === 0 ? (
              <p className="text-gray-500">暂无记录</p>
            ) : (
              recentHistory.map((item, idx) => (
                <div key={idx} className="mb-4 last:mb-0">
                  <p className="font-medium text-gray-800 hover:text-indigo-600 transition-colors cursor-pointer">{item.query}</p>
                  <p className="text-xs text-gray-500">{new Date(item.created_at).toLocaleString()}</p>
                </div>
              ))
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-100 to-gray-200 py-6 mt-auto">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} 拉美国家法律数据库. 保留所有权利。
        </div>
      </footer>
    </div>
  );
}