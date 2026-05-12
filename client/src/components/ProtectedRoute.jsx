import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
    );

    return userInfo ? children : <Navigate to="/" />;
};

export default ProtectedRoute;