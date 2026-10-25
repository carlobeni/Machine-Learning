import os
import sys
import io
import time
import joblib
import numpy as np
from fastapi import FastAPI, File, UploadFile, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List

# Ruta a models y preprocessor
current_dir = os.path.dirname(os.path.abspath(__file__))
repo_root = os.path.abspath(os.path.join(current_dir, ".."))
sys.path.append(repo_root)

from data.processed.preprocessor import extract_features_from_image

app = FastAPI(
    title="Citrus Vision API - Clasificación de Cítricos",
    description="API REST de inferencia para clasificación multiclase de naranjas, pomelos y limones usando Regresión, SVM, SVD y XGBoost.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar artefactos y modelos en memoria
models_dir = os.path.join(repo_root, "models")
le = joblib.load(os.path.join(models_dir, "label_encoder.joblib"))
scaler = joblib.load(os.path.join(models_dir, "scaler.joblib"))

models = {
    "regression": ("Regresión Logística", joblib.load(os.path.join(models_dir, "logistic_regression.joblib"))),
    "svm": ("SVM Kernel RBF", joblib.load(os.path.join(models_dir, "svm_rbf.joblib"))),
    "svd": ("SVD Pipeline (Eigen-Citrus)", joblib.load(os.path.join(models_dir, "svd_pipeline.joblib"))),
    "xgboost": ("XGBoost Forest", joblib.load(os.path.join(models_dir, "xgboost_forest.joblib")))
}

with open(os.path.join(models_dir, "metrics.json"), "r", encoding="utf-8") as f:
    benchmark_metrics = json.load(f)

@app.get("/")
def home():
    return {
        "project": "Citrus Classification API",
        "author": "Ing. Carlos Benitez - Machine Learning 1 FIUNA",
        "classes": list(le.classes_),
        "available_models": list(models.keys()),
        "docs_url": "/docs"
    }

@app.get("/health")
def healthcheck():
    return {"status": "healthy", "models_loaded": len(models)}

@app.get("/models")
def get_models_info():
    return benchmark_metrics

@app.post("/predict")
async def predict_image(
    file: UploadFile = File(...),
    model_name: str = Query("xgboost", description="Modelo: 'regression', 'svm', 'svd', 'xgboost' o 'all'")
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="El archivo enviado debe ser una imagen (JPG/PNG).")
        
    contents = await file.read()
    try:
        t0 = time.time()
        feat_dict, flat_img = extract_features_from_image(contents)
        feat_vec = np.array(list(feat_dict.values())).reshape(1, -1)
        feat_sc = scaler.transform(feat_vec)
        flat_vec = flat_img.reshape(1, -1)
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Error al procesar la imagen: {str(e)}")
        
    models_to_run = list(models.keys()) if model_name == "all" else [model_name]
    if model_name != "all" and model_name not in models:
        raise HTTPException(status_code=400, detail=f"Modelo '{model_name}' no reconocido. Opciones: {list(models.keys())} o 'all'.")
        
    results = {}
    for m_key in models_to_run:
        m_display, clf = models[m_key]
        X_in = flat_vec if m_key == "svd" else feat_sc
        pred_idx = int(clf.predict(X_in)[0])
        pred_label = le.inverse_transform([pred_idx])[0]
        
        probs_dict = {}
        if hasattr(clf, "predict_proba"):
            probs = clf.predict_proba(X_in)[0]
            probs_dict = {cls_name: float(round(p, 4)) for cls_name, p in zip(le.classes_, probs)}
            
        results[m_key] = {
            "model_name": m_display,
            "prediction": pred_label,
            "class_index": pred_idx,
            "probabilities": probs_dict
        }
        
    elapsed_ms = round((time.time() - t0) * 1000, 2)
    return {
        "filename": file.filename,
        "processing_time_ms": elapsed_ms,
        "results": results if model_name == "all" else results[model_name]
    }
