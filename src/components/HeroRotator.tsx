"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Hero H1: a fixed lead ("Espacio para") and a word that slides up to the
 * next one every couple of seconds, looping forever. Screen readers get the
 * whole sentence once; the moving copy is aria-hidden.
 *
 * ACCESSIBILITY NOTE (14 Oct 2026, user decision): the loop has no pause
 * control and also runs under reduced motion. This fails WCAG 2.2.2
 * (Pause, Stop, Hide). To restore compliance, add a pause button or gate the
 * timeline behind "(prefers-reduced-motion: no-preference)".
 * The loop only idles while the hero is off screen, to save work.
 */
export function HeroRotator({
  id,
  lead,
  words,
  className,
  wordClassName,
}: {
  id: string;
  lead: string;
  words: string[];
  className: string;
  wordClassName: string;
}) {
  const track = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = track.current!;
    const steps = words.length; // the track holds words + a copy of the first
    const timeline = gsap.timeline({ repeat: -1 });
    for (let i = 1; i <= steps; i++) {
      timeline.to(el, { yPercent: (-100 * i) / (steps + 1), duration: 0.8, ease: "expo.inOut" }, "+=1.6");
    }
    timeline.set(el, { yPercent: 0 });

    const visible = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => (self.isActive ? timeline.play() : timeline.pause()),
    });

    return () => {
      visible.kill();
      timeline.kill();
      gsap.set(el, { clearProps: "transform" });
    };
  }, [words]);

  const sentence = `${lead} ${words.slice(0, -1).join(", ")} y ${words.at(-1)}`;

  return (
    <h1 id={id} className={className}>
      <span className="sr-only">{sentence}</span>
      <span aria-hidden className="block leading-[1]">
        {lead}
      </span>
      {/* 1.15em line box keeps the descender of "elegir" clear of the clip;
          the negative margin pulls the word up under the lead for a tight stack. */}
      <span aria-hidden className={`-mt-[0.12em] block h-[1.15em] overflow-hidden text-block-accent ${wordClassName}`}>
        <span ref={track} className="flex flex-col will-change-transform">
          {[...words, words[0]].map((word, i) => (
            <span key={i} className="block h-[1.15em] leading-[1.15]">
              {word}
            </span>
          ))}
        </span>
      </span>
    </h1>
  );
}
