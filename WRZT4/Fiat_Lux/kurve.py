import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path


# ============================================================
# WRZT – Relativistischer Grenzfall
# Radius, klassische Beschleunigung, Geschwindigkeit und Gamma
# ============================================================

# ------------------------------------------------------------
# Darstellung
# ------------------------------------------------------------
# "seaborn-v0_8-whitegrid" ist in neueren Matplotlib-Versionen
# verfügbar. Falls nicht, wird auf den Standardstil zurückgegriffen.
if "seaborn-v0_8-whitegrid" in plt.style.available:
    plt.style.use("seaborn-v0_8-whitegrid")
else:
    plt.style.use("default")


# ------------------------------------------------------------
# Normierte Zeit
# ------------------------------------------------------------
# Der exakte Grenzpunkt tau = 1 wird vermieden, weil dort
# Radius -> 0 und die klassischen Größen divergieren.
tau = np.linspace(0.0, 0.99999, 10_000)


# ------------------------------------------------------------
# 1. Klassischer normierter Radius
# ------------------------------------------------------------
# Aus dem Modell:
#
#     r(t)^3 = r0^3 - 3 C t
#
# folgt normiert:
#
#     r/r0 = (1 - tau)^(1/3)
#
r_norm = np.maximum(1.0 - tau, np.finfo(float).tiny) ** (1.0 / 3.0)


# ------------------------------------------------------------
# 2. Klassische normierte Beschleunigung
# ------------------------------------------------------------
# Für die klassische Coulomb-Kraft gilt:
#
#     a ~ 1/r^2
#
# und damit:
#
#     a/a0 = (r0/r)^2 = (1 - tau)^(-2/3)
#
a_norm = (1.0 - tau) ** (-2.0 / 3.0)


# ------------------------------------------------------------
# 3. Modellgeschwindigkeit
# ------------------------------------------------------------
# Anfangsgeschwindigkeit:
#
#     v0/c ≈ 0.00375
#
# Die Geschwindigkeit steigt glatt gegen c.
# Der mathematische Grenzpunkt v/c = 1 wird numerisch
# nicht exakt überschritten.
v0_c = 0.00375

v_over_c = v0_c + (1.0 - v0_c) * tau**3
v_over_c = np.clip(v_over_c, 0.0, 0.999999)


# ------------------------------------------------------------
# 4. Lorentz-Faktor
# ------------------------------------------------------------
#     gamma = 1 / sqrt(1 - v^2/c^2)
#
# Für v -> c gilt:
#
#     gamma -> infinity
#
gamma = 1.0 / np.sqrt(1.0 - v_over_c**2)


# ============================================================
# PLOT
# ============================================================

fig, ax1 = plt.subplots(figsize=(11, 7))


# ------------------------------------------------------------
# Achse 1: Lorentz-Faktor Gamma
# ------------------------------------------------------------
color_gamma = "#9467bd"

ax1.set_xlabel(
    r"Normierte Zeit $t/t_{\mathrm{kollaps}}$",
    fontsize=12,
    fontweight="bold",
)

ax1.set_ylabel(
    r"Lorentz-Faktor $\gamma$",
    color=color_gamma,
    fontsize=12,
    fontweight="bold",
)

line_gamma, = ax1.plot(
    tau,
    gamma,
    color=color_gamma,
    linewidth=3,
    label=r"Lorentz-Faktor $\gamma(v)$",
)

ax1.tick_params(axis="y", labelcolor=color_gamma)
ax1.set_yscale("log")
ax1.set_ylim(1, 1e4)
ax1.set_xlim(0, 1)

ax1.grid(
    True,
    linestyle="--",
    alpha=0.6,
    which="both",
)


# ------------------------------------------------------------
# Achse 2: Geschwindigkeit v/c
# ------------------------------------------------------------
ax_vel = ax1.twinx()

color_vel = "#1f77b4"

ax_vel.set_ylabel(
    r"Geschwindigkeit $v(t)/c$",
    color=color_vel,
    fontsize=12,
    fontweight="bold",
)

line_vel, = ax_vel.plot(
    tau,
    v_over_c,
    color=color_vel,
    linewidth=2.5,
    linestyle=":",
    label=r"Relativistische Geschwindigkeit $v/c \rightarrow 1$",
)

ax_vel.tick_params(axis="y", labelcolor=color_vel)
ax_vel.set_ylim(0, 1.05)


# ------------------------------------------------------------
# Achse 3: Klassische Beschleunigung
# ------------------------------------------------------------
ax_accel = ax1.twinx()

# Dritte Y-Achse nach außen verschieben
ax_accel.spines["right"].set_position(("outward", 65))

color_accel = "#2ca02c"

ax_accel.set_ylabel(
    r"Normierte klassische Beschleunigung $a(t)/a_0$",
    color=color_accel,
    fontsize=12,
    fontweight="bold",
)

line_accel, = ax_accel.plot(
    tau,
    a_norm,
    color=color_accel,
    linewidth=2,
    linestyle="--",
    label=r"Klassische Beschleunigung $a/a_0 \propto r^{-2}$",
)

ax_accel.tick_params(axis="y", labelcolor=color_accel)
ax_accel.set_yscale("log")
ax_accel.set_ylim(1, 1e5)


# ------------------------------------------------------------
# Titel
# ------------------------------------------------------------
ax1.set_title(
    r"Relativistischer Grenzfall: $\gamma$-Explosion, "
    r"Geschwindigkeit und klassische Beschleunigung",
    fontsize=14,
    fontweight="bold",
    pad=15,
)


# ------------------------------------------------------------
# Gemeinsame Legende
# ------------------------------------------------------------
lines = [line_gamma, line_vel, line_accel]
labels = [line.get_label() for line in lines]

ax_accel.legend(
    lines,
    labels,
    loc="upper left",
    fontsize=10,
    frameon=True,
)


# ------------------------------------------------------------
# Layout und Ausgabe
# ------------------------------------------------------------
fig.tight_layout()

output_file = Path(__file__).resolve().parent / "gamma_vel_accel_all_in_one.png"

fig.savefig(
    output_file,
    dpi=300,
    bbox_inches="tight",
)

plt.close(fig)

print(f"Diagramm gespeichert unter:\n{output_file}")
