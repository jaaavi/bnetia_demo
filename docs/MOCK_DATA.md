# Mock Data

All initial fictitious data lives in:

```text
server/data/mockStore.js
```

## Products

Included examples:

- Solomillo +2,4
- Solomillo +2
- Morcillo
- Carne picada especial
- Lomo bajo
- Tapa
- Aguja
- Carrillera

Each product includes:

- `id`
- `priceId`
- `name`
- `description`
- `type`
- `price`

## Users

Initial users:

- Admin Demo
- Carnicería La Plaza
- Restaurante El Mercado

Fields:

- `id`
- `name`
- `email`
- `role`
- `phone`

## Orders

Initial orders:

- One pending WhatsApp order.
- One delivered order created from the panel.

Main fields:

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

## Allowed Phones

Includes fictitious numbers with active/inactive states.

Fields:

- `id`
- `phone_number`
- `phone_name`
- `is_active`
- `created_at`

## WhatsApp State

```js
{
  connected: false,
  provider: 'whatsapp-web',
  phone_number: '+34600111222'
}
```

## Reset Data

From the API:

```bash
curl -X POST /api/demo/reset
```

From the UI:

Use the reset data action (`Reiniciar datos` in the current UI).

## Change Initial Data

Edit `server/data/mockStore.js`.

Recommendations:

- Keep IDs unique.
- Keep `priceId` unique per product.
- Use compatible statuses: `Pendiente`, `Validado`, `Enviado`, `Entregado`, `Cancelado`, `Rechazado`.
- Use compatible types: `COW/VACA`, `YB/ANOJO`.
