import os
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import datetime

# Crear carpeta de imágenes si no existe
img_dir = r"D:\Materiales de Auxiliar\2. Machine Learning\Clase_2\presentacion\img"
os.makedirs(img_dir, exist_ok=True)

# Configurar estilo general elegante y limpio
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['Inter', 'Arial', 'DejaVu Sans']
plt.rcParams['figure.dpi'] = 150
plt.rcParams['axes.edgecolor'] = '#CCCCCC'
plt.rcParams['axes.linewidth'] = 0.8

# 1. Gráfico: Distribución de Tiempo en Proyectos ML (70% Datos vs 30% Algoritmos)
fig, ax = plt.subplots(figsize=(6, 4))
labels = ['Recolección y Limpieza\nde Datos (Dataset)', 'Ajuste de Modelos\ny Algoritmos', 'Despliegue / Otros']
sizes = [70, 20, 10]
colors = ['#3B82F6', '#10B981', '#F59E0B']
explode = (0.05, 0, 0)
ax.pie(sizes, explode=explode, labels=labels, autopct='%1.0f%%', startangle=140, 
       colors=colors, textprops={'fontsize': 10, 'weight': 'bold', 'color': '#1F2937'})
ax.set_title('Tiempo invertido en el Pipeline de ML', fontsize=12, fontweight='bold', pad=15)
plt.tight_layout()
plt.savefig(os.path.join(img_dir, 'ml_time.png'), transparent=True)
plt.close()

# 2. Gráfico: Dataset Iris (Clasificación Tabular Clásica)
np.random.seed(42)
fig, ax = plt.subplots(figsize=(6, 4.5))
# 3 clusters simulando Iris (Setosa, Versicolour, Virginica)
c1_x = np.random.normal(5.0, 0.35, 50); c1_y = np.random.normal(3.4, 0.3, 50)
c2_x = np.random.normal(5.9, 0.45, 50); c2_y = np.random.normal(2.7, 0.3, 50)
c3_x = np.random.normal(6.5, 0.5, 50);  c3_y = np.random.normal(3.0, 0.35, 50)

ax.scatter(c1_x, c1_y, c='#EF4444', label='Setosa', alpha=0.8, s=50, edgecolors='k', linewidth=0.5)
ax.scatter(c2_x, c2_y, c='#3B82F6', label='Versicolour', alpha=0.8, s=50, edgecolors='k', linewidth=0.5)
ax.scatter(c3_x, c3_y, c='#10B981', label='Virginica', alpha=0.8, s=50, edgecolors='k', linewidth=0.5)
ax.set_title('Iris Dataset - Clasificación por Especies', fontsize=12, fontweight='bold')
ax.set_xlabel('Longitud del Sépalo (cm)', fontsize=10)
ax.set_ylabel('Ancho del Sépalo (cm)', fontsize=10)
ax.legend(frameon=True, facecolor='white', framealpha=0.9)
plt.tight_layout()
plt.savefig(os.path.join(img_dir, 'iris_clustering.png'), transparent=True)
plt.close()

# 3. Gráfico: Computer Vision (Matriz MNIST / Visión Artificial)
fig, axes = plt.subplots(1, 3, figsize=(7.5, 2.5))
np.random.seed(24)
# Simular dígitos estilo MNIST o filtro de bordes
for i, (title, color_map) in enumerate(zip(['Dígito Crudo (28x28)', 'Filtro de Bordes (PCB)', 'Mapa de Características'], ['gray', 'magma', 'viridis'])):
    mat = np.random.rand(14, 14)
    # Crear patrón reconocible
    if i == 0:
        mat[3:11, 6:8] = 0.95; mat[2:4, 5:8] = 0.9; mat[10:12, 4:9] = 0.9
    axes[i].imshow(mat, cmap=color_map, interpolation='nearest')
    axes[i].set_title(title, fontsize=10, fontweight='bold')
    axes[i].axis('off')
plt.tight_layout()
plt.savefig(os.path.join(img_dir, 'computer_vision.png'), transparent=True)
plt.close()

# 4. Gráfico: Series Temporales de Clima en Asunción (Open-Meteo / Copernicus)
fig, ax1 = plt.subplots(figsize=(7, 3.5))
dates = [datetime.date(2025, 1, 1) + datetime.timedelta(days=i) for i in range(365)]
# Simular temperatura con calor en verano y bajada en invierno (julio)
days = np.arange(365)
temp = 25 + 10 * np.cos(2 * np.pi * days / 365) + np.random.normal(0, 2.5, 365)

ax1.plot(dates, temp, color='#E11D48', linewidth=1.2, label='Temp. Máxima (°C)', alpha=0.9)
ax1.set_ylabel('Temperatura (°C)', color='#E11D48', fontweight='bold', fontsize=10)
ax1.tick_params(axis='y', labelcolor='#E11D48')
ax1.xaxis.set_major_formatter(mdates.DateFormatter('%B'))
ax1.set_title('Histórico Climático Asunción - Temperatura Diario (Open-Meteo)', fontsize=11, fontweight='bold')
ax1.grid(True, linestyle='--', alpha=0.5)
plt.xticks(rotation=0, fontsize=9)
plt.tight_layout()
plt.savefig(os.path.join(img_dir, 'clima_asuncion.png'), transparent=True)
plt.close()

# 5. Gráfico: Biomedicina y Electrónica Médica (PhysioNet / MIMIC ECG)
fig, ax = plt.subplots(figsize=(7, 2.8))
t = np.linspace(0, 4, 400)
# Simular onda ECG artificial (P-QRS-T)
ecg = 0.1 * np.sin(2 * np.pi * 1.2 * t) + np.random.normal(0, 0.02, 400)
# Agregar picos R Sharp cada ~1 segundo
for spike_t in [0.5, 1.3, 2.1, 2.9, 3.7]:
    idx = int(spike_t * 100)
    if idx < len(ecg)-5:
        ecg[idx-2] = -0.2
        ecg[idx] = 1.5
        ecg[idx+2] = -0.3
        ecg[idx+10] = 0.35 # Onda T

ax.plot(t, ecg, color='#10B981', linewidth=1.5)
ax.set_title('PhysioNet MIMIC-IV - Monitoreo ECG Cuidados Intensivos (100 Hz)', fontsize=11, fontweight='bold')
ax.set_xlabel('Tiempo (segundos)', fontsize=10)
ax.set_ylabel('Amplitud Normalizada (mV)', fontsize=10)
ax.set_xlim(0, 4)
ax.set_facecolor('#0F172A') # Fondo estilo monitor médico oscuro
ax.grid(True, color='#334155', linestyle='-', alpha=0.5)
plt.tight_layout()
plt.savefig(os.path.join(img_dir, 'ecg_physionet.png'), transparent=False, facecolor='#FFFFFF')
plt.close()

# 6. Gráfico: Demanda Eléctrica SIN Paraguay (ANDE)
fig, ax = plt.subplots(figsize=(7, 3.5))
horas = np.arange(0, 24, 0.5)
# Simular curva de carga horaria en Paraguay (pico siesta 14:00 y pico noche 21:00)
carga_base = 2400
pico_siesta = 1100 * np.exp(-0.15 * (horas - 14.5)**2)
pico_noche = 900 * np.exp(-0.2 * (horas - 20.5)**2)
ruido = np.random.normal(0, 20, len(horas))
demanda = carga_base + pico_siesta + pico_noche + ruido

ax.plot(horas, demanda, color='#2563EB', linewidth=2.5, marker='o', markersize=3, label='Demanda SIN (MW)')
ax.fill_between(horas, demanda, carga_base-200, color='#2563EB', alpha=0.15)
ax.set_title('Curva de Demanda Horaria - Sistema Interconectado Nacional (ANDE)', fontsize=11, fontweight='bold')
ax.set_xlabel('Hora del Día (h)', fontsize=10)
ax.set_ylabel('Demanda Activa (MW)', fontsize=10)
ax.set_xticks(range(0, 25, 2))
ax.set_xticklabels([f'{h:02d}:00' for h in range(0, 25, 2)])
ax.grid(True, linestyle='--', alpha=0.6)
ax.legend(loc='upper left', frameon=True)
plt.tight_layout()
plt.savefig(os.path.join(img_dir, 'ande_demanda.png'), transparent=True)
plt.close()

# 7. Gráfico para Caso de Estudio Final: Correlación Temperatura vs Demanda Eléctrica
fig, ax = plt.subplots(figsize=(6.5, 4.2))
np.random.seed(101)
temps_ej = np.random.uniform(18, 42, 120)
# Demanda crece exponencialmente con temperaturas por encima de los 28 grados
demanda_ej = 2200 + 15 * temps_ej + 2.2 * np.maximum(0, temps_ej - 25)**2.2 + np.random.normal(0, 60, 120)

ax.scatter(temps_ej, demanda_ej, color='#D97706', alpha=0.8, s=45, edgecolors='#78350F', label='Observaciones Horarias')
# Línea de tendencia polinómica
z = np.polyfit(temps_ej, demanda_ej, 2)
p = np.poly1d(z)
x_line = np.linspace(18, 42, 100)
ax.plot(x_line, p(x_line), color='#1E3A8A', linewidth=2.5, linestyle='--', label='Modelo de Regresión (Ajuste)')

ax.set_title('Ejemplo de Caso: Correlación Temperatura vs Demanda Eléctrica SIN', fontsize=11, fontweight='bold')
ax.set_xlabel('Temperatura Ambiente en Asunción (°C)', fontsize=10, fontweight='bold')
ax.set_ylabel('Demanda Eléctrica SIN (MW)', fontsize=10, fontweight='bold')
ax.legend(frameon=True, facecolor='white', loc='upper left')
ax.grid(True, alpha=0.5)
plt.tight_layout()
plt.savefig(os.path.join(img_dir, 'ejemplo_correlacion.png'), transparent=True)
plt.close()

print("Todas las figuras fueron generadas con éxito en:", img_dir)
