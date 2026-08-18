// Vollständig integrierte und verschmolzene WRZT- & Fundamentaldaten
let formulaData = [
    {
        id: 1,
        category: "WRZT-Grundkonstanten",
        symbol: "\\eta",
        name: "Raumzeit-Trägheit η",
        desc: "Grundgröße der WRZT. η beschreibt die fundamentale Raumzeit-Trägheit und dient als Basis mehrerer Herleitungen.",
        formula: "$$\\eta = \\frac{m_e}{2}$$",
        value: "4.55469185 × 10⁻³¹",
        unit: "kg",
        details: `
<h3>Definition</h3>
η ist die halbe Elektronenmasse und bildet eine der Fundamentalkonstanten der WRZT.

<h3>Herleitung</h3>
$$\\eta = \\frac{m_e}{2}$$

<h3>Numerischer Wert</h3>
η ≈ 4.55469185 × 10⁻³¹ kg

<h3>Bedeutung</h3>
η repräsentiert die effektive Raumzeit-Trägheit einer elementaren Raumzeitstruktur.

<h3>Verknüpfte Formeln</h3>
Ξ, Rmin, c, ħ
`,
        related:["Ξ","Rmin","c","ħ"],
        keywords:["eta","Raumzeit","Trägheit","WRZT"]
    },
    {
        id: 2,
        category: "WRZT-Grundkonstanten",
        symbol: "\\Xi",
        name: "Xi-Konstante",
        desc: "Grundspannung bzw. lineare Raumzeitdichte des Raumzeitgewebes.",
        formula: "$$\\Xi=\\frac{m_e^2 c}{4\\hbar}$$",
        value: "≈ 5.899 × 10⁻¹⁹",
        unit: "kg/m",
        details: `
<h3>Definition</h3>
Ξ beschreibt die lineare Raumzeitdichte bzw. Grundspannung des Raumzeitgewebes.

<h3>Herleitung</h3>
$$
\\Xi=\\frac{m_e^2 c}{4\\hbar}
$$

<h3>Einheit</h3>
kg/m

<h3>Bedeutung</h3>
Ξ verbindet Masse, Lichtgeschwindigkeit und Plancksches Wirkungsquantum.

<h3>Verknüpfte Formeln</h3>
η, Rmin, c, ħ
`,
        related:["η","Rmin","c","ħ"],
        keywords:["Xi","WRZT","Raumzeit","Grundspannung"]
    },
    {
        id: 3,
        category: "WRZT-Grundkonstanten",
        symbol: "R_{min}",
        name: "Minimaler Raumzeitradius",
        desc: "Kleinster charakteristischer Radius einer elementaren Raumzeitstruktur.",
        formula: "$$R_{min}=\\frac{2\\hbar}{m_e c}$$",
        value: "≈ 7.72 × 10⁻¹³",
        unit: "m",
        details: `
<h3>Definition</h3>
Minimaler Radius einer Raumzeitzelle.

<h3>Herleitung</h3>
$$
R_{min}=\\frac{2\\hbar}{m_e c}
$$

<h3>Numerischer Wert</h3>
Rmin ≈ 7.72 × 10⁻¹³ m

<h3>Bedeutung</h3>
Dieser Radius erscheint in zahlreichen WRZT-Gleichungen als fundamentale Längenskala.
`,
        related:["η","Ξ","ħ","c"],
        keywords:["Rmin","Radius","WRZT"]
    },
    {
        id: 4,
        category: "WRZT-Grundkonstanten",
        symbol: "c",
        name: "Lichtgeschwindigkeit aus WRZT",
        desc: "Herleitung der Lichtgeschwindigkeit invarianz aus den WRZT-Grundkonstanten.",
        formula: "$$1=\\frac{\\Xi\\,R_{min}}{\\eta} \\text{ ← → } c = 299792458 $$",
        value: "299792458",
        unit: "m/s",
        details: `
<h3>WRZT-Herleitung</h3>
$$
c=\\frac{\\Xi R_{min}}{\\eta}
$$

<h3>Bedeutung</h3>
In der WRZT ist c keine unabhängige Naturkonstante, sondern ergibt sich aus η, Ξ und Rmin.
`,
        related:["η","Ξ","Rmin","ħ"],
        keywords:["c","Lichtgeschwindigkeit","WRZT"]
    },
    {
        id: 5,
        category: "WRZT-Grundkonstanten",
        symbol: "\\hbar",
        name: "Reduziertes Plancksches Wirkungsquantum",
        desc: "WRZT-Darstellung des reduzierten Planckschen Wirkungsquantums.",
        formula: "$$\\hbar=\\Xi c R_{min}^{2}$$",
        value: "1.054571817 × 10⁻³⁴",
        unit: "J·s",
        details: `
<h3>WRZT-Form</h3>
$$
\\hbar=\\Xi c R_{min}^{2}
$$

<h3>Bedeutung</h3>
Das Wirkungsquantum ergibt sich unmittelbar aus den Raumzeitparametern.
`,
        related:["Ξ","Rmin","c"],
        keywords:["hbar","Planck","WRZT"]
    },
    {
        id: 6,
        category: "WRZT-Grundkonstanten",
        symbol: "h",
        name: "Plancksches Wirkungsquantum",
        desc: "Herleitung über das reduzierte Plancksches Wirkungsquantum.",
        formula: "$$h=2\\pi\\hbar$$",
        value: "6.62607015 × 10⁻³⁴",
        unit: "J·s",
        details: `
<h3>Definition</h3>
$$
h=2\\pi\\hbar
$$
Die klassische Beziehung bleibt innerhalb der WRZT erhalten.
`,
        related:["ħ"],
        keywords:["Planck","h"]
    },
    {
        id: 7,
        category: "WRZT-Grundkonstanten",
        symbol: "\\rho_{vac}",
        name: "Vakuumenergiedichte",
        desc: "Energiedichte einer elementaren Raumzeitzelle.",
        formula: "$$\\rho_{vac}=\\frac{\\eta c^2}{\\frac43\\pi R_{min}^{3}}$$",
        value: "Berechnet aus Struktur",
        unit: "J/m³",
        details: `
<h3>Definition</h3>
$$
\\rho_{vac}=\\frac{\\eta c^2}{\\frac43\\pi R_{min}^{3}}
$$

<h3>Bedeutung</h3>
Beschreibt die Energiedichte des Raumzeitvakuums innerhalb der WRZT.
`,
        related:["η","Rmin","c"],
        keywords:["Vakuum","Energiedichte"]
    },
    {
        id: 8,
        category: "Fundamentale Skalen",
        symbol: "r_e",
        name: "Klassischer Elektronenradius (WRZNT)",
        desc: "Gleichgewicht aus Coulomb-Kraft und Zentrifugalkraft bei v=c.",
        formula: "$$r_e = \\frac{1}{4\\pi \\varepsilon_0} \\cdot \\frac{e^2}{m_e c^2}$$",
        value: "≈ 2.81794 × 10⁻¹⁵",
        unit: "m",
        details: `
<h3>Kreisbewegung mit fundamentalen Wechselwirkungen</h3>
Wir setzen die Zentrifugalkraft gleich der Coulomb-Kraft mit $m=m_e$ und $v=c$:
$$m_e \\cdot \\frac{c^2}{r} = k \\cdot \\frac{e^2}{r^2}$$

<h3>Herleitung nach r:</h3>
Beide Seiten mit $r^2$ multiplizieren:
$$m_e c^2 r = k e^2$$

Nach $r$ auflösen:
$$r = \\frac{k e^2}{m_e c^2}$$

Mit $k = \\frac{1}{4\\pi \\varepsilon_0}$:
$$r = \\frac{1}{4\\pi \\varepsilon_0} \\cdot \\frac{e^2}{m_e c^2}$$

<h3>Bedeutung:</h3>
Dieser Ausdruck entspricht exakt dem klassischen Elektronenradius.
`,
        related: ["c", "\\eta"],
        keywords: ["Elektronenradius", "Coulomb", "Zentrifugalkraft"]
    },
    {
        id: 9,
        category: "Fundamentale Skalen",
        symbol: "\\ell_P",
        name: "Planck-Länge",
        desc: "Fundamentale Skala, bei der Gravitation und Quanteneffekte verschmelzen.",
        formula: "$$\\ell_P = \\sqrt{\\frac{\\hbar G}{c^3}}$$",
        value: "≈ 1.616255 × 10⁻³⁵",
        unit: "m",
        details: "<h3>Bedeutung:</h3>Die absolute untere Grenze der sinnvollen physikalischen Raumzeit-Geometrie. Ergibt sich aus der Kombination von Gravitationskonstante $G$, reduzierter Planck-Konstante $\\hbar$ und Lichtgeschwindigkeit $c$.",
        related: ["\\hbar", "c"],
        keywords: ["Planck", "Laenge", "Gravitation"]
    },
    {
        id: 10,
        category: "Fundamentale Skalen",
        symbol: "r_s",
        name: "Schwarzschild-Radius",
        desc: "Grenzradius, bei dem die Fluchtgeschwindigkeit einer Masse gleich c wird.",
        formula: "$$r_s = \\frac{2Gm}{c^2}$$",
        value: "Abhängig von m",
        unit: "m",
        details: "<h3>Herleitung & Bedeutung:</h3>Setzt man die kinetische Energie gleich der gravitativen Bindungsenergie für ein Objekt, das sich mit Lichtgeschwindigkeit ($v=c$) vom Radius $r$ wegbewegen will, erhält man diesen Grenzradius für Schwarze Löcher.",
        related: ["c"],
        keywords: ["Schwarzschild", "Radius", "Masse"]
    },
    {
        id: 11,
        category: "Fundamentale Skalen",
        symbol: "\\frac{F_e}{F_g}",
        name: "Verhältnis elektrischer Kraft zu Gravitation",
        desc: "Das extreme Missverhältnis der Kräfte im Mikrokosmos.",
        formula: "$$\\frac{F_e}{F_g} = \\frac{e^2}{4\\pi\\varepsilon_0 G m_p m_e}$$",
        value: "≈ 10³⁹",
        unit: "dimensionslos",
        details: "<h3>Bedeutung:</h3>Zeigt, dass auf atomarer Ebene die elektromagnetische Wechselwirkung zwischen einem Proton und einem Elektron um rund 39 Größenordnungen ($10^{39}$) stärker ist als deren gravitative Anziehung.",
        related: ["r_e"],
        keywords: ["Kräfteverhältnis", "Coulomb", "Gravitation"]
    }
];

// Füllt das Grid auf 25 Karten auf (5x5 Grid)
for (let i = formulaData.length; i < 25; i++) {
    formulaData.push({
        id: i + 1,
        category: "Erweiterbar",
        symbol: `F_{${i+1}}`,
        name: `Freier Slot ${i + 1}`,
        desc: "Klicke unten auf Öffnen, um diese Karte vollständig zu gestalten.",
        formula: `$$E = m_{${i+1}} c^2$$`,
        value: "—",
        unit: "—",
        details: "<h3>Beschreibung</h3><p>Hier kannst du eigene Details und Herleitungen eintragen.</p>",
        related: [],
        keywords: ["Slot"]
    });
}

const grid = document.getElementById('card-grid');
let activeCardIndex = null;

// Grid rendern (Nur-Lese-Ansicht für absolute Stabilität)
function renderGrid() {
    grid.innerHTML = '';
    formulaData.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        
        const badgeDisplay = card.value && card.value !== "—" ? `<span class="value-badge">${card.value} ${card.unit !== "—" ? card.unit : ""}</span>` : "";
        
        cardEl.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3>${card.name}</h3>
                <button title="LaTeX kopieren" class="copy-btn" onclick="copyLaTeX(${index})">📋</button>
            </div>
            <div class="formula">${card.formula}</div>
            <p>${card.desc}</p>
            <div class="card-footer" style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                ${badgeDisplay}
                <button class="open-card-btn" onclick="openModal(${index})">🔍 Öffnen & Bearbeiten</button>
            </div>
        `;

        grid.appendChild(cardEl);
    });
    triggerMathJax();
}

// Modal zum vollständigen Bearbeiten öffnen
function openModal(index) {
    activeCardIndex = index;
    const card = formulaData[index];
    
    document.getElementById('modal-title').innerText = card.name;
    
    let modalContent = `
        <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; gap:10px;">
                <div style="flex:2;">
                    <label style="font-size:0.8rem; opacity:0.8;">Titel / Name:</label>
                    <input type="text" id="edit-name" value="${escapeHtml(card.name)}" style="width:100%; padding:6px; box-sizing:border-box;">
                </div>
                <div style="flex:1;">
                    <label style="font-size:0.8rem; opacity:0.8;">Kategorie:</label>
                    <input type="text" id="edit-category" value="${escapeHtml(card.category)}" style="width:100%; padding:6px; box-sizing:border-box;">
                </div>
            </div>

            <div>
                <label style="font-size:0.8rem; opacity:0.8;">Kurzbeschreibung:</label>
                <input type="text" id="edit-desc" value="${escapeHtml(card.desc)}" style="width:100%; padding:6px; box-sizing:border-box;">
            </div>

            <div>
                <label style="font-size:0.8rem; opacity:0.8;">LaTeX Formel (z.B. $$E=mc^2$$):</label>
                <input type="text" id="edit-formula" value="${escapeHtml(card.formula)}" style="width:100%; padding:6px; font-family:monospace; box-sizing:border-box;">
            </div>

            <div style="display:flex; gap:10px;">
                <div style="flex:1;">
                    <label style="font-size:0.8rem; opacity:0.8;">Wert:</label>
                    <input type="text" id="edit-value" value="${escapeHtml(card.value)}" style="width:100%; padding:6px; box-sizing:border-box;">
                </div>
                <div style="flex:1;">
                    <label style="font-size:0.8rem; opacity:0.8;">Einheit:</label>
                    <input type="text" id="edit-unit" value="${escapeHtml(card.unit)}" style="width:100%; padding:6px; box-sizing:border-box;">
                </div>
            </div>

            <div>
                <label style="font-size:0.8rem; opacity:0.8;">Vollständiger Details-Text / Herleitung (HTML erlaubt):</label>
                <textarea id="edit-details" rows="8" style="width:100%; padding:8px; box-sizing:border-box; font-family:inherit;">${card.details}</textarea>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                <button class="copy-btn" onclick="copyLaTeX(${index})">📋 LaTeX Kopieren</button>
                <button onclick="saveModalChanges()" style="background:var(--accent-color); color:#fff; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; cursor:pointer;">💾 Speichern & Schließen</button>
            </div>
        </div>
    `;

    document.getElementById('modal-body').innerHTML = modalContent;
    document.getElementById('modal').style.display = 'flex';
}

// Änderungen aus dem Editor im Modal speichern
function saveModalChanges() {
    if (activeCardIndex === null) return;
    
    formulaData[activeCardIndex].name = document.getElementById('edit-name').value;
    formulaData[activeCardIndex].category = document.getElementById('edit-category').value;
    formulaData[activeCardIndex].desc = document.getElementById('edit-desc').value;
    formulaData[activeCardIndex].formula = document.getElementById('edit-formula').value;
    formulaData[activeCardIndex].value = document.getElementById('edit-value').value;
    formulaData[activeCardIndex].unit = document.getElementById('edit-unit').value;
    formulaData[activeCardIndex].details = document.getElementById('edit-details').value;

    closeModal();
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    activeCardIndex = null;
    renderGrid();
}

function copyLaTeX(index) {
    const rawFormula = formulaData[index].formula;
    const cleanFormula = rawFormula.replace(/^\$\$|\$\$$|^\$|\$$/g, '').trim();
    
    navigator.clipboard.writeText(cleanFormula).then(() => {
        alert("LaTeX-Code kopiert:\n" + cleanFormula);
    });
}

function escapeHtml(str) {
    return (str || '').replace(/"/g, '&quot;');
}

function triggerMathJax() {
    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise();
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
    } else {
        body.classList.replace('light-theme', 'dark-theme');
    }
}

function saveCards() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formulaData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "wrznt2_formula_collection.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function loadCards(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        formulaData = JSON.parse(e.target.result);
        renderGrid();
    };
    reader.readAsText(file);
}

window.onload = renderGrid;