// frontend/src/HomePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [advancedFilterType, setAdvancedFilterType] = useState("all"); // 全部、法律、案例、期刊、文书
  const [advancedCountry, setAdvancedCountry] = useState("all"); // 全部国家、巴西、阿根廷、智利、墨西哥等
  const [advancedTag, setAdvancedTag] = useState("all"); // 全部标签或选定标签
  const [searchResults, setSearchResults] = useState({ laws: [], applications: [] });
  const [recentHistory, setRecentHistory] = useState([]);
  const allTags = [
    "环境保护", "反腐败", "人权", "劳动法", "税法", "知识产权", "宪法", "国际贸易", "刑事诉讼",
    "民事诉讼", "污染", "透明度", "工人权利", "森林砍伐", "土著权利", "合规", "专利", "版权",

  ];

  useEffect(() => {
    fetch("http://localhost:5000/history")
      .then((res) => res.json())
      .then((data) => setRecentHistory(data))
      .catch(console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const url = `http://localhost:5000/search?q=${encodeURIComponent(
      searchQuery
    )}&filterType=${encodeURIComponent(
      advancedFilterType
    )}&country=${encodeURIComponent(advancedCountry)}&tag=${encodeURIComponent(
      advancedTag
    )}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // 防御性设置：保证返回的 laws 与 applications 为数组
        setSearchResults({
          laws: Array.isArray(data.laws) ? data.laws : [],
          applications: Array.isArray(data.applications) ? data.applications : [],
        });
        // 更新搜索历史
        fetch("http://localhost:5000/history")
          .then((res) => res.json())
          .then((historyData) => setRecentHistory(historyData))
          .catch(console.error);
      })
      .catch(console.error);
  };

  const handleCategoryClick = (cat) => {
    navigate(`/category/${encodeURIComponent(cat)}`);
  };

  const handleTagClick = (tag) => {
    navigate(`/tag/${encodeURIComponent(tag)}`);
  };

  const handleLawClick = (id) => {
    navigate(`/laws/${id}`);
  };

  const handleApplicationClick = (id) => {
    navigate(`/applications/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 顶部导航 */}
      <nav className="bg-[#005B8E] text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold">拉美国家法律数据库</span>
          </div>
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索法律条文..."
              className="w-full sm:w-72 px-3 py-2 rounded-md focus:outline-none text-gray-700"
            />
            <select
              value={advancedFilterType}
              onChange={(e) => setAdvancedFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-gray-800"
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
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-gray-800"
            >
              <option value="all">全部国家</option>
              <option value="巴西">巴西</option>
              <option value="阿根廷">阿根廷</option>
              <option value="智利">智利</option>
              <option value="墨西哥">墨西哥</option>
              {/* 根据需要添加更多国家 */}
            </select>
            <select
              value={advancedTag}
              onChange={(e) => setAdvancedTag(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-gray-800"
            >
              <option value="all">全部标签</option>
              {allTags.map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF7300] hover:bg-orange-600 rounded-md font-semibold"
            >
              搜索
            </button>
          </form>
          <div className="flex items-center space-x-4 text-sm">
            <span className="hover:text-gray-200">历史记录</span>
            <span className="hover:text-gray-200">文件夹</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row md:space-x-8">
        {/* 左侧内容 */}
        <div className="w-full md:w-2/3 mb-6 md:mb-0">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-700 mb-4"
          >
            拉美国家法律数据库 首页
          </motion.h2>
          <h4 className="text-xl font-bold text-gray-700 mb-4">领域 &amp; 资源</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["商务", "刑法", "民法", "知识产权", "环境", "资本市场", "重整与破产"].map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat)}
                className="text-blue-600 hover:underline text-left"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* “所有标签”区域 */}
          <div className="mt-8">
            <h4 className="text-xl font-bold text-gray-700 mb-4">所有标签</h4>
            <div className="grid grid-cols-3 gap-3">
              {allTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTagClick(tag)}
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 hover:bg-gray-100"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 搜索结果展示 */}
          {(searchResults.laws?.length > 0 || searchResults.applications?.length > 0) && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                搜索结果：{searchQuery}
              </h3>
              { (searchResults.laws || []).map((law) => (
                <div
                  key={law.id}
                  className="bg-white p-4 rounded-xl shadow-md mb-4 cursor-pointer"
                  onClick={() => handleLawClick(law.id)}
                >
                  <h2 className="text-2xl font-bold text-gray-800">{law.title}</h2>
                  <p className="text-gray-600 mt-2">{law.content.substring(0, 100)}...</p>
                  <p className="text-sm text-gray-400 mt-1">
                    国家：{law.country} {law.tags && `| 标签：${law.tags}`} {law.categories && `| 分类：${law.categories}`}
                  </p>
                </div>
              ))}
              { (searchResults.applications || []).map((appItem) => (
                <div
                  key={appItem.id}
                  className="bg-white p-4 rounded-xl shadow-md mb-4 cursor-pointer"
                  onClick={() => handleApplicationClick(appItem.id)}
                >
                  <h2 className="text-2xl font-bold text-gray-800">{appItem.title}</h2>
                  <p className="text-gray-600 mt-2">{appItem.description}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    子类型：{appItem.sub_type === "case" ? "案例" : appItem.sub_type === "journal" ? "期刊" : "文书"} | 国家：{appItem.country} {appItem.tags && `| 标签：${appItem.tags}`} {appItem.categories && `| 分类：${appItem.categories}`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 右侧侧栏：最近搜索记录 */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <h5 className="text-lg font-semibold text-gray-700 mb-3">最近搜索记录</h5>
            {recentHistory.length === 0 ? (
              <p className="text-gray-500">暂无记录</p>
            ) : (
              recentHistory.map((item, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-semibold text-gray-800">{item.query}</p>
                  <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Ryougi Law. 保留所有权利。
        </div>
      </footer>
    </div>
  );
}
