import React, { use, useState, } from 'react';
import axios from "axios";
import Navbar from '../components/Navbar';
import toast from "react-hot-toast";
import { Oval, } from "react-loader-spinner";

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

            const { data } = await axios.post("http://localhost:5000/api/ai/resume-generate", formData, {
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
        <div className="min-h-screen bg-gray-950">
            <Navbar />
            <div className="max-w-4xl mx-auto p-8">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-lg">
                    <h1 className="text-4xl font-bold text-white mb-6">
                        Resume-Based Interview
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2 text-lg">
                                Upload Resume (PDF)
                            </label>
                            <input type="file" accept=".pdf" onChange={(e) =>
                                setResume(e.target.files[0])
                            }
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
                            />
                        </div>
                        <button
                            type='submit'
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center"
                        >
                            {
                                loading ? (
                                    <Oval
                                        height={25}
                                        width={25}
                                        color="#fff"
                                        secondaryColor="#999"
                                        strokeWidth={4}
                                    />
                                ) : (
                                    "Generate Resume Questions"
                                )
                    }
                        </button>
                    </form>
                    {
                        questions && (
                            <div className="mt-10 bg-gray-950 border border-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-bold text-blue-400 mb-4">
                                    Personalized Questions
                                </h2>
                                <pre className="text-gray-300 whitespace-pre-wrap leading-8">
                                    {questions}
                                </pre>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ResumeInterview;
