/* Practice problems for the Practice panel.
   Written for this repository. Each problem is checked by feeding `inputs`
   to the program and comparing the OUTPUT lines against `expect`. */

export const PROBLEMS = [
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
