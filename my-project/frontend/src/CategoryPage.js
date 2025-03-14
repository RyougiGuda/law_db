// frontend/src/CategoryPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ laws: [], applications: [] });

  useEffect(() => {
    fetch(`http://localhost:5000/category?name=${encodeURIComponent(name)}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(console.error);
  }, [name]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-primary mb-6"
      >
        Category: {name}
      </motion.h1>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Laws</h2>
        {data.laws.length === 0 ? (
          <p className="text-gray-500">No laws found in this category.</p>
        ) : (
          data.laws.map((law) => (
            <div
              key={law.id}
              className="bg-white p-4 rounded-xl shadow-md mb-4 cursor-pointer"
              onClick={() => navigate(`/laws/${law.id}`)}
            >
              <h3 className="text-xl font-bold text-gray-800">{law.title}</h3>
              <p className="text-gray-600 mt-2">{law.content.substring(0, 100)}...</p>
            </div>
          ))
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Applications</h2>
        {data.applications.length === 0 ? (
          <p className="text-gray-500">No applications found in this category.</p>
        ) : (
          data.applications.map((app) => (
            <div
                key={app.id}
                className="bg-white p-4 rounded-xl shadow-md mb-4"
                onClick={() => navigate(`/applications/${app.id}`)}
            >
              <h3 className="text-xl font-bold text-gray-800">{app.title}</h3>
              <p className="text-gray-600 mt-2">{app.description}</p>
            </div>
          ))
        )}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-accent hover:bg-orange-600 text-white rounded font-semibold"
      >
        Go Back
      </button>
    </div>
  );
}
