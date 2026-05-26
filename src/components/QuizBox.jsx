import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import PunishmentTask from "./PunishmentTask";

export default function QuizBox({
  language,
  question,
  qIndex,
  totalQs,
  selectedOption,
  showResult,
  onSubmitAnswer,
  onNextQuestion,
  timeLeft,
  punishmentActive,
  punishmentCompleted,
  onPunishmentComplete,
}) {
  const percentComplete = Math.round(((qIndex) / totalQs) * 100);

  const getOptionStyle = (idx) => {
    if (!showResult) {
      return "bg-black/30 border border-white/10 hover:bg-white/5 hover:border-purple-500/50 hover:scale-[1.01]";
    }
    if (idx === question.answer) {
      return "bg-green-500/20 border-green-500 text-green-200 font-bold shadow-lg shadow-green-500/5";
    }
    if (idx === selectedOption) {
      return "bg-red-500/20 border-red-500 text-red-200 font-bold shadow-lg shadow-red-500/5";
    }
    return "bg-black/20 border border-white/5 text-gray-500 opacity-60";
  };

  const isWrongAnswer = showResult && selectedOption !== null && selectedOption !== question.answer;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Quiz Header Progress */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex-1 mr-4">
          <div className="flex justify-between text-xs text-gray-400 font-semibold mb-2">
            <span>Progress: {percentComplete}%</span>
            <span>Question {qIndex + 1} of {totalQs}</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${((qIndex + 1) / totalQs) * 100}%` }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all duration-300 ${
          timeLeft <= 5
            ? "bg-red-500/10 border-red-500/30 text-red-400 animate-pulse"
            : "bg-white/5 border-white/10 text-gray-300"
        }`}>
          <Clock size={15} />
          <span className="font-bold text-sm w-4 text-center">{timeLeft}</span>
        </div>
      </div>

      {/* Main Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className={`glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl ${isWrongAnswer ? "animate-shake" : ""}`}
        >
          {/* Question Text */}
          <h2 className="text-lg md:text-xl font-bold text-white mb-6 leading-snug">
            {question.question}
          </h2>

          {/* Option Grid */}
          <div className="space-y-3">
            {question.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              const isCorrect = question.answer === i;
              return (
                <button
                  key={i}
                  disabled={showResult}
                  onClick={() => onSubmitAnswer(i)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 flex items-center justify-between text-sm sm:text-base outline-none ${getOptionStyle(i)}`}
                >
                  <span className="pr-4">{opt}</span>
                  {showResult && (
                    <div className="flex-shrink-0">
                      {isCorrect && <CheckCircle2 size={18} className="text-green-400" />}
                      {!isCorrect && isSelected && <XCircle size={18} className="text-red-400" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Block */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-5 border-t border-white/10"
            >
              <div className="bg-purple-950/20 border border-purple-500/20 p-4 rounded-xl">
                <span className="text-xs font-black text-purple-400 tracking-wider block mb-1 uppercase">
                  Explanation
                </span>
                <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
                  {question.explanation || "No explanation details available."}
                </p>
              </div>

              {/* Punishment or Next Button */}
              {punishmentActive && !punishmentCompleted ? (
                <PunishmentTask language={language} onComplete={onPunishmentComplete} />
              ) : (
                <button
                  onClick={onNextQuestion}
                  className="mt-5 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5"
                >
                  <span>{qIndex === totalQs - 1 ? "Finish Quiz" : "Next Question"}</span>
                  <span>➜</span>
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
