// src/pages/Pharmacy.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  X,
  Plus,
  Minus,
  Pill,
  Package,
  Star,
  Truck,
  Shield,
  Clock,
  Info,
  CreditCard,
  Wallet,
  Copy,
  Check,
  AlertCircle,
  Bitcoin,
  Zap,
  Heart,
  Eye,
  TrendingUp,
  Sparkles,
  Building2,
  Award,
  FlaskConical,
  Microscope,
  Send,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import toast from "react-hot-toast";

const Pharmacy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [isDrugModalOpen, setIsDrugModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  // Premium specialized drugs - all prices $4000+
  const drugs = [
    {
      id: 1,
      name: "GLYCO-BLOCK XR",
      genericName: "Metformin-XR Extended Release",
      category: "diabetes",
      price: 4500,
      originalPrice: 5800,
      rating: 4.9,
      reviews: 234,
      description:
        "A revolutionary extended-release formulation of Metformin that provides 24-hour blood sugar control with minimal gastrointestinal side effects. Developed in collaboration with the Chinese Academy of Sciences, this breakthrough treatment utilizes patented nanoparticle technology for optimal absorption.",
      dosage: "500mg - 1000mg once daily",
      manufacturer: "Riverstone Pharma • CAS Partner",
      prescription: true,
      stock: 45,
      indication: "Type 2 Diabetes Management",
      clinicalTrials: "Phase 4 • 98% efficacy",
      fdaStatus: "CFDA Approved • NHC Certified",
      benefits: [
        "24-hour blood sugar control with once-daily dosing",
        "Patented nanoparticle technology for enhanced absorption",
        "90% reduction in gastrointestinal side effects",
        "Proven to reduce HbA1c by 2.5% in clinical trials",
      ],
      sideEffects: [
        "Mild nausea (first 3-5 days)",
        "Occasional headache",
        "Rare vitamin B12 deficiency with long-term use",
      ],
      research:
        "Joint research with Peking University Medical Center. Published in The Lancet Diabetes & Endocrinology, 2024.",
    },
    {
      id: 2,
      name: "INSULARIS GLARGINE",
      genericName: "Insulin Glargine Biosimilar",
      category: "diabetes",
      price: 12500,
      originalPrice: 15800,
      rating: 4.9,
      reviews: 187,
      description:
        "Next-generation long-acting insulin analog with ultra-stable glucose control. Utilizes Riverstone's proprietary crystallization technology for consistent 24-hour coverage without peaks.",
      dosage: "10-80 units once daily",
      manufacturer: "Riverstone Pharma",
      prescription: true,
      stock: 28,
      indication: "Type 1 & Type 2 Diabetes",
      clinicalTrials: "Phase 4 • 99.2% bioequivalence",
      fdaStatus: "CFDA Approved",
      benefits: [
        "Ultra-stable 24-hour glucose control",
        "Reduced risk of nocturnal hypoglycemia by 45%",
        "Once-daily dosing convenience",
        "Proprietary crystallization technology",
      ],
      sideEffects: [
        "Mild injection site reactions",
        "Rare hypoglycemia if dose not adjusted",
        "Weight gain (average 2-3kg first year)",
      ],
      research:
        "Developed at Riverstone Research Center Beijing. Published in Diabetes Care, 2024.",
    },
    {
      id: 3,
      name: "HYDROXYUREA-XR",
      genericName: "Hydroxycarbamide Extended Release",
      category: "sickleCell",
      price: 8750,
      originalPrice: 10900,
      rating: 4.8,
      reviews: 156,
      description:
        "Advanced extended-release formulation of Hydroxyurea specifically optimized for sickle cell disease management.",
      dosage: "15-20mg/kg once daily",
      manufacturer: "Riverstone Pharma",
      prescription: true,
      stock: 32,
      indication: "Sickle Cell Disease Management",
      clinicalTrials: "Phase 3 • 62% crisis reduction",
      fdaStatus: "CFDA Approved",
      benefits: [
        "60% reduction in painful crises",
        "45% decrease in hospitalizations",
        "Improved hemoglobin F levels",
        "Once-daily dosing with extended release",
      ],
      sideEffects: [
        "Mild hair thinning (reversible)",
        "Skin hyperpigmentation",
        "Monitor blood counts monthly",
      ],
      research:
        "Breakthrough therapy designation. Published in Blood Journal, 2023.",
    },
    {
      id: 4,
      name: "ERITROPOX",
      genericName: "Erythropoiesis Stimulating Agent",
      category: "sickleCell",
      price: 15800,
      originalPrice: 19800,
      rating: 4.9,
      reviews: 98,
      description:
        "Novel erythropoiesis-stimulating agent that boosts red blood cell production and reduces transfusion dependency.",
      dosage: "450mcg weekly subcutaneous",
      manufacturer: "Riverstone Pharma",
      prescription: true,
      stock: 15,
      indication: "Sickle Cell Anemia",
      clinicalTrials: "Phase 3 • 78% response rate",
      fdaStatus: "Breakthrough Therapy Designation",
      benefits: [
        "Reduces transfusion dependency by 72%",
        "Increases hemoglobin by 2.5g/dL average",
        "Improves exercise tolerance",
        "Monthly dosing schedule",
      ],
      sideEffects: [
        "Mild flu-like symptoms after injection",
        "Monitor blood pressure",
        "Rare injection site reactions",
      ],
      research:
        "Gene therapy breakthrough. Published in New England Journal of Medicine, 2024.",
    },
    {
      id: 5,
      name: "CARDIO-REVERSE",
      genericName: "PCSK9 Inhibitor",
      category: "cardiovascular",
      price: 22500,
      originalPrice: 28900,
      rating: 5.0,
      reviews: 234,
      description:
        "Revolutionary PCSK9 inhibitor that reduces LDL cholesterol by up to 85% and reverses arterial plaque buildup.",
      dosage: "140mg bi-weekly subcutaneous",
      manufacturer: "Riverstone Pharma",
      prescription: true,
      stock: 42,
      indication: "Familial Hypercholesterolemia",
      clinicalTrials: "Phase 4 • 42% plaque reduction",
      fdaStatus: "CFDA Priority Review",
      benefits: [
        "85% LDL cholesterol reduction",
        "42% plaque regression in 18 months",
        "Reduced MACE by 65%",
        "Bi-weekly dosing",
      ],
      sideEffects: [
        "Mild injection site reactions",
        "Rare flu-like symptoms",
        "Upper respiratory infections (3%)",
      ],
      research: "Landmark study published in Circulation, 2024.",
    },
    {
      id: 6,
      name: "PLAQUE-X",
      genericName: "Colchicine Extended Release",
      category: "cardiovascular",
      price: 4200,
      originalPrice: 5200,
      rating: 4.8,
      reviews: 412,
      description:
        "Advanced anti-inflammatory therapy for atherosclerosis. Reduces plaque inflammation and stabilizes vulnerable plaques.",
      dosage: "0.5mg twice daily",
      manufacturer: "Riverstone Pharma",
      prescription: true,
      stock: 124,
      indication: "Chronic Coronary Disease",
      clinicalTrials: "Phase 4 • 38% MACE reduction",
      fdaStatus: "CFDA Approved",
      benefits: [
        "38% reduction in cardiovascular events",
        "Stabilizes vulnerable plaques",
        "Reduces inflammatory markers",
        "Well-tolerated long-term",
      ],
      sideEffects: [
        "Mild gastrointestinal (first week)",
        "Monitor renal function",
        "Drug interactions with statins",
      ],
      research: "COLCOT trial extension. Published in JACC, 2024.",
    },
    {
      id: 7,
      name: "IMMUNO-FORCE",
      genericName: "Pembrolizumab Biosimilar",
      category: "cancer",
      price: 42500,
      originalPrice: 52000,
      rating: 4.9,
      reviews: 187,
      description:
        "Premium immunotherapy targeting PD-1 checkpoint. Unleashes the body's immune system to fight cancer cells.",
      dosage: "200mg IV every 3 weeks",
      manufacturer: "Riverstone Pharma",
      prescription: true,
      stock: 8,
      indication: "Multiple Cancer Indications",
      clinicalTrials: "Phase 4 • 45% response rate",
      fdaStatus: "CFDA Approved",
      benefits: [
        "45% objective response rate",
        "Durable long-term remission",
        "Effective across 15+ cancer types",
        "Less toxic than chemotherapy",
      ],
      sideEffects: [
        "Immune-related adverse events",
        "Fatigue (30%)",
        "Skin rash (25%)",
        "Monitor thyroid function",
      ],
      research: "Keynote trials. Published in Lancet Oncology, 2024.",
    },
    {
      id: 8,
      name: "TARGET-CAR T",
      genericName: "CAR-T Cell Therapy",
      category: "cancer",
      price: 185000,
      originalPrice: 245000,
      rating: 5.0,
      reviews: 56,
      description:
        "Breakthrough CAR-T cell therapy for B-cell malignancies. Genetically engineers patient's own T-cells to recognize and destroy cancer cells.",
      dosage: "Single infusion after lymphodepletion",
      manufacturer: "Riverstone Pharma",
      prescription: true,
      stock: 3,
      indication: "B-cell Lymphoma, Leukemia",
      clinicalTrials: "Phase 3 • 92% remission rate",
      fdaStatus: "CFDA Approved",
      benefits: [
        "92% complete remission rate",
        "Single-dose curative potential",
        "Personalized cell therapy",
        "Long-term cancer-free survival",
      ],
      sideEffects: [
        "Cytokine release syndrome (manageable)",
        "B-cell aplasia",
        "Neurologic events (reversible)",
      ],
      research:
        "Revolutionary CAR-T platform. Published in Nature Medicine, 2024.",
    },
  ];

  const categories = [
    { id: "all", name: "All Therapies", icon: FlaskConical },
    { id: "diabetes", name: "Diabetes", icon: TrendingUp },
    { id: "sickleCell", name: "Sickle Cell", icon: Heart },
    { id: "cardiovascular", name: "Cardiovascular", icon: Zap },
    { id: "cancer", name: "Oncology", icon: Microscope },
  ];

  const filteredDrugs = drugs.filter((drug) => {
    const matchesSearch =
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.genericName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || drug.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (drug) => {
    const existingItem = cart.find((item) => item.id === drug.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === drug.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...drug, quantity: 1 }]);
    }
    toast.success(`${drug.name} added to cart`);
  };

  const removeFromCart = (drugId) => {
    setCart(cart.filter((item) => item.id !== drugId));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (drugId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === drugId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const handleCheckout = () => {
    setCheckoutStep(2);
  };

  const handleBackToCart = () => {
    setCheckoutStep(1);
  };

  const handleCryptoPayment = () => {
    setCheckoutStep(3);
  };

  const handlePaymentSent = () => {
    setShowPaymentSuccess(true);
    setTimeout(() => {
      setShowPaymentSuccess(false);
      setIsCartOpen(false);
      setCart([]);
      setCheckoutStep(1);
      toast.success(
        "Order placed successfully! Our team will verify payment shortly.",
      );
    }, 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Wallet address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e759F3b3b1a";
  const usdtAmount = getCartTotal().toFixed(2);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Riverstone Advanced Therapeutics
              </h1>
              <p className="text-green-100 text-lg">
                Premium breakthrough medications • CFDA Approved • Global
                Shipping
              </p>
              <div className="flex items-center gap-4 mt-4 text-sm text-green-100">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" /> CFDA Approved
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" /> Research-Backed
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4" /> Global Secure Shipping
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl hover:bg-white/30 transition flex items-center gap-3"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="font-medium">Cart</span>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 text-green-900 text-sm font-bold rounded-full flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search breakthrough therapies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 shadow-sm"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDrugs.map((drug, index) => (
            <motion.div
              key={drug.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Image Area */}
              <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="w-24 h-24 rounded-2xl bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {drug.category === "cancer" ? (
                    <Microscope className="w-12 h-12 text-green-600" />
                  ) : drug.category === "cardiovascular" ? (
                    <Heart className="w-12 h-12 text-red-500" />
                  ) : (
                    <FlaskConical className="w-12 h-12 text-green-600" />
                  )}
                </div>
                <span className="absolute top-3 right-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg shadow-sm">
                  Rx Required
                </span>
                {drug.originalPrice && (
                  <span className="absolute bottom-3 left-3 px-2 py-1 bg-green-600 text-white text-xs font-bold rounded-lg">
                    Save ${(drug.originalPrice - drug.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {drug.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {drug.genericName}
                  </p>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">
                    {drug.rating}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({drug.reviews})
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${drug.price.toLocaleString()}
                    </span>
                    {drug.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${drug.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Limited stock: {drug.stock} units
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedDrug(drug);
                      setIsDrugModalOpen(true);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    Details
                  </button>
                  <button
                    onClick={() => addToCart(drug)}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDrugs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No therapies found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </div>

      {/* Drug Details Modal - Screen Style */}
      <AnimatePresence>
        {isDrugModalOpen && selectedDrug && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsDrugModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FlaskConical className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedDrug.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedDrug.genericName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrugModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Price & Status Bar */}
                <div className="bg-gray-50 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Therapy Cost</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ${selectedDrug.price.toLocaleString()}
                      </span>
                      {selectedDrug.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${selectedDrug.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-xs text-amber-700">
                        {selectedDrug.clinicalTrials}
                      </p>
                    </div>
                    <div className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-xs text-green-700">
                        {selectedDrug.fdaStatus}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-green-600" />
                    Therapy Overview
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedDrug.description}
                  </p>
                </div>

                {/* Key Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Indication</p>
                    <p className="text-gray-900 font-medium">
                      {selectedDrug.indication}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Dosage</p>
                    <p className="text-gray-900 font-medium">
                      {selectedDrug.dosage}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Manufacturer</p>
                    <p className="text-gray-900 font-medium text-sm">
                      {selectedDrug.manufacturer}
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    Therapeutic Benefits
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedDrug.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-600 text-sm"
                      >
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Side Effects */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    Safety Profile
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedDrug.sideEffects.map((effect, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-600 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Research */}
                <div className="bg-blue-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Microscope className="w-5 h-5 text-blue-600" />
                    Clinical Research
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {selectedDrug.research}
                  </p>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={() => {
                    addToCart(selectedDrug);
                    setIsDrugModalOpen(false);
                  }}
                  className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart - ${selectedDrug.price.toLocaleString()}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Modal - Screen Style with Checkout Flow */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => {
              if (!showPaymentSuccess) {
                setIsCartOpen(false);
                setCheckoutStep(1);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Back Button for Checkout */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {checkoutStep > 1 && (
                    <button
                      onClick={handleBackToCart}
                      className="p-2 hover:bg-gray-100 rounded-xl transition"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-500" />
                    </button>
                  )}
                  <h2 className="text-xl font-bold text-gray-900">
                    {checkoutStep === 1
                      ? "Your Cart"
                      : checkoutStep === 2
                        ? "Select Payment Method"
                        : "Complete Payment"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    if (!showPaymentSuccess) {
                      setIsCartOpen(false);
                      setCheckoutStep(1);
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                {/* Step 1: Cart */}
                {checkoutStep === 1 && (
                  <>
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <ShoppingCart className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500">Your cart is empty</p>
                        <button
                          onClick={() => setIsCartOpen(false)}
                          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
                        >
                          Browse Therapies
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                          {cart.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                            >
                              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <FlaskConical className="w-6 h-6 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-900">
                                  {item.name}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  ${item.price.toLocaleString()}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-sm font-medium text-gray-900">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-gray-200 pt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="text-gray-900 font-medium">
                              ${getCartTotal().toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">
                              Secure Shipping
                            </span>
                            <span className="text-green-600 font-medium">
                              Included
                            </span>
                          </div>
                          <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                            <span className="text-gray-900">Total</span>
                            <span className="text-green-600">
                              ${getCartTotal().toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={handleCheckout}
                          className="w-full mt-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold"
                        >
                          Proceed to Checkout
                        </button>
                      </>
                    )}
                  </>
                )}

                {/* Step 2: Payment Method Selection */}
                {checkoutStep === 2 && (
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-amber-800">
                            Payment Notice
                          </p>
                          <p className="text-xs text-amber-700 mt-1">
                            Due to international sanctions, traditional payment
                            methods are unavailable. Please use cryptocurrency
                            for payment.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-gray-100 rounded-xl p-4 opacity-50">
                      <div className="flex items-center gap-3 mb-3">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-400 font-medium">
                          Card Payment
                        </span>
                        <span className="text-xs text-gray-400 ml-auto">
                          Unavailable
                        </span>
                      </div>
                    </div>

                    <div className="border-2 border-gray-100 rounded-xl p-4 opacity-50">
                      <div className="flex items-center gap-3 mb-3">
                        <Building2 className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-400 font-medium">
                          Bank Transfer
                        </span>
                        <span className="text-xs text-gray-400 ml-auto">
                          Unavailable
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleCryptoPayment}
                      className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition font-semibold flex items-center justify-center gap-3"
                    >
                      <Bitcoin className="w-5 h-5" />
                      Pay with Cryptocurrency (USDT)
                    </button>
                  </div>
                )}

                {/* Step 3: Crypto Payment */}
                {checkoutStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">
                            Payment Instructions
                          </p>
                          <p className="text-xs text-blue-700 mt-1">
                            Send exactly{" "}
                            <strong className="font-bold">
                              {usdtAmount} USDT
                            </strong>{" "}
                            (ERC20) to the wallet address below.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <div className="inline-flex items-center justify-center w-36 h-36 bg-white rounded-2xl shadow-md mb-4 mx-auto border border-gray-200">
                        <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                          <Bitcoin className="w-12 h-12 text-yellow-400" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">
                        Scan QR code with your wallet
                      </p>
                      <div className="bg-white border border-gray-200 p-3 rounded-xl flex items-center justify-between gap-2">
                        <code className="text-xs text-gray-700 font-mono break-all flex-1">
                          {walletAddress}
                        </code>
                        <button
                          onClick={() => copyToClipboard(walletAddress)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                      <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-green-600" />
                        How to complete your payment:
                      </h4>
                      <ol className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                            1
                          </span>
                          <span>
                            Purchase USDT on your preferred exchange (Binance,
                            OKX, Bybit, Coinbase)
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                            2
                          </span>
                          <span>
                            Copy the wallet address above{" "}
                            <strong className="font-semibold text-red-600">
                              (ERC20 network only)
                            </strong>
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                            3
                          </span>
                          <span>
                            Send exactly{" "}
                            <strong className="font-bold text-green-600">
                              {usdtAmount} USDT
                            </strong>{" "}
                            to the address
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                            4
                          </span>
                          <span>
                            Click "I have sent the payment" after sending
                          </span>
                        </li>
                      </ol>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                      <p className="text-xs text-red-700 font-medium">
                        ⚠️ <strong>Important:</strong> Send only on{" "}
                        <strong className="underline">ERC20 network</strong>.
                        Sending on BEP20, TRC20, or other networks will result
                        in permanent loss of funds.
                      </p>
                    </div>

                    <button
                      onClick={handlePaymentSent}
                      className="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />I have sent the payment
                    </button>
                  </div>
                )}

                {/* Payment Success Overlay */}
                {showPaymentSuccess && (
                  <div className="fixed inset-0 bg-green-600/95 flex items-center justify-center z-50">
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4 shadow-2xl"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Payment Received!
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Your therapy order has been placed. Our team will verify
                        payment shortly.
                      </p>
                      <div className="animate-pulse text-sm text-green-600">
                        Processing order...
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Pharmacy;
