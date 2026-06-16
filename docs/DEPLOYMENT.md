# Despliegue en Vercel

Esta demo está preparada para desplegarse como proyecto independiente en Vercel.

## Requisitos

- Node.js 20 o superior recomendado.
- Cuenta de Vercel.
- Repositorio en GitHub, GitLab o Bitbucket.

## Configuración de Vercel

Al importar el proyecto:

| Campo | Valor |
| --- | --- |
| Framework Preset | Vite |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

No hacen falta variables de entorno.

## Rutas

`vercel.json` define:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index.js"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Esto permite:

- Servir la aplicación Vue como SPA.
- Servir la API mock en `/api/*`.

## Build local

Antes de subir:

```bash
npm install
npm run build
```

## Prueba local de la API

Vite por sí solo no ejecuta la función serverless de Vercel. Para probar la API manualmente:

```bash
node -e "import app from './api/index.js'; app.listen(7099, () => console.log('API demo http://localhost:7099/api'))"
```

Luego:

```bash
curl http://localhost:7099/api/products/with-prices
```

## Qué subir a GitHub

Sube:

- `api/`
- `docs/`
- `public/`
- `src/`
- `index.html`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `vercel.json`
- `vite.config.ts`
- `README.md`
- `.gitignore`

No subas:

- `node_modules/`
- `dist/`
- `.vercel/`
- `.env`

La `.gitignore` ya está preparada para esto.

## Limitaciones en Vercel

La demo usa memoria dentro de funciones serverless.

Esto significa:

- Los datos pueden reiniciarse entre ejecuciones.
- No hay persistencia real.
- No hay autenticación real.
- No hay WhatsApp real.
- No hay IA externa real.

Estas limitaciones son intencionales para mantener la demo segura, gratuita y fácil de desplegar.
