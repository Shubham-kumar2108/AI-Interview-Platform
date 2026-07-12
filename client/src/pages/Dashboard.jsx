import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [interviews, setInterviews] = useState([]);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  useEffect(() => {
    const fetchInterviews = async () => {

      try {
        const { data } = await axios.get(`${API}/api/ai/my-interviews`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setInterviews(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInterviews();

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-purple-500/30 mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
            Welcome, {userInfo?.name}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg">
            Master your next interview with AI-powered preparation
          </p>
        </div>

        {/* Action Buttons Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <Link to="/generate" className="group">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-blue-500/50 hover:border-blue-400/80 transition-all duration-300 hover:shadow-2xl h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-300 mb-2">Generate Interview</h3>
              <p className="text-slate-300 text-sm mb-4">Create personalized questions for any role and topic</p>
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 sm:py-3 rounded-lg transition-all duration-300 transform group-hover:scale-105">
                Start Now →
              </button>
            </div>
          </Link>

          <Link to="/resume-interview" className="group">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-purple-500/50 hover:border-purple-400/80 transition-all duration-300 hover:shadow-2xl h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-purple-300 mb-2">Resume Interview</h3>
              <p className="text-slate-300 text-sm mb-4">Get questions based on your resume content</p>
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-2 sm:py-3 rounded-lg transition-all duration-300 transform group-hover:scale-105">
                Upload Resume →
              </button>
            </div>
          </Link>
        </div>

        {/* Interview History Section */}
        <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-purple-500/30">
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6 sm:mb-8">
            Interview History
          </h2>

          {interviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-slate-400 text-lg mb-4">📝 No interviews yet</div>
              <p className="text-slate-400">Start generating interviews to build your preparation history</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interviews.map((item) => (
                <div
                  key={item._id}
                  className="bg-slate-700/50 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/60 transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                      {item.role}
                    </h3>
                    <span className="text-xs sm:text-sm text-slate-400 bg-slate-600/50 px-3 py-1 rounded-full">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {item.topic}
                    </span>
                    <span className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {item.difficulty}
                    </span>
                  </div>

                  <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-600/50 max-h-40 overflow-y-auto mb-4">
                    <p className="text-slate-300 text-sm whitespace-pre-wrap line-clamp-4">
                      {item.questions}
                    </p>
                  </div>

                  <Link to={`/interview/${item._id}`}>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                      View Full Interview
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );


}

export default Dashboard;
