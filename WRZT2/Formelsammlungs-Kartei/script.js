// Vollständig integrierte und verschmolzene WRZT- & Fundamentaldaten
let formulaData = [
    {
        id: 1,
        category: "WRZT-Grundkonstanten",
        symbol: "\\eta",
        name: "Raumzeit-Trägheit η",
        desc: "Grundgröße der WRZT. η beschreibt die fundamentale Raumzeit-Trägheit und dient als Basis mehrerer Herleitungen.",
        formula: "$$\\eta = \\frac{m_e}{2}$$",
        value: "4.55469185 × 10⁻³¹ kg",
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
        value: "≈ 5.899 × 10⁻¹⁹ kg/m",
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
        value: "≈ 7.72 × 10⁻¹³ m",
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
        desc: "Herleitung der Lichtgeschwindigkeit aus den WRZT-Grundkonstanten.",
        formula: "$$c=\\frac{\\Xi\\,R_{min}}{\\eta}$$",
        value: "299792458 m/s",
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
        value: "1.054571817 × 10⁻³⁴ J·s",
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
        value: "6.62607015 × 10⁻³⁴ J·s",
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
        value: "≈ 2.81794 × 10⁻¹⁵ m",
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
        value: "≈ 1.616255 × 10⁻³⁵ m",
        unit: "m",
        details: "<h3>Bedeutung:</h3>Die absolute untere Grenze der sinnvollen physikalischen Raumzeit-Geometrie. Ergibt sich aus der Kombination von Gravitationskonstante $G$, reduzierter Planck-Konstante $\\hbar$ und Lichtgeschwindigkeit $c$.<br><br><b>Exakte Werte:</b><br>• $\\hbar \\approx 1{,}054571 \\cdot 10^{-34}$ J·s<br>• $G \\approx 6{,}67430 \\cdot 10^{-11}$ m³/(kg·s²)<br>• $\\ell_P \\approx 1{,}616255 \\cdot 10^{-35}$ m",
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
        details: "<h3>Herleitung & Bedeutung:</h3>Setzt man die kinetische Energie gleich der gravitativen Bindungsenergie für ein Objekt, das sich mit Lichtgeschwindigkeit ($v=c$) vom Radius $r$ wegbewegen will, erhält man diesen Grenzradius für Schwarze Löcher.<br><br><b>Komponenten:</b><br>• $G$: Gravitationskonstante<br>• $m$: Masse des Körpers<br>• $c$: Lichtgeschwindigkeit",
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
        details: "<h3>Bedeutung:</h3>Zeigt, dass auf atomarer Ebene die elektromagnetische Wechselwirkung zwischen einem Proton und einem Elektron um rund 39 Größenordnungen ($10^{39}$) stärker ist als deren gravitative Anziehung. Ein zentrales Rätsel für jede vereinheitlichte Feldtheorie.<br><br><b>Werte:</b><br>• $m_p \\approx 1{,}672621 \\cdot 10^{-27}$ kg<br>• $\\varepsilon_0 \\approx 8{,}854187 \\cdot 10^{-12}$ A·s/(V·m)",
        related: ["r_e"],
        keywords: ["Kräfteverhältnis", "Coulomb", "Gravitation"]
    }
];

// Füllt das Grid automatisch auf exakt 25 Slots auf (5x5 System)
for (let i = formulaData.length; i < 25; i++) {
    formulaData.push({
        id: i + 1,
        category: "Erweiterbar",
        symbol: `F_{${i+1}}`,
        name: `Freier Slot ${i + 1}`,
        desc: "Doppelklick auf die Formel, um eigenen LaTeX-Code einzugeben.",
        formula: `$$E = m_{${i+1}} c^2$$`,
        value: "—",
        unit: "—",
        details: "<h3>Details bearbeiten</h3><p>Du kannst diese Beschreibung direkt hier im Modal bearbeiten.</p>",
        related: [],
        keywords: ["Slot"]
    });
}

const grid = document.getElementById('card-grid');

// Grid rendern
function renderGrid() {
    grid.innerHTML = '';
    formulaData.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.onclick = () => showDetails(index);
        
        const badgeDisplay = card.value && card.value !== "—" ? `<span class="value-badge">${card.value}</span>` : "";
        
        cardEl.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <h3 contenteditable="true" onclick="event.stopPropagation()" onblur="updateCard(${index}, 'name', this.innerText)">${card.name}</h3>
                <button title="LaTeX kopieren" class="copy-btn" onclick="event.stopPropagation(); copyLaTeX(${index})">📋</button>
            </div>
            <div class="formula" id="formula-${index}" onclick="event.stopPropagation()">${card.formula}</div>
            <p contenteditable="true" onclick="event.stopPropagation()" onblur="updateCard(${index}, 'desc', this.innerText)">${card.desc}</p>
            <div class="card-footer">${badgeDisplay}</div>
        `;
        
        const formulaDiv = cardEl.querySelector(`#formula-${index}`);
        formulaDiv.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            startFormulaEdit(index, formulaDiv);
        });

        grid.appendChild(cardEl);
    });
    triggerMathJax();
}

function updateCard(index, field, value) {
    formulaData[index][field] = value;
}

function startFormulaEdit(index, element) {
    element.removeAttribute('onclick');
    element.innerText = formulaData[index].formula;
    element.contentEditable = true;
    element.focus();
    
    element.onblur = function() {
        element.contentEditable = false;
        formulaData[index].formula = element.innerText;
        renderGrid();
    };
}

function showDetails(index) {
    const card = formulaData[index];
    
    // Editierbarer Titel im Modal
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerText = card.name;
    modalTitle.contentEditable = true;
    modalTitle.onblur = () => updateCard(index, 'name', modalTitle.innerText);
    
    let metaInfo = `
        <div style="margin-bottom: 15px; opacity: 0.8; font-size: 0.9rem;">
            <b>Kategorie:</b> ${card.category} | <b>Wert:</b> ${card.value} ${card.unit !== "—" ? card.unit : ""}
        </div>
    `;
    
    let formulaBlock = `
        <div style="display:flex; justify-content:center; align-items:center; gap:10px; margin:15px 0;">
            <div style="font-size:1.6rem;">${card.formula}</div>
            <button class="copy-btn" onclick="copyLaTeX(${index})">📋 LaTeX kopieren</button>
        </div>
    `;
    
    let detailsBlock = `
        <div id="modal-details-content" contenteditable="true" style="border: 1px dashed var(--border-color); padding: 10px; border-radius: 6px;" onblur="updateCard(${index}, 'details', this.innerHTML)">
            ${card.details}
        </div>
    `;

    document.getElementById('modal-body').innerHTML = metaInfo + formulaBlock + detailsBlock;
    document.getElementById('modal').style.display = 'flex';
    triggerMathJax();
}

// Funktion zum Kopieren des LaTeX-Codes
function copyLaTeX(index) {
    const rawFormula = formulaData[index].formula;
    // Entfernt $$ oder $ Tags für reinen LaTeX-Code
    const cleanFormula = rawFormula.replace(/^\$\$|\$\$$|^\$|\$$/g, '').trim();
    
    navigator.clipboard.writeText(cleanFormula).then(() => {
        alert("LaTeX-Code in die Zwischenablage kopiert:\n" + cleanFormula);
    }).catch(err => {
        console.error('Fehler beim Kopieren: ', err);
    });
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    renderGrid(); // Aktualisiert das Grid, falls Titel im Modal geändert wurden
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