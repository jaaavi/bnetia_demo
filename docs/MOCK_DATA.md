# Datos Mock

Todos los datos ficticios iniciales están en:

```text
server/data/mockStore.js
```

## Productos

Ejemplos incluidos:

- Solomillo +2,4
- Solomillo +2
- Morcillo
- Carne picada especial
- Lomo bajo
- Tapa
- Aguja
- Carrillera

Cada producto incluye:

- `id`
- `priceId`
- `name`
- `description`
- `type`
- `price`

## Usuarios

Usuarios iniciales:

- Admin Demo
- Carnicería La Plaza
- Restaurante El Mercado

Campos:

- `id`
- `name`
- `email`
- `role`
- `phone`

## Pedidos

Pedidos iniciales:

- Un pedido pendiente de WhatsApp.
- Un pedido entregado creado desde panel.

Campos principales:

- `id`
- `user_id`
- `user_name`
- `user_phone`
- `origin`
- `status`
- `created_at`
- `week_number`
- `transport_medium`
- `total_price`
- `items`

## Teléfonos permitidos

Incluye números ficticios con estados activo/inactivo.

Campos:

- `id`
- `phone_number`
- `phone_name`
- `is_active`
- `created_at`

## Estado WhatsApp

```js
{
  connected: false,
  provider: 'whatsapp-web',
  phone_number: '+34600111222'
}
```

## Reiniciar datos

Desde API:

```bash
curl -X POST /api/demo/reset
```

Desde UI:

Usa el botón `Reiniciar datos`.

## Cambiar los datos iniciales

Edita `server/data/mockStore.js`.

Recomendación:

- Mantén IDs únicos.
- Mantén `priceId` único por producto.
- Usa estados compatibles: `Pendiente`, `Validado`, `Enviado`, `Entregado`, `Cancelado`, `Rechazado`.
- Usa tipos compatibles: `COW/VACA`, `YB/ANOJO`.
