(function(){
  'use strict';

  /* ===================== STARTVORLAGE ===================== */
  const STARTER = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>Meine Seite</title>
<style>
body {
  font-family: sans-serif;
  margin: 40px;
  color: #222222;
  background: #fdfdfd;
}
h1 {
  color: #c9a227;
}
</style>
</head>
<body>
<h1>Willkommen</h1>
<p>Lade eine eigene HTML-Datei über „Laden“ oder bearbeite diese Seite direkt im Editor.</p>
</body>
</html>`;

  /* ===================== ELEMENTE ===================== */
  const app = document.getElementById('app');
  const workspace = document.getElementById('workspace');
  const paneEditor = document.getElementById('paneEditor');
  const panePreview = document.getElementById('panePreview');
  const resizer = document.getElementById('resizer');
  const previewFrame = document.getElementById('previewFrame');
  const filenameEl = document.getElementById('filename');
  const statusMsg = document.getElementById('statusMsg');
  const cursorPosEl = document.getElementById('cursorPos');

  const fileInput = document.getElementById('fileInput');
  const btnLoad = document.getElementById('btnLoad');
  const btnSave = document.getElementById('btnSave');
  const btnMarkdown = document.getElementById('btnMarkdown');
  const btnScriptBtn = document.getElementById('btnScriptBtn');
  const btnStyles = document.getElementById('btnStyles');
  const btnLayout = document.getElementById('btnLayout');
  const btnFullscreen = document.getElementById('btnFullscreen');
  const btnRefreshPreview = document.getElementById('btnRefreshPreview');

  const panelStyles = document.getElementById('panelStyles');
  const closeStyles = document.getElementById('closeStyles');
  const colorSwatches = document.getElementById('colorSwatches');
  const btnApplyStyles = document.getElementById('btnApplyStyles');

  const modalMarkdown = document.getElementById('modalMarkdown');
  const mdInput = document.getElementById('markdownInput');
  const markdownPreview = document.getElementById('markdownPreview');
  const btnInsertMarkdown = document.getElementById('btnInsertMarkdown');

  const modalScriptBtn = document.getElementById('modalScriptBtn');
  const scriptBtnLabel = document.getElementById('scriptBtnLabel');
  const scriptBtnStyle = document.getElementById('scriptBtnStyle');
  const scriptBtnCode = document.getElementById('scriptBtnCode');
  const btnInsertScriptBtn = document.getElementById('btnInsertScriptBtn');

  let fileHandle = null;

  /* ===================== HAUPT-EDITOR ===================== */
  const editor = CodeMirror(document.getElementById('editorHost'), {
    value: STARTER,
    mode: 'htmlmixed',
    theme: 'material-darker',
    lineNumbers: true,
    lineWrapping: true,
    tabSize: 2,
    indentUnit: 2
  });

  let previewTimer = null;
  editor.on('change', () => {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(updatePreview, 350);
  });
  editor.on('cursorActivity', () => {
    const pos = editor.getCursor();
    cursorPosEl.textContent = `Zeile ${pos.line + 1}, Spalte ${pos.ch + 1}`;
  });

  function updatePreview() {
    previewFrame.srcdoc = editor.getValue();
  }

  /* ===================== TOAST / STATUS ===================== */
  let toastTimer = null;
  function showToast(msg) {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    statusMsg.textContent = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
  }

  /* ===================== LADEN / SPEICHERN ===================== */
  async function loadFile() {
    if (window.showOpenFilePicker) {
      try {
        const [handle] = await window.showOpenFilePicker({
          types: [{ description: 'HTML-Datei', accept: { 'text/html': ['.html', '.htm'] } }]
        });
        fileHandle = handle;
        const file = await handle.getFile();
        const text = await file.text();
        editor.setValue(text);
        filenameEl.textContent = file.name;
        updatePreview();
        showToast('Datei geladen: ' + file.name);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      }
    } else {
      fileInput.click();
    }
  }

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    fileHandle = null;
    const reader = new FileReader();
    reader.onload = () => {
      editor.setValue(reader.result);
      filenameEl.textContent = file.name;
      updatePreview();
      showToast('Datei geladen: ' + file.name);
    };
    reader.readAsText(file);
    fileInput.value = '';
  });

  async function saveFile() {
    const content = editor.getValue();

    if (fileHandle) {
      try {
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        showToast('Gespeichert: ' + fileHandle.name);
        return;
      } catch (err) {
        console.error(err);
      }
    }

    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: filenameEl.textContent || 'unbenannt.html',
          types: [{ description: 'HTML-Datei', accept: { 'text/html': ['.html'] } }]
        });
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
        fileHandle = handle;
        filenameEl.textContent = handle.name;
        showToast('Gespeichert: ' + handle.name);
        return;
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
        return;
      }
    }

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filenameEl.textContent || 'unbenannt.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('Heruntergeladen: ' + a.download);
  }

  btnLoad.addEventListener('click', loadFile);
  btnSave.addEventListener('click', saveFile);
  btnRefreshPreview.addEventListener('click', () => { updatePreview(); showToast('Vorschau aktualisiert.'); });

  /* ===================== ANSICHT / VOLLBILD ===================== */
  const layoutModes = ['split', 'editor', 'preview'];
  let layoutIndex = 0;
  btnLayout.addEventListener('click', () => {
    layoutIndex = (layoutIndex + 1) % layoutModes.length;
    workspace.classList.remove('mode-editor', 'mode-preview');
    const mode = layoutModes[layoutIndex];
    if (mode === 'editor') workspace.classList.add('mode-editor');
    if (mode === 'preview') workspace.classList.add('mode-preview');
    setTimeout(() => editor.refresh(), 150);
  });

  btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      (app.requestFullscreen || app.webkitRequestFullscreen)?.call(app);
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
    }
  });
  document.addEventListener('fullscreenchange', () => {
    btnFullscreen.classList.toggle('active', !!document.fullscreenElement);
    setTimeout(() => editor.refresh(), 200);
  });

  /* ===================== RESIZER ===================== */
  let dragging = false;
  resizer.addEventListener('mousedown', () => { dragging = true; document.body.style.cursor = 'col-resize'; });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const rect = workspace.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(80, Math.max(20, pct));
    paneEditor.style.flex = `0 0 ${clamped}%`;
    panePreview.style.flex = `1 1 ${100 - clamped}%`;
  });
  window.addEventListener('mouseup', () => {
    if (dragging) { dragging = false; document.body.style.cursor = ''; editor.refresh(); }
  });

  /* ===================== MODALS: ALLGEMEIN ===================== */
  function openModal(el) { el.classList.add('open'); }
  function closeModal(el) { el.classList.remove('open'); }

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', (e) => closeModal(e.target.closest('.modal-overlay')));
  });
  document.querySelectorAll('.modal-overlay').forEach((ov) => {
    ov.addEventListener('click', (e) => { if (e.target === ov) closeModal(ov); });
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
    }
  });

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ===================== MARKDOWN EINFÜGEN ===================== */
  function renderMdPreview() {
    markdownPreview.innerHTML = mdInput.value.trim() ? marked.parse(mdInput.value) : '<p style="color:#999">Vorschau erscheint hier …</p>';
  }
  mdInput.addEventListener('input', renderMdPreview);

  btnMarkdown.addEventListener('click', () => {
    mdInput.value = '';
    renderMdPreview();
    openModal(modalMarkdown);
    setTimeout(() => mdInput.focus(), 50);
  });

  btnInsertMarkdown.addEventListener('click', () => {
    const html = marked.parse(mdInput.value || '');
    if (!mdInput.value.trim()) { showToast('Kein Markdown eingegeben.'); return; }
    editor.replaceSelection(html + '\n');
    editor.focus();
    closeModal(modalMarkdown);
    updatePreview();
    showToast('Markdown als HTML eingefügt.');
  });

  /* ===================== SCRIPT-BUTTON EINFÜGEN ===================== */
  function buildButtonStyle(kind) {
    if (kind === 'gold') {
      return ' style="background:#c9a227;color:#161200;border:none;border-radius:6px;padding:10px 18px;font-family:\'Barlow\',sans-serif;font-weight:600;cursor:pointer;"';
    }
    if (kind === 'ghost') {
      return ' style="background:transparent;color:#c9a227;border:1px solid #c9a227;border-radius:6px;padding:10px 18px;font-family:\'Barlow\',sans-serif;font-weight:600;cursor:pointer;"';
    }
    return '';
  }

  btnScriptBtn.addEventListener('click', () => {
    scriptBtnLabel.value = '';
    scriptBtnCode.value = '';
    scriptBtnStyle.value = 'gold';
    openModal(modalScriptBtn);
    setTimeout(() => scriptBtnLabel.focus(), 50);
  });

  btnInsertScriptBtn.addEventListener('click', () => {
    const label = scriptBtnLabel.value.trim() || 'Button';
    const code = scriptBtnCode.value.trim();
    if (!code) { showToast('Bitte JavaScript-Code angeben.'); return; }
    const styleAttr = buildButtonStyle(scriptBtnStyle.value);
    const safeCode = code.replace(/"/g, '&quot;');
    const snippet = `<button type="button"${styleAttr} onclick="${safeCode}">${escapeHtml(label)}</button>`;
    editor.replaceSelection(snippet + '\n');
    editor.focus();
    closeModal(modalScriptBtn);
    updatePreview();
    showToast('Script-Button eingefügt.');
  });

  /* ===================== STYLES-PANEL ===================== */
  let styleEditor = null;

  function extractStyleBlock() {
    const src = editor.getValue();
    const match = src.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    return match ? match[1] : '/* Kein <style>-Block gefunden – wird beim Anwenden neu erstellt */\nbody {\n\n}';
  }

  function normalizeHex(hex) {
    if (hex.length === 4) return '#' + [...hex.slice(1)].map((c) => c + c).join('');
    if (hex.length > 7) return hex.slice(0, 7);
    return hex;
  }
  function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function renderSwatches(css) {
    const found = [...new Set(css.match(/#[0-9a-fA-F]{3,8}\b/g) || [])];
    colorSwatches.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'hint';
    p.textContent = found.length ? 'Im Style-Block gefundene Farben – Klick zum Ändern.' : 'Keine Hex-Farben im Style-Block gefunden.';
    colorSwatches.appendChild(p);
    if (!found.length) return;
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.flexWrap = 'wrap';
    row.style.gap = '8px';
    found.forEach((hex) => {
      const input = document.createElement('input');
      input.type = 'color';
      input.className = 'swatch';
      try { input.value = normalizeHex(hex); } catch (e) { input.value = '#c9a227'; }
      input.title = hex;
      input.addEventListener('input', () => {
        const cur = styleEditor.getValue();
        const re = new RegExp(escapeRegExp(hex), 'g');
        styleEditor.setValue(cur.replace(re, input.value));
      });
      row.appendChild(input);
    });
    colorSwatches.appendChild(row);
  }

  function openStylesPanel() {
    const cssContent = extractStyleBlock();
    if (!styleEditor) {
      styleEditor = CodeMirror(document.getElementById('styleEditorHost'), {
        value: cssContent,
        mode: 'css',
        theme: 'material-darker',
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 2
      });
    } else {
      styleEditor.setValue(cssContent);
    }
    renderSwatches(cssContent);
    panelStyles.classList.add('open');
    setTimeout(() => styleEditor.refresh(), 200);
  }

  function applyStyles() {
    const newCss = styleEditor.getValue();
    const src = editor.getValue();
    const block = `<style>\n${newCss}\n</style>`;
    const match = src.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    let updated;
    if (match) {
      updated = src.replace(match[0], block);
    } else if (/<\/head>/i.test(src)) {
      updated = src.replace(/<\/head>/i, block + '\n</head>');
    } else {
      updated = block + '\n' + src;
    }
    editor.setValue(updated);
    updatePreview();
    renderSwatches(newCss);
    showToast('Styles angewendet.');
  }

  btnStyles.addEventListener('click', openStylesPanel);
  closeStyles.addEventListener('click', () => panelStyles.classList.remove('open'));
  btnApplyStyles.addEventListener('click', applyStyles);

  /* ===================== INIT ===================== */
  updatePreview();
  editor.setCursor({ line: 0, ch: 0 });
})();
