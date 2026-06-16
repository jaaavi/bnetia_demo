# Case Study / Interview Answer

Este documento está pensado para contextualizar el proyecto cuando alguien revise el repositorio desde un proceso de selección.

## Respuesta de 3 líneas

```text
BNETIA Orders Platform — public demo of a production client app: [repo link] / [live demo link]
It manages B2B meat orders end-to-end: product catalogue, cart, admin validation, users, Excel price updates, allowed WhatsApp phones, and a WhatsApp/AI-assisted order flow.
I built the Vue/Vuetify frontend and Express-style backend architecture; the hardest technical decision was turning the real DB/WhatsApp-dependent system into a safe public Vercel demo while preserving the production routes, controllers, services and models.
```

## Contexto

BNETIA es una aplicación de pedidos mayoristas desarrollada para un cliente y actualmente planteada como sistema de producción.

El sistema real gestiona flujos como:

- Clientes que hacen pedidos desde panel.
- Administración que valida pedidos.
- Catálogo de productos y precios.
- Actualización de precios mediante Excel.
- Usuarios y roles.
- Teléfonos permitidos para el canal de WhatsApp.
- Entrada de pedidos por WhatsApp asistida por parsing/IA.

Este repositorio no expone datos reales ni credenciales. Es una demo pública que reproduce el flujo y la arquitectura con datos ficticios.

## Qué hace la demo

La demo permite probar el flujo completo:

- Crear pedidos desde un catálogo.
- Filtrar y revisar pedidos.
- Validar, rechazar o editar precios desde administración.
- Gestionar productos.
- Simular carga de Excel para actualizar precios.
- Exportar pedidos a Excel.
- Gestionar usuarios.
- Gestionar teléfonos permitidos.
- Simular una sesión de WhatsApp.
- Procesar un mensaje entrante y convertirlo en pedido pendiente.

## Mi rol

Mi rol cubrió el desarrollo de la aplicación full-stack:

- Construcción del frontend en Vue 3 y Vuetify.
- Diseño de vistas de pedidos, catálogo, administración y configuración.
- Implementación de una API estilo Express con rutas, controladores, modelos, servicios y middlewares.
- Integración del flujo de pedidos, productos, usuarios, precios, validaciones y WhatsApp.
- Preparación de una demo pública segura para Vercel.

## Decisión técnica más difícil

La decisión técnica más delicada fue convertir una aplicación dependiente de servicios reales en una demo pública segura sin que dejara de parecer el sistema real.

El sistema original depende de elementos que no deben exponerse públicamente:

- Base de datos.
- Credenciales.
- Sesión de WhatsApp.
- Datos de clientes.
- Flujos internos de producción.

Para resolverlo, la demo mantiene la arquitectura visible:

```text
api/index.js
server/routes
server/controllers
server/models
server/services
server/middlewares
server/data/mockStore.js
```

Pero sustituye las dependencias reales por mock data en memoria.

Además, para desplegar en Vercel Hobby, fue necesario dejar una única Serverless Function:

```text
api/index.js
```

El resto del backend vive en `server/`, de forma que Vercel no cree una función por cada archivo, pero el proyecto siga mostrando una organización cercana a producción.

## Por qué no usa datos reales

Esta demo está pensada para ser pública. Por eso:

- No usa base de datos real.
- No incluye secretos.
- No conecta con WhatsApp real.
- No muestra clientes reales.
- No persiste información sensible.

La intención es enseñar criterio técnico, arquitectura y experiencia de producto sin comprometer información privada.

## Cómo explicarlo en entrevista

Una forma natural de explicarlo:

> This is a public demo of a real client ordering platform. The production version uses real persistence and integrations, but this repo replaces them with mock data so the whole flow can be tested safely. I kept the production-like architecture because I wanted reviewers to see not only the UI, but also how I organize routes, controllers, services, models and deployment constraints.

## Qué mirar en el repositorio

Archivos recomendados:

- `src/App.vue`: experiencia principal de la demo.
- `api/index.js`: única entrada serverless para Vercel.
- `server/routes`: definición de endpoints.
- `server/controllers`: lógica HTTP.
- `server/models`: acceso a datos mock.
- `server/services`: simulaciones de WhatsApp, IA y Excel.
- `server/data/mockStore.js`: datos ficticios iniciales.

## Limitaciones de la demo

La demo no pretende sustituir producción.

Limitaciones conocidas:

- El estado es en memoria.
- Los datos pueden reiniciarse.
- WhatsApp es simulado.
- La IA/parsing es mock.
- La autenticación es demo.

Estas limitaciones son intencionadas para que el proyecto sea seguro y fácil de desplegar públicamente.
