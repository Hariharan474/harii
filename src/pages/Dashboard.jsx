import React from "react";
import { Zap, Flame, Award, BookOpen, Radio } from "lucide-react";
import StatCard from "../components/StatCard";
import LanguageCard from "../components/LanguageCard";
import { motion } from "framer-motion";

export default function Dashboard({ xp, streak, highScores, onSelectLanguage, setCurrentPage }) {
  const currentLevel = Math.floor(xp / 1000) + 1;
  const xpInCurrentLevel = xp % 1000;
  const remainingXp = 1000 - xpInCurrentLevel;

  const languagesList = ["JS", "Python", "Java", "HTML", "CSS", "SQL"];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Welcome Back 👋
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Choose a quest path, complete quizzes, and keep your streak alive!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-purple-300 font-semibold bg-purple-950/40 border border-purple-500/20 px-3.5 py-2 rounded-xl">
            🚀 Next level in <span className="text-white font-bold">{remainingXp} XP</span>
          </div>
          {setCurrentPage && (
            <motion.button
              onClick={() => setCurrentPage("telemetry")}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black tracking-widest text-black"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #818cf8)",
                boxShadow: "0 0 20px rgba(6,182,212,0.35)",
              }}
            >
              <Radio size={12} />
              F1 LIVE
            </motion.button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Total XP"
          value={xp.toLocaleString()}
          icon={Zap}
          color="from-purple-500 to-indigo-600"
          subtitle="Keep earning XP to rank up"
        />
        <StatCard
          title="Arena Level"
          value={currentLevel}
          icon={Award}
          color="from-pink-500 to-rose-600"
          subtitle={`Level progress: ${Math.round((xpInCurrentLevel / 1000) * 100)}%`}
        />
        <StatCard
          title="Active Streak"
          value={`${streak} Days`}
          icon={Flame}
          color="from-orange-500 to-amber-600"
          subtitle={streak > 0 ? "You are on fire! 🔥" : "Play a quiz today to start a streak"}
        />
      </div>

      {/* Choose your path */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen size={18} className="text-purple-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">
            Choose Your Quest Path
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {languagesList.map((lang) => (
            <LanguageCard
              key={lang}
              langId={lang}
              highScore={highScores[lang]}
              onSelect={onSelectLanguage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
