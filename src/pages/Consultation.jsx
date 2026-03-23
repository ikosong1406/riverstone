// src/pages/Consultation.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  MessageCircle,
  X,
  Send,
  User,
  Calendar,
  Clock,
  Star,
  Video,
  Phone,
  MessageSquare,
  Pill,
  Heart,
  Droplet,
  Activity,
  ChevronRight,
  Bot,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const Consultation = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [userCondition, setUserCondition] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  // Load user data on mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserDetails(user);

          // Determine condition type
          let condition = user.medicalCondition || "general";
          if (condition === "sickleCell") condition = "sickleCell";
          if (condition === "cardiovascular") condition = "cardiovascular";
          setUserCondition(condition);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    loadUserData();
  }, []);

  // Doctors data based on condition
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Endocrinologist",
      condition: "diabetes",
      conditionName: "Diabetes",
      icon: Droplet,
      experience: "12 years",
      rating: 4.9,
      patients: 2840,
      availability: "Today",
      nextSlot: "2:30 PM",
      image: "/doctors/diabetes-doctor.jpg",
      languages: ["English", "Mandarin"],
      education: "Harvard Medical School",
      about:
        "Specialist in diabetes management and insulin therapy with over 12 years of experience.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Hematologist",
      condition: "sickleCell",
      conditionName: "Sickle Cell Disease",
      icon: Heart,
      experience: "15 years",
      rating: 4.8,
      patients: 1250,
      availability: "Today",
      nextSlot: "3:00 PM",
      image: "/doctors/sicklecell-doctor.jpg",
      languages: ["English", "Mandarin", "Cantonese"],
      education: "Peking University Medical School",
      about:
        "Leading expert in gene therapy and sickle cell treatment with published research.",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Oncologist",
      condition: "cancer",
      conditionName: "Cancer",
      icon: Activity,
      experience: "18 years",
      rating: 4.9,
      patients: 3420,
      availability: "Today",
      nextSlot: "4:15 PM",
      image: "/doctors/cancer-doctor.jpg",
      languages: ["English", "Spanish"],
      education: "Johns Hopkins University",
      about: "Specialized in immunotherapy and targeted cancer treatments.",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Cardiologist",
      condition: "cardiovascular",
      conditionName: "Cardiovascular Disease",
      icon: Activity,
      experience: "20 years",
      rating: 5.0,
      patients: 5210,
      availability: "Today",
      nextSlot: "1:45 PM",
      image: "/doctors/cardio-doctor.jpg",
      languages: ["English"],
      education: "Stanford University",
      about:
        "Expert in non-invasive cardiology and revolutionary plaque reversal treatments.",
    },
    {
      id: 5,
      name: "Dr. Lisa Wang",
      specialty: "General Practitioner",
      condition: "general",
      conditionName: "General Health",
      icon: Stethoscope,
      experience: "8 years",
      rating: 4.7,
      patients: 1850,
      availability: "Today",
      nextSlot: "5:00 PM",
      image: "/doctors/general-doctor.jpg",
      languages: ["English", "Mandarin"],
      education: "Fudan University",
      about: "Comprehensive primary care and preventive medicine specialist.",
    },
  ];

  // Filter doctors based on user condition
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.condition === userCondition || doctor.condition === "general",
  );

  // Medication recommendations based on condition
  const getMedicationRecommendations = (condition) => {
    const recommendations = {
      diabetes: [
        {
          name: "Metformin",
          dosage: "500mg twice daily",
          description: "First-line medication for type 2 diabetes",
          price: "₹45",
          prescription: true,
        },
        {
          name: "Insulin Glargine",
          dosage: "10 units at bedtime",
          description: "Long-acting insulin for blood sugar control",
          price: "₹320",
          prescription: true,
        },
        {
          name: "Glucose Monitoring Strips",
          dosage: "50 strips",
          description: "Monitor blood glucose levels",
          price: "₹280",
          prescription: false,
        },
        {
          name: "Vitamin B12",
          dosage: "500mcg daily",
          description: "Prevents deficiency common in diabetic patients",
          price: "₹95",
          prescription: false,
        },
      ],
      sickleCell: [
        {
          name: "Hydroxyurea",
          dosage: "15mg/kg daily",
          description: "Reduces painful crises and complications",
          price: "₹450",
          prescription: true,
        },
        {
          name: "Folic Acid",
          dosage: "1mg daily",
          description: "Essential for red blood cell production",
          price: "₹25",
          prescription: false,
        },
        {
          name: "Pain Relief Tablets",
          dosage: "As needed",
          description: "For managing pain during crises",
          price: "₹120",
          prescription: true,
        },
        {
          name: "Zinc Supplements",
          dosage: "25mg daily",
          description: "Boosts immune system function",
          price: "₹85",
          prescription: false,
        },
      ],
      cancer: [
        {
          name: "Immunotherapy Drugs",
          dosage: "As prescribed",
          description: "Targeted cancer treatment",
          price: "₹2500",
          prescription: true,
        },
        {
          name: "Anti-nausea Medication",
          dosage: "As needed",
          description: "Manages treatment side effects",
          price: "₹180",
          prescription: true,
        },
        {
          name: "High Protein Supplements",
          dosage: "Twice daily",
          description: "Maintains strength during treatment",
          price: "₹450",
          prescription: false,
        },
        {
          name: "Pain Management",
          dosage: "As prescribed",
          description: "Comfort care medication",
          price: "₹210",
          prescription: true,
        },
      ],
      cardiovascular: [
        {
          name: "Atorvastatin",
          dosage: "20mg daily",
          description: "Lowers cholesterol and reduces plaque",
          price: "₹95",
          prescription: true,
        },
        {
          name: "Aspirin",
          dosage: "75mg daily",
          description: "Prevents blood clots",
          price: "₹15",
          prescription: false,
        },
        {
          name: "Blood Pressure Monitor",
          dosage: "Home device",
          description: "Track BP regularly",
          price: "₹1250",
          prescription: false,
        },
        {
          name: "Omega-3 Supplements",
          dosage: "1000mg daily",
          description: "Heart health support",
          price: "₹180",
          prescription: false,
        },
      ],
      general: [
        {
          name: "Multivitamins",
          dosage: "Once daily",
          description: "Overall health support",
          price: "₹95",
          prescription: false,
        },
        {
          name: "Vitamin D3",
          dosage: "2000 IU daily",
          description: "Immune system support",
          price: "₹65",
          prescription: false,
        },
        {
          name: "Probiotics",
          dosage: "Once daily",
          description: "Gut health maintenance",
          price: "₹150",
          prescription: false,
        },
      ],
    };

    return recommendations[condition] || recommendations.general;
  };

  // Auto-response messages
  const getAutoResponse = (userMessage, condition) => {
    const userMessageLower = userMessage.toLowerCase();
    const medications = getMedicationRecommendations(condition);

    if (
      userMessageLower.includes("medication") ||
      userMessageLower.includes("medicine") ||
      userMessageLower.includes("drug")
    ) {
      return {
        text: `Based on your condition, I recommend the following medications:\n\n${medications.map((m) => `• ${m.name} (${m.dosage}): ${m.description} - ${m.price}`).join("\n")}\n\n${medications.some((m) => m.prescription) ? "\n⚠️ Some medications require a prescription. Would you like me to prescribe these for you?" : "\nAll these are available in our pharmacy with free shipping!"}`,
        type: "medication",
      };
    }

    if (
      userMessageLower.includes("prescription") ||
      userMessageLower.includes("prescribe")
    ) {
      return {
        text: `I've prepared your prescription for:\n\n${medications
          .filter((m) => m.prescription)
          .map((m) => `• ${m.name} - ${m.dosage}`)
          .join(
            "\n",
          )}\n\nYou can now order these from our pharmacy with free delivery. Would you like me to add them to your cart?`,
        type: "prescription",
      };
    }

    if (
      userMessageLower.includes("pharmacy") ||
      userMessageLower.includes("order") ||
      userMessageLower.includes("buy")
    ) {
      return {
        text: `Great! You can order these medications from our inbuilt pharmacy:\n\n${medications.map((m) => `• ${m.name} (${m.price})`).join("\n")}\n\nAll orders come with FREE shipping to your location. Click "Order Now" to add to cart and proceed to checkout.`,
        type: "pharmacy",
      };
    }

    if (
      userMessageLower.includes("side effect") ||
      userMessageLower.includes("safe")
    ) {
      return {
        text: `All recommended medications are FDA-approved and CFDA-certified. Common side effects are mild and temporary. For detailed information about each medication, you can check the product page in our pharmacy. Would you like me to explain any specific medication?`,
        type: "info",
      };
    }

    if (
      userMessageLower.includes("dosage") ||
      userMessageLower.includes("take")
    ) {
      return {
        text: `Here are the recommended dosages:\n\n${medications.map((m) => `• ${m.name}: ${m.dosage}`).join("\n")}\n\nPlease follow the dosage instructions carefully. If you have any concerns, consult with your doctor before starting any new medication.`,
        type: "info",
      };
    }

    if (userMessageLower.includes("hello") || userMessageLower.includes("hi")) {
      return {
        text: `Hello! I'm ${selectedDoctor?.name.split(" ")[0]}, your ${selectedDoctor?.specialty}. I'm here to help you manage your ${condition === "diabetes" ? "diabetes" : condition === "sickleCell" ? "sickle cell condition" : condition === "cancer" ? "cancer treatment" : condition === "cardiovascular" ? "cardiovascular health" : "health"}. How can I assist you today?`,
        type: "greeting",
      };
    }

    return {
      text: `I understand your concern. Based on your condition (${condition === "diabetes" ? "Diabetes" : condition === "sickleCell" ? "Sickle Cell Disease" : condition === "cancer" ? "Cancer" : condition === "cardiovascular" ? "Cardiovascular Disease" : "General Health"}), I recommend starting with the prescribed medication plan. Would you like me to show you the recommended medications? You can ask me about:\n\n• Available medications\n• Prescription details\n• How to order from pharmacy\n• Side effects\n• Dosage information`,
      type: "info",
    };
  };

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsChatOpen(true);

    // Initial welcome message from doctor
    const welcomeMessage = {
      id: Date.now(),
      text: `Hello! I'm ${doctor.name}, your ${doctor.specialty}. Based on your profile, I can see you're managing ${doctor.conditionName}. How can I help you with your treatment today?`,
      sender: "doctor",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([welcomeMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // Show typing indicator
    setIsTyping(true);

    // Auto-response after delay
    setTimeout(() => {
      const response = getAutoResponse(inputMessage, selectedDoctor?.condition);
      const doctorResponse = {
        id: Date.now() + 1,
        text: response.text,
        sender: "doctor",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: response.type,
      };
      setMessages((prev) => [...prev, doctorResponse]);
      setIsTyping(false);

      // If response includes medication recommendations, show toast
      if (response.type === "medication" || response.type === "prescription") {
        toast.success(
          "Medication recommendations ready! You can order from pharmacy.",
        );
      }
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOrderNow = () => {
    toast.success("Redirecting to pharmacy with your cart...");
    setTimeout(() => {
      window.location.href = "/pharmacy";
    }, 1500);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleDoctorClick(doctor)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="p-6">
                {/* Doctor Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                    <doctor.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-900">
                      {doctor.rating}
                    </span>
                  </div>
                </div>

                {/* Doctor Info */}
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {doctor.name}
                </h3>
                <p className="text-sm text-green-600 font-medium mb-2">
                  {doctor.specialty}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  {doctor.experience} experience • {doctor.patients}+ patients
                </p>

                {/* Availability */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">
                    Available {doctor.availability} at {doctor.nextSlot}
                  </span>
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

                {/* Consult Button */}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition group-hover:shadow-md">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Start Consultation
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No doctors available
            </h3>
            <p className="text-gray-500">
              Please complete your profile with a medical condition to see
              relevant doctors.
            </p>
          </div>
        )}
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsChatOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-green-600 to-emerald-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <selectedDoctor.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {selectedDoctor.name}
                    </h3>
                    <p className="text-green-100 text-xs">
                      {selectedDoctor.specialty} • {selectedDoctor.experience}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}
                    >
                      <div
                        className={`flex items-start gap-2 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === "user"
                              ? "bg-green-600"
                              : "bg-gray-300"
                          }`}
                        >
                          {message.sender === "user" ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <div
                            className={`rounded-lg p-3 ${
                              message.sender === "user"
                                ? "bg-green-600 text-white"
                                : "bg-white border border-gray-200 text-gray-800"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">
                              {message.text}
                            </p>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Order Button */}
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={handleOrderNow}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                >
                  <Pill className="w-4 h-4" />
                  Order Recommended Medications from Pharmacy
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about medications, prescription, or treatment..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm"
                    rows="2"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  💡 Try asking: "What medications do I need?" or "Can I order
                  from pharmacy?"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Consultation;
