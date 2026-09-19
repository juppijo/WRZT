import scipy.constants as const
import numpy as np

m_e = const.m_e
hbar = const.hbar
c = const.c

eta = m_e / 2
R_min = hbar / (2 * m_e * c)
Xi = eta / R_min

# Ausdruck berechnen
term_bracket = eta / (Xi * R_min * np.sqrt(3) * np.sin(np.radians(35.2644)))
mu_0_calculated = term_bracket * (4 * np.pi * 1e-7)

print (mu_0_calculated )
