import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Award, RefreshCw, Home, CheckCircle2, XCircle } from "lucide-react";
import { playCheer, playClick } from "../utils/sound";
import { sampleQuestions } from "../data/questions";

export default function Results({ results, onBackToDashboard, onRetakeQuiz }) {
  const { correctCount, totalQuestions, xpGained, language, questions: quizQuestions } = results;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  // Play celebration sound on mount
  useEffect(() => {
    playCheer();
  }, []);

  const getCelebrationDetails = () => {
    if (accuracy === 100) {
      return { title: "Perfect Score! 🏆", subtitle: "You are an absolute coding legend!", color: "text-yellow-400" };
    } else if (accuracy >= 80) {
      return { title: "Excellent 🎉", subtitle: "Superb work! You really know your stuff.", color: "text-green-400" };
    } else if (accuracy >= 50) {
      return { title: "Good Job! 👍", subtitle: "Nice work. Keep practicing to reach master level.", color: "text-blue-400" };
    } else {
      return { title: "Keep Practicing! 💪", subtitle: "Review the answers below and try again.", color: "text-red-400" };
    }
  };

  const congrats = getCelebrationDetails();
  const questions = quizQuestions || sampleQuestions[language] || [];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn py-4">
      {/* Visual Celebration Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-8 rounded-2xl text-center border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full pointer-events-none" />

        <h1 className={`text-3xl sm:text-4xl font-black ${congrats.color}`}>
          {congrats.title}
        </h1>
        <p className="text-gray-300 text-sm mt-2 font-medium">
          {congrats.subtitle}
        </p>

        {/* Accuracy Circle */}
        <div className="my-8 flex justify-center">
          <div className="relative w-36 h-36 flex items-center justify-center rounded-full bg-black/40 border border-white/10 shadow-inner">
            {/* Visual gradient overlay circle */}
            <div className="absolute inset-2.5 rounded-full bg-gradient-to-br from-purple-600/10 to-indigo-600/10" />
            <div className="z-10 text-center">
              <span className="text-3xl font-black text-white">{accuracy}%</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mt-0.5">
                Accuracy
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl text-center">
            <span className="text-xs text-gray-400 font-semibold block">Score</span>
            <span className="text-xl font-bold text-white mt-1 block">
              {correctCount} / {totalQuestions}
            </span>
          </div>
          <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/20 p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-purple-300 font-semibold">
              <Zap size={13} fill="purple" />
              <span>XP Earned</span>
            </div>
            <span className="text-xl font-black text-white mt-1 block">
              +{xpGained} XP
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              playClick();
              onRetakeQuiz(language);
            }}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm"
          >
            <RefreshCw size={16} />
            <span>Retake Quiz</span>
          </button>
          
          <button
            onClick={() => {
              playClick();
              onBackToDashboard();
            }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm"
          >
            <Home size={16} />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </motion.div>

      {/* Review Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <span>Review Answers</span>
        </h2>
        
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="glass-panel p-5 rounded-xl border border-white/5 space-y-3 relative overflow-hidden"
            >
              <h3 className="font-bold text-sm sm:text-base text-white pr-6">
                <span className="text-purple-400 mr-1.5">{idx + 1}.</span>
                {q.question}
              </h3>
              
              <div className="text-xs space-y-1.5 font-medium">
                <div className="flex items-start gap-1.5 text-green-400">
                  <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold">Correct:</span> {q.options[q.answer]}
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-400 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                {q.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
