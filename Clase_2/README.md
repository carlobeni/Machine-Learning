# Clase 2 - Fuentes de Datos, Datasets Clásicos y Repositorios para Proyectos

El éxito de cualquier modelo de **Machine Learning** depende primordialmente de la calidad, cantidad y representatividad de los datos con los que se alimenta (*"Garbage in, garbage out"*). 

En esta clase exploraremos los principales catálogos, repositorios y plataformas de datos abiertos de donde podrán obtener información real para fundamentar, diseñar y validar el **pipeline predictivo** de su proyecto semestral de ingeniería.

---

## 1. Datasets Clásicos de Benchmarking y Estudio
Para validar algoritmos de manera controlada sin requerir procesos prolongados de limpieza o depuración, la comunidad de ciencia de datos recurre a conjuntos experimentales estandarizados:

| Dataset | Tipo de Problema | Dominio | Descripción |
| :--- | :--- | :--- | :--- |
| **[Iris Dataset](https://archive.ics.uci.edu/ml/datasets/iris)** | Clasificación (Tabular) | Botánica | Clasificación de 3 especies de flores en base a 4 medidas físicas del sépalo y pétalo. Es el clásico "Hello World" en modelado estadístico supervisado. |
| **[MNIST](http://yann.lecun.com/exdb/mnist/)** | Clasificación (Imágenes) | Visión / OCR | 70,000 imágenes en blanco y negro (28x28 px) de dígitos numéricos escritos a mano (0 al 9). El estándar introductorio universal para redes neuronales computacionales. |
| **[Boston Housing](https://www.kaggle.com/c/boston-housing)** | Regresión (Tabular) | Bienes Raíces | Predicción de valores de viviendas basada en tasas criminales, cercanía al río, impuestos y zona ocupada. *(Hoy en día frecuentemente reemplazado por **California Housing** por consideraciones modernas)*. |
| **[UCI ML Repository](https://archive.ics.uci.edu/)** | Todos los tipos | Multidisciplinario | El mayor archivo académico universitario de datasets de libre acceso para todo tipo de tareas estadístico-matemáticas de Machine Learning. |

#### Ejemplo rápido: ¿Cómo invocarlos desde Python?
```python
from sklearn import datasets
import pandas as pd

# Cargar dataset Iris clásico en un DataFrame de Pandas
iris = datasets.load_iris()
df_iris = pd.DataFrame(data=iris.data, columns=iris.feature_names)
df_iris['target'] = iris.target

# Cargar alternativa moderna al Boston Housing
housing = datasets.fetch_california_housing()
df_housing = pd.DataFrame(data=housing.data, columns=housing.feature_names)
print("Muestra cargada exitosamente:", df_housing.shape)
```

---

## 2. Repositorios de Imágenes y Visión Artificial (Computer Vision)
Esenciales para aquellos proyectos aplicados a robótica autónoma, inspección de calidad industrial mediante cámaras o clasificación en electrónica embebida:

*   **[Roboflow Universe](https://universe.roboflow.com/):** Plataforma masiva de la comunidad open-source para visión por computador. Cuenta con cientos de miles de conjuntos de imágenes debidamente etiquetados y listos para exportar a arquitecturas populares como YOLO, Fast-RCNN o TensorFlow Lite.
    * *Ejemplos aplicables al curso:* Detección de fallas en soldadura o componentes sobre placas PCB, conteo de piezas en líneas de ensamblaje o lectura automática de medidores de energía.
*   **[MS COCO (Common Objects in Context)](https://cocodataset.org/) & [ImageNet](https://www.image-net.org/):** Colecciones monumentales para detección, segmentación y reconocimiento general en deep learning masivo.
*   **[Kaggle (Búsqueda Visual / Imágenes)](https://www.kaggle.com/datasets?tags=13204-Computer+Vision):** Permite filtrar los catálogos específicamente por el tag de *Computer Vision* para encontrar desde ortografías satelitales térmicas hasta reconocimiento de señas o inspección de defectos mecánicos.

---

## 3. Repositorios de Datos Climáticos y Meteorológicos
Las series temporales atmosféricas representan una excelente área de estudio en ingeniería para la predicción de consumo de redes, generación geotérmica/solar/eólica o alertas hidrometeorológicas:

*   **[Copernicus Climate Data Store (CDS / ECMWF - ERA5)](https://cds.climate.copernicus.eu/):** Infraestructura de la Agencia Espacial Europea que provee reanálisis y pronósticos planetarios históricos hora a hora por longitud y latitud del planeta entero (temperatura, presión, radiación solar, humedad, viento).
*   **[NOAA National Centers for Environmental Information](https://www.ncei.noaa.gov/):** Bases de datos históricas federales norteamericanas sobre clima marítimo, atmosférico, radares precipitacionales y climatología.
*   **[Open-Meteo Historical Weather API](https://open-meteo.com/):** Extraordinaria API gratuita no comercial de archivos climáticos históricos de cualquier punto del mundo al instante. Permite descargar reportes continuados en formato tabular en Python de forma ultrarapida y sin llaves complicadas.

#### Ejemplo ilustrativo con Python e ingesta web de clima en Paraguay:
```python
import requests
import pandas as pd

# Extraer historial térmico y precipitacional de Asunción, Paraguay (Lat: -25.26, Lon: -57.57) del último año disponible via Open-Meteo
url = "https://archive-api.open-meteo.com/v1/archive?latitude=-25.26&longitude=-57.57&start_date=2023-01-01&end_date=2023-12-31&daily=temperature_2m_max,precipitation_sum&timezone=America%2FSao_Paulo"
datos_clima = requests.get(url).json()

df_clima = pd.DataFrame(datos_clima['daily'])
df_clima['time'] = pd.to_datetime(df_clima['time'])
print(df_clima.head(10))
```

---

## 4. Repositorios de Datos Demográficos, Sociales y Económicos
Útiles en la estimación de demanda regional, sociometría urbana, optimización logística y análisis socio-actuariales:

*   **[World Bank Open Data (Banco Mundial)](https://data.worldbank.org/):** Catálogo masivo del desarrollo mundial con tablas descargables por país abordando infraestructura, adopción de internet, educación, generación en GWh e índices económicos.
*   **[IPUMS International](https://ipums.org/):** Repositorio líder a nivel mundial del análisis social que dispone de millones de microdatos armonizados de censos demográficos correspondientes a viviendas, ingresos e individuos.
*   **[Gapminder Open Data](https://www.gapminder.org/data/):** Conjuntos consolidados y altamente limpios sobre esperanza de vida, crecimiento demográfico e indicadores globales adaptables para visualización animada de clustering o tendencias multidimensionales.

---

## 5. Repositorios de Enfermedades y Salud (Healthcare & Biomedicina)
Para estudiantes de Electrónica Médica y ramas biomédicas, la bio-informática y el Machine Learning médico ofrecen un potencial transformador excepcional:

*   **[PhysioNet (MIMIC-III / MIMIC-IV)](https://physionet.org/):** Repositorio cumbre de medicina de cuidados intensivos creado por el MIT y Beth Israel Hospital. Mantiene bases masivas con millones de expedientes hospitalarios completamente anonimizados, abarcando desde señales fisiológicas en crudo (ECG, EEG, saturación), signos vitales horarios y laboratorios, ideal para estimación temprana de riesgo o sepsis en sala. *(Nota: Por normativas HIPAA internacionales de protección a pacientes, la descarga requiere aprobar una sencilla acreditación gratuita sobre ética online)*.
*   **[NIH Chest X-ray Dataset](https://www.nih.gov/news-events/news-releases/nih-clinical-center-provides-one-largest-publicly-available-chest-x-ray-datasets-scientific-community):** Publicación del Centro Clínico NIH que cuenta con más de 100,000 radiografías pulmonares con sus respectivas etiquetas correspondientes a más de una decena de anomalías médicas (efusión pleural, infiltración pulmonar, cardiomegalia, etc.).
*   **[COVID-19 Radiography Database (Kaggle)](https://www.kaggle.com/datasets/tawsifurrahman/covid19-radiography-database):** Banco de radiografías torácicas clasificadas en casos positivos de COVID-19, pulmón normal, opacidades pulmonares y neumonía viral ordinaria.
*   **[Pima Indians Diabetes & UCI Medical Datasets](https://archive.ics.uci.edu/):** Repositorio clásico para predicciones precoces de enfermedades, como el estudio del riesgo metabólico de diabetes tipo 2 a partir de índices de insulina, glucosa en plasma y masa corporal.

---

## 6. Integración Regional: Catálogos y Datos Abiertos de Paraguay (PY)
Para el desarrollo de proyectos de impacto institucional y regional enfocados en problemáticas ingenieriles en territorio paraguayo, existen excelentes fuentes interoperables del Estado paraguayo:

### A. Catálogos Nacionales Recomendados:
1.  **[Portal Central de Datos Abiertos del Gobierno del Paraguay (`www.datos.gov.py`)](https://www.datos.gov.py/):**
    * Plataforma gubernamental integradora del país. Brinda acceso abierto a compras del estado (DNCP), estadísticas de ministerios, becas educativas e inversiones de infraestructura descargables en formatos API o CSV.
2.  **[Instituto Nacional de Estadística de Paraguay (INE)](https://www.ine.gov.py/):**
    * **Encuesta Permanente de Hogares Continua (EPHC):** Excelentes y extensos microdatos poblacionales tabulados referidos al estado laboral, salarios, tenencia de equipos e infraestructura física de las viviendas paraguayas.
    * **Censo Nacional 2022:** Repositorios analíticos definitivos poblacionales y zonales a nivel de departamentos y distritos para proyectar demanda de conectividad, agua y servicios red.
3.  **[Ministerio de Salud Pública y Bienestar Social (MSPBS - Dirección General de Vigilancia de la Salud)](https://dgvs.mspbs.gov.py/):**
    * **Boletines e Historiales Epidemiológicos:** Información de notificaciones, casos confirmados y serotipos circulantes de enfermedades endémicas como **Arbovirosis (Dengue, Chikungunya y Zika)** distribuidas territorialmente. Estos datos son espléndidos para correlacionar factores climáticos (humedad/precipitación) y entrenar modelos predictivos espacio-temporales sobre brotes epidemiológicos en ciudades afectadas.
4.  **[Sector Eléctrico del Paraguay (ANDE / ITAIPU / YACYRETÁ / VME)](https://www.ande.gov.py/):**
    * Permite la obtención de resúmenes o consulta de las series temporales horarias o mensuales sobre **demanda de energía en el Sistema Interconectado Nacional (SIN)** del Paraguay. La estimación de despachos y predicción de consumo a 24/48 horas vista en redes es una de las temáticas electivas estrella para la carrera de Electrónica.
5.  **[Dirección de Meteorología e Hidrología (DMH - DINAC)](https://www.meteorologia.gov.py/):**
    * Mantiene las alertas y niveles fluviométricos periódicos de los ríos Paraguay y Paraná (cruciales para generar alertas predictivas ante estiaje para represas o inundaciones costeras).

---

### B. Mini-Tutorial: Carga y Exploración de un Dataset Abierto en Jupyter
Una vez elegido el repositorio para el proyecto del curso, nuestro paso número uno en el pipeline de la materia (correspondiente al archivo `01_EDA.ipynb`) será adquirir la tabla en crudo y someterla al primer escrutinio exploratorio utilizando **Pandas**:

```python
import pandas as pd
import matplotlib.pyplot as plt

# 1. Carga de datos
# Podemos apuntar directo a un archivo CSV local en tu estructura (ej. 'data/raw/dataset_ephc_py.csv') 
# o a una URL HTTP remota verificable:
ruta_dataset = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/mpg.csv"
df = pd.read_csv(ruta_dataset)

# 2. Exploración General (EDA - Exploratory Data Analysis de la primera fase)
print("--- DIMENSIONES DE LA TABLA (Filas, Columnas) ---")
print(df.shape)

print("\n--- VISUALIZACIÓN DE LAS PRIMERAS 5 FILAS ---")
display(df.head()) # 'display()' muestra una tabla elegante en Jupyter Notebooks

print("\n--- RESUMEN DE VARIABLES Y TIPOS DE DATOS ---")
df.info()

print("\n--- RESUMEN ESTADÍSTICO DE VARIABLES NUMÉRICAS ---")
display(df.describe())

# 3. Diagnóstico elemental del estado del dato (detección de valores nulos o vacíos)
print("\n--- CONTEO DE VALORES NULOS POR VARIABLE ---")
print(df.isnull().sum())

# 4. Gráfica básica preliminar de relaciones (Ej. distribución de la variable objetivo)
plt.figure(figsize=(8, 4))
df['mpg'].hist(bins=25, edgecolor='black', color='#3b82f6')
plt.title("Distribución de Consumo (Variable Objetivo Ejemplo)")
plt.xlabel("Millas por Galón")
plt.ylabel("Frecuencia")
plt.grid(True, alpha=0.3)
plt.show()
```

---

## 🛠️ Lista de Tareas sugerida para esta Clase
1. Explorar los repositorios presentados en este documento para inspirarse en posibles ideas de aplicación ingenierial.
2. Seleccionar tentativamente **un problema y su dataset asociado** aplicable a los lineamientos del curso (series temporales energéticas, robótica de visión, pronósticos médicos epidemiológicos, hidrología en PY, etc.).
3. Ubicar los ficheros de datos descargados sin alterar en el directorio `data/raw/` (recuerden configurar Git para que no suba archivos pesados `.csv` innecesarios modificando su `.gitignore` en caso de que sean mayores a 50MB).
4. Inicializar y verificar las cargas del entorno con `pandas` conectadas en una celda en blanco de nuestro archivo `notebooks/01_EDA.ipynb`.
