import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, CheckCircle2, Code2, BookOpen } from "lucide-react";
import { playCorrect, playIncorrect, playClick } from "../utils/sound";

// Context-aware syntax database grouped by language
const SYNTAX_LESSONS = {
  JS: [
    // Level 1: Easy
    {
      level: 1,
      topic: "Arrow Functions (=>)",
      description: "Arrow functions allow a shorter syntax for writing function expressions. They do not bind their own 'this'.",
      example: "const add = (a, b) => a + b;",
      challenge: "const double = (x) ___ x * 2;",
      instruction: "Add the arrow operator to complete the double function expression.",
      answer: "=>"
    },
    {
      level: 1,
      topic: "Template Literals (`)",
      description: "Template literals are string literals allowing embedded expressions. They are enclosed by backticks.",
      example: "const text = `Hello ${name}`;",
      challenge: "const msg = ___Hello ${name}___;",
      instruction: "Enclose the template literal using backticks.",
      answer: "`"
    },
    {
      level: 1,
      topic: "Block Scope (const)",
      description: "Variables defined with const cannot be redeclared or reassigned. They are block-scoped.",
      example: "const PI = 3.14159;",
      challenge: "___ PI = 3.14159;",
      instruction: "Declare a read-only constant variable PI.",
      answer: "const"
    },
    // Level 2: Medium
    {
      level: 2,
      topic: "Nullish Coalescing (??)",
      description: "The ?? operator returns its right-hand side operand when its left-hand side operand is null or undefined, unlike || which evaluates falsy values (like 0 or '').",
      example: "const port = process.env.PORT ?? 3000;",
      challenge: "const theme = userTheme ___ 'dark';",
      instruction: "Fallback to 'dark' only if userTheme is null or undefined.",
      answer: "??"
    },
    {
      level: 2,
      topic: "Optional Chaining (?.)",
      description: "The ?. operator reads properties deep within a chain of objects without having to validate each reference.",
      example: "const email = user?.profile?.email;",
      challenge: "const street = user?.address___street;",
      instruction: "Safely access the street property in case address is undefined.",
      answer: "?."
    },
    {
      level: 2,
      topic: "Object Destructuring ({)",
      description: "Object destructuring allows you to unpack properties from objects into distinct variables.",
      example: "const { name } = user;",
      challenge: "const ___ name } = user;",
      instruction: "Start the destructuring syntax to extract the name property.",
      answer: "{"
    },
    // Level 3: Hard
    {
      level: 3,
      topic: "Logical OR Assignment (||=)",
      description: "The logical OR assignment (||=) operator only assigns if the left-hand side is falsy.",
      example: "options.color ||= 'blue';",
      challenge: "options.color ___= 'blue';",
      instruction: "Assign 'blue' to color only if it evaluates to a falsy value.",
      answer: "||"
    },
    {
      level: 3,
      topic: "Concurrent Promises (Promise.all)",
      description: "Promise.all takes an iterable of promises and returns a single Promise that resolves when all input promises resolve.",
      example: "await Promise.all([p1, p2]);",
      challenge: "await Promise.___([p1, p2]);",
      instruction: "Complete the statement to run promises concurrently.",
      answer: "all"
    },
    {
      level: 3,
      topic: "Dynamic Import (import)",
      description: "Dynamic imports allow loading JavaScript modules asynchronously and dynamically at runtime.",
      example: "const module = await import('./utils.js');",
      challenge: "const module = await ___('./utils.js');",
      instruction: "Add the dynamic module loader keyword.",
      answer: "import"
    }
  ],
  Python: [
    // Level 1: Easy
    {
      level: 1,
      topic: "List Comprehension",
      description: "List comprehensions provide a concise way to create lists using a for loop inside brackets.",
      example: "evens = [x for x in numbers if x % 2 == 0]",
      challenge: "squares = [x**2 ___ x in range(5)]",
      instruction: "Complete the list comprehension by adding the loop keyword.",
      answer: "for"
    },
    {
      level: 1,
      topic: "F-strings",
      description: "F-strings (formatted string literals) allow embedding expressions inside string literals using curly braces {}.",
      example: "print(f'User: {name}')",
      challenge: "msg = ___'Active since {year}'",
      instruction: "Prefix the string literal to enable format expression evaluation.",
      answer: "f"
    },
    {
      level: 1,
      topic: "Exponentiation",
      description: "Python uses double asterisks (**) to perform mathematical exponentiation (power operations).",
      example: "result = 5 ** 3",
      challenge: "cube = 5 ___ 3",
      instruction: "Raise 5 to the power of 3.",
      answer: "**"
    },
    // Level 2: Medium
    {
      level: 2,
      topic: "Lambda Functions",
      description: "Lambda functions are small, anonymous, one-line functions defined with the lambda keyword.",
      example: "greet = lambda name: f'Hi {name}'",
      challenge: "add_ten = ___ x: x + 10",
      instruction: "Declare the anonymous lambda function to add 10 to a number.",
      answer: "lambda"
    },
    {
      level: 2,
      topic: "Dictionary Safe Access",
      description: "The dictionary get() method retrieves a value for a key, returning a default value if key is not found.",
      example: "val = data.get('key', 'default')",
      challenge: "val = data.___('key', 'default')",
      instruction: "Access the key safely with default fallback.",
      answer: "get"
    },
    {
      level: 2,
      topic: "Loop Enumeration",
      description: "The enumerate() function adds a counter to an iterable and returns it as an enumerate object.",
      example: "for index, item in enumerate(items):",
      challenge: "for idx, val in ___ (items):",
      instruction: "Retrieve index and value concurrently in the loop.",
      answer: "enumerate"
    },
    // Level 3: Hard
    {
      level: 3,
      topic: "Context Manager",
      description: "Context managers allow proper allocation and release of resources, most commonly using the 'with' statement.",
      example: "with open('file.txt') as f:",
      challenge: "___ open('file.txt') as f:",
      instruction: "Open file safely using context manager setup.",
      answer: "with"
    },
    {
      level: 3,
      topic: "Generators",
      description: "Generators are functions that return an iterator using the yield keyword instead of return.",
      example: "def gen(): yield 1",
      challenge: "def gen(): ___ 1",
      instruction: "Complete the generator by producing the value 1 dynamically.",
      answer: "yield"
    },
    {
      level: 3,
      topic: "Decorators",
      description: "Decorators modify the behavior of a function or class using an '@' prefix prefixing another function name.",
      example: "@classmethod",
      challenge: "___classmethod\ndef get_info(cls):",
      instruction: "Declare get_info as a class method decorator.",
      answer: "@"
    }
  ],
  Java: [
    // Level 1: Easy
    {
      level: 1,
      topic: "Enhanced For Loop",
      description: "The enhanced for loop (for-each) iterates through arrays or collections using a colon (:) separator.",
      example: "for (int num : numbers) { ... }",
      challenge: "for (String name ___ names) { System.out.println(name); }",
      instruction: "Complete the enhanced for loop iterator statement.",
      answer: ":"
    },
    {
      level: 1,
      topic: "Main Method Entry",
      description: "The main method is the entry point for any Java program and does not return any value.",
      example: "public static void main(String[] args)",
      challenge: "public static ___ main(String[] args)",
      instruction: "Define the return type of the main entry point method.",
      answer: "void"
    },
    {
      level: 1,
      topic: "Object Instantiation",
      description: "The 'new' operator instantiates a class by allocating memory for a new object on the heap.",
      example: "List list = new ArrayList();",
      challenge: "List list = ___ ArrayList();",
      instruction: "Instantiate a new ArrayList object.",
      answer: "new"
    },
    // Level 2: Medium
    {
      level: 2,
      topic: "Generic Types",
      description: "Generics ensure compile-time type safety by parameterizing types inside angle brackets.",
      example: "ArrayList<Integer> list = new ArrayList<>();",
      challenge: "Map___String, Integer> map = new HashMap<>();",
      instruction: "Open the generic type definition brackets.",
      answer: "<"
    },
    {
      level: 2,
      topic: "Lambda Expressions",
      description: "Java lambdas implement functional interfaces using the arrow (->) syntax.",
      example: "btn.setOnAction(event -> handleEvent());",
      challenge: "runnableList.forEach(task ___ task.run());",
      instruction: "Add the lambda operator to execute run() on each task.",
      answer: "->"
    },
    {
      level: 2,
      topic: "Ternary Operator",
      description: "The ternary operator provides a shorthand way of writing an if-else statement using a question mark.",
      example: "int max = (a > b) ? a : b;",
      challenge: "int max = (a > b) ___ a : b;",
      instruction: "Complete the ternary conditional evaluation.",
      answer: "?"
    },
    // Level 3: Hard
    {
      level: 3,
      topic: "Streams API Filtering",
      description: "The filter() stream operation filters elements of a stream based on a predicate condition.",
      example: "list.stream().filter(x -> x > 10);",
      challenge: "list.stream().___(x -> x > 10);",
      instruction: "Filter elements larger than 10 in the stream flow.",
      answer: "filter"
    },
    {
      level: 3,
      topic: "Interface Implementation",
      description: "The 'implements' keyword is used by classes to implement contracts/behaviors defined in interfaces.",
      example: "class Task implements Runnable",
      challenge: "class Task ___ Runnable {",
      instruction: "Declare that the Task class implements the Runnable interface.",
      answer: "implements"
    },
    {
      level: 3,
      topic: "Throwing Exceptions",
      description: "The 'throw' keyword is used to explicitly throw a single exception instance in code.",
      example: "throw new IllegalArgumentException();",
      challenge: "if (err) ___ new Exception();",
      instruction: "Explicitly throw a new Exception instance.",
      answer: "throw"
    }
  ],
  CSS: [
    // Level 1: Easy
    {
      level: 1,
      topic: "CSS Grid",
      description: "CSS Grid is a two-dimensional grid-based layout system activated using the grid display value.",
      example: "display: grid;",
      challenge: "display: ___;",
      instruction: "Activate grid layout on this container element.",
      answer: "grid"
    },
    {
      level: 1,
      topic: "Class Selector",
      description: "Class selectors target HTML elements containing a specific class attribute and are prefixed with a dot (.)",
      example: ".active-btn { color: red; }",
      challenge: "___active-btn { color: red; }",
      instruction: "Target the class named 'active-btn'.",
      answer: "."
    },
    {
      level: 1,
      topic: "ID Selector Specificity",
      description: "ID selectors target a single element with a specific ID attribute and are prefixed with a hash (#) symbol.",
      example: "#main-container { width: 100%; }",
      challenge: "___app-root { display: flex; }",
      instruction: "Select the HTML element with id='app-root'.",
      answer: "#"
    },
    // Level 2: Medium
    {
      level: 2,
      topic: "CSS Variables",
      description: "CSS custom properties are defined with double hyphens (--) and accessed using the var() function.",
      example: "color: var(--main-color);",
      challenge: "background: ___(--theme-bg);",
      instruction: "Add the function keyword to reference the custom property variable.",
      answer: "var"
    },
    {
      level: 2,
      topic: "Hover State",
      description: "The :hover pseudo-class applies styles when the user designates an element with a pointing device.",
      example: "button:hover { opacity: 0.8; }",
      challenge: "button___ { opacity: 0.8; }",
      instruction: "Apply style rules only when hovering over a button.",
      answer: ":hover"
    },
    {
      level: 2,
      topic: "Flexbox Layout Direction",
      description: "The flex-direction property establishes the main-axis, defining the direction flex items are placed.",
      example: "flex-direction: column;",
      challenge: "flex-___: column;",
      instruction: "Complete the property to arrange items in a vertical column.",
      answer: "direction"
    },
    // Level 3: Hard
    {
      level: 3,
      topic: "Grid Repeat Columns",
      description: "The repeat() function allows defining a large number of grid tracks that exhibit a recurring pattern.",
      example: "grid-template-columns: repeat(3, 1fr);",
      challenge: "grid-template-columns: ___(3, 1fr);",
      instruction: "Complete grid columns definition to repeat the column format 3 times.",
      answer: "repeat"
    },
    {
      level: 3,
      topic: "Dynamic Dimension Calculations",
      description: "The calc() function performs calculations to determine CSS property values.",
      example: "width: calc(100% - 20px);",
      challenge: "width: ___(100% - 20px);",
      instruction: "Compute width dynamically subtracting 20px padding from the parent viewport.",
      answer: "calc"
    },
    {
      level: 3,
      topic: "Keyframe Animations",
      description: "Animations are declared using the @keyframes rule, allowing transitioning styles over time.",
      example: "@keyframes pulse { ... }",
      challenge: "___keyframes pulse { 0% { opacity: 1; } }",
      instruction: "Initiate the keyframes definition blocks.",
      answer: "@"
    }
  ],
  HTML: [
    // Level 1: Easy
    {
      level: 1,
      topic: "Anchor Hyperlink Source",
      description: "The <a> element creates links, defining the target URL using the href attribute.",
      example: "<a href='https://example.com'>Visit Us</a>",
      challenge: "<a ___='/dashboard'>Home</a>",
      instruction: "Add the attribute that specifies the destination URL.",
      answer: "href"
    },
    {
      level: 1,
      topic: "Image Source Attribute",
      description: "The <img> tag embeds an image, using the src attribute for the image path.",
      example: "<img src='logo.png' alt='Logo' />",
      challenge: "<img ___={profilePic} alt='User Avatar' />",
      instruction: "Specify the image source file path attribute.",
      answer: "src"
    },
    {
      level: 1,
      topic: "Form Placeholder Hint",
      description: "The placeholder attribute defines a temporary hint shown in input fields before typing.",
      example: "<input placeholder='Enter text...' />",
      challenge: "<input type='email' ___='name@domain.com' />",
      instruction: "Add the input hint attribute for an email form field.",
      answer: "placeholder"
    },
    // Level 2: Medium
    {
      level: 2,
      topic: "Form Post-Target URL",
      description: "The action attribute on forms specifies the URL where the form-data is submitted.",
      example: "<form action='/submit' method='POST'>",
      challenge: "<form ___='/api/submit' method='POST'>",
      instruction: "Specify the destination URL for data transmission.",
      answer: "action"
    },
    {
      level: 2,
      topic: "Open Link in New Tab",
      description: "The target attribute specifies where to open the linked document, using '_blank' for a new tab.",
      example: "<a href='...' target='_blank'>",
      challenge: "<a href='https://google.com' ___='_blank'>Search</a>",
      instruction: "Target external context inside a fresh tab.",
      answer: "target"
    },
    {
      level: 2,
      topic: "External Stylesheet Relation",
      description: "The rel attribute defines the relationship between the current document and the linked resource.",
      example: "<link rel='stylesheet' href='styles.css'>",
      challenge: "<link ___='stylesheet' href='styles.css' />",
      instruction: "Specify stylesheet link reference association.",
      answer: "rel"
    },
    // Level 3: Hard
    {
      level: 3,
      topic: "Document Charset Meta",
      description: "The charset attribute on the <meta> tag specifies the character encoding for the HTML document.",
      example: "<meta charset='UTF-8'>",
      challenge: "<meta ___='UTF-8' />",
      instruction: "Specify the character encoding attribute.",
      answer: "charset"
    },
    {
      level: 3,
      topic: "Custom Data Attribute Prefix",
      description: "Custom data attributes allow storing custom private data, prefixed with 'data-'.",
      example: "<div data-id='10'>",
      challenge: "<div ___id='user-10'>Profile</div>",
      instruction: "Declare user-10 identifier using the data- prefix.",
      answer: "data-"
    },
    {
      level: 3,
      topic: "Textarea Row Dimensions",
      description: "The rows attribute specifies the visible number of lines in a text area element.",
      example: "<textarea rows='4' cols='50'>",
      challenge: "<textarea ___='4' cols='50' />",
      instruction: "Set vertical dimensions using rows attribute.",
      answer: "rows"
    }
  ],
  SQL: [
    // Level 1: Easy
    {
      level: 1,
      topic: "Pattern Matching (LIKE)",
      description: "The LIKE operator is used with wildcards (% or _) to search for matching substring patterns in columns.",
      example: "SELECT * FROM users WHERE email LIKE '%@gmail.com';",
      challenge: "SELECT * FROM products WHERE name ___ 'Tech%';",
      instruction: "Perform a wildcard search for products starting with 'Tech'.",
      answer: "LIKE"
    },
    {
      level: 1,
      topic: "Sorting Results (ORDER BY)",
      description: "The ORDER BY clause sorts query results in ascending (ASC) or descending (DESC) order.",
      example: "SELECT * FROM items ORDER BY price DESC;",
      challenge: "SELECT * FROM employees ORDER ___ salary ASC;",
      instruction: "Complete the sort ordering clause.",
      answer: "BY"
    },
    {
      level: 1,
      topic: "Select All Columns",
      description: "The asterisk (*) acts as a wildcard, instructing the query optimizer to return all columns.",
      example: "SELECT * FROM users;",
      challenge: "SELECT ___ FROM customers;",
      instruction: "Select all column variables from the customers table.",
      answer: "*"
    },
    // Level 2: Medium
    {
      level: 2,
      topic: "Data Grouping",
      description: "The GROUP BY clause groups rows that have the same values into summary rows (like count or average).",
      example: "SELECT dept, AVG(salary) FROM employees GROUP BY dept;",
      challenge: "SELECT role, COUNT(*) FROM users ___ BY role;",
      instruction: "Complete the aggregate grouping clause.",
      answer: "GROUP"
    },
    {
      level: 2,
      topic: "Unique Records Filter",
      description: "The DISTINCT keyword returns only distinct (unique) values from table fields.",
      example: "SELECT DISTINCT country FROM customers;",
      challenge: "SELECT ___ country FROM customers;",
      instruction: "Filter out matching country names returning only unique records.",
      answer: "DISTINCT"
    },
    {
      level: 2,
      topic: "Range Filtering",
      description: "The BETWEEN operator selects values within a given range, inclusive of boundaries.",
      example: "SELECT * FROM items WHERE price BETWEEN 10 AND 50;",
      challenge: "SELECT * FROM items WHERE price ___ 10 AND 50;",
      instruction: "Complete range comparison checks between 10 and 50.",
      answer: "BETWEEN"
    },
    // Level 3: Hard
    {
      level: 3,
      topic: "Group Level Filtering",
      description: "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions.",
      example: "SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) > 5;",
      challenge: "SELECT dept, COUNT(*) FROM emp GROUP BY dept ___ COUNT(*) > 5;",
      instruction: "Filter departments containing more than 5 employee counts.",
      answer: "HAVING"
    },
    {
      level: 3,
      topic: "Left Outer Join",
      description: "A LEFT JOIN returns all rows from the left table, and matching rows from the right table.",
      example: "SELECT * FROM a LEFT JOIN b ON a.id = b.id;",
      challenge: "SELECT * FROM a ___ JOIN b ON a.id = b.id;",
      instruction: "Include all elements from table a and matching rows from table b.",
      answer: "LEFT"
    },
    {
      level: 3,
      topic: "Set Membership Query",
      description: "The IN operator allows specifying multiple values in a WHERE clause, including nested subqueries.",
      example: "SELECT * FROM users WHERE id IN (SELECT id FROM admins);",
      challenge: "SELECT * FROM users WHERE dept_id ___ (SELECT id FROM depts);",
      instruction: "Check if dept_id matches any ID within the returned subquery set.",
      answer: "IN"
    }
  ]
};

export default function PunishmentTask({ language, xp, onComplete }) {
  const [lessons, setLessons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [solved, setSolved] = useState(false);
  const [showError, setShowError] = useState(false);
  const [failuresCount, setFailuresCount] = useState(0);
  const inputRef = useRef(null);

  // Initialize and filter/shuffle lessons based on language and XP level on mount
  useEffect(() => {
    const activeLang = language || "JS";
    const lessonsList = SYNTAX_LESSONS[activeLang] || SYNTAX_LESSONS["JS"];
    
    // Calculate difficulty tier (Level 1, 2, or 3) from XP
    const userLevel = Math.floor((xp || 0) / 1000) + 1;
    const targetLevel = Math.min(3, Math.max(1, userLevel));
    
    let filteredList = lessonsList.filter((l) => l.level === targetLevel);
    if (filteredList.length === 0) {
      filteredList = lessonsList;
    }
    
    // Shuffle the lessons list to make it dynamic
    const shuffled = [...filteredList].sort(() => Math.random() - 0.5);
    setLessons(shuffled);
    setCurrentIndex(0);
    setTypedText("");
    setSolved(false);
    setFailuresCount(0);
  }, [language, xp]);

  const task = lessons[currentIndex];

  // Focus the text input when task is loaded
  useEffect(() => {
    if (task && inputRef.current) {
      inputRef.current.focus();
    }
  }, [task]);

  const handleVerify = (e) => {
    e.preventDefault();
    if (solved) return;

    if (!task) return;

    const trimmedInput = typedText.trim();
    const isSQL = (language || "JS") === "SQL";

    // SQL matches are case-insensitive. Other languages match exactly.
    const isCorrect = isSQL
      ? trimmedInput.toUpperCase() === task.answer.toUpperCase()
      : trimmedInput === task.answer;

    if (isCorrect) {
      playCorrect();
      
      if (currentIndex < lessons.length - 1) {
        // Clear current layer, trigger intermediate solve animation, then load next task
        setSolved(true);
        setTimeout(() => {
          setSolved(false);
          setCurrentIndex((prev) => prev + 1);
          setTypedText("");
        }, 1000);
      } else {
        // All layers solved successfully! Trigger final success flow
        triggerSuccess();
      }
    } else {
      playIncorrect();
      setShowError(true);
      setFailuresCount((prev) => prev + 1);
      setTimeout(() => {
        setShowError(false);
      }, 800);
    }
  };

  const triggerSuccess = () => {
    setSolved(true);
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
              <span className="text-[10px] font-black tracking-widest uppercase text-left">
                SYNTAX OVERRIDE REQUIRED: {language || "JS"} DETECTED (Layer {currentIndex + 1}/{lessons.length})
              </span>
            </div>
            {failuresCount > 0 && (
              <span className="text-[9px] font-bold bg-red-500/20 border border-red-500/30 px-2 py-0.5 rounded-full text-red-300 tracking-wider">
                Failures: {failuresCount}
              </span>
            )}
          </div>

          {/* Akira Dialog */}
          <div className="bg-black/30 border border-white/5 p-3 rounded-xl">
            <p className="text-xs text-red-200 italic leading-relaxed">
              {failuresCount === 0
                ? `Access Locked! Your syntax compilation failed. Complete all ${lessons.length} syntax layers for this level to restore compiler sync.`
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
                  key="solved-layer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center justify-center md:justify-start gap-2 text-green-400 font-bold text-sm bg-green-950/20 border border-green-500/30 p-3 rounded-xl"
                >
                  <CheckCircle2 size={16} className="animate-pulse" />
                  <span>
                    {currentIndex < lessons.length - 1
                      ? `Decryption Layer ${currentIndex + 1}/${lessons.length} Cleared...`
                      : "Bypass Authenticated. System Re-engaging..."}
                  </span>
                </motion.div>
              ) : (
                <motion.form
                  key={task.topic}
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
