// frontend/src/ApplicationDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/applications/${id}`)
      .then(res => res.json())
      .then(data => setApplication(data))
      .catch(console.error);
  }, [id]);

  if (!application)
    return <div className="p-4 text-center">加载中...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-primary mb-4"
      >
        {application.title}
      </motion.h1>
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <p className="text-gray-700">{application.full_content}</p>
        <p className="mt-2 text-sm text-gray-400">
          子类型：{application.sub_type === "case" ? "案例" : application.sub_type === "journal" ? "期刊" : "文书"}
          | 国家：{application.country}
          {application.tags && ` | 标签：${application.tags}`}
          {application.categories && ` | 分类：${application.categories}`}
        </p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-accent hover:bg-orange-600 text-white rounded font-semibold"
      >
        返回
      </button>
    </div>
  );
}
