# Fundación Cielo, web-4

web-3 plus three accessibility fixes (October 2026). `fundacion-cielo-web-3` was not changed.

1. **Pause button (WCAG 2.2.2).** "Pausar animación" / "Reanudar animación", bottom right of the hero,
   stops the video and the rotating title together. Under reduced motion nothing moves: the title shows
   the whole sentence, the video never loads and the button is hidden.
2. **Reflow (WCAG 1.4.10).** No sideways scroll at 320px or with text enlarged to 200%: long words in
   headings may break (hyphenated on narrow screens) and the stat figures shrink and wrap on phones.
3. **Contrast while scrolling (WCAG 1.4.3).** The web-3 color stage (body color tweening behind
   transparent sections) put a section's text on the previous section's color whenever two shared the
   screen. Sections are solid color blocks with hard edges.

Layout and copy updates (21 Oct 2026, user requests): new hero and El espacio copy (COPY.md updated);
the hero title sits at the top of its row, level with the text, with the rotating word tight under the lead; the El espacio title spans the
section in three set lines (48/60/68px by width) with lead and cards below; the Horizonte phrase is set
in the four lines the user chose, at the original 7.5vw; the word wall circles are 10% larger (44/70px); the footer stays stacked until 1024px.

Checked: axe-core 4.10.3 (WCAG 2.0 to 2.2 A/AA) reports 0 violations; text contrast is 7.03:1 or higher at
every scroll position, light and dark, desktop and 320px.

Based on web-3, the Next.js version of `fundacion-cielo-html-v2`: web-1 plus the 22 open fixes from
`../revision-ui-ux-fundacion-cielo-web-1.html`, "Horizonte" in the menu, and a looping video in the hero.

Stack: Next 16.4.0, React 19.3, Tailwind v4, GSAP 3.15, Lenis 1.3, Phosphor icons (TypeScript).

## Run it

```bash
npm install      # once
npm run dev      # http://localhost:3000
npm run build && npm run start -- -p 3004   # production check
```

## Where things live

- Copy: `src/content.ts` (verbatim from COPY.md; the video and menu labels are here too).
- Page: `src/app/page.tsx`. Styles and color blocks: `src/app/globals.css`.
- Motion: `src/components/` (`HeroMotion` also plays the video; `HeroPause` shares the pause state; `ScrollStage` handles smooth scroll, the active menu item, anchor focus and deep links).
- Video: `public/video/hero-1080.mp4` (desktop, 2 MB) and `hero-720.mp4` (phones, 0.8 MB), no audio.
  Poster: `public/images/video-poster.jpg` (first frame, LCP image, carries the alt text).
  The 4K original sits in `media-source/`, excluded from git and from Vercel uploads.
  The encode script lives in `../fundacion-cielo-html-v2/src/encode-video.mjs` (`npm run video` there).

## Deploy

Vercel: `npx vercel` from this folder (framework detected as Next.js), then `npx vercel --prod`.

## Still pending

- **F1 (blocks launch):** "Sumate a la comunidad" still points at `#sumate`. Set `JOIN_HREF` in `src/content.ts`.
- Contact email (`CONTACT_EMAIL`), the three [PENDIENTE] copy items, photo and video licenses and consent, alt text review.
- Accepted overrides: motion intensity, square corners, Space Grotesk. (The web-3 overrides on WCAG 2.2.2 are resolved here.)
- Before claiming WCAG 2.2 AA: tab through the page to confirm the fixed header never covers a focused element (2.4.11), and do a VoiceOver pass.
- Lighthouse run and a real screen reader pass.
