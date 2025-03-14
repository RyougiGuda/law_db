// frontend/src/LawDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LawDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lawDetail, setLawDetail] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/laws/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLawDetail(data.law);
        setApplications(data.applications);
      })
      .catch(console.error);
  }, [id]);

  if (!lawDetail) return <div className="p-4 text-center">Loading...</div>;

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
        <p className="mt-2 text-sm text-gray-400">Category: {lawDetail.category}</p>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Applications</h2>
      {applications.length === 0 ? (
        <p className="text-gray-500">No related applications found.</p>
      ) : (
        applications.map((app) => (
          <div key={app.id} className="bg-white p-4 rounded-xl shadow-md mb-4" onClick={() => navigate(`/applications/${app.id}`)}>
            <h3 className="text-xl font-bold text-gray-800">{app.title}</h3>
            <p className="text-gray-600 mt-2">{app.description}</p>
          </div>
        ))
      )}
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-accent hover:bg-orange-600 text-white rounded font-semibold"
      >
        Go Back
      </button>
    </div>
  );
}
