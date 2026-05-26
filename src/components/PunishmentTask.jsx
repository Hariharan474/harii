import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, CheckCircle2, Code2, BookOpen } from "lucide-react";
import { playCorrect, playIncorrect, playClick } from "../utils/sound";

// Context-aware syntax database grouped by language
const SYNTAX_LESSONS = {
  JS: [
    {
      topic: "Nullish Coalescing (??)",
      description: "The ?? operator returns its right-hand side operand when its left-hand side operand is null or undefined, unlike || which evaluates falsy values (like 0 or '').",
      example: "const port = process.env.PORT ?? 3000;",
      challenge: "const theme = userTheme ___ 'dark';",
      instruction: "Fallback to 'dark' only if userTheme is null or undefined.",
      answer: "??"
    },
    {
      topic: "Arrow Functions (=>)",
      description: "Arrow functions allow a shorter syntax for writing function expressions. They do not bind their own 'this'.",
      example: "const add = (a, b) => a + b;",
      challenge: "const double = (x) ___ x * 2;",
      instruction: "Add the arrow operator to complete the double function expression.",
      answer: "=>"
    },
    {
      topic: "Optional Chaining (?.)",
      description: "The ?. operator reads properties deep within a chain of objects without having to validate each reference.",
      example: "const email = user?.profile?.email;",
      challenge: "const street = user?.address___street;",
      instruction: "Safely access the street property in case address is undefined.",
      answer: "?."
    }
  ],
  Python: [
    {
      topic: "List Comprehension",
      description: "List comprehensions provide a concise way to create lists using a for loop inside brackets.",
      example: "evens = [x for x in numbers if x % 2 == 0]",
      challenge: "squares = [x**2 ___ x in range(5)]",
      instruction: "Complete the list comprehension by adding the loop keyword.",
      answer: "for"
    },
    {
      topic: "Lambda Functions",
      description: "Lambda functions are small, anonymous, one-line functions defined with the lambda keyword.",
      example: "greet = lambda name: f'Hi {name}'",
      challenge: "add_ten = ___ x: x + 10",
      instruction: "Declare the anonymous lambda function to add 10 to a number.",
      answer: "lambda"
    },
    {
      topic: "F-strings",
      description: "F-strings (formatted string literals) allow embedding expressions inside string literals using curly braces {}.",
      example: "print(f'User: {name}')",
      challenge: "msg = ___'Active since {year}'",
      instruction: "Prefix the string literal to enable format expression evaluation.",
      answer: "f"
    }
  ],
  Java: [
    {
      topic: "Generic Types",
      description: "Generics ensure compile-time type safety by parameterizing types inside angle brackets.",
      example: "ArrayList<Integer> list = new ArrayList<>();",
      challenge: "Map___String, Integer> map = new HashMap<>();",
      instruction: "Open the generic type definition brackets.",
      answer: "<"
    },
    {
      topic: "Enhanced For Loop",
      description: "The enhanced for loop (for-each) iterates through arrays or collections using a colon (:) separator.",
      example: "for (int num : numbers) { ... }",
      challenge: "for (String name ___ names) { System.out.println(name); }",
      instruction: "Complete the enhanced for loop iterator statement.",
      answer: ":"
    },
    {
      topic: "Lambda Expressions",
      description: "Java lambdas implement functional interfaces using the arrow (->) syntax.",
      example: "btn.setOnAction(event -> handleEvent());",
      challenge: "runnableList.forEach(task ___ task.run());",
      instruction: "Add the lambda operator to execute run() on each task.",
      answer: "->"
    }
  ],
  CSS: [
    {
      topic: "CSS Variables",
      description: "CSS custom properties are defined with double hyphens (--) and accessed using the var() function.",
      example: "color: var(--main-color);",
      challenge: "background: ___(--theme-bg);",
      instruction: "Add the function keyword to reference the custom property variable.",
      answer: "var"
    },
    {
      topic: "CSS Grid",
      description: "CSS Grid is a two-dimensional grid-based layout system activated using the grid display value.",
      example: "display: grid;",
      challenge: "display: ___;",
      instruction: "Activate grid layout on this container element.",
      answer: "grid"
    },
    {
      topic: "ID Selector Specificity",
      description: "ID selectors target a single element with a specific ID attribute and are prefixed with a hash (#) symbol.",
      example: "#main-container { width: 100%; }",
      challenge: "___app-root { display: flex; }",
      instruction: "Select the HTML element with id='app-root'.",
      answer: "#"
    }
  ],
  HTML: [
    {
      topic: "Anchor Hyperlink Source",
      description: "The <a> element creates links, defining the target URL using the href attribute.",
      example: "<a href='https://example.com'>Visit Us</a>",
      challenge: "<a ___='/dashboard'>Home</a>",
      instruction: "Add the attribute that specifies the destination URL.",
      answer: "href"
    },
    {
      topic: "Image Source Attribute",
      description: "The <img> tag embeds an image, using the src attribute for the image path.",
      example: "<img src='logo.png' alt='Logo' />",
      challenge: "<img ___={profilePic} alt='User Avatar' />",
      instruction: "Specify the image source file path attribute.",
      answer: "src"
    },
    {
      topic: "Form Placeholder Hint",
      description: "The placeholder attribute defines a temporary hint shown in input fields before typing.",
      example: "<input placeholder='Enter text...' />",
      challenge: "<input type='email' ___='name@domain.com' />",
      instruction: "Add the input hint attribute for an email form field.",
      answer: "placeholder"
    }
  ],
  SQL: [
    {
      topic: "Pattern Matching (LIKE)",
      description: "The LIKE operator is used with wildcards (% or _) to search for matching substring patterns in columns.",
      example: "SELECT * FROM users WHERE email LIKE '%@gmail.com';",
      challenge: "SELECT * FROM products WHERE name ___ 'Tech%';",
      instruction: "Perform a wildcard search for products starting with 'Tech'.",
      answer: "LIKE"
    },
    {
      topic: "Data Grouping",
      description: "The GROUP BY clause groups rows that have the same values into summary rows (like count or average).",
      example: "SELECT dept, AVG(salary) FROM employees GROUP BY dept;",
      challenge: "SELECT role, COUNT(*) FROM users ___ BY role;",
      instruction: "Complete the aggregate grouping clause.",
      answer: "GROUP"
    },
    {
      topic: "Sorting Results (ORDER BY)",
      description: "The ORDER BY clause sorts query results in ascending (ASC) or descending (DESC) order.",
      example: "SELECT * FROM items ORDER BY price DESC;",
      challenge: "SELECT * FROM employees ORDER ___ salary ASC;",
      instruction: "Complete the sort ordering clause.",
      answer: "BY"
    }
  ]
};

export default function PunishmentTask({ language, onComplete }) {
  const [task, setTask] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [solved, setSolved] = useState(false);
  const [showError, setShowError] = useState(false);
  const [failuresCount, setFailuresCount] = useState(0);
  const inputRef = useRef(null);

  // Helper to load a random syntax lesson, preferably different from the current one
  const loadRandomTask = (currentTask = null) => {
    const activeLang = language || "JS";
    const lessonsList = SYNTAX_LESSONS[activeLang] || SYNTAX_LESSONS["JS"];
    
    let filteredList = lessonsList;
    if (currentTask && lessonsList.length > 1) {
      filteredList = lessonsList.filter((l) => l.topic !== currentTask.topic);
    }
    
    const randomIndex = Math.floor(Math.random() * filteredList.length);
    setTask(filteredList[randomIndex]);
    setTypedText("");
  };

  // Initialize a random task based on language on mount
  useEffect(() => {
    loadRandomTask();
  }, [language]);

  // Focus the text input when task is loaded
  useEffect(() => {
    if (task && inputRef.current) {
      inputRef.current.focus();
    }
  }, [task]);

  const handleVerify = (e) => {
    e.preventDefault();
    if (solved) return;

    const trimmedInput = typedText.trim();
    const isSQL = (language || "JS") === "SQL";

    // SQL matches are case-insensitive. Other languages match exactly.
    const isCorrect = isSQL
      ? trimmedInput.toUpperCase() === task.answer.toUpperCase()
      : trimmedInput === task.answer;

    if (isCorrect) {
      triggerSuccess();
    } else {
      playIncorrect();
      setShowError(true);
      setFailuresCount((prev) => prev + 1);
      setTimeout(() => {
        setShowError(false);
        loadRandomTask(task); // Load new syntax challenge when they fail!
      }, 800);
    }
  };

  const triggerSuccess = () => {
    setSolved(true);
    playCorrect();
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  if (!task) return null;

  // Split challenge into left and right parts at "___" for inline rendering
  const parts = task.challenge.split("___");
  const left = parts[0] || "";
  const right = parts[1] || "";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: 20 }}
      className="glass-panel p-6 rounded-2xl border-2 border-red-500/40 bg-red-950/20 shadow-[0_0_30px_rgba(239,68,68,0.15)] relative overflow-hidden mt-6"
    >
      {/* Red ambient warning pulse */}
      <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />

      {/* Grid Layout: Akira on left, Task on right */}
      <div className="flex flex-col md:flex-row items-start gap-5 relative z-10">
        
        {/* Akira Mentor Avatar */}
        <div className="flex flex-col items-center flex-shrink-0 mx-auto md:mx-0">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
            <img
              src="/character_mentor.png"
              alt="Akira, Code Sentinel"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[10px] font-black text-red-400 mt-2 tracking-widest uppercase text-center">
            AKIRA (SENTINEL)
          </span>
        </div>

        {/* Task Details & UI */}
        <div className="flex-1 space-y-4 w-full">
          <div className="flex items-center justify-between text-red-400 w-full">
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} className="animate-bounce flex-shrink-0" />
              <span className="text-[10px] font-black tracking-widest uppercase">
                SYNTAX OVERRIDE REQUIRED: {language || "JS"} DETECTED
              </span>
            </div>
            {failuresCount > 0 && (
              <span className="text-[9px] font-bold bg-red-500/20 border border-red-500/30 px-2 py-0.5 rounded-full text-red-300 tracking-wider">
                Rotations: {failuresCount}
              </span>
            )}
          </div>

          {/* Akira Dialog */}
          <div className="bg-black/30 border border-white/5 p-3 rounded-xl">
            <p className="text-xs text-red-200 italic leading-relaxed">
              {failuresCount === 0
                ? "Access Locked! Your syntax compilation failed. Review the concept below and enter the correct compiler bypass parameter."
                : `Bypass attempt failed! The compiler has rotated its security signature. You must master this new syntax concept to bypass: ${task.topic}!`}
            </p>
          </div>

          {/* Syntax Lesson Card */}
          <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-1.5 text-purple-400">
              <BookOpen size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">{task.topic}</span>
            </div>
            
            <p className="text-xs text-gray-300 leading-relaxed">
              {task.description}
            </p>

            <div className="bg-black/40 border border-white/5 p-3 rounded-lg">
              <span className="text-[10px] font-black text-purple-400 tracking-wider block mb-1 uppercase">Reference Model</span>
              <pre className="text-xs font-mono text-purple-200 whitespace-pre-wrap">{task.example}</pre>
            </div>
          </div>

          {/* Inline Challenge Section */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-gray-300 text-xs font-bold">
              <Code2 size={14} className="text-red-400" />
              <span>Bypass Code Challenge: {task.instruction}</span>
            </div>

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
                <motion.form
                  onSubmit={handleVerify}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`${showError ? "animate-shake" : ""} space-y-3`}
                >
                  <div className="bg-black/60 font-mono text-xs sm:text-sm p-4 rounded-xl border border-red-500/30 shadow-inner relative overflow-hidden flex flex-wrap items-center gap-1.5 min-h-[56px]">
                    <span className="text-gray-300 select-none">{left}</span>
                    <input
                      ref={inputRef}
                      type="text"
                      required
                      value={typedText}
                      onChange={(e) => setTypedText(e.target.value)}
                      className="bg-red-500/10 border border-red-500/50 text-red-200 text-center font-bold px-2 py-0.5 rounded-lg focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all font-mono placeholder-red-700/60"
                      placeholder="???"
                      style={{ width: `${Math.max(45, typedText.length * 10 + 15)}px` }}
                    />
                    <span className="text-gray-300 select-none">{right}</span>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-lg shadow-red-900/30 transition-all hover:scale-[1.02]"
                    >
                      Verify Syntax Override
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
