import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { PhotoAsset } from "@/content";

/**
 * Square button with a trailing arrow. Colors come from the enclosing
 * color block (--btn-bg / --btn-fg), so every block keeps an approved pair.
 */
export function ButtonLink({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
}) {
  const look =
    variant === "solid"
      ? "bg-btn-bg text-btn-fg border-btn-bg"
      : "bg-transparent text-block-fg border-block-fg hover:bg-block-fg/10";
  return (
    <a
      href={href}
      // Review T2: .btn (globals.css) adds a visible hover tone that keeps the pair above 4.5:1.
      className={`${variant === "solid" ? "btn " : ""}group inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap border-2 px-6 text-base font-bold ${look}`}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        weight="bold"
        className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
      />
    </a>
  );
}

/**
 * Logotype from the supplied SVGs, never redrawn.
 * "auto" follows the system theme; "light" is the inverse logo for dark grounds.
 */
export function Logo({
  className = "h-12 w-auto",
  tone = "auto",
}: {
  className?: string;
  tone?: "auto" | "light";
}) {
  if (tone === "light") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/brand/logo-fundacion-cielo-claro.svg" alt="Fundación Cielo" width={617} height={225} className={className} />
    );
  }
  return (
    <picture>
      <source srcSet="/brand/logo-fundacion-cielo-claro.svg" media="(prefers-color-scheme: dark)" />
      <img src="/brand/logo-fundacion-cielo.svg" alt="Fundación Cielo" width={617} height={225} className={className} />
    </picture>
  );
}

/** Cover-cropped photo; the parent sets the aspect ratio and shape. */
export function Photo({
  photo,
  sizes,
  priority = false,
  decorative = false,
  className = "",
}: {
  photo: PhotoAsset;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={decorative ? "" : photo.alt}
      fill
      sizes={sizes}
      quality={75}
      className={`object-cover ${className}`}
      style={{ objectPosition: photo.position ?? "50% 50%" }}
      {...(priority ? { preload: true, fetchPriority: "high" as const } : {})}
    />
  );
}
