// src/components/Navigator.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Stethoscope,
  Pill,
  User,
  LogOut,
  Heart,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import localForage from "localforage";
import Api from "./Api";
import toast from "react-hot-toast";

const Navigator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Fetch user data to check hasBooked status
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await localForage.getItem("token");

        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await axios.post(`${Api}/getUser`, { token });

        if (response.data.success && response.data.user) {
          setUserData(response.data.user);
          await localForage.setItem("user", JSON.stringify(response.data.user));
        }
      } catch (error) {
        console.error("Error fetching user data for navigation:", error);
        // Try to get cached user data
        const cachedUser = await localForage.getItem("user");
        if (cachedUser) {
          setUserData(JSON.parse(cachedUser));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Define navigation items with condition
  const getNavigationItems = () => {
    const items = [
      {
        path: "/home",
        icon: Home,
        label: "Home",
        chinese: "首页",
        requiredCondition: null, // Always show
      },
      {
        path: "/consultation",
        icon: Stethoscope,
        label: "Consultation",
        chinese: "问诊",
        requiredCondition: null, // Always show
      },
    ];

    // Only show pharmacy if user has booked a consultation
    if (userData?.hasBooked === true) {
      items.push({
        path: "/pharmacy",
        icon: Pill,
        label: "Pharmacy",
        chinese: "药房",
        requiredCondition: "hasBooked",
      });
    }

    items.push({
      path: "/profile",
      icon: User,
      label: "Profile",
      chinese: "个人中心",
      requiredCondition: null, // Always show
    });

    return items;
  };

  const navigationItems = getNavigationItems();

  const handleLogout = async () => {
    await localForage.removeItem("token");
    await localForage.removeItem("user");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // If loading, show minimal navigation
  if (isLoading) {
    return (
      <aside className="fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-center p-5">
          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
        </div>
      </aside>
    );
  }

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <>
        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="flex items-center justify-around py-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all
                  ${
                    isActive
                      ? "text-green-600"
                      : "text-gray-500 hover:text-green-500"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-6 h-6 ${isActive ? "text-green-600" : "text-gray-400"}`}
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    <span
                      className={`text-xs mt-1 font-medium ${isActive ? "text-green-600" : "text-gray-500"}`}
                    >
                      {item.label}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {item.chinese}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Add padding to main content to avoid overlap */}
        <style>{`
          main {
            padding-bottom: 80px !important;
          }
        `}</style>
      </>
    );
  }

  // Desktop Sidebar Navigation
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-50
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Logo Section */}
        <div
          className={`flex items-center justify-between p-5 border-b border-gray-100 ${isCollapsed ? "justify-center" : ""}`}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div>
                <span className="text-lg font-bold text-gray-900">
                  Riverstone
                </span>
                <p className="text-[10px] text-gray-400">瑞华医学研究中心</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 transition"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6">
          <div className="space-y-1 px-3">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-3 rounded-lg transition-all group
                  ${
                    isActive
                      ? "bg-green-50 text-green-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-5 h-5 ${isActive ? "text-green-600" : "text-gray-400 group-hover:text-green-500"}`}
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    {!isCollapsed && (
                      <div className="flex-1">
                        <span className="text-sm font-medium block">
                          {item.label}
                        </span>
                        <span className="text-xs text-gray-400">
                          {item.chinese}
                        </span>
                      </div>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                        <span className="text-gray-400 ml-1">
                          {item.chinese}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition group
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <LogOut className="w-5 h-5" strokeWidth={1.5} />
            {!isCollapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button (for small desktop screens) */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg md:hidden"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 md:hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    Riverstone
                  </span>
                  <p className="text-[10px] text-gray-400">瑞华医学研究中心</p>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <nav className="py-6">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-6 py-3 transition
                    ${
                      isActive
                        ? "bg-green-50 text-green-600 border-r-4 border-green-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <div>
                    <span className="text-sm font-medium block">
                      {item.label}
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.chinese}
                    </span>
                  </div>
                </NavLink>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Style for main content padding */}
      <style>{`
        main {
          margin-left: ${isCollapsed ? "80px" : "256px"};
          transition: margin-left 0.3s ease;
        }
        @media (max-width: 768px) {
          main {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Navigator;
