import os
import sys
import json
import joblib
import cv2
import numpy as np
import pandas as pd
from PIL import Image
import streamlit as st
import matplotlib.pyplot as plt
import seaborn as sns

st.set_page_config(
    page_title="🐕 Perros vs 🐱 Gatos - Clasificador ML",
    page_icon="🐾",
    layout="wide",
    initial_sidebar_state="expanded"
)

st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
    html, body, [class*="css"] {
        font-family: 'Outfit', sans-serif;
    }
    .result-badge-cat {
        background: linear-gradient(135deg, #FF6B6B, #EE5253);
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        font-weight: 700;
        font-size: 20px;
        display: inline-block;
        box-shadow: 0 4px 15px rgba(238,82,83,0.4);
    }
    .result-badge-dog {
        background: linear-gradient(135deg, #48DBFB, #0ABDE3);
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        font-weight: 700;
        font-size: 20px;
        display: inline-block;
        box-shadow: 0 4px 15px rgba(10,189,227,0.4);
    }
</style>
""", unsafe_allow_html=True)

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROCESSED_DIR = os.path.join(ROOT_DIR, "data", "processed")
MODELS_DIR = os.path.join(ROOT_DIR, "models")
RAW_DIR = os.path.join(ROOT_DIR, "data", "raw")

sys.path.append(PROCESSED_DIR)
sys.path.append(MODELS_DIR)

import preprocessor
import svd_subspace

@st.cache_resource
def load_all_models():
    le = joblib.load(os.path.join(MODELS_DIR, "label_encoder.joblib"))
    scaler = joblib.load(os.path.join(MODELS_DIR, "scaler.joblib"))
    models = {
        "SVM (Kernel RBF)": joblib.load(os.path.join(MODELS_DIR, "svm_rbf.joblib")),
        "SVD Subespacios (Menor Norma)": joblib.load(os.path.join(MODELS_DIR, "svd_pipeline.joblib")),
        "XGBoost Forest": joblib.load(os.path.join(MODELS_DIR, "xgboost_forest.joblib")),
        "Regresion Logistica": joblib.load(os.path.join(MODELS_DIR, "logistic_regression.joblib"))
    }
    with open(os.path.join(MODELS_DIR, "metrics.json"), "r", encoding="utf-8") as f:
        metrics = json.load(f)
    return le, scaler, models, metrics

le, scaler, models, metrics = load_all_models()

st.sidebar.title("🐾 Navegación")
app_mode = st.sidebar.radio("Ir a:", [
    "🎯 Inferencia & Clasificación",
    "📊 Benchmark de Modelos",
    "🔬 Método SVD de Subespacios (Menor Norma)"
])

st.sidebar.markdown("---")
st.sidebar.markdown("**Arquitectura del Proyecto**")
st.sidebar.markdown("- **Modelos:** SVM RBF, SVD Subespacios, XGBoost, Regresión")
st.sidebar.markdown("- **Preproceso:** Padding en Matriz Negra ($256 \times 256$)")
st.sidebar.markdown("- **Dataset:** 360 imágenes reales de GitHub")

if app_mode == "🎯 Inferencia & Clasificación":
    st.title("🐕 Clasificador Inteligente: Perros vs Gatos 🐱")
    st.markdown("Clasificación de imágenes de animales en tiempo real mediante **SVM, SVD por Menor Norma y XGBoost**.")
    
    col_input, col_pred = st.columns([1, 1], gap="large")
    
    with col_input:
        st.subheader("1. Selección o Carga de Imagen")
        input_source = st.radio(
            "Origen de la imagen:",
            ["Imágenes Preprocesadas (Matriz Negra 256x256)", "Imágenes Crudas (Resolución Variable)", "Subir mi propia imagen"],
            horizontal=False
        )
        
        selected_img_bgr = None
        orig_filename = ""
        
        if input_source == "Imágenes Preprocesadas (Matriz Negra 256x256)":
            animal_choice = st.selectbox("Selecciona categoría:", ["gatos", "perros"])
            sample_dir = os.path.join(PROCESSED_DIR, animal_choice)
            if os.path.exists(sample_dir):
                sample_files = sorted(os.listdir(sample_dir))[:40]
                sample_selected = st.selectbox("Selecciona archivo procesado:", sample_files)
                fpath = os.path.join(sample_dir, sample_selected)
                selected_img_bgr = cv2.imread(fpath)
                orig_filename = sample_selected
        elif input_source == "Imágenes Crudas (Resolución Variable)":
            animal_choice = st.selectbox("Selecciona categoría:", ["gatos", "perros"])
            sample_dir = os.path.join(RAW_DIR, animal_choice)
            if os.path.exists(sample_dir):
                sample_files = sorted(os.listdir(sample_dir))[:40]
                sample_selected = st.selectbox("Selecciona archivo crudo:", sample_files)
                fpath = os.path.join(sample_dir, sample_selected)
                selected_img_bgr = cv2.imread(fpath)
                orig_filename = sample_selected
        else:
            uploaded_file = st.file_uploader("Arrastra o sube una imagen (JPG/PNG):", type=["jpg", "jpeg", "png"])
            if uploaded_file is not None:
                file_bytes = np.asarray(bytearray(uploaded_file.read()), dtype=np.uint8)
                selected_img_bgr = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
                orig_filename = uploaded_file.name
                
        if selected_img_bgr is not None:
            h_orig, w_orig = selected_img_bgr.shape[:2]
            st.info(f"Dimensiones de entrada: **{w_orig} x {h_orig} px** (Aspect Ratio: {w_orig/h_orig:.2f})")
            
            feat_dict, canvas_rgb, img_flat = preprocessor.extract_image_features(selected_img_bgr)
            
            c_orig, c_pad = st.columns(2)
            with c_orig:
                st.caption("Imagen de Entrada")
                st.image(cv2.cvtColor(selected_img_bgr, cv2.COLOR_BGR2RGB), use_container_width=True)
            with c_pad:
                st.caption("Matriz Negra 256x256 (Letterbox Padding)")
                st.image(canvas_rgb, use_container_width=True)
                
    with col_pred:
        st.subheader("2. Predicción de los Modelos")
        if selected_img_bgr is not None:
            model_mode = st.selectbox("Selecciona modelo:", [
                "SVM (Kernel RBF - 80.6% Acc)",
                "SVD Subespacios (Menor Norma - 79.2% Acc)",
                "XGBoost Forest (76.4% Acc)",
                "Regresion Logistica (75.0% Acc)",
                "⚡ Comparar Todos en Tiempo Real"
            ])
            
            feat_vals = np.array(list(feat_dict.values()), dtype=np.float32).reshape(1, -1)
            X_scaled = scaler.transform(feat_vals)
            
            if model_mode == "⚡ Comparar Todos en Tiempo Real":
                st.markdown("#### Comparación de Predicciones:")
                for m_label, m_obj in models.items():
                    pred_idx = m_obj.predict(X_scaled)[0]
                    pred_class = le.inverse_transform([pred_idx])[0]
                    
                    prob_text = ""
                    if hasattr(m_obj, "predict_proba"):
                        probs = m_obj.predict_proba(X_scaled)[0]
                        prob_text = f" (Perro: {probs[1]*100:.1f}% | Gato: {probs[0]*100:.1f}%)"
                        
                    icon = "🐱" if pred_class == "gatos" else "🐕"
                    st.write(f"- **{m_label}:** {icon} **{pred_class.upper()}** {prob_text}")
            else:
                target_m_key = "SVM (Kernel RBF)"
                if "SVD" in model_mode: target_m_key = "SVD Subespacios (Menor Norma)"
                elif "XGBoost" in model_mode: target_m_key = "XGBoost Forest"
                elif "Logistica" in model_mode: target_m_key = "Regresion Logistica"
                
                active_model = models[target_m_key]
                pred_idx = active_model.predict(X_scaled)[0]
                pred_class = le.inverse_transform([pred_idx])[0]
                
                if hasattr(active_model, "predict_proba"):
                    probs = active_model.predict_proba(X_scaled)[0]
                    p_cat = float(probs[0])
                    p_dog = float(probs[1])
                else:
                    p_cat = 1.0 if pred_class == "gatos" else 0.0
                    p_dog = 1.0 if pred_class == "perros" else 0.0
                    
                st.markdown("<br>", unsafe_allow_html=True)
                if pred_class == "gatos":
                    st.markdown(f'<div class="result-badge-cat">🐱 GATO DETECTADO ({p_cat*100:.1f}%)</div>', unsafe_allow_html=True)
                else:
                    st.markdown(f'<div class="result-badge-dog">🐕 PERRO DETECTADO ({p_dog*100:.1f}%)</div>', unsafe_allow_html=True)
                    
                st.markdown("<br>", unsafe_allow_html=True)
                st.markdown("**Nivel de Confianza por Clase:**")
                st.progress(p_cat, text=f"🐱 Probabilidad Gato: {p_cat*100:.1f}%")
                st.progress(p_dog, text=f"🐕 Probabilidad Perro: {p_dog*100:.1f}%")
                
                # If SVD Subespacios, show the residual norms!
                if "SVD" in target_m_key:
                    norms_c, norms_d = active_model.compute_residuals(X_scaled)
                    st.markdown("---")
                    st.markdown("**Normas Residuales del Subespacio SVD (Distancia al Subespacio):**")
                    col_n1, col_n2 = st.columns(2)
                    col_n1.metric("||e_gatos||₂ (Norma Residual)", f"{norms_c[0]:.4f}")
                    col_n2.metric("||e_perros||₂ (Norma Residual)", f"{norms_d[0]:.4f}")
                    if norms_c[0] < norms_d[0]:
                        st.success(f"La imagen está más cerca del subespacio de GATOS (diferencia: {norms_d[0] - norms_c[0]:.4f})")
                    else:
                        st.success(f"La imagen está más cerca del subespacio de PERROS (diferencia: {norms_c[0] - norms_d[0]:.4f})")
        else:
            st.info("Selecciona o sube una imagen a la izquierda para ejecutar la predicción.")

elif app_mode == "📊 Benchmark de Modelos":
    st.title("📊 Rendimiento y Evaluación de Modelos")
    st.markdown("Comparativa de métricas calculadas sobre el **Test Set (72 muestras independientes)**.")
    
    rows = []
    for m_name, vals in metrics.items():
        rows.append({
            "Modelo": m_name,
            "Exactitud (Accuracy)": f"{vals['accuracy']*100:.2f}%",
            "Precisión (Precision)": f"{vals['precision']*100:.2f}%",
            "Sensibilidad (Recall)": f"{vals['recall']*100:.2f}%",
            "F1-Score": f"{vals['f1_score']*100:.2f}%"
        })
    df_metrics = pd.DataFrame(rows)
    st.dataframe(df_metrics, use_container_width=True)
    
    st.markdown("---")
    c1, c2 = st.columns([1, 1])
    
    with c1:
        st.subheader("Matrices de Confusión Comparativas")
        cm_path = os.path.join(MODELS_DIR, "confusion_matrices.png")
        if os.path.exists(cm_path):
            st.image(cm_path, use_container_width=True)
            
    with c2:
        st.subheader("Análisis de Rendimiento")
        st.markdown("""
        - **SVM (RBF Kernel):** Lidera con **80.56% de Exactitud**, construyendo un margen de máxima separación en el espacio de Hilbert inducido.
        - **SVD Subespacios (Menor Norma):** Alcanza **79.17% de Exactitud**, proyectando cada imagen sobre las bases ortogonales de Gatos y Perros y seleccionando la que produce menor residuo.
        - **XGBoost Forest:** Obtiene **76.39% de Exactitud**, combinando árboles aditivos sobre gradientes HOG y canales de color.
        - **Regresión Logística:** Establece una sólida línea base lineal con **75.00% de Exactitud**.
        """)

elif app_mode == "🔬 Método SVD de Subespacios (Menor Norma)":
    st.title("🔬 Clasificación por Subespacios SVD (Menor Norma Residual)")
    
    st.markdown("""
    ### Formulación Matemática del Método de Subespacios SVD
    
    A diferencia de un clasificador lineal tradicional, este método construye dos modelos geométricos independientes:
    
    #### 1. Construcción de las Matrices de Clase
    A partir de los datos de entrenamiento, separamos las muestras en dos matrices:
    $$\mathbf{X}_{gatos} \in \mathbb{R}^{N_{cat} \times D}, \quad \mathbf{X}_{perros} \in \mathbb{R}^{N_{dog} \times D}$$
    
    #### 2. Centrado y Descomposición SVD
    Calculamos la muestra promedio de cada clase $\boldsymbol{\mu}_{cat}$ y $\boldsymbol{\mu}_{dog}$ y descomponemos cada matriz centrada:
    $$(\mathbf{X}_{cat} - \boldsymbol{\mu}_{cat})^T = \mathbf{U}_{cat} \boldsymbol{\Sigma}_{cat} \mathbf{V}_{cat}^T$$
    $$(\mathbf{X}_{perros} - \boldsymbol{\mu}_{dog})^T = \mathbf{U}_{dog} \boldsymbol{\Sigma}_{dog} \mathbf{V}_{dog}^T$$
    
    Las primeras $k$ columnas de $\mathbf{U}_{cat}$ y $\mathbf{U}_{dog}$ forman las **bases ortonormales de los subespacios** de Gatos y Perros (**Eigen-Gatos** y **Eigen-Perros**).
    
    #### 3. Proyección y Reconstrucción de la Muestra de Test $\mathbf{z}$
    Para cualquier vector de prueba $\mathbf{z} \in \mathbb{R}^D$:
    - **Reconstrucción en Subespacio Gatos:**
      $$\hat{\mathbf{z}}_{cat} = \mathbf{U}_{cat}^{(k)} (\mathbf{U}_{cat}^{(k)})^T (\mathbf{z} - \boldsymbol{\mu}_{cat}) + \boldsymbol{\mu}_{cat}$$
    - **Reconstrucción en Subespacio Perros:**
      $$\hat{\mathbf{z}}_{dog} = \mathbf{U}_{dog}^{(k)} (\mathbf{U}_{dog}^{(k)})^T (\mathbf{z} - \boldsymbol{\mu}_{dog}) + \boldsymbol{\mu}_{dog}$$
      
    #### 4. Cálculo de Normas Residuales y Regla de Decisión (Menor Norma)
    Se resta la imagen reconstruida de la imagen original y se calcula la norma euclidiana $L_2$ (error residual):
    $$\|\mathbf{e}_{cat}\|_2 = \|\mathbf{z} - \hat{\mathbf{z}}_{cat}\|_2$$
    $$\|\mathbf{e}_{dog}\|_2 = \|\mathbf{z} - \hat{\mathbf{z}}_{dog}\|_2$$
    
    $$\hat{y} = \arg\min_{c \in \{gatos, perros\}} \|\mathbf{e}_c\|_2$$
    
    La clase asignada es aquella cuyo subespacio reproduce a la muestra con la **menor norma residual (menor error)**.
    """)
    
    st.markdown("---")
    st.subheader("Bases Ortonormales SVD: Eigen-Gatos vs Eigen-Perros")
    eigen_path = os.path.join(MODELS_DIR, "svd_eigen_animals.png")
    if os.path.exists(eigen_path):
        st.image(eigen_path, caption="Bases ortonormales generadas por SVD por clase (Eigen-Gatos arriba, Eigen-Perros abajo)", use_container_width=True)
