"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { Photo } from "@/components/ui";
import type { PhotoAsset } from "@/content";

/**
 * Kinetic word wall. Rows of display words, each separated by a small circle
 * crop of the foundation's photos. Scroll drives the rows sideways in
 * alternating directions (scrubbed, never looping on its own), so the values
 * of the compromiso pass by as the visitor reads into the section.
 * Decorative: the same phrases appear in the paragraphs right after.
 */
export function WordWall({ rows, faces }: { rows: string[][]; faces: PhotoAsset[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>(".word-row", root.current).forEach((row, i) => {
        const travel = () => -(row.scrollWidth - window.innerWidth) * 0.5;
        const forward = i % 2 === 0;
        gsap.fromTo(
          row,
          { x: () => (forward ? 0 : travel()) },
          {
            x: () => (forward ? travel() : 0),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  let face = 0;
  const nextFace = () => faces[face++ % faces.length];

  return (
    <div ref={root} aria-hidden className="flex flex-col gap-1 overflow-hidden py-4 md:gap-2">
      {rows.map((row, r) => (
        <div
          key={r}
          className={`word-row flex items-center gap-x-5 gap-y-3 whitespace-nowrap will-change-transform md:gap-x-8 ${r % 2 ? "md:pl-[18vw]" : ""}`}
        >
          {[0, 1, 2, 3, 4].map((copy) =>
            row.map((word) => {
              const photo = nextFace();
              return (
                <Fragment key={`${copy}-${word}`}>
                  <span
                    className={`font-display text-[2.75rem] leading-[1.15] font-light tracking-[-0.02em] md:text-[6.25rem] ${copy ? "word-dup" : ""}`}
                  >
                    {word}
                  </span>
                  <span
                    className={`relative inline-block size-10 shrink-0 overflow-hidden rounded-full md:size-16 ${copy ? "word-dup" : ""}`}
                  >
                    <Photo photo={photo} sizes="64px" decorative />
                  </span>
                </Fragment>
              );
            }),
          )}
        </div>
      ))}
    </div>
  );
}
