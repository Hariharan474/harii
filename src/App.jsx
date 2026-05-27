import React, { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import TelemetryDashboard from "./pages/TelemetryDashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import WaveBackground from "./components/WaveBackground";
import CustomCursor from "./components/CursorRipple";
import { setMuted, getMuted, playLevelUp } from "./utils/sound";
import { Award, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, googleProvider } from "./utils/firebase";
import { onAuthStateChanged, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import LoginGate from "./components/LoginGate";

export default function App() {
  // --- Persistent State Initialization ---
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("cq_username") || "Guest";
  });
  const [sessionStarted, setSessionStarted] = useState(false);

  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem("cq_page") || "landing";
  });

  const [xp, setXp] = useState(() => {
    const val = localStorage.getItem("cq_xp");
    return val ? parseInt(val, 10) : 0;
  });

  const [streak, setStreak] = useState(() => {
    const val = localStorage.getItem("cq_streak");
    return val ? parseInt(val, 10) : 0;
  });

  const [highScores, setHighScores] = useState(() => {
    const val = localStorage.getItem("cq_highscores");
    return val ? JSON.parse(val) : {
      JS: null,
      Python: null,
      Java: null,
      CSS: null,
      HTML: null,
      SQL: null
    };
  });

  const [badges, setBadges] = useState(() => {
    const val = localStorage.getItem("cq_badges");
    return val ? JSON.parse(val) : [];
  });

  const [soundMuted, setSoundMuted] = useState(() => {
    const val = localStorage.getItem("cq_muted");
    const parsed = val === "true";
    setMuted(parsed);
    return parsed;
  });

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("cq_language") || "JS";
  });

  const [quizResults, setQuizResults] = useState(() => {
    const val = localStorage.getItem("cq_quizresults");
    return val ? JSON.parse(val) : null;
  });

  const [langLevels, setLangLevels] = useState(() => {
    const val = localStorage.getItem("cq_langlevels");
    return val ? JSON.parse(val) : {
      JS: 1,
      Python: 1,
      Java: 1,
      CSS: 1,
      HTML: 1,
      SQL: 1
    };
  });

  // Badge notification toast state
  const [unlockedToast, setUnlockedToast] = useState(null);

  // --- Synchronization Effects ---
  useEffect(() => {
    localStorage.setItem("cq_page", currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("cq_xp", xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem("cq_streak", streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("cq_highscores", JSON.stringify(highScores));
  }, [highScores]);

  useEffect(() => {
    localStorage.setItem("cq_badges", JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem("cq_language", selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    if (quizResults) {
      localStorage.setItem("cq_quizresults", JSON.stringify(quizResults));
    } else {
      localStorage.removeItem("cq_quizresults");
    }
  }, [quizResults]);

  useEffect(() => {
    localStorage.setItem("cq_username", userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("cq_langlevels", JSON.stringify(langLevels));
  }, [langLevels]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Sign-in error details:", error);
      alert(`Sign-in failed: ${error.message || error}\n\nTroubleshooting tips:\n1. Open your Firebase Console and check that Google Sign-in is enabled in Authentication > Sign-in method.\n2. Verify that this website domain is listed in your Firebase Console's Authorized Domains.`);
    }
  };

  const handleEmailSignIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Email sign-in error details:", error);
      alert(`Sign-in failed: ${error.message || error}\n\nTroubleshooting tips:\n1. Make sure Email/Password Sign-in provider is enabled in Firebase Console > Authentication > Sign-in method.\n2. Verify you typed the correct email and password.`);
      throw error;
    }
  };

  const handleEmailSignUp = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      // Update local state to reflect displayName immediately
      setUser({ ...userCredential.user, displayName });
    } catch (error) {
      console.error("Email sign-up error details:", error);
      alert(`Sign-up failed: ${error.message || error}\n\nTroubleshooting tips:\n1. Make sure Email/Password Sign-in provider is enabled in Firebase Console.\n2. Ensure the email is not already in use.`);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSessionStarted(false); // Direct back to Login Gate
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  // Audio configuration sync
  const toggleSound = () => {
    const nextMute = !soundMuted;
    setSoundMuted(nextMute);
    setMuted(nextMute);
    localStorage.setItem("cq_muted", nextMute.toString());
  };

  // --- Badge Checking Logic ---
  const checkBadgeUnlocks = (newXp, newHighScores, correctCount, totalQuestions, newStreak) => {
    const newlyUnlocked = [];
    const currentLevel = Math.floor(newXp / 1000) + 1;

    const unlock = (badgeId, title) => {
      if (!badges.includes(badgeId) && !newlyUnlocked.includes(badgeId)) {
        newlyUnlocked.push(badgeId);
        showBadgeToast(title);
      }
    };

    // Badge 1: First Step
    unlock("first_quiz", "First Step");

    // Badge 2: Code Oracle (Perfect score)
    if (correctCount === totalQuestions) {
      unlock("perfect_score", "Code Oracle");
    }

    // Badge 3: Hot Streak
    if (newStreak >= 5) {
      unlock("five_streak", "Hot Streak");
    }

    // Badge 4: XP Collector
    if (newXp >= 1000) {
      unlock("xp_collector", "XP Collector");
    }

    // Badge 5: Polyglot Master (Scores in 3 different subjects)
    const completedCount = Object.keys(newHighScores).filter(k => newHighScores[k] !== null).length;
    if (completedCount >= 3) {
      unlock("polyglot", "Polyglot Master");
    }

    // Badge 6: Query Emperor (SQL High Score)
    if (newHighScores["SQL"] && newHighScores["SQL"] >= 80) {
      unlock("sql_high", "Query Emperor");
    }

    if (newlyUnlocked.length > 0) {
      setBadges((prev) => [...prev, ...newlyUnlocked]);
    }
  };

  const showBadgeToast = (title) => {
    setUnlockedToast(title);
    // Play level up note for badges too since it is celebratory
    setTimeout(() => {
      playLevelUp();
    }, 100);
  };

  // Auto-clear toast after 5s
  useEffect(() => {
    if (unlockedToast) {
      const timer = setTimeout(() => {
        setUnlockedToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [unlockedToast]);

  // --- Global Callback Handlers ---
  const handleSelectLanguage = (langId) => {
    setSelectedLanguage(langId);
    setCurrentPage("quiz");
  };

  const handleQuizFinished = ({ score, correctCount, totalQuestions, xpGained, language, questions }) => {
    const accuracy = Math.round((correctCount / totalQuestions) * 100);

    // 1. Calculate and update XP
    const prevLevel = Math.floor(xp / 1000) + 1;
    const newXp = xp + xpGained;
    const nextLevel = Math.floor(newXp / 1000) + 1;
    setXp(newXp);

    if (nextLevel > prevLevel) {
      setTimeout(() => {
        playLevelUp();
      }, 800);
    }

    // 2. Update Streak
    const newStreak = streak === 0 ? 1 : streak + 1;
    setStreak(newStreak);

    // 3. Update High Scores
    const newHighScores = { ...highScores };
    const currentHighScore = highScores[language];
    if (currentHighScore === null || accuracy > currentHighScore) {
      newHighScores[language] = accuracy;
      setHighScores(newHighScores);
    }

    // 4. Save results state
    const resultObj = { score, correctCount, totalQuestions, xpGained, language, questions };
    setQuizResults(resultObj);

    // 5. Update language level (cycle 1 -> 2 -> 3 -> 1)
    setLangLevels((prev) => {
      const currentLvl = prev[language] || 1;
      const nextLvl = currentLvl < 3 ? currentLvl + 1 : 1;
      return {
        ...prev,
        [language]: nextLvl
      };
    });

    // 6. Check achievement unlocks
    checkBadgeUnlocks(newXp, newHighScores, correctCount, totalQuestions, newStreak);

    // 7. Navigate to results page
    setCurrentPage("results");
  };

  const handleRetakeQuiz = (langId) => {
    setSelectedLanguage(langId);
    setQuizResults(null);
    setCurrentPage("quiz");
  };

  const handleResetData = () => {
    setXp(0);
    setStreak(0);
    setBadges([]);
    setHighScores({
      JS: null,
      Python: null,
      Java: null,
      CSS: null,
      HTML: null,
      SQL: null
    });
    setLangLevels({
      JS: 1,
      Python: 1,
      Java: 1,
      CSS: 1,
      HTML: 1,
      SQL: 1
    });
    setQuizResults(null);
    setCurrentPage("dashboard");
    localStorage.clear();
  };

  // --- Page Router ---
  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return (
          <Landing
            setCurrentPage={setCurrentPage}
            user={user}
            onSignIn={handleGoogleSignIn}
            onSignOut={handleSignOut}
          />
        );
      case "dashboard":
        return (
          <Dashboard
            xp={xp}
            streak={streak}
            highScores={highScores}
            langLevels={langLevels}
            onSelectLanguage={handleSelectLanguage}
            setCurrentPage={setCurrentPage}
            user={user}
            userName={userName}
            setUserName={setUserName}
          />
        );
      case "quiz":
        return (
          <Quiz
            language={selectedLanguage}
            xp={xp}
            langLevel={langLevels[selectedLanguage] || 1}
            onBackToDashboard={() => setCurrentPage("dashboard")}
            onQuizFinished={handleQuizFinished}
          />
        );
      case "results":
        return quizResults ? (
          <Results
            results={quizResults}
            onBackToDashboard={() => {
              setQuizResults(null);
              setCurrentPage("dashboard");
            }}
            onRetakeQuiz={handleRetakeQuiz}
          />
        ) : (
          <Dashboard
            xp={xp}
            streak={streak}
            highScores={highScores}
            langLevels={langLevels}
            onSelectLanguage={handleSelectLanguage}
            user={user}
            userName={userName}
            setUserName={setUserName}
          />
        );
      case "leaderboard":
        return <Leaderboard xp={xp} />;
      case "profile":
        return (
          <Profile
            xp={xp}
            streak={streak}
            badges={badges}
            highScores={highScores}
            onResetData={handleResetData}
            user={user}
            userName={userName}
            setUserName={setUserName}
            onSignIn={handleGoogleSignIn}
            onSignOut={handleSignOut}
          />
        );
      case "telemetry":
        return null; // Rendered separately below (full-screen)
      default:
        return (
          <Landing
            setCurrentPage={setCurrentPage}
            user={user}
            onSignIn={handleGoogleSignIn}
            onSignOut={handleSignOut}
          />
        );
    }
  };

  // --- Login Gate Override ---
  // If the user is not logged in with Google AND has not started their session,
  // we display the LoginGate gateway full-screen.
  const showLoginGate = !user && !sessionStarted;

  if (showLoginGate) {
    return (
      <div className="relative min-h-screen text-white overflow-hidden bg-black">
        <WaveBackground />
        <CustomCursor />
        <LoginGate
          userName={userName}
          onSignIn={handleGoogleSignIn}
          onEmailSignIn={handleEmailSignIn}
          onEmailSignUp={handleEmailSignUp}
          onJoinArena={(name) => {
            setUserName(name);
            setSessionStarted(true);
          }}
        />
      </div>
    );
  }

  // Render Layout Shell:
  // If we are on landing, we don't display Sidebar and Navbar.
  // If we are on telemetry, we render full-screen.
  // Otherwise, we wrap pages in our main container.
  if (currentPage === "landing") {
    return (
      <div className="relative min-h-screen text-white overflow-hidden bg-black">
        <WaveBackground />
        <CustomCursor />
        {renderPage()}
        <BadgeToast toast={unlockedToast} setToast={setUnlockedToast} />
      </div>
    );
  }

  if (currentPage === "telemetry") {
    return (
      <>
        <CustomCursor />
        <TelemetryDashboard onBack={() => setCurrentPage("dashboard")} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex bg-black text-white overflow-hidden relative">
      <WaveBackground />
      <CustomCursor />

      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-800/5 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        soundMuted={soundMuted}
        toggleSound={toggleSound}
      />

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          xp={xp}
          streak={streak}
          user={user}
          onSignIn={handleGoogleSignIn}
          onSignOut={handleSignOut}
        />

        {/* Content Box */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto z-10">
          <div className="max-w-4xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>

      {/* Achievement Unlock Toast popup */}
      <BadgeToast toast={unlockedToast} setToast={setUnlockedToast} />
    </div>
  );
}

// Subcomponent for Badge Unlocked Toast Notification
function BadgeToast({ toast, setToast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl glass-panel border-purple-500 bg-purple-950/80 shadow-2xl flex items-center gap-3.5 max-w-sm"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white shadow shadow-black/25">
            <Award size={20} className="animate-bounce" />
          </div>
          <div>
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest block">
              BADGE UNLOCKED!
            </span>
            <span className="text-sm font-bold text-white block mt-0.5">
              {toast}
            </span>
          </div>
          <button
            onClick={() => setToast(null)}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 ml-3"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
