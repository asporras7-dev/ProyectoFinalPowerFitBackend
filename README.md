# PowerFit - Guía Fitness con Inteligencia Artificial

PowerFit es una plataforma web integral diseñada para guiar a los usuarios en un verdadero cambio físico. Combina la automatización de rutinas personalizadas basadas en evidencia científica mediante Inteligencia Artificial con una red social segura donde la comunidad puede compartir experiencias, progresos y testimonios.

## 🚀 Características Principales

* **Entrenador de IA Personalizado:** Generación de rutinas dinámicas y recomendaciones según datos antropométricos y objetivos específicos del usuario.
* **Comunidad Fitness Segura:** Módulo de publicaciones, comentarios, likes y reportes para asegurar un ecosistema constructivo y de apoyo.
* **Monitoreo de Métricas:** Registro detallado de datos físicos, alergias, planes semanales, objetivos de peso y déficit calórico estimado.

## 🛠️ Tecnologías Utilizadas

* **Backend:** Node.js (con Express)
* **Frontend:** React.js
* **Base de Datos:** Relacional (SQL, administrada mediante llaves foráneas y tablas intermedias)
* **IA Integrada:** Modelos conversacionales para asesoría en rutinas y nutrición.

## 🔧 Instalación y Ejecución

### Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión LTS recomendada) y un gestor de paquetes (npm instalado por defecto).

### Pasos para la Configuración

1.  Clona el repositorio en tu máquina local.
2.  Instala las dependencias del proyecto ejecutando el siguiente comando en la raíz:
    ```bash
    npm install
    ```
3.  Configura los archivos de entorno siguiendo la guía que se presenta a continuación.

### Comandos de Ejecución

* **Servidor Backend:**
    ```bash
    node src/app.js
    ```
* **Cliente Frontend:**
    ```bash
    npm run dev
    ```

## 🔐 Variables de Envío Requeridas

El backend requiere la creación de archivos de configuración ambiental en la raíz del proyecto para proteger credenciales sensibles. Crea los siguientes archivos utilizando estas plantillas:

### Archivo `.env` (Configuración del Servidor y Base de Datos)

```env
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=powerfit_db
JWT_SECRET=tu_clave_secreta_jwt
```

### Archivo `Chatbot.env` (Credenciales de Inteligencia Artificial)

```env
GROQ_API_KEY=tu_api_key_aqui
PORT=3000
```

## 🗺️ Arquitectura y Modelo de Datos

### 📁 Estructura del Proyecto (Carpetas y Archivos)

```text
Proyecto-final-Frontend/
├── Backend/                    # Servidor de API (Node.js & Express)
│   ├── src/                    # Código fuente del Backend
│   │   ├── config/             # Configuración de base de datos y Sequelize
│   │   ├── controllers/        # Controladores que manejan la lógica de negocio de los endpoints
│   │   ├── middlewares/        # Middlewares de Express (Autenticación, Validación, etc.)
│   │   ├── migrations/         # Migraciones de la base de datos con Sequelize
│   │   ├── models/             # Modelos relacionales de Sequelize (Usuario, Perfil, Rutina, etc.)
│   │   ├── routes/             # Definición de rutas y endpoints de la API
│   │   ├── app.js              # Inicialización y configuración de Express
│   │   └── index.js            # Punto de entrada principal para levantar el servidor
│   ├── tests/                  # Pruebas automatizadas del backend
│   └── package.json            # Dependencias y scripts del Backend
├── Front-End/                  # Aplicación de Cliente (React & Vite)
│   ├── public/                 # Recursos públicos estáticos (imágenes, iconos, etc.)
│   ├── src/                    # Código fuente de React
│   │   ├── components/         # Componentes reutilizables de la interfaz de usuario
│   │   ├── context/            # Contextos globales de React (Autenticación, estado global, etc.)
│   │   ├── Pages/              # Vistas principales de la aplicación (Home, Login, Dashboard, etc.)
│   │   ├── Routes/             # Configuración de enrutamiento del lado del cliente
│   │   ├── Services/           # Servicios de cliente API (Peticiones con axios o fetch al backend)
│   │   ├── Styles/             # Hojas de estilo y diseño visual (Vanilla CSS)
│   │   ├── App.jsx             # Componente raíz de React
│   │   └── main.jsx            # Punto de entrada del cliente (montaje de la aplicación)
│   ├── index.html              # Archivo HTML plantilla principal de Vite
│   ├── vite.config.js          # Configuración del empaquetador Vite
│   └── package.json            # Dependencias y scripts del Frontend
├── README.md                   # Documentación principal del proyecto
└── Skill.md                    # Archivo de habilidades o especificaciones
```

### 🗄️ Modelo de Datos y Esquema Relacional

El backend implementa un patrón de diseño desacoplado (capas separadas para Rutas, Controladores y Modelos). El almacenamiento de persistencia sigue una estructura relacional óptima basada en el siguiente esquema relacional:


| Módulo Core | Tablas Relacionadas | Descripción de Relación |
| :--- | :--- | :--- |
| **Usuarios y Perfiles** | Usuario, Perfil, Rol, Perfil\_has\_Perfil | Un usuario posee un rol único, un perfil extendido y capacidades de seguimiento mutuo (followers). |
| **Métricas Físicas** | datos\_Usuario, Alergias, datos\_Usuario\_Alergias | Relación de muchos a muchos para mapear alergias alimenticias y condiciones a las métricas del usuario. |
| **Entrenamiento** | Rutina, Ejercicios, Rutina\_Ejercicios | Estructuración modular de rutinas compuestas por N ejercicios con parámetros de series, repeticiones y tiempos. |
| **Comunidad y Red Social** | publicaciones, Comentario, likes, likes\_publicaciones | Interacciones dinámicas vinculadas directamente al ID de usuario y al ID del contenido consumido. |
| **Moderación y Soporte** | Reporte, razones\_Reporte, detalle\_Razon, mensajes\_Contacto | Control de seguridad para reportar publicaciones maliciosas y almacenamiento de correspondencia de soporte técnico. |

*Nota técnica de diseño: Las tablas pivote como `Rutina_Ejercicios` y `datos_Usuario_Alergias` garantizan la normalización en tercera forma normal (3FN), mitigando la redundancia de datos y optimizando los tiempos de respuesta en las consultas complejas de la API.*

## 📖 Documentación de la API (Endpoints)

Todos los puntos de entrada base corresponden a: `{{base_url}}/api`

### Autenticación (Auth)
* `POST /auth/register` - Registro de nuevos usuarios.
* `POST /auth/login` - Autenticación y retorno de token JWT.
* `GET /auth/me` - Obtener información del usuario autenticado actual.

### Gestión de Usuarios
* `GET /usuarios/` - Listar usuarios (Requiere permisos de administrador).
* `POST /usuarios/` - Creación manual de registros de usuario.
* `GET /usuarios/:id` - Obtener detalles de un usuario específico.
* `PUT /usuarios/:id` - Actualización total de entidad de usuario.
* `PATCH /usuarios/:id` - Modificación parcial de datos específicos.
* `DELETE /usuarios/:id` - Eliminación de cuenta (Baja lógica o física).
* `POST /usuarios/:id/follow` - Seguir o dejar de seguir a otro atleta.

### Perfiles de Usuario
* `GET /perfiles/` \| `POST /perfiles/` - Listado y creación de perfiles públicos.
* `GET /perfiles/:id` \| `PUT /perfiles/:id` \| `DELETE /perfiles/:id` - Operaciones CRUD sobre perfiles basados en ID.

### Métricas y Datos Físicos
* `GET /datos-usuario/` \| `POST /datos-usuario/` - Gestión de información antropométrica base (peso, altura, déficit calórico).
* `GET /datos-usuario/:id` \| `PUT /datos-usuario/:id` \| `DELETE /datos-usuario/:id` - Control individualizado de métricas de progreso.

### Planificación de Rutinas
* `GET /rutinas/` \| `POST /rutinas/` - Administrar plantillas o asignaciones de rutinas semanales.
* `GET /rutinas/:id` \| `PUT /rutinas/:id` \| `DELETE /rutinas/:id` - Control operativo del plan de entrenamiento indexado.

### Base de Datos de Ejercicios
* `GET /ejercicios/` \| `POST /ejercicios/` - Catálogo global de ejercicios (músculo objetivo, video demostrativo, series, repeticiones).
* `GET /ejercicios/:id` \| `PUT /ejercicios/:id` \| `DELETE /ejercicios/:id` - Mantenimiento del catálogo técnico de movimientos.

### Feed Social (Publicaciones, Likes y Comentarios)
* `GET /publicaciones/` \| `POST /publicaciones/` \| `GET /publicaciones/:id` \| `PUT /publicaciones/:id` \| `DELETE /publicaciones/:id` - Operaciones completas del muro comunitario.
* `GET /likes/` \| `POST /likes/` \| `GET /likes/:id` \| `PUT /likes/:id` \| `DELETE /likes/:id` - Control y conteo de interacciones de reacciones.
* `GET /comentarios/` \| `POST /comentarios/` \| `GET /comentarios/:id` \| `PUT /comentarios/:id` \| `DELETE /comentarios/:id` - Hilos de discusión en publicaciones.

### Asistente de Inteligencia Artificial (Chatbot IA)
* `POST /chat/` - Envío de prompts conversacionales y recepción de respuestas contextualizadas basadas en el estado físico del usuario.

### Salud del Servidor
* `GET /health` - Monitor de estado de conexión con la base de datos y disponibilidad del ecosistema API (Healthcheck).

## 🤖 Ejemplos de Peticiones al Chatbot

### Ejemplo 1: Planificación de Entrenamiento Automatizado
**Petición (Payload hacia `POST /api/chat/`):**
```json
{
  "message": "Créame una rutina enfocada al aumento de masa muscular"
}
```
**Respuesta de la IA (Ejemplo):**
```json
{
  "status": "success",
  "data": {
    "enfoque": "Hipertrofia",
    "distribucion": "Push/Pull/Legs",
    "recomendacion": "Priorizar sobrecarga progresiva en rangos de 8-12 repeticiones con RIR 1-2."
  }
}
```

### Ejemplo 2: Planificación Nutricional Basada en Contexto
**Petición (Payload hacia `POST /api/chat/`):**
```json
{
  "message": "Dame recomendaciones alimenticias para perder grasa según mis datos físicos y lugar de entrenamiento"
}
```
**Respuesta de la IA (Ejemplo):**
```json
{
  "status": "success",
  "data": {
    "deficit_estimado": "300 - 500 kcal de tu tasa metabólica basal",
    "macros_sugeridos": { "proteinas": "2.2g/kg", "grasas": "0.8g/kg", "carbohidratos": "Restante" },
    "nota_contextual": "Considerando entrenamiento en casa, priorizar alimentos densos en volumen calórico para control de saciedad."
  }
}
```
