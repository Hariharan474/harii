import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Play, User, Edit2 } from "lucide-react";
import logo from "../assets/logo.png";
import { playClick } from "../utils/sound";

export default function LoginGate({ userName, onSignIn, onJoinArena }) {
  const isExistingGuest = userName && userName !== "Guest" && userName.trim() !== "";
  const [showNameForm, setShowNameForm] = useState(!isExistingGuest);
  const [inputName, setInputName] = useState(isExistingGuest ? userName : "");

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    if (inputName.trim() === "") return;
    playClick();
    onJoinArena(inputName.trim());
  };

  const handleQuickContinue = () => {
    playClick();
    onJoinArena(userName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 overflow-hidden">
      {/* Dynamic ambient backgrounds */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-3xl glass-panel border border-white/10 relative overflow-hidden text-center shadow-[0_0_50px_rgba(139,92,246,0.15)] animate-fadeIn"
      >
        {/* Glow accent */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
            <img
              src={logo}
              alt="Code Battle"
              className="w-24 h-24 rounded-full object-cover border-2 border-white/20 relative z-10 filter drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]"
            />
          </div>
        </div>

        {/* Header Titles */}
        <h2 className="text-3xl font-black text-white tracking-tight mb-2">
          CODE BATTLE ⚔️
        </h2>
        <p className="text-xs text-gray-400 max-w-xs mx-auto mb-8">
          Master programming, earn experience points, and level up in the code arena.
        </p>

        <div className="space-y-6">
          {/* Action 1: Google Login (Always Available) */}
          <button
            onClick={() => {
              playClick();
              onSignIn();
            }}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 hover:shadow-purple-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.58h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.4C21.68,11.96 21.56,11.5 21.35,11.1z"
              />
              <path
                fill="currentColor"
                d="M12,20.68c2.43,0 4.47,-0.8 5.96,-2.2l-3.3,-2.58c-0.92,0.62 -2.1,0.98 -3.66,0.98c-2.82,0 -5.2,-1.9 -6.05,-4.46H1.54v2.66C3.02,17.96 7.23,20.68 12,20.68z"
              />
              <path
                fill="currentColor"
                d="M5.95,12.42c-0.22,-0.66 -0.35,-1.37 -0.35,-2.1c0,-0.73 0.13,-1.44 0.35,-2.1V5.56H1.54C0.78,7.08 0.35,8.8 0.35,10.32c0,1.52 0.43,3.24 1.19,4.76L5.95,12.42z"
              />
              <path
                fill="currentColor"
                d="M12,5.56c1.6,0 3.03,0.55 4.16,1.63l3.12,-3.12C17.39,2.2 14.83,1.32 12,1.32C7.23,1.32 3.02,4.04 1.54,8.96l4.41,3.46C6.8,9.86 9.18,5.56 12,5.56z"
              />
            </svg>
            <span>Sign In with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center justify-between gap-4">
            <div className="h-[1px] bg-white/10 flex-1" />
            <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
              Or Play as Guest
            </span>
            <div className="h-[1px] bg-white/10 flex-1" />
          </div>

          {/* Quick Continue Card vs Nickname Form */}
          {!showNameForm ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <User size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block leading-none mb-1">
                      Guest Nickname
                    </span>
                    <span className="text-sm font-bold text-white block">
                      {userName}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    playClick();
                    setShowNameForm(true);
                  }}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                  title="Change Nickname"
                >
                  <Edit2 size={14} />
                </button>
              </div>

              <button
                onClick={handleQuickContinue}
                className="w-full py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer"
              >
                <span>Continue as Guest</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleGuestSubmit} className="space-y-4 animate-fadeIn">
              <div className="relative">
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Enter your nickname..."
                  maxLength={20}
                  className="w-full bg-white/5 border border-white/10 focus:border-purple-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors"
                />
              </div>
              <div className="flex gap-3">
                {isExistingGuest && (
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setShowNameForm(false);
                      setInputName(userName);
                    }}
                    className="px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={inputName.trim() === ""}
                  className="flex-1 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  <Play size={16} />
                  <span>Enter Arena</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer note */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-[10px] text-gray-500">
          <Shield size={10} />
          <span>Secure authentication via Firebase</span>
        </div>
      </motion.div>
    </div>
  );
}
