import React from 'react'
import Navbar from '../components/Navbar';
import {Link} from "react-router-dom";

const Dashboard = () => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return (
    <div className="min-h-screen bg-gray-900">

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
    </div>
    </div>
  );


}

export default Dashboard;
