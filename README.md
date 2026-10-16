# Fundación Cielo, web-3

Next.js version of `fundacion-cielo-html-v2`: web-1 plus the 22 open fixes from
`../revision-ui-ux-fundacion-cielo-web-1.html`, "Horizonte" in the menu, and a looping video in the hero.
`fundacion-cielo-web-1` was not changed.

Stack: Next 16.4.0, React 19.3, Tailwind v4, GSAP 3.15, Lenis 1.3, Phosphor icons (TypeScript).

## Run it

```bash
npm install      # once
npm run dev      # http://localhost:3000
npm run build && npm run start -- -p 3003   # production check
```

## Where things live

- Copy: `src/content.ts` (verbatim from COPY.md; the video and menu labels are here too).
- Page: `src/app/page.tsx`. Styles and color blocks: `src/app/globals.css`.
- Motion: `src/components/` (`HeroMotion` also plays the video; `ScrollStage` handles smooth scroll, the color stage, the active menu item, anchor focus and deep links).
- Video: `public/video/hero-1080.mp4` (desktop, 2 MB) and `hero-720.mp4` (phones, 0.8 MB), no audio.
  Poster: `public/images/video-poster.jpg` (first frame, LCP image, carries the alt text).
  The 4K original sits in `media-source/`, excluded from git and from Vercel uploads.
  The encode script lives in `../fundacion-cielo-html-v2/src/encode-video.mjs` (`npm run video` there).

## Deploy

Vercel: `npx vercel` from this folder (framework detected as Next.js), then `npx vercel --prod`.

## Still pending

- **F1 (blocks launch):** "Sumate a la comunidad" still points at `#sumate`. Set `JOIN_HREF` in `src/content.ts`.
- Contact email (`CONTACT_EMAIL`), the three [PENDIENTE] copy items, photo and video licenses and consent, alt text review.
- Accepted overrides: endless hero rotation and looping video with no pause control (both fail WCAG 2.2.2), motion intensity, square corners, Space Grotesk.
- Lighthouse run and a real screen reader pass.
