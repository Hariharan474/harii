import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, HelpCircle } from "lucide-react";
import { playClick } from "../utils/sound";
import LanguageLogo from "../components/LanguageLogos";
import logo from "../assets/logo.png";

export default function Landing({ setCurrentPage, user, onSignIn, onSignOut }) {
  const handleStart = () => {
    playClick();
    setCurrentPage("dashboard");
  };
  const features = [
    { title: "HTML",   langId: "HTML",   color: "from-red-400 to-orange-500" },
    { title: "CSS",    langId: "CSS",    color: "from-pink-400 to-rose-500" },
    { title: "JS",     langId: "JS",     color: "from-yellow-400 to-amber-500" },
    { title: "Python", langId: "Python", color: "from-blue-400 to-indigo-500" },
    { title: "Java",   langId: "Java",   color: "from-orange-500 to-red-600" },
    { title: "SQL",    langId: "SQL",    color: "from-teal-400 to-emerald-500" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-white p-6 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full text-center z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Code Battle Logo" className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500/30 filter drop-shadow-[0_0_20px_rgba(0,210,255,0.3)] animate-float" />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] mb-6">
          Welcome to <br />
          <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-md">
            Code Battle ⚔️
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
          Master programming languages, stack up XP points, collect achievements, and conquer quiz arenas in the ultimate code battle game.
        </p>

        {/* User Status Welcome Card */}
        {user && (
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md animate-fadeIn">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border-2 border-purple-500/40 object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-base">
                  {user.displayName ? user.displayName.charAt(0) : "U"}
                </div>
              )}
              <div className="text-left">
                <span className="text-[10px] text-purple-400 font-bold block uppercase tracking-widest leading-none mb-1">Logged In As</span>
                <span className="text-sm font-black text-white block">{user.displayName}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          {user ? (
            <>
              <button
                onClick={handleStart}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-500/40 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Terminal size={18} />
                <span>Start Learning</span>
              </button>
              <button
                onClick={onSignOut}
                className="w-full sm:w-auto px-8 py-4 bg-red-950/20 border border-red-500/20 hover:bg-red-900/30 text-red-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onSignIn}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-500/40 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.58h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.4C21.68,11.96 21.56,11.5 21.35,11.1z" />
                  <path fill="currentColor" d="M12,20.68c2.43,0 4.47,-0.8 5.96,-2.2l-3.3,-2.58c-0.92,0.62 -2.1,0.98 -3.66,0.98c-2.82,0 -5.2,-1.9 -6.05,-4.46H1.54v2.66C3.02,17.96 7.23,20.68 12,20.68z" />
                  <path fill="currentColor" d="M5.95,12.42c-0.22,-0.66 -0.35,-1.37 -0.35,-2.1c0,-0.73 0.13,-1.44 0.35,-2.1V5.56H1.54C0.78,7.08 0.35,8.8 0.35,10.32c0,1.52 0.43,3.24 1.19,4.76L5.95,12.42z" />
                  <path fill="currentColor" d="M12,5.56c1.6,0 3.03,0.55 4.16,1.63l3.12,-3.12C17.39,2.2 14.83,1.32 12,1.32C7.23,1.32 3.02,4.04 1.54,8.96l4.41,3.46C6.8,9.86 9.18,5.56 12,5.56z" />
                </svg>
                <span>Sign In with Google</span>
              </button>
              <button
                onClick={handleStart}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/25 text-gray-200 font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Terminal size={18} />
                <span>Play as Guest</span>
              </button>
            </>
          )}
          <button
            onClick={() => {
              playClick();
              alert("Code Battle is simple! Choose a coding language, answer 5 multiple-choice questions within 15 seconds each, rack up XP, and level up your player profile!");
            }}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/25 text-gray-400 hover:text-gray-200 font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <HelpCircle size={18} />
            <span>How It Works</span>
          </button>
        </div>

        {/* Supported Languages Label */}
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">
          CHOOSE YOUR QUEST PATH
        </span>

        {/* Languages grid */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {features.map((lang, index) => (
            <motion.div
              key={lang.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleStart}
              className="bg-white/5 border border-white/5 hover:border-white/15 p-4 rounded-xl text-center cursor-pointer transition-all relative overflow-hidden group"
            >
              {/* Highlight accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${lang.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                <LanguageLogo langId={lang.langId} size={42} />
              </div>
              <span className="text-xs font-bold text-gray-300 block">{lang.title}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
