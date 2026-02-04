# doc-extract-poc

A small **Document Extractor** UI built with **React + TypeScript + Vite**.

It lets you upload a PDF (or image), sends it to an API endpoint for extraction, then displays the extracted result as formatted JSON with a **Copy** button.

## Features

- Upload via click or drag-and-drop (PDF + images)
- Calls extraction API: `POST /documents/extract` (multipart form-data)
- Results panel with:
  - JSON syntax highlighting
  - Copy-to-clipboard (with “Copied” feedback)
  - Clear results (keeps the selected file)
  - Reset all (clears file + results)
- Unit tests with Vitest + Testing Library

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Axios
- Vitest + @testing-library/react

## Requirements

- Node.js + npm
- A running backend that implements the extraction route (see **Backend API** below)

## Setup

1) Install dependencies

```bash
npm install
```

2) Configure environment

This project uses Vite env vars.

Create/update `.env` in the project root:

```bash
VITE_API_ENDPOINT=http://localhost:3000/api
```

> Note: the client will post to `${VITE_API_ENDPOINT}/documents/extract`.

3) Run the app

```bash
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

## Scripts

- `npm run dev` — start local dev server
- `npm run build` — type-check + production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint
- `npm test` — run Vitest in watch mode
- `npm run test:run` — run tests once (CI mode)
- `npm run test:ui` — Vitest UI

## Backend API

The frontend expects an API that supports:

- **POST** `${VITE_API_ENDPOINT}/documents/extract`
- `Content-Type: multipart/form-data`
- Form field name: `document`

Expected response shape (used by the UI):

```json
{
  "success": true,
  "data": { "any": "json" }
}
```

If `success` is falsey (or the request fails), the UI shows an error toast and clears results.

## Folder Structure

High-level layout:

```text
.
├─ public/
├─ src/
│  ├─ __test__/                 # Vitest + Testing Library tests
│  │  ├─ setup.ts               # jest-dom setup
│  │  ├─ *.test.ts(x)
│  ├─ components/
│  │  ├─ layout/                # Layout components (e.g., Navbar, Wrapper)
│  │  └─ ui/                    # Reusable UI primitives (Button, etc.)
│  ├─ features/
│  │  └─ document-extractor/
│  │     ├─ components/         # Feature components (FileUpload, JsonViewer)
│  │     └─ useDocumentExtractor.ts
│  ├─ pages/                    # Page-level components
│  ├─ services/                 # API clients (axios)
│  │  └─ api.ts
│  ├─ lib/                      # Small utilities (e.g., cn())
│  ├─ App.tsx
│  └─ main.tsx
├─ .env
├─ vite.config.ts               # includes @ alias to ./src
└─ package.json
```

Notes:

- Import alias: `@` resolves to `./src` (configured in `vite.config.ts`).
- The primary page is `src/pages/DocumentExtractorPage.tsx`.
- The main feature logic lives in `src/features/document-extractor/useDocumentExtractor.ts`.

## Testing

Run tests in watch mode:

```bash
npm test
```

Run once:

```bash
npm run test:run
```

## Build

```bash
npm run build
npm run preview
```
