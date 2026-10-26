import os
import sys
import argparse
import joblib
import cv2
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROCESSED_DIR = os.path.join(BASE_DIR, "data", "processed")
MODELS_DIR = os.path.join(BASE_DIR, "models")
sys.path.append(PROCESSED_DIR)

import preprocessor

def load_resources():
    le = joblib.load(os.path.join(MODELS_DIR, "label_encoder.joblib"))
    scaler = joblib.load(os.path.join(MODELS_DIR, "scaler.joblib"))
    models = {
        "lr": joblib.load(os.path.join(MODELS_DIR, "logistic_regression.joblib")),
        "svm": joblib.load(os.path.join(MODELS_DIR, "svm_rbf.joblib")),
        "svd": joblib.load(os.path.join(MODELS_DIR, "svd_pipeline.joblib")),
        "xgb": joblib.load(os.path.join(MODELS_DIR, "xgboost_forest.joblib"))
    }
    return le, scaler, models

def predict_image(image_path, model_type="xgb"):
    le, scaler, models = load_resources()
    img_bgr = cv2.imread(image_path)
    if img_bgr is None:
        raise ValueError(f"No se pudo cargar la imagen desde: {image_path}")
        
    feat_dict, canvas_rgb, img_flat = preprocessor.extract_image_features(img_bgr)
    
    if model_type == "svd":
        model = models["svd"]
        X = np.expand_dims(img_flat, axis=0)
    else:
        model = models.get(model_type, models["xgb"])
        feat_vals = np.array(list(feat_dict.values()), dtype=np.float32).reshape(1, -1)
        X = scaler.transform(feat_vals)
        
    pred_idx = model.predict(X)[0]
    pred_label = le.inverse_transform([pred_idx])[0]
    
    probas = None
    if hasattr(model, "predict_proba"):
        probas = model.predict_proba(X)[0]
        prob_dict = {label: float(probas[i]) for i, label in enumerate(le.classes_)}
    else:
        prob_dict = {pred_label: 1.0}
        
    return pred_label, prob_dict

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Clasificador de Perros y Gatos")
    parser.add_argument("--image", required=True, help="Ruta de la imagen de prueba")
    parser.add_argument("--model", default="xgb", choices=["lr", "svm", "svd", "xgb"], help="Modelo a utilizar")
    args = parser.parse_args()
    
    label, probs = predict_image(args.image, args.model)
    print(f"\n[RESULTADO] Predicción: {label.upper()}")
    print("Probabilidades por clase:")
    for cls_name, prob in probs.items():
        print(f"  - {cls_name}: {prob*100:.2f}%")
