"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

/**
 * Sticky card stack. Each card pins a little lower than the one before
 * (pure CSS sticky), and as the next card slides over, the previous one
 * eases back in scale so the stack reads as depth, one fact at a time.
 * Review L1: only on screens at least 720px tall, so a whole card fits under the header.
 */
export function StackCards({ cards }: { cards: { key: string; className: string; content: ReactNode }[] }) {
  const root = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`(min-width: 768px) and (min-height: 720px) and ${MOTION_OK}`, () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-stack-card]", root.current);
      items.forEach((card, i) => {
        const next = items[i + 1];
        if (!next) return;
        gsap.to(card.firstElementChild, {
          scale: 0.92,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top 85%", end: "top 20%", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <ul ref={root} className="flex flex-col gap-6 stack:gap-[30vh] stack:pb-[10vh]">
      {cards.map((card, i) => (
        <li
          key={card.key}
          data-stack-card
          className="stack:sticky"
          style={{ top: `calc(6.5rem + ${i * 2.25}rem)` }}
        >
          <div className={`origin-top will-change-transform ${card.className}`}>{card.content}</div>
        </li>
      ))}
    </ul>
  );
}
