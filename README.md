# 💳 ACCOUNTS - SERVICES

Aplicación **SPA (Single Page Application)** desarrollada en **Angular 17 + TailwindCSS**, que permite gestionar **Cuentas de Ahorro** y **Transacciones** de un usuario autenticado.  
Forma parte de la prueba técnica **FullStack**, cuyo backend está implementado en **Node.js/NestJS con PostgreSQL y JWT**.

---

## 🧩 Funcionalidades Principales

- **Inicio (Home):** Página de bienvenida con acceso a “Login” o “Registro”.
- **Autenticación:** Registro y Login de usuario con manejo de tokens JWT.
- **Creación de Cuentas:** Tras el registro, el usuario puede crear su cuenta de ahorro.
- **Listado de Cuentas:** Muestra todas las cuentas asociadas al usuario autenticado.
- **Detalle de Cuenta:** Permite consultar saldo y registrar transacciones (depósitos o retiros).
- **Transacciones:** Visualiza el historial de movimientos por cuenta.
- **Protección de rutas:** Solo accesibles mediante token JWT almacenado en `localStorage`.

---

## ⚙️ Tecnologías Utilizadas

| Categoría      | Tecnología                      |
|--------------- |-------------------------------- |
| Framework      | Angular 17                      |
| Lenguaje       | TypeScript                      |
| Estilos        | TailwindCSS                     |
| HTTP           | Angular HttpClient              |
| Autenticación  | JWT                             |
| Testing        | Jest + Karma                    |
| Contenedor Dev | Docker Compose + Node 20-alpine |

---

## 📁 Estructura del Proyecto

```
bank-frontend/
│
├── src/
│   ├── app/
│   │   ├── core/                 # Servicios, interceptores, modelos
│   │   ├── features/             # Vistas funcionales (auth, accounts)
│   │   ├── shared/               # Componentes reutilizables (UI)
│   │   ├── app.routes.ts         # Rutas principales
│   │   ├── app.component.ts
│   │   └── app.component.html
│   │
│   ├── assets/                   # Recursos estáticos
│   ├── styles.scss               # Estilos globales + Tailwind
│   └── main.ts                   # Bootstrap de la app
│
├── Dockerfile.dev
├── docker-compose.yml
├── tailwind.config.js
├── postcss.config.js
├── angular.json
├── package.json
└── README.md
```

---

## 🚀 Instalación y Ejecución Local

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/Celaa02/service_ac.git
cd bank-frontend
```

### 2️⃣ Instalar dependencias
```bash
npm i
```

### 3️⃣ Ejecutar en desarrollo
```bash
npx ng serve
```

La aplicación estará disponible en 👉 **http://localhost:4200**

---

## 🐳 Entorno Docker (Desarrollo)

El entorno **Docker** está pensado para pruebas rápidas sin instalar dependencias locales.

### 🧱 Build & Run
```bash
docker compose up --build
```

### 🧰 Archivos relacionados
**Dockerfile.dev**
```dockerfile
FROM node:20-alpine
WORKDIR /app
ENV NPM_CONFIG_LEGACY_PEER_DEPS=true
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4200
CMD ["npm", "run", "start"]
```

**docker-compose.yml**
```yaml
version: '3.9'
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "4200:4200"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

---

## 🧪 Pruebas Unitarias

Se incluyen **tests básicos** con **Jest** y **Karma** para los componentes principales:
- `LoginPageComponent`
- `RegisterComponent`
- `AccountCreateComponent`

### Ejecutar pruebas
```bash
ng test
```

---

## 🔐 Autenticación y Comunicación con Backend

Los servicios (`AuthService`, `AccountsService`, `TransactionsService`) gestionan:
- **JWT Storage:** guarda el token en `localStorage`.
- **AuthInterceptor:** agrega `Authorization: Bearer <token>` a las peticiones.
- **URLs Base:** definidas mediante variables de entorno en `environment.ts`.

Ejemplo de llamada a la API:
```typescript
this.http.post(`${apiUrl}/accounts`, payload, {
  headers: { Authorization: `Bearer ${token}` }
});
```

---

## 🧭 Rutas Principales

| Ruta              | Descripción             |
|-------------------|-------------------------|
| `/`               | Página de bienvenida    |
| `/login`          | Ingreso de usuario      |
| `/register`       | Registro nuevo usuario  |
| `/create-account` | Crear cuenta de ahorro  |
| `/accounts`       | Lista de cuentas        |
| `/accounts/:id`   | Detalle y transacciones |

---

## 🧠 Buenas Prácticas Aplicadas

- Arquitectura modular basada en **Clean Architecture**.  
- Separación clara entre **core**, **features** y **shared**.  
- Uso de **RxJS** y **Observables** para suscripción reactiva.  
- **TailwindCSS** para diseño rápido y consistente.  
- Validaciones de formularios reactivas y control de errores.  

---

## 🧾 Créditos

- **Autor:** Darly Vergara  
- **Fecha:** Octubre 2025  
