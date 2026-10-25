import os
import requests

url = "http://127.0.0.1:8000/predict?model_name=all"
sample_img = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data", "raw", "naranjas", "naranja_01.jpg"))

if os.path.exists(sample_img):
    with open(sample_img, "rb") as f:
        files = {"file": ("naranja_01.jpg", f, "image/jpeg")}
        try:
            resp = requests.post(url, files=files)
            print("Status:", resp.status_code)
            print("Response:", resp.json())
        except Exception as e:
            print("Asegúrate de ejecutar 'uvicorn api.app:app' antes de probar el cliente:", e)
else:
    print("Imagen de prueba no encontrada:", sample_img)
