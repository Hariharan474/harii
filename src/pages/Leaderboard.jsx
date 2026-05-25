import React from "react";
import { Trophy, Award, Target, Flame } from "lucide-react";
import LeaderboardCard from "../components/LeaderboardCard";
import { motion } from "framer-motion";

export default function Leaderboard({ xp }) {
  // Mock competitors
  const competitors = [
    { name: "ByteBoss", xp: 4800 },
    { name: "AlgoAlchemist", xp: 3650 },
    { name: "SyntaxSlayer", xp: 2800 },
    { name: "BinaryBard", xp: 1950 },
    { name: "CodeCoyote", xp: 1100 },
    { name: "NullPointer", xp: 450 }
  ];

  // Insert current user into leaderboard
  const allPlayers = [
    ...competitors,
    { name: "CodeBattler", xp: xp, isCurrentUser: true }
  ];

  // Sort by XP descending
  const sortedPlayers = allPlayers.sort((a, b) => b.xp - a.xp);

  // Find user rank
  const userRankIndex = sortedPlayers.findIndex(p => p.isCurrentUser);
  const userRank = userRankIndex + 1;

  // Podium players
  const podiumPlayers = sortedPlayers.slice(0, 3);
  // Rest of players
  const restPlayers = sortedPlayers.slice(3);

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
          <Trophy className="text-yellow-500 fill-yellow-500/10" size={28} />
          <span>Arena Leaderboard</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Compete with players worldwide. Master categories to claim the top spot!
        </p>
      </div>

      {/* User Standing card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 p-5 rounded-2xl flex items-center justify-between shadow-xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center font-bold text-white text-base shadow shadow-purple-600/30">
            CQ
          </div>
          <div>
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">
              YOUR STANDING
            </span>
            <span className="text-lg font-black text-white block mt-0.5">
              Rank #{userRank}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
              CURRENT XP
            </span>
            <span className="text-lg font-black text-purple-400 block mt-0.5">
              {xp.toLocaleString()}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard Stack */}
      <div className="space-y-3">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-4">
          TOP CONTENDERS
        </span>

        <div className="space-y-2.5">
          {sortedPlayers.map((player, index) => (
            <motion.div
              key={player.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <LeaderboardCard
                rank={index + 1}
                name={player.name}
                xp={player.xp}
                isCurrentUser={player.isCurrentUser}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
