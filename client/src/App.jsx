import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import InterviewGenerator from "./pages/InterviewGenerator";
import InterviewDetails from "./pages/InterviewDetails";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route 
                path="/generate" 
                element={
                    <ProtectedRoute>
                        <InterviewGenerator />
                    </ProtectedRoute>
            }
            />

            <Route 
                path="/interview/:id"
                element={
                    <ProtectedRoute>
                        <InterviewDetails />
                    </ProtectedRoute>
                }
            />
        </Routes> 
    );
}

export default App;