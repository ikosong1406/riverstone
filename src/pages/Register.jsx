// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Calendar,
  Heart,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Droplet,
  Dna,
  Activity,
  HeartPulse,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    password: "",
    medicalCondition: "",
    conditionSpecific: "",
  });
  const [errors, setErrors] = useState({});

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const genders = ["Male", "Female"];

  const medicalConditions = [
    { value: "diabetes", label: "Diabetes", icon: Droplet, chinese: "糖尿病" },
    {
      value: "sickleCell",
      label: "Sickle Cell Disease",
      icon: Dna,
      chinese: "镰状细胞病",
    },
    { value: "cancer", label: "Cancer", icon: Activity, chinese: "癌症" },
    {
      value: "cardiovascular",
      label: "Cardiovascular Disease",
      icon: HeartPulse,
      chinese: "心血管疾病",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.medicalCondition)
      newErrors.medicalCondition = "Please select a medical condition";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Account created successfully!");
      navigate("/home");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const getConditionPlaceholder = () => {
    switch (formData.medicalCondition) {
      case "diabetes":
        return "e.g., Type 1, Type 2, Gestational";
      case "sickleCell":
        return "e.g., SS, SC, S-beta thalassemia";
      case "cancer":
        return "e.g., Breast, Lung, Leukemia";
      case "cardiovascular":
        return "e.g., CAD, Heart Failure, Arrhythmia";
      default:
        return "Please specify your condition";
    }
  };

  const selectedCondition = medicalConditions.find(
    (c) => c.value === formData.medicalCondition,
  );
  const ConditionIcon = selectedCondition?.icon || Heart;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-2">
            Join Riverstone Medical Research Center
          </p>
          <p className="text-xs text-gray-400 mt-1">瑞华医学研究中心</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-8">
            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border ${
                    errors.firstName ? "border-red-400" : "border-gray-200"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border ${
                    errors.lastName ? "border-red-400" : "border-gray-200"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-4 py-2.5 border ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-4 py-2.5 border ${
                      errors.dateOfBirth ? "border-red-400" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border ${
                    errors.gender ? "border-red-400" : "border-gray-200"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition`}
                >
                  <option value="">Select</option>
                  {genders.map((g) => (
                    <option key={g} value={g.toLowerCase()}>
                      {g}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
                )}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-10 py-2.5 border ${
                    errors.password ? "border-red-400" : "border-gray-200"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
              <p className="mt-1 text-xs text-gray-400">Minimum 8 characters</p>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical Condition
              </label>
              <div className="grid grid-cols-2 gap-3">
                {medicalConditions.map((condition) => (
                  <button
                    key={condition.value}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        medicalCondition: condition.value,
                        conditionSpecific: "",
                      }));
                      if (errors.medicalCondition) {
                        setErrors((prev) => ({
                          ...prev,
                          medicalCondition: "",
                        }));
                      }
                    }}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      formData.medicalCondition === condition.value
                        ? "border-green-500 bg-green-50 shadow-sm"
                        : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
                    }`}
                  >
                    <condition.icon
                      className={`w-5 h-5 ${
                        formData.medicalCondition === condition.value
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    />
                    <div className="text-left">
                      <p
                        className={`text-sm font-medium ${
                          formData.medicalCondition === condition.value
                            ? "text-green-700"
                            : "text-gray-700"
                        }`}
                      >
                        {condition.label}
                      </p>
                      <p className="text-xs text-gray-400">
                        {condition.chinese}
                      </p>
                    </div>
                    {formData.medicalCondition === condition.value && (
                      <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
              {errors.medicalCondition && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.medicalCondition}
                </p>
              )}
            </div>

            {formData.medicalCondition && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <ConditionIcon className="w-4 h-4 text-green-600" />
                    Condition Details
                  </span>
                </label>
                <input
                  type="text"
                  name="conditionSpecific"
                  value={formData.conditionSpecific}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder={getConditionPlaceholder()}
                />
                <p className="mt-1 text-xs text-gray-400">
                  This helps our specialists prepare for your consultation
                </p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <div className="inline-flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              NHC Certified
            </span>
            <span className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              Secure & Encrypted
            </span>
            <span className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              HIPAA Compliant
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
