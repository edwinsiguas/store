# 🌴 ZeciaK Store - Canoas de Punta Sal
> **Plataforma Web Transaccional y de Promoción Turística para Canoas de Punta Sal (Tumbes)**  
> Desarrollado con arquitectura desacoplada: **Spring Boot (Java 17)** en el Backend y **Angular** en el Frontend, con persistencia en **PostgreSQL 15** y seguridad con **Spring Security + JWT**.

---

## 🏛️ 1. Arquitectura del Sistema

```
zeciak-store/
├── backend/                       # API RESTful con Spring Boot & Tomcat Embebido
│   ├── src/main/java/com/zeciakstore/backend/
│   │   ├── config/                # Inicializadores y configuración de datos (DataInitializer)
│   │   ├── controller/            # Capa de Controladores REST (MVC - Endpoints HTTP)
│   │   ├── dto/                   # Data Transfer Objects (Auth, Registro, Pedidos)
│   │   ├── model/                 # Entidades JPA (Product, User, Order, TouristAttraction, etc.)
│   │   ├── repository/            # Capa DAO / Repositorios con Spring Data JPA e Hibernate
│   │   ├── security/              # Spring Security 6, JWT Token Provider, Filtros y Beans CORS
│   │   └── service/               # Capa de Lógica de Negocio (Interfaces & ServiceImpl)
│   └── src/main/resources/
│       ├── application.properties # Configuración de PostgreSQL 15, JPA y Secretos JWT
│       ├── schema.sql             # Script DDL para creación de tablas en PostgreSQL
│       └── data.sql               # Script DML con catálogo inicial y usuarios con BCrypt
│
└── frontend/                      # Cliente SPA en Angular Fuertemente Tipado
    ├── src/app/
    │   ├── guards/                # Guardias de ruta (AuthGuard)
    │   ├── interceptors/          # HttpInterceptor JWT (Funcional y Clásico por Clases)
    │   ├── models/                # Modelos TypeScript Fuertemente Tipados (Product, User, Order...)
    │   ├── pages/                 # Módulos y Componentes de Vista:
    │   │   ├── home/              # 🏠 Inicio: Hero banner, disponibilidad 24/7 y destacados
    │   │   ├── catalog/           # 🛍️ Catálogo: Filtros dinámicos (Damas, Caballeros, Niños, Accesorios)
    │   │   ├── nosotros/          # 🌴 Nosotros: Historia en Canoas de Punta Sal, misión y valores
    │   │   ├── contacto/          # 📞 Contacto: Formulario interactivo, WhatsApp 24/7 y FAQs
    │   │   ├── tourism/           # 🌊 Destinos: Atractivos turísticos (Ballenas, Termas, Surf)
    │   │   ├── cart/              # 🛒 Carrito: Gestión de ítems y checkout transaccional
    │   │   ├── login/             # 🔑 Inicio de sesión JWT
    │   │   └── register/          # 📝 Registro de nuevos clientes
    │   ├── services/              # Servicios Angular (AuthService, ProductService, OrderService...)
    │   └── shared/navbar/         # Barra de navegación responsive con contador reactivo de carrito
    ├── public/assets/images/      # Assets locales oficiales (Gemini_Generated_Image_*.png)
    └── src/assets/images/         # Copia de seguridad y enlace de assets de imagen
```

---

## ⚙️ 2. Pila Tecnológica & Patrones de Diseño

### Backend (Java / Spring Boot):
- **Framework:** Spring Boot 3.1.5 con servidor embebido **Apache Tomcat 10**.
- **Patrón Arquitectónico:** **MVC (Model-View-Controller)** enfocado en servicios RESTful:
  - **Controllers:** Enrutamiento HTTP, validación y respuestas `ResponseEntity<T>`.
  - **Services:** Lógica de negocio encapsulada con transaccionalidad (`@Transactional`).
  - **Entities:** Modelos de dominio con anotaciones Jakarta Persistence (`@Entity`, `@Table`).
- **Persistencia (DAO):** **PostgreSQL 15** mediante **Spring Data JPA e Hibernate (ORM)** con modo `spring.jpa.hibernate.ddl-auto=update`.
- **Seguridad Criptográfica:** **Spring Security** sin estado (`SessionCreationPolicy.STATELESS`) y autenticación basada en **JWT (JSON Web Tokens)** con firma HMAC-SHA256 y contraseñas cifradas en **BCrypt**.
- **CORS:** Configuración global `CorsConfigurationSource` habilitando el consumo fluido desde `http://localhost:4200`.

### Frontend (Angular):
- **Estructura:** Arquitectura modular basada en **Componentes Standalone** y **Modelos Fuertemente Tipados** (`interface Product`, `interface User`, etc.).
- **Integración JWT:** `authInterceptor` (y `JwtInterceptor`) que intercepta cada petición HTTP hacia el backend y añade la cabecera:
  ```http
  Authorization: Bearer <token_jwt>
  ```
- **Catálogo Dinámico:** Filtrado instantáneo por categorías:
  - **Damas:** Bikinis, salidas de baño a crochet, vestidos vaporosos.
  - **Caballeros:** Bañadores surf, camisas de lino, polos 100% algodón pima.
  - **Niños:** Trajes de baño y conjuntos con protección solar certificada UV50+.
  - **Accesorios:** Lentes polarizados UV400, sombreros de paja toquilla, bolsos ecológicos.
- **Assets Locales:** Enlace nativo a las imágenes generadas por Gemini:
  - `Gemini_Generated_Image_ (12).png`
  - `Gemini_Generated_Image_ (13).png`
  - `Gemini_Generated_Image_ (16).png`
  - `Gemini_Generated_Image_d1bxoxd1bxoxd1bx.png`
  - Con fallback automático a placeholder en caso de fallo de red.

---

## 🚀 3. Instrucciones de Ejecución

### Requisitos Previos:
- Java JDK 17+
- Maven 3.8+
- Node.js 18+ y npm
- PostgreSQL 15 (opcional para persistencia en vivo; el frontend incluye fallback 24/7 offline)

---

### Paso 1: Configurar y Ejecutar el Backend (Spring Boot)
1. Abrir la terminal en la carpeta `backend`:
   ```powershell
   cd c:\Users\Zecia\Desktop\Zeciak_Store\backend
   ```
2. Si tienes PostgreSQL 15 instalado, crea la base de datos:
   ```sql
   CREATE DATABASE zeciakstore_db;
   ```
   *(Las credenciales predeterminadas en `application.properties` son usuario `postgres` y contraseña `zeciakeren`).*
3. Compilar y ejecutar:
   ```powershell
   mvn spring-boot:run
   ```
4. El servidor se iniciará en `http://localhost:8080`.
   - `DataInitializer` sembrará automáticamente los usuarios por defecto:
     - **Admin:** `admin@zeciakstore.com` / `admin123`
     - **Cliente:** `cliente@zeciakstore.com` / `cliente123`
   - Los 15 productos iniciales y atractivos de Canoas de Punta Sal se insertarán automáticamente.

---

### Paso 2: Ejecutar el Frontend (Angular)
1. Abrir una nueva terminal en la carpeta `frontend`:
   ```powershell
   cd c:\Users\Zecia\Desktop\Zeciak_Store\frontend
   ```
2. Iniciar el servidor de desarrollo:
   ```powershell
   npm start
   ```
3. Abrir en tu navegador:
   ```
   http://localhost:4200
   ```

---

## 🌐 4. Endpoints de la API REST

| Método | Endpoint | Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Público | Autenticación y emisión de token JWT |
| `POST` | `/api/auth/register` | Público | Registro de nuevos usuarios |
| `GET` | `/api/products` | Público | Lista todos los productos |
| `GET` | `/api/products/{id}` | Público | Detalle de un producto |
| `GET` | `/api/products/category/{cat}` | Público | Filtro por categoría (Damas, Caballeros, etc.) |
| `GET` | `/api/products/featured` | Público | Productos destacados |
| `GET` | `/api/products/search?q=...` | Público | Búsqueda por texto libre |
| `POST` | `/api/products` | ADMIN (JWT) | Creación de productos |
| `PUT` | `/api/products/{id}` | ADMIN (JWT) | Actualización de productos |
| `DELETE` | `/api/products/{id}` | ADMIN (JWT) | Eliminación de productos |
| `GET` | `/api/tourist-attractions` | Público | Atractivos turísticos de Canoas de Punta Sal |
| `POST` | `/api/orders` | CLIENT / ADMIN | Creación transaccional de órdenes |
| `GET` | `/api/orders/my-orders` | CLIENT / ADMIN | Historial de compras del usuario |
| `POST` | `/api/contact` | Público | Enviar mensaje o consulta 24/7 |

---

## ☀️ 5. Promoción Turística de Canoas de Punta Sal
La plataforma no solo permite compras transaccionales de moda playera, sino que promueve los tesoros turísticos de Punta Sal:
- **Avistamiento de Ballenas Jorobadas** (Temporada de Julio a Octubre).
- **Aguas Cálidas (24°C promedio)** y arenas doradas todo el año.
- **Pozas Medicinales de Hervideros**.
- **Gastronomía Marina Tumbesina:** Conchas negras, langostas y majarisco.
