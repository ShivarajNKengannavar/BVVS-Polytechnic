# BVVS Polytechnic — Angular Frontend

## Tech Stack
- **Framework**: Angular 17 (Standalone Components)
- **Language**: TypeScript
- **Styling**: SCSS (structured partials)
- **Fonts**: Playfair Display · Nunito Sans · DM Mono

## Structure
```
src/
├── app/
│   ├── components/shared/    # Navbar, Footer
│   ├── guards/               # AdminGuard
│   ├── pages/                # All page components
│   │   ├── admin/            # Login + Dashboard
│   │   ├── home/
│   │   ├── about/
│   │   └── ... (17 pages)
│   ├── services/             # API, AdminAuth, AdminApi
│   ├── app.component.*       # Root shell
│   ├── app.config.ts         # Providers
│   └── app.routes.ts         # All routes
├── styles/                   # SCSS partials
│   ├── _variables.scss       # Design tokens
│   ├── _mixins.scss          # Reusable helpers
│   ├── _base.scss            # Reset + global styles
│   └── _components.scss      # Shared component styles
├── assets/
│   ├── styles/bvvs-design.css  # Legacy CSS (migrating)
│   ├── videos/               # Campus video
│   └── docs/                 # PDFs
├── environments/
│   ├── environment.ts        # Dev (proxied API)
│   └── environment.prod.ts   # Prod
├── index.html
├── main.ts
└── styles.scss               # Entry point
```

## Every Component = 3 Files
```
component-name/
  component-name.component.ts    ← Class + logic only
  component-name.component.html  ← Template only
  component-name.component.scss  ← Styles only
```

## Run
```bash
npm install
npm start          # http://localhost:4200
```

## Admin Panel
- URL: http://localhost:4200/admin/login
- Default: admin / bvvs@2025
