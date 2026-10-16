import { HeroMotion } from "@/components/HeroMotion";
import { HeroRotator } from "@/components/HeroRotator";
import { HorizontalPan } from "@/components/HorizontalPan";
import { ScrollStage } from "@/components/ScrollStage";
import { SiteHeader } from "@/components/SiteHeader";
import { StackCards } from "@/components/StackCards";
import { WordWall } from "@/components/WordWall";
import { ButtonLink, Logo, Photo } from "@/components/ui";
import {
  CONTACT_EMAIL,
  CTA_LABEL,
  JOIN_HREF,
  compromiso,
  espacio,
  footer,
  hero,
  heroVideo,
  invitacion,
  nav,
  photos,
  wordRows,
} from "@/content";

const container = "mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12";
const display = "font-display font-light tracking-[-0.03em]";
const link = "font-bold underline decoration-2 underline-offset-4 hover:decoration-[3px]";

/*
 * Color story (light theme):
 * hero Kuroi -> Compromiso Truesky -> El espacio Silk -> Visión Megadrive -> Sumate Silk -> footer Kuroi.
 * In the dark theme Silk blocks become Kuroi and Truesky becomes a deep sky tint.
 */
export default function Home() {
  const cards = espacio.facts.map((fact, i) => ({
    key: fact.label,
    className: [
      "bg-megadrive text-silk",
      "bg-truesky text-kuroi",
      "card-night bg-night-raised text-silk border",
    ][i],
    content: (
      <div className="grid min-h-[22rem] gap-10 p-8 md:min-h-[26rem] md:p-12">
        <div className="flex flex-col justify-between gap-8">
          {/* Review A3: the figure is read once, inside the heading. */}
          <h3 className="text-2xl font-bold md:text-3xl">
            <span className="sr-only">{fact.value} </span>
            {fact.label}
          </h3>
          <p className="max-w-[38ch] text-lg leading-relaxed">{fact.body}</p>
        </div>
        <p aria-hidden className={`${display} order-first text-7xl leading-[0.9] whitespace-nowrap md:text-[5rem] lg:text-[6.5rem] xl:text-[8.5rem]`}>
          {fact.value}
        </p>
      </div>
    ),
  }));

  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-50 bg-action px-5 py-3 font-bold text-on-action focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>

      <SiteHeader container={container} />

      <main id="contenido" tabIndex={-1} className="outline-none">
        {/* 1. Hero: full-bleed looping video over its poster, copy anchored bottom-left */}
        <section aria-labelledby="hero-title" className="block-night">
          <HeroMotion
            poster={<Photo photo={heroVideo.poster} sizes="100vw" priority />}
            video={{ small: heroVideo.small, large: heroVideo.large, position: heroVideo.poster.position }}
          >
            <div className={`${container} grid gap-8 pt-28 pb-12 md:grid-cols-12 md:items-stretch md:pb-16`}>
              <div data-hero-line className="md:col-span-8 md:flex md:flex-col md:justify-end">
                <HeroRotator
                  id="hero-title"
                  lead={hero.titleLead}
                  words={hero.titleWords}
                  className={`${display} text-[3.25rem] leading-[1.1] md:text-6xl lg:text-7xl xl:text-[6.5rem]`}
                  wordClassName="text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[9.75rem]"
                />
              </div>
              <div className="flex flex-col items-start justify-between gap-6 md:col-span-4 md:pt-3">
                <p data-hero-line className="max-w-[34rem] text-lg leading-relaxed">
                  {hero.subtext}
                </p>
                <div data-hero-line className="flex flex-col items-start gap-3">
                  <ButtonLink href={JOIN_HREF}>{CTA_LABEL}</ButtonLink>
                  {hero.microtext && <p className="text-base text-block-soft">{hero.microtext}</p>}
                </div>
              </div>
            </div>
          </HeroMotion>
        </section>

        {/* 2. Compromiso: kinetic word wall, then the editorial column */}
        <section id="compromiso" aria-labelledby="compromiso-title" className="block-sky py-24 md:py-36">
          <div className={`${container} flex flex-col items-center gap-3 text-center`}>
            <h2 id="compromiso-title" className="text-2xl font-bold md:text-3xl">
              {compromiso.title}
            </h2>
            <p className="text-xl md:text-2xl">{compromiso.subtitle}</p>
          </div>

          <div className="my-16 md:my-24">
            <WordWall rows={wordRows} faces={[photos.cafe, photos.yoga, photos.invitation, photos.hero]} />
          </div>

          <div className={`${container} grid md:grid-cols-12`}>
            {/* Review L2: 60ch keeps desktop lines under 75 characters. */}
            <div className="flex max-w-[60ch] flex-col gap-6 text-lg leading-relaxed md:col-span-7 md:col-start-6 md:text-xl">
              {compromiso.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 3. El espacio: sticky intro left, facts stack on the right */}
        <section id="espacio" aria-labelledby="espacio-title" className="block-silk py-24 md:py-36">
          <div className={`${container} grid gap-14 md:grid-cols-12`}>
            <div className="md:col-span-5">
              <div className="flex flex-col gap-8 md:sticky md:top-[6.5rem]">
                <h2 id="espacio-title" className={`${display} text-5xl leading-[1.04] lg:text-[4.25rem]`}>
                  {espacio.title}
                </h2>
                <p className="max-w-[40ch] text-lg leading-relaxed text-block-soft md:text-xl">{espacio.lead}</p>
              </div>
            </div>
            <div className="md:col-span-7">
              <StackCards cards={cards} />
            </div>
          </div>

          <div className={`${container} mt-24 md:mt-32`}>
            <p className={`${display} max-w-[22ch] text-4xl leading-[1.1] md:text-5xl lg:ml-[25%] lg:text-6xl`}>
              {espacio.closing}
            </p>
          </div>
        </section>

        {/* 4. Visión: horizontal pan on Megadrive. Review A5: own H2 and id, linked from the menu as "Horizonte". */}
        <section id="horizonte" aria-labelledby="vision-title" className="block-mega">
          <HorizontalPan>
            {/* Stacked layout (mobile, or reduced motion): the highlight sits inside a photo circle. */}
            <div className="relative isolate mx-auto flex aspect-square w-full max-w-[34rem] items-center justify-center overflow-hidden rounded-full md:motion-safe:hidden">
              <Photo photo={photos.cafe} sizes="(min-width: 640px) 34rem, 100vw" className="-z-10" />
              {/* Kuroi scrim, darkest at the center where the text sits, keeps Silk text readable. */}
              <div aria-hidden className="scrim-circle absolute inset-0 -z-10" />
              <p className={`${display} max-w-[15ch] px-8 text-center text-[1.875rem] leading-[1.1] text-balance text-silk sm:text-[2.75rem] md:text-5xl`}>
                {compromiso.highlight}
              </p>
            </div>

            {/* Horizontal pan layout (desktop): highlight and photos as separate stops. */}
            <p className={`${display} hidden max-w-[16ch] shrink-0 text-5xl leading-[1.04] md:motion-safe:block md:motion-safe:w-[58vw] md:motion-safe:max-w-none md:text-[6.5rem] md:motion-safe:text-[7.5vw]`}>
              {compromiso.highlight}
            </p>

            <div className="relative hidden shrink-0 gap-6 md:motion-safe:flex md:motion-safe:h-full md:motion-safe:w-[44vw] md:motion-safe:items-center">
              <div data-drift="90" className="relative aspect-square w-[min(80vw,26rem)] overflow-hidden rounded-full md:motion-safe:w-[26vw] md:motion-safe:-translate-y-[12vh]">
                <Photo photo={photos.cafe} sizes="(min-width: 768px) 26vw, 80vw" />
              </div>
              <div data-drift="-70" className="relative hidden aspect-square w-[16vw] overflow-hidden rounded-full md:motion-safe:block md:motion-safe:translate-y-[18vh]">
                <Photo photo={photos.yoga} sizes="16vw" />
              </div>
            </div>

            <div className="flex max-w-[60ch] shrink-0 flex-col gap-6 md:motion-safe:w-[40vw]">
              <h2 id="vision-title" className="text-2xl font-bold md:text-3xl">
                {compromiso.visionTitle}
              </h2>
              <p className="text-lg leading-relaxed md:text-xl">{compromiso.vision}</p>
            </div>

            <div data-drift="60" className="relative aspect-square w-[min(70vw,22rem)] shrink-0 overflow-hidden rounded-full md:motion-safe:w-[22vw]">
              <Photo photo={photos.invitation} sizes="(min-width: 768px) 22vw, 70vw" />
            </div>

            <p className={`${display} shrink-0 text-5xl leading-[1.04] md:text-7xl md:motion-safe:w-[46vw] md:motion-safe:text-[6vw]`}>
              {compromiso.visionClosing}
            </p>
          </HorizontalPan>
        </section>

        {/* 5. Invitación final */}
        <section id="sumate" aria-labelledby="sumate-title" className="block-silk py-24 md:py-40">
          <div className={`${container} grid gap-12 md:grid-cols-12 md:items-end`}>
            <h2 id="sumate-title" className={`${display} text-5xl leading-[1.02] md:col-span-7 md:text-[5.5rem]`}>
              {invitacion.title}
            </h2>
            <div className="flex flex-col items-start gap-7 md:col-span-5">
              <p className="max-w-[48ch] text-lg leading-relaxed text-block-soft md:text-xl">{invitacion.body}</p>
              {/* TODO (review F1, blocks launch): points at its own section until the join destination is defined. */}
              <ButtonLink href={JOIN_HREF}>{CTA_LABEL}</ButtonLink>
              <p className="text-lg">
                {invitacion.companyQuestion}{" "}
                {CONTACT_EMAIL ? (
                  <a href={`mailto:${CONTACT_EMAIL}`} className={`${link} text-block-accent`}>
                    {invitacion.companyLink}
                  </a>
                ) : (
                  // TODO: contact email pending (BRIEF.md open item 4). Review F2: plain weight so it does not read as a link.
                  <span>{invitacion.companyLink}</span>
                )}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="block-night">
        <div className={`${container} flex flex-col gap-10 py-14 md:flex-row md:items-center md:justify-between`}>
          <Logo tone="light" className="h-[58px] w-auto" />
          {/* Review T1: 44px touch targets. */}
          <ul className="flex flex-col gap-1 text-lg md:flex-row md:gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-1 text-lg md:items-end">
            <li>
              <a href={`https://${footer.site}`} className={`${link} inline-flex min-h-11 items-center text-block-accent`}>
                {footer.site}
              </a>
            </li>
            <li className="text-block-soft">{footer.handle}</li>
          </ul>
        </div>
      </footer>

      <ScrollStage />
    </>
  );
}
