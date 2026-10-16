"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

/**
 * Horizontal pan: the section pins at the top of the viewport and vertical
 * scroll slides the track sideways, so the highlight, the photos and the vision
 * are read as one continuous line. Elements marked [data-drift] float at their
 * own vertical speed for depth. Below 768px or under reduced motion the track
 * is a plain vertical stack.
 * Review M2: a progress bar shows how much of the pan is left. It is visible
 * only while the pan runs, so no line is left when the section ends.
 */
export function HorizontalPan({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`(min-width: 768px) and ${MOTION_OK}`, () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const pan = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.fromTo(
        progress.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
            onToggle: (self) => gsap.to(rail.current, { opacity: self.isActive ? 1 : 0, duration: 0.3, overwrite: true }),
          },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-drift]", el).forEach((item) => {
        const amount = Number(item.dataset.drift) || 0;
        gsap.fromTo(
          item,
          { y: amount },
          {
            y: -amount,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              containerAnimation: pan,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={wrap} className="relative overflow-hidden">
      <div
        ref={track}
        className="flex flex-col gap-16 px-4 py-24 sm:px-8 md:px-16 md:py-32 md:motion-safe:h-[100dvh] md:motion-safe:w-max md:motion-safe:flex-row md:motion-safe:items-center md:motion-safe:gap-[8vw] md:motion-safe:px-[6vw] md:motion-safe:py-0"
      >
        {children}
      </div>
      <div ref={rail} aria-hidden className="absolute inset-x-0 bottom-0 hidden h-1 bg-silk/25 opacity-0 md:motion-safe:block">
        <div ref={progress} className="h-full origin-left bg-silk" />
      </div>
    </div>
  );
}
