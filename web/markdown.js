/* A small Markdown renderer for the Learn panel.

   Deliberately covers only the subset the lessons use — headings, horizontal
   rules, block quotes, fenced code, tables, ordered/unordered lists, task-list
   checkboxes and the usual inline emphasis — so the site keeps its no-build,
   no-dependency shape. Everything is escaped before any markup is added. */

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
export const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ESC[c]);

/* ---------- inline ----------------------------------------------------- */

/* `code` spans are pulled out first so emphasis inside them is left alone,
   then put back once the rest of the inline markup has been applied.
   NUL is the placeholder: it cannot occur in the source, so no amount of
   surrounding text can imitate it. */
const NUL = '\u0000';

function inline(src){
  const spans = [];
  let s = String(src).replace(/`([^`]+)`/g, (_, c) => {
    spans.push(c);
    return NUL + (spans.length - 1) + NUL;
  });

  s = escapeHtml(s);

  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_, text, href) => /^(https?:|#|\/)/i.test(href)
      ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${text}</a>`
      : text);

  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*([^*\n]+)\*(?![*\w])/g, '$1<em>$2</em>');
  s = s.replace(/(^|[^_\w])_([^_\n]+)_(?![_\w])/g, '$1<em>$2</em>');
  s = s.replace(/~~([^~]+)~~/g, '<del>$1</del>');

  return s.replace(/\u0000(\d+)\u0000/g,
    (_, i) => `<code>${escapeHtml(spans[+i])}</code>`);
}

/* ---------- blocks ----------------------------------------------------- */

const isRule    = (l) => /^ {0,3}(?:---+|\*\*\*+|___+)\s*$/.test(l);
const isTableRow = (l) => /^\s*\|.*\|\s*$/.test(l);
const isDivider  = (l) => /^\s*\|[\s:|-]+\|\s*$/.test(l) && l.includes('-');

const cells = (row) => row.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

function alignments(divider){
  return cells(divider).map((c) => {
    const left = c.startsWith(':'), right = c.endsWith(':');
    if (left && right) return ' style="text-align:center"';
    if (right)         return ' style="text-align:right"';
    return '';
  });
}

/* Renders one list, consuming as many sibling items as follow. `i` is the
   index of the first item; returns the html and the index after the list. */
function list(lines, i, ordered){
  const marker = ordered ? /^(\s*)\d+[.)]\s+(.*)$/ : /^(\s*)[-*+]\s+(.*)$/;
  let html = ordered ? '<ol>' : '<ul>';
  let task = false;

  while (i < lines.length){
    const m = lines[i].match(marker);
    if (!m) break;
    i++;

    let text = m[2];
    const parts = [];

    /* lazy continuation: plain lines that follow belong to the same item */
    while (i < lines.length && lines[i].trim() !== ''
           && !lines[i].match(marker) && !isRule(lines[i])
           && !/^\s*(?:[-*+]|\d+[.)])\s+/.test(lines[i])
           && !/^#{1,6}\s/.test(lines[i]) && !/^\s*>/.test(lines[i])
           && !/^\s*```/.test(lines[i]) && !isTableRow(lines[i])){
      parts.push(lines[i].trim()); i++;
    }
    if (parts.length) text += ' ' + parts.join(' ');

    const box = text.match(/^\[([ xX])\]\s+(.*)$/);
    if (box){
      task = true;
      html += `<li class="task"><input type="checkbox" disabled${box[1] === ' ' ? '' : ' checked'} />`
            + `<span>${inline(box[2])}</span></li>`;
    } else {
      html += `<li>${inline(text)}</li>`;
    }

    /* a blank line ends the list unless another item follows it directly */
    if (i < lines.length && lines[i].trim() === ''){
      const next = lines[i + 1];
      if (next === undefined || !next.match(marker)) break;
      i++;
    }
  }

  html += ordered ? '</ol>' : '</ul>';
  if (task) html = html.replace(ordered ? '<ol>' : '<ul>', ordered ? '<ol class="tasklist">' : '<ul class="tasklist">');
  return [html, i];
}

export function renderMarkdown(src){
  const lines = String(src).replace(/\r\n?/g, '\n').split('\n');
  let html = '';
  let i = 0;

  while (i < lines.length){
    const line = lines[i];

    if (line.trim() === ''){ i++; continue; }

    /* fenced code */
    const fence = line.match(/^\s*(`{3,}|~{3,})\s*([\w-]*)\s*$/);
    if (fence){
      const close = fence[1][0];
      const lang = fence[2] || '';
      const buf = [];
      i++;
      while (i < lines.length && !new RegExp('^\\s*' + close + '{3,}\\s*$').test(lines[i])){
        buf.push(lines[i]); i++;
      }
      i++; // closing fence
      const code = buf.join('\n');
      html += `<pre data-code="${escapeHtml(code)}"${lang ? ` data-lang="${escapeHtml(lang)}"` : ''}>`
            + `<code>${escapeHtml(code)}</code></pre>`;
      continue;
    }

    /* heading */
    const head = line.match(/^(#{1,6})\s+(.*)$/);
    if (head){
      const level = head[1].length;
      html += `<h${level}>${inline(head[2].replace(/\s+#+\s*$/, ''))}</h${level}>`;
      i++; continue;
    }

    /* horizontal rule */
    if (isRule(line)){ html += '<hr />'; i++; continue; }

    /* table */
    if (isTableRow(line) && i + 1 < lines.length && isDivider(lines[i + 1])){
      const headers = cells(line);
      const align = alignments(lines[i + 1]);
      i += 2;
      let body = '';
      while (i < lines.length && isTableRow(lines[i])){
        body += '<tr>' + cells(lines[i]).map((c, n) => `<td${align[n] || ''}>${inline(c)}</td>`).join('') + '</tr>';
        i++;
      }
      html += '<div class="table-wrap"><table><thead><tr>'
            + headers.map((c, n) => `<th${align[n] || ''}>${inline(c)}</th>`).join('')
            + `</tr></thead><tbody>${body}</tbody></table></div>`;
      continue;
    }

    /* block quote */
    if (/^\s*>/.test(line)){
      const buf = [];
      while (i < lines.length && (/^\s*>/.test(lines[i]) || (buf.length && lines[i].trim() !== ''))){
        buf.push(lines[i].replace(/^\s*>\s?/, '')); i++;
      }
      html += `<blockquote>${renderMarkdown(buf.join('\n'))}</blockquote>`;
      continue;
    }

    /* lists */
    if (/^\s*[-*+]\s+/.test(line)){ const [h, n] = list(lines, i, false); html += h; i = n; continue; }
    if (/^\s*\d+[.)]\s+/.test(line)){ const [h, n] = list(lines, i, true);  html += h; i = n; continue; }

    /* paragraph */
    const buf = [];
    while (i < lines.length && lines[i].trim() !== ''
           && !/^#{1,6}\s/.test(lines[i]) && !isRule(lines[i])
           && !/^\s*(?:`{3,}|~{3,})/.test(lines[i]) && !/^\s*>/.test(lines[i])
           && !/^\s*(?:[-*+]|\d+[.)])\s+/.test(lines[i])
           && !(isTableRow(lines[i]) && isDivider(lines[i + 1] || ''))){
      buf.push(lines[i]); i++;
    }
    if (buf.length) html += `<p>${inline(buf.join('\n')).replace(/\n/g, '<br />')}</p>`;
  }

  return html;
}
