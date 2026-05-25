import React from "react";
import { motion } from "framer-motion";

export default function StatCard({ title, value, icon: Icon, color, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-panel rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden"
    >
      {/* Decorative gradient overlay */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${color} opacity-10 rounded-bl-full pointer-events-none`} />

      <div className={`p-3.5 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg shadow-black/20`}>
        <Icon size={22} />
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          {title}
        </span>
        <h3 className="text-2xl font-black text-white mt-0.5 tracking-tight">
          {value}
        </h3>
        {subtitle && (
          <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
