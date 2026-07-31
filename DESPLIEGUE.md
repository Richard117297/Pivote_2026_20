# Despliegue de PixelPets en Render

## Arquitectura de producción

PixelPets se despliega como un único Web Service de Node.js:

```text
Navegador
   |
   v
Web Service de Render (Express)
   |-- /api/health
   |-- /api/pets
   |-- /api/pets/options
   `-- React compilado en client/dist
```

El proceso de build de Render instala las dependencias con `npm ci` y ejecuta el
script raíz que compila ambos workspaces. Vite genera los archivos estáticos en
`client/dist` y TypeScript compila Express en `server/dist`. En producción,
Express registra primero las rutas `/api`, sirve el build de React y utiliza el
documento principal como fallback para las rutas del frontend.

El frontend consume la API mediante rutas relativas `/api`. En desarrollo,
Vite conserva el proxy hacia `http://localhost:3000`; en producción, la página
y la API comparten el mismo origen.

## Configuración declarada en Render

El archivo [`render.yaml`](./render.yaml) define:

- Tipo: Web Service.
- Runtime: Node.
- Nombre: `pixelpets`.
- Región: `virginia`.
- Plan: `free`.
- Rama: `main`.
- Build: `npm ci && npm run build`.
- Inicio: `npm start`.
- Health check: `/api/health`.
- Despliegue automático: únicamente después de aprobar los checks de CI.
- Entorno: `NODE_ENV=production`.

No se requieren secretos, base de datos ni variables de entorno adicionales.
Render proporciona `PORT` automáticamente y Express escucha en `0.0.0.0`.

## Conectar el repositorio privado

1. Inicia sesión en Render y abre el panel principal.
2. Conecta la cuenta de GitHub que tenga acceso al repositorio privado
   `Richard117297/Pivote_2026_20`.
3. Al autorizar la aplicación de Render en GitHub, permite el acceso a ese
   repositorio. Si ya estaba instalada, revisa **Repository access** en la
   configuración de la aplicación.
4. En Render, selecciona **New > Blueprint**.
5. Busca el repositorio privado y selecciona **Connect**.
6. Elige la rama `main` y conserva `render.yaml` como ruta del Blueprint.
7. Revisa que Render detecte un único Web Service llamado `pixelpets` y que no
   solicite secretos.
8. Cuando se decida publicar, aplica el Blueprint desde el panel. Los
   despliegues automáticos posteriores esperarán a que los checks de CI
   finalicen correctamente.

## Build e inicio

Desde la raíz del repositorio:

```bash
npm ci
npm run build
npm start
```

Render ejecuta de forma equivalente:

```text
Build Command: npm ci && npm run build
Start Command: npm start
```

El proceso de producción ejecuta `server/dist/server.js`; no utiliza `tsx`,
Vite ni un servidor de desarrollo.

## Verificación

Una vez iniciado el servicio, sustituye `<URL_PUBLICA>` por la URL asignada por
Render.

Página principal:

```text
GET <URL_PUBLICA>/
```

Debe responder `200`, devolver el documento HTML de React y cargar el catálogo.

Endpoint de salud:

```text
GET <URL_PUBLICA>/api/health
```

Debe responder `200` con:

```json
{
  "status": "ok",
  "service": "pixelpets-api"
}
```

Consulta de la API:

```text
GET <URL_PUBLICA>/api/pets
```

Debe responder `200` con el catálogo y sus metadatos. También se debe comprobar
que la búsqueda, los filtros y el ordenamiento continúen funcionando desde la
página principal.

## URL pública

Registrar después del primer despliegue:

```text
https://________________________________.onrender.com
```
