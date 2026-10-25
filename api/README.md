# Citrus Vision API (Inferencia REST)

API moderna desarrollada con **FastAPI** para clasificar imágenes de cítricos en tiempo real.

## Endpoints Principales
- `GET /`: Metadatos y lista de modelos soportados.
- `GET /health`: Estado del servicio y modelos en memoria.
- `GET /models`: Métricas de benchmark de cada clasificador.
- `POST /predict?model_name={model}`: Clasifica una imagen enviada por formulario multipart. Opciones de modelo: `regression`, `svm`, `svd`, `xgboost`, `all`.

## Ejecución Local
```bash
# 1. Instalar requerimientos
pip install -r api/requirements.txt

# 2. Iniciar servidor Uvicorn
uvicorn api.app:app --reload --port 8000
```
La documentación interactiva Swagger estará disponible en: **http://127.0.0.1:8000/docs**

## Despliegue con Docker
```bash
docker build -t citrus-api -f api/Dockerfile .
docker run -p 8000:8000 citrus-api
```
