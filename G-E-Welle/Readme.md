# Wellenfeld-Gleichung der WRZT

Das **„WRZT – Einheits-Manifest“** vereint alle elementaren Parameter – von der Ur-Spannung $\Xi$ bis hin zum Bug-Winkel $\theta$ – in einem konsistenten Wellenfeld.

---

## 1. Die vollständige Wellenfeld-Gleichung

Für zwei Punktquellen, die in der $xy$-Ebene mit dem Radius $a$ und der Winkelfrequenz $\omega$ rotieren, beschreibt die Funktion $\Psi(\vec{r},t)$ die Amplitude der Wellenraumzeit an einem Punkt $\vec{r}$ zur Zeit $t$:

$$\Psi(\vec{r},t) = \sum_{i=1}^{2} \frac{\Xi}{|\vec{r} - \vec{r}_i(t_{\text{ret}})|} \cdot \cos(\Phi_i(\vec{r},t))$$

### Spezialfall: Eine einzelne Quelle
$$\Psi(\vec{r},t) = \frac{\Xi}{|\vec{r} - \vec{r}_1(t_{\text{ret}})|} \cdot \cos\left(\omega\left(-t + \frac{|\vec{r} - \vec{r}_1|}{c} \cdot (1 - M\cos(\alpha_1))\right)\right)$$

### Radiale Expansion
$$\Psi(\vec{r},t) = \frac{\Xi}{|\vec{r} - \vec{r}_s(t)|} \cdot \cos\left(\omega \cdot t - \frac{\omega \cdot r}{c} \cdot (1 - M\cos(\alpha_{\text{rel}}))\right)$$

---

## 2. Die entscheidenden physikalischen Effekte

* **Wellen-Ausbreitung ($\omega\cdot t - k\cdot r$):** Das Minuszeichen vor dem Distanzterm ($r$) sorgt dafür, dass mit fortschreitender Zeit $t$ ein größerer Abstand $r$ nötig ist, um dieselbe Phase zu halten. Die Welle wandert somit physikalisch korrekt nach außen.
* **Uhrzeigersinn:** In der Simulation wird die Rotation der Quellen über folgende Trajektorie umgesetzt:
    $$\vec{r}_s(t) = (a \cdot \cos(\omega t), -a \cdot \sin(\omega t))$$
* **Bugwellen-Korrektur:** Der Term $(1 - M\cos(\alpha_{\text{rel}}))$ staucht die Wellenlänge in Bewegungsrichtung der Singularität. Dies erzeugt die charakteristische Bugwelle bei hohen Geschwindigkeiten nahe der Lichtgeschwindigkeit $c$.

---

## 3. Die Komponenten der Formel im Detail

* **Ur-Spannung ($\Xi$):** Bestimmt die maximale Amplitude der Welle. Dieser Wert ist definiert als:
    $$\Xi \approx 5,897427 \times 10^{-19} \text{ kg/m}$$
* **Retardierte Position ($\vec{r}_i(t_{\text{ret}})$):** Die Position der $i$-ten Quelle zum Zeitpunkt der Emission:
    $$t_{\text{ret}} = t - \frac{|\vec{r} - \vec{r}_i|}{c}$$
* **Wellengeschwindigkeit ($c$):** Wird direkt aus deiner Raumzeit-Strukturformel berechnet:
    $$c = \frac{\Xi}{\eta} \cdot R_{\text{min}}$$
* **Phasenterm ($\Phi_i$):** Beinhaltet die Rotation und die Kompression der Wellenfront (Bugwelle):
    $$\Phi_i(\vec{r},t) = \omega \left( t - \frac{|\vec{r} - \vec{r}_i|}{c} \cdot (1 - M\cos(\alpha_i)) \right) + \Delta\phi_i$$
    * $M = \frac{a \cdot \omega}{c}$ repräsentiert die **Mach-Zahl der Raumzeit**.
    * $\Delta\phi_i$ ist der Phasenversatz. Für zwei exakt gegenüberliegende Quellen gilt $\Delta\phi_1 = 0$ und $\Delta\phi_2 = \pi$.

---

## 4. Der Bug-Winkel $\theta$

In deinem System entsteht eine signifikante Bugwelle, wenn die Bahngeschwindigkeit $v_{\text{rot}} = a \cdot \omega$ die Ausbreitungsgeschwindigkeit $c$ erreicht. Der Winkel $\theta$ dieser Wellenfront zur Bewegungsrichtung der Quelle ist wie folgt definiert:

$$\sin(\theta) = \frac{c}{a \cdot \omega} = \frac{1}{M}$$

---

## 5. Zusammenfassung der Konstanten für das Manifest

Diese Werte dienen als feste Referenz für den HTML-Code deines Manifests:

| Konstante | Symbol | Wert / Formel |
| :--- | :---: | :--- |
| **Ur-Spannung** | $\Xi$ | $5,8993 \times 10^{-19} \text{ kg/m}$ |
| **Raumzeit-Trägheit** | $\eta$ | $4,5543 \times 10^{-31} \text{ kg}$ |
| **Minimal-Radius** | $R_{\text{min}}$ | $7,716 \times 10^{-13} \text{ m}$ |
| **Lichtgeschwindigkeit** | $c$ | $299.792.458 \text{ m/s}$ |
| **Bug-Winkel** | $\theta$ | $\arcsin(c / v_{\text{rot}})$ |

> **Fazit:** Diese mathematische Formulierung beschreibt präzise das dynamische „Wellenraumzeit-Netz“ und zeigt, wie sich Energie-Singularitäten durch die Interferenz ihrer Rotationsfelder im Raum ausbreiten.

---

## 6. Simulations-Changelog (`script.js`)

Es wurden **5 zentrale Stellen** im Code modifiziert, um eine dreidimensionale Verkippung der Umlaufbahn zu ermöglichen:

1.  **State-Erweiterung:** `state.rotTilt = 0.0` wurde als neue Variable hinzugefügt.
2.  **Umlaufbahn-Kippung (`computeRotSources`):** Die fundamentale Rotation wird nun um die Y-Achse um den Winkel $\alpha$ gekippt:
    * $x = cx + R \cdot \cos(\theta) \cdot \cos(\alpha)$ *(X-Ausdehnung schrumpft)*
    * $y = cy + R \cdot \sin(\theta)$ *(Y bleibt unverändert)*
    * $z = z_0 + R \cdot \cos(\theta) \cdot \sin(\alpha)$ *(Z variiert nun dynamisch mit der Phase)*
3.  **Visualisierung (`draw3DView`):** Die gezeichnete Ellipse folgt exakt dieser Kippung. Bei einem Neigungswinkel von $\alpha > 0^{\circ}$ erscheint eine gestrichelte Achse inklusive dynamischer Winkelbeschriftung (z. B. `α=45°`).
4.  **UI-Anbindung (`updateRot`):** Der Slider/Eingabewert (`sRT`) wird korrekt ausgelesen und in die physikalische Variable (`vRT`) übertragen.
5.  **Event-Handling:** Das Event-Listener-Array wurde um den Bezeichner `'sRT'` ergänzt.

### Physikalisches Verhalten in der Simulation:
* Bei $\alpha = 0^{\circ}$ rotieren die Quellen flach parallel zum Bildschirm (klassisches 2D-Verhalten).
* Bei $\alpha = 90^{\circ}$ bewegen sich die Quellen vollkommen senkrecht im Raum. Die $Z$-Tiefe pulsiert maximal, was zu einem völlig neuen, faszinierend asymmetrischen Interferenzmuster führt.
* Dazwischen entsteht eine harmonische, elliptische Bahn im dreidimensionalen Raum.