# Architecture

BNETIA Demo is organized to resemble a production application without requiring external infrastructure.

## Overview

```text
User
  ↓
Vue + Vuetify
  ↓ fetch / API calls
Vercel Rewrite /api/*
  ↓
api/index.js
  ↓
server/routes → server/middlewares → server/controllers → server/services/models → mockStore
```

## Frontend

The frontend lives in `src/`.

Main files:

- `src/main.ts`: creates the Vue app and registers Vuetify.
- `src/App.vue`: complete demo interface.
- `src/style.css`: minimal global styles.

The frontend attempts to load data from:

```text
GET /api/demo/bootstrap
```

If the API is not available during plain Vite local development, the app falls back to local seed data so the demo remains usable.

## API

The API uses Express. On Vercel, the only serverless function is `api/index.js`; the rest of the backend layers live under `server/`.

`api/index.js` registers:

- `authRoutes`
- `ordersRoutes`
- `productsRoutes`
- `usersRoutes`
- `allowedPhonesRoutes`
- `whatsappRoutes`
- `aiOrderRoutes`
- `demoRoutes`

## Routes

Routes live in `server/routes/`.

Each file groups a functional area:

- `authRoutes.js`: login, current user, and password reset.
- `ordersRoutes.js`: customer/admin orders, creation, editing, confirmation, and rejection.
- `productsRoutes.js`: catalogue, prices, and demo Excel upload.
- `usersRoutes.js`: user CRUD.
- `allowedPhonesRoutes.js`: allowed WhatsApp phones.
- `whatsappRoutes.js`: bot status and incoming message processing.
- `aiOrderRoutes.js`: mock endpoints related to AI order parsing.
- `demoRoutes.js`: mock state bootstrap/reset.

## Controllers

Controllers live in `server/controllers/`.

Their role is to:

- Receive `req`.
- Call models or services.
- Return JSON shaped similarly to the real backend.

They do not access a database directly.

## Models

Models live in `server/models/`.

In production, these would talk to MySQL or an ORM. In this demo, they read and mutate in-memory arrays from:

```text
server/data/mockStore.js
```

Included models:

- `productModel.js`
- `orderModel.js`
- `userModel.js`
- `allowedPhonesModel.js`

## Services

Services live in `server/services/`.

They simulate integrations that would be external in production:

- `aiOrderParserService.js`: interprets a WhatsApp message and turns it into order lines.
- `whatsappTransport.js`: simulates WhatsApp session and message sending.
- `priceExcelService.js`: simulates processing a price Excel file.

## Middlewares

Middlewares live in `server/middlewares/`.

- `authMiddleware.js`: injects a demo admin user.
- `isAdmin`: protects administrative routes.
- `errorHandler.js`: standardizes error responses.

## In-Memory State

State lives in `server/data/mockStore.js`.

It includes:

- Products.
- Users.
- Orders.
- Allowed phones.
- WhatsApp state.

In a serverless environment like Vercel, this state may reset between executions. For a public demo, that behavior is intentional because it avoids accidental persistence.

## Vercel Hobby

Vercel treats files inside `api/` as serverless functions. To avoid exceeding the Hobby plan function limit, this demo keeps only:

```text
api/index.js
```

The rest of the mock backend lives in:

```text
server/
```

This preserves the production-like structure without creating additional functions.

## Production Mapping

| Production | Demo |
| --- | --- |
| MySQL | `mockStore.js` |
| Real JWT | `authMiddleware.js` with demo admin |
| WhatsApp Web/Baileys | `whatsappTransport.js` |
| OpenAI/real parser | `aiOrderParserService.js` |
| Supplier Excel import | `priceExcelService.js` |
| Real Express API | Serverless Express in `api/index.js` |
