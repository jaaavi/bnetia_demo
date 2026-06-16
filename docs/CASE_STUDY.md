# Case Study / Interview Answer

This document provides context for reviewers looking at the repository during an interview process.

## 3-Line Answer

```text
BNETIA Orders Platform — public demo of a production client app: [repo link] / [live demo link]
It manages B2B meat orders end-to-end: product catalogue, cart, admin validation, users, Excel price updates, allowed WhatsApp phones, and a WhatsApp/AI-assisted order flow.
I built the Vue/Vuetify frontend and Express-style backend architecture; the hardest technical decision was turning the real DB/WhatsApp-dependent system into a safe public Vercel demo while preserving the production routes, controllers, services and models.
```

## Context

BNETIA is a wholesale ordering application developed for a client and currently used as a production system.

The real system manages workflows such as:

- Customers placing orders from a panel.
- Admin users validating orders.
- Product catalogue and prices.
- Price updates through Excel uploads.
- Users and roles.
- Allowed phones for the WhatsApp channel.
- WhatsApp order intake assisted by parsing/AI.

This repository does not expose real data or credentials. It is a public demo that reproduces the workflow and architecture with fictitious data.

## What the Demo Does

The demo lets reviewers test the full workflow:

- Create orders from a catalogue.
- Filter and review orders.
- Validate, reject, or edit prices from the admin panel.
- Manage products.
- Simulate Excel upload for price updates.
- Export orders to Excel.
- Manage users.
- Manage allowed phones.
- Simulate a WhatsApp session.
- Process an incoming message and turn it into a pending order.

## My Role

My role covered full-stack development of the application:

- Building the frontend with Vue 3 and Vuetify.
- Designing order, catalogue, admin, and configuration views.
- Implementing an Express-style API with routes, controllers, models, services, and middlewares.
- Integrating order, product, user, price, validation, and WhatsApp-related flows.
- Preparing a safe public demo for Vercel.

## Hardest Technical Decision

The most delicate technical decision was turning a service-dependent application into a safe public demo without making it feel disconnected from the real system.

The original system depends on elements that should not be exposed publicly:

- Database.
- Credentials.
- WhatsApp session.
- Client data.
- Internal production flows.

To solve this, the demo keeps the architecture visible:

```text
api/index.js
server/routes
server/controllers
server/models
server/services
server/middlewares
server/data/mockStore.js
```

But replaces real dependencies with in-memory mock data.

For Vercel Hobby deployment, it was also necessary to keep a single Serverless Function:

```text
api/index.js
```

The rest of the backend lives in `server/`, so Vercel does not create a separate function for every file while the project still shows an organization close to production.

## Why It Does Not Use Real Data

This demo is meant to be public. Therefore:

- It does not use the real database.
- It does not include secrets.
- It does not connect to real WhatsApp.
- It does not show real clients.
- It does not persist sensitive information.

The intention is to demonstrate technical judgment, architecture, and product experience without compromising private information.

## How to Explain It in an Interview

A natural way to explain it:

> This is a public demo of a real client ordering platform. The production version uses real persistence and integrations, but this repo replaces them with mock data so the whole flow can be tested safely. I kept the production-like architecture because I wanted reviewers to see not only the UI, but also how I organize routes, controllers, services, models and deployment constraints.

## What to Look At

Recommended files:

- `src/App.vue`: main demo experience.
- `api/index.js`: single Vercel serverless entrypoint.
- `server/routes`: endpoint definitions.
- `server/controllers`: HTTP logic.
- `server/models`: mock data access.
- `server/services`: WhatsApp, AI, and Excel simulations.
- `server/data/mockStore.js`: initial fictitious data.

## Demo Limitations

The demo is not intended to replace production.

Known limitations:

- State is in memory.
- Data can reset.
- WhatsApp is simulated.
- AI/parsing is mocked.
- Authentication is demo-only.

These limitations are intentional so the project remains safe and easy to deploy publicly.
