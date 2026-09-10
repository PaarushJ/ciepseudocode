/* Lesson content for the Learn panel.
   Written for this repository; covers the Cambridge 9618 / 0478 pseudocode
   constructs implemented by the interpreter in src/. */

export const LESSONS = [
{
  module: 'Getting started',
  items: [
  {
    id: 'variables',
    title: 'Variables and DECLARE',
    body: [
      { p: 'A variable is a named box in memory. Before you use one you must DECLARE it, giving it a name and a type. The type fixes what kind of value the box may hold.' },
      { code: 'DECLARE Score : INTEGER\nDECLARE Price : REAL\nDECLARE Name  : STRING\nDECLARE Grade : CHAR\nDECLARE Passed : BOOLEAN' },
      { p: 'Put a value into a variable with the assignment arrow <-. Read it right to left: "Score becomes 10".' },
      { code: 'Score <- 10\nPrice <- 19.99\nName  <- "Ada"\nGrade <- \'A\'\nPassed <- TRUE' },
      { note: 'A variable declared but never assigned has no value yet. Assign before you read.' }
    ],
    try: 'DECLARE Score : INTEGER\n\nScore <- 10\nOUTPUT "Score is ", Score\n'
  },
  {
    id: 'output',
    title: 'OUTPUT',
    body: [
      { p: 'OUTPUT writes to the screen. Text in double quotes is printed literally; a variable name is replaced by its value.' },
      { code: 'OUTPUT "Hello, world!"\nOUTPUT Score' },
      { p: 'Separate several items with commas and they are joined together on one line.' },
      { code: 'OUTPUT "You scored ", Score, " out of ", Total' }
    ],
    try: 'DECLARE Score : INTEGER\nDECLARE Total : INTEGER\n\nScore <- 17\nTotal <- 20\n\nOUTPUT "You scored ", Score, " out of ", Total\n'
  },
  {
    id: 'input',
    title: 'INPUT',
    body: [
      { p: 'INPUT pauses the program, waits for the user to type a value, and stores it in a variable. Always OUTPUT a prompt first so the user knows what is wanted.' },
      { code: 'OUTPUT "Enter your name:"\nINPUT Name' },
      { note: 'The value is converted to the variable\'s declared type. Typing "abc" into an INTEGER is an error.' }
    ],
    try: 'DECLARE Name : STRING\nDECLARE Age  : INTEGER\n\nOUTPUT "Enter your name:"\nINPUT Name\nOUTPUT "Enter your age:"\nINPUT Age\n\nOUTPUT "Hello ", Name, ", next year you will be ", Age + 1\n'
  },
  {
    id: 'arithmetic',
    title: 'Arithmetic',
    body: [
      { p: 'The usual operators work as expected, with DIV and MOD for whole-number division.' },
      { list: [
        '<b>+ - * /</b> — add, subtract, multiply, divide',
        '<b>DIV</b> — integer division, discarding the remainder',
        '<b>MOD</b> — the remainder only',
        '<b>^</b> — raise to a power'
      ]},
      { code: '17 / 5    // 3.4\n17 DIV 5  // 3\n17 MOD 5  // 2\n2 ^ 8     // 256' },
      { note: 'MOD is the usual way to test divisibility: N MOD 2 = 0 means N is even.' }
    ],
    try: 'DECLARE A : INTEGER\nDECLARE B : INTEGER\n\nA <- 17\nB <- 5\n\nOUTPUT A, " / ",   B, " = ", A / B\nOUTPUT A, " DIV ", B, " = ", A DIV B\nOUTPUT A, " MOD ", B, " = ", A MOD B\n'
  }]
},
{
  module: 'Selection',
  items: [
  {
    id: 'if',
    title: 'IF statements',
    body: [
      { p: 'IF runs a block only when a condition is true. ELSE supplies an alternative. Every IF is closed with ENDIF.' },
      { code: 'IF Mark >= 50 THEN\n    OUTPUT "Pass"\nELSE\n    OUTPUT "Fail"\nENDIF' },
      { p: 'Conditions compare values with = &lt;&gt; &lt; &gt; &lt;= &gt;=, and combine with AND, OR and NOT.' },
      { code: 'IF Age >= 13 AND Age <= 19 THEN\n    OUTPUT "Teenager"\nENDIF' },
      { note: 'Equality is a single = , and "not equal" is <> .' }
    ],
    try: 'DECLARE Mark : INTEGER\n\nOUTPUT "Enter a mark:"\nINPUT Mark\n\nIF Mark >= 50 THEN\n    OUTPUT "Pass"\nELSE\n    OUTPUT "Fail"\nENDIF\n'
  },
  {
    id: 'nested-if',
    title: 'Nested selection',
    body: [
      { p: 'An IF inside another IF lets you narrow a decision in stages. Indent each level so the structure stays readable.' },
      { code: 'IF Mark >= 50 THEN\n    IF Mark >= 80 THEN\n        OUTPUT "Distinction"\n    ELSE\n        OUTPUT "Pass"\n    ENDIF\nELSE\n    OUTPUT "Fail"\nENDIF' },
      { note: 'Order matters. Test the most demanding condition first, or a lower band will catch everything.' }
    ],
    try: 'DECLARE Mark : INTEGER\n\nOUTPUT "Enter a mark:"\nINPUT Mark\n\nIF Mark >= 80 THEN\n    OUTPUT "Grade A"\nELSE\n    IF Mark >= 70 THEN\n        OUTPUT "Grade B"\n    ELSE\n        IF Mark >= 50 THEN\n            OUTPUT "Grade C"\n        ELSE\n            OUTPUT "Fail"\n        ENDIF\n    ENDIF\nENDIF\n'
  },
  {
    id: 'case',
    title: 'CASE OF',
    body: [
      { p: 'When one variable is tested against many separate values, CASE OF is clearer than a stack of IFs. OTHERWISE catches anything unmatched.' },
      { code: 'CASE OF Choice\n    1 : OUTPUT "New game"\n    2 : OUTPUT "Load game"\n    3 : OUTPUT "Quit"\n    OTHERWISE OUTPUT "Unknown option"\nENDCASE' },
      { note: 'CASE compares against fixed values. For ranges such as Mark >= 70, use IF.' }
    ],
    try: 'DECLARE Choice : INTEGER\n\nOUTPUT "Choose 1, 2 or 3:"\nINPUT Choice\n\nCASE OF Choice\n    1 : OUTPUT "New game"\n    2 : OUTPUT "Load game"\n    3 : OUTPUT "Quit"\n    OTHERWISE OUTPUT "Unknown option"\nENDCASE\n'
  }]
},
{
  module: 'Iteration',
  items: [
  {
    id: 'for',
    title: 'FOR loops',
    body: [
      { p: 'A FOR loop repeats a known number of times, counting with a control variable. Use it when you know the count before the loop starts.' },
      { code: 'FOR i <- 1 TO 5\n    OUTPUT i\nNEXT i' },
      { p: 'STEP changes the size of the jump, and may be negative to count down.' },
      { code: 'FOR i <- 10 TO 1 STEP -1\n    OUTPUT i\nNEXT i' }
    ],
    try: 'DECLARE i : INTEGER\nDECLARE Total : INTEGER\n\nTotal <- 0\n\nFOR i <- 1 TO 10\n    Total <- Total + i\nNEXT i\n\nOUTPUT "The sum of 1 to 10 is ", Total\n'
  },
  {
    id: 'while',
    title: 'WHILE loops',
    body: [
      { p: 'WHILE tests its condition <em>before</em> each pass, so the body may never run at all. Use it when the number of repeats is not known in advance.' },
      { code: 'WHILE Total < 100 DO\n    Total <- Total + Value\nENDWHILE' },
      { note: 'Something inside the loop must eventually make the condition false, or the program will never stop.' }
    ],
    try: 'DECLARE Total : INTEGER\nDECLARE Value : INTEGER\n\nTotal <- 0\n\nOUTPUT "Enter numbers, 0 to finish:"\nINPUT Value\n\nWHILE Value <> 0 DO\n    Total <- Total + Value\n    INPUT Value\nENDWHILE\n\nOUTPUT "Total: ", Total\n'
  },
  {
    id: 'repeat',
    title: 'REPEAT UNTIL',
    body: [
      { p: 'REPEAT tests its condition <em>after</em> each pass, so the body always runs at least once. That makes it a natural fit for input validation.' },
      { code: 'REPEAT\n    OUTPUT "Enter a positive number:"\n    INPUT N\nUNTIL N > 0' },
      { note: 'WHILE loops until the condition becomes false; REPEAT loops until it becomes true. The tests are opposites.' }
    ],
    try: 'DECLARE N : INTEGER\n\nREPEAT\n    OUTPUT "Enter a positive number:"\n    INPUT N\nUNTIL N > 0\n\nOUTPUT "Thank you, you entered ", N\n'
  },
  {
    id: 'nested-loops',
    title: 'Nested loops',
    body: [
      { p: 'A loop inside a loop. The inner loop completes every one of its passes for each single pass of the outer loop, so the body runs rows × columns times.' },
      { code: 'FOR Row <- 1 TO 3\n    FOR Col <- 1 TO 4\n        OUTPUT "Row ", Row, " Col ", Col\n    NEXT Col\nNEXT Row' },
      { note: 'Use different control variables for the two loops, or the inner one will corrupt the outer count.' }
    ],
    try: 'DECLARE Row : INTEGER\nDECLARE Col : INTEGER\n\nFOR Row <- 1 TO 3\n    FOR Col <- 1 TO 4\n        OUTPUT "Row ", Row, ", Column ", Col\n    NEXT Col\nNEXT Row\n'
  }]
},
{
  module: 'Arrays and strings',
  items: [
  {
    id: 'arrays',
    title: '1-D arrays',
    body: [
      { p: 'An array stores many values of one type under a single name. Declare it with the range of index positions it holds.' },
      { code: 'DECLARE Scores : ARRAY[1:5] OF INTEGER' },
      { p: 'Reach an individual element with its index in square brackets, and walk the whole array with a FOR loop.' },
      { code: 'Scores[1] <- 42\n\nFOR i <- 1 TO 5\n    OUTPUT Scores[i]\nNEXT i' },
      { note: 'Indices here start at 1, not 0. Going outside the declared range is an error.' }
    ],
    try: 'DECLARE Scores : ARRAY[1:5] OF INTEGER\nDECLARE i : INTEGER\nDECLARE Total : INTEGER\n\nScores[1] <- 60\nScores[2] <- 75\nScores[3] <- 48\nScores[4] <- 91\nScores[5] <- 83\n\nTotal <- 0\nFOR i <- 1 TO 5\n    OUTPUT "Score ", i, ": ", Scores[i]\n    Total <- Total + Scores[i]\nNEXT i\n\nOUTPUT "Average: ", Total / 5\n'
  },
  {
    id: 'arrays-2d',
    title: '2-D arrays',
    body: [
      { p: 'A 2-D array is a grid. Declare two ranges — rows then columns — and index it with two numbers.' },
      { code: 'DECLARE Grid : ARRAY[1:3, 1:4] OF INTEGER\n\nGrid[2, 3] <- 7' },
      { p: 'Nested loops visit every cell: the outer loop picks the row, the inner one sweeps its columns.' },
      { code: 'FOR Row <- 1 TO 3\n    FOR Col <- 1 TO 4\n        OUTPUT Grid[Row, Col]\n    NEXT Col\nNEXT Row' }
    ],
    try: 'DECLARE Grid : ARRAY[1:3, 1:4] OF INTEGER\nDECLARE Row : INTEGER\nDECLARE Col : INTEGER\n\nFOR Row <- 1 TO 3\n    FOR Col <- 1 TO 4\n        Grid[Row, Col] <- Row * Col\n    NEXT Col\nNEXT Row\n\nFOR Row <- 1 TO 3\n    FOR Col <- 1 TO 4\n        OUTPUT "Grid[", Row, ",", Col, "] = ", Grid[Row, Col]\n    NEXT Col\nNEXT Row\n'
  },
  {
    id: 'strings',
    title: 'String functions',
    body: [
      { p: 'Built-in functions inspect and transform strings.' },
      { list: [
        '<b>LENGTH(s)</b> — number of characters',
        '<b>SUBSTRING(s, start, len)</b> — a section, counting from 1',
        '<b>UCASE(s) / LCASE(s)</b> — convert case',
        '<b>ASC(c) / CHR(n)</b> — character to code, and back'
      ]},
      { code: 'OUTPUT LENGTH("Cambridge")        // 9\nOUTPUT SUBSTRING("Cambridge", 1, 4) // "Camb"\nOUTPUT UCASE("abc")                // "ABC"' },
      { note: 'Combine SUBSTRING with a FOR loop to examine a string one character at a time.' }
    ],
    try: 'DECLARE Word : STRING\nDECLARE i : INTEGER\n\nWord <- "Cambridge"\n\nOUTPUT "Word:      ", Word\nOUTPUT "Length:    ", LENGTH(Word)\nOUTPUT "Uppercase: ", UCASE(Word)\nOUTPUT "First 4:   ", SUBSTRING(Word, 1, 4)\n\nOUTPUT "Letter by letter:"\nFOR i <- 1 TO LENGTH(Word)\n    OUTPUT SUBSTRING(Word, i, 1)\nNEXT i\n'
  }]
},
{
  module: 'Subroutines',
  items: [
  {
    id: 'procedures',
    title: 'Procedures',
    body: [
      { p: 'A procedure is a named block of code that performs a task. Define it once, then run it with CALL as often as you like.' },
      { code: 'PROCEDURE Greet(Name : STRING)\n    OUTPUT "Hello, ", Name\nENDPROCEDURE\n\nCALL Greet("Ada")' },
      { p: 'Parameters are passed BYVAL by default, meaning the procedure works on a copy. BYREF passes the variable itself, so changes are kept.' },
      { code: 'PROCEDURE Double(BYREF N : INTEGER)\n    N <- N * 2\nENDPROCEDURE' }
    ],
    try: 'PROCEDURE Greet(Name : STRING)\n    OUTPUT "Hello, ", Name, "!"\nENDPROCEDURE\n\nCALL Greet("Ada")\nCALL Greet("Alan")\nCALL Greet("Grace")\n'
  },
  {
    id: 'functions',
    title: 'Functions',
    body: [
      { p: 'A function is a subroutine that hands a value back. State the type it returns with RETURNS, and give the value with RETURN.' },
      { code: 'FUNCTION Square(N : INTEGER) RETURNS INTEGER\n    RETURN N * N\nENDFUNCTION\n\nOUTPUT Square(7)   // 49' },
      { note: 'Call a function anywhere a value is expected. A procedure is run with CALL as a statement of its own.' }
    ],
    try: 'FUNCTION Square(N : INTEGER) RETURNS INTEGER\n    RETURN N * N\nENDFUNCTION\n\nFUNCTION Largest(A : INTEGER, B : INTEGER) RETURNS INTEGER\n    IF A > B THEN\n        RETURN A\n    ELSE\n        RETURN B\n    ENDIF\nENDFUNCTION\n\nDECLARE i : INTEGER\n\nFOR i <- 1 TO 5\n    OUTPUT i, " squared is ", Square(i)\nNEXT i\n\nOUTPUT "Larger of 24 and 17: ", Largest(24, 17)\n'
  },
  {
    id: 'files',
    title: 'File handling',
    body: [
      { p: 'Open a file for READ, WRITE or APPEND, transfer lines, then close it. WRITE starts an empty file; APPEND adds to the end of an existing one.' },
      { code: 'OPENFILE "scores.txt" FOR WRITE\nWRITEFILE "scores.txt", "42"\nCLOSEFILE "scores.txt"\n\nOPENFILE "scores.txt" FOR READ\nREADFILE "scores.txt", Line\nCLOSEFILE "scores.txt"' },
      { note: 'Files you create appear in the Explorer, so you can open them and see what your program wrote.' }
    ],
    try: 'DECLARE Line : STRING\n\nOPENFILE "notes.txt" FOR WRITE\nWRITEFILE "notes.txt", "First line"\nWRITEFILE "notes.txt", "Second line"\nCLOSEFILE "notes.txt"\n\nOPENFILE "notes.txt" FOR READ\nREADFILE "notes.txt", Line\nOUTPUT "Read back: ", Line\nCLOSEFILE "notes.txt"\n'
  }]
}
];
