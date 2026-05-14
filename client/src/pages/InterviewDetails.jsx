import react, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

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
                    `http://localhost:5000/api/ai/interview/${id}`,
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
        alert("Questions copied!");
    };

    const deleteInterview = async () => {
        const confirmDelete = window.confirm(
            "Delete this interview?"
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/ai/interview/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            alert("Interview deleted");

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
        <div className="min-h-screen bg-gray-950">
            <Navbar />
            <div className="max-w-5xl mx-auto p-8">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-bold text-blue-400">
                            {interview.role}
                        </h1>
                        <span className="text-gray-400">
                            {
                                new Date(interview.createdAt).toLocaleDateString()
                            }
                        </span>
                    </div>
                    <div className="flex gap-4 mb-8 flex-wrap">
                            <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
                                {interview.topic}
                            </span>
                            <span className="bg-purple-600 text-white px-4 py-2 rounded-full">
                                {interview.difficulty}
                            </span>
                    </div>
                    <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 mb-8">
                            <pre className="text-gray-300 whitespace-pre-wrap leading-8">
                                {interview.questions}
                            </pre>
                    </div>
                    <div className="flex gap-4">
                            <button onClick={copyQuestions} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">
                                Copy Questions
                            </button>
                            <button onClick={deleteInterview} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
                                Delete Interview
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewDetails
