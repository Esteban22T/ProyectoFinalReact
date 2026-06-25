# GestorApp

GestorApp es una aplicación web de gestión empresarial desarrollada con React, Vite, Material UI, Express y MongoDB. Permite administrar clientes, productos/servicios, proveedores, compras, ventas y visualizar un panel con estadísticas generales.

## Características principales

- Registro de usuarios con nombre, correo, teléfono, contraseña y confirmación de contraseña
- Login seguro con correo y contraseña
- Verificación de cuenta mediante un token de 6 dígitos
- Panel de control con métricas generales
- Gestión de clientes, productos/servicios, proveedores, compras y ventas
- Validaciones de formularios
- Filtros, paginación y control de estado activo/inactivo
- Actualización automática de stock al crear o anular compras y ventas
- Protección de rutas mediante autenticación con JWT

## Tecnologías usadas

### Frontend
- React 19
- Vite
- Material UI
- React Router DOM
- Axios

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcryptjs
- dotenv

## Requisitos previos

Antes de ejecutar el proyecto debes tener instalado:

- Node.js 18 o superior
- npm o yarn
- Una base de datos MongoDB (se recomienda MongoDB Atlas)

## Estructura del proyecto

- backend/: API REST y lógica de negocio
- frontend/: aplicación React con interfaz de usuario

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd proyecto-final
```

2. Instala las dependencias del backend:

```bash
cd backend
npm install
```

3. Instala las dependencias del frontend:

```bash
cd ../frontend
npm install
```

## Configuración de variables de entorno

Crea un archivo .env dentro de la carpeta backend con el siguiente contenido:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombre-db>
JWT_SECRET=tu_clave_secreta_muy_segura
```

Asegúrate de reemplazar:
- <usuario>
- <password>
- <cluster>
- <nombre-db>

## Ejecutar la aplicación

### Backend

Desde la carpeta backend:

```bash
npm run dev
```

El backend quedará disponible en:
- http://localhost:3000

### Frontend

Desde la carpeta frontend:

```bash
npm run dev
```

La interfaz quedará disponible en:
- http://localhost:5173

## Flujo de uso

1. El usuario se registra con sus datos.
2. Recibe un token de 6 dígitos para verificar la cuenta.
3. Luego inicia sesión.
4. Al ingresar, puede navegar por el menú principal y usar las secciones de gestión.
5. Las compras y ventas modifican el stock según corresponda.
6. Las operaciones pueden anularse si es necesario.

## Construir para producción

Para generar la versión lista para producción del frontend:

```bash
cd frontend
npm run build
```

## Notas importantes

- El backend depende de una conexión activa a MongoDB.
- El token de sesión del frontend se almacena en el navegador para autenticar peticiones.
- Si cambias el tiempo de expiración del JWT, debes reiniciar el backend para que el cambio entre en vigor.

## Credenciales de prueba

Si el proyecto se despliega con datos iniciales, podrás usar las cuentas que se registren desde la interfaz. No se incluye un usuario demo por defecto.
