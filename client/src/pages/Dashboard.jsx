import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [interviews, setInterviews] = useState([]);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  useEffect(() => {
    const fetchInterviews = async () => {

      try {
        const { data } = await axios.get("http://localhost:5000/api/ai/my-interviews",
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
    <div className="min-h-screen bg-gray-950">

      <Navbar />

      <div className='p-8'>
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800 mb-8">

          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome, {userInfo?.name}
          </h1>

          <p className="text-gray-400 text-lg">
            Start preparing for your AI mock interviews.
          </p>

        </div>
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">
          <p className="text-gray-400 mb-6 text-lg">
            Generate personalized AI interview questions
            based on role, topic, and difficulty.
          </p>
          <Link to={"/generate"}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300">

              Generate Interview

            </button>
          </Link>
        </div>
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">

          <h2 className="text-3xl font-bold text-white mb-8">

            Interview History

          </h2>

          {
            interviews.length === 0 ? (

              <p className="text-gray-400 text-lg">

                No interviews found yet.

              </p>

            ) : (

              <div className="space-y-6">

                {
                  interviews.map((item) => {

                    return (

                      <div
                        key={item._id}
                        className="bg-gray-800 border border-gray-700 rounded-xl p-6"
                      >

                        <div className="flex justify-between items-center mb-4">

                          <h3 className="text-2xl font-bold text-blue-400">

                            {item.role}

                          </h3>

                          <span className="text-sm text-gray-400">

                            {
                              new Date(
                                item.createdAt
                              ).toLocaleDateString()
                            }

                          </span>

                        </div>

                        <div className="flex gap-4 mb-4 flex-wrap">

                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">

                            {item.topic}

                          </span>

                          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">

                            {item.difficulty}

                          </span>

                        </div>

                        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 max-h-64 overflow-y-auto">

                          <pre className="text-gray-300 whitespace-pre-wrap">

                            {item.questions}

                          </pre>

                        </div>

                        <Link to={`/interview/${item._id}`}>
                            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold">
                              View Full Interview
                            </button>
                        </Link>

                      </div>
                    );
                  })
                }

              </div>
            )
          }

        </div>
      </div>
    </div>
  );


}

export default Dashboard;
