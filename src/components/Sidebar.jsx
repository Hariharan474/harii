import React from "react";
import { LayoutDashboard, Trophy, User, Volume2, VolumeX, Sparkles } from "lucide-react";
import { playClick } from "../utils/sound";
import logo from "../assets/logo.png";

export default function Sidebar({ currentPage, setCurrentPage, soundMuted, toggleSound }) {
  const menuItems = [
    { id: "dashboard",   label: "Dashboard",   icon: LayoutDashboard },
    { id: "leaderboard", label: "Leaderboard",  icon: Trophy },
    { id: "profile",     label: "Profile",      icon: User },
  ];

  const handleNav = (pageId) => {
    playClick();
    setCurrentPage(pageId);
  };

  return (
    <div className="w-64 p-6 bg-black/40 border-r border-white/10 flex flex-col justify-between backdrop-blur-lg">
      <div>
        <div className="flex items-center gap-3 mb-8 cursor-pointer group" onClick={() => handleNav("landing")}>
          <img src={logo} alt="Code Battle" className="w-8 h-8 rounded-full object-cover border border-white/10 group-hover:scale-105 transition-all duration-300" />
          <h2 className="text-[20px] font-black tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
            Code Battle
          </h2>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id || (item.id === "dashboard" && currentPage === "quiz") || (item.id === "dashboard" && currentPage === "results");
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={20} className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : "text-gray-400 group-hover:text-purple-400"}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-white/5 space-y-4">
        <button
          onClick={toggleSound}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <div className="flex items-center gap-3">
            {soundMuted ? (
              <>
                <VolumeX size={20} className="text-red-400" />
                <span className="font-medium text-sm">Muted</span>
              </>
            ) : (
              <>
                <Volume2 size={20} className="text-green-400" />
                <span className="font-medium text-sm">Sound On</span>
              </>
            )}
          </div>
          <div className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${soundMuted ? "bg-gray-600" : "bg-purple-600"}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${soundMuted ? "translate-x-0" : "translate-x-4"}`} />
          </div>
        </button>

        <div className="text-xs text-center text-gray-500">
          Learn • Play • Level Up 🚀
        </div>
      </div>
    </div>
  );
}
