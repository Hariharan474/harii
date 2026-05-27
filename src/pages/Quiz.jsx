import React, { useState, useEffect, useRef } from "react";
import QuizBox from "../components/QuizBox";
import { sampleQuestions } from "../data/questions";
import { playCorrect, playIncorrect, playClick } from "../utils/sound";
import { ArrowLeft } from "lucide-react";
import LanguageLogo from "../components/LanguageLogos";

export default function Quiz({ language, xp, langLevel, onBackToDashboard, onQuizFinished }) {
  const [questions] = useState(() => {
    const originalQs = sampleQuestions[language] || [];
    
    // Extract pools for each difficulty level (1, 2, 3). Fallback to all if a level has no questions.
    const level1 = originalQs.filter((q) => q.level === 1);
    const level2 = originalQs.filter((q) => q.level === 2);
    const level3 = originalQs.filter((q) => q.level === 3);
    
    // Helper to shuffle and take up to 5 items from a pool
    const pickFive = (pool) => {
      const shuffled = [...pool];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, 5);
    };
    
    // Select up to 5 questions from each level
    const selectedLevel1 = pickFive(level1);
    const selectedLevel2 = pickFive(level2);
    const selectedLevel3 = pickFive(level3);
    
    // Combine and shuffle the final set
    const combined = [...selectedLevel1, ...selectedLevel2, ...selectedLevel3];
    const finalShuffled = [];
    const poolCopy = [...combined];
    for (let i = poolCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [poolCopy[i], poolCopy[j]] = [poolCopy[j], poolCopy[i]];
    }
    // poolCopy is now shuffled; use it as the final question list
    
    return poolCopy.map((q) => {
      const indices = q.options.map((_, idx) => idx);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return {
        ...q,
        options: indices.map((idx) => q.options[idx]),
        answer: indices.indexOf(q.answer),
      };
    });
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [punishmentActive, setPunishmentActive] = useState(false);
  const [punishmentCompleted, setPunishmentCompleted] = useState(false);
  const [solvedSyntaxTopics, setSolvedSyntaxTopics] = useState([]);
  const timerRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  // Start timer for the current question
  useEffect(() => {
    if (showResult) return;
    
    setTimeLeft(15);
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, showResult]);

  // Handle timeout (auto submit wrong answer)
  const handleTimeOut = () => {
    setSelectedOption(null);
    setShowResult(true);
    playIncorrect();
    setPunishmentActive(true);
    setPunishmentCompleted(false);
  };

  // Handle user selecting an option
  const handleAnswerSubmit = (optionIndex) => {
    if (showResult) return;
    
    clearInterval(timerRef.current);
    setSelectedOption(optionIndex);
    setShowResult(true);

    if (optionIndex === currentQuestion.answer) {
      setScore((prev) => prev + 10);
      setCorrectCount((prev) => prev + 1);
      playCorrect();
      setPunishmentActive(false);
      setPunishmentCompleted(true);
    } else {
      playIncorrect();
      setPunishmentActive(true);
      setPunishmentCompleted(false);
    }
  };

  // Move to next question or finish quiz
  const handleNextQuestion = () => {
    playClick();
    if (currentIndex < questions.length - 1) {
      setSelectedOption(null);
      setShowResult(false);
      setPunishmentActive(false);
      setPunishmentCompleted(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished!
      const xpGained = correctCount * 50; // 50 XP per correct answer
      onQuizFinished({
        score: score + (correctCount === questions.length ? 50 : 0), // 50 bonus points for perfect score
        correctCount,
        totalQuestions: questions.length,
        xpGained,
        language,
        questions
      });
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <p className="text-red-400 font-bold">Error: No questions found for {language}!</p>
        <button
          onClick={onBackToDashboard}
          className="px-4 py-2 bg-purple-600 rounded-xl text-white font-bold"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-4">
      {/* Quiz Navigation bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <button
          onClick={() => {
            playClick();
            if (confirm("Are you sure you want to exit the quiz? Your current progress will be lost.")) {
              onBackToDashboard();
            }
          }}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Exit Arena</span>
        </button>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/30 border border-purple-500/20 text-xs font-bold text-purple-300">
          <LanguageLogo langId={language} size={18} />
          <span>Arena Topic: {language === "JS" ? "JavaScript" : language}</span>
        </div>
      </div>

      <QuizBox
        language={language}
        xp={xp}
        langLevel={langLevel}
        question={currentQuestion}
        qIndex={currentIndex}
        totalQs={questions.length}
        selectedOption={selectedOption}
        showResult={showResult}
        onSubmitAnswer={handleAnswerSubmit}
        onNextQuestion={handleNextQuestion}
        timeLeft={timeLeft}
        punishmentActive={punishmentActive}
        punishmentCompleted={punishmentCompleted}
        onPunishmentComplete={() => {
          setPunishmentCompleted(true);
          handleNextQuestion();
        }}
        solvedSyntaxTopics={solvedSyntaxTopics}
        onSolveTopic={(topic) => setSolvedSyntaxTopics((prev) => [...prev, topic])}
      />
    </div>
  );
}
