# Powerfit - Red Social y Plataforma Fitness integrada con Inteligencia Artificial

Este repositorio contiene el código fuente (Frontend y Backend) para **Powerfit**, una plataforma web integral diseñada para guiar a los usuarios en un verdadero cambio físico. Combina la automatización de rutinas personalizadas para todos los clientes de la plataforma basadas en evidencia científica mediante Inteligencia Artificial con una red social segura donde la comunidad puede compartir experiencias, progresos y testimonios.

## Stack Tecnológico

El proyecto está construido bajo una arquitectura cliente-servidor (Full-Stack), separando la lógica de negocio de la interfaz de usuario para garantizar escalabilidad, seguridad y mantenibilidad.

### Frontend (SPA)
- **Tecnologías Base**: 
  - **HTML5 & CSS3**: Estructuración semántica y estilos avanzados.
  - **JavaScript (ES6+)**: Lógica asíncrona y manipulación del DOM.
- **Framework & Build Tools**:
  - **React.js (v19)**: Construcción de interfaces de usuario interactivas y modulares basadas en Hooks.
  - **Vite**: Herramienta de construcción (bundler) ultra rápida para el entorno de desarrollo y optimización de producción.
  - **React Router DOM v7**: Gestión de enrutamiento del lado del cliente (Client-Side Routing).
- **Diseño, UX e Integraciones**:
  - **Lucide React**: Biblioteca de iconos modernos y ligeros.
  - **SweetAlert2 & React Hot Toast**: Gestión de modales, notificaciones asíncronas y alertas no intrusivas.
  - **EmailJS**: Integración para el envío de correos electrónicos transaccionales (contacto/soporte) directamente desde el cliente sin sobrecargar el backend.
  - **Google Generative AI (Gemini SDK)**: Integración con IA generativa en el frontend para funcionalidades avanzadas.

### Backend (API REST)
- **Node.js & Express.js**: Creación de una API RESTful robusta, manejando rutas modulares y middlewares personalizados.
- **Sequelize (ORM)**: Gestión de la base de datos relacional mediante modelos orientados a objetos, facilitando relaciones complejas (1:N, N:M) y consultas avanzadas.
- **MySQL / SQLite**: Motor de base de datos relacional (configurable para SQLite en testing o MySQL en producción) garantizando la persistencia e integridad de datos.
- **Autenticación & Seguridad**: 
  - *JSON Web Tokens (JWT)*: Manejo de sesiones sin estado (stateless) para proteger los endpoints.
  - *Bcrypt.js*: Encriptación segura (Hashing) de contraseñas de un solo sentido.
  - *CORS*: Control de políticas de acceso cruzado estricto.
- **Inteligencia Artificial (Chatbot)**:
  - *Groq API*: Integración del lado del servidor para un Chatbot inteligente y veloz enfocado en asistencia fitness.
- **Testing & Calidad**:
  - *Jest & Supertest*: Entorno configurado para pruebas unitarias y de integración (`test:coverage`, `test:watch`).

---

## Valor de Negocio y Logros Técnicos

Powerfit no es únicamente una aplicación CRUD tradicional; es un ecosistema digital robusto que demuestra sólidas competencias de Ingeniería de Software orientadas a la escalabilidad y al rendimiento:

- **Integración de IA Generativa Aplicada**: Implementación fluida de Modelos de Lenguaje (Groq API / Gemini SDK) para proporcionar a los usuarios un entrenador/nutricionista virtual. Esto demuestra la capacidad de orquestar APIs de terceros de manera asíncrona sin bloquear el *Event Loop* del backend de Node.js.
- **Arquitectura Social Compleja**: Desarrollo de un motor relacional en base de datos (N:M a través de Sequelize) para soportar dinámicas propias de una red social (Perfiles, Publicaciones, *Likes*, Comentarios y Tendencias), resolviendo los cuellos de botella clásicos de consultas anidadas.
- **Mentalidad de Testing (Calidad de Software)**: El entorno backend está configurado profesionalmente con **Jest & Supertest** para pruebas unitarias y de integración (`test:coverage`). Esto evidencia un fuerte compromiso con el código limpio, escalable y la prevención de regresiones, algo altamente valorado en entornos corporativos.
- **Descarga Estratégica del Backend (Serverless)**: Integración de **EmailJS** directamente en el cliente (React) para correos transaccionales y soporte, lo que disminuye la carga computacional del servidor centralizado y mejora los tiempos de respuesta.
- **Seguridad "By-Design"**: Sistema de moderación en comunidad, hashing de contraseñas con Bcrypt, gestión de accesos basada en roles (RBAC) y sesiones seguras sin estado con **JWT**.

---

## Funcionalidades Principales

Powerfit digitaliza y unifica la experiencia de entrenamiento con la motivación de una comunidad activa. Sus funcionalidades se dividen en los siguientes módulos:

### 1. Comunidad y Red Social
- **Perfiles de Usuario y Roles**: 
  - Gestión de cuentas con distintos niveles de permisos (Usuarios estándar, Contribuidores, Administradores).
  - Recopilación de datos físicos e historial médico básico (Alergias, Datos de usuario).
- **Módulo de Publicaciones (Feed)**:
  - Creación de posts o artículos categorizados (Nutrición, Entrenamiento, etc.).
  - Motor de interacciones sociales: Sistema de **Likes** y **Comentarios** en tiempo real.
  - Algoritmo de **Temas en Tendencia** para destacar las categorías más discutidas por la comunidad.
- **Moderación y Reportes**: Sistema integrado para que los usuarios puedan reportar contenido inapropiado (con detalle de razones), permitiendo a los administradores mantener un entorno seguro.

### 2. Gestión Fitness (Workout Tracking)
- **Monitoreo de Métricas**: Registro detallado de datos físicos, alergias, planes semanales, objetivos de peso y déficit calórico estimado.
- **Librería de Ejercicios y Rutinas**:
  - Base de datos estructurada de ejercicios y su correcta ejecución.
  - Creación y asignación de rutinas personalizadas a los perfiles de los usuarios.

### 3. Asistencia Inteligente (AI Chatbot)
- **Chatbot Powerfit**: Asistente virtual impulsado por IA (Groq API / Gemini) integrado directamente en la plataforma. Responde dudas sobre rutinas, nutrición o uso del sistema al instante, funcionando como un entrenador o soporte 24/7.

### 4. Panel de Administración (Gestión Operativa)
- **Seguridad y Control de Accesos**:
  - Sistema de Login seguro protegido por **JWT (JSON Web Tokens)** y encriptación de contraseñas.
  - Suspensión, baneo temporal y eliminación de cuentas de usuarios que infrinjan las normativas de la comunidad.
- **Moderación Avanzada y Reportes**:
  - Panel centralizado para revisar publicaciones reportadas, comentarios ofensivos o perfiles sospechosos.
  - Resolución de conflictos con acciones directas (eliminar post, advertir al usuario, rechazar reporte).
- **Soporte Técnico y Tickets**:
  - Recepción, seguimiento y resolución de tickets de soporte enviados por los usuarios (problemas de cuenta, dudas técnicas, bugs).
  - Comunicación directa con los usuarios mediante notificaciones para mantenerlos informados del estado de su consulta.
- **Gestión de Contenido Fitness**:
  - Administración completa de la base de datos global de ejercicios (Crear, Editar, Eliminar).
  - Verificación y moderación de rutinas compartidas públicamente por entrenadores y otros usuarios.
- **Métricas y Estadísticas del Sistema**:
  - Visualización del crecimiento de la comunidad, usuarios activos, publicaciones en tendencia y métricas generales de la plataforma.

---

## Arquitectura Preparada para Producción (Production-Ready)

El proyecto aún no se encuentra desplegado en un servidor público, pero su arquitectura ha sido construida bajo estrictos estándares corporativos para facilitar un paso a producción (Go-Live) seguro y escalable:

- **Frontend (SPA)**: Listo para ser optimizado y transpilado a estáticos a través de Vite (`npm run build`). Los archivos resultantes están estructurados para un despliegue ágil en plataformas de *Edge Computing* y CDN globales (como **Vercel, Netlify o AWS S3 + CloudFront**), integrándose fácilmente en flujos de CI/CD para despliegues continuos.
- **Backend API**: El servidor de Node.js está diseñado bajo una arquitectura sin estado (*Stateless*), lo que permite que sea desplegado mediante múltiples opciones corporativas: gestores de procesos (**PM2**), orquestación de contenedores (**Docker / Kubernetes**), o plataformas PaaS (**AWS Elastic Beanstalk / Azure App Service**), garantizando escalabilidad horizontal y *Zero Downtime*.
- **Base de Datos Relacional**: La capa de datos gestionada por Sequelize facilita futuras migraciones a entornos Cloud (ej. AWS RDS), manteniendo intacta la estructura e integridad de los datos físicos y rutinas de los usuarios.
- **Enfoque en Seguridad**: Todo el flujo de datos ha sido diseñado anticipando el uso de proxies inversos y certificados SSL/TLS, lo que asegurará la confidencialidad absoluta de los historiales médicos y métricas de la plataforma una vez montado en un entorno real.

---

## Instalación y Ejecución Local (Guía Paso a Paso)

Si deseas clonar y probar este proyecto en tu entorno local, sigue las instrucciones a continuación.

### 1. Prerrequisitos
- [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada).
- [Git](https://git-scm.com/) para clonar el repositorio.
- **MySQL Server** corriendo localmente.
- Cuentas activas o API Keys de:
  - **Groq API** (Para el Chatbot backend).
  - **EmailJS** (Para el formulario de contacto en el frontend).

### 2. Clonar el Repositorio
```bash
git clone https://github.com/TuUsuario/Proyecto-final-PowerFit.git
cd Proyecto-final-PowerFit
```

### 3. Configuración de la Base de Datos (MySQL)
1. Abre tu gestor de base de datos preferido (phpMyAdmin, MySQL Workbench o DBeaver).
2. Crea una base de datos vacía llamada `powerfit` (o el nombre que prefieras).
3. **Nota**: El backend de este proyecto utiliza `sequelize.sync()`. Al levantar el servidor por primera vez, el ORM creará automáticamente todas las tablas y sus relaciones estructurales.

### 4. Configuración del Backend (API)
1. Navega al Backend e instala dependencias:
   ```bash
   cd Backend
   npm install
   ```
2. Crea un archivo `.env` en la raíz de la carpeta `Backend/` con tus datos locales:
   ```env
   # Base de Datos
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=powerfit
   DB_HOST=localhost
   DB_DIALECT=mysql

   # Autenticación y Servidor
   PORT=3000
   JWT_SECRET=tu_palabra_secreta_super_segura

   # Integraciones AI
   GROQ_API_KEY=tu_api_key_de_groq
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   *Verás en consola `✅ Base de datos conectada y sincronizada.` y el servidor escuchando en el puerto 3000.*

### 5. Configuración del Frontend
1. Abre una nueva terminal y navega al Frontend:
   ```bash
   cd Front-End
   npm install
   ```
2. *(Si aplica)* Configura tu `.env` local en el Frontend para las APIs externas (EmailJS, Gemini) y la URL del Backend:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
3. Inicia el servidor de Vite:
   ```bash
   npm run dev
   ```

El frontend estará disponible en tu navegador en `http://localhost:5173` y conectado a tu API local. ¡Listo para desarrollar!

---

## Estructura del Proyecto

El proyecto está dividido en dos grandes bloques bajo un patrón de arquitectura limpia:

```text
Proyecto-final-PowerFit/
├── Backend/                 # API RESTful con Node.js y Express
│   ├── src/                 
│   │   ├── config/          # Configuración de servidor y base de datos
│   │   ├── controllers/     # Lógica de negocio (auth, rutinas, posts)
│   │   ├── MCP/             # Protocolo de Contexto de Modelo
│   │   ├── middlewares/     # JWT y protección de rutas
│   │   ├── migrations/      # Migraciones de DB
│   │   ├── models/          # Modelos y relaciones (N:M) de Sequelize
│   │   └── routes/          # Rutas de la API
│   └── tests/               # Pruebas unitarias y de integración (Jest)
├── Front-End/               # Aplicación cliente con React y Vite
│   ├── src/                 
│   │   ├── components/      # Componentes reutilizables
│   │   ├── context/         # Manejo de estado global (Auth)
│   │   ├── Pages/           # Vistas principales (Feed, Profile, etc.)
│   │   ├── Routes/          # Definición de rutas en el cliente
│   │   ├── Services/        # Servicios de conexión HTTP (Axios)
│   │   └── Styles/          # Hojas de estilo
```
