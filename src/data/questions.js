export const sampleQuestions = {
  JS: [
    {
      id: "js_1",
      level: 1,
      question: "What is the correct output ordering of the log numbers in this code?\n\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nrequestAnimationFrame(() => console.log(4));\nconsole.log(5);",
      options: ["1, 5, 3, 4, 2", "1, 5, 2, 3, 4", "1, 3, 5, 4, 2", "1, 5, 3, 2, 4"],
      answer: 0,
      explanation: "Logs 1 and 5 are synchronous and execute immediately. Promise callback (microtask) runs next after the current execution context completes. requestAnimationFrame runs before the next repaint (typically before tasks). setTimeout (macrotask) is deferred to the next event loop iteration."
    },
    {
      id: "js_2",
      level: 1,
      question: "In JavaScript, if you create an object with a prototype that has a getter property, and write a value to that property name on the child object, what happens?",
      options: [
        "The write is ignored or throws in strict mode, and no property is set on the child",
        "A new property is shadowed and successfully created directly on the child object",
        "The getter function on the prototype is triggered with the new value as an argument",
        "The getter is deleted from the prototype and replaced by a data property"
      ],
      answer: 0,
      explanation: "According to ECMAScript specifications, if a property is found on the prototype chain and it is an accessor property without a setter, setting it on the child object is forbidden (throws in strict mode, silently ignored in non-strict mode) and does not shadow it."
    },
    {
      id: "js_6",
      level: 1,
      question: "Which of the following is NOT a primitive data type in JavaScript?",
      options: ["Object", "Null", "Undefined", "Symbol"],
      answer: 0,
      explanation: "Primitives in JavaScript are null, undefined, boolean, number, string, symbol, and bigint. Objects are reference types."
    },
    {
      id: "js_3",
      level: 2,
      question: "What occurs when you declare a 'let' variable with the same name as a function parameter inside the function body scope?",
      options: [
        "It throws a SyntaxError: Identifier 'x' has already been declared",
        "It successfully shadows the parameter within the block scope",
        "It mutates the parameter value without raising errors",
        "It creates a separate variable inside a nested closure structure"
      ],
      answer: 0,
      explanation: "In JavaScript, function parameters are in the same scope block as the function body. Declaring a let/const variable with the same name as a parameter in the top-level block of the function body results in a SyntaxError due to duplicate declaration."
    },
    {
      id: "js_4",
      level: 2,
      question: "What will be printed by the console in the following closure scenario?\n\nlet obj = { x: 10 };\nconst getX = (() => {\n  let ref = obj;\n  return () => ref.x;\n})();\nobj = { x: 20 };\nconsole.log(getX());",
      options: ["10", "20", "ReferenceError", "undefined"],
      answer: 0,
      explanation: "The IIFE closure captures the reference stored in the 'obj' variable at evaluation time, which points to the object `{ x: 10 }`. Reassigning the global 'obj' variable to a new object later does not modify the reference held by the closure variable 'ref'."
    },
    {
      id: "js_5",
      level: 3,
      question: "How does key reference management differ between a WeakMap and a standard Map in JavaScript?",
      options: [
        "WeakMap holds weak references to its keys, allowing garbage collection if no other references exist",
        "WeakMap holds weak references to values, while Map holds weak references to keys",
        "WeakMap keys are gathered in a private array that is cleared every 60 seconds",
        "WeakMap allows primitive keys but prevents them from being garbage collected"
      ],
      answer: 0,
      explanation: "WeakMap holds 'weak' references to key objects. If no other strong references to a key object remain, it can be garbage collected, along with its associated value. A standard Map holds strong references, preventing keys from being collected."
    },
    {
      id: "js_7",
      level: 3,
      question: "What will be the output of using 'Reflect.deleteProperty()' on a non-configurable property of an object in strict mode?",
      options: ["It returns false", "It throws a TypeError", "It returns undefined", "It deletes the property anyway"],
      answer: 0,
      explanation: "Reflect.deleteProperty() returns a boolean indicating whether or not the property was successfully deleted. Unlike the standard delete operator which throws in strict mode when attempting to delete non-configurable properties, Reflect.deleteProperty simply returns false."
    }
  ],
  Python: [
    {
      id: "py_1",
      level: 1,
      question: "What is the output of the following Python program?\n\ndef append_to(element, target=[]):\n    target.append(element)\n    return target\n\nprint(append_to(1))\nprint(append_to(2))",
      options: ["[1] then [1, 2]", "[1] then [2]", "[1] then [1]", "TypeError"],
      answer: 0,
      explanation: "In Python, default arguments are evaluated once at function definition time, not at invocation. Thus, the default list 'target' is shared across all calls that do not provide an explicit argument, mutating it continuously."
    },
    {
      id: "py_2",
      level: 1,
      question: "Which linearization algorithm does Python use to resolve Method Resolution Order (MRO) in multiple inheritance?",
      options: ["C3 Linearization", "Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Kruskal's Algorithm"],
      answer: 0,
      explanation: "Python uses the C3 Linearization algorithm to determine method resolution order. It guarantees monotonicity and preserves local precedence order in complex multiple inheritance structures."
    },
    {
      id: "py_6",
      level: 1,
      question: "Which method is used to remove all items from a list in Python?",
      options: ["clear()", "remove()", "pop()", "delete()"],
      answer: 0,
      explanation: "list.clear() removes all items from the list. remove() removes a specific item, pop() removes an item at a given index, and delete is not a list method."
    },
    {
      id: "py_3",
      level: 2,
      question: "During class creation using a metaclass in Python, which method is invoked first to allocate memory and create the class object?",
      options: ["__new__", "__init__", "__call__", "__prepare__"],
      answer: 3,
      explanation: "When a class definition is processed, Python first calls the metaclass's `__prepare__` method to create the namespace dictionary. Then `__new__` is called to instantiate the class object, followed by `__init__` to initialize it."
    },
    {
      id: "py_4",
      level: 2,
      question: "Why does standard Python multi-threading not speed up CPU-bound operations on multi-core systems, and how is it bypassable?",
      options: [
        "Due to the Global Interpreter Lock (GIL); bypassed by using the 'multiprocessing' module or C extensions",
        "Due to Python's dynamic type binding overhead; bypassed by pre-compiling with Cython only",
        "Due to operating system scheduler priority limits; bypassed by invoking sys.setswitchinterval()",
        "Because thread pools share stack frames; bypassed by separating tasks into distinct coroutines"
      ],
      answer: 0,
      explanation: "The GIL prevents multiple native threads from executing Python bytecodes at once. CPU-bound concurrency must bypass this by using the `multiprocessing` module (which spawns subprocesses with separate interpreters) or releasing the GIL in compiled C extensions."
    },
    {
      id: "py_5",
      level: 3,
      question: "What is the functional difference between 'yield' and 'yield from' in a Python generator?",
      options: [
        "'yield from' delegates execution and value generation to a sub-generator or iterable",
        "'yield' returns values dynamically, while 'yield from' halts memory allocation completely",
        "'yield from' is only used to extract exceptions, while 'yield' creates sequences",
        "There is no difference; 'yield from' is syntactic sugar deprecated in Python 3"
      ],
      answer: 0,
      explanation: "'yield from <iterable>' delegates generator operations directly to a sub-generator. It sets up a bidirectional pipe where values are yielded directly from the sub-generator to the caller, and calls to send() or throw() are forwarded back."
    },
    {
      id: "py_7",
      level: 3,
      question: "What does the '__slots__' declaration in a Python class accomplish?",
      options: [
        "It optimizes memory by preventing the dynamic creation of __dict__ for instances",
        "It defines class level variables visible to subclasses only",
        "It configures the class to use thread safe access by default",
        "It locks the class methods from being modified at runtime"
      ],
      answer: 0,
      explanation: "__slots__ tells Python not to use a dynamic dictionary (__dict__) for each instance, saving memory by allocating space for a fixed set of attributes."
    }
  ],
  Java: [
    {
      id: "java_1",
      level: 1,
      question: "What visibility and instruction reordering guarantees does the 'volatile' keyword provide in Java?",
      options: [
        "Writes to volatile variables are immediately visible to all threads, and prevents reordering with surrounding reads/writes",
        "It acts as a complete mutual exclusion lock, preventing multiple threads from entering block scopes",
        "It forces the JVM to store the object reference on the thread's local storage stack frames",
        "It compiles the object into native code to ensure hardware thread safety"
      ],
      answer: 0,
      explanation: "The 'volatile' keyword guarantees that reads/writes of the variable go directly to main memory (visibility). It also establishes a happens-before relationship, preventing instructions from being reordered around it by the compiler or CPU."
    },
    {
      id: "java_2",
      level: 1,
      question: "Why does the Java compiler generate synthetic 'bridge methods' in compiled bytecode?",
      options: [
        "To preserve polymorphic behavior when a class implements a parameterized interface under type erasure",
        "To link interface default methods to abstract superclasses",
        "To bypass security checks for private inner class variable updates",
        "To map Java standard arrays to legacy Vector objects automatically"
      ],
      answer: 0,
      explanation: "Java generics use type erasure, converting generic type parameters to Object or bounds in bytecode. To maintain polymorphism (override resolution), the compiler creates a synthetic 'bridge method' with the erased signature that delegates to the specialized method."
    },
    {
      id: "java_6",
      level: 1,
      question: "Which of these access modifiers provides the widest accessibility scope in Java?",
      options: ["public", "protected", "private", "default (package-private)"],
      answer: 0,
      explanation: "public is accessible from anywhere. protected is only package + subclass. package-private is only package. private is class-only."
    },
    {
      id: "java_3",
      level: 2,
      question: "What is the execution sequence when loading a class via 'Class.forName(\"MyClass\")' inside the JVM?",
      options: [
        "Static initializers run immediately, but instance blocks and constructors do not run until instantiation",
        "The class is loaded into memory, but static initialization blocks are deferred until instantiation",
        "Static and instance blocks run sequentially, but the constructor remains unexecuted",
        "The class loader allocates heap memory and runs constructors using default parameter values"
      ],
      answer: 0,
      explanation: "`Class.forName()` loads, links, and initializes the class. Initialization involves executing static initialization blocks and assigning static variables. Instance initializers and constructors only run when an instance is instantiated (e.g. `new`)."
    },
    {
      id: "java_4",
      level: 2,
      question: "Which of the following phases of the G1 (Garbage-First) Garbage Collector is completely Stop-The-World (STW)?",
      options: ["Remark", "Initial Mark", "Concurrent Mark", "Clean up (some portions)"],
      answer: 0,
      explanation: "The G1 GC 'Remark' phase is a Stop-The-World (STW) phase. It finalizes marking of live objects in the heap, draining remaining SATB (Snapshot-At-The-Beginning) buffers, and is performed globally while application threads are paused."
    },
    {
      id: "java_5",
      level: 3,
      question: "What is a major feature advantage of 'ReentrantLock' over a standard 'synchronized' block?",
      options: [
        "Ability to attempt locking with a timeout (tryLock) and interrupt threads waiting for the lock",
        "Guaranteed automatic garbage collection of objects held inside the lock block",
        "ReentrantLock runs completely in user space without requiring system kernel transitions",
        "It eliminates thread switching overhead by running exclusively in compile-time macros"
      ],
      answer: 0,
      explanation: "`ReentrantLock` offers advanced features over `synchronized` blocks: the ability to attempt non-blocking lock acquisition (`tryLock()`), timed lock attempts, interruptible lock acquisition, and creating fair locks where the longest-waiting thread gets priority."
    },
    {
      id: "java_7",
      level: 3,
      question: "What is the purpose of the 'Phaser' synchronization barrier class in java.util.concurrent?",
      options: [
        "To support barrier synchronization with a dynamic number of registered threads/parties",
        "To schedule periodic tasks on thread pools with priority queues",
        "To provide atomic counter increments in memory-mapped file allocations",
        "To implement non-blocking read-write locks for static objects"
      ],
      answer: 0,
      explanation: "Phaser is similar to CyclicBarrier and CountDownLatch but supports a dynamic number of registered parties (threads) across multiple phases."
    }
  ],
  CSS: [
    {
      id: "css_1",
      level: 1,
      question: "What is the exact CSS specificity score of the selector: ':not(.class) #id[type=\"text\"]'?",
      options: ["0, 1, 2, 0", "0, 2, 1, 0", "0, 1, 1, 1", "0, 0, 3, 0"],
      answer: 0,
      explanation: "Specificity components: Inline styles (0), IDs (1: #id), Classes/attributes/pseudo-classes (2: .class inside :not, [type='text']), Elements/pseudo-elements (0). Note: ':not()' itself adds no specificity, but its arguments do. Total: 0, 1, 2, 0."
    },
    {
      id: "css_2",
      level: 1,
      question: "Which of the following properties/values does NOT establish a new Block Formatting Context (BFC)?",
      options: ["display: flex", "position: absolute", "overflow: hidden", "float: left"],
      answer: 0,
      explanation: "While 'display: flex' creates a Flex Formatting Context for its children, it does not itself create a Block Formatting Context (BFC) for block layouts. Properties like float (not none), position absolute/fixed, and overflow (not visible) trigger BFC creation."
    },
    {
      id: "css_6",
      level: 1,
      question: "Which CSS property is used to change the text color of an element?",
      options: ["color", "text-color", "font-color", "foreground-color"],
      answer: 0,
      explanation: "The standard CSS property to change text color is color."
    },
    {
      id: "css_3",
      level: 2,
      question: "What happens layout-wise when you apply 'margin-left: auto;' to a flex item inside a flex container?",
      options: [
        "It pushes the flex item to the far right of the container, absorbing any remaining free space",
        "It centers the flex item horizontally, disregarding all other items",
        "It triggers line wrapping on the flex item, forcing it to block-level behavior",
        "It is ignored unless the container has display: inline-flex specified"
      ],
      answer: 0,
      explanation: "In Flexbox, auto margins absorb all positive free space in that direction. Applying 'margin-left: auto' to an item will consume the remaining main-axis space and push that item (and subsequent items) to the right."
    },
    {
      id: "css_4",
      level: 2,
      question: "Which CSS property combination promotes an element to its own composite layer (GPU acceleration) without triggering layout reflow?",
      options: ["will-change: transform", "display: block-rendering", "backface-visibility: hidden", "transform: scale(1.0)"],
      answer: 0,
      explanation: "'will-change: transform' tips off the browser that the element will change, causing it to render on its own composited GPU layer. This isolates paint boundaries, avoiding layout reflows during animations."
    },
    {
      id: "css_5",
      level: 3,
      question: "How do CSS Custom Properties resolve when a fallback value depends on another undefined variable, e.g. 'var(--a, var(--b))' where both are undefined?",
      options: [
        "It resolves to the inherited value, or initial/invalid if no inherited value exists",
        "It throws a compilation error in the browser console",
        "It defaults to the color black or 0px automatically",
        "It uses the layout position parameters of the parent container"
      ],
      answer: 0,
      explanation: "If a custom property is registered or used with nested fallbacks, and all referenced custom properties are undefined/invalid, the property evaluates to the inherited value, falling back to the property's initial value (like transparent/unset) at compute time."
    },
    {
      id: "css_7",
      level: 3,
      question: "How does the 'contain' property with 'contain: layout paint;' optimize browser rendering?",
      options: [
        "It isolates the element's layout and paint, preventing changes inside from triggering reflow/repaint on the rest of the page",
        "It forces the browser to compile selectors into static native layout modules",
        "It moves the element automatically to a new canvas rendered in a Web Worker",
        "It disables all media queries and calc() functions inside the component scope"
      ],
      answer: 0,
      explanation: "contain: layout paint tells the browser that the element's subtree is independent of the rest of the page, so the browser can optimize rendering by avoiding reflows/repaints on the rest of the page when layout changes occur."
    }
  ],
  HTML: [
    {
      id: "html_1",
      level: 1,
      question: "What is the precise execution and parsing behavior difference between 'async' and 'defer' script tags?",
      options: [
        "defer scripts execute in document order after parsing completes; async scripts execute immediately when downloaded, pausing parsing",
        "async scripts execute in order after DOMContentLoaded; defer scripts execute concurrently with parsing",
        "defer scripts block parser threads until fully executed; async scripts run in a separate Web Worker thread",
        "They are functional synonyms except that async prevents caching in HTTP requests"
      ],
      answer: 0,
      explanation: "Both fetch scripts asynchronously. However, `defer` scripts execute in order after the document parser finishes, right before DOMContentLoaded. `async` scripts execute immediately when download finishes, which pauses the parser thread if it is still active."
    },
    {
      id: "html_2",
      level: 1,
      question: "Which attributes are used to declare semantic microdata vocabularies in HTML5 structures?",
      options: ["itemscope, itemtype, itemprop", "vocab, prefix, property", "schema, type, prop", "meta-schema, meta-prop"],
      answer: 0,
      explanation: "HTML5 Microdata uses `itemscope` to define a scoping block, `itemtype` to declare the Schema.org URL/vocabulary, and `itemprop` to specify the key properties of the structure."
    },
    {
      id: "html_6",
      level: 1,
      question: "Which tag is used to create a numbered list in HTML?",
      options: ["<ol>", "<ul>", "<li>", "<list>"],
      answer: 0,
      explanation: "<ol> defines an ordered (numbered) list, <ul> defines an unordered (bulleted) list, and <li> defines a list item."
    },
    {
      id: "html_3",
      level: 2,
      question: "What is the operational difference between 'mode: open' and 'mode: closed' shadow roots in Web Components?",
      options: [
        "open allows access to the shadow DOM via the shadowRoot property; closed returns null, preventing external access",
        "open allows styling from global CSS sheets, whereas closed blocks all cascade stylesheets",
        "closed blocks event propagation to the light DOM, whereas open propagates normally",
        "open allows nesting other shadow roots; closed restricts nesting to child slots"
      ],
      answer: 0,
      explanation: "When creating a shadow root using `element.attachShadow({ mode: 'open' })`, the shadow root is accessible via JS on the host element (`element.shadowRoot`). With `mode: 'closed'`, it returns null, shielding the internals from outside JS."
    },
    {
      id: "html_4",
      level: 2,
      question: "According to HTML parsing specifications, what happens when a block-level tag (like '<div>') is placed inside a '<p>' paragraph tag?",
      options: [
        "The parser implicitly closes the <p> tag before the <div> tag is opened",
        "The parser nests the <div> inside the <p> correctly in the DOM tree",
        "The parser throws a DOMException and halts document rendering",
        "The <div> tag is discarded, and only its text children are appended"
      ],
      answer: 0,
      explanation: "The HTML DTD defines paragraph `<p>` tags as only containing phrasing (inline) content. The parser implicitly closes the open `<p>` tag when it encounters a block-level start tag like `<div>` during tokenizer phase."
    },
    {
      id: "html_5",
      level: 3,
      question: "Which of the following global objects or APIs is accessible inside a dedicated Web Worker scope?",
      options: ["indexedDB", "window", "document", "parent"],
      answer: 0,
      explanation: "Web Workers operate in a separate thread and do not have access to the DOM (`window`, `document`, `parent`). However, they do have access to worker-safe APIs like `indexedDB`, `fetch`, `caches`, and `self`."
    },
    {
      id: "html_7",
      level: 3,
      question: "What does the 'crossorigin' attribute do when applied to a '<link>' tag for a font or stylesheet?",
      options: [
        "It configures the CORS credentials policy when fetching external subresources",
        "It enables the stylesheet to be parsed in an iframe dynamic sandbox",
        "It blocks the document cookies from being sent to local server ports",
        "It matches the document layout to foreign stylesheets automatically"
      ],
      answer: 0,
      explanation: "The crossorigin attribute allows the browser to configure CORS requests when fetching resource assets (like fonts, scripts, or stylesheets) from external origins."
    }
  ],
  SQL: [
    {
      id: "sql_1",
      level: 1,
      question: "What is the primary difference in execution plan between an Index Seek and an Index Scan?",
      options: [
        "Index Seek traverses the B-Tree index dynamically for specific matching values; Index Scan reads the entire leaf node sequence",
        "Index Scan is always faster than Index Seek since it parses records concurrently",
        "Index Seek compiles the query cache, while Index Scan performs physical disk writes",
        "An Index Seek requires lock escalation to table locks, while Index Scan does not"
      ],
      answer: 0,
      explanation: "An Index Seek leverages the index B-Tree hierarchy to jump directly to the target rows matching a filter. An Index Scan reads every single page in the index leaf node sequence, which behaves similarly to a full table scan when filters are broad or index covers all columns."
    },
    {
      id: "sql_2",
      level: 1,
      question: "Which SQL isolation level protects against Phantom Reads by utilizing locking mechanisms or MVCC?",
      options: ["SERIALIZABLE", "REPEATABLE READ", "READ COMMITTED", "READ UNCOMMITTED"],
      answer: 0,
      explanation: "The SERIALIZABLE isolation level prevents phantom reads. It achieves this by acquiring range locks on index search criteria or utilizing MVCC snapshot control to ensure other transactions cannot insert rows into range sets."
    },
    {
      id: "sql_6",
      level: 1,
      question: "Which SQL clause is used to filter rows returned by a SELECT query?",
      options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
      answer: 0,
      explanation: "The WHERE clause filters rows before grouping. HAVING filters groups after grouping."
    },
    {
      id: "sql_3",
      level: 2,
      question: "What is the output rank differences between DENSE_RANK() and RANK() when values tie in a partition?",
      options: [
        "RANK() skips rank numbers after a tie (e.g. 1, 2, 2, 4); DENSE_RANK() leaves no gaps (e.g. 1, 2, 2, 3)",
        "DENSE_RANK() skips numbers after a tie, while RANK() keeps them contiguous",
        "RANK() returns unique decimal ratios, whereas DENSE_RANK() returns integers",
        "They behave identically except when using multiple partition fields"
      ],
      answer: 0,
      explanation: "RANK() calculates rank sequence by skipping numbers to match total item counts (e.g., 1, 2, 2, 4). DENSE_RANK() ranks items continuously without gaps (e.g., 1, 2, 2, 3), regardless of tie counts."
    },
    {
      id: "sql_4",
      level: 2,
      question: "What is the primary purpose of Write-Ahead Logging (WAL) in SQL database engines?",
      options: [
        "To ensure durability and atomicity by logging modifications to non-volatile storage before writing data pages to disk",
        "To compile SQL index pages into memory tables to speed up search routines",
        "To track historical metadata queries for compliance and administrative checks",
        "To prevent deadlock conditions by locking the transaction log files dynamically"
      ],
      answer: 0,
      explanation: "WAL ensures ACID durability. Instead of writing data changes directly to table files on disk (expensive random I/O), updates are logged sequentially in the WAL first. In a crash, the database recovers by replaying WAL records."
    },
    {
      id: "sql_5",
      level: 3,
      question: "How does the database engine optimize a Correlated Subquery compared to a Non-Correlated Subquery?",
      options: [
        "A correlated subquery reference must execute once for every row in the outer query unless rewritten as a JOIN by the optimizer",
        "A correlated subquery is cached in tempdb and never executes more than once",
        "A correlated subquery runs in a separate database socket execution thread",
        "Non-correlated subqueries require full table locks, while correlated subqueries do not"
      ],
      answer: 0,
      explanation: "A correlated subquery references columns from the outer query, meaning it conceptually executes once per row returned by the outer query. The query optimizer attempts to flatten this into a JOIN or Hash semi-join to maximize performance."
    },
    {
      id: "sql_7",
      level: 3,
      question: "What is the primary difference in transactional behavior between a pessimistic lock and an optimistic lock in SQL?",
      options: [
        "Pessimistic locking locks the rows immediately on read; optimistic locking checks for modification conflicts at commit time",
        "Pessimistic locking runs exclusively in read-only schemas; optimistic locking enables write-ahead log files",
        "Optimistic locking blocks other transactions from reading; pessimistic locking permits simultaneous writes",
        "Pessimistic locking is implemented on indexes only; optimistic locking requires full table tablespaces"
      ],
      answer: 0,
      explanation: "Pessimistic locking prevents conflicts by acquiring locks immediately when reading. Optimistic locking does not acquire locks on read, but checks if the data has changed before writing/committing, rolling back if a conflict is found."
    }
  ]
};
