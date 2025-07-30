import React, { useState } from "react";
import UserRoleManagement from "./components/UserRoleManagement";
import MultilingualSupport from "./components/MultilingualSupport";
import Analytics from "./components/Analytics";
import ChatwoodIntegration from "./components/ChatwoodIntegration";
import AutoLearning from "./components/AutoLearning";
import Configuration from "./components/Configuration";
import Logo from '../src/assets/images/logo.webp'

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: "🏠", badge: null },
  { id: "users", label: "User Roles & Personas", icon: "👥", badge: null },
  { id: "chatwood", label: "Live Chat Management", icon: "💬", badge: null },
  // {
  //   id: "multilingual",
  //   label: "Multilingual Support",
  //   icon: "🌐",
  //   badge: null,
  // },
  // { id: 'analytics', label: 'Analytics & Reports', icon: '📊', badge: null },
  // { id: "learning", label: "Auto Learning", icon: "🧠", badge: "12" },
  // { id: "settings", label: "Configuration", icon: "⚙️", badge: null },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Analytics />;
      case "users":
        return <UserRoleManagement />;
      case "multilingual":
        return <MultilingualSupport />;
      case "chatwood":
        return <ChatwoodIntegration />;
      case "analytics":
        return <Analytics />;
      case "learning":
        return <AutoLearning />;
      case "settings":
        return <Configuration />;
      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back to Gyaani Admin Panel
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center space-x-3">
            {/* <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div> */}
            <img
              id="landingLogo"
              src={Logo}
              alt="logo"
              style={{
                maxWidth: "100%",
                height: "30px",
              }}
            />
          </div>
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-md"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="text-lg">✕</span>
          </button>
        </div>

        <nav className="mt-6 px-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors mb-1 ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full ml-auto">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-md"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="text-lg">☰</span>
              </button>
              {/* <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 w-80 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div> */}
            </div>

            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-500">Gyaani Admin Panel</h1>
              {/* <button className="p-2 text-gray-600 hover:text-gray-900 rounded-md relative">
                <span className="text-lg">🔔</span>
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button> */}
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600">👤</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
