# Citrus Vision Dashboard (Streamlit)

Aplicación web analítica e interactiva para clasificar cítricos y comparar los 4 modelos de Machine Learning.

## Características
- Carga de imágenes por *drag & drop* o selección de muestras predefinidas (Naranja, Pomelo, Limón).
- Tarjetas de inferencia simultánea con cálculo de probabilidades de confianza.
- Gráficos comparativos de distribución de probabilidad.
- Pestañas con Matrices de Confusión y visualización de modos propios espaciales SVD (*Eigen-Citrus*).

## Cómo Ejecutar Localmente
```bash
# 1. Instalar requerimientos
pip install -r dashboard/requirements.txt

# 2. Ejecutar con Streamlit
streamlit run dashboard/app.py
```
Acceder en el navegador: **http://localhost:8501**
