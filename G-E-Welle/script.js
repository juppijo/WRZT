/* ════════════════════════════════════════════════════════════════
   Welleninterferenz · script.js
   WebGL Interferenz-Simulation + 3D Z-Rotations-Ansicht
   ════════════════════════════════════════════════════════════════ */

'use strict';

// ── Konstanten ────────────────────────────────────────────────────────────────

const SOURCE_COLORS = [
  '#4d9fff', '#ff4d6d', '#4ef0c4', '#ffd166',
  '#c084fc', '#ff9f2f', '#a8ff78', '#ff78c4'
];

const ROT_COLORS = ['#4d9fff', '#ff4d6d'];  // Blau = Q1, Rot = Q2

const COLOR_MODES = [
  { bg: 'linear-gradient(135deg,#0c1ee8,#020208,#e81a06)', name: 'Rot / Blau' },
  { bg: 'linear-gradient(135deg,#000,#555,#ddd)',           name: 'Graustufen' },
  { bg: 'linear-gradient(135deg,#005,#0af,#ee0)',           name: 'Spektral'   },
  { bg: 'linear-gradient(135deg,#001025,#0356a0,#0af)',     name: 'Ozean'      },
  { bg: 'linear-gradient(135deg,#1a0000,#a03000,#f06000)',  name: 'Feuer'      }
];

// ── GLSL Vertex Shader ────────────────────────────────────────────────────────

const VERT_SRC = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

// ── GLSL Fragment Shader ──────────────────────────────────────────────────────

const FRAG_SRC = `
precision highp float;

uniform vec2  u_res;       // Auflösung in Pixeln
uniform float u_time;      // Simulationszeit
uniform vec2  u_src[8];    // Statische Quellen (normalisiert 0..1)
uniform float u_amp[8];    // Amplituden der statischen Quellen
uniform float u_lam;       // Wellenlänge in Pixeln
uniform float u_omega;     // Kreisfrequenz
uniform float u_decay;     // Dämpfung
uniform float u_gamp;      // Globale Amplitude
uniform int   u_cm;        // Farbschema (0..4)
uniform vec3  u_r1;        // Rotierende Quelle 1 (x, y, z) normalisiert
uniform vec3  u_r2;        // Rotierende Quelle 2
uniform float u_ramp;      // Amplitude der rotierenden Quellen
uniform int   u_ren;       // Rotierende Quellen aktiv (0/1)

/* ── Farbschemata ────────────────────────────────────────── */

vec3 cm_redblue(float v) {
  vec3 B = vec3(0.04, 0.14, 0.94);
  vec3 M = vec3(0.012, 0.012, 0.035);
  vec3 R = vec3(0.94, 0.07, 0.04);
  float t = (v + 1.0) * 0.5;
  return t < 0.5 ? mix(B, M, t * 2.0) : mix(M, R, (t - 0.5) * 2.0);
}

vec3 cm_gray(float v) {
  float t = (v + 1.0) * 0.5;
  t = t * t * (3.0 - 2.0 * t);
  return vec3(t * 0.88);
}

vec3 cm_spectral(float v) {
  float t = (v + 1.0) * 0.5;
  float r = abs(t * 6.0 - 3.0) - 1.0;
  float g = 2.0 - abs(t * 6.0 - 2.0);
  float b = 2.0 - abs(t * 6.0 - 4.0);
  return clamp(vec3(r, g, b) * 0.82, 0.0, 1.0);
}

vec3 cm_ocean(float v) {
  float t = (v + 1.0) * 0.5;
  vec3 deep = mix(vec3(0.0, 0.0, 0.04), vec3(0.0, 0.24, 0.72), t);
  return mix(deep, vec3(0.5, 0.88, 1.0), t * t * 0.72);
}

vec3 cm_fire(float v) {
  float t = (v + 1.0) * 0.5;
  if (t < 0.33) return mix(vec3(0.025, 0.0, 0.0),  vec3(0.70, 0.06, 0.0),  t * 3.0);
  if (t < 0.67) return mix(vec3(0.70,  0.06, 0.0),  vec3(1.0,  0.50, 0.0),  (t - 0.33) * 3.0);
  return             mix(vec3(1.0,  0.50, 0.0),  vec3(1.0,  1.0,  0.48), (t - 0.67) * 3.0);
}

vec3 colormap(float v) {
  v = clamp(v, -1.0, 1.0);
  if (u_cm == 0) return cm_redblue(v);
  if (u_cm == 1) return cm_gray(v);
  if (u_cm == 2) return cm_spectral(v);
  if (u_cm == 3) return cm_ocean(v);
  return cm_fire(v);
}

/* ── Hauptprogramm ───────────────────────────────────────── */

void main() {
  vec2  px    = gl_FragCoord.xy;
  float total = 0.0;
  float k     = 6.28318 / u_lam;

  /* Statische 2D-Quellen: zylindrische Wellen (Abfall ~ 1/sqrt(r)) */
  for (int i = 0; i < 8; i++) {
    float a  = u_amp[i] * u_gamp;
    vec2  sp = u_src[i] * u_res;
    float d  = max(distance(px, sp), 5.0);
    total += a * sin(k * d - u_omega * u_time)
             * exp(-u_decay * d / u_res.x)
             / sqrt(d * 0.026 + 1.0);
  }

  /* Rotierende 3D-Quellen: sphärische Wellen (Abfall ~ 1/r) */
  if (u_ren > 0) {
    /* Quelle 1 */
    vec2  p1 = u_r1.xy * u_res;
    float z1 = u_r1.z  * u_res.y;
    float d1 = max(length(vec3(px - p1, z1)), 5.0);
    total += u_ramp * u_gamp * sin(k * d1 - u_omega * u_time)
             * exp(-u_decay * d1 / u_res.x) / (d1 * 0.005 + 1.0);

    /* Quelle 2 */
    vec2  p2 = u_r2.xy * u_res;
    float z2 = u_r2.z  * u_res.y;
    float d2 = max(length(vec3(px - p2, z2)), 5.0);
    total += u_ramp * u_gamp * sin(k * d2 - u_omega * u_time)
             * exp(-u_decay * d2 / u_res.x) / (d2 * 0.005 + 1.0);
  }

  total = clamp(total * 1.35, -1.0, 1.0);
  gl_FragColor = vec4(colormap(total), 1.0);
}
`;

// ── Simulationszustand ────────────────────────────────────────────────────────

const state = {
  /* Statische Quellen */
  sources: [
    { x: 0.35, y: 0.5, a: 1.0 },
    { x: 0.65, y: 0.5, a: 1.0 }
  ],
  /* Zeitsteuerung */
  paused:  false,
  time:    0.0,
  lastTS:  null,
  drag:    null,
  /* UI */
  curTab:  0,
  cm:      0,
  /* Wellenparameter */
  lam:   80,
  omega: 1.0,
  gamp:  1.0,
  dec:   0.2,
  /* Rotierende Quellen */
  rotOn:   false,
  rotSpd:  1.0,
  rotRad:  0.20,
  rotZ:    0.30,
  rotPhi:  Math.PI,
  rotAmp:  1.0,
  rotTilt: 0.0,    // Neigungswinkel der Umlaufbahn zur Z-Achse (Radiant)
  /* Aktuelle Positionen der rotierenden Quellen */
  rs1: { x: 0.70, y: 0.50, z: 0.30 },
  rs2: { x: 0.30, y: 0.50, z: 0.30 }
};

// ── WebGL Initialisierung ─────────────────────────────────────────────────────

const cvs = document.getElementById('glc');
const gl  = cvs.getContext('webgl') || cvs.getContext('experimental-webgl');

if (!gl) {
  document.getElementById('gl-error').classList.remove('hidden');
  document.getElementById('glc').style.display = 'none';
  throw new Error('WebGL nicht verfügbar');
}

/** Shader kompilieren */
function compileShader(type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader Fehler:', gl.getShaderInfoLog(shader));
  }
  return shader;
}

/* Programm verlinken */
const prog = gl.createProgram();
gl.attachShader(prog, compileShader(gl.VERTEX_SHADER,   VERT_SRC));
gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FRAG_SRC));
gl.linkProgram(prog);
gl.useProgram(prog);

/* Fullscreen-Quad (-1,-1 bis +1,+1) */
const quadBuf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
gl.bufferData(gl.ARRAY_BUFFER,
  new Float32Array([-1,-1,  1,-1,  -1,1,  1,1]),
  gl.STATIC_DRAW);
const aPos = gl.getAttribLocation(prog, 'a_pos');
gl.enableVertexAttribArray(aPos);
gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

/* Uniform-Locations cachen */
const U = {
  res:   gl.getUniformLocation(prog, 'u_res'),
  time:  gl.getUniformLocation(prog, 'u_time'),
  src:   gl.getUniformLocation(prog, 'u_src'),
  amp:   gl.getUniformLocation(prog, 'u_amp'),
  lam:   gl.getUniformLocation(prog, 'u_lam'),
  omega: gl.getUniformLocation(prog, 'u_omega'),
  decay: gl.getUniformLocation(prog, 'u_decay'),
  gamp:  gl.getUniformLocation(prog, 'u_gamp'),
  cm:    gl.getUniformLocation(prog, 'u_cm'),
  r1:    gl.getUniformLocation(prog, 'u_r1'),
  r2:    gl.getUniformLocation(prog, 'u_r2'),
  ramp:  gl.getUniformLocation(prog, 'u_ramp'),
  ren:   gl.getUniformLocation(prog, 'u_ren')
};

// ── Canvas-Größe anpassen ─────────────────────────────────────────────────────

function resizeCanvas() {
  const W = cvs.clientWidth, H = cvs.clientHeight;
  if (cvs.width !== W || cvs.height !== H) {
    cvs.width  = W;
    cvs.height = H;
    gl.viewport(0, 0, W, H);
  }
}
new ResizeObserver(resizeCanvas).observe(cvs);

// ── Animations-Loop ───────────────────────────────────────────────────────────

function computeRotSources() {
  const angle = state.rotSpd * state.time;
  const cosT  = Math.cos(state.rotTilt);
  const sinT  = Math.sin(state.rotTilt);

  // Umlaufbahn im um Y gekippten Kreis:
  //   x = cx + R·cos(θ)·cos(α)   (Kippung reduziert x-Ausdehnung)
  //   y = cy + R·sin(θ)           (y unverändert)
  //   z = z0 + R·cos(θ)·sin(α)   (Kippung erzeugt Z-Variation)
  state.rs1 = {
    x: 0.5 + state.rotRad * Math.cos(angle)              * cosT,
    y: 0.5 + state.rotRad * Math.sin(angle),
    z: state.rotZ + state.rotRad * Math.cos(angle)              * sinT
  };
  state.rs2 = {
    x: 0.5 + state.rotRad * Math.cos(angle + state.rotPhi) * cosT,
    y: 0.5 + state.rotRad * Math.sin(angle + state.rotPhi),
    z: state.rotZ + state.rotRad * Math.cos(angle + state.rotPhi) * sinT
  };
}

function renderWebGL() {
  /* Statische Quellen in flache Arrays packen */
  const srcArr = new Float32Array(16).fill(0);
  const ampArr = new Float32Array(8).fill(0);
  const n = Math.min(state.sources.length, 8);
  for (let i = 0; i < n; i++) {
    srcArr[i * 2]     = state.sources[i].x;
    srcArr[i * 2 + 1] = state.sources[i].y;
    ampArr[i]         = state.sources[i].a;
  }

  /* Uniforms hochladen */
  gl.uniform2f(U.res,   cvs.width, cvs.height);
  gl.uniform1f(U.time,  state.time);
  gl.uniform2fv(U.src,  srcArr);
  gl.uniform1fv(U.amp,  ampArr);
  gl.uniform1f(U.lam,   state.lam);
  gl.uniform1f(U.omega, state.omega);
  gl.uniform1f(U.decay, state.dec);
  gl.uniform1f(U.gamp,  state.gamp);
  gl.uniform1i(U.cm,    state.cm);
  gl.uniform3f(U.r1,    state.rs1.x, state.rs1.y, state.rs1.z);
  gl.uniform3f(U.r2,    state.rs2.x, state.rs2.y, state.rs2.z);
  gl.uniform1f(U.ramp,  state.rotAmp);
  gl.uniform1i(U.ren,   state.rotOn ? 1 : 0);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function frame(ts) {
  requestAnimationFrame(frame);

  if (!state.lastTS) state.lastTS = ts;
  const dt = Math.min((ts - state.lastTS) / 1000, 0.05);
  state.lastTS = ts;

  if (!state.paused) state.time += dt;

  resizeCanvas();
  if (state.rotOn) computeRotSources();
  renderWebGL();

  /* Hilfs-Canvas nur rendern wenn sichtbar */
  if (state.curTab === 0) drawPreview();
  else                    draw3DView();
}

requestAnimationFrame(frame);

// ── Vorschau-Canvas (Tab 0) ───────────────────────────────────────────────────

const previewCvs = document.getElementById('previewCvs');
const ctx2       = previewCvs.getContext('2d');

function drawPreview() {
  const W = previewCvs.width, H = previewCvs.height;
  ctx2.fillStyle = '#020210';
  ctx2.fillRect(0, 0, W, H);

  const cw   = cvs.clientWidth || 420;
  const step = Math.max(8, state.lam * W / cw * 0.52);
  const ph   = (state.time * state.omega % (Math.PI * 2)) / (Math.PI * 2) * step;

  state.sources.forEach((s, i) => {
    const sx  = s.x * W;
    const sy  = (1 - s.y) * H;
    const col = SOURCE_COLORS[i % 8];

    /* Animierte Ringe */
    for (let r = ph; r < 96; r += step) {
      const alpha = (1 - r / 88) * 0.52;
      if (alpha <= 0) continue;
      ctx2.strokeStyle = col + Math.round(alpha * 255).toString(16).padStart(2, '0');
      ctx2.lineWidth   = 0.7;
      ctx2.beginPath();
      ctx2.arc(sx, sy, r, 0, Math.PI * 2);
      ctx2.stroke();
    }

    /* Glühen */
    const grd = ctx2.createRadialGradient(sx, sy, 0, sx, sy, 9);
    grd.addColorStop(0, col + 'cc');
    grd.addColorStop(1, col + '00');
    ctx2.fillStyle = grd;
    ctx2.beginPath();
    ctx2.arc(sx, sy, 9, 0, Math.PI * 2);
    ctx2.fill();

    /* Kern */
    ctx2.fillStyle = col;
    ctx2.beginPath();
    ctx2.arc(sx, sy, 3.5, 0, Math.PI * 2);
    ctx2.fill();

    /* Beschriftung */
    ctx2.font      = 'bold 10px JetBrains Mono, monospace';
    ctx2.fillStyle = col;
    ctx2.fillText(i + 1, sx + 6, sy - 5);
  });

  /* Rahmen */
  ctx2.strokeStyle = 'rgba(100,110,255,.2)';
  ctx2.lineWidth   = 1;
  ctx2.strokeRect(0.5, 0.5, W - 1, H - 1);
}

// ── 3D-Ansicht (Tab 1) ────────────────────────────────────────────────────────
/* Schiefe Parallelprojektion (Kabinettsprojektion)
   Weltkoordinaten: x, y ∈ [0,1] (Schirmebene), z ≥ 0 (Tiefe hinter Schirm) */

const V3 = {
  W: 240, H: 216,
  OX: 14, OY: 184,    // Schirm untere-linke Ecke im Canvas
  SXS: 116, SYS: 100, // Pixel pro Einheit: x, y
  ZXS: 48,  ZYS: 30   // Pixel pro Einheit Tiefe: rechts, hoch
};

function proj(wx, wy, wz) {
  return {
    u: V3.OX + wx * V3.SXS + wz * V3.ZXS,
    v: V3.OY - wy * V3.SYS - wz * V3.ZYS
  };
}

const view3d = document.getElementById('view3d');
const ctx3   = view3d.getContext('2d');

function draw3DView() {
  const { W, H } = V3;
  ctx3.clearRect(0, 0, W, H);
  ctx3.fillStyle = '#020210';
  ctx3.fillRect(0, 0, W, H);

  const maxD    = Math.min(state.rotZ + 0.14, 0.85);
  const corners = [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }
  ];

  /* Tiefenlinien von den Schirmecken */
  ctx3.strokeStyle = 'rgba(60,80,200,.14)';
  ctx3.lineWidth   = 0.6;
  ctx3.setLineDash([3, 4]);
  corners.forEach(c => {
    const a = proj(c.x, c.y, 0);
    const b = proj(c.x, c.y, maxD);
    ctx3.beginPath();
    ctx3.moveTo(a.u, a.v);
    ctx3.lineTo(b.u, b.v);
    ctx3.stroke();
  });
  ctx3.setLineDash([]);

  /* Schirm-Gitter */
  ctx3.strokeStyle = 'rgba(80,120,255,.14)';
  ctx3.lineWidth   = 0.5;
  for (let i = 0; i <= 4; i++) {
    const t = i / 4;
    let a = proj(t, 0, 0), b = proj(t, 1, 0);
    ctx3.beginPath(); ctx3.moveTo(a.u, a.v); ctx3.lineTo(b.u, b.v); ctx3.stroke();
    a = proj(0, t, 0); b = proj(1, t, 0);
    ctx3.beginPath(); ctx3.moveTo(a.u, a.v); ctx3.lineTo(b.u, b.v); ctx3.stroke();
  }

  /* Schirmfläche */
  const sc = corners.map(c => proj(c.x, c.y, 0));
  ctx3.beginPath();
  ctx3.moveTo(sc[0].u, sc[0].v);
  sc.forEach(p => ctx3.lineTo(p.u, p.v));
  ctx3.closePath();
  ctx3.fillStyle   = 'rgba(40,65,200,.08)';
  ctx3.fill();
  ctx3.strokeStyle = 'rgba(80,130,255,.55)';
  ctx3.lineWidth   = 1.2;
  ctx3.stroke();

  /* Schirm-Beschriftung */
  ctx3.font      = '10px JetBrains Mono, monospace';
  ctx3.fillStyle = 'rgba(100,140,255,.65)';
  ctx3.fillText('Schirm (XY)', sc[1].u + 4, sc[1].v + 1);

  /* Z-Achse mit Pfeil */
  const za = proj(0.5, 0.5, 0);
  const zb = proj(0.5, 0.5, maxD + 0.06);
  ctx3.strokeStyle = 'rgba(160,200,255,.42)';
  ctx3.lineWidth   = 1;
  ctx3.beginPath(); ctx3.moveTo(za.u, za.v); ctx3.lineTo(zb.u, zb.v); ctx3.stroke();
  const ddx = zb.u - za.u, ddy = zb.v - za.v;
  const dlen = Math.sqrt(ddx * ddx + ddy * ddy);
  const ux = ddx / dlen, uy = ddy / dlen;
  ctx3.beginPath();
  ctx3.moveTo(zb.u, zb.v);
  ctx3.lineTo(zb.u - ux * 6 + uy * 3, zb.v - uy * 6 - ux * 3);
  ctx3.lineTo(zb.u - ux * 6 - uy * 3, zb.v - uy * 6 + ux * 3);
  ctx3.closePath();
  ctx3.fillStyle = 'rgba(160,200,255,.42)';
  ctx3.fill();
  ctx3.font      = '10px JetBrains Mono, monospace';
  ctx3.fillStyle = 'rgba(160,200,255,.65)';
  ctx3.fillText('Z', zb.u + 3, zb.v + 3);

  /* Umlaufbahn-Ellipse (gekippt um Neigungswinkel α) */
  const cosT = Math.cos(state.rotTilt);
  const sinT = Math.sin(state.rotTilt);
  ctx3.strokeStyle = 'rgba(255,255,255,.18)';
  ctx3.lineWidth   = 0.8;
  ctx3.beginPath();
  let firstPt = true;
  for (let th = 0; th <= Math.PI * 2 + 0.05; th += 0.08) {
    const ox = 0.5 + state.rotRad * Math.cos(th) * cosT;
    const oy = 0.5 + state.rotRad * Math.sin(th);
    const oz = state.rotZ + state.rotRad * Math.cos(th) * sinT;
    const p  = proj(ox, oy, oz);
    if (firstPt) { ctx3.moveTo(p.u, p.v); firstPt = false; }
    else ctx3.lineTo(p.u, p.v);
  }
  ctx3.closePath(); ctx3.stroke();

  /* Neigungsachse andeuten (wenn α > 0) */
  if (state.rotTilt > 0.02) {
    const pA = proj(0.5, 0.5 - state.rotRad * 1.15, state.rotZ);
    const pB = proj(0.5, 0.5 + state.rotRad * 1.15, state.rotZ);
    ctx3.strokeStyle = 'rgba(255,209,102,.25)';
    ctx3.lineWidth   = 0.7;
    ctx3.setLineDash([4, 3]);
    ctx3.beginPath(); ctx3.moveTo(pA.u, pA.v); ctx3.lineTo(pB.u, pB.v); ctx3.stroke();
    ctx3.setLineDash([]);
    ctx3.font      = '9px JetBrains Mono, monospace';
    ctx3.fillStyle = 'rgba(255,209,102,.5)';
    ctx3.fillText('α=' + Math.round(state.rotTilt * 180 / Math.PI) + '°', pB.u + 3, pB.v + 3);
  }

  /* Mittelpunktkreuz */
  const pc = proj(0.5, 0.5, state.rotZ);
  ctx3.strokeStyle = 'rgba(255,255,255,.18)';
  ctx3.lineWidth   = 0.7;
  ctx3.beginPath();
  ctx3.moveTo(pc.u - 5, pc.v); ctx3.lineTo(pc.u + 5, pc.v);
  ctx3.moveTo(pc.u, pc.v - 5); ctx3.lineTo(pc.u, pc.v + 5);
  ctx3.stroke();

  /* Quellen: aktiv oder Platzhalter */
  const cw   = cvs.clientWidth || 420;
  const step = Math.max(12, state.lam * V3.SXS / cw * 0.55);
  const ph   = (state.time * state.omega % (Math.PI * 2)) / (Math.PI * 2) * step;

  const rSrcs = state.rotOn
    ? [state.rs1, state.rs2]
    : [
        { x: 0.5 + state.rotRad, y: 0.5, z: state.rotZ },
        { x: 0.5 - state.rotRad, y: 0.5, z: state.rotZ }
      ];

  rSrcs.forEach((s, i) => {
    const p3  = proj(s.x, s.y, s.z);
    const p0  = proj(s.x, s.y, 0);
    const col = ROT_COLORS[i];
    const alp = state.rotOn ? 1.0 : 0.35;

    /* Projektionslinie zum Schirm */
    ctx3.strokeStyle = col + (state.rotOn ? '44' : '22');
    ctx3.lineWidth   = 0.8;
    ctx3.setLineDash([3, 3]);
    ctx3.beginPath(); ctx3.moveTo(p3.u, p3.v); ctx3.lineTo(p0.u, p0.v); ctx3.stroke();
    ctx3.setLineDash([]);

    /* Fußpunkt auf dem Schirm */
    ctx3.fillStyle = col + (state.rotOn ? '88' : '44');
    ctx3.beginPath(); ctx3.arc(p0.u, p0.v, 2.5, 0, Math.PI * 2); ctx3.fill();

    /* Animierte Wellenringe (nur wenn aktiv) */
    if (state.rotOn) {
      for (let r = ph + 4; r < 58; r += step) {
        const al = (1 - r / 54) * 0.38;
        if (al <= 0) continue;
        ctx3.strokeStyle = col + Math.round(al * 255).toString(16).padStart(2, '0');
        ctx3.lineWidth   = 0.6;
        ctx3.beginPath();
        let fp = true;
        for (let th = 0; th <= Math.PI * 2 + 0.1; th += 0.14) {
          const nr = r / V3.SXS;
          const q  = proj(s.x + nr * Math.cos(th), s.y + nr * Math.sin(th), s.z);
          if (fp) { ctx3.moveTo(q.u, q.v); fp = false; }
          else ctx3.lineTo(q.u, q.v);
        }
        ctx3.closePath(); ctx3.stroke();
      }
    }

    /* Glühhalo */
    const grd = ctx3.createRadialGradient(p3.u, p3.v, 0, p3.u, p3.v, 11);
    grd.addColorStop(0, col + Math.round(alp * 0.75 * 255).toString(16).padStart(2, '0'));
    grd.addColorStop(1, col + '00');
    ctx3.fillStyle = grd;
    ctx3.beginPath(); ctx3.arc(p3.u, p3.v, 11, 0, Math.PI * 2); ctx3.fill();

    /* Quellpunkt */
    ctx3.fillStyle = col + Math.round(alp * 255).toString(16).padStart(2, '0');
    ctx3.beginPath(); ctx3.arc(p3.u, p3.v, state.rotOn ? 4.5 : 3.0, 0, Math.PI * 2); ctx3.fill();

    /* Beschriftung */
    ctx3.font      = 'bold 9px JetBrains Mono, monospace';
    ctx3.fillStyle = col + Math.round(alp * 255).toString(16).padStart(2, '0');
    ctx3.fillText('Q' + (i + 1), p3.u + 6, p3.v - 4);
  });

  /* Canvas-Rahmen */
  ctx3.strokeStyle = 'rgba(100,110,255,.18)';
  ctx3.lineWidth   = 1;
  ctx3.strokeRect(0.5, 0.5, W - 1, H - 1);
}

// ── Quellenliste rendern ──────────────────────────────────────────────────────

function renderSourceList() {
  const container = document.getElementById('sourceList');
  container.innerHTML = '';

  state.sources.forEach((s, i) => {
    const col  = SOURCE_COLORS[i % 8];
    const card = document.createElement('div');
    card.className = 'src-card';

    /* Kopfzeile */
    const top = document.createElement('div');
    top.className = 'src-top';

    const dot = document.createElement('div');
    dot.className  = 'src-dot';
    dot.style.background  = col;
    dot.style.boxShadow   = `0 0 5px ${col}`;

    const name = document.createElement('span');
    name.className   = 'src-name';
    name.textContent = `Quelle ${i + 1}`;

    const pos = document.createElement('span');
    pos.className   = 'src-pos';
    pos.textContent = `${Math.round(s.x * 100)}% / ${Math.round(s.y * 100)}%`;
    /* Referenz für spätere Positions-Updates beim Drag */
    card._posEl = pos;

    const del = document.createElement('button');
    del.className   = 'src-del';
    del.textContent = '✕';
    del.title       = 'Quelle entfernen';
    del.addEventListener('click', () => {
      state.sources.splice(i, 1);
      renderSourceList();
    });

    top.append(dot, name, pos, del);

    /* Amplitudenzeile */
    const ampRow = document.createElement('div');
    ampRow.className = 'src-amp';

    const ampLabel = document.createElement('span');
    ampLabel.className   = 'src-amp-label';
    ampLabel.textContent = 'A';

    const ampSlider = document.createElement('input');
    ampSlider.type  = 'range';
    ampSlider.min   = '0';
    ampSlider.max   = '20';
    ampSlider.step  = '1';
    ampSlider.value = Math.round(s.a * 10);

    const ampVal = document.createElement('span');
    ampVal.className   = 'src-amp-val';
    ampVal.textContent = s.a.toFixed(1);

    ampSlider.addEventListener('input', () => {
      s.a = ampSlider.value / 10;
      ampVal.textContent = s.a.toFixed(1);
    });

    ampRow.append(ampLabel, ampSlider, ampVal);
    card.append(top, ampRow);
    container.appendChild(card);
  });
}

// ── Tab-Wechsel ───────────────────────────────────────────────────────────────

function setTab(tabIndex) {
  state.curTab = tabIndex;
  document.getElementById('page0').classList.toggle('hidden', tabIndex !== 0);
  document.getElementById('page1').classList.toggle('hidden', tabIndex !== 1);
  document.querySelectorAll('.tab').forEach((btn, i) =>
    btn.classList.toggle('active', i === tabIndex)
  );
}

// ── Canvas-Interaktion (Maus & Touch) ─────────────────────────────────────────

function getCanvasPos(e) {
  const r = cvs.getBoundingClientRect();
  return {
    x: (e.clientX - r.left) / r.width,
    y: 1.0 - (e.clientY - r.top) / r.height
  };
}

function findNearest(x, y, threshold = 0.04) {
  for (let i = 0; i < state.sources.length; i++) {
    const dx = state.sources[i].x - x;
    const dy = state.sources[i].y - y;
    if (Math.sqrt(dx * dx + dy * dy) < threshold) return i;
  }
  return -1;
}

/** Quelle hinzufügen oder Drag starten */
cvs.addEventListener('mousedown', e => {
  if (e.button === 2) return;
  const { x, y } = getCanvasPos(e);
  const idx = findNearest(x, y);
  if (idx >= 0) {
    state.drag = idx;
  } else if (state.sources.length < 8) {
    state.sources.push({ x, y, a: 1.0 });
    renderSourceList();
    state.drag = state.sources.length - 1;
  }
});

/** Quelle ziehen */
window.addEventListener('mousemove', e => {
  if (state.drag === null) return;
  const { x, y } = getCanvasPos(e);
  const s = state.sources[state.drag];
  s.x = Math.max(0, Math.min(1, x));
  s.y = Math.max(0, Math.min(1, y));
  renderSourceList();
});

/** Drag beenden */
window.addEventListener('mouseup', () => { state.drag = null; });

/** Rechtsklick: Quelle löschen */
cvs.addEventListener('contextmenu', e => {
  e.preventDefault();
  const { x, y } = getCanvasPos(e);
  const idx = findNearest(x, y, 0.05);
  if (idx >= 0) {
    state.sources.splice(idx, 1);
    renderSourceList();
  }
});

/* Touch-Events */
cvs.addEventListener('touchstart', e => {
  e.preventDefault();
  const { x, y } = getCanvasPos(e.touches[0]);
  const idx = findNearest(x, y);
  if (idx >= 0) {
    state.drag = idx;
  } else if (state.sources.length < 8) {
    state.sources.push({ x, y, a: 1.0 });
    renderSourceList();
    state.drag = state.sources.length - 1;
  }
}, { passive: false });

cvs.addEventListener('touchmove', e => {
  e.preventDefault();
  if (state.drag === null) return;
  const { x, y } = getCanvasPos(e.touches[0]);
  const s = state.sources[state.drag];
  s.x = Math.max(0, Math.min(1, x));
  s.y = Math.max(0, Math.min(1, y));
  renderSourceList();
}, { passive: false });

cvs.addEventListener('touchend', () => { state.drag = null; });

/** Tastatur: Space = Pause/Start */
window.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    e.preventDefault();
    togglePause();
  }
});

// ── Steuerelemente – globale Parameter ───────────────────────────────────────

function updateGlobal() {
  state.lam   = +document.getElementById('sL').value;
  state.omega =  document.getElementById('sF').value / 10;
  state.gamp  =  document.getElementById('sA').value / 10;
  state.dec   =  document.getElementById('sD').value / 10;

  document.getElementById('vL').textContent = state.lam + ' px';
  document.getElementById('vF').textContent = state.omega.toFixed(1);
  document.getElementById('vA').textContent = state.gamp.toFixed(1);
  document.getElementById('vD').textContent = state.dec.toFixed(1);
}

// ── Steuerelemente – Rotation ─────────────────────────────────────────────────

function updateRot() {
  state.rotSpd  = document.getElementById('sRS').value / 10;
  state.rotRad  = document.getElementById('sRR').value / 50;
  state.rotZ    = document.getElementById('sRD').value / 60;
  state.rotPhi  = document.getElementById('sRP').value * Math.PI / 180;
  state.rotAmp  = document.getElementById('sRA').value / 10;
  state.rotTilt = document.getElementById('sRT').value * Math.PI / 180;

  document.getElementById('vRS').textContent = state.rotSpd.toFixed(1);
  document.getElementById('vRR').textContent = state.rotRad.toFixed(2);
  document.getElementById('vRD').textContent = state.rotZ.toFixed(2);
  document.getElementById('vRP').textContent = document.getElementById('sRP').value + '°';
  document.getElementById('vRA').textContent = state.rotAmp.toFixed(1);
  document.getElementById('vRT').textContent = document.getElementById('sRT').value + '°';
}

// ── Buttons ───────────────────────────────────────────────────────────────────

function togglePause() {
  state.paused = !state.paused;
  document.getElementById('btnPause').textContent =
    state.paused ? '▶ Start' : '⏸ Pause';
}

function toggleRot() {
  state.rotOn = !state.rotOn;
  const btn = document.getElementById('rotBtn');
  btn.textContent = state.rotOn ? 'Ein' : 'Aus';
  btn.classList.toggle('active', state.rotOn);
}

function toggleFS() {
  const el = document.getElementById('app');
  if (!document.fullscreenElement) {
    el.requestFullscreen && el.requestFullscreen();
    document.getElementById('btnFS').textContent = '✕';
  } else {
    document.exitFullscreen && document.exitFullscreen();
    document.getElementById('btnFS').textContent = '⛶';
  }
}
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement)
    document.getElementById('btnFS').textContent = '⛶';
});

// ── Quellenverwaltung ─────────────────────────────────────────────────────────

function addSource() {
  if (state.sources.length >= 8) return;
  state.sources.push({
    x: 0.2 + Math.random() * 0.6,
    y: 0.2 + Math.random() * 0.6,
    a: 1.0
  });
  renderSourceList();
}

function clearSources() {
  state.sources = [];
  renderSourceList();
}

function applyPreset(type) {
  switch (type) {
    case 'd':
      state.sources = [{ x:.35,y:.5,a:1 }, { x:.65,y:.5,a:1 }];
      break;
    case 't':
      state.sources = [{ x:.5,y:.72,a:1 }, { x:.34,y:.38,a:1 }, { x:.66,y:.38,a:1 }];
      break;
    case 'g':
      state.sources = [];
      for (let i = 0; i < 5; i++)
        state.sources.push({ x: 0.14 + i * 0.18, y: 0.5, a: 1 });
      break;
    case 'k':
      state.sources = [];
      for (let i = 0; i < 6; i++)
        state.sources.push({
          x: 0.5 + 0.22 * Math.cos(i * Math.PI / 3),
          y: 0.5 + 0.22 * Math.sin(i * Math.PI / 3),
          a: 1
        });
      break;
  }
  renderSourceList();
}

// ── Farbfelder initialisieren ─────────────────────────────────────────────────

function initColorSwatches() {
  const container = document.getElementById('colorSwatches');
  COLOR_MODES.forEach((mode, i) => {
    const sw = document.createElement('div');
    sw.className       = 'swatch' + (i === 0 ? ' active' : '');
    sw.style.background = mode.bg;
    sw.title            = mode.name;
    sw.addEventListener('click', () => {
      state.cm = i;
      document.querySelectorAll('.swatch').forEach(el => el.classList.remove('active'));
      sw.classList.add('active');
    });
    container.appendChild(sw);
  });
}

// ── Event-Listener an Buttons / Sliders binden ───────────────────────────────

document.getElementById('btnPause').addEventListener('click', togglePause);
document.getElementById('btnFS').addEventListener('click', toggleFS);
document.getElementById('btnAddSrc').addEventListener('click', addSource);
document.getElementById('btnClrSrc').addEventListener('click', clearSources);
document.getElementById('rotBtn').addEventListener('click', toggleRot);

/* Tabs */
document.querySelectorAll('.tab').forEach(btn =>
  btn.addEventListener('click', () => setTab(+btn.dataset.tab))
);

/* Preset-Buttons */
document.querySelectorAll('[data-preset]').forEach(btn =>
  btn.addEventListener('click', () => applyPreset(btn.dataset.preset))
);

/* Globale Slider */
['sL', 'sF', 'sA', 'sD'].forEach(id =>
  document.getElementById(id).addEventListener('input', updateGlobal)
);

/* Rotations-Slider */
['sRS', 'sRR', 'sRD', 'sRP', 'sRA', 'sRT'].forEach(id =>
  document.getElementById(id).addEventListener('input', updateRot)
);

// ── Initialisierung ───────────────────────────────────────────────────────────

updateGlobal();
updateRot();
renderSourceList();
initColorSwatches();
