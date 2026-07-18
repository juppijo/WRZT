import math

# --- 1. Naturkonstanten und WRZT-Werte ---
n = 8.47e28         # Ladungsträgerdichte Kupfer (m^-3)
alpha = 1 / 137.036  # Feinstrukturkonstante
c = 299792458        # Lichtgeschwindigkeit (m/s)
hbar = 1.0545718e-34 # Reduziertes Plancksches Wirkungsquantum (J s)
Xi = 5.897427e-19   # Deine Ur-Spannung aus dem Manifest (kg/m)

# Unser ursprünglicher Schätzfaktor für die effektive Masse m*
faktor_m_alt = 1.4

# --- 2. Die korrigierte Formel berechnen ---
# Baustein A: Geometrie und Kopplung (mit dem alten Faktor 1.4, d.h. 2 * 1.4 = 2.8)
teil_B = (4 * math.pi * n * alpha)
teil_A = math.sqrt(teil_B / 2.8)

# Baustein B & C kombiniert: vierte Wurzel aus (hbar * c^3 / Xi)
innerer_term = (hbar * (c**3)) / Xi
viertel_wurzel = innerer_term**0.25

# Das Gesamtergebnis für die Plasma-Kreisfrequenz
omega_p_wrzt = teil_A * viertel_wurzel

# --- 3. Vergleich mit der Realität ---
omega_p_lit = 1.6  # Klassischer Literaturwert für Kupfer (rad/s)

# Berechnung, wie groß der Korrekturfaktor im Nenner tatsächlich sein müsste
# Damit omega_p_wrzt exakt gleich omega_p_lit wird
abweichung = omega_p_lit / omega_p_wrzt

print(f"alpha:  {alpha:.7e}")
print(f"teil_B:  {teil_B:.7e}")
print(f"teil_A:  {teil_A:.7e}")
print(f"viertel_wurzel:  {viertel_wurzel:.7e}")


print(f"Berechnete Kreisfrequenz (WRZT):  {omega_p_wrzt:.7e} rad/s")
print(f"Klassischer Literaturwert:        {omega_p_lit:.7e} rad/s")
print(f"Aktuelle Abweichung (Faktor):     {abweichung:.7f}")