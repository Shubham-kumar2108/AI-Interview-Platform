import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        toast.success(
            "Logged out successfully"
        );
        
        navigate("/");

    };

    return (
        <nav className="bg-gradient-to-r from-slate-800 via-purple-900 to-slate-800 border-b border-purple-500/30 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between shadow-2xl gap-4 sm:gap-0">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                <h1 className="text-white text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    AI Interview
                </h1>
            </div>

            {/* Logout Button */}
            <button
                onClick={logoutHandler}
                className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-white font-semibold px-6 py-2.5 sm:py-2 rounded-lg transform hover:scale-105 active:scale-95 shadow-lg"
            >
                Logout
            </button>
        </nav>
    );
}

export default Navbar;