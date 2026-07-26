(function(){
  const catOrder = ["manifest","herleitung","kosmologie","formeln","tools","sim","sonstiges","doku","assets"];
  let activeCat = "all";
  let query = "";

  function encodePath(p){
    return p.split('/').map(encodeURIComponent).join('/');
  }

  function esc(str){
    if(!str) return '';
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function renderStats(){
    const total = FILES.length;
    const dupCount = FILES.filter(f => f.n && f.n.toLowerCase().includes('duplikat')).length;
    const starCount = FILES.filter(f => f.n && f.n.includes('★')).length;
    const html = `
      <div class="stat"><span class="num">${total}</span><span class="lbl">Dateien erfasst</span></div>
      <div class="stat"><span class="num">${catOrder.length}</span><span class="lbl">Kategorien</span></div>
      <div class="stat"><span class="num">${dupCount}</span><span class="lbl">erkannte Duplikate</span></div>
      <div class="stat"><span class="num">${starCount}</span><span class="lbl">Kern-Dokumente</span></div>
    `;
    document.getElementById('statRow').innerHTML = html;
  }

  function renderChips(){
    const row = document.getElementById('chipRow');
    const allBtn = document.createElement('div');
    allBtn.className = 'chip' + (activeCat === 'all' ? ' active' : '');
    allBtn.textContent = `Alle (${FILES.length})`;
    allBtn.onclick = () => { activeCat = 'all'; render(); };
    row.innerHTML = '';
    row.appendChild(allBtn);

    catOrder.forEach(key => {
      const count = FILES.filter(f => f.c === key).length;
      if(!count) return;
      const chip = document.createElement('div');
      chip.className = 'chip' + (activeCat === key ? ' active' : '');
      chip.innerHTML = `${CATS[key].label} <span class="count">${count}</span>`;
      chip.onclick = () => { activeCat = (activeCat === key ? 'all' : key); render(); };
      row.appendChild(chip);
    });
  }

  function matches(f){
    if(activeCat !== 'all' && f.c !== activeCat) return false;
    if(!query) return true;
    const hay = (f.p + ' ' + f.t + ' ' + (f.n||'')).toLowerCase();
    return hay.includes(query);
  }

  function badgeFor(note){
    if(!note) return '';
    let cls = 'badge-note';
    if(note.includes('★')) cls = 'badge-star';
    else if(note.toLowerCase().includes('duplikat') || note.toLowerCase().includes('kopie')) cls = 'badge-dup';
    return `<span class="badge ${cls}">${esc(note)}</span>`;
  }

  function render(){
    renderChips();
    const results = document.getElementById('results');
    const filtered = FILES.filter(matches);

    if(filtered.length === 0){
      results.innerHTML = '';
      document.getElementById('emptyState').hidden = false;
      return;
    }
    document.getElementById('emptyState').hidden = true;

    let html = '';
    catOrder.forEach(key => {
      const items = filtered.filter(f => f.c === key);
      if(!items.length) return;
      html += `<section class="cat-section">
        <div class="cat-header">
          <h3>${CATS[key].label}</h3>
          <span class="cat-count">${items.length} ${items.length === 1 ? 'Datei' : 'Dateien'}</span>
        </div>
        <p class="cat-desc">${CATS[key].desc}</p>
        <ul class="file-list">`;
      items.forEach(f => {
        html += `<li class="file-item">
          <a class="file-link" href="${encodePath(f.p)}" target="_blank" rel="noopener">
            <div class="file-title-row">
              <span class="file-title">${esc(f.t)}</span>
              ${badgeFor(f.n)}
            </div>
            <span class="file-path">${esc(f.p)}</span>
          </a>
        </li>`;
      });
      html += `</ul></section>`;
    });
    results.innerHTML = html;
  }

  document.getElementById('searchBox').addEventListener('input', (e) => {
    query = e.target.value.trim().toLowerCase();
    render();
  });

  document.getElementById('fsBtn').addEventListener('click', () => {
    if(!document.fullscreenElement){
      document.documentElement.requestFullscreen().catch(()=>{});
    } else {
      document.exitFullscreen();
    }
  });

  renderStats();
  render();
})();
