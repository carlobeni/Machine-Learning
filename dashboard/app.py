import os
import sys
import json
import joblib
import numpy as np
import pandas as pd
from PIL import Image
import matplotlib.pyplot as plt
import seaborn as sns
import streamlit as st

# Rutas
current_dir = os.path.dirname(os.path.abspath(__file__))
repo_root = os.path.abspath(os.path.join(current_dir, ".."))
sys.path.append(repo_root)

from data.processed.preprocessor import extract_features_from_image

st.set_page_config(
    page_title="Citrus Classifier AI Dashboard",
    page_icon="🍊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Estilos CSS modernos
st.markdown("""
<style>
    .main-title { font-size: 2.3rem; font-weight: 800; color: #f97316; margin-bottom: 0.2rem; }
    .sub-title { font-size: 1.1rem; color: #64748b; margin-bottom: 1.5rem; }
    .card { background-color: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; }
    .stMetric { background: #ffffff; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; }
</style>
""", unsafe_allow_html=True)

# Cargar artefactos
models_dir = os.path.join(repo_root, "models")
le = joblib.load(os.path.join(models_dir, "label_encoder.joblib"))
scaler = joblib.load(os.path.join(models_dir, "scaler.joblib"))

models = {
    "XGBoost Forest": joblib.load(os.path.join(models_dir, "xgboost_forest.joblib")),
    "SVM (Kernel RBF)": joblib.load(os.path.join(models_dir, "svm_rbf.joblib")),
    "Regresión Logística": joblib.load(os.path.join(models_dir, "logistic_regression.joblib")),
    "SVD (Eigen-Citrus)": joblib.load(os.path.join(models_dir, "svd_pipeline.joblib"))
}

with open(os.path.join(models_dir, "metrics.json"), "r", encoding="utf-8") as f:
    metrics_data = json.load(f)

# Sidebar
st.sidebar.image("https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&q=80", use_container_width=True)
st.sidebar.markdown("### 🍊 Clasificador de Cítricos")
st.sidebar.markdown("**Machine Learning 1 - FIUNA**")
st.sidebar.markdown("Variedades: **Naranja**, **Pomelo**, **Limón**")

option = st.sidebar.radio("Fuente de Imagen:", ["Muestras Predefinidas", "Subir Imagen Propia"])

sample_images = {
    "Naranja (Muestra 01)": os.path.join(repo_root, "data", "raw", "naranjas", "naranja_01.jpg"),
    "Pomelo (Muestra 01)": os.path.join(repo_root, "data", "raw", "pomelos", "pomelo_01.jpg"),
    "Limón (Muestra 01)": os.path.join(repo_root, "data", "raw", "limones", "limon_01.jpg"),
    "Naranja Corte (Muestra 05)": os.path.join(repo_root, "data", "raw", "naranjas", "naranja_05.jpg"),
    "Pomelo Corte (Muestra 05)": os.path.join(repo_root, "data", "raw", "pomelos", "pomelo_05.jpg")
}

image_bytes = None
image_display = None

if option == "Muestras Predefinidas":
    selected_sample = st.sidebar.selectbox("Seleccione una muestra:", list(sample_images.keys()))
    sample_path = sample_images[selected_sample]
    if os.path.exists(sample_path):
        with open(sample_path, "rb") as f:
            image_bytes = f.read()
        image_display = Image.open(sample_path)
else:
    uploaded_file = st.sidebar.file_uploader("Suba una imagen JPG/PNG", type=["jpg", "jpeg", "png"])
    if uploaded_file is not None:
        image_bytes = uploaded_file.read()
        image_display = Image.open(uploaded_file)

# Pantalla Principal
st.markdown('<div class="main-title">🍊 Sistema Inteligente de Clasificación Citrícola</div>', unsafe_allow_html=True)
st.markdown('<div class="sub-title">Comparación en tiempo real de 4 arquitecturas de ML: Regresión Logística, SVM, SVD (Eigen-Citrus) y XGBoost Forest</div>', unsafe_allow_html=True)

tabs = st.tabs(["🚀 Inferencia y Diagnóstico", "📊 Benchmark y Métricas", "🔬 Descomposición SVD"])

with tabs[0]:
    if image_bytes is not None and image_display is not None:
        col_img, col_preds = st.columns([1, 2])
        
        with col_img:
            st.image(image_display, caption="Imagen para Inferencia", use_container_width=True)
            feat_dict, flat_img = extract_features_from_image(image_bytes)
            st.markdown(f"**Relación de Aspecto:** `{feat_dict['aspect_ratio']:.2f}`")
            st.markdown(f"**Circularidad:** `{feat_dict['circularity']:.2f}`")
            st.markdown(f"**Tono Medio (Hue):** `{feat_dict['h_mean']:.1f}°`")
            
        with col_preds:
            st.markdown("### 🏆 Predicciones por Modelo")
            feat_vec = np.array(list(feat_dict.values())).reshape(1, -1)
            feat_sc = scaler.transform(feat_vec)
            flat_vec = flat_img.reshape(1, -1)
            
            pred_records = []
            cols_m = st.columns(4)
            
            for i, (m_name, clf) in enumerate(models.items()):
                X_in = flat_vec if "SVD" in m_name else feat_sc
                p_idx = clf.predict(X_in)[0]
                label_p = le.inverse_transform([p_idx])[0]
                
                probs = clf.predict_proba(X_in)[0] if hasattr(clf, "predict_proba") else [0.33, 0.33, 0.33]
                conf = float(np.max(probs))
                
                with cols_m[i]:
                    badge_color = "#10b981" if conf > 0.8 else "#f59e0b"
                    st.metric(label=m_name, value=label_p.upper(), delta=f"{conf:.1%} conf")
                    
                for cls_name, prob_val in zip(le.classes_, probs):
                    pred_records.append({
                        "Modelo": m_name,
                        "Clase": cls_name.capitalize(),
                        "Probabilidad": prob_val
                    })
                    
            st.markdown("---")
            st.markdown("#### Distribución de Probabilidades Comparada")
            df_plot = pd.DataFrame(pred_records)
            fig, ax = plt.subplots(figsize=(10, 4))
            sns.barplot(data=df_plot, x="Probabilidad", y="Clase", hue="Modelo", palette="tab10", ax=ax)
            ax.set_xlim(0, 1.0)
            ax.set_xlabel("Confianza Predicha")
            st.pyplot(fig)
            plt.close()
    else:
        st.info("👈 Seleccione una muestra del panel lateral o cargue una imagen para ver la clasificación.")

with tabs[1]:
    st.markdown("### 📈 Comparativa de Desempeño en Test")
    bench_list = []
    for k, v in metrics_data["models"].items():
        bench_list.append({
            "Modelo": k,
            "Accuracy": f"{v['accuracy']:.2%}",
            "F1-Score": f"{v['f1_score']:.3f}",
            "Latencia Inferencia": f"{v['inference_latency_ms']:.2f} ms",
            "Tiempo Fit": f"{v['fit_time_seconds']:.3f} s"
        })
    st.table(pd.DataFrame(bench_list))
    
    cm_path = os.path.join(models_dir, "confusion_matrices.png")
    if os.path.exists(cm_path):
        st.image(cm_path, caption="Matrices de Confusión de los 4 Modelos", use_container_width=True)

with tabs[2]:
    st.markdown("### 🔬 Representación Propia: Eigen-Citrus (Singular Value Decomposition)")
    st.markdown("""
    La descomposición **SVD** proyecta imágenes completas de 64×64 píxeles sobre los autovectores espaciales principales de máxima covarianza.
    A continuación se aprecian los primeros modos característicos (*Eigen-Citrus*) aprendidos por la descomposición:
    """)
    svd_img = os.path.join(models_dir, "svd_eigen_citrus.png")
    if os.path.exists(svd_img):
        st.image(svd_img, caption="Modos Singulares Espaciales (Eigen-Citrus)", use_container_width=True)
