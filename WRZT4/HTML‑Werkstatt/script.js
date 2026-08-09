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
<p>Lade eine eigene HTML-Datei über „Laden" oder bearbeite diese Seite direkt im Editor.</p>
</body>
</html>`;

  /* ===================== BAUSTEIN-BIBLIOTHEK ===================== */
  const SNIPPETS = [
    {
      name: 'Karte',
      desc: 'Karte mit Titel, Text und Aktions-Button.',
      code: `<div style="border:1px solid #2a2a2a;border-radius:8px;padding:20px;max-width:340px;background:#141414;color:#e8e8e4;">
  <h3 style="margin:0 0 8px;color:#c9a227;">Titel der Karte</h3>
  <p style="margin:0 0 14px;font-size:14px;line-height:1.5;">Kurzer Beschreibungstext für diese Karte.</p>
  <button style="background:#c9a227;color:#161200;border:none;border-radius:6px;padding:9px 16px;font-weight:600;cursor:pointer;">Mehr erfahren</button>
</div>`
    },
    {
      name: 'Button-Gruppe',
      desc: 'Primärer und sekundärer Button nebeneinander.',
      code: `<div style="display:flex;gap:10px;">
  <button style="background:#c9a227;color:#161200;border:none;border-radius:6px;padding:10px 18px;font-weight:600;cursor:pointer;">Bestätigen</button>
  <button style="background:transparent;color:#c9a227;border:1px solid #c9a227;border-radius:6px;padding:10px 18px;font-weight:600;cursor:pointer;">Abbrechen</button>
</div>`
    },
    {
      name: 'Formular',
      desc: 'Einfaches Kontaktformular mit Name, E-Mail, Nachricht.',
      code: `<form style="display:flex;flex-direction:column;gap:10px;max-width:360px;">
  <label style="font-size:13px;">Name
    <input type="text" name="name" style="display:block;width:100%;padding:8px 10px;margin-top:4px;border:1px solid #ccc;border-radius:5px;">
  </label>
  <label style="font-size:13px;">E-Mail
    <input type="email" name="email" style="display:block;width:100%;padding:8px 10px;margin-top:4px;border:1px solid #ccc;border-radius:5px;">
  </label>
  <label style="font-size:13px;">Nachricht
    <textarea name="message" rows="4" style="display:block;width:100%;padding:8px 10px;margin-top:4px;border:1px solid #ccc;border-radius:5px;"></textarea>
  </label>
  <button type="submit" style="background:#c9a227;color:#161200;border:none;border-radius:6px;padding:10px 16px;font-weight:600;cursor:pointer;">Absenden</button>
</form>`
    },
    {
      name: 'Navigation',
      desc: 'Horizontale Navigationsleiste mit Logo und Links.',
      code: `<nav style="display:flex;align-items:center;justify-content:space-between;padding:14px 24px;background:#141414;color:#e8e8e4;">
  <strong style="color:#c9a227;">Meine Seite</strong>
  <div style="display:flex;gap:20px;">
    <a href="#" style="color:#e8e8e4;text-decoration:none;">Start</a>
    <a href="#" style="color:#e8e8e4;text-decoration:none;">Über uns</a>
    <a href="#" style="color:#e8e8e4;text-decoration:none;">Kontakt</a>
  </div>
</nav>`
    },
    {
      name: 'Tabelle',
      desc: 'Datentabelle mit Kopfzeile und drei Beispielzeilen.',
      code: `<table style="border-collapse:collapse;width:100%;font-size:14px;">
  <thead>
    <tr style="background:#141414;color:#c9a227;">
      <th style="text-align:left;padding:8px 10px;border-bottom:1px solid #2a2a2a;">Name</th>
      <th style="text-align:left;padding:8px 10px;border-bottom:1px solid #2a2a2a;">Wert</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding:8px 10px;border-bottom:1px solid #eee;">Eintrag A</td><td style="padding:8px 10px;border-bottom:1px solid #eee;">123</td></tr>
    <tr><td style="padding:8px 10px;border-bottom:1px solid #eee;">Eintrag B</td><td style="padding:8px 10px;border-bottom:1px solid #eee;">456</td></tr>
    <tr><td style="padding:8px 10px;">Eintrag C</td><td style="padding:8px 10px;">789</td></tr>
  </tbody>
</table>`
    },
    {
      name: 'Bild mit Beschriftung',
      desc: 'Responsives Bild mit figcaption.',
      code: `<figure style="margin:0;max-width:480px;">
  <img src="https://via.placeholder.com/480x270" alt="Beschreibung" style="width:100%;height:auto;border-radius:6px;display:block;">
  <figcaption style="font-size:12px;color:#888;margin-top:6px;">Bildunterschrift hier einfügen.</figcaption>
</figure>`
    },
    {
      name: 'Akkordeon',
      desc: 'Aufklappbarer Bereich per &lt;details&gt;/&lt;summary&gt;.',
      code: `<details style="border:1px solid #2a2a2a;border-radius:6px;padding:10px 14px;background:#141414;color:#e8e8e4;">
  <summary style="cursor:pointer;color:#c9a227;font-weight:600;">Frage oder Titel</summary>
  <p style="margin:10px 0 0;font-size:14px;line-height:1.5;">Antwort oder erklärender Text, der beim Klick sichtbar wird.</p>
</details>`
    },
    {
      name: 'Video-Einbettung',
      desc: 'Responsiver 16:9-Container für ein eingebettetes Video.',
      code: `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe>
</div>`
    }
  ];

  /* ===================== ELEMENTE ===================== */
  const app = document.getElementById('app');
  const workspace = document.getElementById('workspace');
  const paneEditor = document.getElementById('paneEditor');
  const panePreview = document.getElementById('panePreview');
  const resizer = document.getElementById('resizer');
  const previewFrame = document.getElementById('previewFrame');
  const previewWrap = document.getElementById('previewWrap');
  const deviceSwitch = document.getElementById('deviceSwitch');
  const statusMsg = document.getElementById('statusMsg');
  const cursorPosEl = document.getElementById('cursorPos');

  const fileInput = document.getElementById('fileInput');
  const btnLoad = document.getElementById('btnLoad');
  const btnSave = document.getElementById('btnSave');
  const btnSaveAs = document.getElementById('btnSaveAs');
  const btnSearch = document.getElementById('btnSearch');
  const searchBar = document.getElementById('searchBar');
  const searchInput = document.getElementById('searchInput');
  const searchCount = document.getElementById('searchCount');
  const searchPrev = document.getElementById('searchPrev');
  const searchNext = document.getElementById('searchNext');
  const replaceInput = document.getElementById('replaceInput');
  const btnReplaceOne = document.getElementById('btnReplaceOne');
  const btnReplaceAll = document.getElementById('btnReplaceAll');
  const searchClose = document.getElementById('searchClose');
  const btnMarkdown = document.getElementById('btnMarkdown');
  const btnFormat = document.getElementById('btnFormat');
  const btnSnippets = document.getElementById('btnSnippets');
  const btnFont = document.getElementById('btnFont');
  const fontPopover = document.getElementById('fontPopover');
  const fontFamilySelect = document.getElementById('fontFamilySelect');
  const fontSizeRange = document.getElementById('fontSizeRange');
  const fontSizeValue = document.getElementById('fontSizeValue');
  const lineHeightRange = document.getElementById('lineHeightRange');
  const lineHeightValue = document.getElementById('lineHeightValue');

  const tabsScroll = document.getElementById('tabsScroll');
  const btnNewTab = document.getElementById('btnNewTab');

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

  const modalSnippets = document.getElementById('modalSnippets');
  const snippetGrid = document.getElementById('snippetGrid');

  let searchMarks = [];
  let currentMatchIdx = -1;

  /* ===================== HAUPT-EDITOR ===================== */
  const editor = CodeMirror(document.getElementById('editorHost'), {
    value: '',
    mode: 'htmlmixed',
    theme: 'material-darker',
    lineNumbers: true,
    lineWrapping: true,
    tabSize: 2,
    indentUnit: 2,
    autoCloseTags: true,
    extraKeys: {
      'Ctrl-F': () => { openSearch(); return false; },
      'Cmd-F': () => { openSearch(); return false; }
    }
  });

  let previewTimer = null;
  editor.on('change', () => {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(updatePreview, 350);
    if (searchBar.classList.contains('open') && searchInput.value) {
      clearTimeout(searchRefreshTimer);
      searchRefreshTimer = setTimeout(() => {
        currentMatchIdx = -1;
        refreshHighlights();
        updateSearchCount();
      }, 300);
    }
    markActiveTabDirty();
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

  /* ===================== TABS ===================== */
  let tabs = [];
  let activeTabId = null;
  let tabCounter = 0;

  function makeTabId() { return 'tab_' + (++tabCounter) + '_' + Date.now().toString(36); }

  function uniqueName(base) {
    const existing = new Set(tabs.map(t => t.name));
    if (!existing.has(base)) return base;
    const dot = base.lastIndexOf('.');
    const stem = dot > -1 ? base.slice(0, dot) : base;
    const ext = dot > -1 ? base.slice(dot) : '';
    let n = 2;
    while (existing.has(`${stem}-${n}${ext}`)) n++;
    return `${stem}-${n}${ext}`;
  }

  function createTab(name, content, handle) {
    const doc = new CodeMirror.Doc(content, 'htmlmixed');
    const tab = { id: makeTabId(), name: uniqueName(name), doc, fileHandle: handle || null, dirty: false };
    doc.on('change', () => { tab.dirty = true; renderTabs(); });
    tabs.push(tab);
    return tab;
  }

  function getActiveTab() { return tabs.find(t => t.id === activeTabId) || null; }

  function activateTab(id) {
    const tab = tabs.find(t => t.id === id);
    if (!tab) return;
    activeTabId = id;
    editor.swapDoc(tab.doc);
    renderTabs();
    updatePreview();
    if (searchBar.classList.contains('open')) onSearchInputChanged();
    editor.focus();
  }

  function isBlankTab(tab) {
    return tab && !tab.dirty && tab.doc.getValue() === STARTER && tab.fileHandle === null;
  }

  function newTabDefault() {
    const tab = createTab('unbenannt.html', STARTER, null);
    activateTab(tab.id);
    renderTabs();
    return tab;
  }

  function closeTab(id) {
    const idx = tabs.findIndex(t => t.id === id);
    if (idx === -1) return;
    const tab = tabs[idx];
    if (tab.dirty && !window.confirm(`„${tab.name}" hat ungespeicherte Änderungen. Trotzdem schließen?`)) return;
    tabs.splice(idx, 1);
    if (!tabs.length) {
      newTabDefault();
      return;
    }
    if (activeTabId === id) {
      const next = tabs[idx] || tabs[idx - 1];
      activateTab(next.id);
    }
    renderTabs();
  }

  function markActiveTabDirty() {
    const tab = getActiveTab();
    if (tab && !tab.dirty) { tab.dirty = true; renderTabs(); }
  }

  function renderTabs() {
    tabsScroll.innerHTML = '';
    tabs.forEach((tab) => {
      const el = document.createElement('div');
      el.className = 'tab' + (tab.id === activeTabId ? ' active' : '') + (tab.dirty ? ' dirty' : '');
      el.title = tab.name;
      const dot = document.createElement('span');
      dot.className = 'tab-dot';
      const label = document.createElement('span');
      label.textContent = tab.name;
      const closeBtn = document.createElement('button');
      closeBtn.className = 'tab-close';
      closeBtn.innerHTML = '&times;';
      closeBtn.title = 'Tab schließen';
      closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeTab(tab.id); });
      el.appendChild(dot);
      el.appendChild(label);
      el.appendChild(closeBtn);
      el.addEventListener('click', () => activateTab(tab.id));
      tabsScroll.appendChild(el);
    });
  }

  btnNewTab.addEventListener('click', () => newTabDefault());

  /* ===================== LADEN / SPEICHERN ===================== */
  async function loadFile() {
    if (window.showOpenFilePicker) {
      try {
        const [handle] = await window.showOpenFilePicker({
          types: [{ description: 'HTML-Datei', accept: { 'text/html': ['.html', '.htm'] } }]
        });
        const file = await handle.getFile();
        const text = await file.text();
        openLoadedContent(file.name, text, handle);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      }
    } else {
      fileInput.click();
    }
  }

  function openLoadedContent(name, text, handle) {
    const active = getActiveTab();
    if (isBlankTab(active)) {
      active.name = uniqueName(name);
      active.doc.setValue(text);
      active.fileHandle = handle || null;
      active.dirty = false;
      activateTab(active.id);
    } else {
      const tab = createTab(name, text, handle || null);
      activateTab(tab.id);
    }
    showToast('Datei geladen: ' + name);
  }

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => openLoadedContent(file.name, reader.result, null);
    reader.readAsText(file);
    fileInput.value = '';
  });

  async function saveFile() {
    const tab = getActiveTab();
    if (!tab) return;
    const content = editor.getValue();

    if (tab.fileHandle) {
      try {
        const writable = await tab.fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        tab.dirty = false;
        renderTabs();
        showToast('Gespeichert: ' + tab.fileHandle.name);
        return;
      } catch (err) {
        console.error(err);
      }
    }
    await saveFileAs();
  }

  async function saveFileAs() {
    const tab = getActiveTab();
    if (!tab) return;
    const content = editor.getValue();

    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: tab.name || 'unbenannt.html',
          types: [{ description: 'HTML-Datei', accept: { 'text/html': ['.html'] } }]
        });
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
        tab.fileHandle = handle;
        tab.name = uniqueName(handle.name);
        tab.dirty = false;
        renderTabs();
        showToast('Gespeichert unter: ' + handle.name);
        return;
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
        return;
      }
    }

    let name = window.prompt('Dateiname:', tab.name || 'unbenannt.html');
    if (!name) return;
    if (!/\.html?$/i.test(name)) name += '.html';
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    tab.fileHandle = null;
    tab.name = uniqueName(name);
    tab.dirty = false;
    renderTabs();
    showToast('Heruntergeladen: ' + name);
  }

  btnLoad.addEventListener('click', loadFile);
  btnSave.addEventListener('click', saveFile);
  btnSaveAs.addEventListener('click', saveFileAs);
  document.getElementById('btnRefreshPreview').addEventListener('click', () => { updatePreview(); showToast('Vorschau aktualisiert.'); });

  /* ===================== ANSICHT / VOLLBILD ===================== */
  const layoutModes = ['split', 'editor', 'preview'];
  let layoutIndex = 0;
  document.getElementById('btnLayout').addEventListener('click', () => {
    layoutIndex = (layoutIndex + 1) % layoutModes.length;
    workspace.classList.remove('mode-editor', 'mode-preview');
    const mode = layoutModes[layoutIndex];
    if (mode === 'editor') workspace.classList.add('mode-editor');
    if (mode === 'preview') workspace.classList.add('mode-preview');
    setTimeout(() => editor.refresh(), 150);
  });

  const btnFullscreen = document.getElementById('btnFullscreen');
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

  /* ===================== GERÄTE-VORSCHAU ===================== */
  deviceSwitch.addEventListener('click', (e) => {
    const btn = e.target.closest('.device-btn');
    if (!btn) return;
    deviceSwitch.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    previewWrap.classList.remove('device-desktop', 'device-tablet', 'device-mobile');
    previewWrap.classList.add('device-' + btn.dataset.device);
  });

  /* ===================== SCHRIFT & ZOOM ===================== */
  function positionPopover() {
    const rect = btnFont.getBoundingClientRect();
    fontPopover.style.top = (rect.bottom + 8) + 'px';
    let right = window.innerWidth - rect.right;
    if (right < 10) right = 10;
    fontPopover.style.right = right + 'px';
  }

  btnFont.addEventListener('click', () => {
    if (fontPopover.classList.contains('open')) {
      fontPopover.classList.remove('open');
    } else {
      positionPopover();
      fontPopover.classList.add('open');
    }
  });
  document.addEventListener('click', (e) => {
    if (!fontPopover.contains(e.target) && e.target !== btnFont && !btnFont.contains(e.target)) {
      fontPopover.classList.remove('open');
    }
  });
  window.addEventListener('resize', () => { if (fontPopover.classList.contains('open')) positionPopover(); });

  fontFamilySelect.addEventListener('change', () => {
    document.documentElement.style.setProperty('--editor-font', fontFamilySelect.value);
    editor.refresh();
  });
  fontSizeRange.addEventListener('input', () => {
    document.documentElement.style.setProperty('--editor-size', fontSizeRange.value + 'px');
    fontSizeValue.textContent = fontSizeRange.value + 'px';
    editor.refresh();
  });
  lineHeightRange.addEventListener('input', () => {
    document.documentElement.style.setProperty('--editor-lh', lineHeightRange.value);
    lineHeightValue.textContent = lineHeightRange.value;
    editor.refresh();
  });

  /* ===================== FORMATIEREN ===================== */
  btnFormat.addEventListener('click', () => {
    if (typeof html_beautify !== 'function') { showToast('Formatierer konnte nicht geladen werden.'); return; }
    const formatted = html_beautify(editor.getValue(), {
      indent_size: 2,
      wrap_line_length: 0,
      preserve_newlines: true,
      max_preserve_newlines: 2,
      indent_inner_html: false,
      extra_liners: []
    });
    editor.setValue(formatted);
    updatePreview();
    showToast('Code formatiert.');
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
    if (!mdInput.value.trim()) { showToast('Kein Markdown eingegeben.'); return; }
    const html = marked.parse(mdInput.value || '');
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

  /* ===================== BAUSTEIN-BIBLIOTHEK ===================== */
  function renderSnippetGrid() {
    snippetGrid.innerHTML = '';
    SNIPPETS.forEach((snip) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'snippet-card';
      card.innerHTML = `<span class="sc-name">${escapeHtml(snip.name)}</span><span class="sc-desc">${snip.desc}</span>`;
      card.addEventListener('click', () => {
        editor.replaceSelection(snip.code + '\n');
        updatePreview();
        showToast(`„${snip.name}" eingefügt.`);
      });
      snippetGrid.appendChild(card);
    });
  }
  renderSnippetGrid();

  btnSnippets.addEventListener('click', () => openModal(modalSnippets));

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

  document.getElementById('btnStyles').addEventListener('click', openStylesPanel);
  closeStyles.addEventListener('click', () => panelStyles.classList.remove('open'));
  btnApplyStyles.addEventListener('click', applyStyles);

  /* ===================== SUCHEN & ERSETZEN ===================== */
  function clearMarks() {
    searchMarks.forEach((m) => m.mark.clear());
    searchMarks = [];
  }

  function refreshHighlights() {
    clearMarks();
    const q = searchInput.value;
    if (!q) return;
    const cur = editor.getSearchCursor(q, { line: 0, ch: 0 }, { caseFold: true });
    while (cur.findNext()) {
      const from = cur.from(), to = cur.to();
      const mark = editor.markText(from, to, { className: 'search-highlight' });
      searchMarks.push({ mark, from, to });
    }
  }

  function updateSearchCount() {
    const q = searchInput.value;
    if (!q) { searchCount.textContent = ''; return; }
    const total = searchMarks.length;
    if (!total) { searchCount.textContent = 'Keine Treffer'; return; }
    const idx = currentMatchIdx >= 0 ? currentMatchIdx + 1 : 1;
    searchCount.textContent = `${idx} von ${total}`;
  }

  function findMatch(backwards) {
    const q = searchInput.value;
    if (!q || !searchMarks.length) { updateSearchCount(); return; }
    const start = backwards ? editor.getCursor('from') : editor.getCursor('to');
    let cur = editor.getSearchCursor(q, start, { caseFold: true });
    let found = backwards ? cur.findPrevious() : cur.findNext();
    if (!found) {
      const wrapStart = backwards ? { line: editor.lineCount(), ch: 0 } : { line: 0, ch: 0 };
      cur = editor.getSearchCursor(q, wrapStart, { caseFold: true });
      found = backwards ? cur.findPrevious() : cur.findNext();
    }
    if (found) {
      const from = cur.from(), to = cur.to();
      editor.setSelection(from, to);
      editor.scrollIntoView({ from, to }, 60);
      currentMatchIdx = searchMarks.findIndex((m) =>
        m.from.line === from.line && m.from.ch === from.ch && m.to.line === to.line && m.to.ch === to.ch);
    }
    updateSearchCount();
  }

  function onSearchInputChanged() {
    currentMatchIdx = -1;
    refreshHighlights();
    if (searchMarks.length) findMatch(false);
    else updateSearchCount();
  }

  function openSearch() {
    searchBar.classList.add('open');
    searchInput.focus();
    searchInput.select();
    onSearchInputChanged();
  }
  function closeSearch() {
    clearMarks();
    searchBar.classList.remove('open');
    editor.focus();
  }

  function replaceOne() {
    const q = searchInput.value;
    if (!q) return;
    const sel = editor.getSelection();
    if (sel && sel.toLowerCase() === q.toLowerCase()) {
      editor.replaceSelection(replaceInput.value);
    }
    currentMatchIdx = -1;
    refreshHighlights();
    if (searchMarks.length) findMatch(false); else updateSearchCount();
    updatePreview();
  }

  function replaceAll() {
    const q = searchInput.value;
    if (!q) return;
    const r = replaceInput.value;
    const cur = editor.getSearchCursor(q, { line: 0, ch: 0 }, { caseFold: true });
    let count = 0;
    editor.operation(() => {
      while (cur.findNext()) {
        cur.replace(r);
        count++;
      }
    });
    currentMatchIdx = -1;
    refreshHighlights();
    updateSearchCount();
    updatePreview();
    showToast(`${count} Ersetzung(en) durchgeführt.`);
  }

  let searchRefreshTimer = null;

  btnSearch.addEventListener('click', () => {
    if (searchBar.classList.contains('open')) closeSearch();
    else openSearch();
  });
  searchInput.addEventListener('input', onSearchInputChanged);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); findMatch(e.shiftKey); }
    if (e.key === 'Escape') { e.preventDefault(); closeSearch(); }
  });
  replaceInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); replaceOne(); }
    if (e.key === 'Escape') { e.preventDefault(); closeSearch(); }
  });
  searchNext.addEventListener('click', () => findMatch(false));
  searchPrev.addEventListener('click', () => findMatch(true));
  btnReplaceOne.addEventListener('click', replaceOne);
  btnReplaceAll.addEventListener('click', replaceAll);
  searchClose.addEventListener('click', closeSearch);

  /* ===================== INIT ===================== */
  newTabDefault();
})();
