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
        <nav className="bg-gray-800 px-6 py-4 flex items-center justify-between shadow-md">

            <h1 className="text-white text-2xl font-bold">
                AI Interview Platform
            </h1>

            <button
                onClick={logoutHandler}
                className="bg-red-500 hover:bg-red-600 transition duration-300 text-white px-4 py-2 rounded-lg"
            >
                Logout
            </button>

        </nav>
    );
}

export default Navbar;