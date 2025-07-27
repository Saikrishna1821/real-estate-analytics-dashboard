import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Home,
  Bell,
  Moon,
  Info,
  User,
  LogOut,
} from "lucide-react";

// Sidebar Component
const Sidebar = ({ isOpen, setIsOpen, currentPath, navigate, user }) => {
  const [dataAnalyticsExpanded, setDataAnalyticsExpanded] = useState(true);

  const menuItems = [
    {
      id: "data-analytics",
      label: "Data Analytics",
      icon: <Home className="w-4 h-4" />,
      hasSubmenu: true,
      submenu: [
        { id: "market-view", label: "Market View", path: "/market-view" },
        {
          id: "acquisition-view",
          label: "Acquisition View",
          path: "/acquisition-view",
        },
        { id: "urls", label: "URLs", path: "/urls" },
        {
          id: "enhanced-table",
          label: "Enhanced Table",
          path: "/enhanced-table",
        },
        {
          id: "interactive-map",
          label: "Interactive Map",
          path: "/interactive-map",
        },
      ],
    },
  ];

  const isActive = (path) => {
    if (
      path === "/market-view" &&
      (currentPath === "/" || currentPath === "/market-view")
    ) {
      return true;
    }
    return currentPath === path;
  };

  return (
    <div
      className={`bg-white shadow-lg transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="p-4">
        {/* Logo */}
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          {isOpen && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800">PANTHERA</span>
              <span className="text-xs font-normal text-gray-500">
                INFOTECH
              </span>
            </div>
          )}
        </div>

        {/* Search Bar */}
        {isOpen && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.hasSubmenu) {
                    setDataAnalyticsExpanded(!dataAnalyticsExpanded);
                  } else {
                    navigate(item.path);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  item.hasSubmenu ? "text-gray-600 hover:bg-gray-100" : ""
                }`}
              >
                <div className="flex items-center">
                  <span className="text-purple-600 mr-3">{item.icon}</span>
                  {isOpen && <span>{item.label}</span>}
                </div>
                {item.hasSubmenu && isOpen && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dataAnalyticsExpanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {item.hasSubmenu && dataAnalyticsExpanded && isOpen && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => navigate(subItem.path)}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        isActive(subItem.path)
                          ? "bg-purple-100 text-purple-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ title, toggleSidebar, user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">Pages / Dashboard</div>
          <div className="text-2xl font-semibold text-gray-900">{title}</div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <Moon className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <Info className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-600">
              Welcome, {user?.username}
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Main Dashboard Layout Component
const DashboardLayout = ({ children, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
      case "/market-view":
        return "Market View";
      case "/acquisition-view":
        return "Acquisition View";
      case "/urls":
        return "URLs";
      case "/enhanced-table":
        return "Enhanced Table";
      case "/interactive-map":
        return "Interactive Map";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        currentPath={location.pathname}
        navigate={navigate}
        user={user}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={getPageTitle()}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          user={user}
          onLogout={onLogout}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
