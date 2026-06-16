# BNETIA Demo

Public demo of BNETIA, a wholesale ordering application currently running in production for a client. This version is designed to present the product and its architecture without exposing real data, credentials, databases, or private integrations.

It mirrors the structure of the real system with a frontend, API, controllers, routes, middlewares, models, and services, while using only in-memory mock data.

The goal is to let anyone open the app, test the full workflow, and understand how the production application is designed without requiring MySQL, a real WhatsApp session, credentials, or external services.

## Interview Context

This repository is intended as a public demo of a real client application.

Short answer for prompts like _"Show us 1-2 things you've built and shipped to production"_:

```text
BNETIA Orders Platform — public demo of a production client app: [repo link] / [live demo link]
It manages B2B meat orders end-to-end: product catalogue, cart, admin validation, users, Excel price updates, allowed WhatsApp phones, and a WhatsApp/AI-assisted order flow.
I built the Vue/Vuetify frontend and Express-style backend architecture; the hardest technical decision was turning the real DB/WhatsApp-dependent system into a safe public Vercel demo while preserving the production routes, controllers, services and models.
```

More detail in [docs/CASE_STUDY.md](./docs/CASE_STUDY.md).

## Overview

BNETIA Demo simulates a platform for managing wholesale meat orders between customers and administration.

It includes:

- Order panel with product catalogue, cart, transport, and week number.
- Order history with status and origin filters.
- Admin panel with order validation.
- Product and price management.
- Simulated Excel upload for price updates.
- Real `.xlsx` export for demo orders.
- User management.
- Allowed WhatsApp phone management.
- Simulated WhatsApp Bot with QR, session state, and order parsing.
- Mock API with endpoints equivalent to the real backend.
- Visible architecture with `routes`, `controllers`, `models`, `middlewares`, and `services`.

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | Vue 3, Vuetify 3, Vite |
| Demo API | Express under `/api`, compatible with Vercel Serverless Functions |
| Data | In-memory mock data |
| Excel | `xlsx` |
| Deployment | Vercel |

## Project Structure

```text
bnetia-demo-vercel/
├── api/
│   └── index.js
├── docs/
├── public/
├── server/
│   ├── controllers/
│   ├── data/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── services/
├── src/
│   ├── App.vue
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── vercel.json
└── vite.config.ts
```

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Mock API](./docs/API.md)
- [Demo Script](./docs/DEMO_SCRIPT.md)
- [Case Study / Interview Answer](./docs/CASE_STUDY.md)
- [Vercel Deployment](./docs/DEPLOYMENT.md)
- [Mock Data](./docs/MOCK_DATA.md)

## Features

### Orders

- View the product catalogue.
- Sort by name or price.
- Search products.
- Add boxes to the current order.
- Select transport and week number.
- Create a pending order.
- Cancel pending orders.
- Edit the final price of an order.
- Export orders to Excel.

### Administration

- Validate orders.
- Reject orders.
- Edit the final price before validation.
- Create, edit, and delete products.
- Simulate Excel upload for price updates.
- Create, edit, and delete users.
- Simulate password reset.
- Add, activate, deactivate, and delete allowed phones.

### WhatsApp Bot

- Simulate session connection/disconnection.
- Display a demo QR.
- Process an incoming WhatsApp message.
- Convert free text into a pending order using a mock parser.

## Local Development

```bash
npm install
npm run dev
```

The app usually opens at:

```text
http://localhost:5173
```

To test the mock API separately:

```bash
node -e "import app from './api/index.js'; app.listen(7099, () => console.log('API demo http://localhost:7099/api'))"
```

Example:

```bash
curl http://localhost:7099/api/products/with-prices
```

## Build

```bash
npm run build
```

The production build is generated in:

```text
dist/
```

## Deployment on Vercel

Deploy this folder as an independent Vercel project.

Recommended configuration:

| Field | Value |
| --- | --- |
| Framework Preset | Vite |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

No environment variables are required.

`vercel.json` already includes the required rewrites to:

- Serve the Vue SPA from `index.html`.
- Route `/api/*` to the mock Express function.

## Main Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/demo/bootstrap` | Returns the full initial mock state |
| POST | `/api/demo/reset` | Resets mock data |
| POST | `/api/auth/login` | Demo login |
| GET | `/api/auth/me` | Demo admin user |
| GET | `/api/products/with-prices` | Products with prices |
| POST | `/api/products/upload-prices` | Simulates price Excel upload |
| GET | `/api/orders/admin` | Admin orders |
| GET | `/api/orders/pending-validation` | Pending orders |
| PUT | `/api/orders/:id/confirm` | Validates an order |
| GET | `/api/users` | Users |
| GET | `/api/admin/phones` | Allowed phones |
| POST | `/api/whatsapp/demo/process-message` | Simulates WhatsApp parsing |

Full endpoint documentation is available in [docs/API.md](./docs/API.md).

## Mock Data

The initial state lives in:

```text
server/data/mockStore.js
```

Vercel Hobby note: only `api/index.js` lives inside `api/` so Vercel creates a single Serverless Function. The backend architecture is kept in `server/` and imported from that function.

The demo includes sample products, users, orders, and allowed phones. Nothing is stored in a database. On Vercel, in-memory state may reset between serverless executions, which is intentional for a safe public demo.

## Design Decisions

- Keep a production-like structure so reviewers can understand how the project would scale.
- Avoid credentials and external service dependencies.
- Keep operations editable so the demo can be explored freely.
- Separate logic into controllers, models, and services even though the data is mocked.
- Use Vercel Serverless Functions to simulate the backend inside the same repository.

## Project Status

Ready to deploy.

Verified with:

```bash
npm run build
```

Product, order, phone, and WhatsApp mock endpoints have also been tested.
