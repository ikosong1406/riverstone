// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Consultation from "./pages/Consultation";
import Pharmacy from "./pages/Pharmacy";
import Profile from "./pages/Profile";

// Components
import Navigator from "./components/Navigator";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes without Navigator */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Authenticated Routes with Navigator */}
        <Route
          path="/home"
          element={
            <div className="flex min-h-screen bg-gray-50">
              <Navigator />
              <main className="flex-1 overflow-auto">
                <Home />
              </main>
            </div>
          }
        />
        <Route
          path="/consultation"
          element={
            <div className="flex min-h-screen bg-gray-50">
              <Navigator />
              <main className="flex-1 overflow-auto">
                <Consultation />
              </main>
            </div>
          }
        />
        <Route
          path="/pharmacy"
          element={
            <div className="flex min-h-screen bg-gray-50">
              <Navigator />
              <main className="flex-1 overflow-auto">
                <Pharmacy />
              </main>
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className="flex min-h-screen bg-gray-50">
              <Navigator />
              <main className="flex-1 overflow-auto">
                <Profile />
              </main>
            </div>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-6">Page Not Found</p>
                <a
                  href="/"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Go back home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
