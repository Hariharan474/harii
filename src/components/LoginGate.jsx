import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, Play, User, Edit2, Mail, Lock, Key, ArrowLeft } from "lucide-react";
import logo from "../assets/logo.png";
import { playClick } from "../utils/sound";

export default function LoginGate({ userName, onSignIn, onJoinArena, onEmailSignIn, onEmailSignUp }) {
  // Modes: "gate" (main landing options), "guest" (guest nickname form), "email" (email/password login/register)
  const isExistingGuest = userName && userName !== "Guest" && userName.trim() !== "";
  const [authMode, setAuthMode] = useState("gate"); // "gate" | "guest" | "email"
  
  // Guest states
  const [inputName, setInputName] = useState(isExistingGuest ? userName : "");

  // Email form states
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    if (isRegistering && !displayName) return;

    playClick();
    setLoading(true);
    try {
      if (isRegistering) {
        await onEmailSignUp(email, password, displayName);
      } else {
        await onEmailSignIn(email, password);
      }
    } catch (err) {
      // Errors are alerted in parent App handlers
    } finally {
      setLoading(false);
    }
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
        className="w-full max-w-md p-8 rounded-3xl glass-panel border border-white/10 relative overflow-hidden text-center shadow-[0_0_50px_rgba(139,92,246,0.15)]"
      >
        {/* Glow accent */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
            <img
              src={logo}
              alt="Code Battle"
              className="w-20 h-20 rounded-full object-cover border-2 border-white/20 relative z-10 filter drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]"
            />
          </div>
        </div>

        {/* Header Titles */}
        <h2 className="text-2xl font-black text-white tracking-tight mb-1">
          CODE BATTLE ⚔️
        </h2>
        <p className="text-xs text-gray-400 max-w-xs mx-auto mb-6">
          Master programming, earn experience points, and level up in the code arena.
        </p>

        <AnimatePresence mode="wait">
          {/* 1. Main Options Gate */}
          {authMode === "gate" && (
            <motion.div
              key="gate"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              {/* Google Login */}
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

              {/* Email Authentication option */}
              <button
                onClick={() => {
                  playClick();
                  setAuthMode("email");
                }}
                className="w-full py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-200 font-bold rounded-xl transition-all flex items-center justify-center gap-2.5 hover:scale-[1.01] cursor-pointer"
              >
                <Mail size={18} />
                <span>Sign In with Email</span>
              </button>

              {/* Divider */}
              <div className="flex items-center justify-between gap-4 py-2">
                <div className="h-[1px] bg-white/10 flex-1" />
                <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                  Or Play as Guest
                </span>
                <div className="h-[1px] bg-white/10 flex-1" />
              </div>

              {/* Guest continuation or nickname option */}
              {isExistingGuest ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                        <User size={16} />
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-400 uppercase tracking-wider block leading-none mb-1">
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
                        setAuthMode("guest");
                      }}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                      title="Change Nickname"
                    >
                      <Edit2 size={12} />
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
                <button
                  onClick={() => {
                    playClick();
                    setAuthMode("guest");
                  }}
                  className="w-full py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <Play size={16} />
                  <span>Choose Guest Nickname</span>
                </button>
              )}
            </motion.div>
          )}

          {/* 2. Guest Form Mode */}
          {authMode === "guest" && (
            <motion.div
              key="guest"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <form onSubmit={handleGuestSubmit} className="space-y-4 text-left">
                <div>
                  <label className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1.5 ml-1">
                    Guest Nickname
                  </label>
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
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setAuthMode("gate");
                    }}
                    className="px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={inputName.trim() === ""}
                    className="flex-1 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    <Play size={16} />
                    <span>Enter Arena</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* 3. Email Authentication Mode */}
          {authMode === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-left mb-2">
                <button
                  onClick={() => {
                    playClick();
                    setAuthMode("gate");
                  }}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  <ArrowLeft size={16} />
                </button>
                <span className="text-sm font-bold text-white">
                  {isRegistering ? "Create Email Account" : "Sign In with Email"}
                </span>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-3.5 text-left">
                {isRegistering && (
                  <div>
                    <label className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1 ml-1">
                      Nickname / Display Name
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your name..."
                        required
                        className="w-full bg-white/5 border border-white/10 focus:border-purple-500/50 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-white/5 border border-white/10 focus:border-purple-500/50 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      minLength={6}
                      required
                      className="w-full bg-white/5 border border-white/10 focus:border-purple-500/50 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-xs"
                >
                  <Key size={14} />
                  <span>{loading ? "Processing..." : isRegistering ? "Sign Up" : "Sign In"}</span>
                </button>
              </form>

              <div className="text-xs pt-2">
                <button
                  onClick={() => {
                    playClick();
                    setIsRegistering(!isRegistering);
                  }}
                  className="text-purple-400 hover:text-purple-300 font-bold transition-all"
                >
                  {isRegistering
                    ? "Already have an account? Sign In"
                    : "Need an account? Create one"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-[10px] text-gray-500">
          <Shield size={10} />
          <span>Secure authentication via Firebase</span>
        </div>
      </motion.div>
    </div>
  );
}
