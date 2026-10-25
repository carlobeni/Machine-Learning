import os
import sys
import argparse
import joblib
import numpy as np

# Importar preprocesador
current_dir = os.path.dirname(os.path.abspath(__file__))
repo_root = os.path.abspath(os.path.join(current_dir, ".."))
sys.path.append(repo_root)

from data.processed.preprocessor import extract_features_from_image

def main():
    parser = argparse.ArgumentParser(description="Inferencia de Clasificación de Cítricos (Limón, Naranja, Pomelo)")
    parser.add_argument("--image", required=True, help="Ruta de la imagen de prueba (.jpg o .png)")
    parser.add_argument("--model", default="all", choices=["all", "regression", "svm", "svd", "xgboost"],
                        help="Modelo a utilizar para predecir")
    args = parser.parse_args()

    if not os.path.exists(args.image):
        print(f"Error: No existe el archivo {args.image}")
        return

    models_dir = current_dir
    le = joblib.load(os.path.join(models_dir, "label_encoder.joblib"))
    scaler = joblib.load(os.path.join(models_dir, "scaler.joblib"))

    models = {
        "regression": ("Regresión Logística", joblib.load(os.path.join(models_dir, "logistic_regression.joblib"))),
        "svm": ("SVM Kernel RBF", joblib.load(os.path.join(models_dir, "svm_rbf.joblib"))),
        "svd": ("SVD Pipeline (Eigen-Citrus)", joblib.load(os.path.join(models_dir, "svd_pipeline.joblib"))),
        "xgboost": ("XGBoost Forest", joblib.load(os.path.join(models_dir, "xgboost_forest.joblib")))
    }

    feat_dict, flat_img = extract_features_from_image(args.image)
    feat_vec = np.array(list(feat_dict.values())).reshape(1, -1)
    feat_sc = scaler.transform(feat_vec)
    flat_vec = flat_img.reshape(1, -1)

    print(f"\n==================================================")
    print(f"Predicción para: {args.image}")
    print(f"==================================================")

    to_eval = models.keys() if args.model == "all" else [args.model]

    for key in to_eval:
        name, clf = models[key]
        X_in = flat_vec if key == "svd" else feat_sc
        pred_idx = clf.predict(X_in)[0]
        label_pred = le.inverse_transform([pred_idx])[0]
        
        proba_str = ""
        if hasattr(clf, "predict_proba"):
            probs = clf.predict_proba(X_in)[0]
            proba_str = " | Probabilidades: " + ", ".join([f"{cls}: {p:.1%}" for cls, p in zip(le.classes_, probs)])
            
        print(f"[{name.upper()}]: -> {label_pred.upper()}{proba_str}")
    print(f"==================================================\n")

if __name__ == "__main__":
    main()
