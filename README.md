# Rupali — Data Science & Analytics Portfolio

A responsive single-page portfolio built with React + Vite and plain CSS. No paid
services, no API keys required to run it.

## Run it locally

Requirements: [Node.js](https://nodejs.org) 18 or newer (includes npm).

```bash
# 1. install dependencies
npm install

# 2. start the dev server
npm run dev
```

Then open the URL it prints (usually **http://localhost:5173**) in your browser.

Other commands:

```bash
npm run build     # production build, output in dist/
npm run preview   # serve the production build locally to check it
```

## Project structure

```
src/
  App.jsx                 page layout: Header, Hero, About, Projects, Skills, Contact, Footer
  index.css                theme variables, resets, reveal/reduced-motion rules
  components/
    Header.jsx / .css      sticky nav, smooth-scroll links, mobile menu
    Hero.jsx / .css        headline, intro, CTA buttons, animated visual
    ParticleField.jsx      canvas particle background (cyan/violet, drifting + pulsing)
    DataTrails.jsx / .css  curved glowing trail lines behind the dashboard visual
    RevenueChart.jsx / .css  SVG line chart that draws/holds/resets on a loop, + KPI counters
    About.jsx / .css
    Skills.jsx / .css
    Projects.jsx / .css
    ProjectCard.jsx / .css project cards with animated mini sparkline previews
    Contact.jsx / .css     validated contact form
    Footer.jsx / .css
  data/
    projects.js            sample project cards — replace with your own
    skills.js               sample skills list — replace with your own
  hooks/
    useReducedMotion.js     tracks prefers-reduced-motion live
    useScrollReveal.js      IntersectionObserver fade-in on scroll
    useCountUp.js            animates a number up to a target
  lib/
    scroll.js               smooth-scroll-to-section helper (header-offset aware)
```

## Replacing the sample content

- **Projects** — edit `src/data/projects.js`. Each entry has a title, tag, description,
  tech stack, a small `spark` array (0–1 values) that draws the card's mini chart, and a
  `link`.
- **Skills** — edit `src/data/skills.js`.
- **Revenue chart numbers** — edit the `MONTHLY_REVENUE` and `KPIS` arrays near the top of
  `src/components/RevenueChart.jsx`.
- **About text, headline, intro copy** — edit directly in `About.jsx` and `Hero.jsx`.

## Contact form — connecting a real email service

Out of the box, the contact form **validates fields locally and shows an honest success
message** ("looks good, but this demo isn't wired to a real inbox yet") — it does not fake
sending an email, since no email service is configured.

To actually deliver messages:

1. Create a free form endpoint, e.g. at [Formspree](https://formspree.io) (or build your
   own small backend that accepts a JSON POST of `{ name, email, message }`).
2. Copy `.env.example` to `.env` and set:
   ```
   VITE_CONTACT_ENDPOINT=https://formspree.io/f/your-form-id
   ```
3. Restart `npm run dev`. The form will now POST real submissions to that endpoint and
   show the "message sent" success state.

## Animation & accessibility notes

- All continuous motion (particle field, data trails, chart draw-loop, card sparklines)
  is implemented in plain CSS/canvas/SVG — no video assets.
- Everything respects `prefers-reduced-motion`: with it enabled, the particle field and
  chart render a single static frame, trail/sparkline loops stop, scroll-reveal shows
  content immediately, and KPI counters display their final value without animating.
- Keyboard focus is visible on all interactive elements (nav links, buttons, form fields).
- The page uses semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and a
  skip-to-content link.
