# My Granular SSR App

The same Granular app as the SPA template — with server-side rendering powered by Express + Vite SSR.

## Getting started

```bash
npm run dev       # Start dev server with SSR + HMR
npm run build     # Build for production (client + server)
npm run serve     # Run production server
npm run preview   # Build + serve
```

## Project structure

```
├── server.js               Express server (dev + production)
├── index.html              HTML shell with <!--app-html--> placeholder
├── vite.config.js
└── src/
    ├── entry-client.js     Client entry — mounts the router
    ├── entry-server.js     Server entry — renders to string
    ├── router.js           Hash router (Home + About)
    ├── styles.css
    ├── layouts/
    │   └── app.layout.js   App shell with nav and theme toggle
    ├── pages/
    │   ├── home.page.js    Task list with add, edit, toggle, reorder
    │   └── about.page.js   About page with feature list
    ├── components/
    │   └── todo-item.component.js
    └── stores/
        └── todo.store.js   Persisted todo store (localStorage on client, memory on server)
```

## How it works

1. **Server** renders the initial page to HTML via `renderToString()` — crawlers see full content
2. The complete HTML is sent as the response — no blank page, instant paint
3. **Client** mounts the router, which takes over and enables full interactivity
4. From that point on, the app works exactly like the SPA version
