# Inst

> Instagram clone with supabase auth, CRUD operations and media uploads.

**Stack:** Vue 3 Composition Api, TypeScript, Tanstack Query, Pinia, Vue-router, Vee-validate, Supabase, Feature-Sliced Design, Shadcn-vue UI components

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Project Structure](#architecture--project-structure)
- [Quick Start](#quick-start)
- [Scripts](#scripts)

---

## Features

| Area | What's implemented |
|------|-------------------|
| **Authentication** | Auth via Supabase Auth, protected routes with guards |
| **Subscriptions** | CRUD via Tanstack Query search and filters via URL params |
| **Media** | Upload post photos to Supabase Storage with Zod validation |
| **UI/UX** | Dark / light / system theme, custom drawer menus, embla-carousel-vue, toast errors |
| **Forms** | Vee-validate + Zod, controlled fields |

---

## Tech Stack

### Core

| Category | Technologies |
|----------|-------------|
| **Framework** | [Vue 3](https://vuejs.org/) |
| **Language** | [TypeScript (strict)](https://www.typescriptlang.org/) |
| **Navigation** | [Vue-Router](https://router.vuejs.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **UI primitives** | [Shadcn-vue UI](https://www.shadcn-vue.com/), [Lucide-vue Icons](https://lucide.dev/guide/vue/) |
| **Build Tool** | [Vite](https://vite.dev/) |

### Data & State

| Category | Technologies |
|----------|-------------|
| **API** | [Tanstack Query](https://www.apollographql.com/docs/react/) + REST API |
| **Auth & Storage** | [Supabase JS](https://supabase.com/docs) |
| **Server state** | [TanStack Query 5](https://tanstack.com/query) |
| **Client state** | [Pinia 3](https://pinia.vuejs.org/) — auth session |
| **Forms Validation** | [Vee-validate 4](https://vee-validate.logaretm.com/v4/) |


### Developer Tooling

ESLint 10 (flat config) · TypeScript ESLint strict · Prettier · Husky · Lint-staged

---

## Architecture & Project Structure

The project follows **[Feature-Sliced Design (FSD)](https://feature-sliced.design/)**. Layers are isolated: upper layers import only from lower ones.

```
inst/
├── src/
│   ├── app                  # Routes, global styles (design tokens (light/dark)), global config
│   ├── pages/               # Screens (features + widgets composition)
│   ├── widgets/             # App sidebar, layouts, footer
│   ├── features/            # User scenarios (auth, post crud operations, …)
│   ├── entities/            # post, user (api, queries, types, config)
│   └── shared/
│       ├── api/             # Supabase client, Tanstack query client, Api client, auth and storage api
│       ├── config/          # Shared config
│       ├── ui/              # UI kit (~30 components)
│       ├── lib/             # utils, predicates
│       └── model/           # Shared types
│
└── eslint.config.ts         # Strict lint rules
```

---

## Quick Start

### Requirements

- Node.js LTS
- npm

### Installation

```bash
git clone <repository-url>
cd inst
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL=<your-base-url>
VITE_SUPABASE_API_URL=<supabase-project-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<supabase-anon-key>
VITE_SUPABASE_BUCKET_ID=<storage-bucket-id>
```

> The backend (REST API + Supabase) is not included in this repository — the app is designed to connect to an external API.

### Running the App

```bash
npm run dev
```

### Admin credentials:

Login: create7321@gmail.com 
Password: Inst123@

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run lint:fix` | ESLint + Prettier with auto-fix |
| `npm run tsc` | Type check without emit |
| `npm run build` | Build app |

---
