/* ==========================================================
   PHYSIK RECHNER — LaTeX Formel-Editor
   ========================================================== */

/* ---------- Physikalische Konstanten (exakte / CODATA-Werte) ---------- */
const PHYSICS_CONSTANTS = {
  c:          { value: 299792458,        name: "Lichtgeschwindigkeit (Vakuum)",     unit: "m/s" },
  g:          { value: 9.80665,          name: "Erdbeschleunigung (Normwert)",      unit: "m/s²" },
  G:          { value: 6.6743e-11,       name: "Gravitationskonstante",             unit: "N·m²/kg²" },
  h:          { value: 6.62607015e-34,   name: "Planck-Konstante",                  unit: "J·s" },
  hbar:       { value: 1.054571817e-34,  name: "reduzierte Planck-Konstante",       unit: "J·s" },
  e:          { value: 1.602176634e-19,  name: "Elementarladung",                   unit: "C" },
  kB:         { value: 1.380649e-23,     name: "Boltzmann-Konstante",               unit: "J/K" },
  NA:         { value: 6.02214076e23,    name: "Avogadro-Konstante",                unit: "1/mol" },
  epsilon0:   { value: 8.8541878128e-12, name: "elektr. Feldkonstante ε₀",          unit: "F/m" },
  varepsilon0:{ value: 8.8541878128e-12, name: "elektr. Feldkonstante ε₀",          unit: "F/m" },
  mu0:        { value: 1.25663706212e-6, name: "magn. Feldkonstante μ₀",            unit: "H/m" },
  me:         { value: 9.1093837015e-31, name: "Elektronenmasse",                   unit: "kg" },
  mp:         { value: 1.67262192369e-27,name: "Protonenmasse",                     unit: "kg" },
  mn:         { value: 1.67492749804e-27,name: "Neutronenmasse",                    unit: "kg" },
  u:          { value: 1.66053906660e-27,name: "atomare Masseneinheit",             unit: "kg" },
  R:          { value: 8.314462618,      name: "universelle Gaskonstante",          unit: "J/(mol·K)" },
  sigma:      { value: 5.670374419e-8,   name: "Stefan-Boltzmann-Konstante",        unit: "W/(m²K⁴)" },
  atm:        { value: 101325,           name: "Normdruck (1 atm)",                 unit: "Pa" },
};

const GREEK_WORDS = new Set([
  "alpha","beta","gamma","delta","epsilon","varepsilon","zeta","eta","theta",
  "vartheta","iota","kappa","lambda","mu","nu","xi","rho","varrho","sigma",
  "varsigma","tau","upsilon","phi","varphi","chi","psi","omega",
  "Gamma","Delta","Theta","Lambda","Xi","Sigma","Upsilon","Phi","Psi","Omega"
]);

/* LaTeX-Funktionsnamen -> eindeutige, nicht-alphanumerische Marker,
   damit die spätere "implizite Multiplikation"-Erkennung sie nicht antastet. */
const FUNC_MAP = {
  "\\sin": "\u2460", "\\cos": "\u2461", "\\tan": "\u2462",
  "\\arcsin": "\u2463", "\\arccos": "\u2464", "\\arctan": "\u2465",
  "\\sinh": "\u2466", "\\cosh": "\u2467", "\\tanh": "\u2468",
  "\\ln": "\u2469", "\\log": "\u246A", "\\exp": "\u246B"
};
const FUNC_JS = {
  "\u2460": "Math.sin", "\u2461": "Math.cos", "\u2462": "Math.tan",
  "\u2463": "Math.asin", "\u2464": "Math.acos", "\u2465": "Math.atan",
  "\u2466": "Math.sinh", "\u2467": "Math.cosh", "\u2468": "Math.tanh",
  "\u2469": "Math.log", "\u246A": "Math.log10", "\u246B": "Math.exp",
  "\u246C": "Math.sqrt", "\u246D": "Math.abs", "\u246E": "Math.PI"
};
// Marker, die immer direkt von "(" gefolgt werden (Funktionsaufrufe) - hier KEIN "*" einfügen
const CALL_MARKER_CHARS = "\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D";
// Marker, der wie ein Zahlenwert behandelt wird (kein Funktionsaufruf) - hier IMMER "*" einfügen
const VALUE_MARKER_CHARS = "\u246E";
const MARKER_CHARS = CALL_MARKER_CHARS + VALUE_MARKER_CHARS;
const PI_MARKER = "\u246E";

/* ==========================================================
   LATEX -> JS AUSDRUCK
   ========================================================== */

function findMatchingBrace(str, openIndex) {
  let depth = 1;
  for (let i = openIndex + 1; i < str.length; i++) {
    if (str[i] === "{") depth++;
    else if (str[i] === "}") { depth--; if (depth === 0) return i; }
  }
  return -1;
}

/* rekursiv \frac{a}{b}, \sqrt{a}, \sqrt[n]{a} in Klammer-JS umwandeln */
function resolveFracSqrt(str) {
  let out = "";
  for (let i = 0; i < str.length; i++) {
    if (str.startsWith("\\frac", i) && str[i + 5] === "{") {
      const openA = i + 5;
      const closeA = findMatchingBrace(str, openA);
      const openB = closeA + 1;
      if (str[openB] === "{") {
        const closeB = findMatchingBrace(str, openB);
        const a = resolveFracSqrt(str.slice(openA + 1, closeA));
        const b = resolveFracSqrt(str.slice(openB + 1, closeB));
        out += `((${a})/(${b}))`;
        i = closeB;
        continue;
      }
    }
    if (str.startsWith("\\sqrt", i)) {
      let j = i + 5;
      if (str[j] === "[") {
        const closeBr = str.indexOf("]", j);
        const nStr = resolveFracSqrt(str.slice(j + 1, closeBr));
        j = closeBr + 1;
        if (str[j] === "{") {
          const close = findMatchingBrace(str, j);
          const inner = resolveFracSqrt(str.slice(j + 1, close));
          out += `Math.pow((${inner}),1/(${nStr}))`;
          i = close;
          continue;
        }
      } else if (str[j] === "{") {
        const close = findMatchingBrace(str, j);
        const inner = resolveFracSqrt(str.slice(j + 1, close));
        out += `\u246C((${inner}))`;
        i = close;
        continue;
      }
    }
    out += str[i];
  }
  return out;
}

/* ^{...} und _{...} (Klammer-Varianten) auflösen, Rest übernehmen */
function resolvePowerBraces(str) {
  let out = "";
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === "^" && str[i + 1] === "{") {
      const close = findMatchingBrace(str, i + 1);
      const inner = resolvePowerBraces(str.slice(i + 2, close));
      out += `**(${inner})`;
      i = close;
      continue;
    }
    if (ch === "^") { out += "**"; continue; }
    out += ch;
  }
  return out;
}

function latexToJS(rawLatex) {
  const protectedIdentifiers = new Set();
  let s = rawLatex;

  // Bereinigen
  s = s.replace(/\$/g, "");
  s = s.replace(/\\left|\\right/g, "");
  s = s.replace(/\\,|\\;|\\!|\\quad|\\qquad|\\ /g, " ");
  s = s.replace(/\n/g, " ");

  // Deutsches Dezimalkomma zwischen Ziffern -> Punkt (z.B. 35,26 -> 35.26)
  s = s.replace(/([0-9]),([0-9])/g, "$1.$2");

  // Gradangaben mit \circ: 35.26^\circ -> (35.26*PI/180)
  s = s.replace(/([A-Za-z0-9.]+)\^\\circ/g, (m, base) => `((${base})*${PI_MARKER}/180)`);
  s = s.replace(/\\circ/g, ""); // verbleibende alleinstehende \circ entfernen

  // Operatoren
  s = s.replace(/\\cdot|\\times|\\ast/g, "*");
  s = s.replace(/\\div/g, "/");

  // Funktionsnamen -> Marker
  for (const key of Object.keys(FUNC_MAP)) {
    s = s.split(key).join(FUNC_MAP[key]);
  }

  // \frac und \sqrt (rekursiv, klammer-bewusst)
  s = resolveFracSqrt(s);

  // Subskripte zusammenführen: x_{ab}, x_{\min} oder x_a  ->  xab / xmin / xa  (als eigene Variable geschützt)
  s = s.replace(/([A-Za-z])_\{\\?([A-Za-z0-9]+)\}/g, (m, base, sub) => {
    const id = base + sub;
    protectedIdentifiers.add(id);
    return id;
  });
  s = s.replace(/([A-Za-z])_([A-Za-z0-9])/g, (m, base, sub) => {
    const id = base + sub;
    protectedIdentifiers.add(id);
    return id;
  });

  // Griechische Buchstaben (Befehle) -> Klartext-Wörter, \pi separat als Zahlen-Marker
  s = s.replace(/\\pi/g, PI_MARKER);
  s = s.replace(/\\([A-Za-z]+)/g, (m, word) => {
    if (GREEK_WORDS.has(word)) { protectedIdentifiers.add(word); return word; }
    return word; // unbekannter Befehl: Backslash entfernen, Text behalten
  });

  // Potenzen (^{...} und einfaches ^)
  s = resolvePowerBraces(s);

  // verbleibende geschweifte Klammern als normale Gruppierung behandeln
  s = s.replace(/\{/g, "(").replace(/\}/g, ")");

  // bekannte Konstantennamen ebenfalls schützen (nicht in Einzelbuchstaben zerlegen)
  for (const key of Object.keys(PHYSICS_CONSTANTS)) protectedIdentifiers.add(key);

  // Leerzeichen entfernen (nach Marker-Ersetzung unkritisch)
  s = s.replace(/\s+/g, "");

  // Mehrbuchstabige, nicht geschützte Buchstaben-Ketten in Einzelvariablen zerlegen (implizite Multiplikation, "ma" -> m*a)
  s = s.replace(/[A-Za-z]+/g, (word) => {
    if (protectedIdentifiers.has(word) || word.length === 1) return word;
    return word.split("").join("*");
  });

  // implizite Multiplikation an den übrigen Grenzen einfügen
  s = s.replace(/([0-9])([A-Za-z])/g, "$1*$2");                                   // 2m -> 2*m
  s = s.replace(/([A-Za-z0-9])(\()/g, "$1*$2");                                   // m( -> m*(   (Funktionsmarker sind keine Buchstaben, bleiben unberührt)
  s = s.replace(/(\))([A-Za-z0-9])/g, "$1*$2");                                   // )m -> )*m
  s = s.replace(/(\))(\()/g, "$1*$2");                                            // )( -> )*(
  s = s.replace(new RegExp(`([0-9A-Za-z)])([${MARKER_CHARS}])`, "g"), "$1*$2");   // m⓪ / )⓪ -> m*⓪ / )*⓪
  s = s.replace(new RegExp(`([${MARKER_CHARS}])([${MARKER_CHARS}])`, "g"), "$1*$2"); // ⓪⓪ -> ⓪*⓪ (z.B. 2\\pi\\sqrt{..})
  s = s.replace(new RegExp(`([${VALUE_MARKER_CHARS}])([A-Za-z0-9(])`, "g"), "$1*$2"); // π gefolgt von Buchstabe/Zahl/( -> *

  // Funktionsmarker durch echte JS-Aufrufe ersetzen
  for (const marker of Object.keys(FUNC_JS)) {
    s = s.split(marker).join(FUNC_JS[marker]);
  }

  // doppelte Sterne durch fälschliche Einfügung vor "**" bereinigen
  s = s.replace(/\*(\*\*)/g, "$1");

  return s;
}

/* Variablen aus einem fertigen JS-Ausdruck extrahieren (alles außer Math.xxx und Zahlen) */
function extractVariables(jsExpr) {
  const withoutMath = jsExpr.replace(/Math\.[A-Za-z0-9]+/g, " ");
  const matches = withoutMath.match(/[A-Za-z][A-Za-z0-9]*/g) || [];
  const seen = new Set();
  const vars = [];
  for (const v of matches) {
    if (!seen.has(v)) { seen.add(v); vars.push(v); }
  }
  return vars;
}

/* Formel in {resultName, rhsLatex, jsExpr, variables} zerlegen */
function parseFormula(latex) {
  let resultName = null;
  let rhs = latex;
  const eqIdx = latex.indexOf("=");
  if (eqIdx > -1 && latex.indexOf("=", eqIdx + 1) === -1) {
    const lhs = latex.slice(0, eqIdx).trim();
    rhs = latex.slice(eqIdx + 1).trim();
    resultName = lhs.replace(/\\/g, "").replace(/[{}]/g, "").replace(/_/g, "");
  }
  const jsExpr = latexToJS(rhs);
  const variables = extractVariables(jsExpr);
  return { resultName, rhsLatex: rhs, jsExpr, variables };
}

/* ==========================================================
   PRESETS
   ========================================================== */
const PRESETS = [
  { label: "E = mc²", latex: "E = m c^2" },
  { label: "Newton II", latex: "F = m a" },
  { label: "Gravitation", latex: "F = \\frac{G m_1 m_2}{r^2}" },
  { label: "Kinetische Energie", latex: "E_k = \\frac{1}{2} m v^2" },
  { label: "Fallweg", latex: "s = \\frac{1}{2} g t^2" },
  { label: "Coulomb-Gesetz", latex: "F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2}" },
  { label: "Ohmsches Gesetz", latex: "U = R I" },
  { label: "Ideale Gasgleichung", latex: "p V = n R T" },
  { label: "Fadenpendel", latex: "T = 2\\pi\\sqrt{\\frac{l}{g}}" },
  { label: "Photonenenergie", latex: "E = h f" },
  { label: "de-Broglie-Wellenlänge", latex: "\\lambda = \\frac{h}{p}" },
  { label: "Arbeit", latex: "W = F s" },
  { label: "Leistung", latex: "P = \\frac{W}{t}" },
  { label: "µ₀ (mit Gradmaß)", latex: "$$\\mu_0 = \\frac{\\eta}{\\Xi \\cdot R_{\\min} \\cdot \\sqrt{3} \\cdot \\sin(35,26^\\circ)} \\cdot (4\\pi \\times 10^{-7})$$" },
];

/* ==========================================================
   UI
   ========================================================== */
const latexInput   = document.getElementById("latexInput");
const latexPreview = document.getElementById("latexPreview");
const varList      = document.getElementById("varList");
const calcBtn      = document.getElementById("calcBtn");
const resultBox    = document.getElementById("resultBox");
const resultValue  = document.getElementById("resultValue");
const resultUnit   = document.getElementById("resultUnit");
const historyList  = document.getElementById("historyList");
const presetList   = document.getElementById("presetList");
const constGrid    = document.getElementById("constGrid");
const angleModeBox = document.getElementById("angleMode");

let angleMode = "rad";
let currentParsed = null;
let lastResult = null; // { value, name, unit } — für das Speichern mit der Formel
let history = JSON.parse(localStorage.getItem("physik_rechner_history") || "[]");

/* ---------- Presets rendern ---------- */
PRESETS.forEach(p => {
  const btn = document.createElement("button");
  btn.className = "preset-btn";
  btn.textContent = p.label;
  btn.addEventListener("click", () => {
    latexInput.value = p.latex;
    onFormulaChange();
  });
  presetList.appendChild(btn);
});

/* ---------- Konstanten-Kacheln rendern ---------- */
Object.entries(PHYSICS_CONSTANTS).forEach(([sym, data]) => {
  if (sym === "varepsilon0") return; // Duplikat von epsilon0, nicht doppelt anzeigen
  const card = document.createElement("div");
  card.className = "const-card";
  card.innerHTML = `
    <div class="const-sym">${sym}</div>
    <div class="const-name">${data.name}</div>
    <div class="const-value">${formatNumber(data.value)} ${data.unit}</div>
  `;
  card.addEventListener("click", () => {
    insertAtCursor(latexInput, sym.replace(/([0-9])/, "_{$1}") + " ");
    onFormulaChange();
  });
  constGrid.appendChild(card);
});

/* ---------- Symbol-Palette ---------- */
document.querySelectorAll(".sym-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const insertText = btn.dataset.insert;
    const cursorOffset = btn.dataset.cursor ? parseInt(btn.dataset.cursor, 10) : 0;
    insertAtCursor(latexInput, insertText, cursorOffset);
    onFormulaChange();
    latexInput.focus();
  });
});

function insertAtCursor(el, text, cursorOffset = 0) {
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  el.value = el.value.slice(0, start) + text + el.value.slice(end);
  const newPos = start + text.length + cursorOffset;
  el.focus();
  el.setSelectionRange(newPos, newPos);
}

/* ---------- Winkel-Modus ---------- */
angleModeBox.querySelectorAll(".seg-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    angleModeBox.querySelectorAll(".seg-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    angleMode = btn.dataset.mode;
  });
});

/* ---------- Live-Vorschau + Variablenliste ---------- */
let debounceTimer = null;
latexInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(onFormulaChange, 150);
});

/* Entfernt umschließende Delimiter wie $$...$$, $...$, \[...\], \(...\) */
function stripDelimiters(raw) {
  let s = raw.trim();
  s = s.replace(/^\$\$([\s\S]*)\$\$$/, "$1");
  s = s.replace(/^\$([\s\S]*)\$$/, "$1");
  s = s.replace(/^\\\[([\s\S]*)\\\]$/, "$1");
  s = s.replace(/^\\\(([\s\S]*)\\\)$/, "$1");
  return s.trim();
}

function onFormulaChange() {
  const raw = stripDelimiters(latexInput.value);
  lastResult = null;
  resultBox.classList.add("empty");
  resultBox.classList.remove("error");
  resultValue.textContent = "—";

  if (!raw) {
    latexPreview.textContent = "—";
    latexPreview.classList.remove("error");
    varList.innerHTML = '<p class="empty-hint">Gib links eine Formel ein — erkannte Variablen erscheinen hier.</p>';
    currentParsed = null;
    return;
  }

  // KaTeX-Vorschau
  try {
    katex.render(raw, latexPreview, { throwOnError: true, displayMode: true });
    latexPreview.classList.remove("error");
  } catch (err) {
    latexPreview.textContent = "Formel kann nicht dargestellt werden";
    latexPreview.classList.add("error");
  }

  // Parsen für Berechnung
  try {
    currentParsed = parseFormula(raw);
    renderVarList(currentParsed.variables);
  } catch (err) {
    currentParsed = null;
    varList.innerHTML = '<p class="empty-hint">Formel konnte nicht analysiert werden.</p>';
  }
}

function renderVarList(variables) {
  if (!variables.length) {
    varList.innerHTML = '<p class="empty-hint">Keine Variablen erkannt — die Formel besteht nur aus Zahlen/Konstanten.</p>';
    return;
  }
  varList.innerHTML = "";
  variables.forEach(v => {
    const isConst = Object.prototype.hasOwnProperty.call(PHYSICS_CONSTANTS, v);
    const constData = isConst ? PHYSICS_CONSTANTS[v] : null;
    const prevValue = varList.dataset && varList.dataset[v];

    const row = document.createElement("div");
    row.className = "var-row" + (isConst ? " is-const" : "");
    row.innerHTML = `
      <span class="var-name">${v}</span>
      <div class="var-mid">
        <input type="text" inputmode="decimal" data-var="${v}" value="${isConst ? constData.value : ""}" placeholder="Wert eingeben">
        ${isConst ? `<span class="var-const-label">${constData.name} (${constData.unit})</span>` : ""}
      </div>
      ${isConst ? `<button class="var-reset" title="Konstante zurücksetzen">↺</button>` : `<span></span>`}
    `;
    if (isConst) {
      row.querySelector(".var-reset").addEventListener("click", () => {
        row.querySelector("input").value = constData.value;
      });
    }
    varList.appendChild(row);
  });
}

/* ---------- Berechnen ---------- */
calcBtn.addEventListener("click", () => {
  if (!currentParsed) {
    onFormulaChange();
    if (!currentParsed) return showError("Bitte zuerst eine gültige Formel eingeben.");
  }

  const inputs = varList.querySelectorAll("input[data-var]");
  const values = {};
  for (const input of inputs) {
    const name = input.dataset.var;
    const raw = input.value.trim().replace(",", ".");
    if (raw === "") return showError(`Bitte einen Wert für "${name}" eingeben.`);
    const num = Number(raw);
    if (Number.isNaN(num)) return showError(`"${input.value}" ist keine gültige Zahl für "${name}".`);
    values[name] = num;
  }

  try {
    let expr = currentParsed.jsExpr;

    // Winkel-Modus: bei Grad automatisch in Radiant umrechnen für sin/cos/tan
    if (angleMode === "deg") {
      expr = expr.replace(/Math\.(sin|cos|tan)\(/g, "Math.$1((Math.PI/180)*");
    }

    const varNames = Object.keys(values);
    const varValues = Object.values(values);
    // eslint-disable-next-line no-new-func
    const fn = new Function(...varNames, `"use strict"; return (${expr});`);
    const result = fn(...varValues);

    if (typeof result !== "number" || Number.isNaN(result) || !Number.isFinite(result)) {
      return showError("Die Berechnung ergibt kein gültiges Zahlenergebnis (evtl. Division durch 0).");
    }

    showResult(result, currentParsed.resultName);
    addToHistory(stripDelimiters(latexInput.value), result, currentParsed.resultName);
  } catch (err) {
    showError("Formel konnte nicht ausgewertet werden. Bitte Syntax prüfen.");
  }
});

function showResult(value, name) {
  resultBox.classList.remove("empty", "error");
  const unit = resultUnit.value.trim();
  resultValue.textContent = `${name ? name + " = " : ""}${formatNumber(value)}${unit ? " " + unit : ""}`;
  lastResult = { value, name, unit };
}

function showError(msg) {
  resultBox.classList.remove("empty");
  resultBox.classList.add("error");
  resultValue.textContent = msg;
  lastResult = null;
}

function formatNumber(n) {
  if (Math.abs(n) !== 0 && (Math.abs(n) < 1e-4 || Math.abs(n) >= 1e7)) {
    return n.toExponential(6).replace("e", " · 10^").replace("+", "");
  }
  const rounded = Math.round(n * 1e10) / 1e10;
  return rounded.toLocaleString("de-DE", { maximumFractionDigits: 10 });
}

/* ---------- Verlauf ---------- */
function addToHistory(formula, result, name) {
  history.unshift({ formula, result, name, ts: Date.now() });
  history = history.slice(0, 25);
  localStorage.setItem("physik_rechner_history", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  if (!history.length) {
    historyList.innerHTML = '<p class="empty-hint">Noch keine Berechnungen.</p>';
    return;
  }
  history.forEach(item => {
    const el = document.createElement("div");
    el.className = "history-item";
    el.innerHTML = `
      <span class="h-formula">${escapeHtml(item.formula)}</span>
      <span class="h-result">${formatNumber(item.result)}</span>
    `;
    el.addEventListener("click", () => {
      latexInput.value = item.formula;
      onFormulaChange();
    });
    historyList.appendChild(el);
  });
}

document.getElementById("clearHistory").addEventListener("click", () => {
  history = [];
  localStorage.removeItem("physik_rechner_history");
  renderHistory();
});

/* ---------- Gespeicherte Formeln ---------- */
const formulaNameInput = document.getElementById("formulaNameInput");
const saveFormulaBtn = document.getElementById("saveFormulaBtn");
const savedFormulaList = document.getElementById("savedFormulaList");
let savedFormulas = JSON.parse(localStorage.getItem("physik_rechner_saved") || "[]");

function persistSavedFormulas() {
  localStorage.setItem("physik_rechner_saved", JSON.stringify(savedFormulas));
}

function renderSavedFormulas() {
  savedFormulaList.innerHTML = "";
  if (!savedFormulas.length) {
    savedFormulaList.innerHTML = '<p class="empty-hint">Noch keine Formeln gespeichert.</p>';
    return;
  }
  savedFormulas.forEach((item, idx) => {
    const el = document.createElement("div");
    el.className = "saved-item";
    const resultPreview = item.result
      ? `<span class="saved-item-result">${item.result.name ? item.result.name + " = " : ""}${formatNumber(item.result.value)}${item.result.unit ? " " + item.result.unit : ""}</span>`
      : "";
    el.innerHTML = `
      <div class="saved-item-text">
        <span class="saved-item-name">${escapeHtml(item.name)}</span>
        <span class="saved-item-formula">${escapeHtml(item.latex)}</span>
        ${resultPreview}
      </div>
      <div class="saved-item-actions">
        <button class="mini-btn load-btn" title="Laden">↩</button>
        <button class="mini-btn del-btn" title="Löschen">✕</button>
      </div>
    `;
    el.querySelector(".load-btn").addEventListener("click", () => {
      latexInput.value = item.latex;
      onFormulaChange();

      // gespeicherte Variablenwerte wiederherstellen
      if (item.variables) {
        varList.querySelectorAll("input[data-var]").forEach(input => {
          const v = item.variables[input.dataset.var];
          if (v !== undefined) input.value = v;
        });
      }

      // gespeichertes Ergebnis wiederherstellen
      if (item.result) {
        resultUnit.value = item.result.unit || "";
        showResult(item.result.value, item.result.name);
      }

      latexInput.focus();
    });
    el.querySelector(".del-btn").addEventListener("click", () => {
      savedFormulas.splice(idx, 1);
      persistSavedFormulas();
      renderSavedFormulas();
    });
    savedFormulaList.appendChild(el);
  });
}

saveFormulaBtn.addEventListener("click", () => {
  const name = formulaNameInput.value.trim();
  const latex = stripDelimiters(latexInput.value);
  if (!name) { formulaNameInput.focus(); return; }
  if (!latex) { latexInput.focus(); return; }

  // aktuelle Variablenwerte einsammeln
  const variables = {};
  varList.querySelectorAll("input[data-var]").forEach(input => {
    if (input.value.trim() !== "") variables[input.dataset.var] = input.value.trim();
  });

  const existingIdx = savedFormulas.findIndex(f => f.name.toLowerCase() === name.toLowerCase());
  const entry = {
    name,
    latex,
    variables,
    result: lastResult ? { value: lastResult.value, name: lastResult.name, unit: lastResult.unit } : null,
    savedAt: Date.now()
  };
  if (existingIdx > -1) savedFormulas[existingIdx] = entry;
  else savedFormulas.unshift(entry);

  persistSavedFormulas();
  renderSavedFormulas();
  formulaNameInput.value = "";
});

formulaNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") saveFormulaBtn.click();
});

renderSavedFormulas();

/* ---------- Gespeicherte Variablensätze ---------- */
const varsetNameInput = document.getElementById("varsetNameInput");
const saveVarsetBtn = document.getElementById("saveVarsetBtn");
const savedVarsetList = document.getElementById("savedVarsetList");
let savedVarsets = JSON.parse(localStorage.getItem("physik_rechner_saved_varsets") || "[]");

function persistSavedVarsets() {
  localStorage.setItem("physik_rechner_saved_varsets", JSON.stringify(savedVarsets));
}

function renderSavedVarsets() {
  savedVarsetList.innerHTML = "";
  if (!savedVarsets.length) {
    savedVarsetList.innerHTML = '<p class="empty-hint">Noch keine Variablensätze gespeichert.</p>';
    return;
  }
  savedVarsets.forEach((item, idx) => {
    const varsPreview = Object.entries(item.variables).map(([k, v]) => `${k}=${v}`).join(", ");
    const el = document.createElement("div");
    el.className = "saved-item";
    el.innerHTML = `
      <div class="saved-item-text">
        <span class="saved-item-name">${escapeHtml(item.name)}</span>
        <span class="saved-item-formula">${escapeHtml(varsPreview)}</span>
      </div>
      <div class="saved-item-actions">
        <button class="mini-btn load-btn" title="Auf aktuelle Formel anwenden">↩</button>
        <button class="mini-btn del-btn" title="Löschen">✕</button>
      </div>
    `;
    el.querySelector(".load-btn").addEventListener("click", () => {
      let applied = 0;
      varList.querySelectorAll("input[data-var]").forEach(input => {
        const v = item.variables[input.dataset.var];
        if (v !== undefined) { input.value = v; applied++; }
      });
      if (applied === 0) {
        showError("Keine der gespeicherten Variablen passt zur aktuellen Formel.");
      }
    });
    el.querySelector(".del-btn").addEventListener("click", () => {
      savedVarsets.splice(idx, 1);
      persistSavedVarsets();
      renderSavedVarsets();
    });
    savedVarsetList.appendChild(el);
  });
}

saveVarsetBtn.addEventListener("click", () => {
  const name = varsetNameInput.value.trim();
  if (!name) { varsetNameInput.focus(); return; }

  const variables = {};
  varList.querySelectorAll("input[data-var]").forEach(input => {
    if (input.value.trim() !== "") variables[input.dataset.var] = input.value.trim();
  });
  if (Object.keys(variables).length === 0) { latexInput.focus(); return; }

  const existingIdx = savedVarsets.findIndex(f => f.name.toLowerCase() === name.toLowerCase());
  const entry = { name, variables, savedAt: Date.now() };
  if (existingIdx > -1) savedVarsets[existingIdx] = entry;
  else savedVarsets.unshift(entry);

  persistSavedVarsets();
  renderSavedVarsets();
  varsetNameInput.value = "";
});

varsetNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") saveVarsetBtn.click();
});

renderSavedVarsets();

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ==========================================================
   THEME / FULLSCREEN
   ========================================================== */
const themeToggle = document.getElementById("themeToggle");
const iconMoon = document.getElementById("themeIconMoon");
const iconSun = document.getElementById("themeIconSun");

function applyTheme(mode) {
  document.documentElement.classList.toggle("light", mode === "light");
  iconMoon.style.display = mode === "light" ? "none" : "block";
  iconSun.style.display = mode === "light" ? "block" : "none";
  localStorage.setItem("physik_rechner_theme", mode);
}
themeToggle.addEventListener("click", () => {
  const isLight = document.documentElement.classList.contains("light");
  applyTheme(isLight ? "dark" : "light");
});
applyTheme(localStorage.getItem("physik_rechner_theme") || "dark");

const fullscreenToggle = document.getElementById("fullscreenToggle");
fullscreenToggle.addEventListener("click", () => {
  const app = document.getElementById("app");
  if (!document.fullscreenElement) app.requestFullscreen?.();
  else document.exitFullscreen?.();
});

/* ---------- Initialisierung ---------- */
renderHistory();
latexInput.value = "E = m c^2";
onFormulaChange();
