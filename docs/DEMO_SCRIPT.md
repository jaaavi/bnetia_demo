# Guion de Demo

Este guion está pensado para enseñar el proyecto en una entrevista, revisión técnica o presentación rápida.

## 1. Entrada al producto

Abre la app desplegada en Vercel o en local.

Mensaje recomendado:

> Esta demo replica el flujo de BNETIA con datos ficticios. No necesita base de datos ni WhatsApp real, pero conserva la estructura de frontend y backend que usaría en producción.

## 2. Hacer pedido

En la pestaña `Hacer pedido`:

1. Busca `solomillo`.
2. Añade cajas a uno o varios productos.
3. Cambia transporte.
4. Cambia semana.
5. Confirma pedido.

Qué mostrar:

- Catálogo.
- Búsqueda.
- Carrito.
- Creación de pedido pendiente.

## 3. Pedidos

En la pestaña `Pedidos`:

1. Filtra por `Pendiente`.
2. Filtra por `WhatsApp` o `Panel`.
3. Edita precio de un pedido pendiente.
4. Exporta Excel.

Qué mostrar:

- Estados.
- Origen de pedido.
- Exportación real con `xlsx`.

## 4. Administración

En `Administrar > Validar pedidos`:

1. Valida un pedido.
2. Rechaza otro si existe.
3. Edita precio antes de validar.

Qué mostrar:

- Flujo administrativo.
- Separación entre pedido pendiente y validado.

## 5. Productos

En `Administrar > Productos`:

1. Añade un producto.
2. Edita su precio.
3. Elimina un producto.
4. Usa `Actualizar precios` para simular carga de Excel.

Qué explicar:

- En producción esta parte conectaría con la subida real de Excel.
- En la demo se actualizan precios en memoria.

## 6. Usuarios

En `Administrar > Usuarios`:

1. Crea un usuario.
2. Cambia rol.
3. Simula reset de contraseña.
4. Elimina usuario.

Qué explicar:

- La API mock mantiene rutas y controladores reales.
- La autenticación está simplificada con usuario admin demo.

## 7. Teléfonos permitidos

En `Administrar > Teléfonos`:

1. Añade un número con prefijo internacional.
2. Activa/desactiva un teléfono.
3. Elimina un teléfono.

Qué explicar:

- Esto representa la whitelist usada por el bot de WhatsApp.

## 8. WhatsApp Bot

En `Administrar > WhatsApp bot`:

1. Conecta sesión.
2. Muestra QR demo.
3. Procesa mensaje entrante.

Mensaje de ejemplo:

```text
Buenos días, semana 26:
30 cajas solomillo +2,4 vaca
18 cajas morcillo anojo
12 cajas carne picada especial vaca
Transporte en camión
```

Qué explicar:

- El servicio mock interpreta el mensaje.
- Se genera un pedido pendiente.
- El admin lo valida después.

## 9. Arquitectura

Abre el repo y enseña:

```text
api/routes
api/controllers
api/models
api/services
api/middlewares
api/data/mockStore.js
```

Frase útil:

> La demo no es solo una pantalla estática: conserva la forma de una API real, con capas separadas. La diferencia es que los modelos apuntan a memoria en lugar de MySQL.

## 10. Cierre

Puntos fuertes para remarcar:

- Deploy simple en Vercel.
- Sin secretos ni credenciales.
- Datos ficticios seguros.
- Arquitectura cercana a producción.
- Flujo completo navegable.
