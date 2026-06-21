# Monika Jadhav — Full Stack .NET Developer Portfolio

> **Phase 1 Complete**: Project Structure · Routing · Loading Screen · Navbar · Hero Section

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Angular 19 (Standalone Components) |
| Language | TypeScript |
| Styling | SCSS + Bootstrap 5 |
| Icons | Font Awesome 6 |
| Animations | Angular Animations + CSS |
| Fonts | DM Serif Display · DM Sans · JetBrains Mono |

## 📁 Project Structure (Phase 1)

```
src/
├── app/
│   ├── components/
│   │   ├── loading/          ← Animated loading screen
│   │   │   ├── loading.component.ts
│   │   │   ├── loading.component.html
│   │   │   └── loading.component.scss
│   │   ├── navbar/           ← Fixed premium navbar
│   │   │   ├── navbar.component.ts
│   │   │   ├── navbar.component.html
│   │   │   └── navbar.component.scss
│   │   └── hero/             ← Hero section with typing animation
│   │       ├── hero.component.ts
│   │       ├── hero.component.html
│   │       └── hero.component.scss
│   ├── pages/
│   │   └── home/             ← Lazy-loaded home page
│   ├── app.component.ts      ← Root component
│   ├── app.config.ts         ← App configuration
│   └── app.routes.ts         ← Routing
├── styles.scss               ← Global design system & utilities
└── index.html                ← HTML shell with font imports
```

## 🛠️ Setup & Development

```bash
# Install dependencies
npm install

# Development server
ng serve

# Open http://localhost:4200

# Production build
ng build --configuration=production
```

## 🌍 Deployment

### Netlify
```bash
ng build --configuration=production
# Deploy dist/monika-portfolio/browser to Netlify
```

### GitHub Pages
```bash
npm install -g angular-cli-ghpages
ng build --configuration=production --base-href=/monika-portfolio/
npx angular-cli-ghpages --dir=dist/monika-portfolio/browser
```

### Vercel
```bash
# vercel.json already included
vercel --prod
```

## ✅ Phase 1 Features

- [x] **Loading Screen** — Animated spinner with progress bar & status messages
- [x] **Fixed Navbar** — Glass-morphism on scroll, mobile hamburger menu, active section tracking
- [x] **Hero Section** — Typing animation, floating profile card, stats grid, CTA buttons
- [x] **Global Design System** — CSS variables, utility classes, animations, typography
- [x] **Responsive** — Mobile, tablet, desktop, large screens

## 🗺️ Coming in Phase 2

- [ ] About Section
- [ ] Skills Section (animated cards)
- [ ] Experience Timeline
- [ ] Projects Grid
- [ ] AI Tools Section

---

Built with ❤️ using Angular 19 · Bootstrap 5 · SCSS
