// frontend/src/TagPage.js
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TagPage() {
  const { tag } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ laws: [], applications: [] });
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    const url = `http://localhost:5000/search?q=&filterType=all&country=all&tag=${encodeURIComponent(tag)}`;
    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        setData({
          laws: Array.isArray(resData.laws) ? resData.laws : [],
          applications: Array.isArray(resData.applications) ? resData.applications : [],
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Tag 搜索错误:", err);
        setData({ laws: [], applications: [] });
        setLoading(false);
      });
  }, [tag]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-primary mb-4"
      >
        标签搜索：{tag}
      </motion.h1>
      {loading ? (
        <div className="text-center text-gray-500">加载中...</div>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">法律条目</h2>
            {data.laws.length === 0 ? (
              <p className="text-gray-500">该标签下暂无法律条目。</p>
            ) : (
              data.laws.map((law) => (
                <div
                  key={law.id}
                  className="bg-white p-4 rounded-xl shadow-md mb-4 cursor-pointer"
                  onClick={() => navigate(`/laws/${law.id}`)}
                >
                  <h3 className="text-xl font-bold text-gray-800">{law.title}</h3>
                  <p className="text-gray-600 mt-2">{law.content.substring(0, 100)}...</p>
                  <p className="text-sm text-gray-400 mt-1">
                    国家：{law.country} {law.tags && `| 标签：${law.tags}`} {law.categories && `| 分类：${law.categories}`}
                  </p>
                </div>
              ))
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">应用案例</h2>
            {data.applications.length === 0 ? (
              <p className="text-gray-500">该标签下暂无应用案例。</p>
            ) : (
              data.applications.map((appItem) => (
                <div
                  key={appItem.id}
                  className="bg-white p-4 rounded-xl shadow-md mb-4 cursor-pointer"
                  onClick={() => navigate(`/applications/${appItem.id}`)}
                >
                  <h3 className="text-xl font-bold text-gray-800">{appItem.title}</h3>
                  <p className="text-gray-600 mt-2">{appItem.description}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    子类型：{appItem.sub_type === "case" ? "案例" : appItem.sub_type === "journal" ? "期刊" : "文书"} | 国家：{appItem.country} {appItem.tags && `| 标签：${appItem.tags}`} {appItem.categories && `| 分类：${appItem.categories}`}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-accent hover:bg-orange-600 text-white rounded font-semibold"
      >
        返回
      </button>
    </div>
  );
}
