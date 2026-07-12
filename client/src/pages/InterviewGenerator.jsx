import React from 'react';
import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { Oval, } from "react-loader-spinner";
const API = import.meta.env.VITE_API_URL;


const InterviewGenerator = () => {

    const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
    );

    const [role, setRole] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [topic, setTopic] = useState("");

    const [questions, setQuestions] = useState("");

    const [loading, setLoading] = useState(false);

    const handleGenerate = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const userInfo = JSON.parse(
                localStorage.getItem("userInfo")
            );

            const { data } = await axios.post(`${API}/api/ai/generate`,
                {
                    role,
                    difficulty,
                    topic,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );

            setQuestions(data.questions);

            toast.success(
                "Interview generated successfully!"
            );

        } catch (error) {
            console.log(error);

            toast.error(
                "Failed to generate interview"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 flex items-center justify-center py-8">
            <div className="w-full max-w-2xl">
                <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/50 backdrop-blur-xl shadow-2xl rounded-3xl p-6 sm:p-10 border border-purple-500/30">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                            Interview Generator
                        </h1>
                        <p className="text-slate-300 text-sm">Personalize your interview experience</p>
                    </div>

                    <form className="space-y-6">
                        {/* Role Input */}
                        <div>
                            <label className="block text-slate-300 font-semibold mb-2 text-sm">
                                Job Role
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Frontend Developer, Full Stack Engineer"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-3 sm:py-4 rounded-xl bg-slate-700/50 border border-purple-500/30 text-white placeholder-slate-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                            />
                        </div>

                        {/* Difficulty Select */}
                        <div>
                            <label className="block text-slate-300 font-semibold mb-2 text-sm">
                                Difficulty Level
                            </label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="w-full px-4 py-3 sm:py-4 rounded-xl bg-slate-700/50 border border-purple-500/30 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 cursor-pointer appearance-none"
                            >
                                <option value="Easy" className="bg-slate-700">🟢 Easy</option>
                                <option value="Medium" className="bg-slate-700">🟡 Medium</option>
                                <option value="Hard" className="bg-slate-700">🔴 Hard</option>
                            </select>
                        </div>

                        {/* Topic Input */}
                        <div>
                            <label className="block text-slate-300 font-semibold mb-2 text-sm">
                                Topic/Subject
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., React, Python, System Design"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="w-full px-4 py-3 sm:py-4 rounded-xl bg-slate-700/50 border border-purple-500/30 text-white placeholder-slate-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                            />
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerate}
                            type="submit"
                            disabled={loading}
                            className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 shadow-lg flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Oval height={20} width={20} color="#fff" strokeWidth={4} />
                                    <span>Generating...</span>
                                </>
                            ) : (
                                "✨ Generate Questions"
                            )}
                        </button>
                    </form>

                    {/* Generated Questions */}
                    {questions && (
                        <div className="mt-10 bg-slate-800/70 border border-purple-500/30 p-6 sm:p-8 rounded-2xl animate-fadeIn">
                            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                                📚 Generated Questions
                            </h2>
                            <div className="bg-slate-900/50 rounded-xl p-5 max-h-96 overflow-y-auto">
                                <p className="text-slate-200 leading-7 whitespace-pre-wrap text-sm sm:text-base">
                                    {questions}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(questions);
                                    toast.success("Questions copied to clipboard!");
                                }}
                                className="w-full mt-5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                            >
                                📋 Copy Questions
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InterviewGenerator
