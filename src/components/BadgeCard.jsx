import React from "react";
import { Award, Zap, Shield, Flame, Star, Coffee } from "lucide-react";
import { motion } from "framer-motion";

const badgeIcons = {
  Award: Award,
  Zap: Zap,
  Shield: Shield,
  Flame: Flame,
  Star: Star,
  Coffee: Coffee
};

export default function BadgeCard({ id, title, description, unlocked, iconName, color }) {
  const Icon = badgeIcons[iconName] || Award;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`glass-panel rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 ${
        unlocked 
          ? "border-purple-500/20 shadow-lg shadow-purple-500/5 hover:border-purple-500/40" 
          : "opacity-40 select-none grayscale border-white/5"
      }`}
    >
      {/* Dynamic background glow if unlocked */}
      {unlocked && (
        <div className={`absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-br ${color} opacity-20 rounded-full blur-xl pointer-events-none`} />
      )}

      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-md relative ${
        unlocked 
          ? `bg-gradient-to-br ${color} text-white` 
          : "bg-white/5 text-gray-500 border border-white/5"
      }`}>
        <Icon size={24} className={unlocked ? "animate-pulse" : ""} />
        
        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
            <span className="text-[10px] font-bold text-gray-400 tracking-wider">LOCKED</span>
          </div>
        )}
      </div>

      <h4 className="text-sm font-bold text-white tracking-tight">{title}</h4>
      <p className="text-[10px] text-gray-400 mt-1 leading-relaxed max-w-[130px] font-medium">
        {description}
      </p>

      {unlocked && (
        <span className="text-[9px] font-black text-purple-400 bg-purple-950/20 border border-purple-500/20 px-2 py-0.5 rounded-full mt-3 tracking-widest uppercase">
          Unlocked
        </span>
      )}
    </motion.div>
  );
}
