import React from 'react';
import {useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email:"",
        password:"",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const {data} = await axios.post(
                "http://localhost:5000/api/auth/register",
                formData
            );

            localStorage.setItem("userInfo", JSON.stringify(data));

            navigate("/dashboard");
        } catch (error) {
            alert(error.response.data.message);
        }
    };


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
      </h1>

      <p className="text-gray-400 text-center mb-8">
          Register to start AI interview preparation
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input 
          type="text" 
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="email" 
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="password" 
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white p-3 rounded-lg font-semibold">
            Register
        </button>
      </form>

      <p className="text-gray-400 text-center mt-6">
        Already have account?
        <Link to="/" className="text-blue-500 ml-1 hover:underline"> Login</Link>
      </p>
    </div>
    </div>
  );
}

export default Register;
