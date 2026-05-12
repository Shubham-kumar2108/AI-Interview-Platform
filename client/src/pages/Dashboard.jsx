import React from 'react'
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return (
    <div className="min-h-screen bg-gray-900">

      <Navbar />

    <div className='p-8'>
    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
      
      <h1 className="text-4xl font-bold text-white mb-4">
            Welcome, {userInfo?.name}
      </h1>

      <p className="text-gray-400 text-lg">
            Start preparing for your AI mock interviews.
      </p>

    </div>
    </div>
    </div>
  );


}

export default Dashboard;
