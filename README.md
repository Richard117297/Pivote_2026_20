# PixelPets

Vitrina digital full stack para consultar una colección de mascotas virtuales. La
aplicación permite encontrar criaturas por nombre, especie y rareza, además de
ordenarlas por precio desde una interfaz responsive y accesible.

## Objetivo

Facilitar que los clientes de PixelPets encuentren su mascota ideal sin recorrer
una lista desordenada. El catálogo vive en el backend y el frontend lo consulta a
través de una API REST, manteniendo separadas la presentación, la validación y la
lógica de negocio.

## Integrantes

- David Ricardo Carvajal Barragán
- Juan Pablo Arenas Avendaño

## Funcionalidades

- Catálogo de 18 mascotas con identificador, nombre, especie, rareza, precio,
  salud y descripción.
- Búsqueda parcial por nombre, sin distinguir mayúsculas, minúsculas o tildes.
- Filtros combinables por especie y rareza.
- Ordenamiento estable por precio ascendente o descendente.
- Opciones de filtros obtenidas desde el backend.
- Contador de coincidencias y botón para restablecer controles.
- Estados de carga, error, reintento y ausencia de resultados.
- Diseño adaptable desde 320 px, navegación por teclado y foco visible.
- API con validación Zod y errores de estructura consistente.

## Tecnologías

| Capa | Tecnologías |
| --- | --- |
| Frontend | React, Vite, TypeScript, Tailwind CSS y Lucide React |
| Backend | Node.js, Express, TypeScript y Zod |
| Pruebas | Vitest, React Testing Library, User Event y Supertest |
| Calidad | TypeScript estricto y ESLint |

## Arquitectura

El repositorio utiliza npm workspaces:

- `client`: presentación, componentes, estado, servicio HTTP y pruebas de
  interacción.
- `server`: dominio, catálogo tipado, validación, lógica de consulta,
  controladores, rutas y pruebas de API.

El frontend usa rutas relativas `/api`; Vite las redirige al backend durante el
desarrollo. En producción, Express sirve el build del cliente y conserva la API
bajo el prefijo `/api`.

## Estructura principal

```text
.
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── test/
│   │   └── types/
│   └── package.json
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── domain/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── schemas/
│   │   └── services/
│   └── package.json
├── package.json
└── README.md
```

## Requisitos previos

- Node.js 20 o superior.
- npm 10 o superior.

## Instalación

Desde la raíz del repositorio:

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm run dev
```

Este comando inicia simultáneamente Vite y Express:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- API: `http://localhost:3000/api`

## Comprobación de tipos

```bash
npm run typecheck
```

## Lint

```bash
npm run lint
```

## Pruebas

```bash
npm run test
```

Las pruebas del backend cubren integridad del catálogo, búsqueda, filtros,
ordenamiento y rutas HTTP. Las del frontend cubren renderizado, contenido
obligatorio, controles y estados de interfaz. No requieren conexión a Internet.

## Build

```bash
npm run build
```

El comando compila primero el frontend en `client/dist` y luego el backend en
`server/dist`.

## Ejecución de producción

Después de generar el build:

```bash
npm start
```

La aplicación completa queda disponible en `http://localhost:3000`. El servidor
acepta la variable de entorno opcional `PORT`; si no está definida utiliza el
puerto `3000`.

## Despliegue en Render

El repositorio incluye un Blueprint para desplegar PixelPets como un único Web
Service de Render. El servicio compila los workspaces, inicia el backend
compilado y sirve desde Express tanto la API como el frontend de React.

Consulta la configuración, la conexión del repositorio privado y las
verificaciones posteriores en [DESPLIEGUE.md](./DESPLIEGUE.md).

## Endpoints de la API

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/health` | Estado del servicio |
| `GET` | `/api/pets` | Consulta el catálogo |
| `GET` | `/api/pets/options` | Especies, rarezas y opciones de orden |

`GET /api/pets` admite estos parámetros opcionales:

| Parámetro | Valores |
| --- | --- |
| `search` | Texto del nombre |
| `species` | Especie disponible en `/api/pets/options` |
| `rarity` | Rareza disponible en `/api/pets/options` |
| `sort` | `price-asc` o `price-desc` |

Ejemplo:

```text
GET /api/pets?search=luna&species=Gato%20Cósmico&rarity=Raro&sort=price-desc
```

## Alcance

Esta etapa implementa exclusivamente la vitrina de consulta, búsqueda, filtrado
y ordenamiento. El catálogo es local, tipado y de solo lectura dentro del
backend; no se requiere base de datos para los casos de uso actuales.

No se incluyen autenticación, perfiles, favoritos persistentes, carrito,
compras, pagos, CRUD, panel administrativo, carga de imágenes, WebSockets,
microservicios ni Docker. La configuración incluida prepara el despliegue en
Render, pero no publica la aplicación por sí sola.

La documentación de Scrum —Product Backlog, Sprint Backlog, dailies, burndown,
Sprint Review y Sprint Retrospective— se completará en una etapa posterior. El
enunciado académico `pivote-2026-20.md` se conserva como documento independiente.
