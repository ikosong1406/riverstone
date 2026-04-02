// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Stethoscope,
  Pill,
  Calendar,
  MessageCircle,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  Droplet,
  Activity,
  Dna,
  HeartPulse,
  ShoppingBag,
  Bell,
  Sparkles,
  Shield,
  Truck,
  Star,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import localForage from "localforage";
import Api from "../components/Api";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    medicalCondition: "",
    conditionSpecific: "",
    bloodGroup: "",
    gender: "",
    dateOfBirth: "",
    upcomingAppointments: 0,
    healthScore: 85,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get token from localForage
        const token = await localForage.getItem("token");

        if (!token) {
          toast.error("Please login to continue");
          navigate("/login");
          return;
        }

        // Fetch user data from API
        const response = await axios.post(`${Api}/getUser`, { token });

        if (response.data.success && response.data.user) {
          const user = response.data.user;
          setUserData((prev) => ({
            ...prev,
            ...user,
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            email: user.email || "",
            medicalCondition: user.medicalCondition || "",
            conditionSpecific: user.conditionSpecific || "",
            bloodGroup: user.bloodGroup || "",
            gender: user.gender || "",
            dateOfBirth: user.dateOfBirth || "",
          }));

          // Store user data in localForage for offline access
          await localForage.setItem("user", JSON.stringify(user));
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);

        // Try to get cached user data from localForage
        const cachedUser = await localForage.getItem("user");
        if (cachedUser) {
          const user = JSON.parse(cachedUser);
          setUserData((prev) => ({ ...prev, ...user }));
          toast.success("Loaded cached profile data");
        } else if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          await localForage.removeItem("token");
          await localForage.removeItem("user");
          navigate("/login");
        } else {
          toast.error(
            error.response?.data?.error || "Failed to load user data",
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();

    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, [navigate]);

  const getConditionIcon = () => {
    switch (userData.medicalCondition) {
      case "diabetes":
        return Droplet;
      case "sickleCell":
        return Dna;
      case "cancer":
        return Activity;
      case "cardiovascular":
        return HeartPulse;
      default:
        return Heart;
    }
  };

  const getConditionName = () => {
    switch (userData.medicalCondition) {
      case "diabetes":
        return "Diabetes Management";
      case "sickleCell":
        return "Sickle Cell Care";
      case "cancer":
        return "Cancer Support";
      case "cardiovascular":
        return "Heart Health";
      default:
        return "General Wellness";
    }
  };

  const ConditionIcon = getConditionIcon();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {greeting}, {userData.firstname || "Patient"}!
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome to Riverstone Medical Research Center
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-lg"
          >
            <Stethoscope className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-semibold mb-1">Book Consultation</h3>
            <p className="text-green-100 text-sm mb-4">
              Connect with a specialist doctor
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-green-100 transition"
            >
              Consult Now
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Health Overview & Medical Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Health Score Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Health Overview
              </h2>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <svg className="w-24 h-24">
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray={`${userData.healthScore * 2.64} 264`}
                    strokeLinecap="round"
                    transform="rotate(-90 48 48)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {userData.healthScore}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Overall Health Score</p>
                <p className="text-xs text-gray-400 mt-1">
                  Based on treatment adherence
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs text-gray-500">
                    Keep up the good work!
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500 mb-1">Treatment Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">75% completed</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Medication Adherence
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">90% on track</p>
              </div>
            </div>
          </div>

          {/* Medical Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <ConditionIcon className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                {getConditionName()}
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Condition</span>
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {userData.medicalCondition
                    ? userData.medicalCondition === "sickleCell"
                      ? "Sickle Cell Disease"
                      : userData.medicalCondition === "cardiovascular"
                        ? "Cardiovascular Disease"
                        : userData.medicalCondition
                    : "Not specified"}
                </span>
              </div>

              {userData.conditionSpecific && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Details</span>
                  <span className="text-sm font-medium text-gray-900">
                    {userData.conditionSpecific}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Blood Group</span>
                <span className="text-sm font-medium text-gray-900">
                  {userData.bloodGroup || "Not specified"}
                </span>
              </div>

              {userData.dateOfBirth && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Date of Birth</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(userData.dateOfBirth).toLocaleDateString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500">Email</span>
                <span className="text-sm font-medium text-gray-900 truncate ml-4">
                  {userData.email || "Not specified"}
                </span>
              </div>
            </div>

            <Link
              to="/profile"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition text-sm font-medium"
            >
              Update Medical Info
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Featured Treatments & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Quick Tips & Reminders */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Health Tips
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Stay hydrated - drink at least 8 glasses of water daily
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Take medications at the same time each day for best results
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Regular exercise (30 mins/day) can improve treatment outcomes
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Track your symptoms daily for better consultation results
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
