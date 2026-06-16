# API Mock

La API mock expone endpoints parecidos al backend real, pero todos responden con datos ficticios.

Base URL local si levantas Express manualmente:

```text
http://localhost:7099/api
```

En Vercel:

```text
/api
```

## Demo

### `GET /api/demo/bootstrap`

Devuelve todo el estado actual.

Respuesta:

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

Reinicia el estado mock a los datos iniciales.

## Auth

### `POST /api/auth/login`

Devuelve un token ficticio y usuario admin.

Body:

```json
{
  "email": "admin@demo.local",
  "password": "demo"
}
```

### `GET /api/auth/me`

Devuelve el usuario admin demo.

### `PUT /api/auth/reset-password/:id`

Simula reset de contraseña.

## Products

### `GET /api/products`

Devuelve productos planos.

### `GET /api/products/with-prices`

Devuelve productos con estructura de precios parecida al backend real.

### `POST /api/products`

Crea un producto mock.

Body:

```json
{
  "name": "Entrecot",
  "description": "Caja demo",
  "type": "COW/VACA",
  "price": 12.5
}
```

### `PUT /api/products/:id`

Actualiza un producto mock.

### `PUT /api/products/price/:product_price_id`

Actualiza el precio por `product_price_id`.

Body:

```json
{
  "price": 13.25
}
```

### `DELETE /api/products/:id`

Elimina un producto mock.

### `POST /api/products/upload-prices`

Simula la subida de un Excel y recalcula precios en memoria.

## Orders

### `GET /api/orders`

Devuelve pedidos mock.

### `GET /api/orders/admin`

Devuelve todos los pedidos para admin.

### `GET /api/orders/pending-validation`

Devuelve pedidos pendientes.

### `POST /api/orders`

Crea un pedido mock.

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

Actualiza estado, precio, transporte o semana.

### `PUT /api/orders/:id/confirm`

Valida un pedido.

Body opcional:

```json
{
  "total_price": 650
}
```

### `PUT /api/orders/:id/reject`

Rechaza un pedido.

### `DELETE /api/orders/:id`

Cancela un pedido.

## Users

### `GET /api/users`

Lista usuarios.

### `POST /api/users`

Crea usuario.

### `GET /api/users/:id`

Obtiene usuario.

### `PUT /api/users/:id`

Actualiza usuario.

### `DELETE /api/users/:id`

Elimina usuario.

## Allowed Phones

### `GET /api/admin/phones`

Lista teléfonos permitidos.

### `POST /api/admin/phones`

Crea teléfono permitido.

Body:

```json
{
  "phone_number": "+34600111203",
  "phone_name": "Cliente demo"
}
```

### `PUT /api/admin/phones/:id`

Actualiza teléfono.

### `PATCH /api/admin/phones/:id/toggle`

Activa o desactiva teléfono.

Body:

```json
{
  "is_active": false
}
```

### `DELETE /api/admin/phones/:id`

Elimina teléfono.

## WhatsApp

### `GET /api/whatsapp/admin/config`

Devuelve configuración mock.

### `POST /api/whatsapp/admin/config`

Actualiza configuración mock.

### `GET /api/whatsapp/admin/baileys/status`

Devuelve estado de sesión.

### `POST /api/whatsapp/admin/baileys/start`

Simula inicio de sesión.

### `POST /api/whatsapp/admin/baileys/stop`

Simula parada de sesión.

### `POST /api/whatsapp/demo/process-message`

Simula recepción de mensaje de WhatsApp y crea pedido pendiente.

Body:

```json
{
  "wa_id": "+34600111203",
  "wa_name": "Cliente Demo",
  "message": "semana 26: 30 cajas solomillo +2,4 vaca, 18 cajas morcillo anojo"
}
```

## AI Orders

### `GET /api/ai-orders/pending`

Devuelve pedidos pendientes.

### `POST /api/ai-orders/parse`

Alias demo para simular parsing de mensaje.
