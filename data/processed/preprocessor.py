import cv2
import numpy as np
import pandas as pd

def extract_features_from_image(image_input):
    """
    Extrae el vector de características de 40 dimensiones (color HSV/RGB,
    momentos estadísticos y morfología) y la miniatura 64x64 para SVD.
    
    Args:
        image_input: Ruta de archivo (str), buffer de bytes o array numpy BGR/RGB.
        
    Returns:
        tuple: (dict_features, flat_image_for_svd)
    """
    if isinstance(image_input, str):
        img_bgr = cv2.imread(image_input)
    elif isinstance(image_input, bytes):
        nparr = np.frombuffer(image_input, np.uint8)
        img_bgr = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    elif isinstance(image_input, np.ndarray):
        img_bgr = image_input if len(image_input.shape) == 3 else cv2.cvtColor(image_input, cv2.COLOR_GRAY2BGR)
    else:
        raise ValueError("Formato de entrada no soportado.")
        
    if img_bgr is None:
        raise ValueError("No se pudo decodificar la imagen.")
        
    img_bgr = cv2.resize(img_bgr, (224, 224))
    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
    img_hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
    img_gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
    
    # 1. Momentos RGB
    r_mean, g_mean, b_mean = img_rgb[:, :, 0].mean(), img_rgb[:, :, 1].mean(), img_rgb[:, :, 2].mean()
    r_std, g_std, b_std = img_rgb[:, :, 0].std(), img_rgb[:, :, 1].std(), img_rgb[:, :, 2].std()
    
    # 2. Momentos HSV
    h_mean, s_mean, v_mean = img_hsv[:, :, 0].mean(), img_hsv[:, :, 1].mean(), img_hsv[:, :, 2].mean()
    h_std, s_std, v_std = img_hsv[:, :, 0].std(), img_hsv[:, :, 1].std(), img_hsv[:, :, 2].std()
    
    # 3. Histogramas HSV normalizados
    h_hist = cv2.calcHist([img_hsv], [0], None, [16], [0, 180]).flatten()
    h_hist /= (h_hist.sum() + 1e-6)
    
    s_hist = cv2.calcHist([img_hsv], [1], None, [8], [0, 256]).flatten()
    s_hist /= (s_hist.sum() + 1e-6)
    
    # 4. Morfología
    mask = (img_gray < 225).astype(np.uint8) * 255
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if contours:
        c = max(contours, key=cv2.contourArea)
        area = cv2.contourArea(c)
        perimeter = cv2.arcLength(c, True)
        x, y, w, h = cv2.boundingRect(c)
        aspect_ratio = float(w) / h if h > 0 else 1.0
        circularity = 4 * np.pi * area / (perimeter ** 2 + 1e-6)
    else:
        aspect_ratio, circularity, area = 1.0, 1.0, 1000.0
        
    feat = {
        'r_mean': r_mean, 'g_mean': g_mean, 'b_mean': b_mean,
        'r_std': r_std, 'g_std': g_std, 'b_std': b_std,
        'h_mean': h_mean, 's_mean': s_mean, 'v_mean': v_mean,
        'h_std': h_std, 's_std': s_std, 'v_std': v_std,
        'aspect_ratio': aspect_ratio,
        'circularity': circularity,
        'area': area
    }
    
    for i, val in enumerate(h_hist):
        feat[f'h_bin_{i}'] = val
    for i, val in enumerate(s_hist):
        feat[f's_bin_{i}'] = val
        
    # Representación 64x64 aplanada para SVD
    thumb_gray = cv2.resize(img_gray, (64, 64))
    flat_svd = thumb_gray.flatten() / 255.0
    
    return feat, flat_svd
