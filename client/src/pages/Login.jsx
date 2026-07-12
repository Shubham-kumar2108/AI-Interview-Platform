import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                `${API}/api/auth/login`,
                formData
            );
            
            localStorage.setItem("userInfo", JSON.stringify(data));
            toast.success("Login successful!");
            navigate("/dashboard");
            

        } catch (error) {
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 py-8">
            <div className="w-full max-w-md">
                {/* Decorative gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl -z-10"></div>
                
                <div className="bg-slate-800/50 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                    {/* Logo/Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center">
                            AI Interview
                        </h1>
                        <p className="text-center text-purple-300 text-sm mt-1">Platform</p>
                    </div>

                    <p className="text-slate-300 text-center mb-8 text-sm sm:text-base">
                        Login to your account and prepare for success
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={handleChange}
                                className="w-full px-4 py-3 sm:py-4 rounded-xl bg-slate-700/50 border border-purple-500/30 text-white placeholder-slate-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                className="w-full px-4 py-3 sm:py-4 rounded-xl bg-slate-700/50 border border-purple-500/30 text-white placeholder-slate-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-slate-400 text-center mt-8 text-sm sm:text-base">
                        No account yet?{" "}
                        <Link to="/register" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );

}

export default Login;