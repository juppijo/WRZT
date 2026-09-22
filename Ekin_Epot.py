import scipy.constants as const

# Naturkonstanten aus SciPy (NIST-Werte)
hbar = const.hbar  # Reduziertes Plancksches Wirkungsquantum (J s)
h = const.h        # Plancksches Wirkungsquantum (J s)
m_e = const.m_e    # Elektronenmasse (kg)
c = const.c        # Lichtgeschwindigkeit (m/s)
e = const.e        # Elementarladung (C, für Umrechnung in eV)

# 1. R_min Berechnung
R_min = hbar / (2 * m_e * c)

# 2. Kinetische Energie: E_kin = p^2 / (2 * m_e) mit p = hbar / R_min
p = hbar / R_min
E_kin_J = (p**2) / (2 * m_e)
E_kin_eV = E_kin_J / e
E_kin_MeV = E_kin_eV / 1e6

# 3. Potentielle / Wellen-Energie über die Wellenlänge lambda
# Aus dem HTML-Dokument: lambda_c = 4 * pi * R_min (volle Compton-Wellenlänge)
# oder reduzierte Wellenlänge lambda_bar = 2 * R_min
lambda_c = 4 * const.pi * R_min
lambda_bar = 2 * R_min

# Potentielle Wellen-Energie:
# E_pot (über volle Wellenlänge lambda_c) = h * c / lambda_c
E_pot_lambda_J = (h * c) / lambda_c
E_pot_lambda_MeV = (E_pot_lambda_J / e) / 1e6

# E_pot (über reduzierte Wellenlänge lambda_bar) = hbar * c / lambda_bar
E_pot_bar_J = (hbar * c) / lambda_bar
E_pot_bar_MeV = (E_pot_bar_J / e) / 1e6

# E_pot (direkt über R_min als charakteristische Wellenlänge lambda_bar = R_min)
E_pot_Rmin_J = (hbar * c) / R_min
E_pot_Rmin_MeV = (E_pot_Rmin_J / e) / 1e6

# Ruheenergie der 2-fachen Elektronenmasse: 2 * m_e * c^2
E_ref_J = 2 * m_e * (c**2)
E_ref_MeV = (E_ref_J / e) / 1e6

print(f"R_min = {R_min:.6e} m")
print(f"Referenz 2*m_e*c^2 = {E_ref_MeV:.6f} MeV ({E_ref_J:.6e} J)")
print(f"E_kin = {E_kin_MeV:.6f} MeV")
print(f"E_pot (lambda = R_min) = {E_pot_Rmin_MeV:.6f} MeV")
print(f"E_pot (reduziert lambda_bar = 2*R_min) = {E_pot_bar_MeV:.6f} MeV")
print(f"E_pot (voll lambda_c = 4*pi*R_min) = {E_pot_lambda_MeV:.6f} MeV")