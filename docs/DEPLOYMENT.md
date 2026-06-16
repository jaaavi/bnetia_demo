# Vercel Deployment

This demo is prepared to be deployed as an independent Vercel project.

## Requirements

- Node.js 20 or higher recommended.
- Vercel account.
- Repository on GitHub, GitLab, or Bitbucket.

## Vercel Configuration

When importing the project:

| Field | Value |
| --- | --- |
| Framework Preset | Vite |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

No environment variables are required.

## Routes

`vercel.json` defines:

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

This allows:

- Serving the Vue application as a SPA.
- Serving the mock API under `/api/*`.

## Local Build

Before deploying:

```bash
npm install
npm run build
```

## Local API Test

Plain Vite does not execute Vercel serverless functions. To test the API manually:

```bash
node -e "import app from './api/index.js'; app.listen(7099, () => console.log('API demo http://localhost:7099/api'))"
```

Then:

```bash
curl http://localhost:7099/api/products/with-prices
```

## What to Push to GitHub

Push:

- `api/`
- `server/`
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

Do not push:

- `node_modules/`
- `dist/`
- `.vercel/`
- `.env`

The `.gitignore` file is already configured for this.

## Vercel Limitations

The demo uses memory inside serverless functions.

This means:

- Data may reset between executions.
- There is no real persistence.
- There is no real authentication.
- There is no real WhatsApp connection.
- There is no external AI service.

These limitations are intentional to keep the demo safe, free to deploy, and easy to review.

## Hobby Plan Serverless Function Limit

The Vercel Hobby plan limits the number of serverless functions. This demo therefore uses a single function:

```text
api/index.js
```

The mock backend architecture lives outside `api/`:

```text
server/
```

Do not move `server/routes`, `server/controllers`, `server/models`, `server/services`, or `server/middlewares` into `api/`, because Vercel may count them as additional serverless functions.
