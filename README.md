# IoT Platform Demo

A React 19 + Vite single-page application for IoT device management, built with Mantine UI, Redux Toolkit, and React Query.

---

## Tech Stack

| Layer | Library |
|---|---|
| UI Framework | React 19, Mantine 9 |
| Build Tool | Vite 6 |
| State Management | Redux Toolkit |
| Server State | TanStack React Query v5 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4, PostCSS |
| HTTP Client | Axios |

---

## Local Development

### Prerequisites

- Node.js >= 20.x
- npm >= 10.x

### Setup

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Lint source files |
| `npm run lint:fix` | Auto-fix lint errors |

---

## Production Build

```bash
npm run build
```

Output is written to `dist/`. The `index.html` entry point and all hashed assets are placed there by Vite.

---

## Cloudflare Pages Setup

### 1. Create a Cloudflare Pages project

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages → Create → Pages → Connect to Git** (or use the Direct Upload option for CI-driven deploys).
3. Note your **Account ID** from the dashboard URL or the right-hand panel.

### 2. Create a Cloudflare API Token

1. Go to **My Profile → API Tokens → Create Token**.
2. Use the **Edit Cloudflare Workers** template, or create a custom token with the following permissions:
   - Account → Cloudflare Pages → Edit
3. Copy the generated token — you will need it as a pipeline secret.

---

## Azure DevOps Pipeline

### Required Pipeline Variables / Secrets

Add the following as **secret variables** in your Azure DevOps pipeline or Variable Group (mark each as secret):

| Variable | Description |
|---|---|
| `CLOUDFLARE_API_TOKEN` | API token created in the step above |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID |
| `CF_PAGES_PROJECT_NAME` | The name of your Cloudflare Pages project |

> Store these under **Pipelines → Library → Variable Groups** and link the group to the pipeline, or define them directly in the pipeline UI as secret variables.

### `azure-pipelines.yml`

Create this file in the repository root:

```yaml
trigger:
  branches:
    include:
      - main
      - develop

pr:
  branches:
    include:
      - main

pool:
  vmImage: ubuntu-latest

variables:
  NODE_VERSION: '20.x'

stages:
  - stage: Build
    displayName: Build
    jobs:
      - job: BuildJob
        displayName: Install & Build
        steps:
          - checkout: self
            fetchDepth: 0

          - task: NodeTool@0
            displayName: Use Node.js $(NODE_VERSION)
            inputs:
              versionSpec: $(NODE_VERSION)

          - script: npm ci
            displayName: Install dependencies

          - script: npm run lint
            displayName: Lint

          - script: npm run build
            displayName: Vite build

          - publish: dist
            artifact: dist
            displayName: Publish dist artifact

  - stage: Deploy
    displayName: Deploy to Cloudflare Pages
    dependsOn: Build
    condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
    jobs:
      - deployment: DeployPages
        displayName: Deploy
        environment: cloudflare-pages
        strategy:
          runOnce:
            deploy:
              steps:
                - download: current
                  artifact: dist
                  displayName: Download dist artifact

                - task: NodeTool@0
                  displayName: Use Node.js $(NODE_VERSION)
                  inputs:
                    versionSpec: $(NODE_VERSION)

                - script: npm install -g wrangler
                  displayName: Install Wrangler CLI

                - script: |
                    wrangler pages deploy $(Pipeline.Workspace)/dist \
                      --project-name=$(CF_PAGES_PROJECT_NAME) \
                      --branch=main \
                      --commit-dirty=true
                  displayName: Deploy to Cloudflare Pages
                  env:
                    CLOUDFLARE_API_TOKEN: $(CLOUDFLARE_API_TOKEN)
                    CLOUDFLARE_ACCOUNT_ID: $(CLOUDFLARE_ACCOUNT_ID)
```

### Branch Strategy

| Branch | Stage | Cloudflare Environment |
|---|---|---|
| `main` | Build + Deploy | Production (`main` branch alias) |
| `develop` | Build only | — (extend pipeline to deploy as preview if needed) |
| Pull Request | Build + Lint | — |

### Preview Deployments (optional)

To deploy feature branches as Cloudflare preview URLs, add a second deploy job scoped to non-`main` branches and pass `--branch=$(Build.SourceBranchName)` to `wrangler pages deploy`. Cloudflare will automatically generate a unique preview URL per branch.

---

## Environment Variables at Runtime

Vite embeds environment variables at **build time** via `import.meta.env`. Create the appropriate `.env` file before running `npm run build`:

| File | Purpose |
|---|---|
| `.env` | Defaults (committed) |
| `.env.production` | Production overrides (committed, no secrets) |
| `.env.local` | Local overrides (git-ignored) |

In the pipeline, inject secrets as build-time variables before the build step:

```yaml
- script: npm run build
  displayName: Vite build
  env:
    VITE_API_BASE_URL: $(VITE_API_BASE_URL)
```

All variables exposed to the browser **must** be prefixed with `VITE_`.
