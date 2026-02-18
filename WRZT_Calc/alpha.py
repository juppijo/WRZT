from scipy.constants import e, hbar, c, epsilon_0, m_e, pi
import math

# CODATA 2018 Naturkonstanten
e = 1.602176634e-19       # Elementarladung (C)
hbar = 1.054571817e-34    # Reduziertes Wirkungsquantum (Js)
c = 299792458             # Lichtgeschwindigkeit (m/s)
eps0 = 8.8541878128e-12   # Elektrische Feldkonstante (F/m)
m0 = 9.1093837015e-31     # Elektron-Ruhemasse (kg)

# --- WEG 1: Traditionelle Definition ---
# alpha = e^2 / (4 * pi * eps0 * hbar * c)
alpha_trad = (e**2) / (4 * math.pi * eps0 * hbar * c)

# --- WEG 2: WRZT Mechanik (Das Kraft-Verhältnis) ---
# r_min ist der Punkt, an dem die Zentrifugalkraft bei v=c wirkt:
rmin = hbar / (m0 * c)

# Die theoretische Coulomb-Kraft an diesem Punkt rmin:
F_coulomb = (e**2) / (4 * math.pi * eps0 * rmin**2)

# Die totale mechanische Zentrifugalkraft bei rmin (v=c):
F_total = (m0 * c**2) / rmin

# In der WRZT gilt: alpha = F_coulomb / F_total
alpha_wrzt = F_coulomb / F_total

print(f"Alpha (Traditionell): {alpha_trad:.12f}")
print(f"Alpha (WRZT Mechanik): {alpha_wrzt:.12f}")
print(f"Inverse Alpha (1/a):  {1/alpha_wrzt:.10f}")
print(f"-----------------------------------------")

# 1. Traditioneller Weg (Elektromagnetische Kopplung)
alpha_trad = (e**2) / (4 * pi * epsilon_0 * hbar * c)

# 2. WRZT Weg (Mechanisches Kraftverhältnis)
# r_min ist der stabile Radius der Raumzeit-Rotation (v=c)
r_min = hbar / (m_e * c)

# Coulomb-Kraft bei r_min
F_coulomb = (e**2) / (4 * pi * epsilon_0 * r_min**2)

# Totale Zentrifugalkraft (Bindungsenergie-Äquivalent) bei r_min
F_total = (m_e * c**2) / r_min

# alpha als das mechanische Verhältnis in der WRZT
alpha_wrzt = F_coulomb / F_total

print(f"Alpha (SciPy traditionell): {alpha_trad:.15f}")
print(f"Alpha (WRZT Kraft-Ratio):  {alpha_wrzt:.15f}")
print(f"Differenz:                 {alpha_trad - alpha_wrzt}")
print(f"1 / Alpha:                 {1/alpha_wrzt:.12f}")
