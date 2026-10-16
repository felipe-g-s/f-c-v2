"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";

/**
 * Hero choreography. On load the copy rises in once (hierarchy).
 * On scroll the media eases from 1.12 to 1 and the copy drifts up and fades,
 * handing the stage to the next section (storytelling).
 *
 * Hero video. ACCEPTED OVERRIDE (15 Oct 2026, user decision): loops with no
 * pause control. Fails WCAG 2.2.2. The poster (first frame) is the LCP image and
 * carries the alt text; under reduced motion or Save-Data the video never loads.
 * Phones get the 720p file. The clip idles while the hero is off screen.
 */
export function HeroMotion({
  poster,
  video,
  children,
}: {
  poster: ReactNode;
  video: { small: string; large: string; position?: string };
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const clip = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const el = root.current!;
      gsap.from(el.querySelectorAll("[data-hero-line]"), {
        y: 32,
        opacity: 0,
        duration: 1,
        stagger: 0.09,
        ease: "expo.out",
        delay: 0.15,
      });
      gsap.fromTo(
        el.querySelector("[data-hero-photo]"),
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        },
      );
      gsap.to(el.querySelector("[data-hero-copy]"), {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "50% top", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const v = clip.current;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!v || !window.matchMedia(MOTION_OK).matches || connection?.saveData) return;

    let visible: ScrollTrigger | null = null;
    const onPlaying = () => v.setAttribute("data-playing", "");
    const start = () => {
      v.src = window.matchMedia("(min-width: 768px)").matches ? video.large : video.small;
      v.addEventListener("playing", onPlaying, { once: true });
      visible = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? v.play().catch(() => {}) : v.pause()),
      });
      v.play().catch(() => {}); // Blocked autoplay (Low Power Mode): the poster stays.
    };
    // Let the poster and fonts win the first load.
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      v.removeEventListener("playing", onPlaying);
      visible?.kill();
      v.pause();
      v.removeAttribute("src");
      v.removeAttribute("data-playing");
      v.load();
    };
  }, [video.large, video.small]);

  return (
    <div ref={root} className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden">
      <div data-hero-photo className="absolute inset-0 -z-10 will-change-transform">
        {poster}
        <video
          ref={clip}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-700 ease-out data-[playing]:opacity-100 motion-reduce:hidden"
          style={{ objectPosition: video.position ?? "50% 50%" }}
        />
      </div>
      {/* Review A2: taller scrim on mobile; v-2 added a 60% stop for the brighter video. */}
      <div aria-hidden className="scrim-hero absolute inset-0 -z-10" />
      {/* Review A1: top scrim keeps the transparent header above 4.5:1. */}
      <div aria-hidden className="scrim-top absolute inset-x-0 top-0 -z-10 h-40" />
      <div data-hero-copy>{children}</div>
    </div>
  );
}
