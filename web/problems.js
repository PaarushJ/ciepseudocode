/* Practice problems for the Practice panel.

   Three sets, each checked a different way:

     WARMUPS  short problems written for this repository. The program is run
              as-is with `inputs` fed to INPUT, and the OUTPUT lines are
              matched against `expect`.

     EXAM     exam-style questions carrying marks. Each test supplies a
              `setup` — pseudocode declaring and filling the data the question
              describes — which is prepended to the candidate's answer.

     CODE     function-implementation problems. The program is assembled as
              buildPrelude + the candidate's code + buildHarness, so the
              candidate writes only the function body.

   EXAM and CODE problems expose generateTests() for the worked examples behind
   "Run tests", and generateSubmitTests() for the 100 randomised cases behind
   "Submit". Where `orderMatters` is false the output lines are compared as a
   multiset rather than in sequence. */

export const WARMUPS = [
{
  id: 'sum-to-n', title: 'Sum to N', difficulty: 'easy', topic: 'Totalling',
  brief: 'Add up every whole number from 1 to N.',
  body: [
    { p: 'Read a single whole number <b>N</b>, then work out the total of every number from 1 up to and including N.' },
    { p: 'Print one line in exactly this form:' },
    { code: 'Sum: 55' },
    { p: 'For N = 10 the total is 1 + 2 + 3 + … + 10 = 55.' }
  ],
  starter: 'DECLARE N : INTEGER\nDECLARE i : INTEGER\nDECLARE Total : INTEGER\n\nINPUT N\n\n// your code here\n',
  tests: [
    { name: 'N = 10',  inputs: ['10'],  expect: ['Sum: 55'] },
    { name: 'N = 1',   inputs: ['1'],   expect: ['Sum: 1'] },
    { name: 'N = 100', inputs: ['100'], expect: ['Sum: 5050'] }
  ],
  hint: 'Set Total to 0 before the loop, then add the counter to it on every pass.',
  solution: 'DECLARE N : INTEGER\nDECLARE i : INTEGER\nDECLARE Total : INTEGER\n\nINPUT N\n\nTotal <- 0\nFOR i <- 1 TO N\n    Total <- Total + i\nNEXT i\n\nOUTPUT "Sum: ", Total\n'
},
{
  id: 'odd-even', title: 'Odd or Even', difficulty: 'easy', topic: 'Selection',
  brief: 'Decide whether a number is odd or even.',
  body: [
    { p: 'Read one whole number and print <b>Even</b> if it divides exactly by 2, otherwise print <b>Odd</b>.' },
    { code: 'Even' }
  ],
  starter: 'DECLARE N : INTEGER\n\nINPUT N\n\n// your code here\n',
  tests: [
    { name: '4 is even',   inputs: ['4'],  expect: ['Even'] },
    { name: '7 is odd',    inputs: ['7'],  expect: ['Odd'] },
    { name: '0 is even',   inputs: ['0'],  expect: ['Even'] },
    { name: '-3 is odd',   inputs: ['-3'], expect: ['Odd'] }
  ],
  hint: 'N MOD 2 gives the remainder after dividing by 2.',
  solution: 'DECLARE N : INTEGER\n\nINPUT N\n\nIF N MOD 2 = 0 THEN\n    OUTPUT "Even"\nELSE\n    OUTPUT "Odd"\nENDIF\n'
},
{
  id: 'count-passes', title: 'Count the Passes', difficulty: 'easy', topic: 'Counting',
  brief: 'Count how many of ten marks reach the pass mark.',
  body: [
    { p: 'Read <b>ten</b> marks one after another. Count how many are 50 or more, then print:' },
    { code: 'Passes: 6' }
  ],
  starter: 'DECLARE Mark : INTEGER\nDECLARE i : INTEGER\nDECLARE Count : INTEGER\n\n// your code here\n',
  tests: [
    { name: 'mixed marks', inputs: ['55','42','70','38','91','50','12','64','49','80'], expect: ['Passes: 6'] },
    { name: 'all pass',    inputs: ['50','60','70','80','90','100','55','65','75','85'], expect: ['Passes: 10'] },
    { name: 'none pass',   inputs: ['10','20','30','40','49','5','0','33','12','48'],    expect: ['Passes: 0'] }
  ],
  hint: 'Use a FOR loop that runs 10 times, and add 1 to a counter whenever the mark is at least 50.',
  solution: 'DECLARE Mark : INTEGER\nDECLARE i : INTEGER\nDECLARE Count : INTEGER\n\nCount <- 0\n\nFOR i <- 1 TO 10\n    INPUT Mark\n    IF Mark >= 50 THEN\n        Count <- Count + 1\n    ENDIF\nNEXT i\n\nOUTPUT "Passes: ", Count\n'
},
{
  id: 'largest-of-three', title: 'Largest of Three', difficulty: 'easy', topic: 'Selection',
  brief: 'Find the biggest of three numbers.',
  body: [
    { p: 'Read three whole numbers and print the largest:' },
    { code: 'Largest: 24' },
    { note: 'If two are equally large, printing that value once is correct.' }
  ],
  starter: 'DECLARE A : INTEGER\nDECLARE B : INTEGER\nDECLARE C : INTEGER\n\nINPUT A\nINPUT B\nINPUT C\n\n// your code here\n',
  tests: [
    { name: 'first largest',  inputs: ['24','17','9'],  expect: ['Largest: 24'] },
    { name: 'last largest',   inputs: ['3','8','15'],   expect: ['Largest: 15'] },
    { name: 'middle largest', inputs: ['5','40','12'],  expect: ['Largest: 40'] },
    { name: 'negatives',      inputs: ['-9','-2','-7'], expect: ['Largest: -2'] }
  ],
  hint: 'Assume A is the largest, then replace it if B or C turns out to be bigger.',
  solution: 'DECLARE A : INTEGER\nDECLARE B : INTEGER\nDECLARE C : INTEGER\nDECLARE Largest : INTEGER\n\nINPUT A\nINPUT B\nINPUT C\n\nLargest <- A\nIF B > Largest THEN\n    Largest <- B\nENDIF\nIF C > Largest THEN\n    Largest <- C\nENDIF\n\nOUTPUT "Largest: ", Largest\n'
},
{
  id: 'grade-bands', title: 'Grade Boundaries', difficulty: 'medium', topic: 'Selection',
  brief: 'Turn a mark into a letter grade.',
  body: [
    { p: 'Read one mark and print its grade using these boundaries:' },
    { list: ['80 and above — <b>A</b>', '70 to 79 — <b>B</b>', '60 to 69 — <b>C</b>', '50 to 59 — <b>D</b>', 'below 50 — <b>F</b>'] },
    { code: 'Grade: B' }
  ],
  starter: 'DECLARE Mark : INTEGER\n\nINPUT Mark\n\n// your code here\n',
  tests: [
    { name: 'mark 95', inputs: ['95'], expect: ['Grade: A'] },
    { name: 'mark 74', inputs: ['74'], expect: ['Grade: B'] },
    { name: 'mark 60', inputs: ['60'], expect: ['Grade: C'] },
    { name: 'mark 50', inputs: ['50'], expect: ['Grade: D'] },
    { name: 'mark 12', inputs: ['12'], expect: ['Grade: F'] }
  ],
  hint: 'Test the highest boundary first and work downwards, so each band only catches what the ones above missed.',
  solution: 'DECLARE Mark : INTEGER\n\nINPUT Mark\n\nIF Mark >= 80 THEN\n    OUTPUT "Grade: A"\nELSE\n    IF Mark >= 70 THEN\n        OUTPUT "Grade: B"\n    ELSE\n        IF Mark >= 60 THEN\n            OUTPUT "Grade: C"\n        ELSE\n            IF Mark >= 50 THEN\n                OUTPUT "Grade: D"\n            ELSE\n                OUTPUT "Grade: F"\n            ENDIF\n        ENDIF\n    ENDIF\nENDIF\n'
},
{
  id: 'max-min', title: 'Highest and Lowest', difficulty: 'medium', topic: 'Arrays',
  brief: 'Report the largest and smallest of eight readings.',
  body: [
    { p: 'Read <b>eight</b> whole numbers into an array, then print the largest and the smallest on two lines:' },
    { code: 'Max: 91\nMin: 12' }
  ],
  starter: 'DECLARE Values : ARRAY[1:8] OF INTEGER\nDECLARE i : INTEGER\n\n// your code here\n',
  tests: [
    { name: 'mixed',      inputs: ['45','12','78','33','91','20','67','54'], expect: ['Max: 91','Min: 12'] },
    { name: 'ascending',  inputs: ['1','2','3','4','5','6','7','8'],         expect: ['Max: 8','Min: 1'] },
    { name: 'all equal',  inputs: ['5','5','5','5','5','5','5','5'],         expect: ['Max: 5','Min: 5'] },
    { name: 'negatives',  inputs: ['-4','-19','-2','-33','-8','-1','-7','-5'], expect: ['Max: -1','Min: -33'] }
  ],
  hint: 'Start both Max and Min at the first element, then compare each remaining element against them.',
  solution: 'DECLARE Values : ARRAY[1:8] OF INTEGER\nDECLARE i : INTEGER\nDECLARE Max : INTEGER\nDECLARE Min : INTEGER\n\nFOR i <- 1 TO 8\n    INPUT Values[i]\nNEXT i\n\nMax <- Values[1]\nMin <- Values[1]\n\nFOR i <- 2 TO 8\n    IF Values[i] > Max THEN\n        Max <- Values[i]\n    ENDIF\n    IF Values[i] < Min THEN\n        Min <- Values[i]\n    ENDIF\nNEXT i\n\nOUTPUT "Max: ", Max\nOUTPUT "Min: ", Min\n'
},
{
  id: 'reverse-string', title: 'Reverse a Word', difficulty: 'medium', topic: 'Strings',
  brief: 'Print a word backwards.',
  body: [
    { p: 'Read one word and print it with its letters in reverse order:' },
    { code: 'esrever' }
  ],
  starter: 'DECLARE Word : STRING\nDECLARE i : INTEGER\nDECLARE Result : STRING\n\nINPUT Word\n\n// your code here\n',
  tests: [
    { name: 'reverse',   inputs: ['reverse'],   expect: ['esrever'] },
    { name: 'Cambridge', inputs: ['Cambridge'], expect: ['egdirbmaC'] },
    { name: 'palindrome',inputs: ['racecar'],   expect: ['racecar'] },
    { name: 'one letter',inputs: ['x'],         expect: ['x'] }
  ],
  hint: 'Count down from LENGTH(Word) to 1, joining SUBSTRING(Word, i, 1) onto a result string each time.',
  solution: 'DECLARE Word : STRING\nDECLARE i : INTEGER\nDECLARE Result : STRING\n\nINPUT Word\n\nResult <- ""\n\nFOR i <- LENGTH(Word) TO 1 STEP -1\n    Result <- Result & SUBSTRING(Word, i, 1)\nNEXT i\n\nOUTPUT Result\n'
},
{
  id: 'count-vowels', title: 'Count the Vowels', difficulty: 'medium', topic: 'Strings',
  brief: 'Count vowels in a word, ignoring case.',
  body: [
    { p: 'Read one word and count how many of its letters are vowels (a, e, i, o, u). Upper and lower case both count.' },
    { code: 'Vowels: 4' }
  ],
  starter: 'DECLARE Word : STRING\nDECLARE i : INTEGER\nDECLARE Count : INTEGER\nDECLARE Letter : STRING\n\nINPUT Word\n\n// your code here\n',
  tests: [
    { name: 'education', inputs: ['education'], expect: ['Vowels: 5'] },
    { name: 'Cambridge', inputs: ['Cambridge'], expect: ['Vowels: 3'] },
    { name: 'rhythm',    inputs: ['rhythm'],    expect: ['Vowels: 0'] },
    { name: 'AEIOU',     inputs: ['AEIOU'],     expect: ['Vowels: 5'] }
  ],
  hint: 'Convert each letter with UCASE before comparing, then test it against "A", "E", "I", "O" and "U" joined by OR.',
  solution: 'DECLARE Word : STRING\nDECLARE i : INTEGER\nDECLARE Count : INTEGER\nDECLARE Letter : STRING\n\nINPUT Word\n\nCount <- 0\n\nFOR i <- 1 TO LENGTH(Word)\n    Letter <- UCASE(SUBSTRING(Word, i, 1))\n    IF Letter = "A" OR Letter = "E" OR Letter = "I" OR Letter = "O" OR Letter = "U" THEN\n        Count <- Count + 1\n    ENDIF\nNEXT i\n\nOUTPUT "Vowels: ", Count\n'
},
{
  id: 'linear-search', title: 'Linear Search', difficulty: 'medium', topic: 'Searching',
  brief: 'Find which position a value sits in.',
  body: [
    { p: 'Read <b>six</b> whole numbers into an array, then read a seventh number to search for.' },
    { p: 'If it is present, print the position of the <b>first</b> match. If not, print <b>Not found</b>.' },
    { code: 'Found at position 3' }
  ],
  starter: 'DECLARE Values : ARRAY[1:6] OF INTEGER\nDECLARE i : INTEGER\nDECLARE Target : INTEGER\n\n// your code here\n',
  tests: [
    { name: 'in the middle', inputs: ['4','9','15','22','8','30','15'], expect: ['Found at position 3'] },
    { name: 'first element',  inputs: ['7','1','2','3','4','5','7'],     expect: ['Found at position 1'] },
    { name: 'last element',   inputs: ['1','2','3','4','5','99','99'],   expect: ['Found at position 6'] },
    { name: 'absent',         inputs: ['1','2','3','4','5','6','42'],    expect: ['Not found'] },
    { name: 'duplicates',     inputs: ['5','8','5','8','5','8','8'],     expect: ['Found at position 2'] }
  ],
  hint: 'Track the position in a variable set to 0. Stop updating once you have recorded the first match.',
  solution: 'DECLARE Values : ARRAY[1:6] OF INTEGER\nDECLARE i : INTEGER\nDECLARE Target : INTEGER\nDECLARE Position : INTEGER\n\nFOR i <- 1 TO 6\n    INPUT Values[i]\nNEXT i\n\nINPUT Target\n\nPosition <- 0\n\nFOR i <- 1 TO 6\n    IF Values[i] = Target AND Position = 0 THEN\n        Position <- i\n    ENDIF\nNEXT i\n\nIF Position = 0 THEN\n    OUTPUT "Not found"\nELSE\n    OUTPUT "Found at position ", Position\nENDIF\n'
},
{
  id: 'times-table', title: 'Times Table', difficulty: 'medium', topic: 'Iteration',
  brief: 'Print a full multiplication table.',
  body: [
    { p: 'Read one whole number N and print its table from 1 to 12, one line per row:' },
    { code: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9' },
    { p: '…continuing all the way to <span class="code-font">3 x 12 = 36</span>.' }
  ],
  starter: 'DECLARE N : INTEGER\nDECLARE i : INTEGER\n\nINPUT N\n\n// your code here\n',
  tests: [
    { name: 'three times table', inputs: ['3'],
      expect: ['3 x 1 = 3','3 x 2 = 6','3 x 3 = 9','3 x 4 = 12','3 x 5 = 15','3 x 6 = 18',
               '3 x 7 = 21','3 x 8 = 24','3 x 9 = 27','3 x 10 = 30','3 x 11 = 33','3 x 12 = 36'] },
    { name: 'ten times table', inputs: ['10'],
      expect: ['10 x 1 = 10','10 x 2 = 20','10 x 3 = 30','10 x 4 = 40','10 x 5 = 50','10 x 6 = 60',
               '10 x 7 = 70','10 x 8 = 80','10 x 9 = 90','10 x 10 = 100','10 x 11 = 110','10 x 12 = 120'] }
  ],
  hint: 'One FOR loop from 1 to 12, printing N, " x ", i, " = " and the product.',
  solution: 'DECLARE N : INTEGER\nDECLARE i : INTEGER\n\nINPUT N\n\nFOR i <- 1 TO 12\n    OUTPUT N, " x ", i, " = ", N * i\nNEXT i\n'
},
{
  id: 'bubble-sort', title: 'Sort Six Numbers', difficulty: 'hard', topic: 'Sorting',
  brief: 'Put six values into ascending order.',
  body: [
    { p: 'Read <b>six</b> whole numbers into an array and sort them from smallest to largest. Print one value per line.' },
    { code: '3\n8\n12\n19\n25\n40' },
    { note: 'A bubble sort repeatedly compares neighbouring pairs and swaps any that are the wrong way round.' }
  ],
  starter: 'DECLARE Values : ARRAY[1:6] OF INTEGER\nDECLARE i : INTEGER\nDECLARE j : INTEGER\nDECLARE Temp : INTEGER\n\n// your code here\n',
  tests: [
    { name: 'unsorted',        inputs: ['25','3','40','12','8','19'], expect: ['3','8','12','19','25','40'] },
    { name: 'already sorted',  inputs: ['1','2','3','4','5','6'],     expect: ['1','2','3','4','5','6'] },
    { name: 'reversed',        inputs: ['6','5','4','3','2','1'],     expect: ['1','2','3','4','5','6'] },
    { name: 'with duplicates', inputs: ['4','2','4','1','2','1'],     expect: ['1','1','2','2','4','4'] }
  ],
  hint: 'Nested loops: the outer runs 5 passes, the inner compares Values[j] with Values[j+1] and swaps via a Temp variable.',
  solution: 'DECLARE Values : ARRAY[1:6] OF INTEGER\nDECLARE i : INTEGER\nDECLARE j : INTEGER\nDECLARE Temp : INTEGER\n\nFOR i <- 1 TO 6\n    INPUT Values[i]\nNEXT i\n\nFOR i <- 1 TO 5\n    FOR j <- 1 TO 6 - i\n        IF Values[j] > Values[j + 1] THEN\n            Temp <- Values[j]\n            Values[j] <- Values[j + 1]\n            Values[j + 1] <- Temp\n        ENDIF\n    NEXT j\nNEXT i\n\nFOR i <- 1 TO 6\n    OUTPUT Values[i]\nNEXT i\n'
},
{
  id: 'grid-row-totals', title: 'Grid Row Totals', difficulty: 'hard', topic: '2-D arrays',
  brief: 'Total each row of a 3 × 4 grid.',
  body: [
    { p: 'Read <b>twelve</b> whole numbers into a 3 × 4 grid, filling it row by row — the first four go in row 1, the next four in row 2, and so on.' },
    { p: 'Print the total of each row:' },
    { code: 'Row 1 total: 10\nRow 2 total: 26\nRow 3 total: 42' }
  ],
  starter: 'DECLARE Grid : ARRAY[1:3, 1:4] OF INTEGER\nDECLARE Row : INTEGER\nDECLARE Col : INTEGER\nDECLARE Total : INTEGER\n\n// your code here\n',
  tests: [
    { name: 'counting up', inputs: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      expect: ['Row 1 total: 10','Row 2 total: 26','Row 3 total: 42'] },
    { name: 'all zeros',   inputs: ['0','0','0','0','0','0','0','0','0','0','0','0'],
      expect: ['Row 1 total: 0','Row 2 total: 0','Row 3 total: 0'] },
    { name: 'negatives',   inputs: ['-1','-2','-3','-4','1','2','3','4','10','10','10','10'],
      expect: ['Row 1 total: -10','Row 2 total: 10','Row 3 total: 40'] }
  ],
  hint: 'Reset Total to 0 at the start of each row, inside the outer loop but before the inner one.',
  solution: 'DECLARE Grid : ARRAY[1:3, 1:4] OF INTEGER\nDECLARE Row : INTEGER\nDECLARE Col : INTEGER\nDECLARE Total : INTEGER\n\nFOR Row <- 1 TO 3\n    FOR Col <- 1 TO 4\n        INPUT Grid[Row, Col]\n    NEXT Col\nNEXT Row\n\nFOR Row <- 1 TO 3\n    Total <- 0\n    FOR Col <- 1 TO 4\n        Total <- Total + Grid[Row, Col]\n    NEXT Col\n    OUTPUT "Row ", Row, " total: ", Total\nNEXT Row\n'
}
];

/* ---------- generators shared by the problem definitions ---------- */

function randInt(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }
function randArray(n, min = 1, max = 99){ return Array.from({ length: n }, () => randInt(min, max)); }
function randWord(n){
  const a = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from({ length: n }, () => a[randInt(0, 25)]).join('');
}
function palindrome(n){
  const half = randWord(Math.ceil(n / 2));
  const back = half.split('').reverse().join('');
  return n % 2 === 0 ? half + back : half + back.slice(1);
}
function nonPalindrome(n){
  for (;;){
    const w = randWord(Math.max(n, 2));
    if (w !== w.split('').reverse().join('')) return w;
  }
}
/* an array with exactly one pair summing to the target */
function twoSumCase(n){
  for (;;){
    const arr = Array.from({ length: n }, () => randInt(1, 40));
    const i = randInt(0, n - 2), j = randInt(i + 1, n - 1);
    const target = arr[i] + arr[j];
    let unique = true;
    outer: for (let a = 0; a < n; a++)
      for (let b = a + 1; b < n; b++)
        if ((a !== i || b !== j) && arr[a] + arr[b] === target){ unique = false; break outer; }
    if (unique) return { arr, target, i: i + 1, j: j + 1 };
  }
}
/* pseudocode that declares an array and fills it with `values` */
function arraySetup(name, size, values){
  let out = `DECLARE ${name} : ARRAY[1:${size}] OF INTEGER\n`;
  for (let i = 0; i < values.length; i++) out += `${name}[${i + 1}] <- ${values[i]}\n`;
  return out;
}
function gridSetup(name, rows, cols, values){
  let out = `DECLARE ${name} : ARRAY[1:${rows}, 1:${cols}] OF INTEGER\n`;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) out += `${name}[${r + 1}, ${c + 1}] <- ${values[r][c]}\n`;
  return out;
}

/* ---------- exam-style questions ---------- */

export const EXAM = [
{
  id: "q1-count-scores",
  label: "(Question 1)",
  title: "Count High Scores",
  tags: ["Arrays","Counting","Conditions","Loops"],
  marks: 3,
  difficulty: "Easy",
  question: "A class takes a quiz. An array `Score[1:20]` of type INTEGER stores 20 student scores.\n\nWrite pseudocode to:\n• count how many scores are greater than or equal to 60\n• output the count",
  starterCode: "// Score[1:20] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE Count : INTEGER\n\nCount <- 0\n\nFOR Idx <- 1 TO 20\n    IF Score[Idx] >= 60 THEN\n        Count <- Count + 1\n    ENDIF\nNEXT Idx\n\nOUTPUT Count",
  orderMatters: false,
  generateTests(){const e=t=>({setup:arraySetup("Score",20,t),expected:[t.filter(r=>r>=60).length]});return[{description:"10 scores below 60, 10 at or above 60",...e([45,55,40,58,30,50,42,35,28,59,60,72,85,63,91,78,66,74,82,70])},{description:"All 20 scores below 60",...e([12,34,45,23,56,18,47,39,27,55,11,44,37,29,52,41,16,48,33,22])},{description:"All 20 scores at or above 60",...e([60,61,62,63,64,65,70,75,80,85,90,91,92,93,94,95,96,97,98,99])}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:20},()=>Math.floor(Math.random()*100)+1),t=e.filter(r=>r>=60).length;return{description:`Scores: [${e.join(", ")}]`,setup:arraySetup("Score",20,e),expected:[t]}})}
},
{
  id: "q16-count-even",
  label: "(Question 2)",
  title: "Count Even Numbers",
  tags: ["Arrays","Counting","Conditions","Loops"],
  marks: 3,
  difficulty: "Easy",
  question: "An array `Num[1:15]` of type INTEGER stores 15 integer values.\n\nWrite pseudocode to:\n• count how many values in `Num` are even\n• output the count",
  starterCode: "// Num[1:15] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE EvenCount : INTEGER\n\nEvenCount <- 0\n\nFOR Idx <- 1 TO 15\n    IF Num[Idx] MOD 2 = 0 THEN\n        EvenCount <- EvenCount + 1\n    ENDIF\nNEXT Idx\n\nOUTPUT EvenCount",
  orderMatters: false,
  generateTests(){const e=t=>({setup:arraySetup("Num",15,t),expected:[t.filter(r=>r%2===0).length]});return[{description:"Mix of even and odd — 8 even",...e([2,7,4,11,6,13,8,3,10,5,12,9,14,1,16])},{description:"All odd — 0 even",...e([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29])},{description:"All even — 15 even",...e([2,4,6,8,10,12,14,16,18,20,22,24,26,28,30])}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:15},()=>Math.floor(Math.random()*100)+1),t=e.filter(r=>r%2===0).length;return{description:`Num: [${e.join(", ")}]`,setup:arraySetup("Num",15,e),expected:[t]}})}
},
{
  id: "q9-find-minimum",
  label: "(Question 3)",
  title: "Find Minimum Reading",
  tags: ["Arrays","Minimum","Loops","Conditions"],
  marks: 4,
  difficulty: "Easy",
  question: "A factory monitors machine temperatures. An array `Reading[1:10]` of type INTEGER stores 10 sensor readings.\n\nWrite pseudocode to:\n• find the lowest value in `Reading`\n• output the lowest value",
  starterCode: "// Reading[1:10] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE Minimum : INTEGER\n\nMinimum <- Reading[1]\n\nFOR Idx <- 2 TO 10\n    IF Reading[Idx] < Minimum THEN\n        Minimum <- Reading[Idx]\n    ENDIF\nNEXT Idx\n\nOUTPUT Minimum",
  orderMatters: false,
  generateTests(){const e=t=>({setup:arraySetup("Reading",10,t),expected:[Math.min(...t)]});return[{description:"Mixed readings",...e([72,45,88,31,64,19,57,83,26,50])},{description:"Already sorted ascending",...e([10,20,30,40,50,60,70,80,90,100])},{description:"Minimum at last position",...e([90,85,78,92,66,74,88,81,95,5])}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:10},()=>Math.floor(Math.random()*200)+1);return{description:`Readings: [${e.join(", ")}]`,setup:arraySetup("Reading",10,e),expected:[Math.min(...e)]}})}
},
{
  id: "q10-count-in-range",
  label: "(Question 4)",
  title: "Count in Range",
  tags: ["Arrays","Counting","Conditions","Loops"],
  marks: 4,
  difficulty: "Easy",
  question: "A clinic records patient weights. An array `Weight[1:20]` of type INTEGER stores 20 weights in kilograms.\n\nWrite pseudocode to:\n• count how many weights are in the range 50 to 80 inclusive\n• output the count",
  starterCode: "// Weight[1:20] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE Count : INTEGER\n\nCount <- 0\n\nFOR Idx <- 1 TO 20\n    IF Weight[Idx] >= 50 AND Weight[Idx] <= 80 THEN\n        Count <- Count + 1\n    ENDIF\nNEXT Idx\n\nOUTPUT Count",
  orderMatters: false,
  generateTests(){const e=t=>({setup:arraySetup("Weight",20,t),expected:[t.filter(r=>r>=50&&r<=80).length]});return[{description:"Mix of weights in and out of range",...e([45,62,88,50,73,30,80,91,55,110,68,40,79,52,95,61,75,33,48,83])},{description:"All weights below 50",...e([10,20,30,35,40,25,15,42,38,29,12,45,18,33,47,22,41,36,27,49])},{description:"All weights in range",...e([50,55,60,65,70,75,80,52,58,63,68,73,78,51,57,62,67,72,77,80])}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:20},()=>Math.floor(Math.random()*120)+20);return{description:`Weights: [${e.join(", ")}]`,setup:arraySetup("Weight",20,e),expected:[e.filter(t=>t>=50&&t<=80).length]}})}
},
{
  id: "q2-temp-stats",
  label: "(Question 5)",
  title: "Temperature Statistics",
  tags: ["Arrays","Totals","Arithmetic","Loops"],
  marks: 5,
  difficulty: "Easy",
  question: "A weather station records temperatures over one week. An array `Temp[1:7]` of type INTEGER stores 7 daily temperatures in degrees Celsius.\n\nWrite pseudocode to:\n• calculate the total of all temperatures in `Temp`\n• calculate the average temperature\n• output the total and the average",
  starterCode: "// Temp[1:7] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE Total : INTEGER\nDECLARE Average : REAL\n\nTotal <- 0\nAverage <- 0.0\n\nFOR Idx <- 1 TO 7\n    Total <- Total + Temp[Idx]\nNEXT Idx\n\nAverage <- Total / 7\n\nOUTPUT Total\nOUTPUT Average",
  orderMatters: false,
  generateTests(){return[{description:"Temps: [14, 21, 7, 28, 14, 21, 35] — total 140, avg 20",setup:arraySetup("Temp",7,[14,21,7,28,14,21,35]),expected:[140,20]},{description:"Temps: [7, 7, 7, 7, 7, 7, 7] — total 49, avg 7",setup:arraySetup("Temp",7,[7,7,7,7,7,7,7]),expected:[49,7]},{description:"Temps: [10, 20, 30, 20, 10, 30, 20] — total 140, avg 20",setup:arraySetup("Temp",7,[10,20,30,20,10,30,20]),expected:[140,20]}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:6},()=>Math.floor(Math.random()*30)+1),t=e.reduce((a,i)=>a+i,0),r=7-t%7===7?7:7-t%7;e.push(r);const o=e.reduce((a,i)=>a+i,0),s=o/7;return{description:`Temps: [${e.join(", ")}] — total ${o}, avg ${s}`,setup:arraySetup("Temp",7,e),expected:[o,s]}})}
},
{
  id: "q17-max-min",
  label: "(Question 6)",
  title: "Find Maximum and Minimum",
  tags: ["Arrays","Maximum","Minimum","Loops","Conditions"],
  marks: 5,
  difficulty: "Easy",
  question: "A weather station records daily temperatures. An array `Temp[1:10]` of type INTEGER stores 10 temperature readings.\n\nWrite pseudocode to:\n• find the highest temperature in `Temp`\n• find the lowest temperature in `Temp`\n• output the highest and lowest values",
  starterCode: "// Temp[1:10] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE Maximum : INTEGER\nDECLARE Minimum : INTEGER\n\nMaximum <- Temp[1]\nMinimum <- Temp[1]\n\nFOR Idx <- 2 TO 10\n    IF Temp[Idx] > Maximum THEN\n        Maximum <- Temp[Idx]\n    ENDIF\n    IF Temp[Idx] < Minimum THEN\n        Minimum <- Temp[Idx]\n    ENDIF\nNEXT Idx\n\nOUTPUT Maximum\nOUTPUT Minimum",
  orderMatters: false,
  generateTests(){const e=t=>({setup:arraySetup("Temp",10,t),expected:[Math.max(...t),Math.min(...t)]});return[{description:"Mixed temperatures",...e([18,5,23,11,29,7,15,31,2,20])},{description:"All same temperature",...e([10,10,10,10,10,10,10,10,10,10])},{description:"Ascending order",...e([1,2,3,4,5,6,7,8,9,10])}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:10},()=>Math.floor(Math.random()*60)-10);return{description:`Temp: [${e.join(", ")}]`,setup:arraySetup("Temp",10,e),expected:[Math.max(...e),Math.min(...e)]}})}
},
{
  id: "q4-bubble-sort",
  label: "(Question 7)",
  title: "Sort Exam Marks",
  tags: ["Arrays","Bubble Sort","Sorting","Loops"],
  marks: 5,
  difficulty: "Medium",
  question: "A set of exam marks is stored in an array. `Marks[1:8]` of type INTEGER stores 8 integer marks.\n\nWrite pseudocode to:\n• sort `Marks` into ascending order using a bubble sort\n• output the sorted values",
  starterCode: "// Marks[1:8] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE Sorted : BOOLEAN\nDECLARE Count : INTEGER\nDECLARE Temp : INTEGER\n\nSorted <- FALSE\nCount <- 1\nTemp <- 0\n\nREPEAT\n    Sorted <- TRUE\n    FOR Idx <- 1 TO 8 - Count\n        IF Marks[Idx] > Marks[Idx + 1] THEN\n            Temp <- Marks[Idx]\n            Marks[Idx] <- Marks[Idx + 1]\n            Marks[Idx + 1] <- Temp\n\n            Sorted <- FALSE\n        ENDIF\n    NEXT Idx\n    Count <- Count + 1\nUNTIL Sorted\n\nFOR Idx <- 1 TO 8\n    OUTPUT Marks[Idx]\nNEXT Idx",
  generateTests(){const e=t=>{const r=[...t].sort((o,s)=>o-s);return{setup:arraySetup("Marks",8,t),expected:r}};return[{description:"Marks: [64, 12, 87, 34, 56, 78, 23, 91]",...e([64,12,87,34,56,78,23,91])},{description:"Marks: [8, 7, 6, 5, 4, 3, 2, 1] — reverse order",...e([8,7,6,5,4,3,2,1])},{description:"Marks: [3, 3, 9, 1, 7, 3, 6, 4] — with duplicates",...e([3,3,9,1,7,3,6,4])}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:8},()=>Math.floor(Math.random()*100)+1),t=[...e].sort((r,o)=>r-o);return{description:`Marks: [${e.join(", ")}]`,setup:arraySetup("Marks",8,e),expected:t}})}
},
{
  id: "q11-count-occurrences",
  label: "(Question 8)",
  title: "Count Occurrences",
  tags: ["Arrays","Counting","Loops","Conditions"],
  marks: 5,
  difficulty: "Medium",
  question: "A survey records responses on a scale of 1 to 5. An array `Response[1:30]` of type INTEGER stores 30 survey responses. A variable `Target` of type INTEGER holds the response value to search for.\n\nWrite pseudocode to:\n• count how many elements in `Response` are equal to `Target`\n• output the count",
  starterCode: "// Response[1:30] and Target are already declared\n// Write your pseudocode below\n\n",
  solution: "DECLARE Count : INTEGER\n\nCount <- 0\n\nFOR Idx <- 1 TO 30\n    IF Response[Idx] = Target THEN\n        Count <- Count + 1\n    ENDIF\nNEXT Idx\n\nOUTPUT Count",
  orderMatters: false,
  generateTests(){const e=[1,2,3,4,5,1,2,3,4,5,1,3,5,2,4,1,1,3,2,5,4,3,1,2,5,4,3,2,1,5],t=arraySetup("Response",30,e);return[{description:"Target = 1 — appears 7 times",setup:`${t}DECLARE Target : INTEGER
  Target <- 1
  `,expected:[e.filter(r=>r===1).length]},{description:"Target = 3 — appears 6 times",setup:`${t}DECLARE Target : INTEGER
  Target <- 3
  `,expected:[e.filter(r=>r===3).length]},{description:"Target = 5 — appears 5 times",setup:`${t}DECLARE Target : INTEGER
  Target <- 5
  `,expected:[e.filter(r=>r===5).length]}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:30},()=>Math.floor(Math.random()*5)+1),t=Math.floor(Math.random()*5)+1,r=e.filter(s=>s===t).length,o=`${arraySetup("Response",30,e)}DECLARE Target : INTEGER
  Target <- ${t}
  `;return{description:`Target: ${t}, Responses: [${e.join(", ")}]`,setup:o,expected:[r]}})}
},
{
  id: "q12-sort-descending",
  label: "(Question 9)",
  title: "Sort Descending",
  tags: ["Arrays","Bubble Sort","Sorting","Loops"],
  marks: 5,
  difficulty: "Medium",
  question: "A competition records scores for 6 finalists. An array `Score[1:6]` of type INTEGER stores 6 scores.\n\nWrite pseudocode to:\n• sort `Score` into descending order using a bubble sort\n• output the sorted values",
  starterCode: "// Score[1:6] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE Sorted : BOOLEAN\nDECLARE Count : INTEGER\nDECLARE Temp : INTEGER\n\nSorted <- FALSE\nCount <- 1\nTemp <- 0\n\nREPEAT\n    Sorted <- TRUE\n    FOR Idx <- 1 TO 6 - Count\n        IF Score[Idx] < Score[Idx + 1] THEN\n            Temp <- Score[Idx]\n            Score[Idx] <- Score[Idx + 1]\n            Score[Idx + 1] <- Temp\n\n            Sorted <- FALSE\n        ENDIF\n    NEXT Idx\n    Count <- Count + 1\nUNTIL Sorted\n\nFOR Idx <- 1 TO 6\n    OUTPUT Score[Idx]\nNEXT Idx",
  generateTests(){const e=t=>{const r=[...t].sort((o,s)=>s-o);return{setup:arraySetup("Score",6,t),expected:r}};return[{description:"Scores: [42, 87, 15, 63, 29, 74]",...e([42,87,15,63,29,74])},{description:"Already ascending — must reverse",...e([10,20,30,40,50,60])},{description:"With duplicates",...e([55,72,55,88,72,40])}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:6},()=>Math.floor(Math.random()*100)+1),t=[...e].sort((r,o)=>o-r);return{description:`Scores: [${e.join(", ")}]`,setup:arraySetup("Score",6,e),expected:t}})}
},
{
  id: "q3-linear-search",
  label: "(Question 10)",
  title: "Student Record Search",
  tags: ["Arrays","Linear Search","Loops","Conditions"],
  marks: 5,
  difficulty: "Medium",
  question: "A school stores student IDs in an array. `StudentID[1:10]` of type INTEGER stores 10 student IDs. A variable `Target` of type INTEGER holds the ID to search for.\n\nWrite pseudocode to:\n• search `StudentID` for the value in `Target` using a linear search\n• output the position if found\n• otherwise output `\"Not found\"`",
  starterCode: "// StudentID[1:10] and Target are already declared\n// Write your pseudocode below\n\n",
  solution: "DECLARE Found : BOOLEAN\nDECLARE Pos : INTEGER\n\nFound <- FALSE\nPos <- 0\n\nFOR Idx <- 1 TO 10\n    IF StudentID[Idx] = Target THEN\n        Found <- TRUE\n        Pos <- Idx\n    ENDIF\nNEXT Idx\n\nIF Found = TRUE THEN\n    OUTPUT Pos\nELSE\n    OUTPUT \"Not found\"\nENDIF",
  generateTests(){const t=`${arraySetup("StudentID",10,[1012,2045,3078,4001,5099,6234,7410,8003,9156,1500])}`;return[{description:"Target 5099 — found at position 5",setup:`${t}DECLARE Target : INTEGER
  Target <- 5099
  `,expected:[5]},{description:"Target 1012 — found at position 1",setup:`${t}DECLARE Target : INTEGER
  Target <- 1012
  `,expected:[1]},{description:"Target 9999 — not found",setup:`${t}DECLARE Target : INTEGER
  Target <- 9999
  `,expected:["Not found"]}]},
  generateSubmitTests(){const e=[];for(let t=0;t<100;t++){const r=[];for(;r.length<10;){const p=Math.floor(Math.random()*9e3)+1e3;r.includes(p)||r.push(p)}const o=Math.random()<.6;let s,a;if(o){const p=Math.floor(Math.random()*10);s=r[p],a=[p+1]}else s=0,a=["Not found"];const i=`${arraySetup("StudentID",10,r)}DECLARE Target : INTEGER
  Target <- ${s}
  `;e.push({description:`IDs: [${r.join(", ")}], Target: ${s}`,setup:i,expected:a})}return e}
},
{
  id: "q5-classify-sales",
  label: "(Question 11)",
  title: "Analyse Sales Data",
  tags: ["Arrays","Counting","Conditions","Loops"],
  marks: 6,
  difficulty: "Medium",
  question: "A shop records daily sales figures. An array `Sales[1:12]` of type INTEGER stores 12 monthly sales totals.\n\nWrite pseudocode to:\n• count how many months had sales greater than 500, storing the result in `AboveTarget`\n• count how many months had sales of 500 or below, storing the result in `BelowTarget`\n• output `AboveTarget` and `BelowTarget`",
  starterCode: "// Sales[1:12] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE AboveTarget : INTEGER\nDECLARE BelowTarget : INTEGER\n\nAboveTarget <- 0\nBelowTarget <- 0\n\nFOR Idx <- 1 TO 12\n    IF Sales[Idx] > 500 THEN\n        AboveTarget <- AboveTarget + 1\n    ELSE\n        BelowTarget <- BelowTarget + 1\n    ENDIF\nNEXT Idx\n\nOUTPUT AboveTarget\nOUTPUT BelowTarget",
  orderMatters: false,
  generateTests(){const e=t=>{const r=t.filter(o=>o>500).length;return{setup:arraySetup("Sales",12,t),expected:[r,12-r]}};return[{description:"6 above 500, 6 at or below",...e([120,650,480,720,300,510,200,840,450,600,350,750])},{description:"All below or equal to 500",...e([100,200,300,400,500,150,250,350,450,499,500,180])},{description:"All above 500",...e([501,600,700,800,900,1e3,550,620,710,830,960,520])}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:12},()=>Math.floor(Math.random()*1e3)+1),t=e.filter(r=>r>500).length;return{description:`Sales: [${e.join(", ")}]`,setup:arraySetup("Sales",12,e),expected:[t,12-t]}})}
},
{
  id: "q13-pass-fail",
  label: "(Question 12)",
  title: "Pass / Fail Analysis",
  tags: ["Arrays","Counting","Totals","Conditions","Loops"],
  marks: 6,
  difficulty: "Medium",
  question: "An examination board stores student marks. An array `Mark[1:25]` of type INTEGER stores 25 exam marks.\n\nWrite pseudocode to:\n• calculate the total of all marks\n• count how many students passed, where a pass is a mark of 50 or above, storing the result in `PassCount`\n• count how many students failed, storing the result in `FailCount`\n• output the total, `PassCount`, and `FailCount`",
  starterCode: "// Mark[1:25] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE Total : INTEGER\nDECLARE PassCount : INTEGER\nDECLARE FailCount : INTEGER\n\nTotal <- 0\nPassCount <- 0\nFailCount <- 0\n\nFOR Idx <- 1 TO 25\n    Total <- Total + Mark[Idx]\n    IF Mark[Idx] >= 50 THEN\n        PassCount <- PassCount + 1\n    ELSE\n        FailCount <- FailCount + 1\n    ENDIF\nNEXT Idx\n\nOUTPUT Total\nOUTPUT PassCount\nOUTPUT FailCount",
  orderMatters: false,
  generateTests(){const e=s=>({setup:arraySetup("Mark",25,s),expected:[s.reduce((a,i)=>a+i,0),s.filter(a=>a>=50).length,s.filter(a=>a<50).length]}),t=[72,43,58,29,81,50,37,66,92,14,55,48,77,61,33,88,45,70,22,53,39,84,67,11,95],r=Array.from({length:25},()=>30),o=Array.from({length:25},()=>60);return[{description:"Mixed results",...e(t)},{description:"All marks below 50 — 0 passes",...e(r)},{description:"All marks above 50 — 0 failures",...e(o)}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:25},()=>Math.floor(Math.random()*100)+1);return{description:`Marks: [${e.slice(0,5).join(", ")}, …]`,setup:arraySetup("Mark",25,e),expected:[e.reduce((t,r)=>t+r,0),e.filter(t=>t>=50).length,e.filter(t=>t<50).length]}})}
},
{
  id: "q18-grid-stats",
  label: "(Question 13)",
  title: "2D Grid Statistics",
  tags: ["2D Arrays","Counting","Maximum","Nested Loops","Conditions"],
  marks: 6,
  difficulty: "Medium",
  question: "A system stores sensor data in a two-dimensional array. `Grid[1:4, 1:5]` of type INTEGER stores readings across 4 rows and 5 columns.\n\nWrite pseudocode to:\n• find the highest value in `Grid`\n• count how many values in `Grid` are greater than 50\n• output the highest value and the count",
  starterCode: "// Grid[1:4, 1:5] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE Highest : INTEGER\nDECLARE Count : INTEGER\n\nHighest <- Grid[1, 1]\nCount <- 0\n\nFOR Row <- 1 TO 4\n    FOR Col <- 1 TO 5\n        IF Grid[Row, Col] > Highest THEN\n            Highest <- Grid[Row, Col]\n        ENDIF\n        IF Grid[Row, Col] > 50 THEN\n            Count <- Count + 1\n        ENDIF\n    NEXT Col\nNEXT Row\n\nOUTPUT Highest\nOUTPUT Count",
  orderMatters: false,
  generateTests(){const e=t=>{const r=t.flat();return{setup:gridSetup("Grid",4,5,t),expected:[Math.max(...r),r.filter(o=>o>50).length]}};return[{description:"Mixed values across grid",...e([[12,67,34,88,45],[73,29,91,55,18],[60,42,76,8,53],[37,84,21,69,47]])},{description:"All values at or below 50",...e([[10,20,30,40,50],[15,25,35,45,5],[8,18,28,38,48],[3,13,23,43,50]])},{description:"All values above 50",...e([[51,62,73,84,95],[55,66,77,88,99],[53,64,75,86,97],[52,63,74,85,96]])}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:4},()=>Array.from({length:5},()=>Math.floor(Math.random()*100)+1)),t=e.flat();return{description:`Grid (first row): [${e[0].join(", ")}] …`,setup:gridSetup("Grid",4,5,e),expected:[Math.max(...t),t.filter(r=>r>50).length]}})}
},
{
  id: "q19-age-groups",
  label: "(Question 14)",
  title: "Age Group Analysis",
  tags: ["Arrays","Counting","Conditions","Loops"],
  marks: 6,
  difficulty: "Medium",
  question: "A leisure centre records the ages of its members. An array `Age[1:20]` of type INTEGER stores 20 member ages.\n\nWrite pseudocode to:\n• count how many members are children (age below 18), storing the result in `ChildCount`\n• count how many members are adults (age 18 to 64 inclusive), storing the result in `AdultCount`\n• count how many members are seniors (age 65 or above), storing the result in `SeniorCount`\n• output `ChildCount`, `AdultCount`, and `SeniorCount`",
  starterCode: "// Age[1:20] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE ChildCount : INTEGER\nDECLARE AdultCount : INTEGER\nDECLARE SeniorCount : INTEGER\n\nChildCount <- 0\nAdultCount <- 0\nSeniorCount <- 0\n\nFOR Idx <- 1 TO 20\n    IF Age[Idx] < 18 THEN\n        ChildCount <- ChildCount + 1\n    ELSE\n        IF Age[Idx] >= 65 THEN\n            SeniorCount <- SeniorCount + 1\n        ELSE\n            AdultCount <- AdultCount + 1\n        ENDIF\n    ENDIF\nNEXT Idx\n\nOUTPUT ChildCount\nOUTPUT AdultCount\nOUTPUT SeniorCount",
  orderMatters: false,
  generateTests(){const e=t=>({setup:arraySetup("Age",20,t),expected:[t.filter(r=>r<18).length,t.filter(r=>r>=18&&r<65).length,t.filter(r=>r>=65).length]});return[{description:"Mix of all three age groups",...e([12,34,67,15,45,70,8,55,72,19,63,14,68,30,10,50,75,22,16,48])},{description:"All children (ages 1–20)",...e(Array.from({length:20},(t,r)=>r+1))},{description:"All seniors (ages 65–84)",...e(Array.from({length:20},(t,r)=>65+r))}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:20},()=>Math.floor(Math.random()*85)+1);return{description:`Ages: [${e.join(", ")}]`,setup:arraySetup("Age",20,e),expected:[e.filter(t=>t<18).length,e.filter(t=>t>=18&&t<65).length,e.filter(t=>t>=65).length]}})}
},
{
  id: "q6-library-search",
  label: "(Question 15)",
  title: "Library Stock Search",
  tags: ["Arrays","Linear Search","Parallel Arrays","Loops"],
  marks: 7,
  difficulty: "Hard",
  question: "A library system stores book records using two parallel arrays.\n`BookID[1:15]` of type INTEGER stores 15 book ID numbers.\n`Copies[1:15]` of type INTEGER stores the corresponding number of copies available.\nA variable `SearchID` of type INTEGER holds the ID to look up.\n\nWrite pseudocode to:\n• search `BookID` for the value in `SearchID` using a linear search\n• if found, output the number of copies from `Copies` at the same position\n• otherwise output `\"Not found\"`",
  starterCode: "// BookID[1:15], Copies[1:15] and SearchID are already declared\n// Write your pseudocode below\n\n",
  solution: "DECLARE Found : BOOLEAN\n\nFound <- FALSE\n\nFOR Idx <- 1 TO 15\n    IF BookID[Idx] = SearchID THEN\n        OUTPUT Copies[Idx]\n        Found <- TRUE\n    ENDIF\nNEXT Idx\n\nIF Found = FALSE THEN\n    OUTPUT \"Not found\"\nENDIF",
  generateTests(){const e=[101,102,103,104,105,106,107,108,109,110,111,112,113,114,115],t=[3,0,5,2,8,1,4,6,0,3,7,2,5,1,9],r=arraySetup("BookID",15,e)+arraySetup("Copies",15,t);return[{description:"SearchID 105 — 8 copies",setup:`${r}DECLARE SearchID : INTEGER
  SearchID <- 105
  `,expected:[8]},{description:"SearchID 101 — 3 copies",setup:`${r}DECLARE SearchID : INTEGER
  SearchID <- 101
  `,expected:[3]},{description:"SearchID 999 — not found",setup:`${r}DECLARE SearchID : INTEGER
  SearchID <- 999
  `,expected:["Not found"]}]},
  generateSubmitTests(){const e=[];for(let t=0;t<100;t++){const r=[];for(;r.length<15;){const u=Math.floor(Math.random()*900)+100;r.includes(u)||r.push(u)}const o=Array.from({length:15},()=>Math.floor(Math.random()*10)),s=Math.random()<.65;let a,i;if(s){const u=Math.floor(Math.random()*15);a=r[u],i=[o[u]]}else a=0,i=["Not found"];const p=arraySetup("BookID",15,r)+arraySetup("Copies",15,o)+`DECLARE SearchID : INTEGER
  SearchID <- ${a}
  `;e.push({description:`SearchID: ${a}`,setup:p,expected:i})}return e}
},
{
  id: "q20-student-search-2d",
  label: "(Question 16)",
  title: "2D Student Mark Search",
  tags: ["2D Arrays","Linear Search","Nested Loops","Conditions"],
  marks: 7,
  difficulty: "Hard",
  question: "A school stores student data in a two-dimensional array. `StudentData[1:10, 1:2]` of type INTEGER stores:\n• column 1: student ID number\n• column 2: exam mark\n\nA variable `SearchID` of type INTEGER holds the ID to search for.\n\nWrite pseudocode to:\n• search column 1 of `StudentData` for the value in `SearchID`\n• if found, output the exam mark from column 2\n• otherwise output `\"Not found\"`",
  starterCode: "// StudentData[1:10, 1:2] and SearchID are already declared\n// Write your pseudocode below\n\n",
  solution: "DECLARE Found : BOOLEAN\n\nFound <- FALSE\n\nFOR Row <- 1 TO 10\n    IF StudentData[Row, 1] = SearchID THEN\n        OUTPUT StudentData[Row, 2]\n        Found <- TRUE\n    ENDIF\nNEXT Row\n\nIF Found = FALSE THEN\n    OUTPUT \"Not found\"\nENDIF",
  generateTests(){const e=[1001,1002,1003,1004,1005,1006,1007,1008,1009,1010],t=[72,58,84,45,91,63,77,39,88,55],r=e.map((s,a)=>[s,t[a]]),o=gridSetup("StudentData",10,2,r);return[{description:"SearchID 1005 — mark 91",setup:`${o}DECLARE SearchID : INTEGER
  SearchID <- 1005
  `,expected:[91]},{description:"SearchID 1001 — mark 72",setup:`${o}DECLARE SearchID : INTEGER
  SearchID <- 1001
  `,expected:[72]},{description:"SearchID 9999 — not found",setup:`${o}DECLARE SearchID : INTEGER
  SearchID <- 9999
  `,expected:["Not found"]}]},
  generateSubmitTests(){const e=[];for(let t=0;t<100;t++){const r=[];for(;r.length<10;){const h=Math.floor(Math.random()*9e3)+1e3;r.includes(h)||r.push(h)}const o=Array.from({length:10},()=>Math.floor(Math.random()*100)+1),s=r.map((h,f)=>[h,o[f]]),a=Math.random()<.65;let i,p;if(a){const h=Math.floor(Math.random()*10);i=r[h],p=[o[h]]}else i=0,p=["Not found"];const u=`${gridSetup("StudentData",10,2,s)}DECLARE SearchID : INTEGER
  SearchID <- ${i}
  `;e.push({description:`SearchID: ${i}`,setup:u,expected:p})}return e}
},
{
  id: "q7-score-analysis",
  label: "(Question 17)",
  title: "Multi-step Score Analysis",
  tags: ["Arrays","Totals","Counting","Maximum","Loops"],
  marks: 8,
  difficulty: "Hard",
  question: "A school stores exam results. An array `Score[1:25]` of type INTEGER stores 25 exam scores.\n\nWrite pseudocode to:\n• calculate the total of all scores\n• count how many scores are greater than or equal to 70\n• find the highest score\n• output the total, the count, and the highest score",
  starterCode: "// Score[1:25] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE Total : INTEGER\nDECLARE HighCount : INTEGER\nDECLARE Highest : INTEGER\n\nTotal <- 0\nHighCount <- 0\nHighest <- Score[1]\n\nFOR Idx <- 1 TO 25\n    Total <- Total + Score[Idx]\n    IF Score[Idx] >= 70 THEN\n        HighCount <- HighCount + 1\n    ENDIF\n    IF Score[Idx] > Highest THEN\n        Highest <- Score[Idx]\n    ENDIF\nNEXT Idx\n\nOUTPUT Total\nOUTPUT HighCount\nOUTPUT Highest",
  orderMatters: false,
  generateTests(){const e=s=>({setup:arraySetup("Score",25,s),expected:[s.reduce((a,i)=>a+i,0),s.filter(a=>a>=70).length,Math.max(...s)]}),t=[55,82,40,73,60,91,48,77,63,84,52,66,79,88,45,71,58,93,37,69,75,42,86,61,95],r=Array.from({length:25},(s,a)=>10+a*2),o=Array.from({length:25},(s,a)=>70+a);return[{description:"Mixed scores",...e(t)},{description:"All scores below 70",...e(r)},{description:"All scores 70 or above",...e(o)}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:25},()=>Math.floor(Math.random()*100)+1);return{description:`Scores: [${e.slice(0,5).join(", ")}, …]`,setup:arraySetup("Score",25,e),expected:[e.reduce((t,r)=>t+r,0),e.filter(t=>t>=70).length,Math.max(...e)]}})}
},
{
  id: "q14-grade-breakdown",
  label: "(Question 18)",
  title: "Student Grade Breakdown",
  tags: ["Arrays","Counting","Maximum","Conditions","Loops"],
  marks: 8,
  difficulty: "Hard",
  question: "A school stores exam marks in an array. `Mark[1:20]` of type INTEGER stores 20 student marks.\n\nWrite pseudocode to:\n• count how many students achieved a distinction (mark of 80 or above), storing the result in `Distinction`\n• count how many students passed (mark of 50 to 79 inclusive), storing the result in `Pass`\n• count how many students failed (mark below 50), storing the result in `Fail`\n• find the highest mark\n• output `Distinction`, `Pass`, `Fail`, and the highest mark",
  starterCode: "// Mark[1:20] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE Distinction : INTEGER\nDECLARE Pass : INTEGER\nDECLARE Fail : INTEGER\nDECLARE Highest : INTEGER\n\nDistinction <- 0\nPass <- 0\nFail <- 0\nHighest <- Mark[1]\n\nFOR Idx <- 1 TO 20\n    IF Mark[Idx] >= 80 THEN\n        Distinction <- Distinction + 1\n    ELSE\n        IF Mark[Idx] >= 50 THEN\n            Pass <- Pass + 1\n        ELSE\n            Fail <- Fail + 1\n        ENDIF\n    ENDIF\n    IF Mark[Idx] > Highest THEN\n        Highest <- Mark[Idx]\n    ENDIF\nNEXT Idx\n\nOUTPUT Distinction\nOUTPUT Pass\nOUTPUT Fail\nOUTPUT Highest",
  orderMatters: false,
  generateTests(){const e=s=>({setup:arraySetup("Mark",20,s),expected:[s.filter(a=>a>=80).length,s.filter(a=>a>=50&&a<80).length,s.filter(a=>a<50).length,Math.max(...s)]}),t=[91,43,75,28,82,56,38,67,85,49,72,95,31,61,88,44,79,53,22,80],r=[80,85,90,95,82,88,91,84,86,92,79,81,83,87,89,93,94,96,97,98],o=[10,20,30,40,25,35,45,15,38,42,28,33,47,19,22,41,36,48,27,49];return[{description:"Mix of all three grades",...e(t)},{description:"Mostly distinctions",...e(r)},{description:"All failures",...e(o)}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:20},()=>Math.floor(Math.random()*100)+1);return{description:`Marks: [${e.slice(0,5).join(", ")}, …]`,setup:arraySetup("Mark",20,e),expected:[e.filter(t=>t>=80).length,e.filter(t=>t>=50&&t<80).length,e.filter(t=>t<50).length,Math.max(...e)]}})}
},
{
  id: "q21-rainfall",
  label: "(Question 19)",
  title: "Rainfall Analysis",
  tags: ["Arrays","Totals","Counting","Maximum","Loops"],
  marks: 8,
  difficulty: "Hard",
  question: "A meteorologist records daily rainfall. An array `Rainfall[1:30]` of type INTEGER stores 30 daily rainfall amounts in millimetres.\n\nWrite pseudocode to:\n• calculate the total rainfall\n• count how many days had rainfall greater than zero, storing the result in `RainyDays`\n• find the highest daily rainfall\n• output the total, `RainyDays`, and the highest daily rainfall",
  starterCode: "// Rainfall[1:30] is already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE Total : INTEGER\nDECLARE RainyDays : INTEGER\nDECLARE Highest : INTEGER\n\nTotal <- 0\nRainyDays <- 0\nHighest <- Rainfall[1]\n\nFOR Idx <- 1 TO 30\n    Total <- Total + Rainfall[Idx]\n    IF Rainfall[Idx] > 0 THEN\n        RainyDays <- RainyDays + 1\n    ENDIF\n    IF Rainfall[Idx] > Highest THEN\n        Highest <- Rainfall[Idx]\n    ENDIF\nNEXT Idx\n\nOUTPUT Total\nOUTPUT RainyDays\nOUTPUT Highest",
  orderMatters: false,
  generateTests(){const e=t=>({setup:arraySetup("Rainfall",30,t),expected:[t.reduce((r,o)=>r+o,0),t.filter(r=>r>0).length,Math.max(...t)]});return[{description:"Mix of dry and rainy days",...e([0,5,12,0,3,0,8,20,0,4,0,0,15,7,0,2,0,9,0,18,0,6,0,0,11,0,3,0,14,0])},{description:"All dry — zero rainfall",...e(Array.from({length:30},()=>0))},{description:"All rainy days — 1 to 30mm",...e(Array.from({length:30},(t,r)=>r+1))}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:30},()=>Math.random()<.4?0:Math.floor(Math.random()*50)+1);return{description:`Rainfall (first 5): [${e.slice(0,5).join(", ")}, …]`,setup:arraySetup("Rainfall",30,e),expected:[e.reduce((t,r)=>t+r,0),e.filter(t=>t>0).length,Math.max(...e)]}})}
},
{
  id: "q8-athlete-tracker",
  label: "(Question 20)",
  title: "Athlete Performance Tracker",
  tags: ["Arrays","Totals","Counting","Minimum","Conditions","Loops"],
  marks: 15,
  difficulty: "Hard",
  question: "A sports club tracks race performance data. The following arrays store information about 10 athletes:\n• `RaceTime[1:10]` of type INTEGER stores each athlete's race time in seconds\n• `AthleteAge[1:10]` of type INTEGER stores each athlete's age in years\n\nWrite pseudocode for a program that:\n• calculates the total of all race times\n• counts how many athletes finished in under 60 seconds, storing the result in `FastCount`\n• counts how many athletes are under 18 years old, storing the result in `YoungCount`\n• finds the fastest (lowest) race time\n• outputs the total race time, `FastCount`, `YoungCount`, and the fastest time",
  starterCode: "// RaceTime[1:10] and AthleteAge[1:10] are already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE TotalTime : INTEGER\nDECLARE FastCount : INTEGER\nDECLARE YoungCount : INTEGER\nDECLARE Fastest : INTEGER\n\nTotalTime <- 0\nFastCount <- 0\nYoungCount <- 0\nFastest <- RaceTime[1]\n\nFOR Idx <- 1 TO 10\n    TotalTime <- TotalTime + RaceTime[Idx]\n    IF RaceTime[Idx] < 60 THEN\n        FastCount <- FastCount + 1\n    ENDIF\n    IF AthleteAge[Idx] < 18 THEN\n        YoungCount <- YoungCount + 1\n    ENDIF\n    IF RaceTime[Idx] < Fastest THEN\n        Fastest <- RaceTime[Idx]\n    ENDIF\nNEXT Idx\n\nOUTPUT TotalTime\nOUTPUT FastCount\nOUTPUT YoungCount\nOUTPUT Fastest",
  orderMatters: false,
  generateTests(){const e=(t,r)=>({setup:arraySetup("RaceTime",10,t)+arraySetup("AthleteAge",10,r),expected:[t.reduce((o,s)=>o+s,0),t.filter(o=>o<60).length,r.filter(o=>o<18).length,Math.min(...t)]});return[{description:"Mixed times and ages",...e([58,72,45,63,81,54,69,47,76,52],[17,22,15,25,19,16,23,18,21,14])},{description:"All athletes fast (under 60s), all adults (18+)",...e([55,48,52,59,43,57,51,46,54,38],[18,20,22,25,19,21,24,18,23,20])},{description:"No fast athletes, some juniors",...e([61,70,65,80,74,68,90,62,77,85],[15,25,16,30,17,22,28,14,19,24])}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:10},()=>Math.floor(Math.random()*60)+30),t=Array.from({length:10},()=>Math.floor(Math.random()*20)+12);return{description:`Times: [${e.join(", ")}], Ages: [${t.join(", ")}]`,setup:arraySetup("RaceTime",10,e)+arraySetup("AthleteAge",10,t),expected:[e.reduce((r,o)=>r+o,0),e.filter(r=>r<60).length,t.filter(r=>r<18).length,Math.min(...e)]}})}
},
{
  id: "q15-patient-tracker",
  label: "(Question 21)",
  title: "Patient Health Tracker",
  tags: ["Arrays","Totals","Counting","Maximum","Minimum","Conditions","Loops"],
  marks: 15,
  difficulty: "Hard",
  question: "A hospital tracks health data for patients. The following arrays store information about 12 patients:\n• `BloodPressure[1:12]` of type INTEGER stores each patient's systolic blood pressure reading\n• `PatientAge[1:12]` of type INTEGER stores each patient's age in years\n\nWrite pseudocode for a program that:\n• calculates the total of all blood pressure readings\n• calculates the average blood pressure\n• counts how many patients have high blood pressure (reading above 140), storing the result in `HighCount`\n• counts how many patients are aged 65 or over, storing the result in `ElderlyCount`\n• finds the highest blood pressure reading\n• outputs the total, average, `HighCount`, `ElderlyCount`, and the highest reading",
  starterCode: "// BloodPressure[1:12] and PatientAge[1:12] are already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE Total : INTEGER\nDECLARE Average : REAL\nDECLARE HighCount : INTEGER\nDECLARE ElderlyCount : INTEGER\nDECLARE Highest : INTEGER\n\nTotal <- 0\nAverage <- 0.0\nHighCount <- 0\nElderlyCount <- 0\nHighest <- BloodPressure[1]\n\nFOR Idx <- 1 TO 12\n    Total <- Total + BloodPressure[Idx]\n    IF BloodPressure[Idx] > 140 THEN\n        HighCount <- HighCount + 1\n    ENDIF\n    IF PatientAge[Idx] >= 65 THEN\n        ElderlyCount <- ElderlyCount + 1\n    ENDIF\n    IF BloodPressure[Idx] > Highest THEN\n        Highest <- BloodPressure[Idx]\n    ENDIF\nNEXT Idx\n\nAverage <- Total / 12\n\nOUTPUT Total\nOUTPUT Average\nOUTPUT HighCount\nOUTPUT ElderlyCount\nOUTPUT Highest",
  orderMatters: false,
  generateTests(){const e=(t,r)=>{const o=t.reduce((s,a)=>s+a,0);return{setup:arraySetup("BloodPressure",12,t)+arraySetup("PatientAge",12,r),expected:[o,o/12,t.filter(s=>s>140).length,r.filter(s=>s>=65).length,Math.max(...t)]}};return[{description:"Mixed readings and ages",...e([118,145,132,158,124,141,112,167,138,155,129,144],[34,72,45,68,28,71,55,66,43,70,38,64])},{description:"All normal blood pressure, all under 65",...e([110,115,120,118,112,122,108,116,119,114,117,121],[25,30,42,38,55,29,47,33,51,40,36,44])},{description:"All high blood pressure, all elderly",...e([142,155,148,162,170,145,158,143,175,150,163,147],[65,70,68,72,80,66,75,67,82,69,73,71])}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:11},()=>Math.floor(Math.random()*80)+100),r=e.reduce((a,i)=>a+i,0)%12;e.push(r===0?120:120+(12-r));const o=Array.from({length:12},()=>Math.floor(Math.random()*60)+20),s=e.reduce((a,i)=>a+i,0);return{description:`BP: [${e.slice(0,4).join(", ")}, …], Ages: [${o.slice(0,4).join(", ")}, …]`,setup:arraySetup("BloodPressure",12,e)+arraySetup("PatientAge",12,o),expected:[s,s/12,e.filter(a=>a>140).length,o.filter(a=>a>=65).length,Math.max(...e)]}})}
},
{
  id: "q22-shop-sales",
  label: "(Question 22)",
  title: "Shop Sales Tracker",
  tags: ["Arrays","Totals","Counting","Maximum","Arithmetic","Conditions","Loops"],
  marks: 15,
  difficulty: "Hard",
  question: "A shop tracks daily performance data. The following arrays store information for 10 days:\n• `DailySale[1:10]` of type INTEGER stores the number of items sold each day\n• `DayTemp[1:10]` of type INTEGER stores the outside temperature in degrees Celsius for each day\n\nWrite pseudocode for a program that:\n• calculates the total number of items sold\n• calculates the average number of items sold per day\n• counts how many days had sales greater than 100, storing the result in `GoodDays`\n• counts how many days had a temperature above 25, storing the result in `HotDays`\n• finds the highest single-day sales figure\n• outputs the total, the average, `GoodDays`, `HotDays`, and the highest sales figure",
  starterCode: "// DailySale[1:10] and DayTemp[1:10] are already declared and filled\n// Write your pseudocode below\n\n",
  solution: "DECLARE TotalSales : INTEGER\nDECLARE Average : REAL\nDECLARE GoodDays : INTEGER\nDECLARE HotDays : INTEGER\nDECLARE BestSale : INTEGER\n\nTotalSales <- 0\nAverage <- 0.0\nGoodDays <- 0\nHotDays <- 0\nBestSale <- DailySale[1]\n\nFOR Idx <- 1 TO 10\n    TotalSales <- TotalSales + DailySale[Idx]\n    IF DailySale[Idx] > 100 THEN\n        GoodDays <- GoodDays + 1\n    ENDIF\n    IF DayTemp[Idx] > 25 THEN\n        HotDays <- HotDays + 1\n    ENDIF\n    IF DailySale[Idx] > BestSale THEN\n        BestSale <- DailySale[Idx]\n    ENDIF\nNEXT Idx\n\nAverage <- TotalSales / 10\n\nOUTPUT TotalSales\nOUTPUT Average\nOUTPUT GoodDays\nOUTPUT HotDays\nOUTPUT BestSale",
  orderMatters: false,
  generateTests(){const e=(t,r)=>({setup:arraySetup("DailySale",10,t)+arraySetup("DayTemp",10,r),expected:[t.reduce((o,s)=>o+s,0),t.reduce((o,s)=>o+s,0)/10,t.filter(o=>o>100).length,r.filter(o=>o>25).length,Math.max(...t)]});return[{description:"Mixed sales — total 1000, avg 100",...e([80,120,90,150,70,110,60,140,100,80],[20,28,22,31,18,26,19,30,24,17])},{description:"Low sales — total 500, avg 50, no good/hot days",...e([10,20,30,40,50,60,70,80,90,50],[15,16,17,18,19,20,21,22,23,24])},{description:"All high sales and hot days — total 1300, avg 130",...e([110,120,130,140,150,160,110,120,130,130],[26,27,28,29,30,31,26,27,28,29])}]},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=Array.from({length:9},()=>Math.floor(Math.random()*180)+20),r=e.reduce((a,i)=>a+i,0)%10;e.push(r===0?100:100+(10-r));const o=Array.from({length:10},()=>Math.floor(Math.random()*25)+10),s=e.reduce((a,i)=>a+i,0);return{description:`Sales: [${e.slice(0,4).join(", ")}, …]`,setup:arraySetup("DailySale",10,e)+arraySetup("DayTemp",10,o),expected:[s,s/10,e.filter(a=>a>100).length,o.filter(a=>a>25).length,Math.max(...e)]}})}
}
];

/* ---------- function-implementation problems ---------- */

export const CODE = [
{
  id: "linear-search",
  title: "Linear Search",
  difficulty: "Easy",
  tags: ["Arrays","Searching"],
  description: "Implement the Linear Search algorithm inside the given function.\n\nThe function receives an array `Nums` of `ArraySize` integers and a target integer `Target`. It must return the 1-based index of the first occurrence of `Target` in the array, or `-1` if `Target` is not found.\n\nExample:\n  Array:  [3, 7, 2, 9, 4],  Target: 2\n  Output: 3\n\n  Array:  [3, 7, 2, 9, 4],  Target: 5\n  Output: -1\n\nNote: You do not need to declare or define `ArraySize` — the tests define it as a constant before your code, using the length of the input array.\n\nFunction signature:\n  FUNCTION LinearSearch(Nums : ARRAY[1 : ArraySize] OF INTEGER, Target : INTEGER)\n    RETURNS INTEGER",
  starterCode: "FUNCTION LinearSearch(Nums : ARRAY[1 : ArraySize] OF INTEGER, Target : INTEGER) RETURNS INTEGER\n    // Write your linear search implementation here\n\nENDFUNCTION",
  generateTests(){const e=[3,7,2,9,4],t=randArray(7),r=randArray(6),o=t[randInt(0,t.length-1)];return[{arr:e,target:2,idx:e.indexOf(2)+1},{arr:e,target:5,idx:-1},{arr:e,target:3,idx:1},{arr:t,target:o,idx:t.indexOf(o)+1},{arr:r,target:200,idx:-1}].map(({arr:a,target:i,idx:p})=>({input:[...a,i],expected:[p]}))},
  generateSubmitTests(){const e=[];for(let t=0;t<100;t++){const r=randInt(3,12),o=randArray(r);if(t%2===0){const s=o[randInt(0,r-1)];e.push({input:[...o,s],expected:[o.indexOf(s)+1]})}else e.push({input:[...o,200],expected:[-1]})}return e},
  formatInput(e){const t=e.input[e.input.length-1];return`Nums: [${e.input.slice(0,-1).join(", ")}]
  Target: ${t}`},
  buildPrelude(e){return`CONSTANT ArraySize = ${e.input.length-1}`},
  buildHarness(e){const t=e.input[e.input.length-1];return["DECLARE Arr : ARRAY[1 : ArraySize] OF INTEGER",...e.input.slice(0,-1).map((o,s)=>`Arr[${s+1}] <- ${o}`),"DECLARE Target : INTEGER",`Target <- ${t}`,"DECLARE Result : INTEGER","Result <- LinearSearch(Arr, Target)","OUTPUT Result"].join(`
  `)}
},
{
  id: "sum-array",
  title: "Sum Array",
  difficulty: "Easy",
  tags: ["Arrays","Totalling"],
  description: "Implement a function that returns the sum of all elements in an array.\n\nExample:\n  Input:  [1, 2, 3, 4, 5]\n  Output: 15\n\n  Input:  [10, 20, 30]\n  Output: 60\n\nNote: You do not need to declare or define `ArraySize` — the tests define it as a constant before your code, using the length of the input array.\n\nFunction signature:\n  FUNCTION SumArray(Nums : ARRAY[1 : ArraySize] OF INTEGER) RETURNS INTEGER",
  starterCode: "FUNCTION SumArray(Nums : ARRAY[1 : ArraySize] OF INTEGER) RETURNS INTEGER\n    // Write your implementation here\n\nENDFUNCTION",
  generateTests(){return[{input:[1,2,3,4,5],expected:[15]},{input:[10,20,30],expected:[60]},{input:[7],expected:[7]},{input:randArray(6),expected:[0]},{input:randArray(8),expected:[0]}].map(e=>e.expected[0]===0?{input:e.input,expected:[e.input.reduce((t,r)=>t+r,0)]}:e)},
  generateSubmitTests(){return Array.from({length:100},()=>{const e=randArray(randInt(1,12));return{input:e,expected:[e.reduce((t,r)=>t+r,0)]}})},
  buildPrelude(e){return`CONSTANT ArraySize = ${e.input.length}`},
  buildHarness(e){return["DECLARE Arr : ARRAY[1 : ArraySize] OF INTEGER",...e.input.map((r,o)=>`Arr[${o+1}] <- ${r}`),"DECLARE Result : INTEGER","Result <- SumArray(Arr)","OUTPUT Result"].join(`
  `)}
},
{
  id: "bubble-sort",
  title: "Bubble Sort",
  difficulty: "Easy",
  tags: ["Arrays","Sorting"],
  description: "Implement the Bubble Sort algorithm inside the given function.\n\nThe function receives an array `Nums` of `ArraySize` integers and must return the same elements sorted in ascending order.\n\nExample:\n  Input:  [5, 3, 1, 4, 2]\n  Output: [1, 2, 3, 4, 5]\n\nNote: You do not need to declare or define `ArraySize` — the tests define it as a constant before your code, using the length of the input array.\n\nFunction signature:\n  FUNCTION BubbleSort(Nums : ARRAY[1 : ArraySize] OF INTEGER)\n    RETURNS ARRAY[1 : ArraySize] OF INTEGER",
  starterCode: "FUNCTION BubbleSort(Nums : ARRAY[1 : ArraySize] OF INTEGER) RETURNS ARRAY[1 : ArraySize] OF INTEGER\n    // Write your bubble sort implementation here\n\nENDFUNCTION",
  generateTests(){return[[5,4,3,2,1],[1,2,3,4,5],randArray(6),randArray(8),[42]].map(e=>({input:e,expected:[...e].sort((t,r)=>t-r)}))},
  generateSubmitTests(){const e=[1,2,3,5,6,8,10,12],t=[];for(let r=0;r<100;r++){const o=randArray(e[r%e.length]);t.push({input:o,expected:[...o].sort((s,a)=>s-a)})}return t},
  buildPrelude(e){return`CONSTANT ArraySize = ${e.input.length}`},
  buildHarness(e){return["DECLARE Arr : ARRAY[1 : ArraySize] OF INTEGER",...e.input.map((t,r)=>`Arr[${r+1}] <- ${t}`),"DECLARE Sorted : ARRAY[1 : ArraySize] OF INTEGER","Sorted <- BubbleSort(Arr)","FOR i <- 1 TO ArraySize","    OUTPUT Sorted[i]","NEXT i"].join(`
  `)}
},
{
  id: "username-generator",
  title: "Username Generator",
  difficulty: "Easy",
  tags: ["Strings"],
  description: "Implement a function that generates a username from a first name and last name.\n\nThe username is formed by taking the first `3` characters of the first name and the first `3` characters of the last name, both converted to lowercase, then concatenated together.\n\nYou may assume both names are at least `3` characters long.\n\nExample:\n  FirstName: \"John\",  LastName: \"Smith\"  →  \"johsmi\"\n  FirstName: \"Adam\", LastName: \"Hegazi\"  →  \"adaheg\"\n  FirstName: \"FAISAL\", LastName: \"FAKIH\" →  \"faifak\"\n\nFunction signature:\n  FUNCTION GenerateUsername(FirstName : STRING, LastName : STRING) RETURNS STRING",
  starterCode: "FUNCTION GenerateUsername(FirstName : STRING, LastName : STRING) RETURNS STRING\n    // Write your implementation here\n\nENDFUNCTION",
  generateTests(){return[["John","Smith"],["Alice","Jones"],["FAISAL","FAKIH"],["Cambridge","University"],["Peter","Parker"]].map(([t,r])=>({input:[t,r],expected:[(t.slice(0,3)+r.slice(0,3)).toLowerCase()]}))},
  generateSubmitTests(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";function t(r){return e[randInt(0,25)].toUpperCase()+Array.from({length:r-1},()=>e[randInt(26,51)]).join("")}return Array.from({length:100},()=>{const r=t(randInt(3,8)),o=t(randInt(3,8));return{input:[r,o],expected:[(r.slice(0,3)+o.slice(0,3)).toLowerCase()]}})},
  formatInput(e){return`FirstName: "${e.input[0]}"
  LastName:  "${e.input[1]}"`},
  buildHarness(e){return["DECLARE FirstName : STRING",`FirstName <- "${e.input[0]}"`,"DECLARE LastName : STRING",`LastName <- "${e.input[1]}"`,"DECLARE Result : STRING","Result <- GenerateUsername(FirstName, LastName)","OUTPUT Result"].join(`
  `)}
},
{
  id: "two-sum",
  title: "Two Sum",
  difficulty: "Medium",
  tags: ["Arrays"],
  description: "Given an array of integers `Nums` and a target integer `Target`, return the 1-based indices of the two numbers that add up to `Target`.\n\nYou may assume that each input has exactly one solution, and you may not use the same element twice. Return the indices in ascending order.\n\nExample:\n  Array:  [2, 7, 11, 15],  Target: 9\n  Output: [1, 2]   (because Nums[1] + Nums[2] = 2 + 7 = 9)\n\n  Array:  [3, 2, 4],  Target: 6\n  Output: [2, 3]   (because Nums[2] + Nums[3] = 2 + 4 = 6)\n\nNote: You do not need to declare or define `ArraySize` — the tests define it as a constant before your code, using the length of the input array.\n\nFunction signature:\n  FUNCTION TwoSum(Nums : ARRAY[1 : ArraySize] OF INTEGER, Target : INTEGER)\n    RETURNS ARRAY[1 : 2] OF INTEGER",
  starterCode: "FUNCTION TwoSum(Nums : ARRAY[1 : ArraySize] OF INTEGER, Target : INTEGER) RETURNS ARRAY[1 : 2] OF INTEGER\n    // Write your two sum implementation here\n\nENDFUNCTION",
  generateTests(){return[{arr:[2,7,11,15],target:9,i:1,j:2},{arr:[3,2,4],target:6,i:2,j:3},{arr:[1,5,3,8],target:9,i:1,j:4},twoSumCase(6),twoSumCase(8)].map(({arr:t,target:r,i:o,j:s})=>({input:[...t,r],expected:[Math.min(o,s),Math.max(o,s)]}))},
  generateSubmitTests(){return Array.from({length:100},()=>twoSumCase(randInt(3,10))).map(({arr:e,target:t,i:r,j:o})=>({input:[...e,t],expected:[Math.min(r,o),Math.max(r,o)]}))},
  formatInput(e){const t=e.input[e.input.length-1];return`Nums: [${e.input.slice(0,-1).join(", ")}]
  Target: ${t}`},
  buildPrelude(e){return`CONSTANT ArraySize = ${e.input.length-1}`},
  buildHarness(e){const t=e.input[e.input.length-1];return["DECLARE Arr : ARRAY[1 : ArraySize] OF INTEGER",...e.input.slice(0,-1).map((o,s)=>`Arr[${s+1}] <- ${o}`),"DECLARE Target : INTEGER",`Target <- ${t}`,"DECLARE Result : ARRAY[1 : 2] OF INTEGER","Result <- TwoSum(Arr, Target)","OUTPUT Result[1]","OUTPUT Result[2]"].join(`
  `)}
},
{
  id: "password-validator",
  title: "Password Validator",
  difficulty: "Medium",
  tags: ["Strings","Counting"],
  description: "Implement a function that validates a password.\n\nA password is valid if:\n  1. Its length is at least `8` characters\n  2. It contains at least one uppercase letter\n\nReturn `TRUE` if the password is valid, `FALSE` otherwise.\n\nNote: passwords in all test cases contain only letters (`a-z`, `A-Z`) and digits (`0-9`). No special symbols such as `@` or `!` will appear.\n\nExample:\n  \"MyPass12\" →  TRUE   (length 8, has uppercase)\n  \"weakpass\" →  FALSE  (no uppercase)\n  \"SHORT\"    →  FALSE  (too short)\n  \"alllower\" →  FALSE  (no uppercase)\n\nFunction signature:\n  FUNCTION ValidatePassword(Password : STRING) RETURNS BOOLEAN",
  starterCode: "FUNCTION ValidatePassword(Password : STRING) RETURNS BOOLEAN\n    // Write your implementation here\n\nENDFUNCTION",
  generateTests(){return[{input:["MyPass12"],expected:[1]},{input:["weakpass"],expected:[0]},{input:["SHORT"],expected:[0]},{input:["lower12345"],expected:[0]},{input:["ValidPass"],expected:[1]},{input:["a0123456789"],expected:[0]}]},
  generateSubmitTests(){const e="abcdefghijklmnopqrstuvwxyz",t="ABCDEFGHIJKLMNOPQRSTUVWXYZ",r="0123456789",o=e+t+r;function s(p){return p[randInt(0,p.length-1)]}const i=[{input:["abcde0123456789"],expected:[0]},{input:["xyz0123456789"],expected:[0]},{input:["pass0123456789"],expected:[0]},{input:["test0123456789abc"],expected:[0]},{input:["lower"+r[randInt(0,9)]+r[randInt(0,9)]+r[randInt(0,9)]+r[randInt(0,9)]],expected:[0]}];for(let p=0;p<95;p++){const u=randInt(4,14),h=Array.from({length:u},()=>s(o)).join(""),T=h.split("").some(w=>t.includes(w))&&u>=8;i.push({input:[h],expected:[T?1:0]})}return i},
  formatInput(e){return`Password: "${e.input[0]}"`},
  buildHarness(e){return["DECLARE Password : STRING",`Password <- "${e.input[0]}"`,"DECLARE Result : BOOLEAN","Result <- ValidatePassword(Password)","IF Result THEN","    OUTPUT 1","ELSE","    OUTPUT 0","ENDIF"].join(`
  `)}
},
{
  id: "is-palindrome",
  title: "Is Palindrome",
  difficulty: "Medium",
  tags: ["Strings"],
  description: "Implement a function that checks whether a given string is a palindrome.\n\nA palindrome reads the same forwards and backwards (case-sensitive). Return `TRUE` if the string is a palindrome, or `FALSE` if it is not.\n\nExample:\n  Input:  \"racecar\"\n  Output: TRUE\n\n  Input:  \"hello\"\n  Output: FALSE\n\n  Input:  \"madam\"\n  Output: TRUE\n\nFunction signature:\n  FUNCTION IsPalindrome(Str : STRING) RETURNS BOOLEAN",
  starterCode: "FUNCTION IsPalindrome(Str : STRING) RETURNS BOOLEAN\n    // Write your palindrome check here\n\nENDFUNCTION",
  generateTests(){return[{input:["racecar"],expected:[1]},{input:["hello"],expected:[0]},{input:["madam"],expected:[1]},{input:["abba"],expected:[1]},{input:["cambridge"],expected:[0]},{input:["a"],expected:[1]}]},
  generateSubmitTests(){const e=[];for(let t=0;t<100;t++){const r=randInt(2,10);t%2===0?e.push({input:[palindrome(r)],expected:[1]}):e.push({input:[nonPalindrome(r)],expected:[0]})}return e},
  formatInput(e){return`Str: "${e.input[0]}"`},
  buildHarness(e){return["DECLARE Str : STRING",`Str <- "${e.input[0]}"`,"DECLARE Result : BOOLEAN","Result <- IsPalindrome(Str)","IF Result THEN","    OUTPUT 1","ELSE","    OUTPUT 0","ENDIF"].join(`
  `)}
},
{
  id: "fibonacci",
  title: "Fibonacci",
  difficulty: "Medium",
  tags: ["Maths"],
  description: "Implement a function that returns the Nth Fibonacci number.\n\nThe Fibonacci sequence is defined as:\n  `F(1)` = 1\n  `F(2)` = 1\n  `F(N)` = `F(N-1)` + `F(N-2)`  for `N > 2`\n\nExample:\n  Input:  N = 1  →  Output: 1\n  Input:  N = 5  →  Output: 5\n  Input:  N = 8  →  Output: 21\n\nYou may assume `N` is a positive integer (`N ≥ 1`).\n\nFunction signature:\n  FUNCTION Fibonacci(N : INTEGER) RETURNS INTEGER",
  starterCode: "FUNCTION Fibonacci(N : INTEGER) RETURNS INTEGER\n    // Write your Fibonacci implementation here\n\nENDFUNCTION",
  generateTests(){return[{input:[1],expected:[1]},{input:[2],expected:[1]},{input:[3],expected:[2]},{input:[5],expected:[5]},{input:[8],expected:[21]},{input:[10],expected:[55]}]},
  generateSubmitTests(){const e=[0,1,1];for(let r=3;r<=20;r++)e.push(e[r-1]+e[r-2]);return Array.from({length:100},()=>randInt(1,20)).map(r=>({input:[r],expected:[e[r]]}))},
  buildHarness(e){return["DECLARE N : INTEGER",`N <- ${e.input[0]}`,"DECLARE Result : INTEGER","Result <- Fibonacci(N)","OUTPUT Result"].join(`
  `)}
},
{
  id: "find-median",
  title: "Find Median",
  difficulty: "Medium",
  tags: ["Arrays","Sorting"],
  description: "Given an unsorted array of integers, find and return the median value.\n\nWhen the array has an odd number of elements, the median is the middle value of the sorted array.\nWhen the array has an even number of elements, the median is the average of the two middle values (using integer division, `DIV`).\n\nExample (odd):\n  Input:  [3, 1, 4, 1, 5]  →  Output: 3\n  (Sorted: [1, 1, 3, 4, 5], middle element is 3)\n\nExample (even):\n  Input:  [4, 1, 7, 2]  →  Output: 3\n  (Sorted: [1, 2, 4, 7], middle elements are 2 and 4, average is (2 + 4) DIV 2 = 3)\n\nNote: You do not need to declare or define `ArraySize` — the tests define it as a constant before your code, using the length of the input array.\n\nFunction signature:\n  FUNCTION FindMedian(Nums : ARRAY[1 : ArraySize] OF INTEGER) RETURNS INTEGER",
  starterCode: "FUNCTION FindMedian(Nums : ARRAY[1 : ArraySize] OF INTEGER) RETURNS INTEGER\n    // Write your implementation here\n\nENDFUNCTION",
  generateTests(){function e(t){const r=[...t].sort((s,a)=>s-a),o=Math.floor(r.length/2);return r.length%2===1?r[o]:Math.floor((r[o-1]+r[o])/2)}return[[3,1,4,1,5],[7,2,9],[4,1,7,2],[5,3,1,7,9,2,4],[10,10,10,10],[1,2,3,4,5,6]].map(t=>({input:t,expected:[e(t)]}))},
  generateSubmitTests(){const e=[3,4,5,6,7,8,9,10,11,12];return Array.from({length:100},(t,r)=>{const o=e[r%e.length],s=randArray(o),a=[...s].sort((u,h)=>u-h),i=Math.floor(o/2),p=o%2===1?a[i]:Math.floor((a[i-1]+a[i])/2);return{input:s,expected:[p]}})},
  buildPrelude(e){return`CONSTANT ArraySize = ${e.input.length}`},
  buildHarness(e){return["DECLARE Arr : ARRAY[1 : ArraySize] OF INTEGER",...e.input.map((r,o)=>`Arr[${o+1}] <- ${r}`),"DECLARE Result : INTEGER","Result <- FindMedian(Arr)","OUTPUT Result"].join(`
  `)}
},
{
  id: "rotate-array",
  title: "Rotate Array",
  difficulty: "Medium",
  tags: ["Arrays","Maths"],
  description: "Given an integer array, rotate it to the right by k steps.\n\nThe function receives an array `Nums` of `ArraySize` integers and an integer `k`. It must return a new array with all elements shifted `k` positions to the right — elements that fall off the end wrap around to the beginning.\n\nYou may assume `k` is non-negative.\n\nExample 1:\n  Input:  Nums = [1, 2, 3, 4, 5, 6, 7],  k = 3\n  Output: [5, 6, 7, 1, 2, 3, 4]\n\nExample 2:\n  Input:  Nums = [-1, -100, 3, 99],  k = 2\n  Output: [3, 99, -1, -100]\n\nNote: You do not need to declare or define `ArraySize` — the tests define it as a constant before your code, using the length of the input array.\n\nFunction signature:\n  FUNCTION RotateArray(Nums : ARRAY[1 : ArraySize] OF INTEGER, k : INTEGER)\n    RETURNS ARRAY[1 : ArraySize] OF INTEGER",
  starterCode: "FUNCTION RotateArray(Nums : ARRAY[1 : ArraySize] OF INTEGER, k : INTEGER) RETURNS ARRAY[1 : ArraySize] OF INTEGER\n    // Write your implementation here\n\nENDFUNCTION",
  generateTests(){function e(t,r){const o=t.length,s=(r%o+o)%o;return[...t.slice(o-s),...t.slice(0,o-s)]}return[{input:[1,2,3,4,5,6,7,3],expected:e([1,2,3,4,5,6,7],3)},{input:[-1,-100,3,99,2],expected:e([-1,-100,3,99],2)},{input:[1,2,3,0],expected:e([1,2,3],0)},{input:[1,2,3,3],expected:e([1,2,3],3)},{input:[1,2,3,4,5,11],expected:e([1,2,3,4,5],11)}]},
  generateSubmitTests(){function e(r,o){const s=r.length,a=(o%s+s)%s;return[...r.slice(s-a),...r.slice(0,s-a)]}const t=Array.from({length:90},()=>{const r=randInt(2,10),o=Array.from({length:r},()=>randInt(-50,50)),s=randInt(0,r*2);return{input:[...o,s],expected:e(o,s)}});for(let r=0;r<10;r++){const o=randInt(2,8),s=Array.from({length:o},()=>randInt(-50,50)),a=randInt(o+1,o*3);t.push({input:[...s,a],expected:e(s,a)})}return t},
  buildPrelude(e){return`CONSTANT ArraySize = ${e.input.length-1}`},
  buildHarness(e){const t=e.input.slice(0,-1),r=e.input[e.input.length-1];return["DECLARE Arr : ARRAY[1 : ArraySize] OF INTEGER",...t.map((o,s)=>`Arr[${s+1}] <- ${o}`),"DECLARE Rotated : ARRAY[1 : ArraySize] OF INTEGER",`Rotated <- RotateArray(Arr, ${r})`,"FOR i <- 1 TO ArraySize","    OUTPUT Rotated[i]","NEXT i"].join(`
  `)},
  formatInput(e){const t=e.input.slice(0,-1),r=e.input[e.input.length-1];return`Nums = [${t.join(", ")}],  k = ${r}`}
},
{
  id: "find-duplicate",
  title: "Find the Duplicate Number",
  difficulty: "Medium",
  tags: ["Arrays","Counting"],
  description: "Given an array `Nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive, find and return the duplicate number.\n\nThere is always exactly one duplicate number — find and return it.\n\nExample:\n  Input:  [1, 3, 4, 2, 2]   (n = 4, values in [1, 4])\n  Output: 2\n\n  Input:  [3, 1, 3, 4, 2]   (n = 4, values in [1, 4])\n  Output: 3\n\nNote: You do not need to declare or define `ArraySize` — the tests define it as a constant before your code, using the length of the input array.\n\nExtension: Can you solve this without using nested loops?\n\nFunction signature:\n  FUNCTION FindDuplicate(Nums : ARRAY[1 : ArraySize] OF INTEGER) RETURNS INTEGER",
  starterCode: "FUNCTION FindDuplicate(Nums : ARRAY[1 : ArraySize] OF INTEGER) RETURNS INTEGER\n    // Write your implementation here\n\nENDFUNCTION",
  generateTests(){return[{input:[1,3,4,2,2],expected:[2]},{input:[3,1,3,4,2],expected:[3]},{input:[1,1],expected:[1]},{input:[1,2,3,4,5,4],expected:[4]},{input:[2,1,2,3,4,5,6],expected:[2]}]},
  generateSubmitTests(){function e(r){const o=Array.from({length:r-1},(i,p)=>p+1),s=o[randInt(0,o.length-1)];return{arr:[...o,s].sort(()=>Math.random()-.5),dup:s}}const t=[{input:[1,3,4,2,2],expected:[2]},{input:[3,1,3,4,2],expected:[3]},{input:[1,1],expected:[1]}];for(let r=0;r<97;r++){const o=randInt(2,12),{arr:s,dup:a}=e(o);t.push({input:s,expected:[a]})}return t},
  buildPrelude(e){return`CONSTANT ArraySize = ${e.input.length}`},
  buildHarness(e){return["DECLARE Arr : ARRAY[1 : ArraySize] OF INTEGER",...e.input.map((t,r)=>`Arr[${r+1}] <- ${t}`),"DECLARE Result : INTEGER","Result <- FindDuplicate(Arr)","OUTPUT Result"].join(`
  `)}
},
{
  id: "string-to-int",
  title: "String to Integer",
  difficulty: "Medium",
  tags: ["Strings","Maths"],
  description: "Implement a function that converts a string representation of an integer into its numeric value.\n\nThe string will contain only digit characters (`0`–`9`), with an optional leading `-` sign for negative numbers. You may assume the input is always a valid integer.\n\nExample 1:\n  Input:  \"123\"\n  Output: 123\n\nExample 2:\n  Input:  \"-42\"\n  Output: -42\n\nExample 3:\n  Input:  \"0\"\n  Output: 0\n\nFunction signature:\n  FUNCTION StringToInt(Str : STRING) RETURNS INTEGER",
  starterCode: "FUNCTION StringToInt(Str : STRING) RETURNS INTEGER\n    // Write your implementation here\n\nENDFUNCTION",
  generateTests(){return[{input:["1234567890"],expected:[1234567890]},{input:["123"],expected:[123]},{input:["-42"],expected:[-42]},{input:["0"],expected:[0]},{input:["1000"],expected:[1e3]},{input:["-7"],expected:[-7]}]},
  generateSubmitTests(){const e=[{input:["1234567890"],expected:[1234567890]},{input:["123"],expected:[123]},{input:["-42"],expected:[-42]},{input:["0"],expected:[0]},{input:["-1000"],expected:[-1e3]}];for(let t=0;t<10;t++){const r=randInt(10,9999);e.push({input:[String(-r)],expected:[-r]})}for(;e.length<100;){const t=randInt(-9999,9999);e.push({input:[String(t)],expected:[t]})}return e},
  formatInput(e){return`Str: "${e.input[0]}"`},
  buildHarness(e){return["DECLARE Str : STRING",`Str <- "${e.input[0]}"`,"DECLARE Result : INTEGER","Result <- StringToInt(Str)","OUTPUT Result"].join(`
  `)}
},
{
  id: "number-of-islands",
  title: "Number of Islands",
  difficulty: "Hard",
  tags: ["2D Arrays","Searching"],
  description: "Given an `m × n` 2D grid `Grid` of `1`s (land) and `0`s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent land cells horizontally or vertically. You may assume all four edges of the grid are surrounded by water.\n\nNote: You do not need to declare or define `Rows` or `Cols` — the tests define them as constants before your code, using the dimensions of the input grid.\n\nExample 1:\n  Input:\n    1 1 1 1 0\n    1 1 0 1 0\n    1 1 0 0 0\n    0 0 0 0 0\n  Output: 1\n\nExample 2:\n  Input:\n    1 1 0 0 0\n    1 1 0 0 0\n    0 0 1 0 0\n    0 0 0 1 1\n  Output: 3\n\nFunction signature:\n  FUNCTION NumIslands(Grid : ARRAY[1:Rows, 1:Cols] OF INTEGER) RETURNS INTEGER",
  starterCode: "FUNCTION NumIslands(Grid : ARRAY[1:Rows, 1:Cols] OF INTEGER) RETURNS INTEGER\n    // Write your solution here\n\nENDFUNCTION",
  generateTests(){const r=[1,1,1,1,0,1,1,0,1,0,1,1,0,0,0,0,0,0,0,0],o=4,s=5,a=[1,1,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1],i=3,p=3,u=Array(9).fill(0),h=1,f=1,T=[1],w=3,S=3,O=[1,0,1,0,1,0,1,0,1],I=1,E=5,k=[1,1,1,1,1];return[{input:[4,5,...r],expected:[1]},{input:[o,s,...a],expected:[3]},{input:[i,p,...u],expected:[0]},{input:[h,f,...T],expected:[1]},{input:[w,S,...O],expected:[5]},{input:[I,E,...k],expected:[1]}]},
  generateSubmitTests(){function e(r,o,s){const a=r.map(u=>[...u]);function i(u,h){u<0||u>=o||h<0||h>=s||a[u][h]===0||(a[u][h]=0,i(u-1,h),i(u+1,h),i(u,h-1),i(u,h+1))}let p=0;for(let u=0;u<o;u++)for(let h=0;h<s;h++)a[u][h]===1&&(p++,i(u,h));return p}const t=[];for(t.push({input:[4,5,1,1,1,1,0,1,1,0,1,0,1,1,0,0,0,0,0,0,0,0],expected:[1]}),t.push({input:[4,5,1,1,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1],expected:[3]}),t.push({input:[1,1,0],expected:[0]}),t.push({input:[1,1,1],expected:[1]});t.length<100;){const r=randInt(3,8),o=randInt(3,8),s=Array.from({length:r*o},()=>Math.random()<.45?1:0),a=Array.from({length:r},(p,u)=>s.slice(u*o,u*o+o)),i=e(a,r,o);t.push({input:[r,o,...s],expected:[i]})}return t},
  formatInput(e){const t=e.input[0],r=e.input[1],o=e.input.slice(2),s=[`Grid (${t}×${r}):`];for(let a=0;a<t;a++)s.push(o.slice(a*r,a*r+r).join(" "));return s.join(`
  `)},
  buildPrelude(e){return`CONSTANT Rows = ${e.input[0]}
  CONSTANT Cols = ${e.input[1]}`},
  buildHarness(e){const t=e.input[0],r=e.input[1],o=e.input.slice(2),s=[];for(let a=0;a<t;a++)for(let i=0;i<r;i++)s.push(`Grid[${a+1}, ${i+1}] <- ${o[a*r+i]}`);return["DECLARE Grid : ARRAY[1:Rows, 1:Cols] OF INTEGER",...s,"DECLARE Result : INTEGER","Result <- NumIslands(Grid)","OUTPUT Result"].join(`
  `)}
},
{
  id: "valid-sudoku",
  title: "Valid Sudoku",
  difficulty: "Hard",
  tags: ["2D Arrays","Counting"],
  description: "Determine if a 9×9 Sudoku board is valid.\n\nOnly the filled cells need to be validated according to the following rules:\n  1. Each row must contain the digits 1-9 without repetition.\n  2. Each column must contain the digits 1-9 without repetition.\n  3. Each of the nine 3×3 sub-boxes must contain the digits 1-9 without repetition.\n\nNote:\n  - A partially filled board could be valid but not necessarily solvable.\n  - Empty cells are represented by `0` and do not need to be validated.\n\nReturn `TRUE` if the board is valid, `FALSE` otherwise.\n\nThe board is passed as a 2D array: `ARRAY[1:9, 1:9] OF INTEGER`.\n\nFunction signature:\n  FUNCTION IsValidSudoku(Board : ARRAY[1:9, 1:9] OF INTEGER) RETURNS BOOLEAN",
  starterCode: "FUNCTION IsValidSudoku(Board : ARRAY[1:9, 1:9] OF INTEGER) RETURNS BOOLEAN\n    // Write your implementation here\n    // Check each row, each column, and each 3x3 box for duplicates\n    // Ignore cells containing 0 (empty)\n\nENDFUNCTION",
  generateTests(){const e=[5,3,0,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9],t=[5,3,4,6,7,8,9,1,2,6,7,2,1,9,5,3,4,8,1,9,8,3,4,2,5,6,7,8,5,9,7,6,1,4,2,3,4,2,6,8,5,3,7,9,1,7,1,3,9,2,4,8,5,6,9,6,1,5,3,7,2,8,4,2,8,7,4,1,9,6,3,5,3,4,5,2,8,6,1,7,9],r=[5,3,0,0,7,0,5,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9],o=[5,3,0,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,5,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9],s=[5,3,9,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9],a=Array(81).fill(0);return[{input:e,expected:[1]},{input:t,expected:[1]},{input:r,expected:[0]},{input:o,expected:[0]},{input:s,expected:[0]},{input:a,expected:[1]}]},
  generateSubmitTests(){const e=[[5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],[8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],[9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9]];function t(){const o=e.map(a=>[...a]),s=Array.from({length:81},(a,i)=>i);for(let a=s.length-1;a>0;a--){const i=randInt(0,a);[s[a],s[i]]=[s[i],s[a]]}for(let a=0;a<randInt(25,50);a++)o[Math.floor(s[a]/9)][s[a]%9]=0;return o}function r(o){for(let s=0;s<40;s++){const a=randInt(0,8),i=[],p=[];for(let u=0;u<9;u++)(o[a][u]!==0?i:p).push(u);if(i.length&&p.length)return o[a][p[randInt(0,p.length-1)]]=o[a][i[randInt(0,i.length-1)]],!0}return!1}return Array.from({length:100},(o,s)=>{const a=t();return s%2===0?{input:a.flat(),expected:[1]}:(r(a),{input:a.flat(),expected:[0]})})},
  formatInput(e){const t=e.input,r=[];for(let o=0;o<9;o++){const s=t.slice(o*9,o*9+9).map(a=>a===0?".":String(a));r.push(`${s.slice(0,3).join(" ")} | ${s.slice(3,6).join(" ")} | ${s.slice(6,9).join(" ")}`),(o===2||o===5)&&r.push("------+-------+------")}return r.join(`
  `)},
  buildHarness(e){const t=e.input,r=[];for(let o=0;o<9;o++)for(let s=0;s<9;s++)r.push(`Board[${o+1}, ${s+1}] <- ${t[o*9+s]}`);return["DECLARE Board : ARRAY[1:9, 1:9] OF INTEGER",...r,"DECLARE Result : BOOLEAN","Result <- IsValidSudoku(Board)","IF Result THEN","    OUTPUT 1","ELSE","    OUTPUT 0","ENDIF"].join(`
  `)}
}
];

/* ---------- reference solutions for the coding problems ----------

   The reference site ships these problems without model answers. These were
   written for this repository and each one is checked against its own 100-case
   submit set before release.

   Two of them look longer than they should: LCASE/UCASE and ASC take a CHAR in
   this dialect (guide 5.5) and SUBSTRING yields a STRING, so changing the case
   of text means looking each letter up in an alphabet string instead. */

const CODE_SOLUTIONS = {
'linear-search': `FUNCTION LinearSearch(Nums : ARRAY[1 : ArraySize] OF INTEGER, Target : INTEGER) RETURNS INTEGER
    DECLARE i : INTEGER
    FOR i <- 1 TO ArraySize
        IF Nums[i] = Target THEN
            RETURN i
        ENDIF
    NEXT i
    RETURN -1
ENDFUNCTION`,

'sum-array': `FUNCTION SumArray(Nums : ARRAY[1 : ArraySize] OF INTEGER) RETURNS INTEGER
    DECLARE i : INTEGER
    DECLARE Total : INTEGER
    Total <- 0
    FOR i <- 1 TO ArraySize
        Total <- Total + Nums[i]
    NEXT i
    RETURN Total
ENDFUNCTION`,

'bubble-sort': `FUNCTION BubbleSort(Nums : ARRAY[1 : ArraySize] OF INTEGER) RETURNS ARRAY[1 : ArraySize] OF INTEGER
    DECLARE i : INTEGER
    DECLARE j : INTEGER
    DECLARE Temp : INTEGER
    FOR i <- 1 TO ArraySize - 1
        FOR j <- 1 TO ArraySize - i
            IF Nums[j] > Nums[j + 1] THEN
                Temp <- Nums[j]
                Nums[j] <- Nums[j + 1]
                Nums[j + 1] <- Temp
            ENDIF
        NEXT j
    NEXT i
    RETURN Nums
ENDFUNCTION`,

'username-generator': `FUNCTION GenerateUsername(FirstName : STRING, LastName : STRING) RETURNS STRING
    DECLARE Upper : STRING
    DECLARE Lower : STRING
    DECLARE Out : STRING
    DECLARE Part : STRING
    DECLARE Ch : STRING
    DECLARE n : INTEGER
    DECLARE i : INTEGER
    DECLARE k : INTEGER
    Upper <- "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    Lower <- "abcdefghijklmnopqrstuvwxyz"
    Out <- ""
    FOR n <- 1 TO 2
        IF n = 1 THEN
            Part <- FirstName
        ELSE
            Part <- LastName
        ENDIF
        FOR i <- 1 TO 3
            Ch <- SUBSTRING(Part, i, 1)
            FOR k <- 1 TO 26
                IF Ch = SUBSTRING(Upper, k, 1) OR Ch = SUBSTRING(Lower, k, 1) THEN
                    Out <- Out & SUBSTRING(Lower, k, 1)
                ENDIF
            NEXT k
        NEXT i
    NEXT n
    RETURN Out
ENDFUNCTION`,

'two-sum': `FUNCTION TwoSum(Nums : ARRAY[1 : ArraySize] OF INTEGER, Target : INTEGER) RETURNS ARRAY[1 : 2] OF INTEGER
    DECLARE i : INTEGER
    DECLARE j : INTEGER
    DECLARE Pair : ARRAY[1 : 2] OF INTEGER
    FOR i <- 1 TO ArraySize - 1
        FOR j <- i + 1 TO ArraySize
            IF Nums[i] + Nums[j] = Target THEN
                Pair[1] <- i
                Pair[2] <- j
                RETURN Pair
            ENDIF
        NEXT j
    NEXT i
    Pair[1] <- -1
    Pair[2] <- -1
    RETURN Pair
ENDFUNCTION`,

'password-validator': `FUNCTION ValidatePassword(Password : STRING) RETURNS BOOLEAN
    DECLARE Upper : STRING
    DECLARE Ch : STRING
    DECLARE i : INTEGER
    DECLARE k : INTEGER
    Upper <- "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    IF LENGTH(Password) < 8 THEN
        RETURN FALSE
    ENDIF
    FOR i <- 1 TO LENGTH(Password)
        Ch <- SUBSTRING(Password, i, 1)
        FOR k <- 1 TO 26
            IF Ch = SUBSTRING(Upper, k, 1) THEN
                RETURN TRUE
            ENDIF
        NEXT k
    NEXT i
    RETURN FALSE
ENDFUNCTION`,

'is-palindrome': `FUNCTION IsPalindrome(Str : STRING) RETURNS BOOLEAN
    DECLARE i : INTEGER
    DECLARE N : INTEGER
    N <- LENGTH(Str)
    FOR i <- 1 TO N DIV 2
        IF SUBSTRING(Str, i, 1) <> SUBSTRING(Str, N - i + 1, 1) THEN
            RETURN FALSE
        ENDIF
    NEXT i
    RETURN TRUE
ENDFUNCTION`,

'fibonacci': `FUNCTION Fibonacci(N : INTEGER) RETURNS INTEGER
    DECLARE a : INTEGER
    DECLARE b : INTEGER
    DECLARE t : INTEGER
    DECLARE i : INTEGER
    IF N <= 2 THEN
        RETURN 1
    ENDIF
    a <- 1
    b <- 1
    FOR i <- 3 TO N
        t <- a + b
        a <- b
        b <- t
    NEXT i
    RETURN b
ENDFUNCTION`,

'find-median': `FUNCTION FindMedian(Nums : ARRAY[1 : ArraySize] OF INTEGER) RETURNS INTEGER
    DECLARE i : INTEGER
    DECLARE j : INTEGER
    DECLARE Temp : INTEGER
    DECLARE Mid : INTEGER
    FOR i <- 1 TO ArraySize - 1
        FOR j <- 1 TO ArraySize - i
            IF Nums[j] > Nums[j + 1] THEN
                Temp <- Nums[j]
                Nums[j] <- Nums[j + 1]
                Nums[j + 1] <- Temp
            ENDIF
        NEXT j
    NEXT i
    Mid <- ArraySize DIV 2
    IF ArraySize MOD 2 = 1 THEN
        RETURN Nums[Mid + 1]
    ELSE
        RETURN (Nums[Mid] + Nums[Mid + 1]) DIV 2
    ENDIF
ENDFUNCTION`,

'rotate-array': `FUNCTION RotateArray(Nums : ARRAY[1 : ArraySize] OF INTEGER, k : INTEGER) RETURNS ARRAY[1 : ArraySize] OF INTEGER
    DECLARE Out : ARRAY[1 : ArraySize] OF INTEGER
    DECLARE i : INTEGER
    DECLARE Shift : INTEGER
    DECLARE Pos : INTEGER
    Shift <- k MOD ArraySize
    FOR i <- 1 TO ArraySize
        Pos <- ((i - 1 + Shift) MOD ArraySize) + 1
        Out[Pos] <- Nums[i]
    NEXT i
    RETURN Out
ENDFUNCTION`,

'find-duplicate': `FUNCTION FindDuplicate(Nums : ARRAY[1 : ArraySize] OF INTEGER) RETURNS INTEGER
    DECLARE i : INTEGER
    DECLARE j : INTEGER
    FOR i <- 1 TO ArraySize - 1
        FOR j <- i + 1 TO ArraySize
            IF Nums[i] = Nums[j] THEN
                RETURN Nums[i]
            ENDIF
        NEXT j
    NEXT i
    RETURN -1
ENDFUNCTION`,

'string-to-int': `FUNCTION StringToInt(Str : STRING) RETURNS INTEGER
    DECLARE Digits : STRING
    DECLARE Ch : STRING
    DECLARE i : INTEGER
    DECLARE k : INTEGER
    DECLARE Start : INTEGER
    DECLARE Value : INTEGER
    DECLARE Neg : BOOLEAN
    Digits <- "0123456789"
    Value <- 0
    Neg <- FALSE
    Start <- 1
    IF SUBSTRING(Str, 1, 1) = "-" THEN
        Neg <- TRUE
        Start <- 2
    ENDIF
    FOR i <- Start TO LENGTH(Str)
        Ch <- SUBSTRING(Str, i, 1)
        FOR k <- 1 TO 10
            IF Ch = SUBSTRING(Digits, k, 1) THEN
                Value <- Value * 10 + (k - 1)
            ENDIF
        NEXT k
    NEXT i
    IF Neg = TRUE THEN
        RETURN 0 - Value
    ENDIF
    RETURN Value
ENDFUNCTION`,

'number-of-islands': `FUNCTION NumIslands(Grid : ARRAY[1:Rows, 1:Cols] OF INTEGER) RETURNS INTEGER
    DECLARE r : INTEGER
    DECLARE c : INTEGER
    DECLARE i : INTEGER
    DECLARE j : INTEGER
    DECLARE Count : INTEGER
    DECLARE Changed : BOOLEAN
    DECLARE Mark : ARRAY[1:Rows, 1:Cols] OF INTEGER
    FOR r <- 1 TO Rows
        FOR c <- 1 TO Cols
            Mark[r, c] <- Grid[r, c]
        NEXT c
    NEXT r
    Count <- 0
    FOR r <- 1 TO Rows
        FOR c <- 1 TO Cols
            IF Mark[r, c] = 1 THEN
                Count <- Count + 1
                Mark[r, c] <- 2
                Changed <- TRUE
                WHILE Changed = TRUE
                    Changed <- FALSE
                    FOR i <- 1 TO Rows
                        FOR j <- 1 TO Cols
                            IF Mark[i, j] = 1 THEN
                                IF i > 1 THEN
                                    IF Mark[i - 1, j] = 2 THEN
                                        Mark[i, j] <- 2
                                        Changed <- TRUE
                                    ENDIF
                                ENDIF
                                IF i < Rows THEN
                                    IF Mark[i + 1, j] = 2 THEN
                                        Mark[i, j] <- 2
                                        Changed <- TRUE
                                    ENDIF
                                ENDIF
                                IF j > 1 THEN
                                    IF Mark[i, j - 1] = 2 THEN
                                        Mark[i, j] <- 2
                                        Changed <- TRUE
                                    ENDIF
                                ENDIF
                                IF j < Cols THEN
                                    IF Mark[i, j + 1] = 2 THEN
                                        Mark[i, j] <- 2
                                        Changed <- TRUE
                                    ENDIF
                                ENDIF
                            ENDIF
                        NEXT j
                    NEXT i
                ENDWHILE
            ENDIF
        NEXT c
    NEXT r
    RETURN Count
ENDFUNCTION`,

'valid-sudoku': `FUNCTION IsValidSudoku(Board : ARRAY[1:9, 1:9] OF INTEGER) RETURNS BOOLEAN
    DECLARE r : INTEGER
    DECLARE c : INTEGER
    DECLARE k : INTEGER
    DECLARE v : INTEGER
    DECLARE br : INTEGER
    DECLARE bc : INTEGER
    DECLARE Seen : ARRAY[1 : 9] OF INTEGER
    FOR r <- 1 TO 9
        FOR k <- 1 TO 9
            Seen[k] <- 0
        NEXT k
        FOR c <- 1 TO 9
            v <- Board[r, c]
            IF v <> 0 THEN
                IF Seen[v] = 1 THEN
                    RETURN FALSE
                ENDIF
                Seen[v] <- 1
            ENDIF
        NEXT c
    NEXT r
    FOR c <- 1 TO 9
        FOR k <- 1 TO 9
            Seen[k] <- 0
        NEXT k
        FOR r <- 1 TO 9
            v <- Board[r, c]
            IF v <> 0 THEN
                IF Seen[v] = 1 THEN
                    RETURN FALSE
                ENDIF
                Seen[v] <- 1
            ENDIF
        NEXT r
    NEXT c
    FOR br <- 0 TO 2
        FOR bc <- 0 TO 2
            FOR k <- 1 TO 9
                Seen[k] <- 0
            NEXT k
            FOR r <- 1 TO 3
                FOR c <- 1 TO 3
                    v <- Board[br * 3 + r, bc * 3 + c]
                    IF v <> 0 THEN
                        IF Seen[v] = 1 THEN
                            RETURN FALSE
                        ENDIF
                        Seen[v] <- 1
                    ENDIF
                NEXT c
            NEXT r
        NEXT bc
    NEXT br
    RETURN TRUE
ENDFUNCTION`
};

for (const problem of CODE) problem.solution = CODE_SOLUTIONS[problem.id];
