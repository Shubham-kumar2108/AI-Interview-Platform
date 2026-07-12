import react, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

const InterviewDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [interview, setInterview] = useState(null);

    const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
    ) || {};

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const { data } = await axios.get(
                    `${API}/api/ai/interview/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                        },
                    }
                );
                setInterview(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchInterview();
    }, [id]);

    const copyQuestions = () => {
        navigator.clipboard.writeText(
            interview.questions
        );
        toast.success("Questions copied!");
    };

    const deleteInterview = async () => {
        const confirmDelete = window.confirm(
            "Delete this interview?"
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(
                `${API}/api/ai/interview/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            toast.success("Interview deleted");

            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };
    if (!interview) {
        return (
            <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Navbar />
            <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                {interview.role}
                            </h1>
                            <p className="text-slate-400 text-sm mt-1">Interview Questions</p>
                        </div>
                        <span className="text-slate-400 text-sm bg-slate-700/50 px-4 py-2 rounded-full">
                            {new Date(interview.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-3 mb-8 flex-wrap">
                        <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-full font-medium text-sm">
                            {interview.topic}
                        </span>
                        <span className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-full font-medium text-sm">
                            {interview.difficulty}
                        </span>
                    </div>

                    {/* Questions Display */}
                    <div className="bg-slate-900/50 border border-slate-600/50 rounded-2xl p-6 mb-8 max-h-96 overflow-y-auto">
                        <pre className="text-slate-200 whitespace-pre-wrap leading-8 font-sans text-sm sm:text-base">
                            {interview.questions}
                        </pre>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button 
                            onClick={copyQuestions} 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                        >
                            📋 Copy Questions
                        </button>
                        <button 
                            onClick={deleteInterview} 
                            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                        >
                            🗑️ Delete Interview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewDetails
