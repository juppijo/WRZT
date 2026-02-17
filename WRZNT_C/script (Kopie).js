(function () {
  const pages = Array.from(document.querySelectorAll('.pg'));
  const N = pages.length;
  let cur = 0;
  const tocData = pages.map(p => ({ title: p.dataset.t || '', sub: p.dataset.s || '' }));

  /* ── Build TOC list ── */
  const tocList = document.getElementById('tl');
  tocData.forEach((d, i) => {
    const el = document.createElement('div');
    el.className = 'ti' + (i === 0 ? ' on' : '');
    el.innerHTML = `<span class="tn">${String(i + 1).padStart(2, '0')}</span>
      <div><div class="tt">${d.title}</div><div class="ts">${d.sub}</div></div>`;
    el.addEventListener('click', () => { goTo(i); closeToc(); });
    tocList.appendChild(el);
  });

  /* ── Navigation ── */
  function goTo(idx) {
    pages[cur].classList.remove('on');
    cur = Math.max(0, Math.min(N - 1, idx));
    pages[cur].classList.add('on');
    updateUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateUI() {
    document.getElementById('prevBtn').disabled = cur === 0;
    document.getElementById('nextBtn').disabled = cur === N - 1;
    document.getElementById('curP').textContent = cur + 1;
    document.getElementById('totP').textContent = N;
    document.getElementById('pb').style.width = (cur / (N - 1) * 100) + '%';
    document.getElementById('chapind').textContent = tocData[cur]?.title || '';
    document.querySelectorAll('.ti').forEach((el, i) => el.classList.toggle('on', i === cur));
  }

  document.getElementById('prevBtn').addEventListener('click', () => goTo(cur - 1));
  document.getElementById('nextBtn').addEventListener('click', () => goTo(cur + 1));

  /* ── TOC overlay ── */
  let tocOpen = false;
  function openToc() { document.getElementById('tov').classList.add('on'); tocOpen = true; }
  function closeToc() { document.getElementById('tov').classList.remove('on'); tocOpen = false; }
  document.getElementById('tocBtn').addEventListener('click', () => tocOpen ? closeToc() : openToc());
  document.getElementById('tcc').addEventListener('click', closeToc);
  document.getElementById('tov').addEventListener('click', e => {
    if (e.target === document.getElementById('tov')) closeToc();
  });

  /* ── Dark / Light mode ── */
  let dark = true;
  document.getElementById('dmBtn').addEventListener('click', () => {
    dark = !dark;
    document.body.classList.toggle('light', !dark);
    document.getElementById('dmBtn').textContent = dark ? '☀️ Hell' : '🌙 Dunkel';
  });

  /* ── Keyboard navigation ── */
  document.addEventListener('keydown', e => {
    if (['ArrowRight', 'ArrowDown'].includes(e.key)) goTo(cur + 1);
    if (['ArrowLeft', 'ArrowUp'].includes(e.key)) goTo(cur - 1);
  });

  /* ── Formula / Card toggle (called inline via onclick) ── */
  window.toggleF = function (el) { el.classList.toggle('op'); };

  updateUI();
})();
