# Dataset de Imágenes de Cítricos (Raw Data)

Este directorio contiene las imágenes crudas de alta resolución para la tarea de clasificación multiclase de tres variedades de cítricos:

## Clases y Distribución
- `naranjas/`: 40 imágenes de Naranjas (*Citrus × sinensis*). Fruto esférico de color naranja intenso, cáscara finamente porosa y pulpa anaranjada.
- `pomelos/`: 40 imágenes de Pomelos / Toronjas (*Citrus × paradisi*). Fruto de mayor tamaño, ligeramente achatado en los polos, con tonalidades rosadas/rojizas y pulpa rojo rubí.
- `limones/`: 40 imágenes de Limones (*Citrus × limon*). Fruto ovalado/elipsoidal con ápices prominentes en los extremos (mamelones), de color amarillo brillante y pulpa translúcida.

## Características Técnicas de las Imágenes
- **Formato:** JPEG estándar (.jpg)
- **Resolución:** 224 × 224 píxeles, 3 canales (RGB)
- **Variabilidad:** Incluye frutos enteros en diversas orientaciones y cortes transversales (25%) que exponen el albedo y la pulpa segmentada radialmente.
- **Condiciones:** Iluminación controlada, sombras suaves y ligeras perturbaciones de ruido gaussiano para emular condiciones reales de adquisición industrial en cintas transportadoras.
