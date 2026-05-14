import React from 'react';
import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { Oval, } from "react-loader-spinner";


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

            const { data } = await axios.post("http://localhost:5000/api/ai/generate",
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
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-gray-900 shadow-xl rounded-2xl p-8 border border-gray-800">
                <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
                    AI Interview Generator
                </h1>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold text-gray-300">
                        Role
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold text-gray-300">
                        Difficulty
                    </label>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option >Easy</option>
                        <option >Medium</option>
                        <option >Hard</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 font-semibold text-gray-300">
                        Topic
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={handleGenerate}
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center"
                >
                    {
                        loading ? (
                            <Oval height={25} width={25} color="#999" strokeWidth={4}/>
                        ) : (
                            "Generate Questions"
                        )
                    }
                </button>
                {
                    questions && (
                        <div className="mt-8 bg-gray-800 border border-gray-700 p-6 rounded-xl">
                            <h2 className="text-2xl font-bold mb-4 text-blue-300">
                                Generated Questions
                            </h2>
                            <div className="whitespace-pre-wrap text-gray-200 leading-7">
                                {questions}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default InterviewGenerator
