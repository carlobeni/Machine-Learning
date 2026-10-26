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

# Custom CSS for modern UI
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
    html, body, [class*="css"] {
        font-family: 'Outfit', sans-serif;
    }
    .metric-card {
        background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px;
        padding: 16px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
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
import preprocessor

@st.cache_resource
def load_all_models():
    le = joblib.load(os.path.join(MODELS_DIR, "label_encoder.joblib"))
    scaler = joblib.load(os.path.join(MODELS_DIR, "scaler.joblib"))
    models = {
        "Regresión Logística": joblib.load(os.path.join(MODELS_DIR, "logistic_regression.joblib")),
        "SVM (RBF)": joblib.load(os.path.join(MODELS_DIR, "svm_rbf.joblib")),
        "SVD + Linear SVC": joblib.load(os.path.join(MODELS_DIR, "svd_pipeline.joblib")),
        "XGBoost Forest": joblib.load(os.path.join(MODELS_DIR, "xgboost_forest.joblib"))
    }
    with open(os.path.join(MODELS_DIR, "metrics.json"), "r", encoding="utf-8") as f:
        metrics = json.load(f)
    return le, scaler, models, metrics

le, scaler, models, metrics = load_all_models()

st.sidebar.title("🐾 Navegación")
app_mode = st.sidebar.radio("Ir a:", [
    "🎯 Inferencia & Clasificación",
    "📊 Benchmark de Modelos",
    "🔬 Preprocesamiento & SVD (Black Matrix)"
])

st.sidebar.markdown("---")
st.sidebar.markdown("**Arquitectura del Proyecto**")
st.sidebar.markdown("- **Modelos:** Regresión, SVM, SVD, XGBoost")
st.sidebar.markdown("- **Preproceso:** Padding en Matriz Negra (Letterbox)")
st.sidebar.markdown("- **Dataset:** Kaggle Dogs vs Cats (GitHub Repository)")

if app_mode == "🎯 Inferencia & Clasificación":
    st.title("🐕 Clasificador Inteligente: Perros vs Gatos 🐱")
    st.markdown("Clasificación de imágenes de animales en tiempo real preservando el aspect ratio original mediante **inserción en matriz negra** (zero-padding).")
    
    col_input, col_pred = st.columns([1, 1], gap="large")
    
    with col_input:
        st.subheader("1. Selección o Carga de Imagen")
        input_source = st.radio("Origen de la imagen:", ["Muestra del Repositorio", "Subir mi propia imagen"], horizontal=True)
        
        selected_img_bgr = None
        orig_filename = ""
        
        if input_source == "Muestra del Repositorio":
            animal_choice = st.selectbox("Selecciona categoría de muestra:", ["gatos", "perros"])
            sample_dir = os.path.join(RAW_DIR, animal_choice)
            if os.path.exists(sample_dir):
                sample_files = sorted(os.listdir(sample_dir))[:25]
                sample_selected = st.selectbox("Selecciona archivo:", sample_files)
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
            st.info(f"Resolución original: **{w_orig} x {h_orig} px** (Aspect Ratio: {w_orig/h_orig:.2f})")
            
            # Show original and letterbox canvas
            feat_dict, canvas_rgb, img_flat = preprocessor.extract_image_features(selected_img_bgr)
            
            c_orig, c_pad = st.columns(2)
            with c_orig:
                st.caption("Imagen Original (Sin distorsión)")
                st.image(cv2.cvtColor(selected_img_bgr, cv2.COLOR_BGR2RGB), use_container_width=True)
            with c_pad:
                st.caption("Matriz Negra 256x256 (Letterbox Padding)")
                st.image(canvas_rgb, use_container_width=True)
                
    with col_pred:
        st.subheader("2. Predicción de los Modelos")
        if selected_img_bgr is not None:
            model_mode = st.selectbox("Selecciona modelo:", [
                "XGBoost Forest (Mejor Desempeño)",
                "SVM (RBF Kernel)",
                "SVD + Linear SVC (Eigen-Animals)",
                "Regresión Logística",
                "⚡ Comparar Todos en Tiempo Real"
            ])
            
            feat_vals = np.array(list(feat_dict.values()), dtype=np.float32).reshape(1, -1)
            X_scaled = scaler.transform(feat_vals)
            X_flat_eval = np.expand_dims(img_flat, axis=0)
            
            if model_mode == "⚡ Comparar Todos en Tiempo Real":
                st.markdown("#### Comparación de Predicciones:")
                for m_label, m_obj in models.items():
                    X_input = X_flat_eval if "SVD" in m_label else X_scaled
                    pred_idx = m_obj.predict(X_input)[0]
                    pred_class = le.inverse_transform([pred_idx])[0]
                    
                    prob_text = ""
                    if hasattr(m_obj, "predict_proba"):
                        probs = m_obj.predict_proba(X_input)[0]
                        prob_text = f" (Perro: {probs[1]*100:.1f}% | Gato: {probs[0]*100:.1f}%)"
                        
                    icon = "🐱" if pred_class == "gatos" else "🐕"
                    st.write(f"- **{m_label}:** {icon} **{pred_class.upper()}** {prob_text}")
            else:
                target_m_key = "XGBoost Forest"
                if "SVM" in model_mode: target_m_key = "SVM (RBF)"
                elif "SVD" in model_mode: target_m_key = "SVD + Linear SVC"
                elif "Logística" in model_mode: target_m_key = "Regresión Logística"
                
                active_model = models[target_m_key]
                X_input = X_flat_eval if "SVD" in target_m_key else X_scaled
                
                pred_idx = active_model.predict(X_input)[0]
                pred_class = le.inverse_transform([pred_idx])[0]
                
                if hasattr(active_model, "predict_proba"):
                    probs = active_model.predict_proba(X_input)[0]
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
                
                # Top extracted features
                st.markdown("---")
                st.markdown("**Características Extraídas:**")
                f1, f2, f3 = st.columns(3)
                f1.metric("Brillo Promedio (V)", f"{feat_dict['v_mean']:.1f}")
                f2.metric("Gradiente Sobel (Textura)", f"{feat_dict['grad_mean']:.1f}")
                f3.metric("Definición Laplaciana", f"{feat_dict['laplacian_var']:.1f}")
        else:
            st.info("Selecciona o sube una imagen a la izquierda para ejecutar la predicción.")

elif app_mode == "📊 Benchmark de Modelos":
    st.title("📊 Rendimiento y Evaluación de Modelos")
    st.markdown("Comparativa de métricas calculadas sobre el **Test Set (20% de muestras independientes)**.")
    
    # Metrics table
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
        st.subheader("Análisis de Resultados")
        st.markdown("""
        - **XGBoost Forest:** Logra el rendimiento más alto (**66.7% Accuracy / 65.7% F1**), aprovechando de manera no lineal las correlaciones entre histogramas HSV y gradientes de pelaje.
        - **SVM (RBF):** Obtiene **62.5% Accuracy**, separando eficazmente mediante un hiperplano en espacio de Hilbert inducido por kernel radial.
        - **SVD + Linear SVC:** Opera directamente sobre la matriz de 4096 píxeles mediante descomposición en valores singulares, capturando la silueta espacial de la cabeza/orejas.
        - **Regresión Logística:** Establece una línea base lineal con **58.3% Accuracy**.
        """)

elif app_mode == "🔬 Preprocesamiento & SVD (Black Matrix)":
    st.title("🔬 Pipeline Técnico: Matriz Negra & Eigen-Animals")
    
    st.markdown("""
    ### 1. Inserción en Matriz Negra (Zero-Padding Proporcional)
    En visión artificial tradicional, redimensionar directamente una imagen con `cv2.resize(img, (256, 256))` 
    distorsiona la relación de aspecto (un perro de cuerpo alargado o un gato con orejas puntiagudas se achata o deforma).
    
    Para evitar esto, implementamos:
    1. **Cálculo de Escala Proporcional:** $s = \min(256 / W, 256 / H)$.
    2. **Redimensionado Proporcional:** $(W_{new}, H_{new}) = (round(W \cdot s), round(H \cdot s))$.
    3. **Canvas de Ceros (Negro):** Matriz de $256 	imes 256 	imes 3$ rellena con ceros.
    4. **Centrado Exacto:** Inserción en $(y_{offset}, x_{offset}) = ((256 - H_{new})/2, (256 - W_{new})/2)$.
    """)
    
    st.markdown("---")
    st.subheader("2. Descomposición en Valores Singulares (SVD: Eigen-Animals)")
    st.markdown("""
    Al proyectar las imágenes normalizadas $X \in \mathbb{R}^{n 	imes 4096}$ mediante SVD:
    $$X = U \Sigma V^T$$
    Los vectores de $V^T$ representan las componentes principales o **Eigen-Animals**. 
    Cada imagen de perro o gato se descompone como una combinación lineal de estas matrices fundamentales:
    """)
    
    eigen_path = os.path.join(MODELS_DIR, "svd_eigen_animals.png")
    if os.path.exists(eigen_path):
        st.image(eigen_path, caption="Top 8 Vectores Singulares (Eigen-Animals) calculados por TruncatedSVD", use_container_width=True)
