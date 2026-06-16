# Arquitectura

BNETIA Demo está organizada para parecerse a una aplicación de producción, pero sin depender de infraestructura externa.

## Vista general

```text
Usuario
  ↓
Vue + Vuetify
  ↓ fetch / api calls
Vercel Rewrite /api/*
  ↓
api/index.js
  ↓
routes → middlewares → controllers → services/models → mockStore
```

## Frontend

El frontend vive en `src/`.

Archivos principales:

- `src/main.ts`: crea la app Vue y registra Vuetify.
- `src/App.vue`: interfaz completa de la demo.
- `src/style.css`: estilos globales mínimos.

El frontend intenta cargar datos desde:

```text
GET /api/demo/bootstrap
```

Si la API no está disponible durante desarrollo local con Vite puro, usa semillas locales internas para que la demo siga funcionando.

## API

La API vive en `api/` y usa Express.

`api/index.js` registra:

- `authRoutes`
- `ordersRoutes`
- `productsRoutes`
- `usersRoutes`
- `allowedPhonesRoutes`
- `whatsappRoutes`
- `aiOrderRoutes`
- `demoRoutes`

## Rutas

Las rutas están en `api/routes/`.

Cada archivo agrupa un área funcional:

- `authRoutes.js`: login, usuario actual y reset password.
- `ordersRoutes.js`: pedidos de cliente/admin, creación, edición, confirmación y rechazo.
- `productsRoutes.js`: catálogo, precios y subida de Excel demo.
- `usersRoutes.js`: CRUD de usuarios.
- `allowedPhonesRoutes.js`: teléfonos permitidos.
- `whatsappRoutes.js`: estado del bot y procesamiento de mensajes.
- `aiOrderRoutes.js`: endpoints mock relacionados con parsing IA.
- `demoRoutes.js`: bootstrap/reset del estado mock.

## Controladores

Los controladores están en `api/controllers/`.

Su función es:

- Recibir `req`.
- Llamar a modelos o servicios.
- Devolver JSON con forma similar al backend real.

No contienen acceso directo a base de datos.

## Modelos

Los modelos están en `api/models/`.

En producción serían responsables de hablar con MySQL o un ORM. En esta demo leen y modifican arrays en memoria desde:

```text
api/data/mockStore.js
```

Modelos incluidos:

- `productModel.js`
- `orderModel.js`
- `userModel.js`
- `allowedPhonesModel.js`

## Servicios

Los servicios están en `api/services/`.

Simulan integraciones que en producción serían externas:

- `aiOrderParserService.js`: interpreta un mensaje de WhatsApp y lo transforma en líneas de pedido.
- `whatsappTransport.js`: simula sesión y envío de WhatsApp.
- `priceExcelService.js`: simula procesamiento de un Excel de precios.

## Middlewares

Los middlewares están en `api/middlewares/`.

- `authMiddleware.js`: inyecta un usuario admin demo.
- `isAdmin`: protege rutas administrativas.
- `errorHandler.js`: respuesta uniforme de errores.

## Estado en memoria

El estado vive en `api/data/mockStore.js`.

Incluye:

- Productos.
- Usuarios.
- Pedidos.
- Teléfonos permitidos.
- Estado de WhatsApp.

En un entorno serverless como Vercel, este estado puede reiniciarse entre ejecuciones. Para una demo esto es deseable porque evita persistencia accidental.

## Correspondencia con producción

| Producción | Demo |
| --- | --- |
| MySQL | `mockStore.js` |
| JWT real | `authMiddleware.js` con admin demo |
| WhatsApp Web/Baileys | `whatsappTransport.js` |
| OpenAI/parser real | `aiOrderParserService.js` |
| Excel real de proveedor | `priceExcelService.js` |
| API Express real | Express serverless en `api/index.js` |
