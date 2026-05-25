import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, CheckCircle2, Zap } from "lucide-react";
import { playCorrect, playIncorrect, playClick } from "../utils/sound";

// List of available punishment tasks
const TASKS = [
  {
    type: "TAP",
    title: "Overload Shield Burst",
    instructions: "Rapidly tap the glowing core node to vent the system anomaly!",
    targetTapCount: 8,
  },
  {
    type: "TYPE",
    title: "Override Code Bypass",
    instructions: "Re-type this system check string exactly to reset validation:",
    targetString: "BATTLE_ACTIVE_77",
  },
  {
    type: "LOGIC",
    title: "Binary Core Conversion",
    instructions: "What is the decimal equivalent of binary '1101'?",
    options: ["11", "13", "15", "9"],
    correctAnswer: "13",
  },
];

export default function PunishmentTask({ onComplete }) {
  const [task, setTask] = useState(null);
  const [taps, setTaps] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [solved, setSolved] = useState(false);
  const [showError, setShowError] = useState(false);

  // Initialize a random task on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * TASKS.length);
    setTask(TASKS[randomIndex]);
  }, []);

  const handleTap = () => {
    if (solved) return;
    playClick();
    const nextTaps = taps + 1;
    setTaps(nextTaps);
    if (nextTaps >= task.targetTapCount) {
      triggerSuccess();
    }
  };

  const handleTypeSubmit = (e) => {
    e.preventDefault();
    if (solved) return;
    if (typedText.trim() === task.targetString) {
      triggerSuccess();
    } else {
      playIncorrect();
      setShowError(true);
      setTimeout(() => setShowError(false), 800);
    }
  };

  const handleLogicSelect = (opt) => {
    if (solved) return;
    if (opt === task.correctAnswer) {
      triggerSuccess();
    } else {
      playIncorrect();
      setShowError(true);
      setTimeout(() => setShowError(false), 800);
    }
  };

  const triggerSuccess = () => {
    setSolved(true);
    playCorrect();
    // Complete task after short delay so user sees success state
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  if (!task) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: 20 }}
      className="glass-panel p-6 rounded-2xl border-2 border-red-500/40 bg-red-950/20 shadow-2xl relative overflow-hidden mt-6"
    >
      {/* Red ambient warning pulse */}
      <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />

      {/* Grid Layout: Akira on left, Task on right */}
      <div className="flex flex-col md:flex-row items-center gap-5 relative z-10">
        
        {/* Akira Mentor Avatar */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
            <img
              src="/character_mentor.png"
              alt="Akira, Code Sentinel"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs font-black text-red-400 mt-2 tracking-widest uppercase">
            AKIRA (SENTINEL)
          </span>
        </div>

        {/* Task Details & UI */}
        <div className="flex-1 space-y-3.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-red-400">
            <ShieldAlert size={16} className="animate-bounce" />
            <span className="text-[10px] font-black tracking-widest uppercase">
              PUNISHMENT ACTIVE: {task.title}
            </span>
          </div>

          {/* Akira Dialogue */}
          <div className="bg-black/30 border border-white/5 p-3 rounded-xl">
            <p className="text-xs text-red-200 italic leading-relaxed">
              "Access Locked! Your syntax compilation failed. Complete this override task immediately to secure the next gateway!"
            </p>
          </div>

          <p className="text-xs text-gray-300 font-bold leading-normal">
            {task.instructions}
          </p>

          {/* Interactive Area */}
          <div className="pt-2">
            <AnimatePresence mode="wait">
              {solved ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center md:justify-start gap-2 text-green-400 font-bold text-sm bg-green-950/20 border border-green-500/30 p-3 rounded-xl"
                >
                  <CheckCircle2 size={16} className="animate-pulse" />
                  <span>Bypass Authenticated. System Re-engaging...</span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={showError ? "animate-shake" : ""}
                >
                  {/* Task Type A: Tapping Core */}
                  {task.type === "TAP" && (
                    <div className="flex flex-col items-center md:items-start gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTap}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-rose-700 text-white font-black flex flex-col items-center justify-center shadow-lg border border-red-400 relative overflow-hidden"
                      >
                        <Zap size={24} className="animate-pulse" />
                        <span className="text-[10px] mt-1">{taps} / {task.targetTapCount}</span>
                      </motion.button>
                      <div className="w-40 h-2 bg-white/5 rounded-full overflow-hidden mt-1 border border-white/5">
                        <div
                          className="h-full bg-red-500 transition-all duration-150"
                          style={{ width: `${(taps / task.targetTapCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Task Type B: Typing Check String */}
                  {task.type === "TYPE" && (
                    <form onSubmit={handleTypeSubmit} className="flex gap-2 max-w-sm">
                      <div className="flex-1 flex flex-col gap-1.5">
                        <span className="font-mono text-xs bg-black/40 border border-white/10 px-3 py-1.5 rounded-lg text-red-400 text-center font-bold tracking-wider select-none">
                          {task.targetString}
                        </span>
                        <input
                          type="text"
                          required
                          value={typedText}
                          onChange={(e) => setTypedText(e.target.value)}
                          placeholder="Type bypass override..."
                          className="w-full bg-black/40 border border-red-500/30 text-white placeholder-red-700/60 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl px-4 text-xs h-9 mt-[26px] shadow-lg shadow-red-600/20"
                      >
                        Verify
                      </button>
                    </form>
                  )}

                  {/* Task Type C: Logic options click */}
                  {task.type === "LOGIC" && (
                    <div className="grid grid-cols-2 gap-2 max-w-sm">
                      {task.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleLogicSelect(opt)}
                          className="bg-black/30 border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5 text-xs text-white py-2 px-4 rounded-xl transition-all font-bold"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
