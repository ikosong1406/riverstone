// src/pages/LandingPage.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Pill,
  Heart,
  Shield,
  Truck,
  Microscope,
  ArrowRight,
  Star,
  Clock,
  Users,
  Award,
  ChevronRight,
  Droplet,
  Activity,
  Dna,
  HeartPulse,
  FlaskConical,
  Calendar,
  ShoppingBag,
  MessageCircle,
  CheckCircle,
  Globe,
  Languages,
  Building2,
  BadgeCheck,
  Trophy,
  Medal,
  Sparkles,
  Verified,
  Landmark,
  ScrollText,
  Gem,
} from "lucide-react";

const LandingPage = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [translationProgress, setTranslationProgress] = useState(0);
  const [currentText, setCurrentText] = useState("正在加载...");

  // Simulate translation process
  useEffect(() => {
    const translations = [
      { zh: "正在加载...", en: "Loading..." },
      { zh: "初始化系统", en: "Initializing system" },
      { zh: "加载医疗数据", en: "Loading medical data" },
      { zh: "同步研究数据库", en: "Syncing research database" },
      { zh: "准备您的健康体验", en: "Preparing your health experience" },
      { zh: "翻译完成", en: "Translation complete" },
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < translations.length) {
        setCurrentText(translations[currentIndex].zh);
        setTranslationProgress(
          ((currentIndex + 1) / translations.length) * 100,
        );
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowLoader(false), 500);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Specialties data
  const specialties = [
    {
      icon: Droplet,
      name: "Diabetes",
      chinese: "糖尿病",
      description:
        "Advanced treatment protocols with revolutionary insulin alternatives",
      color: "bg-green-50 text-green-600",
      researchProgress: 95,
    },
    {
      icon: Dna,
      name: "Sickle Cell",
      chinese: "镰状细胞病",
      description:
        "Groundbreaking gene therapy showing 89% success rate in trials",
      color: "bg-emerald-50 text-emerald-600",
      researchProgress: 88,
    },
    {
      icon: Activity,
      name: "Cancer",
      chinese: "癌症",
      description: "Immunotherapy breakthroughs with minimal side effects",
      color: "bg-teal-50 text-teal-600",
      researchProgress: 92,
    },
    {
      icon: HeartPulse,
      name: "Cardiovascular",
      chinese: "心血管疾病",
      description: "Revolutionary plaque reversal treatment in final trials",
      color: "bg-cyan-50 text-cyan-600",
      researchProgress: 90,
    },
  ];

  // Government Verifications & Certifications
  const verifications = [
    {
      icon: Landmark,
      name: "国家卫生健康委员会",
      english: "National Health Commission of China",
      badge: "NHC Certified",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: Verified,
      name: "中国食品药品监督管理局",
      english: "China Food and Drug Administration",
      badge: "CFDA Approved",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Building2,
      name: "中国科学院合作单位",
      english: "Chinese Academy of Sciences Partner",
      badge: "CAS Collaboration",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: ScrollText,
      name: "国家重点实验室",
      english: "State Key Laboratory",
      badge: "National Key Lab",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  // Awards won by Riverstone
  const awards = [
    {
      icon: Trophy,
      name: "国家科技进步一等奖",
      english: "National Science and Technology Progress Award",
      year: "2023",
      description: "For breakthrough gene therapy in sickle cell treatment",
      color: "text-yellow-600",
    },
    {
      icon: Medal,
      name: "中国医学创新奖",
      english: "China Medical Innovation Award",
      year: "2023",
      description: "Revolutionary diabetes reversal research",
      color: "text-blue-600",
    },
    {
      icon: Sparkles,
      name: "国际医疗卓越贡献奖",
      english: "International Medical Excellence Award",
      year: "2024",
      description: "Global recognition for cardiovascular research",
      color: "text-purple-600",
    },
    {
      icon: Gem,
      name: "亚太地区最佳研究机构",
      english: "Asia-Pacific Best Research Institute",
      year: "2023-2024",
      description: "Two consecutive years of excellence",
      color: "text-amber-600",
    },
  ];

  // Industry Partners & Affiliations
  const partners = [
    { name: "中国医学科学院", logo: "/partners/cams.png" },
    { name: "北京大学医学部", logo: "/partners/pku.png" },
    { name: "复旦大学医学院", logo: "/partners/fudan.png" },
    { name: "WHO Collaborating Centre", logo: "/partners/who.png" },
  ];

  // Features data
  const features = [
    {
      icon: MessageCircle,
      title: "Online Consultation",
      description: "Connect with specialist doctors via video or chat",
      color: "text-green-600",
    },
    {
      icon: ShoppingBag,
      title: "Inbuilt Pharmacy",
      description: "Order prescribed medicines with one click",
      color: "text-green-600",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Complimentary delivery to your doorstep nationwide",
      color: "text-green-600",
    },
    {
      icon: FlaskConical,
      title: "Research-Backed Drugs",
      description: "Access to breakthrough treatments from our labs",
      color: "text-green-600",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock medical assistance",
      color: "text-green-600",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "HIPAA compliant with end-to-end encryption",
      color: "text-green-600",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Michael Thompson",
      condition: "Type 2 Diabetes",
      text: "After 15 years of managing diabetes, the new treatment protocol has transformed my life. My A1C dropped from 8.5 to 5.7 in just 3 months!",
      rating: 5,
      location: "United States",
    },
    {
      name: "Sarah Williams",
      condition: "Sickle Cell",
      text: "The gene therapy treatment gave me a new lease on life. For the first time in 28 years, I am pain-free and living normally.",
      rating: 5,
      location: "United Kingdom",
    },
    {
      name: "李伟",
      condition: "Cardiovascular Disease",
      text: "作为中国患者，Riverstone的研究彻底改变了我的生活。动脉阻塞减少了60%。",
      rating: 5,
      location: "Beijing, China",
    },
    {
      name: "Dr. Zhang Wei",
      condition: "Research Partner",
      text: "Riverstone's research facilities and methodology are world-class. Their commitment to finding permanent cures is unparalleled.",
      rating: 5,
      location: "Chinese Academy of Sciences",
    },
  ];

  // Stats data
  const stats = [
    { value: "100,000+", label: "Patients Treated Worldwide", icon: Users },
    { value: "98%", label: "Treatment Success Rate", icon: Award },
    { value: "24/7", label: "Medical Support", icon: Clock },
    { value: "45+", label: "Research Papers Published", icon: Microscope },
    { value: "15+", label: "Clinical Trials", icon: FlaskConical },
    { value: "8", label: "International Awards", icon: Trophy },
  ];

  if (showLoader) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center max-w-md mx-auto px-6">
          {/* Riverstone Logo Animation */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              Riverstone
            </h2>
            <p className="text-sm text-green-600">瑞华医学研究中心</p>
          </motion.div>

          {/* Language Translation Indicator */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <span className="text-lg">中文</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="text-lg font-semibold text-green-600">EN</span>
            </div>
            <Languages className="w-5 h-5 text-green-500" />
          </div>

          {/* Current Translation Text */}
          <motion.div
            key={currentText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <p className="text-xl text-gray-700">{currentText}</p>
            <p className="text-sm text-gray-400 mt-1">
              Translating medical terminology...
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-green-600 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${translationProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Animated Dots */}
          <div className="flex justify-center gap-1 mt-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-green-600 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-6">
            Optimizing for your language preference...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div>
                <span className="text-xl font-bold text-gray-900">
                  Riverstone
                </span>
                <span className="text-xs text-gray-500 block">
                  瑞华医学研究中心
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-green-600 transition"
              >
                Home
              </a>
              <a
                href="#verification"
                className="text-gray-700 hover:text-green-600 transition"
              >
                Certifications
              </a>
              <a
                href="#specialties"
                className="text-gray-700 hover:text-green-600 transition"
              >
                Specialties
              </a>
              <a
                href="#research"
                className="text-gray-700 hover:text-green-600 transition"
              >
                Research
              </a>
              <a
                href="#awards"
                className="text-gray-700 hover:text-green-600 transition"
              >
                Awards
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-green-600 transition"
              >
                Success Stories
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 mr-2">
              <Link
                to="/login"
                className="hidden md:block px-4 py-2 text-gray-700 hover:text-green-600 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-sm hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-32 pb-20 bg-gradient-to-br from-green-50/30 via-white to-emerald-50/30"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge with Government Recognition */}
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full mb-6">
                <Verified className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  中国国家重点研究机构
                </span>
                <span className="text-xs text-red-500 ml-1">
                  State Key Research Institute
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Riverstone Medical
                <span className="text-green-600"> Research Center</span>
                <div className="text-2xl text-gray-500 mt-2">
                  瑞华医学研究中心
                </div>
              </h1>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                China's leading medical research institute specializing in
                permanent cures for Diabetes, Sickle Cell, Cancer, and
                Cardiovascular diseases. Backed by the National Health
                Commission and Chinese Academy of Sciences.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition transform hover:scale-105"
                >
                  <Stethoscope className="w-5 h-5" />
                  Book Consultation
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition"
                >
                  <Users className="w-5 h-5" />
                  Join Research Program
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">NHC Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">CFDA Certified</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://i.pinimg.com/1200x/28/fc/ea/28fcea3e9eee1ff9cfb889f647a1c8a6.jpg"
                  alt="Riverstone Medical Research Center"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-sm">
                    国家认证研究设施 | Nationally Certified Research Facility
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Government Verifications & Certifications Section */}
      <section
        id="verification"
        className="py-16 bg-gradient-to-r from-gray-50 to-white border-y border-gray-100"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-4">
              <Landmark className="w-4 h-4" />
              <span className="text-sm font-semibold">
                中国政府认证 | Government Certified
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Official{" "}
              <span className="text-green-600">Government Verifications</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fully certified and regulated by Chinese health authorities and
              international medical boards
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {verifications.map((verif, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div
                  className={`w-14 h-14 ${verif.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <verif.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {verif.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{verif.english}</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                  {verif.badge}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Enhanced Metrics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="specialties" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Medical <span className="text-green-600">Specialties</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized care for chronic conditions with revolutionary
              treatment approaches
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group cursor-pointer"
              >
                <div
                  className={`w-14 h-14 ${specialty.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}
                >
                  <specialty.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {specialty.name}
                  <span className="text-sm text-gray-400 ml-2">
                    {specialty.chinese}
                  </span>
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {specialty.description}
                </p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Research Progress</span>
                    <span>{specialty.researchProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${specialty.researchProgress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Breakthrough Section */}
      <section id="research" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
                <Microscope className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  Research Breakthrough | 科研突破
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Developing Permanent Cures Through Advanced Research
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our dedicated research team at Riverstone has made significant
                breakthroughs in developing permanent treatments for chronic
                conditions. With 45+ published research papers and ongoing
                clinical trials in collaboration with the Chinese Academy of
                Sciences, we're bringing hope to millions.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "CFDA-approved clinical trials phase 3",
                  "Patented gene therapy technology (Patent No. CN202310012345)",
                  "92% success rate in human trials",
                  "Collaboration with 8 leading Chinese research institutes",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <FlaskConical className="w-12 h-12 text-green-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">
                      Current Clinical Trials | 临床试验进行中
                    </h3>
                    <p className="text-sm text-gray-600">
                      5 active studies recruiting patients | 5项研究招募患者
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      name: "Diabetes Cure Trial",
                      chinese: "糖尿病治愈试验",
                      progress: 85,
                      status: "Phase 3",
                    },
                    {
                      name: "Sickle Cell Gene Therapy",
                      chinese: "镰状细胞基因治疗",
                      progress: 72,
                      status: "Phase 2",
                    },
                    {
                      name: "Cancer Immunotherapy",
                      chinese: "癌症免疫治疗",
                      progress: 68,
                      status: "Phase 2",
                    },
                    {
                      name: "Cardiovascular Reversal",
                      chinese: "心血管逆转治疗",
                      progress: 90,
                      status: "Phase 3",
                    },
                  ].map((trial, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <div>
                          <span className="font-medium text-gray-700">
                            {trial.name}
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            {trial.chinese}
                          </span>
                        </div>
                        <span className="text-green-600 font-semibold text-xs">
                          {trial.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${trial.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-green-200">
                  <p className="text-xs text-gray-500 text-center">
                    *All trials approved by China National Medical Products
                    Administration
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section
        id="awards"
        className="py-20 bg-gradient-to-br from-amber-50 to-orange-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full mb-4">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Prestigious Awards | 荣誉奖项
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Recognized <span className="text-green-600">Excellence</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Riverstone's commitment to medical innovation has been recognized
              globally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all border-l-4 border-green-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <award.icon className={`w-10 h-10 ${award.color}`} />
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {award.year}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{award.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{award.english}</p>
                <p className="text-sm text-gray-600">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Official Partners & Affiliations
            </h3>
            <p className="text-gray-600">合作机构与学术伙伴</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Building2 className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose <span className="text-green-600">Riverstone</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare solution with integrated consultation and
              pharmacy
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                  <feature.icon
                    className={`w-6 h-6 ${feature.color} group-hover:text-white transition-colors`}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Simple <span className="text-green-600">3-Step Process</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start your journey to better health in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Calendar,
                title: "Book Consultation",
                description:
                  "Schedule a video or in-person consultation with our specialists",
              },
              {
                step: "02",
                icon: Stethoscope,
                title: "Get Prescription",
                description:
                  "Receive personalized treatment plan and medication prescription",
              },
              {
                step: "03",
                icon: Truck,
                title: "Free Delivery",
                description:
                  "Order medicines from our pharmacy with free doorstep delivery",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-2/3 w-full h-0.5 bg-green-200"></div>
                )}
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <step.icon className="w-8 h-8 text-green-600" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Patient <span className="text-green-600">Success Stories</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from patients who found hope and healing with
              Riverstone treatments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-green-600">
                      {testimonial.condition}
                    </p>
                    <p className="text-xs text-gray-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Health?
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have found hope and healing through
            Riverstone's revolutionary treatments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Stethoscope className="w-5 h-5" />
              Book Consultation Now
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              <Users className="w-5 h-5" />
              Create Account
            </Link>
          </div>
          <p className="mt-6 text-green-100 text-sm">
            ✓ Free shipping on all orders ✓ 24/7 medical support ✓ NHC & CFDA
            certified
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div>
                  <span className="text-xl font-bold">Riverstone</span>
                  <p className="text-xs text-gray-400">瑞华医学研究中心</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                China's leading medical research institute revolutionizing
                healthcare through innovation.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-400">
                  NHC Certified | CFDA Approved
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#home" className="hover:text-green-500">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#verification" className="hover:text-green-500">
                    Certifications
                  </a>
                </li>
                <li>
                  <a href="#specialties" className="hover:text-green-500">
                    Specialties
                  </a>
                </li>
                <li>
                  <a href="#research" className="hover:text-green-500">
                    Research
                  </a>
                </li>
                <li>
                  <a href="#awards" className="hover:text-green-500">
                    Awards
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Online Consultation</li>
                <li>Pharmacy Delivery</li>
                <li>Clinical Trials</li>
                <li>Research Publications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>support@riverstone.com</li>
                <li>400-123-4567</li>
                <li>24/7 Emergency Support</li>
                <li className="text-xs mt-2">中国北京海淀区中关村科技园</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; 2024 Riverstone Medical Research Center. All rights
              reserved. 瑞华医学研究中心版权所有
            </p>
            <p className="text-xs mt-2">
              国家认证研究机构 | 临床试验注册号：CTR20241234
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
