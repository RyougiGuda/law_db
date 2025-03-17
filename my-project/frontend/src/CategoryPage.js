import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "./config";  // 新增
export default function CategoryPage() {
  const { name } = useParams(); // 从 URL 中获取分类名称（中文，比如“商务”、“刑法”等）
  const navigate = useNavigate();
  const [countryFilter, setCountryFilter] = useState("all");
  const [data, setData] = useState({ laws: [], applications: [] });
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    const url = `${API_URL}/category?name=${encodeURIComponent(
      name
    )}&country=${encodeURIComponent(countryFilter)}`;
    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        // 防止返回 undefined
        const fetchedData = resData || { laws: [], applications: [] };
        // 确保 laws 与 applications 是数组
        setData({
          laws: Array.isArray(fetchedData.laws) ? fetchedData.laws : [],
          applications: Array.isArray(fetchedData.applications)
            ? fetchedData.applications
            : [],
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("分类查询错误:", err);
        setData({ laws: [], applications: [] });
        setLoading(false);
      });
  }, [name, countryFilter]);

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
        分类：{name}
      </motion.h1>

      {/* 国家筛选下拉框 */}
      <div className="mb-4">
        <label className="mr-2 font-semibold text-gray-700">国家筛选:</label>
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-gray-800"
        >
          <option value="all">全部国家</option>
          <option value="巴西">巴西</option>
          <option value="阿根廷">阿根廷</option>
          <option value="墨西哥">墨西哥</option>
          <option value="智利">智利</option>
          <option value="哥伦比亚">哥伦比亚</option>
          <option value="乌拉圭">乌拉圭</option>
          <option value="秘鲁">秘鲁</option>
          <option value="委内瑞拉">委内瑞拉</option>
          <option value="巴拉圭">巴拉圭</option>
          <option value="厄瓜多尔">厄瓜多尔</option>
          <option value="玻利维亚">玻利维亚</option>
          <option value="洪都拉斯">洪都拉斯</option>
          <option value="危地马拉">危地马拉</option>
          <option value="萨尔瓦多">萨尔瓦多</option>
          <option value="尼加拉瓜">尼加拉瓜</option>
          <option value="哥斯达黎加">哥斯达黎加</option>
          <option value="巴拿马">巴拿马</option>
          <option value="多米尼加">多米尼加</option>
          <option value="海地">海地</option>
          <option value="古巴">古巴</option>
          <option value="波多黎各">波多黎各</option>
          <option value="牙买加">牙买加</option>
          <option value="特立尼达和多巴哥">特立尼达和多巴哥</option>
          <option value="巴巴多斯">巴巴多斯</option>
          <option value="圣卢西亚">圣卢西亚</option>
          <option value="格林纳达">格林纳达</option>
          <option value="安提瓜和巴布达">安提瓜和巴布达</option>
          <option value="圣文森特和格林纳丁斯">圣文森特和格林纳丁斯</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">加载中...</div>
      ) : (
        <div className="space-y-6">
          {/* 法律条目部分 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">法律条目</h2>
            {data.laws.length === 0 ? (
              <p className="text-gray-500">该分类下暂无法律条目。</p>
            ) : (
              data.laws.map((law) => (
                <div
                  key={law.id}
                  className="bg-white p-4 rounded-xl shadow-md mb-4 cursor-pointer"
                  onClick={() => navigate(`/laws/${law.id}`)}
                >
                  <h3 className="text-xl font-bold text-gray-800">{law.title}</h3>
                  <p className="text-gray-600 mt-2">{law.content.substring(0, 100)}...</p>
                  <p className="text-sm text-gray-400 mt-1">国家：{law.country}</p>
                </div>
              ))
            )}
          </div>

          {/* 应用案例部分 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">应用案例</h2>
            {data.applications.length === 0 ? (
              <p className="text-gray-500">该分类下暂无应用案例。</p>
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
                    子类型：{appItem.sub_type === "case" ? "案例" : appItem.sub_type === "journal" ? "期刊" : "文书"} | 国家：{appItem.country}
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
