# Mock API

The mock API exposes endpoints similar to the real backend, but every response uses fictitious in-memory data.

Local base URL if you run Express manually:

```text
http://localhost:7099/api
```

On Vercel:

```text
/api
```

## Demo

### `GET /api/demo/bootstrap`

Returns the full current mock state.

Response:

```json
{
  "success": true,
  "data": {
    "products": [],
    "users": [],
    "orders": [],
    "phones": [],
    "whatsapp": {}
  }
}
```

### `POST /api/demo/reset`

Resets the mock state to its initial seed data.

## Auth

### `POST /api/auth/login`

Returns a fictitious token and demo admin user.

Body:

```json
{
  "email": "admin@demo.local",
  "password": "demo"
}
```

### `GET /api/auth/me`

Returns the demo admin user.

### `PUT /api/auth/reset-password/:id`

Simulates a password reset.

## Products

### `GET /api/products`

Returns flat product records.

### `GET /api/products/with-prices`

Returns products using a price structure similar to the real backend.

### `POST /api/products`

Creates a mock product.

Body:

```json
{
  "name": "Entrecot",
  "description": "Demo box",
  "type": "COW/VACA",
  "price": 12.5
}
```

### `PUT /api/products/:id`

Updates a mock product.

### `PUT /api/products/price/:product_price_id`

Updates a price by `product_price_id`.

Body:

```json
{
  "price": 13.25
}
```

### `DELETE /api/products/:id`

Deletes a mock product.

### `POST /api/products/upload-prices`

Simulates an Excel upload and recalculates prices in memory.

## Orders

### `GET /api/orders`

Returns mock orders.

### `GET /api/orders/admin`

Returns all orders for admin.

### `GET /api/orders/pending-validation`

Returns pending orders.

### `POST /api/orders`

Creates a mock order.

Body:

```json
{
  "total_price": 120.5,
  "transport_medium": "Camión refrigerado",
  "week_number": 26,
  "items": [
    {
      "product_id": 1,
      "product_price_id": 101,
      "product_name": "Solomillo +2,4",
      "price_type": "COW/VACA",
      "quantity": 10,
      "price": 14.8
    }
  ]
}
```

### `PUT /api/orders/:id`

Updates status, price, transport, or week number.

### `PUT /api/orders/:id/confirm`

Validates an order.

Optional body:

```json
{
  "total_price": 650
}
```

### `PUT /api/orders/:id/reject`

Rejects an order.

### `DELETE /api/orders/:id`

Cancels an order.

## Users

### `GET /api/users`

Lists users.

### `POST /api/users`

Creates a user.

### `GET /api/users/:id`

Returns a user.

### `PUT /api/users/:id`

Updates a user.

### `DELETE /api/users/:id`

Deletes a user.

## Allowed Phones

### `GET /api/admin/phones`

Lists allowed phones.

### `POST /api/admin/phones`

Creates an allowed phone.

Body:

```json
{
  "phone_number": "+34600111203",
  "phone_name": "Demo customer"
}
```

### `PUT /api/admin/phones/:id`

Updates a phone.

### `PATCH /api/admin/phones/:id/toggle`

Activates or deactivates a phone.

Body:

```json
{
  "is_active": false
}
```

### `DELETE /api/admin/phones/:id`

Deletes a phone.

## WhatsApp

### `GET /api/whatsapp/admin/config`

Returns mock configuration.

### `POST /api/whatsapp/admin/config`

Updates mock configuration.

### `GET /api/whatsapp/admin/baileys/status`

Returns session status.

### `POST /api/whatsapp/admin/baileys/start`

Simulates session start.

### `POST /api/whatsapp/admin/baileys/stop`

Simulates session stop.

### `POST /api/whatsapp/demo/process-message`

Simulates receiving a WhatsApp message and creates a pending order.

Body:

```json
{
  "wa_id": "+34600111203",
  "wa_name": "Demo Customer",
  "message": "week 26: 30 boxes solomillo +2,4 cow, 18 boxes morcillo yearling"
}
```

## AI Orders

### `GET /api/ai-orders/pending`

Returns pending orders.

### `POST /api/ai-orders/parse`

Demo alias for message parsing.
