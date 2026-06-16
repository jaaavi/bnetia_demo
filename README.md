# BNETIA Demo

Demo operativa de BNETIA preparada para desplegar en Vercel. Replica la estructura de un sistema real de pedidos mayoristas con frontend, API, controladores, rutas, middlewares, modelos y servicios, pero trabaja íntegramente con datos ficticios en memoria.

El objetivo es que cualquier persona pueda entrar, probar el flujo completo y entender cómo estaría organizado el producto en producción sin necesitar MySQL, WhatsApp real, credenciales ni servicios externos.

## Resumen

BNETIA Demo simula una plataforma para gestionar pedidos de productos cárnicos entre clientes y administración.

Incluye:

- Panel de pedidos con catálogo, carrito, transporte y semana.
- Historial de pedidos con filtros por estado y origen.
- Panel de administración con validación de pedidos.
- Gestión de productos y precios.
- Simulación de subida de Excel para actualizar precios.
- Exportación real de pedidos a `.xlsx`.
- Gestión de usuarios.
- Gestión de teléfonos autorizados para WhatsApp.
- Simulación de WhatsApp Bot con QR, sesión y parsing de pedido.
- API mock con rutas equivalentes al backend real.
- Arquitectura visible de `routes`, `controllers`, `models`, `middlewares` y `services`.

## Stack

| Capa | Tecnología |
| --- | --- |
| Frontend | Vue 3, Vuetify 3, Vite |
| API demo | Express en `/api`, compatible con Vercel Serverless Functions |
| Datos | Mock data en memoria |
| Excel | `xlsx` |
| Deploy | Vercel |

## Estructura

```text
bnetia-demo-vercel/
├── api/
│   ├── controllers/
│   ├── data/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── index.js
├── docs/
├── public/
├── src/
│   ├── App.vue
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── vercel.json
└── vite.config.ts
```

## Documentación

- [Arquitectura](./docs/ARCHITECTURE.md)
- [API Mock](./docs/API.md)
- [Guion de Demo](./docs/DEMO_SCRIPT.md)
- [Despliegue en Vercel](./docs/DEPLOYMENT.md)
- [Datos Mock](./docs/MOCK_DATA.md)

## Funcionalidades

### Pedidos

- Ver catálogo de productos.
- Ordenar por nombre o precio.
- Buscar productos.
- Añadir cajas al pedido.
- Seleccionar transporte y semana.
- Crear pedido pendiente.
- Cancelar pedidos pendientes.
- Editar precio final de un pedido.
- Exportar pedidos a Excel.

### Administración

- Validar pedidos.
- Rechazar pedidos.
- Editar precio final antes de confirmar.
- Crear, editar y eliminar productos.
- Simular carga de Excel para actualizar precios.
- Crear, editar y eliminar usuarios.
- Simular reseteo de contraseña.
- Añadir, activar, desactivar y eliminar teléfonos permitidos.

### WhatsApp Bot

- Simular conexión/desconexión de sesión.
- Mostrar QR demo.
- Procesar un mensaje entrante de WhatsApp.
- Convertir texto libre en un pedido pendiente usando un parser mock.

## Instalación local

```bash
npm install
npm run dev
```

La app se abrirá normalmente en:

```text
http://localhost:5173
```

Si quieres probar la API mock por separado:

```bash
node -e "import app from './api/index.js'; app.listen(7099, () => console.log('API demo http://localhost:7099/api'))"
```

Ejemplo:

```bash
curl http://localhost:7099/api/products/with-prices
```

## Build

```bash
npm run build
```

El resultado se genera en:

```text
dist/
```

## Despliegue en Vercel

Sube esta carpeta como proyecto independiente.

Configuración recomendada:

| Campo | Valor |
| --- | --- |
| Framework Preset | Vite |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

No necesita variables de entorno.

`vercel.json` ya incluye las rewrites necesarias para:

- Servir la SPA desde `index.html`.
- Enviar `/api/*` a la función Express mock.

## Endpoints principales

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/api/demo/bootstrap` | Devuelve todo el estado mock inicial |
| POST | `/api/demo/reset` | Reinicia datos ficticios |
| POST | `/api/auth/login` | Login demo |
| GET | `/api/auth/me` | Usuario admin demo |
| GET | `/api/products/with-prices` | Productos con precios |
| POST | `/api/products/upload-prices` | Simula Excel de precios |
| GET | `/api/orders/admin` | Pedidos admin |
| GET | `/api/orders/pending-validation` | Pedidos pendientes |
| PUT | `/api/orders/:id/confirm` | Valida pedido |
| GET | `/api/users` | Usuarios |
| GET | `/api/admin/phones` | Teléfonos permitidos |
| POST | `/api/whatsapp/demo/process-message` | Simula parsing WhatsApp |

La documentación completa está en [docs/API.md](./docs/API.md).

## Datos ficticios

Todo el estado inicial vive en:

```text
api/data/mockStore.js
```

La demo incluye productos, usuarios, pedidos y teléfonos de ejemplo. No se guarda nada en base de datos. En Vercel, el estado en memoria puede reiniciarse entre ejecuciones serverless, lo cual es intencional para una demo segura.

## Decisiones de diseño

- Mantener estructura parecida a producción para que se vea cómo escalaría el proyecto.
- No depender de credenciales ni servicios externos.
- Mantener operaciones editables para que la demo se pueda trastear.
- Separar lógica en controladores, modelos y servicios aunque los datos sean mock.
- Usar Vercel Serverless Functions para simular backend dentro del mismo repo.

## Estado del proyecto

Demo lista para desplegar.

Verificación realizada:

```bash
npm run build
```

También se probaron endpoints de productos, pedidos, teléfonos y WhatsApp mock.
# bnetia_demo
