// src/pages/Consultation.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  User,
  Calendar,
  Heart,
  Droplet,
  Activity,
  ChevronRight,
  Clock,
  MapPin,
  Award,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import localForage from "localforage";
import Api from "../components/Api";

const Consultation = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Load user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await localForage.getItem("token");

        if (!token) {
          toast.error("Please login to continue");
          navigate("/login");
          return;
        }

        const response = await axios.post(`${Api}/getUser`, { token });

        if (response.data.success && response.data.user) {
          const user = response.data.user;
          setUserData(user);

          // Filter doctors based on user's medical condition
          filterDoctorsByCondition(user.medicalCondition);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);

        // Try to get cached user data
        const cachedUser = await localForage.getItem("user");
        if (cachedUser) {
          const user = JSON.parse(cachedUser);
          setUserData(user);
          filterDoctorsByCondition(user.medicalCondition);
          toast.success("Loaded cached profile data");
        } else if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          navigate("/login");
        } else {
          toast.error("Failed to load user data");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // All Chinese Doctors (Chinese nationality) with USD prices $350-$400
  // REMOVED the 'icon' property since it can't be serialized
  const allDoctors = [
    {
      id: 1,
      name: "Dr. Zhang Wei",
      specialty: "Endocrinologist",
      condition: "diabetes",
      conditionName: "Diabetes",
      experience: "15 years",
      patients: 3240,
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      languages: ["Mandarin", "English"],
      education: "Peking Union Medical College",
      about:
        "Specialist in diabetes management and insulin therapy with over 15 years of experience.",
      location: "Beijing, China",
      consultationFee: 380,
      hospital: "Peking Union Medical College Hospital",
    },
    {
      id: 2,
      name: "Dr. Chen Mei",
      specialty: "Hematologist",
      condition: "sickleCell",
      conditionName: "Sickle Cell Disease",
      experience: "18 years",
      patients: 2150,
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
      languages: ["Mandarin", "English"],
      education: "Shanghai Jiao Tong University School of Medicine",
      about:
        "Leading expert in gene therapy and sickle cell treatment with published research.",
      location: "Shanghai, China",
      consultationFee: 390,
      hospital: "Ruijin Hospital",
    },
    {
      id: 3,
      name: "Dr. Li Qiang",
      specialty: "Oncologist",
      condition: "cancer",
      conditionName: "Cancer",
      experience: "22 years",
      patients: 5420,
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
      languages: ["Mandarin", "English"],
      education: "Fudan University Shanghai Cancer Center",
      about: "Specialized in immunotherapy and targeted cancer treatments.",
      location: "Shanghai, China",
      consultationFee: 400,
      hospital: "Fudan University Shanghai Cancer Center",
    },
    {
      id: 4,
      name: "Dr. Wang Fang",
      specialty: "Cardiologist",
      condition: "cardiovascular",
      conditionName: "Cardiovascular Disease",
      experience: "20 years",
      patients: 6210,
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      languages: ["Mandarin", "English"],
      education: "Peking University Health Science Center",
      about:
        "Expert in non-invasive cardiology and revolutionary plaque reversal treatments.",
      location: "Beijing, China",
      consultationFee: 370,
      hospital: "Beijing Anzhen Hospital",
    },
    {
      id: 5,
      name: "Dr. Liu Xia",
      specialty: "General Practitioner",
      condition: "general",
      conditionName: "General Health",
      experience: "10 years",
      patients: 2850,
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      languages: ["Mandarin", "English"],
      education: "Sun Yat-sen University",
      about: "Comprehensive primary care and preventive medicine specialist.",
      location: "Guangzhou, China",
      consultationFee: 350,
      hospital: "Guangdong Provincial People's Hospital",
    },
    {
      id: 6,
      name: "Dr. Zhao Ming",
      specialty: "Nephrologist",
      condition: "diabetes",
      conditionName: "Diabetes",
      experience: "14 years",
      patients: 3100,
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
      languages: ["Mandarin", "English"],
      education: "West China Medical Center",
      about: "Specializes in diabetic kidney disease prevention and treatment.",
      location: "Chengdu, China",
      consultationFee: 360,
      hospital: "West China Hospital",
    },
    {
      id: 7,
      name: "Dr. Sun Yating",
      specialty: "Hematologist",
      condition: "sickleCell",
      conditionName: "Sickle Cell Disease",
      experience: "12 years",
      patients: 1680,
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
      languages: ["Mandarin", "English"],
      education: "Zhejiang University School of Medicine",
      about:
        "Specialized in sickle cell management and bone marrow transplantation.",
      location: "Hangzhou, China",
      consultationFee: 385,
      hospital: "Sir Run Run Shaw Hospital",
    },
    {
      id: 8,
      name: "Dr. Xu Jie",
      specialty: "Cardiologist",
      condition: "cardiovascular",
      conditionName: "Cardiovascular Disease",
      experience: "16 years",
      patients: 4890,
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      languages: ["Mandarin", "English"],
      education: "Tongji Medical College",
      about: "Leading cardiologist specializing in preventive cardiology.",
      location: "Wuhan, China",
      consultationFee: 375,
      hospital: "Wuhan Union Hospital",
    },
    {
      id: 9,
      name: "Dr. Lin Wei",
      specialty: "Oncologist",
      condition: "cancer",
      conditionName: "Cancer",
      experience: "19 years",
      patients: 4780,
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      languages: ["Mandarin", "English"],
      education: "Sun Yat-sen University Cancer Center",
      about: "Expert in precision medicine and cancer immunotherapy.",
      location: "Guangzhou, China",
      consultationFee: 395,
      hospital: "Sun Yat-sen University Cancer Center",
    },
    {
      id: 10,
      name: "Dr. Wu Tao",
      specialty: "Endocrinologist",
      condition: "diabetes",
      conditionName: "Diabetes",
      experience: "13 years",
      patients: 2780,
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
      languages: ["Mandarin", "English"],
      education: "Nanjing Medical University",
      about:
        "Specializes in advanced diabetes treatment and insulin pump therapy.",
      location: "Nanjing, China",
      consultationFee: 365,
      hospital: "Jiangsu Province Hospital",
    },
    {
      id: 11,
      name: "Dr. Huang Ying",
      specialty: "General Practitioner",
      condition: "general",
      conditionName: "General Health",
      experience: "9 years",
      patients: 1950,
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
      languages: ["Mandarin", "English"],
      education: "Sichuan University",
      about: "Specializes in family medicine and chronic disease management.",
      location: "Chongqing, China",
      consultationFee: 355,
      hospital: "Chongqing University Cancer Hospital",
    },
    {
      id: 12,
      name: "Dr. Tang Wei",
      specialty: "Cardiologist",
      condition: "cardiovascular",
      conditionName: "Cardiovascular Disease",
      experience: "21 years",
      patients: 7120,
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      languages: ["Mandarin", "English"],
      education: "Capital Medical University",
      about: "Expert in interventional cardiology and heart failure treatment.",
      location: "Beijing, China",
      consultationFee: 400,
      hospital: "Beijing Chaoyang Hospital",
    },
  ];

  const filterDoctorsByCondition = (userCondition) => {
    if (!userCondition) {
      // Show general practitioners if no condition specified
      const generalDoctors = allDoctors.filter(
        (doc) => doc.condition === "general",
      );
      setDoctors(generalDoctors);
      setFilteredDoctors(generalDoctors);
      return;
    }

    // Filter doctors matching user's condition OR general practitioners
    const matchedDoctors = allDoctors.filter(
      (doctor) =>
        doctor.condition === userCondition || doctor.condition === "general",
    );
    setDoctors(matchedDoctors);
    setFilteredDoctors(matchedDoctors);
  };

  const handleBookConsultation = (doctor) => {
    // Create a serializable copy of doctor without React components
    const serializableDoctor = {
      id: doctor.id,
      name: doctor.name,
      specialty: doctor.specialty,
      condition: doctor.condition,
      conditionName: doctor.conditionName,
      experience: doctor.experience,
      patients: doctor.patients,
      image: doctor.image,
      languages: doctor.languages,
      education: doctor.education,
      about: doctor.about,
      location: doctor.location,
      consultationFee: doctor.consultationFee,
      hospital: doctor.hospital,
    };

    // Store selected doctor data in localForage for the booking page
    localForage.setItem("selectedDoctor", JSON.stringify(serializableDoctor));
    localForage.setItem("consultationType", "new");

    // Navigate to booking page
    navigate("/booking", { state: { doctor: serializableDoctor } });
  };

  // Helper function to get icon component based on condition
  const getConditionIcon = (condition) => {
    switch (condition) {
      case "diabetes":
        return Droplet;
      case "sickleCell":
        return Heart;
      case "cancer":
        return Activity;
      case "cardiovascular":
        return Activity;
      default:
        return Stethoscope;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Find a Specialist
          </h1>
          <p className="text-gray-500 mt-1">
            {userData?.medicalCondition
              ? `Personalized doctors for your ${userData.medicalCondition === "sickleCell" ? "Sickle Cell" : userData.medicalCondition} condition`
              : "Complete your profile to see personalized doctor recommendations"}
          </p>
        </div>

        {/* Doctor Cards Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, index) => {
              const IconComponent = getConditionIcon(doctor.condition);
              return (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
                >
                  {/* Doctor Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <span className="text-xs font-semibold text-gray-900">
                        ${doctor.consultationFee}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Doctor Icon */}
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-green-600 font-medium">
                        {doctor.specialty}
                      </p>
                    </div>

                    {/* Experience & Patients */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {doctor.experience}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {doctor.patients}+ patients
                        </span>
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {doctor.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={() => handleBookConsultation(doctor)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition group-hover:shadow-md"
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Book Consultation
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No doctors available
            </h3>
            <p className="text-gray-500 mb-4">
              Please complete your profile with a medical condition to see
              relevant doctors.
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Update Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Consultation;
