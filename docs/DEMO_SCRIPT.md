# Demo Script

This script is designed for presenting the project during an interview, technical review, or quick product walkthrough.

## 1. Product Entry

Open the app deployed on Vercel or running locally.

Recommended message:

> This demo reproduces the BNETIA workflow with fictitious data. It does not need a database or a real WhatsApp session, but it keeps the frontend and backend structure I would use in production.

## 2. Place an Order

In the order creation tab (`Hacer pedido` in the current UI):

1. Search for `solomillo`.
2. Add boxes to one or more products.
3. Change transport.
4. Change week number.
5. Confirm the order.

What to show:

- Catalogue.
- Search.
- Cart.
- Pending order creation.

## 3. Orders

In the orders tab (`Pedidos` in the current UI):

1. Filter by `Pendiente`.
2. Filter by `WhatsApp` or `Panel`.
3. Edit the price of a pending order.
4. Export Excel.

What to show:

- Order statuses.
- Order origin.
- Real export using `xlsx`.

## 4. Administration

In the admin order validation section (`Administrar > Validar pedidos` in the current UI):

1. Validate an order.
2. Reject another one if available.
3. Edit price before validation.

What to show:

- Administrative workflow.
- Separation between pending and validated orders.

## 5. Products

In the admin products section (`Administrar > Productos` in the current UI):

1. Add a product.
2. Edit its price.
3. Delete a product.
4. Use the price update action (`Actualizar precios` in the current UI) to simulate an Excel upload.

What to explain:

- In production, this area would connect to the real Excel upload flow.
- In the demo, prices are updated in memory.

## 6. Users

In the admin users section (`Administrar > Usuarios` in the current UI):

1. Create a user.
2. Change their role.
3. Simulate password reset.
4. Delete a user.

What to explain:

- The mock API keeps realistic routes and controllers.
- Authentication is simplified with a demo admin user.

## 7. Allowed Phones

In the admin allowed phones section (`Administrar > Teléfonos` in the current UI):

1. Add a number with international prefix.
2. Activate/deactivate a phone.
3. Delete a phone.

What to explain:

- This represents the allowlist used by the WhatsApp bot.

## 8. WhatsApp Bot

In the admin WhatsApp Bot section (`Administrar > WhatsApp bot` in the current UI):

1. Connect session.
2. Show demo QR.
3. Process an incoming message.

Example message:

```text
Good morning, week 26:
30 boxes solomillo +2,4 cow
18 boxes morcillo yearling
12 boxes carne picada especial cow
Transport by truck
```

What to explain:

- The mock service interprets the message.
- A pending order is generated.
- The admin validates it afterwards.

## 9. Architecture

Open the repository and show:

```text
server/routes
server/controllers
server/models
server/services
server/middlewares
server/data/mockStore.js
```

Useful sentence:

> The demo is not just a static screen: it keeps the shape of a real API with separated layers. The difference is that models point to memory instead of MySQL.

## 10. Closing

Strong points to highlight:

- Simple Vercel deployment.
- No secrets or credentials.
- Safe fictitious data.
- Production-like architecture.
- Complete navigable workflow.
