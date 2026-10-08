# Sara Suha — Portfolio

Personal design portfolio for Sara Suha, built with Next.js 16 (App Router), React 19 and TypeScript. Styling is plain CSS Modules, and smooth scrolling comes from [Lenis](https://github.com/darkroomengineering/lenis).

## Projects

| # | Project | Description | Case study |
|---|---------|-------------|------------|
| 01 | Mello | AI-powered mental health companion | `/work/mello` |
| 02 | Google Maps Redesign | Safer, more readable navigation for driving at night | Coming soon |
| 03 | voyAIge | AI that turns scattered travel research into an itinerary you can adapt | Coming soon |
| 04 | MuseMap | Discovering art, one place at a time | Coming soon |

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
|--------|--------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Structure

```
src/
  app/
    page.tsx              Landing page (hero, work, about, contact)
    work/[slug]/page.tsx  Case study route
    not-found.tsx         404 page
  components/
    home/                 Landing page sections
    collage/              Hero collage pieces
    case/                 Shared case study layout + per-project studies
  data/
    projects.ts           Project list, card and preview config
    site.ts               Name, contact links and nav
public/
  images/                 Landing and case study images (webp)
  icons/                  SVG icons
```

## Editing content

- **Contact links and resume:** update `src/data/site.ts`. The email, LinkedIn and Behance values there are still placeholders. The resume is expected at `public/resume.pdf`.
- **Project cards:** update `src/data/projects.ts`.
- **Adding a case study:** create a component under `src/components/case/<slug>/` and register it in the `studies` map in `src/app/work/[slug]/page.tsx`. Only registered slugs get a page.
