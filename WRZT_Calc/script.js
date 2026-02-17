/* ============================================================
   PHYSIK TASCHENRECHNER — script.js
   CODATA 2018 Konstanten · SI-Einheiten · Eigene Formeln
   ============================================================ */

'use strict';

/* ============================================================
   1. PHYSIKALISCHE KONSTANTEN (CODATA 2018)
   ============================================================ */
const CONSTANTS = [
  { symbol: 'c',    name: 'Lichtgeschwindigkeit',     value: 299792458,          unit: 'm/s',              desc: 'im Vakuum' },
  { symbol: 'h',    name: 'Planck-Konstante',          value: 6.62607015e-34,     unit: 'J·s',              desc: 'exakt' },
  { symbol: 'ℏ',    name: 'Reduz. Planck-Konstante',   value: 1.054571817e-34,    unit: 'J·s',              desc: 'h / 2π' },
  { symbol: 'G',    name: 'Gravitationskonstante',     value: 6.67430e-11,        unit: 'm³/(kg·s²)',       desc: 'CODATA 2018' },
  { symbol: 'g',    name: 'Erdbeschleunigung',         value: 9.80665,            unit: 'm/s²',             desc: 'Standardwert' },
  { symbol: 'e',    name: 'Elementarladung',           value: 1.602176634e-19,    unit: 'C',                desc: 'exakt' },
  { symbol: 'mₑ',   name: 'Elektronenmasse',           value: 9.1093837015e-31,   unit: 'kg',               desc: 'Ruhemasse' },
  { symbol: 'mₚ',   name: 'Protonenmasse',             value: 1.67262192369e-27,  unit: 'kg',               desc: 'Ruhemasse' },
  { symbol: 'mₙ',   name: 'Neutronenmasse',            value: 1.67492749804e-27,  unit: 'kg',               desc: 'Ruhemasse' },
  { symbol: 'kB',   name: 'Boltzmann-Konstante',       value: 1.380649e-23,       unit: 'J/K',              desc: 'exakt' },
  { symbol: 'NA',   name: 'Avogadro-Konstante',        value: 6.02214076e23,      unit: 'mol⁻¹',            desc: 'exakt' },
  { symbol: 'R',    name: 'Gaskonstante',              value: 8.314462618,        unit: 'J/(mol·K)',        desc: 'exakt' },
  { symbol: 'σ',    name: 'Stefan-Boltzmann-Konst.',   value: 5.670374419e-8,     unit: 'W/(m²·K⁴)',        desc: 'exakt' },
  { symbol: 'ε₀',   name: 'Elektrische Feldkonstante', value: 8.8541878128e-12,   unit: 'F/m',              desc: 'CODATA 2018' },
  { symbol: 'μ₀',   name: 'Magnetische Feldkonstante', value: 1.25663706212e-6,   unit: 'N/A²',             desc: 'CODATA 2018' },
  { symbol: 'α',    name: 'Feinstrukturkonstante',     value: 7.2973525693e-3,    unit: '(dimensionslos)',  desc: '≈ 1/137' },
  { symbol: 'a₀',   name: 'Bohr-Radius',              value: 5.29177210903e-11,   unit: 'm',                desc: 'Wasserstoff' },
  { symbol: 'Ry',   name: 'Rydberg-Energie',           value: 2.1798723611e-18,   unit: 'J',                desc: '13.6 eV' },
  { symbol: 'eV',   name: 'Elektronenvolt',            value: 1.602176634e-19,    unit: 'J',                desc: '1 eV in Joule' },
  { symbol: 'F',    name: 'Faraday-Konstante',         value: 96485.33212,        unit: 'C/mol',            desc: 'NA·e' },
  { symbol: 'atm',  name: 'Standardatmosphäre',        value: 101325,             unit: 'Pa',               desc: 'exakt' },
  { symbol: 'c²',   name: 'Lichtgeschw. zum Quadrat',  value: 8.98755179e16,      unit: 'm²/s²',            desc: 'für E=mc²' },
  { symbol: 'Ξ',    name: 'Raumzeit-Spannung',         value: 5.899e-19,          unit: 'kg/m',             desc: 'Raumzeit-Spannung' },
  { symbol: 'η',    name: 'Raumzeit-Trägheit',         value: 4.554e-31,          unit: 'kg',               desc: 'Trägheit' },
  { symbol: 'Rmin', name: 'Minimaler Radius',          value: 7.716e-13,          unit: 'm',                desc: 'Minimaler Radius' },
];

/* ============================================================
   2. FORMEL-DATENBANK
   ============================================================ */
const FORMULAS = [

  /* ── MECHANIK ───────────────────────────────────────────── */
  {
    id: 'f_newton', cat: 'Mechanik', name: "Newton's 2. Gesetz",
    expr: 'F = m · a', displayExpr: 'F = m · a',
    desc: 'Kraft ist Masse mal Beschleunigung',
    vars: [
      { sym: 'm', name: 'Masse',           unit: 'kg',  desc: 'Körpermasse' },
      { sym: 'a', name: 'Beschleunigung',  unit: 'm/s²',desc: 'Beschleunigung' }
    ],
    calc: v => v.m * v.a, resultUnit: 'N', resultName: 'Kraft F',
    steps: v => [`F = m × a`, `F = ${v.m} kg × ${v.a} m/s²`, `F = ${v.m * v.a} N`]
  },
  {
    id: 'f_ekin', cat: 'Mechanik', name: 'Kinetische Energie',
    expr: 'E = ½·m·v²', displayExpr: 'E_kin = ½ · m · v²',
    desc: 'Bewegungsenergie eines Körpers',
    vars: [
      { sym: 'm', name: 'Masse',       unit: 'kg',  desc: 'Körpermasse' },
      { sym: 'v', name: 'Geschwindigkeit', unit: 'm/s', desc: 'Betrag der Geschwindigkeit' }
    ],
    calc: v => 0.5 * v.m * v.v * v.v, resultUnit: 'J', resultName: 'Kinetische Energie E_kin',
    steps: v => [`E_kin = ½ × m × v²`, `E_kin = 0.5 × ${v.m} × ${v.v}²`, `E_kin = ${0.5 * v.m * v.v**2} J`]
  },
  {
    id: 'f_epot', cat: 'Mechanik', name: 'Potentielle Energie',
    expr: 'E = m·g·h', displayExpr: 'E_pot = m · g · h',
    desc: 'Lageenergie (g = 9.80665 m/s²)',
    vars: [
      { sym: 'm', name: 'Masse',  unit: 'kg', desc: 'Körpermasse' },
      { sym: 'h', name: 'Höhe',   unit: 'm',  desc: 'Höhe über Referenzniveau' }
    ],
    calc: v => v.m * 9.80665 * v.h, resultUnit: 'J', resultName: 'Potentielle Energie E_pot',
    steps: v => [`E_pot = m × g × h`, `g = 9.80665 m/s²`, `E_pot = ${v.m} × 9.80665 × ${v.h}`, `E_pot = ${v.m * 9.80665 * v.h} J`]
  },
  {
    id: 'f_work', cat: 'Mechanik', name: 'Arbeit',
    expr: 'W = F·s·cos(θ)', displayExpr: 'W = F · s · cos(θ)',
    desc: 'Mechanische Arbeit',
    vars: [
      { sym: 'F', name: 'Kraft',    unit: 'N',  desc: 'Betrag der Kraft' },
      { sym: 's', name: 'Weg',      unit: 'm',  desc: 'Verschobener Weg' },
      { sym: 'θ', name: 'Winkel θ', unit: '°',  desc: 'Winkel zwischen F und s' }
    ],
    calc: v => v.F * v.s * Math.cos(v.θ * Math.PI / 180),
    resultUnit: 'J', resultName: 'Arbeit W',
    steps: v => [`W = F × s × cos(θ)`, `cos(${v.θ}°) = ${Math.cos(v.θ * Math.PI/180).toFixed(6)}`, `W = ${v.F} × ${v.s} × ${Math.cos(v.θ * Math.PI/180).toFixed(4)}`, `W = ${v.F * v.s * Math.cos(v.θ * Math.PI/180)} J`]
  },
  {
    id: 'f_power', cat: 'Mechanik', name: 'Leistung',
    expr: 'P = W/t', displayExpr: 'P = W / t',
    desc: 'Mechanische Leistung',
    vars: [
      { sym: 'W', name: 'Arbeit', unit: 'J', desc: 'Verrichtete Arbeit' },
      { sym: 't', name: 'Zeit',   unit: 's', desc: 'Zeitdauer' }
    ],
    calc: v => v.W / v.t, resultUnit: 'W', resultName: 'Leistung P',
    steps: v => [`P = W / t`, `P = ${v.W} J / ${v.t} s`, `P = ${v.W / v.t} W`]
  },
  {
    id: 'f_momentum', cat: 'Mechanik', name: 'Impuls',
    expr: 'p = m·v', displayExpr: 'p = m · v',
    desc: 'Linearer Impuls',
    vars: [
      { sym: 'm', name: 'Masse',          unit: 'kg',  desc: 'Körpermasse' },
      { sym: 'v', name: 'Geschwindigkeit',unit: 'm/s', desc: 'Geschwindigkeit' }
    ],
    calc: v => v.m * v.v, resultUnit: 'kg·m/s', resultName: 'Impuls p',
    steps: v => [`p = m × v`, `p = ${v.m} × ${v.v}`, `p = ${v.m * v.v} kg·m/s`]
  },
  {
    id: 'f_grav', cat: 'Mechanik', name: 'Gravitationskraft',
    expr: 'F = G·m₁·m₂/r²', displayExpr: 'F = G · m₁ · m₂ / r²',
    desc: 'Newtonsche Gravitationskraft (G = 6.67430×10⁻¹¹)',
    vars: [
      { sym: 'm1', name: 'Masse 1 (m₁)', unit: 'kg', desc: 'Erste Masse' },
      { sym: 'm2', name: 'Masse 2 (m₂)', unit: 'kg', desc: 'Zweite Masse' },
      { sym: 'r',  name: 'Abstand r',    unit: 'm',  desc: 'Abstand Mittelpunkte' }
    ],
    calc: v => 6.67430e-11 * v.m1 * v.m2 / (v.r * v.r),
    resultUnit: 'N', resultName: 'Gravitationskraft F',
    steps: v => [`F = G × m₁ × m₂ / r²`, `G = 6.67430×10⁻¹¹ m³/(kg·s²)`, `F = 6.67430e-11 × ${v.m1} × ${v.m2} / ${v.r}²`, `F = ${6.67430e-11 * v.m1 * v.m2 / v.r**2} N`]
  },
  {
    id: 'f_centripetal', cat: 'Mechanik', name: 'Zentripetalkraft',
    expr: 'F = m·v²/r', displayExpr: 'F = m · v² / r',
    desc: 'Kraft auf Kreisbahn',
    vars: [
      { sym: 'm', name: 'Masse',          unit: 'kg',  desc: 'Körpermasse' },
      { sym: 'v', name: 'Geschwindigkeit',unit: 'm/s', desc: 'Bahngeschwindigkeit' },
      { sym: 'r', name: 'Radius r',       unit: 'm',   desc: 'Kreisbahnradius' }
    ],
    calc: v => v.m * v.v * v.v / v.r,
    resultUnit: 'N', resultName: 'Zentripetalkraft F',
    steps: v => [`F = m × v² / r`, `F = ${v.m} × ${v.v}² / ${v.r}`, `F = ${v.m * v.v**2 / v.r} N`]
  },
  {
    id: 'f_hooke', cat: 'Mechanik', name: "Hooke'sches Gesetz",
    expr: 'F = k·x', displayExpr: 'F = k · x',
    desc: 'Federkraft',
    vars: [
      { sym: 'k', name: 'Federkonstante k', unit: 'N/m', desc: 'Federsteifigkeit' },
      { sym: 'x', name: 'Auslenkung x',     unit: 'm',   desc: 'Federauslenkung' }
    ],
    calc: v => v.k * v.x, resultUnit: 'N', resultName: 'Federkraft F',
    steps: v => [`F = k × x`, `F = ${v.k} × ${v.x}`, `F = ${v.k * v.x} N`]
  },
  {
    id: 'f_torque', cat: 'Mechanik', name: 'Drehmoment',
    expr: 'τ = r·F·sin(θ)', displayExpr: 'τ = r · F · sin(θ)',
    desc: 'Drehmoment einer Kraft',
    vars: [
      { sym: 'r', name: 'Hebelarm r', unit: 'm',  desc: 'Abstand zur Drehachse' },
      { sym: 'F', name: 'Kraft F',    unit: 'N',  desc: 'Betrag der Kraft' },
      { sym: 'θ', name: 'Winkel θ',   unit: '°',  desc: 'Winkel zwischen r und F' }
    ],
    calc: v => v.r * v.F * Math.sin(v.θ * Math.PI / 180),
    resultUnit: 'N·m', resultName: 'Drehmoment τ',
    steps: v => [`τ = r × F × sin(θ)`, `sin(${v.θ}°) = ${Math.sin(v.θ * Math.PI/180).toFixed(6)}`, `τ = ${v.r} × ${v.F} × ${Math.sin(v.θ * Math.PI/180).toFixed(4)}`, `τ = ${v.r * v.F * Math.sin(v.θ * Math.PI/180)} N·m`]
  },
  {
    id: 'f_pressure', cat: 'Mechanik', name: 'Druck',
    expr: 'p = F/A', displayExpr: 'p = F / A',
    desc: 'Druck als Kraft pro Fläche',
    vars: [
      { sym: 'F', name: 'Kraft F',   unit: 'N',  desc: 'Normal wirkende Kraft' },
      { sym: 'A', name: 'Fläche A',  unit: 'm²', desc: 'Querschnittsfläche' }
    ],
    calc: v => v.F / v.A, resultUnit: 'Pa', resultName: 'Druck p',
    steps: v => [`p = F / A`, `p = ${v.F} N / ${v.A} m²`, `p = ${v.F / v.A} Pa`]
  },

  /* ── THERMODYNAMIK ──────────────────────────────────────── */
  {
    id: 't_q', cat: 'Thermodynamik', name: 'Wärmemenge (Spez. Wärme)',
    expr: 'Q = m·c·ΔT', displayExpr: 'Q = m · c · ΔT',
    desc: 'c = spez. Wärmekapazität',
    vars: [
      { sym: 'm',  name: 'Masse m',              unit: 'kg',       desc: 'Masse des Stoffs' },
      { sym: 'c',  name: 'Spez. Wärmekapaz. c',  unit: 'J/(kg·K)', desc: 'z.B. Wasser: 4182' },
      { sym: 'dT', name: 'Temperaturdiff. ΔT',   unit: 'K',        desc: 'Temperaturänderung' }
    ],
    calc: v => v.m * v.c * v.dT, resultUnit: 'J', resultName: 'Wärmemenge Q',
    steps: v => [`Q = m × c × ΔT`, `Q = ${v.m} × ${v.c} × ${v.dT}`, `Q = ${v.m * v.c * v.dT} J`]
  },
  {
    id: 't_ideal', cat: 'Thermodynamik', name: 'Ideales Gasgesetz',
    expr: 'p·V = n·R·T', displayExpr: 'p · V = n · R · T',
    desc: 'R = 8.314462618 J/(mol·K) — löst nach p',
    vars: [
      { sym: 'n', name: 'Stoffmenge n', unit: 'mol', desc: 'Menge in Mol' },
      { sym: 'T', name: 'Temperatur T', unit: 'K',   desc: 'Absolute Temperatur' },
      { sym: 'V', name: 'Volumen V',    unit: 'm³',  desc: 'Gasvolumen' }
    ],
    calc: v => (v.n * 8.314462618 * v.T) / v.V,
    resultUnit: 'Pa', resultName: 'Druck p',
    steps: v => [`p = n × R × T / V`, `R = 8.314462618 J/(mol·K)`, `p = ${v.n} × 8.314462618 × ${v.T} / ${v.V}`, `p = ${(v.n * 8.314462618 * v.T) / v.V} Pa`]
  },
  {
    id: 't_efficiency', cat: 'Thermodynamik', name: 'Carnot-Wirkungsgrad',
    expr: 'η = 1 - T_K/T_H', displayExpr: 'η = 1 − T_K / T_H',
    desc: 'Maximaler Wirkungsgrad einer Wärmekraftmaschine',
    vars: [
      { sym: 'TK', name: 'Kalte Temp. T_K',  unit: 'K', desc: 'Temperatur Kältereservoir' },
      { sym: 'TH', name: 'Heiße Temp. T_H',  unit: 'K', desc: 'Temperatur Wärmereservoir' }
    ],
    calc: v => 1 - v.TK / v.TH,
    resultUnit: '(dimensionslos)', resultName: 'Carnot-Wirkungsgrad η',
    steps: v => [`η = 1 − T_K / T_H`, `η = 1 − ${v.TK} / ${v.TH}`, `η = ${1 - v.TK / v.TH}`, `η = ${((1 - v.TK / v.TH) * 100).toFixed(3)} %`]
  },
  {
    id: 't_stefan', cat: 'Thermodynamik', name: 'Stefan-Boltzmann-Gesetz',
    expr: 'P = σ·ε·A·T⁴', displayExpr: 'P = σ · ε · A · T⁴',
    desc: 'σ = 5.670374419×10⁻⁸ W/(m²·K⁴)',
    vars: [
      { sym: 'eps', name: 'Emissionsgrad ε', unit: '',    desc: '0 (Spiegel) – 1 (schwarzer Körper)' },
      { sym: 'A',   name: 'Fläche A',        unit: 'm²',  desc: 'Abstrahlende Fläche' },
      { sym: 'T',   name: 'Temperatur T',    unit: 'K',   desc: 'Absolute Temperatur' }
    ],
    calc: v => 5.670374419e-8 * v.eps * v.A * Math.pow(v.T, 4),
    resultUnit: 'W', resultName: 'Strahlungsleistung P',
    steps: v => [`P = σ × ε × A × T⁴`, `σ = 5.670374419×10⁻⁸ W/(m²·K⁴)`, `P = 5.670374419e-8 × ${v.eps} × ${v.A} × ${v.T}⁴`, `P = ${5.670374419e-8 * v.eps * v.A * v.T**4} W`]
  },
  {
    id: 't_entropy', cat: 'Thermodynamik', name: 'Entropieänderung',
    expr: 'ΔS = Q/T', displayExpr: 'ΔS = Q / T',
    desc: 'Reversible Wärmeübertragung',
    vars: [
      { sym: 'Q', name: 'Wärmemenge Q', unit: 'J', desc: 'Übertragene Wärme' },
      { sym: 'T', name: 'Temperatur T', unit: 'K', desc: 'Absolute Temperatur' }
    ],
    calc: v => v.Q / v.T, resultUnit: 'J/K', resultName: 'Entropieänderung ΔS',
    steps: v => [`ΔS = Q / T`, `ΔS = ${v.Q} / ${v.T}`, `ΔS = ${v.Q / v.T} J/K`]
  },

  /* ── ELEKTRIZITÄT ───────────────────────────────────────── */
  {
    id: 'e_ohm', cat: 'Elektrizität', name: "Ohm'sches Gesetz",
    expr: 'U = R·I', displayExpr: 'U = R · I',
    desc: 'Spannung = Widerstand × Strom',
    vars: [
      { sym: 'R', name: 'Widerstand R', unit: 'Ω',  desc: 'Elektrischer Widerstand' },
      { sym: 'I', name: 'Stromstärke I', unit: 'A', desc: 'Elektrischer Strom' }
    ],
    calc: v => v.R * v.I, resultUnit: 'V', resultName: 'Spannung U',
    steps: v => [`U = R × I`, `U = ${v.R} Ω × ${v.I} A`, `U = ${v.R * v.I} V`]
  },
  {
    id: 'e_power', cat: 'Elektrizität', name: 'Elektrische Leistung',
    expr: 'P = U·I', displayExpr: 'P = U · I',
    desc: 'Leistung als Spannung × Strom',
    vars: [
      { sym: 'U', name: 'Spannung U',    unit: 'V', desc: 'Elektrische Spannung' },
      { sym: 'I', name: 'Stromstärke I', unit: 'A', desc: 'Elektrischer Strom' }
    ],
    calc: v => v.U * v.I, resultUnit: 'W', resultName: 'Leistung P',
    steps: v => [`P = U × I`, `P = ${v.U} V × ${v.I} A`, `P = ${v.U * v.I} W`]
  },
  {
    id: 'e_coulomb', cat: 'Elektrizität', name: 'Coulomb-Kraft',
    expr: 'F = k·q₁·q₂/r²', displayExpr: 'F = (1/4πε₀) · q₁ · q₂ / r²',
    desc: 'k = 8.9875517923×10⁹ N·m²/C²',
    vars: [
      { sym: 'q1', name: 'Ladung q₁', unit: 'C',  desc: 'Erste Ladung' },
      { sym: 'q2', name: 'Ladung q₂', unit: 'C',  desc: 'Zweite Ladung' },
      { sym: 'r',  name: 'Abstand r', unit: 'm',  desc: 'Abstand zwischen den Ladungen' }
    ],
    calc: v => 8.9875517923e9 * v.q1 * v.q2 / (v.r * v.r),
    resultUnit: 'N', resultName: 'Coulomb-Kraft F',
    steps: v => [`F = k × q₁ × q₂ / r²`, `k = 1/(4πε₀) = 8.9875517923×10⁹ N·m²/C²`, `F = 8.9875517923e9 × ${v.q1} × ${v.q2} / ${v.r}²`, `F = ${8.9875517923e9 * v.q1 * v.q2 / v.r**2} N`]
  },
  {
    id: 'e_capacitor', cat: 'Elektrizität', name: 'Kondensator-Energie',
    expr: 'E = ½·C·U²', displayExpr: 'E = ½ · C · U²',
    desc: 'Gespeicherte Energie im Kondensator',
    vars: [
      { sym: 'C', name: 'Kapazität C',  unit: 'F', desc: 'Elektrische Kapazität' },
      { sym: 'U', name: 'Spannung U',   unit: 'V', desc: 'Ladespannung' }
    ],
    calc: v => 0.5 * v.C * v.U * v.U,
    resultUnit: 'J', resultName: 'Energie E',
    steps: v => [`E = ½ × C × U²`, `E = 0.5 × ${v.C} × ${v.U}²`, `E = ${0.5 * v.C * v.U**2} J`]
  },
  {
    id: 'e_lorentz', cat: 'Elektrizität', name: 'Lorentz-Kraft',
    expr: 'F = q·v·B·sin(θ)', displayExpr: 'F = q · v · B · sin(θ)',
    desc: 'Kraft auf bewegte Ladung im Magnetfeld',
    vars: [
      { sym: 'q', name: 'Ladung q',       unit: 'C',   desc: 'Elektrische Ladung' },
      { sym: 'v', name: 'Geschwindigkeit',unit: 'm/s',  desc: 'Geschwindigkeit der Ladung' },
      { sym: 'B', name: 'Magnetfeld B',   unit: 'T',   desc: 'Magnetische Flussdichte' },
      { sym: 'θ', name: 'Winkel θ',       unit: '°',   desc: 'Winkel zwischen v und B' }
    ],
    calc: v => v.q * v.v * v.B * Math.sin(v.θ * Math.PI / 180),
    resultUnit: 'N', resultName: 'Lorentz-Kraft F',
    steps: v => [`F = q × v × B × sin(θ)`, `F = ${v.q} × ${v.v} × ${v.B} × sin(${v.θ}°)`, `F = ${v.q * v.v * v.B * Math.sin(v.θ * Math.PI/180)} N`]
  },
  {
    id: 'e_resistance', cat: 'Elektrizität', name: 'Spezifischer Widerstand',
    expr: 'R = ρ·l/A', displayExpr: 'R = ρ · l / A',
    desc: 'Elektrischer Widerstand eines Leiters',
    vars: [
      { sym: 'rho', name: 'Spezif. Widerstand ρ', unit: 'Ω·m', desc: 'Materialkenngröße' },
      { sym: 'l',   name: 'Länge l',               unit: 'm',   desc: 'Leiterlänge' },
      { sym: 'A',   name: 'Querschnitt A',          unit: 'm²',  desc: 'Leiterquerschnittsfläche' }
    ],
    calc: v => v.rho * v.l / v.A, resultUnit: 'Ω', resultName: 'Widerstand R',
    steps: v => [`R = ρ × l / A`, `R = ${v.rho} × ${v.l} / ${v.A}`, `R = ${v.rho * v.l / v.A} Ω`]
  },

  /* ── OPTIK ──────────────────────────────────────────────── */
  {
    id: 'o_snell', cat: 'Optik', name: "Snell'sches Brechungsgesetz",
    expr: 'n₁·sin(θ₁) = n₂·sin(θ₂)', displayExpr: 'θ₂ = arcsin(n₁·sin(θ₁)/n₂)',
    desc: 'Berechnet den Brechungswinkel θ₂',
    vars: [
      { sym: 'n1',  name: 'Brechungsindex n₁', unit: '',  desc: 'z.B. Luft: 1.000293' },
      { sym: 'th1', name: 'Einfallswinkel θ₁', unit: '°', desc: 'Winkel zur Normalen' },
      { sym: 'n2',  name: 'Brechungsindex n₂', unit: '',  desc: 'z.B. Glas: 1.52' }
    ],
    calc: v => {
      const sin2 = v.n1 * Math.sin(v.th1 * Math.PI / 180) / v.n2;
      if (Math.abs(sin2) > 1) throw new Error('Totalreflexion! sin(θ₂) > 1');
      return Math.asin(sin2) * 180 / Math.PI;
    },
    resultUnit: '°', resultName: 'Brechungswinkel θ₂',
    steps: v => {
      const sin2 = v.n1 * Math.sin(v.th1 * Math.PI / 180) / v.n2;
      return [`θ₂ = arcsin(n₁ × sin(θ₁) / n₂)`, `sin(${v.th1}°) = ${Math.sin(v.th1 * Math.PI/180).toFixed(6)}`, `sin(θ₂) = ${v.n1} × ${Math.sin(v.th1 * Math.PI/180).toFixed(6)} / ${v.n2} = ${sin2.toFixed(6)}`, `θ₂ = ${(Math.asin(sin2) * 180 / Math.PI).toFixed(6)}°`];
    }
  },
  {
    id: 'o_lens', cat: 'Optik', name: 'Linsengleichung',
    expr: '1/f = 1/g + 1/b', displayExpr: '1/f = 1/g + 1/b  →  b = 1/(1/f − 1/g)',
    desc: 'Bildweite b bei gegebener Brennweite f und Gegenstandsweite g',
    vars: [
      { sym: 'f', name: 'Brennweite f',       unit: 'm', desc: 'Positive = Sammellinse' },
      { sym: 'g', name: 'Gegenstandsweite g', unit: 'm', desc: 'Abstand Objekt–Linse' }
    ],
    calc: v => 1 / (1 / v.f - 1 / v.g),
    resultUnit: 'm', resultName: 'Bildweite b',
    steps: v => [`b = 1 / (1/f − 1/g)`, `b = 1 / (1/${v.f} − 1/${v.g})`, `b = 1 / (${1/v.f} − ${1/v.g})`, `b = ${1 / (1/v.f - 1/v.g)} m`]
  },
  {
    id: 'o_doppler', cat: 'Optik', name: 'Doppler-Effekt (Schall)',
    expr: 'f_B = f_Q·(v±v_B)/(v∓v_Q)', displayExpr: "f_B = f_Q · (v + v_B) / (v − v_Q)",
    desc: 'Beobachtete Frequenz bei Annäherung (+ v_B, − v_Q)',
    vars: [
      { sym: 'fQ', name: 'Quellfrequenz f_Q', unit: 'Hz',  desc: 'Frequenz der Quelle' },
      { sym: 'v',  name: 'Schallgeschw. v',   unit: 'm/s', desc: 'In Luft: ~343 m/s' },
      { sym: 'vB', name: 'Beobacht.-Geschw.', unit: 'm/s', desc: 'Positiv: auf Quelle zu' },
      { sym: 'vQ', name: 'Quell-Geschw.',     unit: 'm/s', desc: 'Positiv: auf Beobachter zu' }
    ],
    calc: v => v.fQ * (v.v + v.vB) / (v.v - v.vQ),
    resultUnit: 'Hz', resultName: 'Beobachtete Frequenz f_B',
    steps: v => [`f_B = f_Q × (v + v_B) / (v − v_Q)`, `f_B = ${v.fQ} × (${v.v} + ${v.vB}) / (${v.v} − ${v.vQ})`, `f_B = ${v.fQ * (v.v + v.vB) / (v.v - v.vQ)} Hz`]
  },

  /* ── RELATIVITÄTSTHEORIE ────────────────────────────────── */
  {
    id: 'r_emc2', cat: 'Relativität', name: 'Masse-Energie-Äquivalenz',
    expr: 'E = m·c²', displayExpr: 'E = m · c²',
    desc: 'c = 299792458 m/s',
    vars: [
      { sym: 'm', name: 'Masse m', unit: 'kg', desc: 'Ruhemasse' }
    ],
    calc: v => v.m * 8.98755179e16,
    resultUnit: 'J', resultName: 'Energie E',
    steps: v => [`E = m × c²`, `c = 299792458 m/s`, `c² = 8.98755179×10¹⁶ m²/s²`, `E = ${v.m} × 8.98755179e16`, `E = ${v.m * 8.98755179e16} J`]
  },
  {
    id: 'r_lorentz', cat: 'Relativität', name: 'Lorentz-Faktor',
    expr: 'γ = 1/√(1−v²/c²)', displayExpr: 'γ = 1 / √(1 − v²/c²)',
    desc: 'c = 299792458 m/s',
    vars: [
      { sym: 'v', name: 'Geschwindigkeit v', unit: 'm/s', desc: 'Geschwindigkeit des Körpers' }
    ],
    calc: v => 1 / Math.sqrt(1 - (v.v * v.v) / (299792458 * 299792458)),
    resultUnit: '(dimensionslos)', resultName: 'Lorentz-Faktor γ',
    steps: v => {
      const beta = v.v / 299792458;
      return [`γ = 1 / √(1 − β²)`, `β = v/c = ${v.v} / 299792458 = ${beta.toFixed(8)}`, `β² = ${(beta*beta).toFixed(12)}`, `γ = 1 / √(${1 - beta*beta})`, `γ = ${1 / Math.sqrt(1 - beta*beta)}`];
    }
  },
  {
    id: 'r_timedil', cat: 'Relativität', name: 'Zeitdilatation',
    expr: 'Δt = γ·Δτ', displayExpr: "Δt = Δτ / √(1 − v²/c²)",
    desc: 'Koordinatenzeit Δt aus Eigenzeit Δτ',
    vars: [
      { sym: 'dtau', name: 'Eigenzeit Δτ',    unit: 's',   desc: 'Eigenzeit des bewegten Systems' },
      { sym: 'v',    name: 'Geschwindigkeit', unit: 'm/s', desc: 'Geschwindigkeit des Systems' }
    ],
    calc: v => v.dtau / Math.sqrt(1 - v.v**2 / 299792458**2),
    resultUnit: 's', resultName: 'Koordinatenzeit Δt',
    steps: v => {
      const gamma = 1 / Math.sqrt(1 - v.v**2 / 299792458**2);
      return [`Δt = γ × Δτ`, `γ = ${gamma.toFixed(8)}`, `Δt = ${gamma.toFixed(8)} × ${v.dtau}`, `Δt = ${gamma * v.dtau} s`];
    }
  },

  /* ── QUANTENPHYSIK ──────────────────────────────────────── */
  {
    id: 'q_photon', cat: 'Quantenphysik', name: 'Photonenenergie',
    expr: 'E = h·f', displayExpr: 'E = h · f',
    desc: 'h = 6.62607015×10⁻³⁴ J·s',
    vars: [
      { sym: 'f', name: 'Frequenz f', unit: 'Hz', desc: 'Photonenfrequenz' }
    ],
    calc: v => 6.62607015e-34 * v.f,
    resultUnit: 'J', resultName: 'Photonenenergie E',
    steps: v => [`E = h × f`, `h = 6.62607015×10⁻³⁴ J·s`, `E = 6.62607015e-34 × ${v.f}`, `E = ${6.62607015e-34 * v.f} J`]
  },
  {
    id: 'q_debroglie', cat: 'Quantenphysik', name: 'de-Broglie-Wellenlänge',
    expr: 'λ = h/(m·v)', displayExpr: 'λ = h / (m · v)',
    desc: 'h = 6.62607015×10⁻³⁴ J·s',
    vars: [
      { sym: 'm', name: 'Masse m',          unit: 'kg',  desc: 'Masse des Teilchens' },
      { sym: 'v', name: 'Geschwindigkeit v', unit: 'm/s', desc: 'Geschwindigkeit' }
    ],
    calc: v => 6.62607015e-34 / (v.m * v.v),
    resultUnit: 'm', resultName: 'de-Broglie-Wellenlänge λ',
    steps: v => [`λ = h / (m × v)`, `h = 6.62607015×10⁻³⁴ J·s`, `λ = 6.62607015e-34 / (${v.m} × ${v.v})`, `λ = ${6.62607015e-34 / (v.m * v.v)} m`]
  },
  {
    id: 'q_heisenberg', cat: 'Quantenphysik', name: 'Heisenberg-Unschärfe',
    expr: 'Δx·Δp ≥ ℏ/2', displayExpr: 'Δp_min = ℏ / (2 · Δx)',
    desc: 'ℏ = 1.054571817×10⁻³⁴ J·s — Minimaler Impulsunschärfe',
    vars: [
      { sym: 'dx', name: 'Ortsunschärfe Δx', unit: 'm', desc: 'Messung der Ortsunschärfe' }
    ],
    calc: v => 1.054571817e-34 / (2 * v.dx),
    resultUnit: 'kg·m/s', resultName: 'Minimale Impulsunschärfe Δp_min',
    steps: v => [`Δp_min = ℏ / (2 × Δx)`, `ℏ = 1.054571817×10⁻³⁴ J·s`, `Δp_min = 1.054571817e-34 / (2 × ${v.dx})`, `Δp_min = ${1.054571817e-34 / (2 * v.dx)} kg·m/s`]
  },
  {
    id: 'q_bohr', cat: 'Quantenphysik', name: 'Bohr-Energieniveaus (H-Atom)',
    expr: 'Eₙ = −13.6/n² eV', displayExpr: 'Eₙ = −13.6056980659 / n² eV',
    desc: 'Energieniveaus des Wasserstoffatoms',
    vars: [
      { sym: 'n', name: 'Hauptquantenzahl n', unit: '',  desc: 'n = 1, 2, 3, ...' }
    ],
    calc: v => {
      if (v.n < 1 || !Number.isInteger(v.n)) throw new Error('n muss eine positive ganze Zahl sein (n ≥ 1)');
      return -13.6056980659 / (v.n * v.n);
    },
    resultUnit: 'eV', resultName: 'Energieniveau E_n',
    steps: v => [`E_n = −13.6056980659 / n² eV`, `E_${v.n} = −13.6056980659 / ${v.n}²`, `E_${v.n} = ${-13.6056980659 / v.n**2} eV`]
  },
  {
    id: 'q_wien', cat: 'Quantenphysik', name: "Wien'sches Verschiebungsgesetz",
    expr: 'λ_max = b/T', displayExpr: 'λ_max = b / T',
    desc: 'b = 2.897771955×10⁻³ m·K',
    vars: [
      { sym: 'T', name: 'Temperatur T', unit: 'K', desc: 'Absolute Temperatur' }
    ],
    calc: v => 2.897771955e-3 / v.T,
    resultUnit: 'm', resultName: 'Maximale Wellenlänge λ_max',
    steps: v => [`λ_max = b / T`, `b = 2.897771955×10⁻³ m·K`, `λ_max = 2.897771955e-3 / ${v.T}`, `λ_max = ${2.897771955e-3 / v.T} m`]
  },

  /* ── WELLEN & SCHWINGUNGEN ──────────────────────────────── */
  {
    id: 'w_period', cat: 'Wellen', name: 'Periodendauer',
    expr: 'T = 1/f', displayExpr: 'T = 1 / f',
    desc: 'Zusammenhang Periode und Frequenz',
    vars: [
      { sym: 'f', name: 'Frequenz f', unit: 'Hz', desc: 'Schwingungsfrequenz' }
    ],
    calc: v => 1 / v.f, resultUnit: 's', resultName: 'Periodendauer T',
    steps: v => [`T = 1 / f`, `T = 1 / ${v.f}`, `T = ${1 / v.f} s`]
  },
  {
    id: 'w_wave', cat: 'Wellen', name: 'Wellengleichung',
    expr: 'c = λ·f', displayExpr: 'c = λ · f',
    desc: 'Ausbreitungsgeschwindigkeit',
    vars: [
      { sym: 'lam', name: 'Wellenlänge λ', unit: 'm',  desc: 'Wellenlänge' },
      { sym: 'f',   name: 'Frequenz f',    unit: 'Hz', desc: 'Frequenz der Welle' }
    ],
    calc: v => v.lam * v.f, resultUnit: 'm/s', resultName: 'Ausbreitungsgeschwindigkeit c',
    steps: v => [`c = λ × f`, `c = ${v.lam} m × ${v.f} Hz`, `c = ${v.lam * v.f} m/s`]
  },
  {
    id: 'w_pendulum', cat: 'Wellen', name: 'Pendel-Periodendauer',
    expr: 'T = 2π·√(l/g)', displayExpr: 'T = 2π · √(l / g)',
    desc: 'Mathematisches Fadenpendel, g = 9.80665 m/s²',
    vars: [
      { sym: 'l', name: 'Fadenlänge l', unit: 'm', desc: 'Länge des Pendelfadens' }
    ],
    calc: v => 2 * Math.PI * Math.sqrt(v.l / 9.80665),
    resultUnit: 's', resultName: 'Periodendauer T',
    steps: v => [`T = 2π × √(l / g)`, `g = 9.80665 m/s²`, `T = 2π × √(${v.l} / 9.80665)`, `T = 2π × √(${v.l / 9.80665})`, `T = ${2 * Math.PI * Math.sqrt(v.l / 9.80665)} s`]
  },
];

/* Kategorie-Icons */
const CAT_ICONS = {
  'Mechanik': 'fa-cogs', 'Thermodynamik': 'fa-fire', 'Elektrizität': 'fa-bolt',
  'Optik': 'fa-glasses', 'Relativität': 'fa-rocket', 'Quantenphysik': 'fa-atom',
  'Wellen': 'fa-wave-square', 'Benutzerdefiniert': 'fa-star'
};

/* ============================================================
   3. STATE
   ============================================================ */
let activeCategory = 'Mechanik';
let activeFormula  = null;
let customFormulas = [];

/* ============================================================
   4. DOM-REFS
   ============================================================ */
const $ = id => document.getElementById(id);
const constantsGrid   = $('constantsGrid');
const categoryTabs    = $('categoryTabs');
const formulaGrid     = $('formulaGrid');
const calculatorSection = $('calculatorSection');
const inputsGrid      = $('inputsGrid');
const resultBox       = $('resultBox');
const customFeedback  = $('customFeedback');
const savedSection    = $('savedSection');
const savedList       = $('savedFormulasList');
const variablesCont   = $('variablesContainer');

/* ============================================================
   5. INITIALISIERUNG
   ============================================================ */
function init() {
  renderConstants();
  renderCategories();
  renderFormulas();
  loadCustomFormulas();
  bindCustomEvents();
}

/* ============================================================
   6. KONSTANTEN RENDERN
   ============================================================ */
function renderConstants() {
  constantsGrid.innerHTML = CONSTANTS.map(c => `
    <div class="const-item" data-tooltip="${c.desc}" onclick="useConstant('${c.symbol}', ${c.value})">
      <div class="const-name">${c.name}</div>
      <div class="const-symbol">${c.symbol}</div>
      <div class="const-value">${formatSci(c.value)}</div>
      <div class="const-unit">${c.unit}</div>
    </div>
  `).join('');
}

/* ============================================================
   7. KATEGORIEN RENDERN
   ============================================================ */
function getCategories() {
  const built = [...new Set(FORMULAS.map(f => f.cat))];
  const custom = customFormulas.length > 0 ? ['Benutzerdefiniert'] : [];
  return [...built, ...custom];
}

function renderCategories() {
  const cats = getCategories();
  if (!cats.includes(activeCategory)) activeCategory = cats[0];
  categoryTabs.innerHTML = cats.map(c => `
    <button class="cat-tab ${c === activeCategory ? 'active' : ''}"
            onclick="setCategory('${c}')">
      <i class="fas ${CAT_ICONS[c] || 'fa-star'}"></i> ${c}
    </button>
  `).join('');
}

function setCategory(cat) {
  activeCategory = cat;
  activeFormula = null;
  renderCategories();
  renderFormulas();
  calculatorSection.style.display = 'none';
  resultBox.style.display = 'none';
}

/* ============================================================
   8. FORMELN RENDERN
   ============================================================ */
function getFormulasForCategory(cat) {
  if (cat === 'Benutzerdefiniert') return customFormulas;
  return FORMULAS.filter(f => f.cat === cat);
}

function renderFormulas() {
  const fmls = getFormulasForCategory(activeCategory);
  formulaGrid.innerHTML = fmls.map(f => `
    <div class="formula-card ${activeFormula && activeFormula.id === f.id ? 'active' : ''}"
         onclick="selectFormula('${f.id}')">
      ${f.isCustom ? '<span class="fc-custom-badge"><i class="fas fa-star"></i> Eigen</span>' : ''}
      <div class="fc-name">${f.name}</div>
      <div class="fc-expr">${f.expr}</div>
      <div class="fc-desc">${f.desc || ''}</div>
    </div>
  `).join('');
  if (fmls.length === 0) {
    formulaGrid.innerHTML = '<p style="color:var(--text2);grid-column:1/-1;text-align:center;padding:1rem;">Keine Formeln in dieser Kategorie</p>';
  }
}

function selectFormula(id) {
  const all = [...FORMULAS, ...customFormulas];
  activeFormula = all.find(f => f.id === id);
  if (!activeFormula) return;
  renderFormulas();
  renderCalculator();
}

/* ============================================================
   9. RECHNER RENDERN
   ============================================================ */
function renderCalculator() {
  if (!activeFormula) return;
  const f = activeFormula;
  calculatorSection.style.display = 'block';
  resultBox.style.display = 'none';
  $('calcTitle').textContent = f.name;
  $('calcDescription').textContent = f.desc || '';
  $('formulaDisplay').textContent = f.displayExpr || f.expr;

  inputsGrid.innerHTML = f.vars.map(v => `
    <div class="input-group">
      <label>
        <span class="var-symbol">${v.sym}</span>
        — ${v.name}
        ${v.unit ? `<span class="var-unit">[${v.unit}]</span>` : ''}
      </label>
      <div class="input-wrapper">
        <input type="number" step="any"
               id="inp_${v.sym}"
               placeholder="${v.desc || '0'}"
               title="${v.desc || v.name}"
        />
        ${v.unit ? `<span class="input-unit-badge">${v.unit}</span>` : ''}
      </div>
    </div>
  `).join('');

  calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ============================================================
   10. BERECHNEN
   ============================================================ */
$('btnCalc').addEventListener('click', () => {
  if (!activeFormula) return;
  const f = activeFormula;

  // Werte einlesen
  const vals = {};
  let missing = [];
  for (const v of f.vars) {
    const el = $(`inp_${v.sym}`);
    const val = el ? parseFloat(el.value) : NaN;
    if (isNaN(val)) { missing.push(v.name); continue; }
    vals[v.sym] = val;
  }

  if (missing.length > 0) {
    showResult({ error: `Bitte Wert eingeben für: ${missing.join(', ')}` });
    return;
  }

  try {
    const result = f.isCustom ? evalCustom(f.formula, vals) : f.calc(vals);
    if (isNaN(result) || !isFinite(result) && !(result === Infinity)) {
      showResult({ error: 'Ungültige Eingabe oder Division durch 0' });
      return;
    }
    const steps = f.isCustom ? buildCustomSteps(f, vals, result) : (f.steps ? f.steps(vals) : []);
    showResult({ value: result, unit: f.resultUnit, name: f.resultName, steps });
  } catch (err) {
    showResult({ error: err.message || 'Berechnungsfehler' });
  }
});

$('btnReset').addEventListener('click', () => {
  if (!activeFormula) return;
  activeFormula.vars.forEach(v => {
    const el = $(`inp_${v.sym}`);
    if (el) el.value = '';
  });
  resultBox.style.display = 'none';
});

/* ============================================================
   11. ERGEBNIS ANZEIGEN
   ============================================================ */
function showResult({ value, unit, name, steps, error }) {
  resultBox.style.display = 'block';

  if (error) {
    resultBox.innerHTML = `<div class="result-error"><i class="fas fa-exclamation-circle"></i> ${error}</div>`;
    resultBox.style.borderColor = 'var(--red)';
    resultBox.style.boxShadow = '0 0 30px rgba(242,92,92,0.1)';
    return;
  }

  resultBox.style.borderColor = 'var(--green)';
  resultBox.style.boxShadow = '0 0 30px rgba(34,211,160,0.1)';

  const formatted = formatNumber(value);
  const sci       = formatSci(value);

  resultBox.innerHTML = `
    <div class="result-label"><i class="fas fa-check-circle"></i> ${name || 'Ergebnis'}</div>
    <div class="result-value">${formatted}</div>
    <div class="result-unit">${unit || ''}</div>
    ${sci !== formatted ? `<div class="result-sci">= ${sci}</div>` : ''}
    ${steps && steps.length ? `<div class="result-steps"><strong style="color:var(--text);font-family:var(--font)">Rechenweg:</strong><br>${steps.join('<br>')}</div>` : ''}
  `;
  resultBox.style.display = 'block';
}

/* ============================================================
   12. ZAHLENFORMAT
   ============================================================ */
function formatNumber(n) {
  if (n === undefined || n === null) return '—';
  const abs = Math.abs(n);
  if (abs === 0) return '0';
  if (abs >= 1e-4 && abs < 1e9) {
    // Normale Darstellung mit max 10 signifikante Stellen
    let s = parseFloat(n.toPrecision(10)).toString();
    return s;
  }
  return formatSci(n);
}

function formatSci(n) {
  if (n === undefined || n === null) return '—';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs >= 0.001 && abs < 1e6) return parseFloat(n.toPrecision(8)).toString();
  const exp = Math.floor(Math.log10(abs));
  const mant = n / Math.pow(10, exp);
  return `${parseFloat(mant.toPrecision(7))} × 10^${exp}`;
}

/* ============================================================
   13. KONSTANTEN IN EINGABE EINFÜGEN
   ============================================================ */
let lastFocusedInput = null;

document.addEventListener('focusin', e => {
  if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
    lastFocusedInput = e.target;
  }
});

function useConstant(sym, val) {
  if (lastFocusedInput && document.contains(lastFocusedInput)) {
    lastFocusedInput.value = val;
    lastFocusedInput.dispatchEvent(new Event('input', { bubbles: true }));
    lastFocusedInput.focus();
  } else {
    // Fallback: erstes sichtbares Zahlenfeld befüllen
    const el = document.querySelector('#inputsGrid input[type="number"]');
    if (el) { el.value = val; el.focus(); lastFocusedInput = el; }
  }
}

/* ============================================================
   14. EIGENE FORMELN
   ============================================================ */
function bindCustomEvents() {
  $('btnAddVar').addEventListener('click', addVarRow);
  $('btnSaveFormula').addEventListener('click', saveCustomFormula);
  $('btnTestFormula').addEventListener('click', testCustomFormula);
  $('btnExport').addEventListener('click', exportFormulas);
  $('btnImport').addEventListener('click', () => $('importFile').click());
  $('importFile').addEventListener('change', e => {
    importFormulas(e.target.files[0]);
    e.target.value = '';
  });
}

let varCount = 0;

function addVarRow(name = '', desc = '', unit = '') {
  varCount++;
  const id = `varRow_${varCount}`;
  const row = document.createElement('div');
  row.className = 'var-row';
  row.id = id;
  row.innerHTML = `
    <input type="text"   class="var-sym"   placeholder="Symbol (z.B. m)" value="${name}" />
    <input type="text"   class="var-desc"  placeholder="Bezeichnung"     value="${desc}" />
    <input type="text"   class="var-unit"  placeholder="Einheit (z.B. kg)" value="${unit}" />
    <button class="btn-del-var" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  variablesCont.appendChild(row);
}

function getVarRows() {
  return [...variablesCont.querySelectorAll('.var-row')].map(row => ({
    sym:  row.querySelector('.var-sym').value.trim(),
    name: row.querySelector('.var-desc').value.trim(),
    unit: row.querySelector('.var-unit').value.trim()
  })).filter(v => v.sym);
}

function saveCustomFormula() {
  const name     = $('customName').value.trim();
  const rawFormula = $('customFormula').value.trim();
  const desc     = $('customDesc').value.trim();
  const cat      = $('customCategory').value.trim() || 'Benutzerdefiniert';
  const resUnit  = $('customResultUnit').value.trim();
  const vars     = getVarRows();

  if (!name)      { showCustomFeedback('error', 'Bitte einen Formelnamen eingeben.'); return; }
  if (!rawFormula){ showCustomFeedback('error', 'Bitte einen Formelausdruck eingeben.'); return; }
  if (vars.length === 0){ showCustomFeedback('error', 'Bitte mindestens eine Variable definieren.'); return; }

  // Parse: "Ergebnis = Ausdruck"
  const eqIdx = rawFormula.indexOf('=');
  if (eqIdx < 0) { showCustomFeedback('error', 'Formel muss ein "=" enthalten. z.B. E = m * c^2'); return; }
  const formulaExpr = rawFormula.slice(eqIdx + 1).trim();

  const btnSave  = $('btnSaveFormula');
  const editId   = btnSave.dataset.editId || null;

  // Test-Berechnung
  const testVals = {};
  vars.forEach(v => testVals[v.sym] = 1);
  try { evalCustom(formulaExpr, testVals); } catch(e) {
    showCustomFeedback('error', `Formel-Fehler: ${e.message}`);
    return;
  }

  const finalCat = cat === 'Mechanik' || Object.keys(CAT_ICONS).includes(cat) ? cat : 'Benutzerdefiniert';

  if (editId) {
    // UPDATE bestehende Formel
    const idx = customFormulas.findIndex(x => x.id === editId);
    if (idx !== -1) {
      customFormulas[idx] = {
        ...customFormulas[idx],
        name, cat: finalCat, expr: rawFormula, displayExpr: rawFormula,
        desc, vars, formula: formulaExpr, resultUnit: resUnit, resultName: name
      };
    }
    delete btnSave.dataset.editId;
    btnSave.innerHTML = '<i class="fas fa-save"></i> Formel speichern';
    showCustomFeedback('success', `✓ Formel "${name}" aktualisiert!`);
  } else {
    // NEU anlegen
    const id = 'custom_' + Date.now();
    customFormulas.push({
      id, cat: finalCat, name, expr: rawFormula, displayExpr: rawFormula,
      desc, vars, formula: formulaExpr, resultUnit: resUnit, resultName: name,
      isCustom: true
    });
    showCustomFeedback('success', `✓ Formel "${name}" gespeichert!`);
  }

  saveCustomToStorage();
  renderCategories();
  renderFormulas();
  renderSavedFormulas();
  clearCustomForm();
}

function testCustomFormula() {
  const rawFormula = $('customFormula').value.trim();
  const vars       = getVarRows();
  if (!rawFormula) { showCustomFeedback('error', 'Bitte Formel eingeben.'); return; }
  const eqIdx = rawFormula.indexOf('=');
  if (eqIdx < 0)   { showCustomFeedback('error', 'Formel muss "=" enthalten.'); return; }
  const expr   = rawFormula.slice(eqIdx + 1).trim();
  const testVals = {};
  vars.forEach(v => { if (v.sym) testVals[v.sym] = 1; });
  try {
    const r = evalCustom(expr, testVals);
    showCustomFeedback('success', `✓ Syntax OK · Testwert (alle Vars = 1): ${formatNumber(r)}`);
  } catch(e) {
    showCustomFeedback('error', `Fehler: ${e.message}`);
  }
}

function clearCustomForm() {
  ['customName','customFormula','customDesc','customCategory','customResultUnit']
    .forEach(id => { $(id).value = ''; });
  variablesCont.innerHTML = '';
  varCount = 0;
}

function showCustomFeedback(type, msg) {
  customFeedback.className = `custom-feedback ${type}`;
  customFeedback.textContent = msg;
  setTimeout(() => { customFeedback.className = 'custom-feedback'; }, 5000);
}

/* ============================================================
   15. CUSTOM FORMULA AUSWERTEN (sicherer Math-Parser)
   ============================================================ */
function evalCustom(expr, vars) {
  // Sichere Auswertung durch Aufbau einer Funktion mit bekannten Variablen
  const keys = Object.keys(vars);
  const vals  = keys.map(k => vars[k]);

  // Transformation: ^  →  **   |  sqrt, sin, cos, tan, log, exp, abs, PI
  // Einheitliche Umwandlung mit einem Schritt via Map
  const fnMap = {
    'arcsin': 'Math.asin',  'arccos': 'Math.acos',  'arctan': 'Math.atan',
    'asin':   'Math.asin',  'acos':   'Math.acos',  'atan2':  'Math.atan2',
    'atan':   'Math.atan',  'sinh':   'Math.sinh',  'cosh':   'Math.cosh',
    'tanh':   'Math.tanh',  'sqrt':   'Math.sqrt',  'cbrt':   'Math.cbrt',
    'sin':    'Math.sin',   'cos':    'Math.cos',   'tan':    'Math.tan',
    'log10':  'Math.log10', 'log2':   'Math.log2',  'ln':     'Math.log',
    'log':    'Math.log10', 'exp':    'Math.exp',   'abs':    'Math.abs',
    'PI':     'Math.PI',    'pi':     'Math.PI',
  };

  // Alle Funktionen/Konstanten in einem Durchlauf ersetzen (längste zuerst)
  const fnPattern = new RegExp(
    '\\b(' + Object.keys(fnMap).sort((a,b) => b.length - a.length).join('|') + ')\\b',
    'g'
  );

  let e = expr
    .replace(/\^/g, '**')
    .replace(fnPattern, match => fnMap[match])
    // Euler'sche Zahl: nur alleinstehend (nicht Teil von Math.xxx)
    .replace(/(?<![\w.])\bE\b(?![\w.])/g, 'Math.E');

  // Erlaubt: ASCII, griechisch (Α-ω), Buchstaben-ähnliche Symbole,
  // Superskript/Subskript, Sonderzeichen (ℏ ² ³ · × ÷ √ ∞ Ξ η ...)
  // Blockiert nur wirklich gefährliche Zeichen
  const forbidden = /[`'"\\;{}<>]/;
  if (forbidden.test(e)) {
    throw new Error('Unerlaubtes Zeichen im Ausdruck');
  }

  const fn = new Function(...keys, `'use strict'; return (${e});`);
  const result = fn(...vals);
  if (typeof result !== 'number') throw new Error('Formel liefert keinen Zahlenwert');
  return result;
}

function buildCustomSteps(f, vals, result) {
  const varStr = f.vars.map(v => `${v.sym} = ${vals[v.sym]} ${v.unit}`).join(', ');
  return [`Formel: ${f.expr}`, `Eingesetzt: ${varStr}`, `Ergebnis: ${formatNumber(result)} ${f.resultUnit}`];
}

/* ============================================================
   16. GESPEICHERTE FORMELN
   ============================================================ */
function renderSavedFormulas() {
  if (customFormulas.length === 0) { savedSection.style.display = 'none'; return; }
  savedSection.style.display = 'block';
  savedList.innerHTML = customFormulas.map(f => `
    <div class="saved-formula-item">
      <div class="sfi-info">
        <div class="sfi-name">${f.name} <span style="color:var(--text3);font-size:0.78rem;">(${f.cat})</span></div>
        <div class="sfi-expr">${f.expr}</div>
      </div>
      <div class="sfi-actions">
        <button class="sfi-btn use" onclick="jumpToCustom('${f.id}')">
          <i class="fas fa-calculator"></i> Verwenden
        </button>
        <button class="sfi-btn edit" onclick="editCustom('${f.id}')">
          <i class="fas fa-pen"></i> Bearbeiten
        </button>
        <button class="sfi-btn del" onclick="deleteCustom('${f.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function jumpToCustom(id) {
  const f = customFormulas.find(x => x.id === id);
  if (!f) return;
  setCategory(f.cat === 'Benutzerdefiniert' ? 'Benutzerdefiniert' : f.cat);
  setTimeout(() => selectFormula(id), 50);
}

function editCustom(id) {
  const f = customFormulas.find(x => x.id === id);
  if (!f) return;

  // Formular befüllen
  $('customName').value       = f.name;
  $('customCategory').value   = f.cat === 'Benutzerdefiniert' ? '' : f.cat;
  $('customFormula').value    = f.expr;
  $('customDesc').value       = f.desc || '';
  $('customResultUnit').value = f.resultUnit || '';

  // Variablen neu aufbauen
  variablesCont.innerHTML = '';
  varCount = 0;
  f.vars.forEach(v => addVarRow(v.sym, v.name, v.unit));

  // Save-Button in Update-Modus schalten
  const btnSave = $('btnSaveFormula');
  btnSave.innerHTML = '<i class="fas fa-save"></i> Änderungen speichern';
  btnSave.dataset.editId = id;

  // Zum Formular scrollen
  document.querySelector('.custom-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  showCustomFeedback('success', `✎ Formel "${f.name}" wird bearbeitet — Änderungen vornehmen und speichern.`);
}

function deleteCustom(id) {
  customFormulas = customFormulas.filter(f => f.id !== id);
  saveCustomToStorage();
  renderCategories();
  renderFormulas();
  renderSavedFormulas();
  if (activeFormula && activeFormula.id === id) {
    calculatorSection.style.display = 'none';
    activeFormula = null;
  }
}

/* ============================================================
   17. PERSISTENZ (localStorage) + EXPORT / IMPORT
   ============================================================ */
function saveCustomToStorage() {
  try { localStorage.setItem('physik_custom_formulas', JSON.stringify(customFormulas)); } catch(e) {}
}

function loadCustomFormulas() {
  try {
    const raw = localStorage.getItem('physik_custom_formulas');
    if (raw) customFormulas = JSON.parse(raw);
  } catch(e) { customFormulas = []; }
  renderSavedFormulas();
  if (customFormulas.length > 0) renderCategories();
}

/* ── Export ── */
function exportFormulas() {
  if (customFormulas.length === 0) {
    showCustomFeedback('error', 'Keine Formeln zum Exportieren vorhanden.');
    return;
  }
  const data = JSON.stringify(customFormulas, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `physik_formeln_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showCustomFeedback('success', `✓ ${customFormulas.length} Formel(n) exportiert.`);
}

/* ── Import ── */
function importFormulas(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported)) throw new Error('Ungültiges Format');

      let added = 0, skipped = 0;
      imported.forEach(f => {
        if (!f.id || !f.name || !f.formula) { skipped++; return; }
        // Doppelte IDs vermeiden
        if (customFormulas.find(x => x.id === f.id)) {
          f.id = 'custom_' + Date.now() + '_' + Math.random().toString(36).slice(2,6);
        }
        f.isCustom = true;
        customFormulas.push(f);
        added++;
      });

      saveCustomToStorage();
      renderCategories();
      renderFormulas();
      renderSavedFormulas();
      showCustomFeedback('success', `✓ ${added} Formel(n) importiert${skipped ? `, ${skipped} übersprungen` : ''}.`);
    } catch(err) {
      showCustomFeedback('error', `Import-Fehler: ${err.message}`);
    }
  };
  reader.readAsText(file);
}

/* ============================================================
   18. FULLSCREEN
   ============================================================ */
const btnFS  = $('btnFullscreen');
const fsIcon = $('fsIcon');

btnFS.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
});

document.addEventListener('fullscreenchange', () => {
  const active = !!document.fullscreenElement;
  fsIcon.className = active ? 'fas fa-compress' : 'fas fa-expand';
  btnFS.childNodes[1].textContent = active ? ' Vollbild beenden' : ' Vollbild';
});

/* ============================================================
   19. START
   ============================================================ */
document.addEventListener('DOMContentLoaded', init);
