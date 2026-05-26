import React from "react";
import { motion } from "framer-motion";
import { Play, CheckCircle } from "lucide-react";
import { playClick } from "../utils/sound";
import LanguageLogo from "./LanguageLogos";

const languageDetails = {
  JS:     { name: "JavaScript", desc: "Web scripting & app logic",       color: "from-yellow-400 to-amber-500",  shadow: "shadow-yellow-500/10" },
  Python: { name: "Python",     desc: "Data science, AI & script speed", color: "from-blue-400 to-indigo-500",   shadow: "shadow-blue-500/10" },
  Java:   { name: "Java",       desc: "Enterprise & backend systems",     color: "from-orange-500 to-red-600",    shadow: "shadow-orange-500/10" },
  CSS:    { name: "CSS",        desc: "Styling, layouts & animation design", color: "from-pink-400 to-rose-500", shadow: "shadow-pink-500/10" },
  HTML:   { name: "HTML",       desc: "Hypertext layout & structures",    color: "from-red-400 to-orange-500",    shadow: "shadow-red-500/10" },
  SQL:    { name: "SQL",        desc: "Database querying & management",   color: "from-teal-400 to-emerald-500",  shadow: "shadow-teal-500/10" },
};

const colorMap = {
  JS: "#f59e0b", Python: "#60a5fa", Java: "#f97316",
  CSS: "#f472b6", HTML: "#fb923c", SQL: "#34d399",
};

export default function LanguageCard({ langId, highScore, langLevel, onSelect }) {
  const details = languageDetails[langId] || { name: langId, desc: "Coding quiz challenge", color: "from-purple-500 to-indigo-600", shadow: "shadow-purple-500/10" };
  const accentHex = colorMap[langId] || "#06b6d4";

  const handleStart = () => {
    playClick();
    onSelect(langId);
  };

  return (
    <motion.div
      data-magnetic
      data-cursor-color={accentHex}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`glass-panel rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${details.shadow} hover:shadow-2xl hover:border-white/20 group`}
    >
      {/* Visual Accent */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${details.color} opacity-80`} />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-1 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 shadow-inner">
            <LanguageLogo langId={langId} size={48} />
          </div>
          {highScore !== null && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-bold tracking-wider">
              <CheckCircle size={10} />
              <span>HIGH SCORE: {highScore}%</span>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight">{details.name}</h3>
        <p className="text-gray-400 text-xs mt-1.5 leading-relaxed min-h-[32px]">
          {details.desc}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            5 Questions
          </span>
          {langLevel && (
            <span className="text-[9px] font-extrabold text-purple-400 tracking-wider">
              LEVEL {langLevel}
            </span>
          )}
        </div>
        <button
          onClick={handleStart}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all bg-gradient-to-r ${details.color} shadow-md opacity-90 group-hover:opacity-100 hover:scale-105`}
        >
          <Play size={12} fill="white" />
          <span>Start Quiz</span>
        </button>
      </div>
    </motion.div>
  );
}
