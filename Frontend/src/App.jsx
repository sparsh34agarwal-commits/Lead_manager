import React from "react";
import Login_page from "./pages/Login_page";
import Register_page from "./pages/Register_page";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user, loading } = useContext(AuthContext);
   if (loading) {
        return <div>Checking authentication...</div>;
    }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/login"
          element={
            !user ? <Login_page /> : <Navigate to={"/dashboard"} replace />
          }
        />

        <Route
          path="/register"
          element={
            !user ? <Register_page /> : <Navigate to={"/dashboard"} replace />
          }
        />

        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to={"/login"} replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
