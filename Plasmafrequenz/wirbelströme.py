import math

# --- 1. Naturkonstanten und WRZT-Werte ---
n = 8.47e28          # Ladungsträgerdichte Kupfer (m^-3)
alpha = 1 / 137.036  # Feinstrukturkonstante
c = 299792458        # Lichtgeschwindigkeit (m/s)
hbar = 1.0545718e-34 # Reduziertes Plancksches Wirkungsquantum (J s)
Xi = 5.897427e-19    # Deine Ur-Spannung aus dem Manifest (kg/m)

omega_p_lit = 1.6e16  # Klassischer Literaturwert für Kupfer (rad/s)

# --- 2. Berechnung des exakten Faktors F ---
# Wir wissen aus der korrekten Vereinfachung:
# omega_p = math.sqrt((4 * math.pi * n * alpha) / (2 * F)) * ((hbar * c^3 / Xi)**0.25)
# Wenn wir das nach F umstellen, erhalten wir:

basis_term = ((hbar * (c**3)) / Xi)**0.25
zaehler_wurzel = math.sqrt(4 * math.pi * n * alpha)

# F isoliert:
F_exakt = 0.5 * (zaehler_wurzel * basis_term / omega_p_lit)**2

print(f"Ursprünglicher Schätzwert: 1.4")
print(f"Erforderlicher Wert für F:  {F_exakt:.6f}")