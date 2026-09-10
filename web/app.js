/* ============================================================
   Cambridge Pseudocode IDE — front end
   Runs the GPL-3.0 Rust interpreter (compiled to WebAssembly).
   ============================================================ */
import { EXAMPLES } from './examples.js';

/* ---------- language surface (mirrors src/Lexer/lexer.rs) ---------- */
const TYPES = new Set(['INTEGER','REAL','CHAR','STRING','BOOLEAN','DATE','ARRAY']);
const BUILTINS = new Set(['LENGTH','SUBSTRING','RIGHT','MID','UCASE','LCASE','ASC','CHR',
                          'INT','RAND','NUM_TO_STR','STR_TO_NUM','IS_NUM']);
const KEYWORDS = new Set(['AND','APPEND','BYREF','BYVAL','CALL','CASE','CLASS','CLOSEFILE',
  'CONSTANT','DECLARE','DIV','ELSE','ENDCASE','ENDCLASS','ENDFUNCTION','ENDIF','ENDPROCEDURE',
  'ENDTYPE','ENDWHILE','FALSE','FOR','FUNCTION','GETRECORD','IF','INHERITS','INPUT','MOD','NEW',
  'NEXT','NOT','OF','OPENFILE','OR','OTHERWISE','OUTPUT','PRINT','PRIVATE','PROCEDURE','PUBLIC',
  'PUTRECORD','RANDOM','READ','READFILE','REAL','REPEAT','RETURN','RETURNS','SEEK','SET','STEP',
  'THEN','TO','TRUE','TYPE','UNTIL','WHILE','WRITE','WRITEFILE']);

/* ---------- tiny helpers ---------- */
const $ = (id) => document.getElementById(id);
const esc = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const store = {
  get(k, fb){ try{ const v = localStorage.getItem(k); return v===null?fb:JSON.parse(v); }catch(e){ return fb; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} },
};

/* ---------- settings ---------- */
const DEFAULTS = { theme:'vscode-dark', font:"'JetBrains Mono'", fontLigatures:false, fontSize:13.5 };
let settings = Object.assign({}, DEFAULTS, store.get('cps_settings', {}));

function applySettings(){
  const r = document.documentElement;
  r.setAttribute('data-theme', settings.theme);
  r.setAttribute('data-ligatures', settings.fontLigatures ? 'on' : 'off');
  r.style.setProperty('--font-mono',
    `${settings.font}, 'JetBrains Mono','Fira Code',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace`);
  r.style.setProperty('--ed-size', settings.fontSize + 'px');
  r.style.setProperty('--ed-lh', Math.round(settings.fontSize * 1.48) + 'px');
  const names = {'vscode-dark':'Dark','dracula':'Dracula','tokyo-night':'Tokyo Night','catppuccin-mocha':'Catppuccin'};
  $('st-theme').textContent = names[settings.theme] || 'Dark';
  store.set('cps_settings', settings);
  render();
}

/* ---------- virtual file system ---------- */
const STARTER = `// Welcome to the Cambridge Pseudocode IDE
// Press Run (or Ctrl/Cmd + Enter) to execute.

DECLARE Name : STRING

OUTPUT "What is your name?"
INPUT Name
OUTPUT "Hello, ", Name, "!"

DECLARE Total : INTEGER
Total <- 0

FOR i <- 1 TO 10
    Total <- Total + i
NEXT i

OUTPUT "The sum of 1 to 10 is ", Total
`;

let files = store.get('cps_files', null);
if (!files || !Array.isArray(files) || files.length === 0){
  files = [{ name:'main.cps', content: STARTER }];
}
let activeFile = store.get('cps_active_file', 'main.cps');
if (!files.some(f => f.name === activeFile)) activeFile = files[0].name;
let openTabs = files.slice(0,1).map(f => f.name);
if (!openTabs.includes(activeFile)) openTabs.push(activeFile);

const saveFiles = () => { store.set('cps_files', files); store.set('cps_active_file', activeFile); };
const getFile   = (n) => files.find(f => f.name === n);

/* ============================================================
   Syntax highlighting
   ============================================================ */
function highlight(src){
  let out = '', i = 0;
  const n = src.length;
  while (i < n){
    const c = src[i];

    // comment
    if (c === '/' && src[i+1] === '/'){
      let j = src.indexOf('\n', i); if (j === -1) j = n;
      out += `<span class="tok-com">${esc(src.slice(i,j))}</span>`; i = j; continue;
    }
    // string
    if (c === '"'){
      let j = i+1; while (j < n && src[j] !== '"' && src[j] !== '\n') j++;
      if (j < n && src[j] === '"') j++;
      out += `<span class="tok-str">${esc(src.slice(i,j))}</span>`; i = j; continue;
    }
    // char literal
    if (c === "'"){
      let j = i+1; while (j < n && src[j] !== "'" && src[j] !== '\n') j++;
      if (j < n && src[j] === "'") j++;
      out += `<span class="tok-str">${esc(src.slice(i,j))}</span>`; i = j; continue;
    }
    // number
    if (c >= '0' && c <= '9'){
      let j = i; while (j < n && /[0-9]/.test(src[j])) j++;
      if (src[j] === '.' && /[0-9]/.test(src[j+1]||'')){ j++; while (j < n && /[0-9]/.test(src[j])) j++; }
      out += `<span class="tok-num">${esc(src.slice(i,j))}</span>`; i = j; continue;
    }
    // identifier / keyword
    if (/[A-Za-z_]/.test(c)){
      let j = i; while (j < n && /[A-Za-z0-9_]/.test(src[j])) j++;
      const w = src.slice(i,j), U = w.toUpperCase();
      let k = 'tok-id';
      if (TYPES.has(U))          k = 'tok-type';
      else if (BUILTINS.has(U))  k = 'tok-fn';
      else if (KEYWORDS.has(U))  k = 'tok-kw';
      else {
        let p = j; while (p < n && src[p] === ' ') p++;
        if (src[p] === '(') k = 'tok-fn';
      }
      out += `<span class="${k}">${esc(w)}</span>`; i = j; continue;
    }
    // operators
    if ('<>=+-*/^&:,()[].←'.includes(c)){
      let op = c;
      const two = src.substr(i,2);
      if (['<-','<=','>=','<>'].includes(two)) op = two;
      out += `<span class="tok-op">${esc(op)}</span>`; i += op.length; continue;
    }
    out += esc(c); i++;
  }
  return out;
}

/* ============================================================
   Editor
   ============================================================ */
const code   = $('code');
const hl     = $('highlight');
const gutter = $('gutter');
const scroll = $('code-scroll');
let errorLine = 0;

function render(){
  const src = code.value;
  hl.innerHTML = highlight(src) + '\n';

  const lines = src.split('\n');
  const lh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ed-lh'));
  const cur = src.slice(0, code.selectionStart).split('\n').length;

  let g = '';
  for (let i = 1; i <= lines.length; i++){
    const cls = i === errorLine ? 'errline' : (i === cur ? 'cur' : '');
    g += `<div class="${cls}">${i}</div>`;
  }
  gutter.innerHTML = g;

  // size the textarea to its content so one scroller drives both layers
  const w = Math.max(hl.scrollWidth, scroll.clientWidth);
  code.style.width  = w + 'px';
  code.style.height = (lines.length * lh + 48) + 'px';

  const col = code.selectionStart - (src.lastIndexOf('\n', code.selectionStart - 1) + 1) + 1;
  $('st-pos').textContent = `Ln ${cur}, Col ${col}`;
}

function syncScroll(){ gutter.scrollTop = scroll.scrollTop; }

code.addEventListener('input', () => {
  errorLine = 0;
  const f = getFile(activeFile);
  if (f){ f.content = code.value; saveFiles(); }
  render();
});
['click','keyup','focus'].forEach(e => code.addEventListener(e, render));
scroll.addEventListener('scroll', syncScroll);

/* Tab, auto-indent, block indent */
code.addEventListener('keydown', (e) => {
  const s = code.selectionStart, t = code.selectionEnd, v = code.value;

  if (e.key === 'Tab'){
    e.preventDefault();
    if (s !== t && v.slice(s,t).includes('\n')){
      const a = v.lastIndexOf('\n', s-1) + 1;
      const block = v.slice(a, t);
      const next = e.shiftKey
        ? block.replace(/^ {1,4}/gm, '')
        : block.replace(/^/gm, '    ');
      code.value = v.slice(0,a) + next + v.slice(t);
      code.selectionStart = a; code.selectionEnd = a + next.length;
    } else {
      code.value = v.slice(0,s) + '    ' + v.slice(t);
      code.selectionStart = code.selectionEnd = s + 4;
    }
    code.dispatchEvent(new Event('input'));
    return;
  }

  if (e.key === 'Enter'){
    const lineStart = v.lastIndexOf('\n', s-1) + 1;
    const line = v.slice(lineStart, s);
    let indent = (line.match(/^\s*/) || [''])[0];
    // indent one level after a block opener
    if (/\b(THEN|ELSE|REPEAT|OTHERWISE)\s*$/i.test(line) ||
        /^\s*(FOR|WHILE|PROCEDURE|FUNCTION|CASE|TYPE|CLASS)\b/i.test(line)){
      indent += '    ';
    }
    e.preventDefault();
    const ins = '\n' + indent;
    code.value = v.slice(0,s) + ins + v.slice(t);
    code.selectionStart = code.selectionEnd = s + ins.length;
    code.dispatchEvent(new Event('input'));
    return;
  }

  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter'){ e.preventDefault(); run(); return; }
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's'){ e.preventDefault(); saveFiles(); flash('Saved'); }
});

/* ============================================================
   Console
   ============================================================ */
const conBody = $('con-body');
function out(text, cls='ln-out'){
  const d = document.createElement('div');
  d.className = cls;
  d.textContent = text;
  conBody.appendChild(d);
  conBody.scrollTop = conBody.scrollHeight;
}
function clearConsole(){ conBody.innerHTML = ''; }

$('btn-clear').addEventListener('click', clearConsole);
$('btn-collapse').addEventListener('click', () => $('console').classList.toggle('collapsed'));

function setState(text, kind){
  $('st-state').textContent = text;
  const sb = $('statusbar');
  sb.classList.remove('running','error');
  if (kind) sb.classList.add(kind);
}
function flash(msg){ setState(msg); setTimeout(() => { if (!running) setState('Ready'); }, 1200); }

/* stdin */
const stdinRow = $('con-input'), stdinEl = $('stdin');
let pendingInput = null;
function askInput(varName){
  return new Promise((resolve) => {
    stdinRow.classList.remove('off');
    stdinEl.placeholder = varName ? `Value for ${varName}…` : 'Type a value and press Enter…';
    stdinEl.focus();
    pendingInput = (val) => { stdinRow.classList.add('off'); pendingInput = null; resolve(val); };
  });
}
stdinEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && pendingInput){
    const v = stdinEl.value;
    stdinEl.value = '';
    out('› ' + v, 'ln-in');
    pendingInput(v);
  }
});

/* ============================================================
   Runner — drives the WASM interpreter one event at a time
   ============================================================ */
let wasm = null, running = false, stopRequested = false, activeRunner = null;

async function loadWasm(){
  if (!wasm){
    const mod = await import('./pkg/cambridge_pseudocode_interpreter.js');
    await mod.default();
    wasm = mod;
  }
  return wasm;
}

async function run(){
  if (running) return;
  running = true; stopRequested = false; errorLine = 0;
  $('btn-run').style.display = 'none';
  $('btn-stop').style.display = '';
  clearConsole();
  setState('Running…', 'running');

  let mod;
  try {
    mod = await loadWasm();
  } catch (e){
    out('Could not load the interpreter: ' + e, 'ln-err');
    return finish('Error', 'error');
  }

  let runner;
  try {
    runner = new mod.WebRunner(code.value);
  } catch (e){
    reportError(String(e));
    return finish('Error', 'error');
  }
  activeRunner = runner;

  // make the other .cps/.txt files visible to OPENFILE/READFILE
  for (const f of files){
    if (f.name !== activeFile){
      try { runner.load_file(f.name, f.content); } catch (e){}
    }
  }

  const started = performance.now();
  try {
    let budget = 0;
    while (true){
      if (stopRequested){ out('— stopped —', 'ln-sys'); return finish('Stopped'); }

      const ev = runner.step();

      if (ev.type === 'Output'){
        out(ev.value);
        if (++budget % 200 === 0) await new Promise(r => setTimeout(r, 0)); // keep UI responsive
      } else if (ev.type === 'NeedsInput'){
        const val = await askInput(ev.variable);
        if (stopRequested){ out('— stopped —', 'ln-sys'); return finish('Stopped'); }
        runner.supply_input(val);
      } else if (ev.type === 'Done'){
        const ms = Math.round(performance.now() - started);
        out(`\n[program finished in ${ms} ms]`, 'ln-sys');
        // persist anything the program wrote
        try {
          for (const name of runner.list_written_files() || []){
            const content = runner.get_file(name);
            if (content === undefined) continue;
            const ex = getFile(name);
            if (ex) ex.content = content; else files.push({ name, content });
          }
          saveFiles(); renderSidebar();
        } catch (e){}
        return finish('Ready');
      } else if (ev.type === 'Error'){
        reportError(ev.message);
        return finish('Error', 'error');
      }
    }
  } catch (e){
    out(String(e), 'ln-err');
    return finish('Error', 'error');
  } finally {
    try { runner.free(); } catch (e){}
    activeRunner = null;
  }
}

function reportError(msg){
  out(msg, 'ln-err');
  const m = String(msg).match(/[Ll]ine\s+(\d+)/);
  if (m){ errorLine = parseInt(m[1], 10); render(); }
}

function finish(state, kind){
  running = false;
  stopRequested = false;
  stdinRow.classList.add('off');
  pendingInput = null;
  $('btn-run').style.display = '';
  $('btn-stop').style.display = 'none';
  setState(state, kind);
}

$('btn-run').addEventListener('click', run);
$('btn-stop').addEventListener('click', () => {
  stopRequested = true;
  if (pendingInput) pendingInput('');   // unblock a waiting INPUT
});

/* ============================================================
   Tabs
   ============================================================ */
function renderTabs(){
  const bar = $('tabbar');
  bar.innerHTML = '';
  for (const name of openTabs){
    const t = document.createElement('div');
    t.className = 'tab' + (name === activeFile ? ' on' : '');
    t.innerHTML = `<span class="tname">${esc(name)}</span>
      <button class="x" aria-label="Close ${esc(name)}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>`;
    t.addEventListener('click', (e) => {
      if (e.target.closest('.x')){ closeTab(name); return; }
      openFile(name);
    });
    bar.appendChild(t);
  }
  $('title-file').textContent = activeFile;
}
function closeTab(name){
  openTabs = openTabs.filter(n => n !== name);
  if (openTabs.length === 0){ openTabs = [name]; return; }
  if (activeFile === name) openFile(openTabs[openTabs.length-1]);
  else renderTabs();
}
function openFile(name){
  const f = getFile(name); if (!f) return;
  activeFile = name;
  if (!openTabs.includes(name)) openTabs.push(name);
  code.value = f.content;
  errorLine = 0;
  saveFiles(); renderTabs(); renderSidebar(); render();
  code.focus();
}

/* ============================================================
   Sidebar — Explorer / Examples / Settings
   ============================================================ */
let view = 'files';

function renderSidebar(){
  const body = $('side-body'), acts = $('side-acts');
  body.innerHTML = ''; acts.innerHTML = '';
  $('side-title').textContent = view === 'files' ? 'Explorer' : 'Examples';

  if (view === 'files'){
    const add = document.createElement('button');
    add.className = 'icon-btn'; add.title = 'New file';
    add.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 5v14M5 12h14"/></svg>`;
    add.addEventListener('click', newFile);
    acts.appendChild(add);

    for (const f of files){
      const row = document.createElement('div');
      row.className = 'tree-row' + (f.name === activeFile ? ' on' : '');
      row.innerHTML =
        `<span class="fico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
           <path d="M13 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V8.5z"/><path d="M13 3v5.5h5.5"/></svg></span>
         <span class="fname">${esc(f.name)}</span>
         <button class="rm" aria-label="Delete ${esc(f.name)}">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>
         </button>`;
      row.addEventListener('click', (e) => {
        if (e.target.closest('.rm')){ deleteFile(f.name); return; }
        openFile(f.name);
      });
      body.appendChild(row);
    }
  } else {
    for (const group of EXAMPLES){
      const h = document.createElement('div');
      h.className = 'group-head';
      h.innerHTML = `<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
                     <span>${esc(group.group)}</span><span class="count">${group.items.length}</span>`;
      body.appendChild(h);

      const wrap = document.createElement('div');
      for (const ex of group.items){
        const it = document.createElement('div');
        it.className = 'item';
        it.innerHTML = `<span class="txt">${esc(ex.title)}</span>`;
        it.addEventListener('click', () => loadExample(ex));
        wrap.appendChild(it);
      }
      body.appendChild(wrap);
      h.addEventListener('click', () => {
        h.classList.toggle('collapsed');
        wrap.style.display = h.classList.contains('collapsed') ? 'none' : '';
      });
    }
  }
}

function uniqueName(base){
  let name = base, i = 2;
  while (getFile(name)) name = base.replace(/\.cps$/, '') + '-' + (i++) + '.cps';
  return name;
}
function newFile(){
  const name = uniqueName('untitled.cps');
  files.push({ name, content: '' });
  saveFiles(); openFile(name);
}
function deleteFile(name){
  if (files.length === 1){ flash('Cannot delete the last file'); return; }
  files = files.filter(f => f.name !== name);
  openTabs = openTabs.filter(n => n !== name);
  if (activeFile === name) activeFile = files[0].name;
  saveFiles(); openFile(activeFile);
}
function loadExample(ex){
  const name = uniqueName(ex.file);
  files.push({ name, content: ex.code });
  saveFiles(); openFile(name);
  view = 'files';
  document.querySelectorAll('.act').forEach(a => a.classList.toggle('on', a.dataset.view === 'files'));
  renderSidebar();
}

/* ---------- activity bar ---------- */
document.querySelectorAll('.act').forEach(btn => {
  btn.addEventListener('click', () => {
    const v = btn.dataset.view;
    if (v === 'settings'){ $('overlay').classList.remove('off'); return; }
    if (v === view && !$('sidebar').classList.contains('hidden')){
      $('sidebar').classList.add('hidden');
      btn.classList.remove('on');
      return;
    }
    view = v;
    $('sidebar').classList.remove('hidden');
    document.querySelectorAll('.act').forEach(a => a.classList.toggle('on', a === btn));
    renderSidebar();
  });
});

/* ============================================================
   Settings modal
   ============================================================ */
$('btn-close-settings').addEventListener('click', () => $('overlay').classList.add('off'));
$('overlay').addEventListener('click', (e) => { if (e.target === $('overlay')) $('overlay').classList.add('off'); });
$('st-theme').addEventListener('click', () => $('overlay').classList.remove('off'));

$('sel-theme').value = settings.theme;
$('sel-font').value  = settings.font;
$('sel-size').value  = String(settings.fontSize);
$('chk-lig').checked = !!settings.fontLigatures;

$('sel-theme').addEventListener('change', e => { settings.theme = e.target.value; applySettings(); });
$('sel-font').addEventListener('change',  e => { settings.font  = e.target.value; applySettings(); });
$('sel-size').addEventListener('change',  e => { settings.fontSize = parseFloat(e.target.value); applySettings(); });
$('chk-lig').addEventListener('change',   e => { settings.fontLigatures = e.target.checked; applySettings(); });

$('about').innerHTML =
  `Pseudocode engine: the <a href="https://github.com/PaarushJ/ciepseudocode" target="_blank" rel="noopener noreferrer">Cambridge
   Pseudocode Interpreter</a>, a Rust project by Faisal Fakih compiled to WebAssembly and used here under the GPL-3.0 licence.`;

/* ============================================================
   Console splitter
   ============================================================ */
(function(){
  const sp = $('splitter'), con = $('console');
  let dragging = false;
  sp.addEventListener('mousedown', () => { dragging = true; document.body.style.cursor = 'row-resize'; });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const h = Math.min(Math.max(window.innerHeight - e.clientY - 22, 35), window.innerHeight * 0.75);
    con.style.flex = `0 0 ${h}px`;
    con.classList.toggle('collapsed', h <= 40);
  });
  window.addEventListener('mouseup', () => { dragging = false; document.body.style.cursor = ''; render(); });
})();

window.addEventListener('resize', render);

/* ============================================================
   Boot
   ============================================================ */
applySettings();
code.value = (getFile(activeFile) || files[0]).content;
renderTabs();
renderSidebar();
render();
setState('Ready');
out('Cambridge Pseudocode IDE — press Run to execute your program.', 'ln-sys');

// warm the interpreter in the background so the first Run is instant
loadWasm().catch(() => {});

const loader = $('app-loader');
loader.classList.add('fade');
setTimeout(() => loader.remove(), 250);
