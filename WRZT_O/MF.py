import math

# --- 1. Definierte WRZT- und Konstanten-Werte ---
# Ur-Spannung Xi (N/m bzw. kg/s^2)
Xi = 1.791685e-18

# Minimaler Radius R_min (Compton-Schranke des Elektrons in Metern)
R_min = 3.86159268e-13

# Raumzeit-Trägheit eta (kg), definiert als m_e / 4 (mit m_e approx 9.1093837e-31 kg)
m_e = 9.1093837015e-31
eta = m_e / 4.0

# Präziser Winkel Phi in Grad und Bogenmaß
Phi_deg = 35.264389
Phi_rad = math.radians(Phi_deg)

# Makroskopischer Skalierungsfaktor (Kugelwellen-Projektion)
scaling_factor = 4.0 * math.math.pi * 1e-7 if hasattr(math, 'math') else 4.0 * math.pi * 1e-7

# CODATA-Referenzwert für die magnetische Feldkonstante mu_0 (H/m)
mu_0_codata = 1.256637061436e-6

print("=== WRZT PYTHON-NACHRECHNUNG ===")
print(f"Ur-Spannung (Xi):          {Xi:.12e} N/m")
print(f"Minimaler Radius (R_min):  {R_min:.12e} m")
print(f"Raumzeit-Trägheit (eta):   {eta:.12e} kg")
print(f"Winkel Phi:                {Phi_deg} deg ({Phi_rad:.6f} rad)")
print("-" * 40)

# --- 2. Schritt A: Auflösung der orthogonalen Winkel-Scherung ---
sin_phi = math.sin(Phi_rad)
geom_term = math.sqrt(3.0) * sin_phi

print(f"Schritt A - Geometrie-Term (sqrt(3) * sin(Phi)): {geom_term:.12f}")

# --- 3. Schritt B: Energetischer Netznenner (Xi * R_min) ---
denominator = Xi * R_min * geom_term
print(f"Schritt B - Nenner (Xi * R_min * Geometrie): {denominator:.12e} kg")

# --- 4. Schritt C: Mechanischer Impulszähler (2 * eta) ---
numerator = 2.0 * eta
print(f"Schritt C - Zähler (2 * eta):               {numerator:.12e} kg")

# --- 5. Schritt D & E: Finale Berechnung von mu_0 ---
ratio = numerator / denominator
mu_0_wrzt = ratio * (4.0 * math.pi * 1e-7)
pi_7 = (4.0 * math.pi * 1e-7)
diff = mu_0_wrzt / mu_0_codata

print("-" * 40)
print(f"pi_7:                                        {pi_7:.12f}")
print(f"Trägheits-Verhältnis (Zähler / Nenner):      {ratio:.12f}")
print(f"Berechnetes mu_0 (WRZT):                     {mu_0_wrzt:.14e} H/m")
print(f"CODATA mu_0 (Referenz):                      {mu_0_codata:.14e} H/m")

# --- 6. Prozentuale Übereinstimmung ---
# Abweichung berechnen
deviation_percent = abs(mu_0_wrzt - mu_0_codata) / mu_0_codata * 100
agreement_percent = 100.0 - deviation_percent

print("-" * 40)
print(f"Absolute Abweichung:                       {abs(mu_0_wrzt - mu_0_codata):.14e} H/m")
print(f"Diff:                                      {diff:.12e} ")
print(f"Prozentuale Abweichung:                    {deviation_percent:.5f} %")
print(f"Mathematische Übereinstimmung:             {agreement_percent:.4f} %")
