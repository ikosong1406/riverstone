// src/pages/Booking.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  MapPin,
  Award,
  CreditCard,
  ChevronRight,
  CheckCircle,
  ArrowLeft,
  Video,
  Phone,
  MessageSquare,
  Banknote,
  Bitcoin,
  Copy,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import localForage from "localforage";
import Api from "../components/Api";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [consultationType, setConsultationType] = useState("video");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  // USDT ERC20 Wallet Address
  const usdtWalletAddress = "0x7520815008097D596636e1Ca7F6caEe719A4F6AC";

  const availableTimeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  // Get available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  useEffect(() => {
    const loadData = async () => {
      // Get doctor from location state or localForage
      let selectedDoctor = location.state?.doctor;

      if (!selectedDoctor) {
        const storedDoctor = await localForage.getItem("selectedDoctor");
        if (storedDoctor) {
          selectedDoctor = JSON.parse(storedDoctor);
        }
      }

      if (selectedDoctor) {
        setDoctor(selectedDoctor);
      } else {
        toast.error("No doctor selected");
        navigate("/consultation");
      }

      // Get user data
      const token = await localForage.getItem("token");
      if (token) {
        try {
          const response = await axios.post(`${Api}/getUser`, { token });
          if (response.data.success) {
            setUserData(response.data.user);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    loadData();
  }, [location, navigate]);

  const handleBooking = async () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }
    if (!selectedTime) {
      toast.error("Please select a time");
      return;
    }
    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }

    // Only crypto payment is available due to international sanctions
    if (selectedPayment === "crypto") {
      setShowPaymentModal(true);
    } else {
      toast.error(
        "Due to international sanctions, only cryptocurrency payments are accepted at this time. Please select Crypto payment.",
      );
    }
  };

  const handlePaymentConfirmation = async () => {
    setIsPaymentProcessing(true);
    const loadingToast = toast.loading("Verifying payment...");

    try {
      const token = await localForage.getItem("token");

      if (!token) {
        toast.error("Please login to continue");
        navigate("/login");
        return;
      }

      // Prepare booking data
      const bookingData = {
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        date: selectedDate,
        time: selectedTime,
        consultationType: consultationType,
        fee: doctor.consultationFee,
        paymentMethod: "crypto",
        paymentStatus: "pending",
        patientName:
          `${userData?.firstname || ""} ${userData?.lastname || ""}`.trim(),
        patientEmail: userData?.email,
        medicalCondition: userData?.medicalCondition,
      };

      // Send booking to API
      const response = await axios.post(`${Api}/bookings/create`, {
        token,
        bookingData,
      });

      if (response.data.success) {
        toast.success("Payment verified! Consultation booked successfully!", {
          id: loadingToast,
        });

        // Update user's hasBooked status
        await localForage.setItem("hasBooked", true);

        // Clear selected doctor from storage
        await localForage.removeItem("selectedDoctor");

        // Close modal and redirect
        setShowPaymentModal(false);

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        throw new Error(response.data.message || "Booking failed");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || "Failed to verify payment");
      console.error("Booking error:", error);
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(usdtWalletAddress);
      toast.success("Wallet address copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy address");
    }
  };

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const availableDates = getAvailableDates();

  // Payment options with disabled state for non-crypto
  const paymentOptions = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
      disabled: true,
      disabledReason: "Currently unavailable due to international sanctions",
    },
    {
      id: "transfer",
      name: "Bank Transfer",
      icon: Banknote,
      description: "Wire transfer from your bank account",
      disabled: true,
      disabledReason: "Currently unavailable due to international sanctions",
    },
    {
      id: "crypto",
      name: "Cryptocurrency (USDT)",
      icon: Bitcoin,
      description: "Pay with USDT on ERC20 network",
      disabled: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/consultation")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Doctors</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Consultation Details
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-green-600">{doctor.specialty}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {doctor.experience} experience
                  </p>
                </div>
              </div>

              {/* Consultation Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Consultation Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setConsultationType("chat")}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition ${
                      consultationType === "chat"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-green-300 text-gray-600"
                    }`}
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-xs font-medium">Chat</span>
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Date
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {availableDates.map((date) => {
                    const dateStr = date.toISOString().split("T")[0];
                    const isSelected = selectedDate === dateStr;
                    return (
                      <button
                        key={dateStr}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`p-3 rounded-lg border text-center transition ${
                          isSelected
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-green-300 text-gray-700"
                        }`}
                      >
                        <p className="text-xs font-medium">
                          {date.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </p>
                        <p className="text-sm font-bold mt-1">
                          {date.getDate()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {date.toLocaleDateString("en-US", { month: "short" })}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Time
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {availableTimeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 rounded-lg border text-center transition ${
                        selectedTime === time
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 hover:border-green-300 text-gray-700"
                      }`}
                    >
                      <Clock className="w-3 h-3 mx-auto mb-1" />
                      <span className="text-xs">{time}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-3">
                  {paymentOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        !option.disabled && setSelectedPayment(option.id)
                      }
                      disabled={option.disabled}
                      className={`w-full flex items-center gap-4 p-4 rounded-lg border transition ${
                        selectedPayment === option.id
                          ? "border-green-500 bg-green-50"
                          : option.disabled
                            ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                            : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          selectedPayment === option.id
                            ? "bg-green-100"
                            : option.disabled
                              ? "bg-gray-100"
                              : "bg-gray-100"
                        }`}
                      >
                        <option.icon
                          className={`w-5 h-5 ${
                            selectedPayment === option.id
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-gray-900">
                          {option.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {option.description}
                        </p>
                        {option.disabled && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {option.disabledReason}
                          </p>
                        )}
                      </div>
                      {selectedPayment === option.id && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Confirm Booking - ${doctor.consultationFee}
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* Booking Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                Booking Summary
              </h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Consultation Fee</span>
                  <span className="font-medium text-gray-900">
                    ${doctor.consultationFee}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Platform Fee</span>
                  <span className="font-medium text-gray-900">$0</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-green-600">
                      ${doctor.consultationFee}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-3 mb-4 border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-xs font-medium text-yellow-700">
                    Payment Notice:
                  </span>
                </div>
                <p className="text-xs text-yellow-600">
                  Due to international sanctions, only cryptocurrency payments
                  are accepted at this time. Please select Crypto (USDT) as your
                  payment method.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">
                    What's included:
                  </span>
                </div>
                <ul className="space-y-1 text-xs text-green-600">
                  <li>• 30-minute consultation</li>
                  <li>• Digital prescription</li>
                  <li>• Follow-up notes</li>
                  <li>• 24/7 chat support</li>
                </ul>
              </div>

              <p className="text-xs text-gray-400 text-center">
                You can reschedule or cancel up to 24 hours before appointment
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bitcoin className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Crypto Payment
                </h3>
                <p className="text-sm text-gray-500">
                  Complete your payment using USDT (ERC20)
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Amount to Pay:
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    ${doctor.consultationFee} USDT
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Network:
                  </span>
                  <span className="text-sm text-gray-900">ERC20</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Token:
                  </span>
                  <span className="text-sm text-gray-900">USDT</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send payment to this wallet address:
                </label>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <code className="flex-1 text-xs text-gray-700 break-all">
                    {usdtWalletAddress}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-gray-200 rounded-lg transition"
                    title="Copy address"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Important: Send only USDT on ERC20 network to this address
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePaymentConfirmation}
                  disabled={isPaymentProcessing}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isPaymentProcessing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />I have made payment
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center mt-4">
                Payment will be verified within 5-10 minutes. You'll receive a
                confirmation email.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Booking;
