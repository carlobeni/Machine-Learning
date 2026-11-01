export interface ConfusionMatrixData {
  tn: number;
  fp: number;
  fn: number;
  tp: number;
}

export interface ModelMetric {
  id: string;
  name: string;
  shortName: string;
  family: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  train_accuracy: number;
  confusion_matrix: ConfusionMatrixData;
  hyperparameters: string;
  inference_complexity: string;
  inference_time_ms: number;
  highlight: string;
  notes: string;
}

export interface MetricsPayload {
  test_samples: number;
  train_samples: number;
  models: ModelMetric[];
}

export interface SpectrumPoint {
  k: number;
  sigma_cat: number;
  sigma_dog: number;
  energy_cat: number;
  energy_dog: number;
  var_cat: number;
  var_dog: number;
  ind_var_cat: number;
  ind_var_dog: number;
}

export interface RankSweepPoint {
  r: number;
  test_accuracy: number;
  train_accuracy: number;
  f1_score: number;
}

export interface ReconstructionItem {
  r: number;
  error_pct: number;
  retention_pct: number;
  image: string;
}

export interface SVDParametersPayload {
  matrix_dimensions: {
    features_m: number;
    samples_per_class_n: number;
    total_train: number;
    total_test: number;
  };
  gavish_donoho: {
    beta: number;
    omega_beta: number;
    cat: {
      median_sigma: number;
      tau: number;
      r_opt: number;
      var_at_r_opt: number;
      var_at_r20: number;
    };
    dog: {
      median_sigma: number;
      tau: number;
      r_opt: number;
      var_at_r_opt: number;
      var_at_r20: number;
    };
  };
  selected_rank: number;
  best_test_accuracy: number;
  spectrum: SpectrumPoint[];
  rank_sweep: RankSweepPoint[];
  reconstructions: {
    cat: ReconstructionItem[];
    dog: ReconstructionItem[];
  };
}

export interface FeatureGroup {
  id: string;
  name: string;
  count: number;
  actual_columns_in_csv: number;
  category: string;
  description: string;
  formula: string;
}

export interface LetterboxExample {
  id: string;
  label: string;
  filename: string;
  raw_width: number;
  raw_height: number;
  scale_factor: number;
  scaled_width: number;
  scaled_height: number;
  pad_x: number;
  pad_y: number;
  image_raw: string;
  image_stretched: string;
  image_letterbox: string;
}

export interface DemoSample {
  id: string;
  filename: string;
  true_label: "Gato" | "Perro";
  true_class: number;
  image_processed: string;
  image_raw: string;
  image_stretched: string;
  raw_width: number;
  raw_height: number;
  norm_cat: number;
  norm_dog: number;
  delta_norm: number;
  prob_cat_pct: number;
  prob_dog_pct: number;
  pred_svd: "Gato" | "Perro";
  pred_xgb: "Gato" | "Perro";
  pred_svm: "Gato" | "Perro";
  pred_lr: "Gato" | "Perro";
  aspect_ratio: number;
  fill_ratio: number;
  grad_mean: number;
  laplacian_var: number;
}

export interface DatasetSummaryPayload {
  total_images: number;
  classes: {
    cats: number;
    dogs: number;
  };
  split: {
    train_total: number;
    train_cats: number;
    train_dogs: number;
    test_total: number;
    test_cats: number;
    test_dogs: number;
    test_ratio: number;
    random_state: number;
  };
  canvas_resolution: string;
  total_features: number;
  feature_groups: FeatureGroup[];
  letterbox_examples: LetterboxExample[];
  demo_samples: DemoSample[];
}

