"use client";

import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { ScrollTrigger } from "@/lib/gsap";
import { ButtonLink, Logo } from "@/components/ui";
import { CTA_LABEL, JOIN_HREF, MENU_CLOSE, MENU_OPEN, nav } from "@/content";

/**
 * Fixed header with three states, written to a data attribute (no React state):
 * "top"    transparent over the hero, light logo;
 * "hidden" slid away while reading downward;
 * "solid"  back on any upward scroll, on the theme surface.
 * Below 1024px the links live in a menu panel (review N1).
 * Links carry data-nav-link so ScrollStage can mark the current section (review N3).
 */
export function SiteHeader({ container }: { container: string }) {
  const ref = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        const y = self.scroll();
        // Keep the header visible while it has keyboard focus or the menu is open.
        const menuOpen = el.querySelector<HTMLElement>("#menu-movil")?.hidden === false;
        const pinned = el.contains(document.activeElement) || menuOpen;
        el.dataset.state = y < 80 ? "top" : self.direction === 1 && !pinned ? "hidden" : "solid";
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!open || !el) return;
    if (el.dataset.state === "hidden") el.dataset.state = "solid";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const navLinks = (cls: string) =>
    nav.map((item) => (
      <li key={item.href}>
        <a href={item.href} data-nav-link className={cls}>
          {item.label}
        </a>
      </li>
    ));

  return (
    <header
      ref={ref}
      data-state="top"
      className="site-header group/h block-night fixed inset-x-0 top-0 z-40 transition-[transform,background-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] data-[state=hidden]:-translate-y-full motion-reduce:transition-none"
    >
      <div className={`${container} flex h-[72px] items-center justify-between gap-6`}>
        {/* Review N4: the logo goes to the top of the page (handled in ScrollStage). */}
        <a href="#" data-to-top aria-label="Fundación Cielo, inicio" className="shrink-0">
          <span className="group-data-[state=solid]/h:hidden">
            <Logo tone="light" className="h-[53px] w-auto md:h-[58px]" />
          </span>
          <span className="hidden group-data-[state=solid]/h:block">
            <Logo className="h-[53px] w-auto md:h-[58px]" />
          </span>
        </a>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-9 text-base font-medium">
            {navLinks(
              "inline-flex min-h-11 items-center underline-offset-[6px] decoration-2 hover:underline aria-[current=location]:underline",
            )}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink href={JOIN_HREF}>{CTA_LABEL}</ButtonLink>
          </div>
          <button
            ref={button}
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
            data-menu-button
            className="inline-flex size-12 cursor-pointer items-center justify-center border-2 border-block-fg lg:hidden"
          >
            {open ? <X aria-hidden weight="bold" className="size-5" /> : <List aria-hidden weight="bold" className="size-5" />}
            <span className="sr-only">{open ? MENU_CLOSE : MENU_OPEN}</span>
          </button>
        </div>
      </div>
      <nav
        id="menu-movil"
        aria-label="Principal"
        hidden={!open}
        onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
        className="absolute inset-x-0 top-full border-t border-block-line bg-[var(--block-bg)] text-block-fg lg:hidden"
      >
        <ul className={`${container} flex flex-col gap-1 py-4`}>
          {navLinks("flex min-h-12 items-center text-lg underline-offset-[6px] decoration-2 aria-[current=location]:underline")}
          <li className="pt-3 sm:hidden">
            <ButtonLink href={JOIN_HREF}>{CTA_LABEL}</ButtonLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
