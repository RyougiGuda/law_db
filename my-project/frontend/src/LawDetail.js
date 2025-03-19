// frontend/src/LawDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { API_URL } from "./config";

export default function LawDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lawDetail, setLawDetail] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/laws/${id}`)
      .then(res => res.json())
      .then(data => {
        setLawDetail(data.law);
        setApplications(data.applications || []);
      })
      .catch(console.error);
  }, [id]);

  if (!lawDetail) {
    return <div className="p-4 text-center">加载中...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-primary mb-4"
      >
        {lawDetail.title}
      </motion.h1>
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <p className="text-gray-700">{lawDetail.content}</p>
        <p className="mt-2 text-sm text-gray-400">
          国家：{lawDetail.country}
          {lawDetail.law_category && ` | 分类：${lawDetail.law_category}`}
        </p>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">引用该法律的应用案例</h2>
      {applications.length === 0 ? (
        <p className="text-gray-500">暂无相关应用案例。</p>
      ) : (
        applications.map(app => (
          <div
            key={app.id}
            className="bg-white p-4 rounded-xl shadow-md mb-4 cursor-pointer"
            onClick={() => navigate(`/applications/${app.id}`)}
          >
            <h3 className="text-xl font-bold text-gray-800">{app.title}</h3>
            <p className="text-gray-600 mt-2">{app.description}</p>
            <p className="text-sm text-gray-400 mt-1">
              子类型：{app.sub_type === "case" ? "案例" : app.sub_type === "journal" ? "期刊" : "文书"}
              | 国家：{app.country}
              {app.categories && ` | 分类：${app.categories}`}
            </p>
          </div>
        ))
      )}
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-accent hover:bg-orange-600 text-white rounded font-semibold"
      >
        返回
      </button>
    </div>
  );
}
