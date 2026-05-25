import React from "react";
import { Award, Zap, Flame } from "lucide-react";

export default function Navbar({ xp, streak, user, onSignIn, onSignOut }) {
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

        {/* Google Authentication Control */}
        <div className="border-l border-white/10 pl-4 py-1 flex items-center">
          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full border border-purple-500/40 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-sm">
                  {user.displayName ? user.displayName.charAt(0) : "U"}
                </div>
              )}
              <div className="hidden lg:block text-left">
                <span className="text-xs font-bold text-white block max-w-[100px] truncate">
                  {user.displayName}
                </span>
              </div>
              <button
                onClick={onSignOut}
                className="text-[11px] text-red-400 hover:text-red-300 font-bold bg-red-950/20 border border-red-500/20 px-2.5 py-1.5 rounded-lg hover:bg-red-900/30 transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md border border-purple-500/20 hover:scale-105 transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
