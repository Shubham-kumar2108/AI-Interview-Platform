import React, { use, useState, } from 'react';
import axios from "axios";
import Navbar from '../components/Navbar';
import toast from "react-hot-toast";
import { Oval, } from "react-loader-spinner";
const API = import.meta.env.VITE_API_URL;

const ResumeInterview = () => {

    const [resume, setResume] = useState(null);

    const [questions, setQuestions] = useState("");

    const [loading, setLoading] = useState(false);

    const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!resume) {
            toast.error("Please upload resume");
            return;
        }
        try {
            setLoading(true);

            const formData= new FormData();

            formData.append("resume", resume);

            const { data } = await axios.post(`${API}/api/ai/resume-generate`, formData, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setQuestions(data.questions);

            toast.success("Resume interview generated!");
        } catch (error) {
            console.log(error);
            toast.error("Generation failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Navbar />
            <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                            Resume Interview
                        </h1>
                        <p className="text-slate-300 text-sm">Generate interview questions from your resume</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-slate-300 font-semibold mb-3 text-sm">
                                📄 Upload Your Resume (PDF)
                            </label>
                            <div className="relative">
                                <input 
                                    type="file" 
                                    accept=".pdf" 
                                    onChange={(e) => setResume(e.target.files[0])}
                                    className="w-full px-4 py-4 sm:py-5 rounded-xl bg-slate-700/50 border-2 border-dashed border-purple-500/50 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 cursor-pointer file:cursor-pointer file:bg-gradient-to-r file:from-blue-500 file:to-purple-500 file:border-0 file:text-white file:font-semibold file:px-4 file:py-2 file:rounded-lg"
                                />
                                <p className="text-slate-400 text-xs mt-2">
                                    {resume ? `✓ ${resume.name}` : "Drag and drop or click to select"}
                                </p>
                            </div>
                        </div>

                        <button
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
                                "✨ Generate Resume Questions"
                            )}
                        </button>
                    </form>

                    {/* Generated Questions */}
                    {questions && (
                        <div className="mt-10 bg-slate-800/70 border border-purple-500/30 p-6 sm:p-8 rounded-2xl animate-fadeIn">
                            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                                💡 Personalized Questions
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

export default ResumeInterview;
