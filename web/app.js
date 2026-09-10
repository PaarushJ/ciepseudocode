/* ============================================================
   Cambridge Pseudocode IDE — front end
   Runs the GPL-3.0 Rust interpreter (compiled to WebAssembly).
   ============================================================ */
import { EXAMPLES } from './examples.js';
import { LESSONS }  from './lessons.js';
import { PROBLEMS } from './problems.js';

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
  $('side-title').textContent = {files:'Explorer',examples:'Examples',learn:'Learn',practice:'Practice'}[view] || 'Explorer';

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
  } else if (view === 'learn'){
    for (const mod of LESSONS){
      const wrap = groupSection(body, mod.module, mod.items.length);
      for (const les of mod.items){
        const it = document.createElement('div');
        it.className = 'item' + (openDoc === les.id ? ' on' : '');
        it.innerHTML = `<span class="txt">${esc(les.title)}</span>`;
        it.addEventListener('click', () => openLesson(mod, les));
        wrap.appendChild(it);
      }
    }
  } else if (view === 'practice'){
    const done = store.get('cps_completed', []);
    for (const level of ['easy','medium','hard']){
      const items = PROBLEMS.filter(p => p.difficulty === level);
      if (!items.length) continue;
      const wrap = groupSection(body, level, items.length);
      for (const pr of items){
        const it = document.createElement('div');
        it.className = 'item' + (openDoc === pr.id ? ' on' : '');
        const tick = done.includes(pr.id)
          ? `<svg class="tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 13l4 4 10-10"/></svg>` : '';
        it.innerHTML = `<span class="txt">${esc(pr.title)}</span>${tick}`;
        it.addEventListener('click', () => openProblem(pr));
        wrap.appendChild(it);
      }
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
   Learn / Practice panel
   ============================================================ */
let openDoc = null;
const docPanel = $('docpanel'), docBody = $('doc-body');

function groupSection(parent, label, count){
  const h = document.createElement('div');
  h.className = 'group-head';
  h.innerHTML = `<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
                 <span>${esc(label)}</span><span class="count">${count}</span>`;
  parent.appendChild(h);
  const wrap = document.createElement('div');
  parent.appendChild(wrap);
  h.addEventListener('click', () => {
    h.classList.toggle('collapsed');
    wrap.style.display = h.classList.contains('collapsed') ? 'none' : '';
  });
  return wrap;
}

function blocks(list){
  return list.map(b => {
    if (b.p)    return `<p>${b.p}</p>`;
    if (b.code) return `<pre class="code-font">${highlight(b.code)}</pre>`;
    if (b.note) return `<div class="note">${b.note}</div>`;
    if (b.list) return `<ul>${b.list.map(x => `<li>${x}</li>`).join('')}</ul>`;
    return '';
  }).join('');
}

function showDoc(kicker){
  $('doc-kicker').textContent = kicker;
  docPanel.classList.remove('off');
  docBody.scrollTop = 0;
  render();
}
$('doc-close').addEventListener('click', () => {
  docPanel.classList.add('off'); openDoc = null; renderSidebar(); render();
});

/* ---------- lessons ---------- */
function openLesson(mod, les){
  openDoc = les.id;
  docBody.innerHTML =
    `<h1>${esc(les.title)}</h1>
     <div class="sub">${esc(mod.module)}</div>
     ${blocks(les.body)}
     <div class="doc-actions">
       <button class="btn btn-primary" id="doc-try">Open example in editor</button>
     </div>`;
  $('doc-try').addEventListener('click', () => {
    const name = uniqueName(les.id + '.cps');
    files.push({ name, content: les.try });
    saveFiles(); openFile(name);
  });
  showDoc('Lesson'); renderSidebar();
}

/* ---------- problems ---------- */
function openProblem(pr){
  openDoc = pr.id;
  const done = store.get('cps_completed', []).includes(pr.id);
  docBody.innerHTML =
    `<h1>${esc(pr.title)}</h1>
     <div class="sub">
       <span class="diff ${pr.difficulty}">${esc(pr.difficulty)}</span>
       <span>${esc(pr.topic)}</span>
       ${done ? '<span style="color:var(--green)">• solved</span>' : ''}
     </div>
     ${blocks(pr.body)}
     <div class="doc-actions">
       <button class="btn btn-ghost"   id="pr-start">Load starter code</button>
       <button class="btn btn-primary" id="pr-test">Run tests</button>
     </div>
     <div class="tests" id="pr-results"></div>
     <div class="doc-sep"></div>
     <details class="reveal"><summary>
        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 6l6 6-6 6"/></svg>Show a hint</summary>
       <div class="inner"><p>${pr.hint}</p></div></details>
     <details class="reveal"><summary>
        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 6l6 6-6 6"/></svg>Reveal the solution</summary>
       <div class="inner"><pre class="code-font">${highlight(pr.solution)}</pre></div></details>`;

  $('pr-start').addEventListener('click', () => {
    const name = uniqueName(pr.id + '.cps');
    files.push({ name, content: pr.starter });
    saveFiles(); openFile(name);
  });
  $('pr-test').addEventListener('click', () => runTests(pr));
  showDoc('Problem'); renderSidebar();
}

/* ---------- headless run for test cases ---------- */
async function runWithInputs(source, inputs){
  const mod = await loadWasm();
  let runner;
  try { runner = new mod.WebRunner(source); }
  catch (e){ return { error: String(e), lines: [] }; }

  const lines = [];
  let next = 0, steps = 0;
  try {
    while (true){
      if (++steps > 500000)
        return { error: 'Program did not finish — check for an endless loop.', lines };
      const ev = runner.step();
      if (ev.type === 'Output')          lines.push(ev.value);
      else if (ev.type === 'NeedsInput') runner.supply_input(next < inputs.length ? inputs[next++] : '');
      else if (ev.type === 'Done')       return { lines };
      else if (ev.type === 'Error')      return { error: ev.message, lines };
    }
  } finally { try { runner.free(); } catch (e){} }
}

const tidy = (arr) => {
  const out = arr.map(l => String(l).replace(/\s+$/, ''));
  while (out.length && out[out.length-1] === '') out.pop();
  return out;
};

async function runTests(pr){
  const box = $('pr-results');
  box.innerHTML = `<div class="verdict">Running ${pr.tests.length} tests…</div>`;
  const source = code.value;
  const results = [];

  for (const t of pr.tests){
    const r = await runWithInputs(source, t.inputs);
    const got = tidy(r.lines), want = tidy(t.expect);
    results.push({
      name: t.name,
      ok: !r.error && got.length === want.length && got.every((l,i) => l === want[i]),
      error: r.error, got, want
    });
  }

  const passed = results.filter(r => r.ok).length;
  const all = passed === results.length;
  const anyErr = results.some(r => r.error);

  let html = `<div class="verdict ${all ? 'pass' : (anyErr ? 'err' : 'fail')}">
      ${all ? `All ${passed} tests passed — nice work.`
            : `${passed} of ${results.length} tests passed.`}</div>`;

  for (const r of results){
    const icon = r.ok
      ? `<svg class="mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M5 13l4 4 10-10"/></svg>`
      : `<svg class="mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
    let detail = '';
    if (!r.ok){
      detail = r.error
        ? `<div class="tdiff"><b>error</b>  ${esc(r.error)}</div>`
        : `<div class="tdiff"><b>expected</b>  ${esc(r.want.join(' ⏎ ') || '(nothing)')}
             <br><b>got</b>       ${esc(r.got.join(' ⏎ ')  || '(nothing)')}</div>`;
    }
    html += `<div class="test ${r.ok ? 'pass' : 'fail'}">${icon}
               <div class="tinfo"><div class="tname">${esc(r.name)}</div>${detail}</div></div>`;
  }
  box.innerHTML = html;

  const done = store.get('cps_completed', []);
  if (all && !done.includes(pr.id)){ done.push(pr.id); store.set('cps_completed', done); }
  if (!all && done.includes(pr.id)) store.set('cps_completed', done.filter(x => x !== pr.id));
  renderSidebar();
}

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
