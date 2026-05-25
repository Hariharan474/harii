import React from "react";
import { Trophy, Award } from "lucide-react";

export default function LeaderboardCard({ rank, name, xp, isCurrentUser }) {
  const getRankBadge = () => {
    switch (rank) {
      case 1:
        return <span className="text-xl">🥇</span>;
      case 2:
        return <span className="text-xl">🥈</span>;
      case 3:
        return <span className="text-xl">🥉</span>;
      default:
        return <span className="font-bold text-gray-500 text-sm w-6 text-center">{rank}</span>;
    }
  };

  const getRankStyles = () => {
    switch (rank) {
      case 1:
        return "border-yellow-500/30 bg-yellow-500/5 shadow-yellow-500/5";
      case 2:
        return "border-slate-400/20 bg-slate-400/5 shadow-slate-400/5";
      case 3:
        return "border-amber-700/20 bg-amber-700/5 shadow-amber-700/5";
      default:
        return "border-white/5 bg-white/5";
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${getRankStyles()} ${
        isCurrentUser ? "ring-2 ring-purple-500 bg-purple-950/15 border-purple-500/30" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-8 flex items-center justify-center">
          {getRankBadge()}
        </div>
        
        {/* Avatar Placeholder */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shadow ${
          isCurrentUser 
            ? "bg-gradient-to-br from-purple-500 to-indigo-600" 
            : "bg-white/10 border border-white/10"
        }`}>
          {name.substring(0, 2).toUpperCase()}
        </div>

        <div>
          <span className="font-bold text-white block text-sm sm:text-base">
            {name} {isCurrentUser && <span className="text-[10px] bg-purple-500 px-1.5 py-0.5 rounded text-white ml-1 font-black">YOU</span>}
          </span>
          <span className="text-xs text-gray-400">
            {rank <= 3 ? "Grandmaster Challenger" : "Arena Contender"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm sm:text-base font-black text-purple-400 tracking-tight">
          {xp.toLocaleString()}
        </span>
        <span className="text-xs text-gray-500 font-bold">XP</span>
      </div>
    </div>
  );
}
