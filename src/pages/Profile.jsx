import React from "react";
import { User, Award, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";
import BadgeCard from "../components/BadgeCard";
import { playClick } from "../utils/sound";

export default function Profile({ xp, streak, badges, highScores, onResetData }) {
  const currentLevel = Math.floor(xp / 1000) + 1;
  const totalBadgesUnlocked = badges.length;

  // Compute rank title based on level
  const getRankTitle = (lvl) => {
    if (lvl >= 10) return "Grandmaster Syntactician 👑";
    if (lvl >= 7) return "Algorithm Architect 🛡️";
    if (lvl >= 4) return "Polyglot Practitioner 💻";
    if (lvl >= 2) return "Logic Apprentice 🧠";
    return "Syntax Initiate 🎓";
  };

  const badgeTemplates = [
    {
      id: "first_quiz",
      title: "First Step",
      description: "Complete your first coding quiz.",
      iconName: "Award",
      color: "from-yellow-400 to-amber-500"
    },
    {
      id: "perfect_score",
      title: "Code Oracle",
      description: "Achieve a perfect 100% score on any quiz.",
      iconName: "Star",
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: "five_streak",
      title: "Hot Streak",
      description: "Reach a streak of 5 daily session steps.",
      iconName: "Flame",
      color: "from-orange-500 to-red-600"
    },
    {
      id: "xp_collector",
      title: "XP Collector",
      description: "Amass a total of 1,000 XP.",
      iconName: "Zap",
      color: "from-teal-400 to-emerald-500"
    },
    {
      id: "polyglot",
      title: "Polyglot Master",
      description: "Record scores in 3 different categories.",
      iconName: "Shield",
      color: "from-pink-500 to-rose-600"
    },
    {
      id: "sql_high",
      title: "Query Emperor",
      description: "Gain a high score on the SQL quiz.",
      iconName: "Coffee",
      color: "from-blue-400 to-cyan-500"
    }
  ];

  const countCompletedLanguages = () => {
    return Object.keys(highScores).filter(k => highScores[k] !== null).length;
  };

  const handleReset = () => {
    playClick();
    if (confirm("Are you absolutely sure you want to RESET all your progress? This deletes all your earned XP, levels, and unlocked badges forever!")) {
      onResetData();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto py-2">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 glass-panel rounded-2xl border border-white/10 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/10 rounded-bl-full pointer-events-none" />

        <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center font-bold text-white text-3xl shadow-lg relative border border-white/20">
          <User size={36} />
        </div>

        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
            <span>CodeBattler</span>
            <Sparkles size={18} className="text-yellow-400 fill-yellow-400/20" />
          </h2>
          <p className="text-purple-300 text-sm font-semibold mt-1">
            {getRankTitle(currentLevel)}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
              Level {currentLevel}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
              {xp.toLocaleString()} Total XP
            </span>
          </div>
        </div>
      </div>

      {/* Grid Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl text-center">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Streak</span>
          <span className="text-lg font-black text-white mt-1 block">{streak} Days 🔥</span>
        </div>
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl text-center">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Badges</span>
          <span className="text-lg font-black text-white mt-1 block">{totalBadgesUnlocked} / 6 🏆</span>
        </div>
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl text-center">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Categories Completed</span>
          <span className="text-lg font-black text-white mt-1 block">{countCompletedLanguages()} / 6 🌐</span>
        </div>
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl text-center">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Progress Title</span>
          <span className="text-xs font-black text-purple-400 mt-1.5 block truncate">
            {currentLevel >= 10 ? "GRANDMASTER" : currentLevel >= 4 ? "MASTER" : "INITIATE"}
          </span>
        </div>
      </div>

      {/* Achievements Badges */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Award size={18} className="text-purple-400" />
          <span>Earned Badges</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {badgeTemplates.map((badge) => (
            <BadgeCard
              key={badge.id}
              id={badge.id}
              title={badge.title}
              description={badge.description}
              unlocked={badges.includes(badge.id)}
              iconName={badge.iconName}
              color={badge.color}
            />
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-6 border-t border-white/5 space-y-4">
        <h3 className="text-sm font-bold text-red-400 tracking-wider uppercase flex items-center gap-1.5">
          <ShieldAlert size={16} />
          <span>Danger Zone</span>
        </h3>
        
        <div className="p-4 rounded-xl bg-red-950/10 border border-red-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-sm font-bold text-white block">Reset Profile Progress</span>
            <span className="text-xs text-gray-400 block mt-0.5">
              Permanently clear your experience levels, badges, high scores, and statistics. This cannot be undone.
            </span>
          </div>
          
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-600/10 transition-all text-xs hover:scale-105"
          >
            <RefreshCw size={14} />
            <span>Reset Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
