import React from "react";
import { Award, Zap, Flame } from "lucide-react";

export default function Navbar({ xp, streak }) {
  const xpPerLevel = 1000;
  const currentLevel = Math.floor(xp / xpPerLevel) + 1;
  const xpInCurrentLevel = xp % xpPerLevel;
  const xpPercent = Math.min(Math.round((xpInCurrentLevel / xpPerLevel) * 100), 100);

  return (
    <header className="h-16 px-8 border-b border-white/10 bg-black/20 backdrop-blur-lg flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold tracking-wide text-white">
          Coding Arena
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Streak Counter */}
        {streak > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <Flame size={16} className="fill-orange-400 animate-pulse" />
            <span className="font-bold text-sm">{streak} Day Streak</span>
          </div>
        )}

        {/* Level and XP Progress */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="flex items-center justify-end gap-1.5 text-xs text-purple-300 font-semibold mb-1">
              <Zap size={12} className="text-purple-400" />
              <span>{xpInCurrentLevel} / {xpPerLevel} XP</span>
            </div>
            <div className="w-36 h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 px-3.5 py-1.5 rounded-xl shadow-lg border border-purple-500/30">
            <Award size={18} className="text-white" />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] text-purple-200 uppercase font-bold tracking-wider">Level</span>
              <span className="text-sm font-black text-white">{currentLevel}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
