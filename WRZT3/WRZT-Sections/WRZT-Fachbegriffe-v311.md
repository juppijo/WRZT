<div align="center">
    <h1 style="
        background:#000033;
        color:yellow;
        border:2px solid #3399FF;
        padding:15px;
        border-radius:10px;
        margin:20px auto;
        display:inline-block;
        font-family:Arial, Helvetica, sans-serif;
        text-shadow:
            0 0 6px rgba(255,215,0,0.8),
            0 0 14px rgba(255,215,0,0.45);
        box-shadow:0 0 15px rgba(51,153,255,0.4);">
        💡 WRZT – Wellen-Raumzeit-Theorie.  ✨
    </h1>
</div>

![Zaminia](https://juppijo.github.io/WRZT/titelbild.jpeg)

---

# ✨  Fiat Lux – Es Werde Licht
## Das Einheits-Manifest der Wellenraumzeit-Theorie 
*Relativistische Korrekturfassung 2026 | Autoren: Jo D. (@juppijo) & Zaminia*

>  - Wellenraumzeit-Theorie (WRZT) vers. 3.11
# ✨ Formel Tabelle.
---
```python
import os
from weasyprint import HTML

html_content = """<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<style>
    @page {
        size: A4 landscape;
        margin: 12mm 10mm;
        background-color: #0d1117;
    }
    *, *::before, *::after {
        box-sizing: border-box;
    }
    body {
        font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
        color: #e6edf3;
        background-color: #0d1117;
        margin: 0;
        padding: 0;
        font-size: 8.5pt;
        line-height: 1.3;
    }
    .header {
        background: linear-gradient(135deg, #090d16 0%, #161b22 100%);
        border: 1px solid #30363d;
        border-left: 4px solid #58a6ff;
        padding: 10px 15px;
        margin-bottom: 12px;
        border-radius: 6px;
    }
    .header h1 {
        color: #58a6ff;
        font-size: 16pt;
        margin: 0 0 4px 0;
        font-weight: 700;
        letter-spacing: 0.5px;
    }
    .header p {
        color: #8b949e;
        margin: 0;
        font-size: 9pt;
    }
    .category-title {
        color: #f0883e;
        font-size: 10pt;
        font-weight: bold;
        margin: 10px 0 4px 0;
        padding-bottom: 2px;
        border-bottom: 1px solid #30363d;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 10px;
        table-layout: fixed;
    }
    th {
        background-color: #161b22;
        color: #79c0ff;
        text-align: left;
        padding: 5px 7px;
        font-size: 8pt;
        font-weight: 600;
        border: 1px solid #30363d;
        text-transform: uppercase;
        letter-spacing: 0.3px;
    }
    td {
        padding: 4px 6px;
        border: 1px solid #21262d;
        vertical-align: top;
        word-wrap: break-word;
    }
    tr:nth-child(even) {
        background-color: #121721;
    }
    tr:nth-child(odd) {
        background-color: #0d1117;
    }
    .col-num { width: 4%; text-align: center; color: #8b949e; font-size: 7.5pt; }
    .col-name { width: 22%; font-weight: 600; color: #e6edf3; }
    .col-symbol { width: 8%; font-family: monospace; color: #d2a8ff; text-align: center; }
    .col-formula { width: 26%; font-family: 'Times New Roman', serif; font-style: italic; color: #79c0ff; }
    .col-value { width: 18%; font-family: monospace; color: #a5d6ff; }
    .col-unit { width: 8%; font-family: monospace; color: #7ee787; }
    .col-desc { width: 14%; color: #c9d1d9; font-size: 7.5pt; }

    .math {
        font-family: 'Times New Roman', serif;
        font-style: italic;
    }
    .footer {
        text-align: center;
        color: #8b949e;
        font-size: 7.5pt;
        margin-top: 10px;
        padding-top: 6px;
        border-top: 1px solid #21262d;
    }
</style>
</head>
<body>

<div class="header">
    <h1>💡 WRZT – Wellen-Raumzeit-Theorie: Formelsammlung & Konstanten</h1>
    <p>Das Einheits-Manifest der Wellenraumzeit-Theorie (Vers. 3.03 – 3.07) | Autoren: Jo D. (@juppijo) & Zaminia (2026)</p>
</div>

<div class="category-title">1. Fundamentale Raumzeit-Netzkonstanten & Ur-Größen</div>
<table>
    <thead>
        <tr>
            <th class="col-num">#</th>
            <th class="col-name">Bezeichnung</th>
            <th class="col-symbol">Symbol</th>
            <th class="col-formula">Formel / Beziehung</th>
            <th class="col-value">Exakter / Präziser Wert</th>
            <th class="col-unit">Einheit</th>
            <th class="col-desc">Kurzbeschreibung</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="col-num">1</td>
            <td class="col-name">Minimal-Radius (Quanten-Grenzfall)</td>
            <td class="col-symbol">R<sub>min,0</sub></td>
            <td class="col-formula">R<sub>min,0</sub> = &hbar; / (2 m<sub>e</sub> c) = &bar;&lambda;<sub>c</sub> / 2</td>
            <td class="col-value">1,930 796 &times; 10<sup>-13</sup></td>
            <td class="col-unit">m</td>
            <td class="col-desc">Fundamentaler Knotenabstand & Maschenweite im Paar-System.</td>
        </tr>
        <tr>
            <td class="col-num">2</td>
            <td class="col-name">Ruhe-Raumzeit-Trägheit</td>
            <td class="col-symbol">&eta;<sub>0</sub></td>
            <td class="col-formula">&eta;<sub>0</sub> = m<sub>e</sub> / 2 = &hbar; / (2 c R<sub>min</sub>)</td>
            <td class="col-value">4,554 692 &times; 10<sup>-31</sup></td>
            <td class="col-unit">kg</td>
            <td class="col-desc">Fundamentale Trägheitsmasse eines einzelnen Netzknotens.</td>
        </tr>
        <tr>
            <td class="col-num">3</td>
            <td class="col-name">1D-Ruhe-Urspannung (Linien-Spannung)</td>
            <td class="col-symbol">&Xi;<sub>0</sub></td>
            <td class="col-formula">&Xi;<sub>0</sub> = &eta;<sub>0</sub> / R<sub>min,0</sub> = m<sub>e</sub><sup>2</sup> c / &hbar;</td>
            <td class="col-value">2,358 826 &times; 10<sup>-18</sup><br><i>(Kalibriert: 5,8974&times;10<sup>-19</sup>)</i></td>
            <td class="col-unit">kg / m</td>
            <td class="col-desc">Elastische Linienspannung der Raumzeit-Stränge.</td>
        </tr>
        <tr>
            <td class="col-num">4</td>
            <td class="col-name">3D-Ur-Volumendichte</td>
            <td class="col-symbol">&rho;<sub>Ur,0</sub></td>
            <td class="col-formula">&rho;<sub>Ur,0</sub> = &eta;<sub>0</sub> / R<sub>min,0</sub><sup>3</sup> = 4 m<sub>e</sub><sup>4</sup> c<sup>3</sup> / &hbar;<sup>3</sup></td>
            <td class="col-value">6,330 062 &times; 10<sup>7</sup></td>
            <td class="col-unit">kg / m<sup>3</sup></td>
            <td class="col-desc">Massen-/Trägheitsdichte des ungestörten Vakuumnetzes.</td>
        </tr>
        <tr>
            <td class="col-num">5</td>
            <td class="col-name">3D-Ur-Druck (Volumen-Spannung)</td>
            <td class="col-symbol">P<sub>Ur,0</sub></td>
            <td class="col-formula">P<sub>Ur,0</sub> = &rho;<sub>Ur,0</sub> &middot; c<sup>2</sup> = 4 m<sub>e</sub><sup>4</sup> c<sup>5</sup> / &hbar;<sup>3</sup></td>
            <td class="col-value">5,689 104 &times; 10<sup>24</sup></td>
            <td class="col-unit">N / m<sup>2</sup><br>(J/m<sup>3</sup>)</td>
            <td class="col-desc">Elastische Volumen-Spannung / Energiedichte des 3D-Netzes.</td>
        </tr>
        <tr>
            <td class="col-num">6</td>
            <td class="col-name">Lichtgeschwindigkeit (Netz-Welle)</td>
            <td class="col-symbol">c</td>
            <td class="col-formula">c = &radic;(P<sub>Ur</sub> / &rho;<sub>Ur</sub>) = (&Xi; / &eta;) &middot; R<sub>min</sub></td>
            <td class="col-value">299 792 458</td>
            <td class="col-unit">m / s</td>
            <td class="col-desc">Phasengeschwindigkeit von Transversal-/Elastizitätswellen.</td>
        </tr>
        <tr>
            <td class="col-num">7</td>
            <td class="col-name">Fundamentale Knotenkraft</td>
            <td class="col-symbol">F<sub>Knoten</sub></td>
            <td class="col-formula">F<sub>Knoten</sub> = (&eta; &middot; c<sup>2</sup>) / R<sub>min</sub></td>
            <td class="col-value">&approx; 2,12 &times; 10<sup>-1</sup></td>
            <td class="col-unit">N</td>
            <td class="col-desc">Kopplungskraft zwischen zwei benachbarten Netzknoten.</td>
        </tr>
    </tbody>
</table>

<div class="category-title">2. Relativistische Transformationen (Lorentz-Faktor &gamma;)</div>
<table>
    <thead>
        <tr>
            <th class="col-num">#</th>
            <th class="col-name">Bezeichnung</th>
            <th class="col-symbol">Symbol</th>
            <th class="col-formula">Formel / Beziehung</th>
            <th class="col-value">Skalierung / Verhalten</th>
            <th class="col-unit">Einheit</th>
            <th class="col-desc">Kurzbeschreibung</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="col-num">8</td>
            <td class="col-name">Lorentz-Faktor</td>
            <td class="col-symbol">&gamma;</td>
            <td class="col-formula">&gamma; = 1 / &radic;(1 - v<sup>2</sup>/c<sup>2</sup>)</td>
            <td class="col-value">&ge; 1 (dimensionlos)</td>
            <td class="col-unit">1</td>
            <td class="col-desc">Relativistischer Korrekturfaktor für Geschwindigkeit v.</td>
        </tr>
        <tr>
            <td class="col-num">9</td>
            <td class="col-name">Relativistischer Radius</td>
            <td class="col-symbol">R(&gamma;)</td>
            <td class="col-formula">R(&gamma;) = R<sub>min,0</sub> / &gamma; = &hbar; / (2 &gamma; m<sub>e</sub> c)</td>
            <td class="col-value">Skaliert mit &gamma;<sup>-1</sup></td>
            <td class="col-unit">m</td>
            <td class="col-desc">Lorentz-kontrahierter Rotationsradius im Wellenfeld.</td>
        </tr>
        <tr>
            <td class="col-num">10</td>
            <td class="col-name">Relativistische Knoten-Trägheit</td>
            <td class="col-symbol">&eta;(&gamma;)</td>
            <td class="col-formula">&eta;(&gamma;) = &gamma; &middot; &eta;<sub>0</sub> = &gamma; &middot; (m<sub>e</sub> / 2)</td>
            <td class="col-value">Skaliert mit &gamma;<sup>1</sup></td>
            <td class="col-unit">kg</td>
            <td class="col-desc">Effektive Knotenmasse bei relativistischer Bewegung.</td>
        </tr>
        <tr>
            <td class="col-num">11</td>
            <td class="col-name">Relativistische 1D-Urspannung</td>
            <td class="col-symbol">&Xi;(&gamma;)</td>
            <td class="col-formula">&Xi;(&gamma;) = &gamma;<sup>2</sup> &middot; &Xi;<sub>0</sub> = &gamma;<sup>2</sup> (m<sub>e</sub><sup>2</sup> c / &hbar;)</td>
            <td class="col-value">Skaliert mit &gamma;<sup>2</sup></td>
            <td class="col-unit">kg / m</td>
            <td class="col-desc">Dynamische Zunahme der Linienspannung.</td>
        </tr>
        <tr>
            <td class="col-num">12</td>
            <td class="col-name">Relativistische 3D-Ur-Dichte</td>
            <td class="col-symbol">&rho;<sub>Ur</sub>(&gamma;)</td>
            <td class="col-formula">&rho;<sub>Ur</sub>(&gamma;) = &gamma;<sup>4</sup> &middot; &rho;<sub>Ur,0</sub></td>
            <td class="col-value">Skaliert mit &gamma;<sup>4</sup></td>
            <td class="col-unit">kg / m<sup>3</sup></td>
            <td class="col-desc">Netzdichte unter relativistischer Verdichtung.</td>
        </tr>
        <tr>
            <td class="col-num">13</td>
            <td class="col-name">Relativistischer 3D-Ur-Druck</td>
            <td class="col-symbol">P<sub>Ur</sub>(&gamma;)</td>
            <td class="col-formula">P<sub>Ur</sub>(&gamma;) = &gamma;<sup>4</sup> &middot; P<sub>Ur,0</sub></td>
            <td class="col-value">Skaliert mit &gamma;<sup>4</sup></td>
            <td class="col-unit">N / m<sup>2</sup></td>
            <td class="col-desc">Dynamischer Volumendruck bei relativistischer Energie.</td>
        </tr>
        <tr>
            <td class="col-num">14</td>
            <td class="col-name">Relativistische Gesamtenergie</td>
            <td class="col-symbol">E(&gamma;)</td>
            <td class="col-formula">E(&gamma;) = &gamma; m<sub>e</sub> c<sup>2</sup> = &hbar; &omega;(&gamma;)</td>
            <td class="col-value">Skaliert mit &gamma;<sup>1</sup></td>
            <td class="col-unit">J (eV)</td>
            <td class="col-desc">Relativistische Energie des rotierenden Wellensystems.</td>
        </tr>
        <tr>
            <td class="col-num">15</td>
            <td class="col-name">Phasen-Bugwinkel</td>
            <td class="col-symbol">&theta;</td>
            <td class="col-formula">sin(&theta;) = 1 / &gamma;</td>
            <td class="col-value">Winkel 0&deg; bis 90&deg;</td>
            <td class="col-unit">rad / &deg;</td>
            <td class="col-desc">Phasen-Öffnungswinkel der propagierenden Welle.</td>
        </tr>
    </tbody>
</table>

<div class="category-title">3. Natürliches WRZT-Einheitensystem (c = 1, dimensionslos)</div>
<table>
    <thead>
        <tr>
            <th class="col-num">#</th>
            <th class="col-name">Bezeichnung</th>
            <th class="col-symbol">Symbol</th>
            <th class="col-formula">Formel (c = 1)</th>
            <th class="col-value">Einheiten-Check (c=1)</th>
            <th class="col-unit">SI-Bezug</th>
            <th class="col-desc">Kurzbeschreibung</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="col-num">16</td>
            <td class="col-name">WRZT-Grundgleichung Radius</td>
            <td class="col-symbol">R(&gamma;)</td>
            <td class="col-formula">R(&gamma;) = &eta; / (&gamma; &middot; &Xi;)</td>
            <td class="col-value">[kg] / [kg/m] = [m]</td>
            <td class="col-unit">m</td>
            <td class="col-desc">Verknüpfung von Radius, Trägheit und Spannung.</td>
        </tr>
        <tr>
            <td class="col-num">17</td>
            <td class="col-name">WRZT-Grundgleichung Spannung</td>
            <td class="col-symbol">&Xi;</td>
            <td class="col-formula">&Xi; = &eta; / (&gamma; &middot; R(&gamma;))</td>
            <td class="col-value">[kg] / [m] = [kg/m]</td>
            <td class="col-unit">kg / m</td>
            <td class="col-desc">Erforderliche Netznspannung für gegebenen Radius.</td>
        </tr>
        <tr>
            <td class="col-num">18</td>
            <td class="col-name">WRZT-Grundgleichung Trägheit</td>
            <td class="col-symbol">&eta;</td>
            <td class="col-formula">&eta; = &gamma; &middot; &Xi; &middot; R(&gamma;)</td>
            <td class="col-value">[kg/m] &middot; [m] = [kg]</td>
            <td class="col-unit">kg</td>
            <td class="col-desc">Knotenträgheit aus Spannung und Netzradius.</td>
        </tr>
        <tr>
            <td class="col-num">19</td>
            <td class="col-name">SI-Rückumrechnung Radius</td>
            <td class="col-symbol">R<sub>min</sub></td>
            <td class="col-formula">R<sub>min</sub> = (&eta; &middot; c<sup>2</sup>) / &Xi;</td>
            <td class="col-value">[kg m<sup>2</sup>/s<sup>2</sup>] / [kg/m] = [m<sup>3</sup>/s<sup>2</sup>]</td>
            <td class="col-unit">m</td>
            <td class="col-desc">SI-Transformation der Grundgleichung mit c<sup>2</sup>.</td>
        </tr>
    </tbody>
</table>

<div class="category-title">4. Quantenmechanische & Elektromagnetische Skalen</div>
<table>
    <thead>
        <tr>
            <th class="col-num">#</th>
            <th class="col-name">Bezeichnung</th>
            <th class="col-symbol">Symbol</th>
            <th class="col-formula">Formel / Beziehung</th>
            <th class="col-value">Exakter / Präziser Wert</th>
            <th class="col-unit">Einheit</th>
            <th class="col-desc">Kurzbeschreibung</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="col-num">20</td>
            <td class="col-name">Klassischer Elektronenradius</td>
            <td class="col-symbol">r<sub>e</sub></td>
            <td class="col-formula">r<sub>e</sub> = e<sup>2</sup> / (4&pi; &epsilon;<sub>0</sub> m<sub>e</sub> c<sup>2</sup>) = &alpha; &middot; &bar;&lambda;<sub>c</sub></td>
            <td class="col-value">2,817 940 &times; 10<sup>-15</sup></td>
            <td class="col-unit">m (fm)</td>
            <td class="col-desc">Elektrostatische Kern-Skala (Gleichgewicht F<sub>Z</sub> = F<sub>C</sub>).</td>
        </tr>
        <tr>
            <td class="col-num">21</td>
            <td class="col-name">Compton-Wellenlänge</td>
            <td class="col-symbol">&lambda;<sub>c</sub></td>
            <td class="col-formula">&lambda;<sub>c</sub> = h / (m<sub>e</sub> c) = c / &nu;<sub>Annih.</sub></td>
            <td class="col-value">2,426 310 &times; 10<sup>-12</sup></td>
            <td class="col-unit">m (pm)</td>
            <td class="col-desc">Wellenlänge der e<sup>-</sup> e<sup>+</sup> Annihilationsstrahlung.</td>
        </tr>
        <tr>
            <td class="col-num">22</td>
            <td class="col-name">Reduzierte Compton-Wellenlänge</td>
            <td class="col-symbol">&bar;&lambda;<sub>c</sub></td>
            <td class="col-formula">&bar;&lambda;<sub>c</sub> = &lambda;<sub>c</sub> / (2&pi;) = &hbar; / (m<sub>e</sub> c)</td>
            <td class="col-value">3,861 592 &times; 10<sup>-13</sup></td>
            <td class="col-unit">m (pm)</td>
            <td class="col-desc">Wellenradius / Spin-Hebelarm (Spin S = &hbar;).</td>
        </tr>
        <tr>
            <td class="col-num">23</td>
            <td class="col-name">Annihilationsfrequenz</td>
            <td class="col-symbol">&nu;<sub>Annih</sub></td>
            <td class="col-formula">&nu; = (m<sub>e</sub> c<sup>2</sup>) / h</td>
            <td class="col-value">1,235 638 &times; 10<sup>20</sup></td>
            <td class="col-unit">Hz (EHz)</td>
            <td class="col-desc">Fundamentale Oszillationsfrequenz (Ruhemasse m<sub>e</sub>).</td>
        </tr>
        <tr>
            <td class="col-num">24</td>
            <td class="col-name">Annihilationsenergie / Photon</td>
            <td class="col-symbol">E<sub>&gamma;</sub></td>
            <td class="col-formula">E = m<sub>e</sub> c<sup>2</sup> = h &nu;</td>
            <td class="col-value">510 998,95 (0,511 MeV)</td>
            <td class="col-unit">eV</td>
            <td class="col-desc">Ruheenergie des Elektrons / Gammaphotons.</td>
        </tr>
        <tr>
            <td class="col-num">25</td>
            <td class="col-name">Feinstrukturkonstante</td>
            <td class="col-symbol">&alpha;</td>
            <td class="col-formula">&alpha; = r<sub>e</sub> / &bar;&lambda;<sub>c</sub> = e<sup>2</sup> / (4&pi; &epsilon;<sub>0</sub> &hbar; c)</td>
            <td class="col-value">&approx; 1 / 137,035 999</td>
            <td class="col-unit">1</td>
            <td class="col-desc">Verhältnis von innerem (r<sub>e</sub>) zu äußerem Radius (&bar;&lambda;<sub>c</sub>).</td>
        </tr>
        <tr>
            <td class="col-num">26</td>
            <td class="col-name">Dynamische Masse Photon</td>
            <td class="col-symbol">m<sub>&gamma;</sub></td>
            <td class="col-formula">m<sub>&gamma;</sub> = (h &nu;) / c<sup>2</sup> = E / c<sup>2</sup></td>
            <td class="col-value">m<sub>&gamma;</sub>(m<sub>e</sub>) = 9,109&times;10<sup>-31</sup></td>
            <td class="col-unit">kg</td>
            <td class="col-desc">Relativistische Masse eines Photons (Ruhemasse m<sub>0</sub> = 0).</td>
        </tr>
        <tr>
            <td class="col-num">27</td>
            <td class="col-name">Photonenimpuls</td>
            <td class="col-symbol">p<sub>&gamma;</sub></td>
            <td class="col-formula">p = m<sub>&gamma;</sub> &middot; c = h / &lambda; = E / c</td>
            <td class="col-value">Skaliert mit &lambda;<sup>-1</sup></td>
            <td class="col-unit">kg m / s</td>
            <td class="col-desc">Bewegungsgröße / Ursache des Strahlungsdrucks.</td>
        </tr>
        <tr>
            <td class="col-num">28</td>
            <td class="col-name">Elektronenvolt Umrechnung</td>
            <td class="col-symbol">1 eV</td>
            <td class="col-formula">1 eV = e &middot; 1 V</td>
            <td class="col-value">1,602 176 634 &times; 10<sup>-19</sup></td>
            <td class="col-unit">J</td>
            <td class="col-desc">Kinetische Energie eines Elektrons bei 1 V Spannung.</td>
        </tr>
    </tbody>
</table>

<div class="footer">
    🌀 🌌 ✨ Wellen-Raumzeit-Theorie (WRZT) – Alle Formeln, Werte, Einheiten und Beschreibungen aus den Manifest-Versionen 3.03 – 3.07 | © 2026 Jo D. & Zaminia ✨ 🌌 🌀
</div>

</body>
</html>
"""

html_file = "WRZT_Formelsammlung_Manifest_307.html"
pdf_file = "WRZT_Formelsammlung_Manifest_307.pdf"

with open(html_file, "w", encoding="utf-8") as f:
    f.write(html_content)

HTML(filename=html_file).write_pdf(pdf_file)
print(f"PDF successfully created: {pdf_file}")


```

```text
PDF successfully created: WRZT_Formelsammlung_Manifest_307.pdf


```

Hier ist die vollständige Übersicht aller Formeln, mathematischen Beziehungen, physikalischen Werte, Einheiten und Kurzbeschreibungen der **Wellen-Raumzeit-Theorie (WRZT)** aus den Manifest-Versionen 3.03 bis 3.07.

Ihre PDF-Datei ist bereit


---

### 1. Fundamentale Raumzeit-Netzkonstanten & Ur-Größen

| # | Bezeichnung | Symbol | Formel / mathematische Beziehung | Exakter / Präziser Wert | Einheit | Kurzbeschreibung |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | **Minimal-Radius (Ruhezustand)**<br> | $R_{\text{min},0}$ | $R_{\text{min},0} = \frac{\bar{\lambda}_c}{2} = \frac{\hbar}{2 m_e c}$<br> | $1{,}930\,796 \times 10^{-13}$<br> | $\text{m}$<br> | Fundamentaler Knotenabstand & Maschenweite im Zwei-Körper-System.

 |
| **2** | **Ruhe-Raumzeit-Trägheit**<br> | $\eta_0$ | $\eta_0 = \frac{m_e}{2} = \frac{\hbar}{2 c R_{\text{min}}}$ | $4{,}554\,692 \times 10^{-31}$ | $\text{kg}$ | Fundamentale Trägheitsmasse eines einzelnen Netzknotens.

 |
| **3** | **1D-Ruhe-Urspannung**<br> | $\Xi_0$ | $\Xi_0 = \frac{\eta_0}{R_{\text{min},0}} = \frac{m_e^2 c}{\hbar}$ | $2{,}358\,826 \times 10^{-18}$ *(Kalibriert: $5{,}8974 \times 10^{-19}$)* | $\text{kg}/\text{m}$ | Elastische Linienspannung der Raumzeit-Stränge.

 |
| **4** | **3D-Ur-Volumendichte**<br> | $\rho_{\text{Ur},0}$ | $\rho_{\text{Ur},0} = \frac{\eta_0}{R_{\text{min},0}^3} = \frac{4 m_e^4 c^3}{\hbar^3}$<br> | $6{,}330\,062 \times 10^7$ | $\text{kg}/\text{m}^3$<br> | Trägheitsdichte pro Raumeinheit im ungestörten Vakuumnetz.

 |
| **5** | **3D-Ur-Druck / Volumen-Spannung**<br> | $P_{\text{Ur},0}$ | $P_{\text{Ur},0} = \rho_{\text{Ur},0} \cdot c^2 = \frac{4 m_e^4 c^5}{\hbar^3}$<br> | $5{,}689\,104 \times 10^{24}$ | $\text{N}/\text{m}^2$ $(\text{J}/\text{m}^3)$<br> | Elastische Volumen-Spannung (Energiedichte) des 3D-Netzes.

 |
| **6** | **Lichtgeschwindigkeit**<br> | $c$ | $c = \sqrt{\frac{P_{\text{Ur}}}{\rho_{\text{Ur}}}} = \frac{\Xi}{\eta} \cdot R_{\text{min}}$<br> | $299\,792\,458$ | $\text{m}/\text{s}$<br> | Ausbreitungsgeschwindigkeit der Raumzeit-Welle.

 |
| **7** | **Fundamentale Knotenkraft**<br> | $F_{\text{Knoten}}$ | $F_{\text{Knoten}} = \frac{\eta \cdot c^2}{R_{\text{min}}}$<br> | $\approx 0{,}212$ | $\text{N}$ | Elastische Kopplungskraft zweier benachbarter Netzknoten.

 |

---

### 2. Relativistische Transformationen (Lorentz-Faktor $\gamma$)

| # | Bezeichnung | Symbol | Formel / mathematische Beziehung | Skalierung / Verhalten | Einheit | Kurzbeschreibung |
| --- | --- | --- | --- | --- | --- | --- |
| **8** | **Lorentz-Faktor**<br> | $\gamma$ | $\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}$<br> | $\ge 1$<br> | $1$ | Relativistischer Korrekturfaktor für Geschwindigkeit $v$.

 |
| **9** | **Relativistischer Radius**<br> | $R(\gamma)$ | $R(\gamma) = \frac{R_{\text{min},0}}{\gamma} = \frac{\hbar}{2 \gamma m_e c}$<br> | Skaliert mit $\gamma^{-1}$<br> | $\text{m}$ | Lorentz-kontrahierter Rotationsradius im Wellenfeld.

 |
| **10** | **Relativistische Trägheit** | $\eta(\gamma)$ | $\eta(\gamma) = \gamma \cdot \eta_0 = \gamma \cdot \frac{m_e}{2}$ | Skaliert mit $\gamma^1$ | $\text{kg}$ | Effektive Trägheit des Netzknotens bei Bewegung. |
| **11** | **Relativistische 1D-Urspannung** | $\Xi(\gamma)$ | $\Xi(\gamma) = \gamma^2 \cdot \Xi_0 = \gamma^2 \frac{m_e^2 c}{\hbar}$ | Skaliert mit $\gamma^2$ | $\text{kg}/\text{m}$ | Dynamische Zunahme der Linienspannung im Netz. |
| **12** | **Relativistische 3D-Ur-Dichte** | $\rho_{\text{Ur}}(\gamma)$ | $\rho_{\text{Ur}}(\gamma) = \gamma^4 \cdot \rho_{\text{Ur},0}$ | Skaliert mit $\gamma^4$ | $\text{kg}/\text{m}^3$ | Netzdichte unter relativistischer Verdichtung. |
| **13** | **Relativistischer 3D-Ur-Druck** | $P_{\text{Ur}}(\gamma)$ | $P_{\text{Ur}}(\gamma) = \gamma^4 \cdot P_{\text{Ur},0}$ | Skaliert mit $\gamma^4$ | $\text{N}/\text{m}^2$ | Dynamischer Volumendruck im beschleunigten System. |
| **14** | **Relativistische Gesamtenergie**<br> | $E(\gamma)$ | $E(\gamma) = \gamma m_e c^2 = \hbar \cdot \omega(\gamma)$<br> | Skaliert mit $\gamma^1$ | $\text{J}$ ($\text{eV}$) | Energie des relativistisch rotierenden Wellensystems.

 |
| **15** | **Phasen-Bugwinkel**<br> | $\theta$ | $\sin(\theta) = \frac{1}{\gamma}$<br> | $0^\circ \text{ bis } 90^\circ$ | $\text{rad}$ / $^\circ$ | Phasen-Öffnungswinkel der propagierenden Welle.

 |

---

### 3. Natürliches WRZT-Einheitensystem ($c = 1$, dimensionslos)

| # | Bezeichnung | Symbol | Formel ($c = 1$) | Einheiten-Check | SI-Bezug | Kurzbeschreibung |
| --- | --- | --- | --- | --- | --- | --- |
| **16** | **WRZT-Radius-Gleichung** | $R(\gamma)$ | $R(\gamma) = \frac{\eta}{\gamma \cdot \Xi}$ | $[\text{kg}] / [\text{kg}/\text{m}] = [\text{m}]$ | $\text{m}$ | Fundamentalbeziehung zwischen Radius, Trägheit & Spannung. |
| **17** | **WRZT-Spannungs-Gleichung** | $\Xi$ | $\Xi = \frac{\eta}{\gamma \cdot R(\gamma)}$ | $[\text{kg}] / [\text{m}] = [\text{kg}/\text{m}]$ | $\text{kg}/\text{m}$ | Erforderliche Netznspannung für gegebenen Radius. |
| **18** | **WRZT-Trägheits-Gleichung** | $\eta$ | $\eta = \gamma \cdot \Xi \cdot R(\gamma)$ | $[\text{kg}/\text{m}] \cdot [\text{m}] = [\text{kg}]$ | $\text{kg}$ | Knotenträgheit aus Spannung und Maschenradius. |
| **19** | **SI-Rückumrechnung Radius** | $R_{\text{min}}$ | $R_{\text{min}} = \frac{\eta \cdot c^2}{\Xi}$ | $[\text{kg}\cdot\text{m}^2/\text{s}^2] / [\text{kg}/\text{m}] = [\text{m}^3/\text{s}^2]$ | $\text{m}$ | SI-Transformation der Grundgleichung mit dem Skalar $c^2$. |

---

### 4. Quantenmechanische & Elektromagnetische Skalen

| # | Bezeichnung | Symbol | Formel / mathematische Beziehung | Exakter / Präziser Wert | Einheit | Kurzbeschreibung |
| --- | --- | --- | --- | --- | --- | --- |
| **20** | **Klassischer Elektronenradius**<br> | $r_e$ | $r_e = \frac{e^2}{4\pi \varepsilon_0 m_e c^2} = \alpha \cdot \bar{\lambda}_c$<br> | $2{,}817\,940 \times 10^{-15}$<br> | $\text{m}$ ($\text{fm}$)

 | Elektrostatische Kern-Skala ($F_Z = F_C$).

 |
| **21** | **Compton-Wellenlänge**<br> | $\lambda_c$ | $\lambda_c = \frac{h}{m_e c} = \frac{c}{\nu_{\text{Annih}}}$<br> | $2{,}426\,310 \times 10^{-12}$<br> | $\text{m}$ ($\text{pm}$)

 | Wellenlänge der $e^- e^+$ Annihilationsstrahlung.

 |
| **22** | **Reduzierte Compton-Wellenlänge**<br> | $\bar{\lambda}_c$ | $\bar{\lambda}_c = \frac{\lambda_c}{2\pi} = \frac{\hbar}{m_e c}$<br> | $3{,}861\,592 \times 10^{-13}$<br> | $\text{m}$ ($\text{pm}$)

 | Wellenradius / Spin-Hebelarm (Spin $S = \hbar$).

 |
| **23** | **Annihilationsfrequenz**<br> | $\nu_{\text{Annih}}$ | $\nu = \frac{m_e c^2}{h}$<br> | $1{,}235\,638 \times 10^{20}$<br> | $\text{Hz}$ ($\text{EHz}$)

 | Fundamentale Oszillationsfrequenz der Ruhemasse $m_e$.

 |
| **24** | **Annihilationsenergie / Photon**<br> | $E_\gamma$ | $E = m_e c^2 = h \nu$<br> | $510\,998{,}95 \text{ eV} \approx 0{,}511 \text{ MeV}$<br> | $\text{eV}$<br> | Ruheenergie des Elektrons / Gammaphotons.

 |
| **25** | **Feinstrukturkonstante**<br> | $\alpha$ | $\alpha = \frac{r_e}{\bar{\lambda}_c} = \frac{e^2}{4\pi \varepsilon_0 \hbar c}$<br> | $\approx \frac{1}{137{,}035\,999}$<br> | $1$ | Verhältnis von innerem ($r_e$) zu äußerem Radius ($\bar{\lambda}_c$).

 |
| **26** | **Dynamische Masse Photon**<br> | $m_\gamma$ | $m_\gamma = \frac{h \nu}{c^2} = \frac{E}{c^2}$<br> | $m_\gamma(m_e) = 9{,}109 \times 10^{-31}$<br> | $\text{kg}$<br> | Effektive relativistische Masse (Ruhemasse $m_0 = 0$).

 |
| **27** | **Photonenimpuls**<br> | $p_\gamma$ | $p = m_\gamma \cdot c = \frac{h}{\lambda} = \frac{E}{c}$<br> | Skaliert mit $\lambda^{-1}$<br> | $\text{kg}\cdot\text{m}/\text{s}$ | Bewegungsgröße & Ursache des Strahlungsdrucks.

 |
| **28** | **Elektronenvolt Umrechnung**<br> | $1\text{ eV}$<br> | $1\text{ eV} = e \cdot 1\text{ V}$<br> | $1{,}602\,176\,634 \times 10^{-19}$<br> | $\text{J}$<br> | Kinetische Energie eines Elektrons bei $1\text{ V}$ Spannung.

 |

---
##  WRZT-Formelsystem im relativistischen Bereich (mit Lorentz-Faktor $\gamma$)

| Physikalische Größe | Relativistische Formel | Ruhewert ($v=0, \gamma=1$) | Einheit | Skalierung mit $\gamma$ | Kurzbeschreibung |
| --- | --- | --- | --- | --- | --- |
| **Lorentz-Faktor** | $\gamma = \frac{1}{\sqrt{1 - \frac{v^2}{c^2}}}$ | $1{,}0$ | – | $\gamma^1$ | Relativistischer Korrekturfaktor in Abhängigkeit der Geschwindigkeit $v$. |
| **Raumzeit-Trägheit** | $\eta(\gamma) = \gamma \cdot \eta_0$ | $4{,}5543 \times 10^{-31}$ | $\text{kg}$ | $\gamma^1$ | Effektive Trägheitsmasse des Schwingungsknotens; nimmt mit der Bewegung zu. |
| **Minimal-Radius / Gitterabstand** | $R_{\text{min}}(\gamma) = \frac{R_{\text{min},0}}{\gamma} = \frac{\hbar}{2 \gamma m_e c}$ | $1{,}9308 \times 10^{-13}$ | $\text{m}$ | $\gamma^{-1}$ | Lorentz-Kontraktion des fundamentalen Knotenabstands entlang der Bewegungsachse. |
| **1D-Linienspannung / Ur-Spannung** | $\Xi(\gamma) = \frac{\eta(\gamma)}{4 \cdot R_{\text{min}}(\gamma)} = \gamma^2 \cdot \Xi_0$ | $5{,}8974 \times 10^{-19}$ | $\text{kg/m}$ | $\gamma^2$ | Liniendichte/Linienspannung eines Raumzeit-Stranges; skaliert quadratisch durch Trägheitszunahme und Längenkontraktion. |
| **Volumen einer Elementarzelle** | $V(\gamma) = \frac{V_0}{\gamma} = \frac{R_{\text{min},0}^3}{\gamma}$ | $7{,}201 \times 10^{-39}$ | $\text{m}^3$ | $\gamma^{-1}$ | Volumenkompression der gitterartigen 3D-Elementarzelle durch Kontraktion der $x$-Achse. |
| **3D-Raumzeit-Volumendichte** | $\rho(\gamma) = \frac{\eta(\gamma)}{V(\gamma)} = \gamma^2 \cdot \rho_0$ | $6{,}324 \times 10^{7}$ | $\text{kg/m}^3$ | $\gamma^2$ | Räumliche Masse/Trägheitsdichte des Vakuums; $\rho_0 = \frac{4 \Xi_0}{R_{\text{min},0}^2}$. |
| **3D-Ur-Spannung / Vakuumdruck** | $P(\gamma) = \rho(\gamma) \cdot c^2 = \gamma^2 \cdot P_0$ | $5{,}684 \times 10^{24}$ | $\text{N/m}^2$ ($\text{J/m}^3$) | $\gamma^2$ | Elastische 3D-Volumenspannung / Energiedichte des Netzes; entspricht der $T^{00}$-Komponente. |
| **Rotations-/Systemenergie** | $E(\gamma) = \gamma \cdot m_e c^2 = \hbar \cdot \omega(\gamma)$ | $8{,}187 \times 10^{-14}$ ($\approx 511\text{ keV}$) | $\text{J}$ | $\gamma^1$ | Gesamtenergie der kreisenden Raumzeit-Verzerrungen (z. B. Elektron-Positron-System). |
| **Schwingungsfrequenz** | $f(\gamma) = \gamma \cdot f_0 = \frac{\gamma \cdot m_e c^2}{h}$ | $1{,}2356 \times 10^{20}$ | $\text{Hz}$ | $\gamma^1$ | Relativistische Rotations- und Wellenemissionsfrequenz des Paares. |
| **Rotationsradius** | $R(\gamma) = \frac{\hbar \cdot v}{\gamma \cdot m_e c^2}$ | $R_{\text{min},0}$ (für $v \to c$) | $\text{m}$ | $\gamma^{-1}$ | Bahnraddurchmesser des rotierenden Paares; zieht sich bei höherer Energie zusammen. |
| **Lichtgeschwindigkeit** | $c = \sqrt{\frac{P(\gamma)}{\rho(\gamma)}} = \sqrt{\frac{\gamma^2 P_0}{\gamma^2 \rho_0}}$ | $2{,}99792458 \times 10^8$ | $\text{m/s}$ | $\gamma^0$ (Invariant) | Ausbreitungsgeschwindigkeit der Raumzeitwelle; bleibt relativistisch strikt konstant, da sich $\gamma^2$ im Quotienten kürzt. | Fomel Tabelle


---

<footer style="text-align:center; color:#888; font-size:0.9em; margin-top:40px;">
    🌀 🌌  ✨  © 2026 Jo D. & Zaminia – WRZT – Wellen-Raumzeit-Theorie. Vers 3.11  🌀 🌌  ✨ 
</footer>

---
