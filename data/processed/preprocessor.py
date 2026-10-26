import os
import cv2
import numpy as np
import pandas as pd

def insert_in_black_canvas(image_bgr, target_size=(256, 256)):
    """
    Inserts an arbitrary-sized real image into a black matrix canvas of target_size,
    strictly maintaining the original aspect ratio without distortion (letterbox zero padding).
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

def compute_hog_features(gray_img, cell_size=32, n_bins=8):
    """
    Fast Dalal-Triggs HOG descriptor implemented in vectorized NumPy/OpenCV.
    Captures edge orientations (ears, snout, eyes, contours).
    """
    h, w = gray_img.shape
    gx = cv2.Sobel(gray_img, cv2.CV_32F, 1, 0, ksize=3)
    gy = cv2.Sobel(gray_img, cv2.CV_32F, 0, 1, ksize=3)
    mag, ang = cv2.cartToPolar(gx, gy, angleInDegrees=True)
    ang = ang % 180.0
    
    bin_width = 180.0 / n_bins
    bin_idx = np.floor(ang / bin_width).astype(np.int32) % n_bins
    
    n_cells_y = h // cell_size
    n_cells_x = w // cell_size
    hist_grid = np.zeros((n_cells_y, n_cells_x, n_bins), dtype=np.float32)
    
    for y in range(n_cells_y):
        for x in range(n_cells_x):
            c_mag = mag[y*cell_size:(y+1)*cell_size, x*cell_size:(x+1)*cell_size]
            c_bin = bin_idx[y*cell_size:(y+1)*cell_size, x*cell_size:(x+1)*cell_size]
            for b in range(n_bins):
                hist_grid[y, x, b] = np.sum(c_mag[c_bin == b])
                
    # Normalize across 2x2 blocks
    blocks = []
    for y in range(n_cells_y - 1):
        for x in range(n_cells_x - 1):
            block = hist_grid[y:y+2, x:x+2, :].flatten()
            norm = np.linalg.norm(block) + 1e-6
            blocks.append(block / norm)
            
    if blocks:
        return np.concatenate(blocks)
    return hist_grid.flatten()

def extract_image_features(image_bgr, target_size=(256, 256)):
    """
    Extracts rich, discriminative visual features (HOG shape descriptors, spatial color
    pyramids, texture energy, HSV histograms) from an image letterboxed into a black canvas.
    """
    # If not already target_size, insert into black canvas
    if image_bgr.shape[:2] != target_size:
        canvas_bgr, bbox = insert_in_black_canvas(image_bgr, target_size=target_size)
    else:
        canvas_bgr = image_bgr
        
    canvas_rgb = cv2.cvtColor(canvas_bgr, cv2.COLOR_BGR2RGB)
    canvas_hsv = cv2.cvtColor(canvas_bgr, cv2.COLOR_BGR2HSV)
    canvas_gray = cv2.cvtColor(canvas_bgr, cv2.COLOR_BGR2GRAY)
    
    # 1. Non-black foreground mask
    mask = canvas_gray > 10
    if not np.any(mask):
        mask = np.ones_like(canvas_gray, dtype=bool)
        
    rgb_fg = canvas_rgb[mask]
    hsv_fg = canvas_hsv[mask]
    
    # Global color statistics
    r_m, g_m, b_m = np.mean(rgb_fg, axis=0)
    r_s, g_s, b_s = np.std(rgb_fg, axis=0)
    h_m, s_m, v_m = np.mean(hsv_fg, axis=0)
    h_s, s_s, v_s = np.std(hsv_fg, axis=0)
    
    # Color histograms
    h_hist = cv2.calcHist([canvas_hsv], [0], mask.astype(np.uint8), [12], [0, 180]).flatten()
    s_hist = cv2.calcHist([canvas_hsv], [1], mask.astype(np.uint8), [8], [0, 256]).flatten()
    v_hist = cv2.calcHist([canvas_hsv], [2], mask.astype(np.uint8), [8], [0, 256]).flatten()
    h_hist /= (np.sum(h_hist) + 1e-6)
    s_hist /= (np.sum(s_hist) + 1e-6)
    v_hist /= (np.sum(v_hist) + 1e-6)
    
    # 2. Spatial Quadrants (2x2 grid)
    quad_features = {}
    h_half, w_half = target_size[0] // 2, target_size[1] // 2
    quad_names = ["top_left", "top_right", "bottom_left", "bottom_right"]
    coords = [(0, 0), (0, 1), (1, 0), (1, 1)]
    for name, (r, c) in zip(quad_names, coords):
        q_rgb = canvas_rgb[r*h_half:(r+1)*h_half, c*w_half:(c+1)*w_half]
        q_mask = mask[r*h_half:(r+1)*h_half, c*w_half:(c+1)*w_half]
        if np.any(q_mask):
            q_mean = np.mean(q_rgb[q_mask], axis=0)
            q_std = np.std(q_rgb[q_mask], axis=0)
        else:
            q_mean = [0.0, 0.0, 0.0]
            q_std = [0.0, 0.0, 0.0]
        quad_features[f"{name}_r_mean"] = float(q_mean[0])
        quad_features[f"{name}_g_mean"] = float(q_mean[1])
        quad_features[f"{name}_b_mean"] = float(q_mean[2])
        quad_features[f"{name}_std"] = float(np.mean(q_std))
        
    # 3. Gradients & Texture
    sobel_x = cv2.Sobel(canvas_gray, cv2.CV_64F, 1, 0, ksize=3)
    sobel_y = cv2.Sobel(canvas_gray, cv2.CV_64F, 0, 1, ksize=3)
    grad_mag = np.sqrt(sobel_x**2 + sobel_y**2)
    grad_mean = float(np.mean(grad_mag[mask]))
    grad_std = float(np.std(grad_mag[mask]))
    laplacian_var = float(cv2.Laplacian(canvas_gray, cv2.CV_64F).var())
    
    # 4. Bounding Box & Aspect ratio
    y_idx, x_idx = np.where(mask)
    if len(y_idx) > 0:
        box_h = np.max(y_idx) - np.min(y_idx) + 1
        box_w = np.max(x_idx) - np.min(x_idx) + 1
        aspect_ratio = float(box_w / (box_h + 1e-6))
    else:
        aspect_ratio = 1.0
    fill_ratio = float(np.sum(mask) / (target_size[0] * target_size[1]))
    
    # 5. HOG Shape Descriptor
    gray_128 = cv2.resize(canvas_gray, (128, 128), interpolation=cv2.INTER_AREA)
    hog_feats = compute_hog_features(gray_128, cell_size=32, n_bins=8)
    
    # Build complete tabular feature dictionary
    feature_dict = {
        "r_mean": float(r_m), "g_mean": float(g_m), "b_mean": float(b_m),
        "r_std": float(r_s), "g_std": float(g_s), "b_std": float(b_s),
        "h_mean": float(h_m), "s_mean": float(s_m), "v_mean": float(v_m),
        "h_std": float(h_s), "s_std": float(s_s), "v_std": float(v_s),
        "grad_mean": grad_mean, "grad_std": grad_std,
        "laplacian_var": laplacian_var,
        "aspect_ratio": aspect_ratio, "fill_ratio": fill_ratio
    }
    
    for i in range(12):
        feature_dict[f"h_hist_{i}"] = float(h_hist[i])
    for i in range(8):
        feature_dict[f"s_hist_{i}"] = float(s_hist[i])
        feature_dict[f"v_hist_{i}"] = float(v_hist[i])
        
    feature_dict.update(quad_features)
    
    for i, h_val in enumerate(hog_feats):
        feature_dict[f"hog_{i}"] = float(h_val)
        
    # 6. Flat 64x64 Image for SVD
    img_64 = cv2.resize(canvas_gray, (64, 64), interpolation=cv2.INTER_AREA)
    img_flat = (img_64.astype(np.float32) / 255.0).flatten()
    
    return feature_dict, canvas_rgb, img_flat
