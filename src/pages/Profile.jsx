// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Droplet,
  Heart,
  Edit2,
  Save,
  X,
  Activity,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import localForage from "localforage";
import Api from "../components/Api";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    medicalCondition: "",
    conditionSpecific: "",
  });

  const [formData, setFormData] = useState({ ...userData });
  const [isLoading, setIsLoading] = useState(true);

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
          setUserData(user);
          setFormData(user);

          // Update stored user data
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
          setUserData(user);
          setFormData(user);
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
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    const loadingToast = toast.loading("Updating profile...");

    try {
      // Get token
      const token = await localForage.getItem("token");

      if (!token) {
        toast.error("Please login to continue");
        navigate("/login");
        return;
      }

      // Update user data via API
      const response = await axios.put(`${Api}/user/update`, {
        token,
        userData: formData,
      });

      if (response.data.success) {
        // Update local state
        setUserData(formData);

        // Update stored user data
        await localForage.setItem("user", JSON.stringify(formData));

        toast.success("Profile updated successfully", { id: loadingToast });
        setIsEditing(false);
      } else {
        throw new Error(response.data.message || "Update failed");
      }
    } catch (error) {
      toast.dismiss(loadingToast);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        await localForage.removeItem("token");
        await localForage.removeItem("user");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.error || "Failed to update profile");
      }
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await localForage.removeItem("token");
    await localForage.removeItem("user");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const fullName =
    `${userData.firstname || ""} ${userData.lastname || ""}`.trim();

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Cover */}
          <div className="h-24 bg-gradient-to-r from-green-600 to-emerald-600"></div>

          {/* Avatar Section */}
          <div className="px-6 pb-6">
            <div className="flex justify-between items-start -mt-12 mb-6">
              <div className="flex items-end gap-4">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
                  <User className="w-12 h-12 text-green-600" />
                </div>
                <div className="pb-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    {fullName || "Patient"}
                  </h2>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {userData.firstname || "—"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {userData.lastname || "—"}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                ) : (
                  <p className="text-gray-900 py-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {userData.email}
                  </p>
                )}
              </div>

              {/* Date of Birth & Gender */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={
                        formData.dateOfBirth
                          ? formData.dateOfBirth.split("T")[0]
                          : ""
                      }
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {userData.dateOfBirth
                        ? new Date(userData.dateOfBirth).toLocaleDateString()
                        : "—"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Gender
                  </label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={formData.gender || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 py-2 capitalize">
                      {userData.gender || "—"}
                    </p>
                  )}
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Blood Group
                </label>
                {isEditing ? (
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <p className="text-gray-900 py-2 flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-gray-400" />
                    {userData.bloodGroup || "—"}
                  </p>
                )}
              </div>

              {/* Medical Condition */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Medical Condition
                </label>
                {isEditing ? (
                  <select
                    name="medicalCondition"
                    value={formData.medicalCondition || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  >
                    <option value="">Select</option>
                    <option value="diabetes">Diabetes</option>
                    <option value="sickleCell">Sickle Cell Disease</option>
                    <option value="cancer">Cancer</option>
                    <option value="cardiovascular">
                      Cardiovascular Disease
                    </option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-900 py-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-gray-400" />
                    {userData.medicalCondition
                      ? userData.medicalCondition === "sickleCell"
                        ? "Sickle Cell Disease"
                        : userData.medicalCondition === "cardiovascular"
                          ? "Cardiovascular Disease"
                          : userData.medicalCondition.charAt(0).toUpperCase() +
                            userData.medicalCondition.slice(1)
                      : "—"}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 text-sm"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition flex items-center justify-center gap-2 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
