import os
import cv2
import numpy as np
import pandas as pd

def insert_in_black_canvas(image_bgr, target_size=(256, 256)):
    """
    Inserts an arbitrary-sized real image into a black matrix canvas of target_size,
    strictly maintaining the original aspect ratio without distortion (letterbox padding).
    """
    h, w = image_bgr.shape[:2]
    target_h, target_w = target_size
    
    scale = min(target_w / w, target_h / h)
    new_w = max(1, int(round(w * scale)))
    new_h = max(1, int(round(h * scale)))
    
    # High-quality interpolation
    interp = cv2.INTER_AREA if scale < 1.0 else cv2.INTER_CUBIC
    resized = cv2.resize(image_bgr, (new_w, new_h), interpolation=interp)
    
    canvas = np.zeros((target_h, target_w, 3), dtype=np.uint8)
    
    # Calculate centering offsets
    y_offset = (target_h - new_h) // 2
    x_offset = (target_w - new_w) // 2
    
    canvas[y_offset:y_offset + new_h, x_offset:x_offset + new_w] = resized
    return canvas, (x_offset, y_offset, new_w, new_h)

def extract_image_features(image_bgr, target_size=(256, 256)):
    """
    Given a raw image of any dimension, letterboxes it into a black canvas and
    extracts color, texture, and statistical features plus a 64x64 flat image representation.
    """
    orig_h, orig_w = image_bgr.shape[:2]
    canvas_bgr, bbox = insert_in_black_canvas(image_bgr, target_size=target_size)
    
    # Convert color spaces
    canvas_rgb = cv2.cvtColor(canvas_bgr, cv2.COLOR_BGR2RGB)
    canvas_hsv = cv2.cvtColor(canvas_bgr, cv2.COLOR_BGR2HSV)
    canvas_gray = cv2.cvtColor(canvas_bgr, cv2.COLOR_BGR2GRAY)
    
    # Mask non-black pixels (the animal region)
    mask = canvas_gray > 5
    if not np.any(mask):
        mask = np.ones_like(canvas_gray, dtype=bool)
        
    rgb_masked = canvas_rgb[mask]
    hsv_masked = canvas_hsv[mask]
    
    # Color statistics
    r_mean, g_mean, b_mean = np.mean(rgb_masked, axis=0)
    r_std, g_std, b_std = np.std(rgb_masked, axis=0)
    
    h_mean, s_mean, v_mean = np.mean(hsv_masked, axis=0)
    h_std, s_std, v_std = np.std(hsv_masked, axis=0)
    
    # Color histograms (8 bins per channel in HSV)
    h_hist = cv2.calcHist([canvas_hsv], [0], mask.astype(np.uint8), [8], [0, 180]).flatten()
    s_hist = cv2.calcHist([canvas_hsv], [1], mask.astype(np.uint8), [8], [0, 256]).flatten()
    v_hist = cv2.calcHist([canvas_hsv], [2], mask.astype(np.uint8), [8], [0, 256]).flatten()
    
    h_hist = h_hist / (np.sum(h_hist) + 1e-6)
    s_hist = s_hist / (np.sum(s_hist) + 1e-6)
    v_hist = v_hist / (np.sum(v_hist) + 1e-6)
    
    # Texture features
    sobel_x = cv2.Sobel(canvas_gray, cv2.CV_64F, 1, 0, ksize=3)
    sobel_y = cv2.Sobel(canvas_gray, cv2.CV_64F, 0, 1, ksize=3)
    grad_mag = np.sqrt(sobel_x**2 + sobel_y**2)
    grad_mean = float(np.mean(grad_mag[mask]))
    grad_std = float(np.std(grad_mag[mask]))
    
    laplacian_var = float(cv2.Laplacian(canvas_gray, cv2.CV_64F).var())
    
    # Aspect ratio and fill ratio
    aspect_ratio = float(orig_w / (orig_h + 1e-6))
    fill_ratio = float(np.sum(mask) / (target_size[0] * target_size[1]))
    
    feature_dict = {
        "r_mean": float(r_mean), "g_mean": float(g_mean), "b_mean": float(b_mean),
        "r_std": float(r_std), "g_std": float(g_std), "b_std": float(b_std),
        "h_mean": float(h_mean), "s_mean": float(s_mean), "v_mean": float(v_mean),
        "h_std": float(h_std), "s_std": float(s_std), "v_std": float(v_std),
        "grad_mean": grad_mean, "grad_std": grad_std,
        "laplacian_var": laplacian_var,
        "aspect_ratio": aspect_ratio, "fill_ratio": fill_ratio
    }
    
    for i in range(8):
        feature_dict[f"h_hist_{i}"] = float(h_hist[i])
        feature_dict[f"s_hist_{i}"] = float(s_hist[i])
        feature_dict[f"v_hist_{i}"] = float(v_hist[i])
        
    # Flat image for SVD (64x64 normalized)
    img_64 = cv2.resize(canvas_gray, (64, 64), interpolation=cv2.INTER_AREA)
    img_flat = (img_64.astype(np.float32) / 255.0).flatten()
    
    return feature_dict, canvas_rgb, img_flat
