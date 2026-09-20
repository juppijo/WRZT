import scipy.constants as const
import numpy as np

hbar = const.hbar
m_e = const.m_e
c = const.c
e = const.e
epsilon_0 = const.epsilon_0

# Exakter Radius R_min
R_min = hbar / (2 * m_e * c)

# Verschiedene Energie-Ausdrücke
E_rest = m_e * c**2
E_quantum = (hbar**2) / (2 * m_e * R_min**2)  # entspricht exakt 2 * m_e * c^2
E_coulomb = (e**2) / (4 * np.pi * epsilon_0 * R_min)

print(f"R_min = {R_min:.13e} m")
print(f"Ruheenergie (m_e * c^2): {E_rest:.13e} J = {E_rest / const.eV:.6f} eV")
print(f"Quanten-/Kinetische Energie (hbar^2 / (2 m_e R_min^2)): {E_quantum:.13e} J = {E_quantum / const.eV:.6f} eV")
print(f"Elektrostatische Energie (e^2 / (4pi eps_0 R_min)): {E_coulomb:.13e} J = {E_coulomb / const.eV:.6f} eV")