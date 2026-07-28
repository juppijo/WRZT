(() => {
  const STORAGE_KEY = 'htmlMergerBlocks';
  const THEME_STORAGE_KEY = 'htmlMergerTheme';

  const THEMES = {
    'dark-gold': {
      label: 'Dark Gold',
      fontImport: 'family=Bebas+Neue&family=Barlow:wght@400;500;600;700',
      headingFont: "'Bebas Neue', sans-serif",
      bodyFont: "'Barlow', sans-serif",
      bg: '#121110', panel: '#1a1815', border: '#33302a',
      accent: '#c9a227', text: '#ece7dd', muted: '#a29c8f',
    },
    'midnight-blue': {
      label: 'Midnight Blue',
      fontImport: 'family=Oswald:wght@500;600&family=Inter:wght@400;500;600',
      headingFont: "'Oswald', sans-serif",
      bodyFont: "'Inter', sans-serif",
      bg: '#0f1420', panel: '#161d2e', border: '#26304a',
      accent: '#5b9cf6', text: '#e5eaf5', muted: '#93a1c2',
    },
    'forest-emerald': {
      label: 'Forest Emerald',
      fontImport: 'family=Poppins:wght@500;600&family=Barlow:wght@400;500;600',
      headingFont: "'Poppins', sans-serif",
      bodyFont: "'Barlow', sans-serif",
      bg: '#0f1712', panel: '#172219', border: '#25352a',
      accent: '#42b57f', text: '#e3ede6', muted: '#8fa89b',
    },
    'crimson-ember': {
      label: 'Crimson Ember',
      fontImport: 'family=Bebas+Neue&family=Barlow:wght@400;500;600',
      headingFont: "'Bebas Neue', sans-serif",
      bodyFont: "'Barlow', sans-serif",
      bg: '#1a1010', panel: '#241515', border: '#3a2020',
      accent: '#e0554a', text: '#f2e4e0', muted: '#b88f89',
    },
    'light-clean': {
      label: 'Light Clean',
      fontImport: 'family=Playfair+Display:wght@600;700&family=Barlow:wght@400;500;600',
      headingFont: "'Playfair Display', serif",
      bodyFont: "'Barlow', sans-serif",
      bg: '#f5f3ee', panel: '#ffffff', border: '#dedad0',
      accent: '#b8860b', text: '#242220', muted: '#6b665c',
    },
    'violet-neon': {
      label: 'Violet Neon',
      fontImport: 'family=Space+Grotesk:wght@500;600;700',
      headingFont: "'Space Grotesk', sans-serif",
      bodyFont: "'Space Grotesk', sans-serif",
      bg: '#130f1c', panel: '#1d1729', border: '#332a45',
      accent: '#b06bfa', text: '#ece7f7', muted: '#a396bd',
    },
  };
  const DEFAULT_THEME = 'dark-gold';

  const els = {
    app: document.getElementById('app'),
    titleInput: document.getElementById('blockTitle'),
    htmlInput: document.getElementById('htmlInput'),
    btnAdd: document.getElementById('btnAdd'),
    btnSave: document.getElementById('btnSave'),
    btnLoad: document.getElementById('btnLoad'),
    fileInput: document.getElementById('fileInput'),
    btnClear: document.getElementById('btnClear'),
    btnFullscreen: document.getElementById('btnFullscreen'),
    blockList: document.getElementById('blockList'),
    blockCount: document.getElementById('blockCount'),
    previewFrame: document.getElementById('previewFrame'),
    themeSelect: document.getElementById('themeSelect'),
  };

  let blocks = [];
  let currentTheme = DEFAULT_THEME;

  // ---------- Persistenz ----------

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) blocks = JSON.parse(raw);
    } catch (e) {
      blocks = [];
    }
    try {
      const theme = localStorage.getItem(THEME_STORAGE_KEY);
      if (theme && THEMES[theme]) currentTheme = theme;
    } catch (e) {
      currentTheme = DEFAULT_THEME;
    }
  }

  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    } catch (e) {
      /* ignore quota errors */
    }
  }

  function populateThemeSelect() {
    els.themeSelect.innerHTML = '';
    Object.entries(THEMES).forEach(([key, theme]) => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = theme.label;
      els.themeSelect.appendChild(opt);
    });
    els.themeSelect.value = currentTheme;
  }

  // ---------- Block-Verwaltung ----------

  function addBlock() {
    const html = els.htmlInput.value.trim();
    if (!html) return;
    const title = els.titleInput.value.trim() || `Abschnitt ${blocks.length + 1}`;
    blocks.push({ id: crypto.randomUUID(), title, html });
    els.htmlInput.value = '';
    els.titleInput.value = '';
    afterChange();
  }

  function removeBlock(id) {
    blocks = blocks.filter(b => b.id !== id);
    afterChange();
  }

  function moveBlock(id, dir) {
    const idx = blocks.findIndex(b => b.id === id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= blocks.length) return;
    [blocks[idx], blocks[newIdx]] = [blocks[newIdx], blocks[idx]];
    afterChange();
  }

  function clearAll() {
    if (!blocks.length) return;
    if (!confirm('Wirklich alle Abschnitte löschen?')) return;
    blocks = [];
    afterChange();
  }

  function afterChange() {
    saveToStorage();
    renderList();
    renderPreview();
  }

  // ---------- Rendering: Liste ----------

  function renderList() {
    els.blockCount.textContent = blocks.length;
    els.blockList.innerHTML = '';

    if (!blocks.length) {
      const hint = document.createElement('li');
      hint.className = 'empty-hint';
      hint.textContent = 'Noch keine Abschnitte hinzugefügt.';
      els.blockList.appendChild(hint);
      return;
    }

    blocks.forEach((block, i) => {
      const li = document.createElement('li');
      li.className = 'block-item';

      const name = document.createElement('span');
      name.className = 'block-name';
      name.textContent = block.title;

      const actions = document.createElement('div');
      actions.className = 'block-actions';

      const upBtn = mkIconBtn('↑', () => moveBlock(block.id, -1));
      const downBtn = mkIconBtn('↓', () => moveBlock(block.id, 1));
      const delBtn = mkIconBtn('✕', () => removeBlock(block.id));
      delBtn.classList.add('danger');

      if (i === 0) upBtn.disabled = true;
      if (i === blocks.length - 1) downBtn.disabled = true;

      actions.append(upBtn, downBtn, delBtn);
      li.append(name, actions);
      els.blockList.appendChild(li);
    });
  }

  function mkIconBtn(label, onClick) {
    const btn = document.createElement('button');
    btn.className = 'icon-btn';
    btn.textContent = label;
    btn.addEventListener('click', onClick);
    return btn;
  }

  // ---------- Rendering: Vorschau / Export ----------

  function buildMergedHtml() {
    const theme = THEMES[currentTheme] || THEMES[DEFAULT_THEME];

    const sections = blocks.map(b => (
      `  <section class="merged-block" data-title="${escapeAttr(b.title)}">\n` +
      `    <h2 class="merged-block-title">${escapeHtml(b.title)}</h2>\n` +
      `    <div class="merged-block-content">\n${b.html}\n    </div>\n` +
      `  </section>`
    )).join('\n\n');

    return `<!DOCTYPE html>
<html lang="de" data-theme="${currentTheme}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Zusammengeführte Seite</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?${theme.fontImport}&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: ${theme.bg};
    --panel: ${theme.panel};
    --border: ${theme.border};
    --accent: ${theme.accent};
    --text: ${theme.text};
    --muted: ${theme.muted};
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: ${theme.bodyFont};
    line-height: 1.6;
    padding: 40px 24px;
  }
  .merged-block {
    max-width: 900px;
    margin: 0 auto 40px;
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 28px 32px;
  }
  .merged-block-title {
    font-family: ${theme.headingFont};
    color: var(--accent);
    font-size: 28px;
    letter-spacing: 0.02em;
    margin: 0 0 16px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 10px;
  }
  .merged-block-content img { max-width: 100%; }
  .merged-block-content a { color: var(--accent); }
</style>
</head>
<body>
${sections || '  <!-- Keine Abschnitte -->'}
</body>
</html>`;
  }

  function renderPreview() {
    els.previewFrame.srcdoc = buildMergedHtml();
  }

  function escapeHtml(str) {
    return str.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, '&quot;');
  }

  // ---------- Speichern ----------

  function saveFile() {
    const html = buildMergedHtml();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `merged-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // ---------- Laden ----------

  function loadFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      const { theme, blocks: parsedBlocks } = parseMergedHtml(text);
      blocks = parsedBlocks;
      currentTheme = theme;
      els.themeSelect.value = currentTheme;
      afterChange();
    };
    reader.readAsText(file);
  }

  function parseMergedHtml(text) {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    const sections = doc.querySelectorAll('.merged-block');
    const themeAttr = doc.documentElement.getAttribute('data-theme');
    const theme = THEMES[themeAttr] ? themeAttr : DEFAULT_THEME;

    if (sections.length) {
      const parsedBlocks = Array.from(sections).map(sec => {
        const title = sec.getAttribute('data-title') || 'Abschnitt';
        const content = sec.querySelector('.merged-block-content');
        return {
          id: crypto.randomUUID(),
          title,
          html: content ? content.innerHTML.trim() : sec.innerHTML.trim(),
        };
      });
      return { theme, blocks: parsedBlocks };
    }

    // Fallback: gesamte Datei als ein einziger Block
    const bodyHtml = doc.body ? doc.body.innerHTML.trim() : text;
    return {
      theme,
      blocks: [{ id: crypto.randomUUID(), title: 'Geladene Datei', html: bodyHtml }],
    };
  }

  // ---------- Vollbild ----------

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      els.app.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  }

  // ---------- Events ----------

  els.btnAdd.addEventListener('click', addBlock);
  els.htmlInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.ctrlKey) addBlock();
  });
  els.btnSave.addEventListener('click', saveFile);
  els.btnLoad.addEventListener('click', () => els.fileInput.click());
  els.fileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) loadFile(file);
    e.target.value = '';
  });
  els.btnClear.addEventListener('click', clearAll);
  els.btnFullscreen.addEventListener('click', toggleFullscreen);
  els.themeSelect.addEventListener('change', () => {
    currentTheme = els.themeSelect.value;
    afterChange();
  });

  // ---------- Init ----------

  loadFromStorage();
  populateThemeSelect();
  renderList();
  renderPreview();
})();
