"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";

/**
 * Page-level scroll engine, mounted once at the end of the page.
 * 1. Lenis smooth scroll synced to the GSAP ticker (skipped under reduced motion).
 * 2. Anchors move focus with the scroll (review A4); the logo goes to the top (review N4).
 * 3. Color stage: the body background tweens to the color block of whichever
 *    section sits in the middle of the viewport; under reduced motion the switch is instant.
 * 4. Active section in the menu (review N3).
 * 5. A deep link (/#horizonte) lands on its section once pins and images settle (review N2).
 *
 * Mounted after the sections on purpose: its effect runs after HorizontalPan has
 * pinned, so the triggers below measure the page with the pin spacer in place.
 * refreshPriority -1 keeps that order on later refreshes too (resize, breakpoints).
 */
export function ScrollStage() {
  useEffect(() => {
    const reduce = !window.matchMedia(MOTION_OK).matches;
    const root = document.documentElement;
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!reduce) {
      lenis = new Lenis({ anchors: { offset: -16 }, lerp: 0.1 });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    /* Anchors */
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      if (a.hasAttribute("data-to-top")) {
        e.preventDefault();
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo(0, 0);
        history.pushState(null, "", location.pathname + location.search);
        document.getElementById("contenido")?.focus({ preventScroll: true });
        return;
      }
      const target = a.hash.length > 1 ? document.getElementById(decodeURIComponent(a.hash.slice(1))) : null;
      if (!target) return;
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    /* Color stage */
    const blocks = gsap.utils.toArray<HTMLElement>("main > :is(.block-silk, .block-sky, .block-mega, .block-night)");
    let active: HTMLElement | null = blocks[0] ?? null;

    const paint = (el: HTMLElement, instant = false) => {
      active = el;
      const bg = getComputedStyle(el).getPropertyValue("--block-bg").trim();
      gsap.to(document.body, {
        backgroundColor: bg,
        duration: instant || reduce ? 0 : 0.7,
        ease: "power2.out",
        overwrite: true,
      });
    };

    root.classList.add("has-stage");
    if (active) paint(active, true);

    const triggers = blocks.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        refreshPriority: -1,
        onToggle: (self) => self.isActive && paint(el),
      }),
    );

    // Re-read block colors when the system theme flips.
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => active && paint(active, true);
    scheme.addEventListener("change", onScheme);

    /* Active section in the menu */
    const navLinks = gsap.utils.toArray<HTMLAnchorElement>("[data-nav-link]");
    const markCurrent = (hash: string | null) =>
      navLinks.forEach((a) => (a.hash === hash ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current")));
    [...new Set(navLinks.map((a) => a.hash))].forEach((hash) => {
      const section = document.querySelector(hash);
      if (!section) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          refreshPriority: -1,
          onToggle: (self) => {
            if (self.isActive) markCurrent(hash);
            else if (navLinks.some((a) => a.hash === hash && a.hasAttribute("aria-current"))) markCurrent(null);
          },
        }),
      );
    });

    /* Measure again once images and pins settle; then honor a deep link */
    let landed = false;
    const refresh = () => {
      ScrollTrigger.refresh();
      if (landed || location.hash.length < 2) return;
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (!target) return;
      landed = true;
      // Lenis caches the page height; the pin spacer was added after it measured.
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(target, { offset: -16, immediate: true, force: true });
      } else target.scrollIntoView();
    };
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("load", refresh);
      document.removeEventListener("click", onClick);
      scheme.removeEventListener("change", onScheme);
      triggers.forEach((t) => t.kill());
      root.classList.remove("has-stage");
      gsap.set(document.body, { clearProps: "backgroundColor" });
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
