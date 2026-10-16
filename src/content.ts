// Copy from COPY.md (12 Oct 2026). Use verbatim; do not rewrite.
// web-3: web-1 plus the 22 UI/UX review fixes, Horizonte in the menu and the hero video (same page as fundacion-cielo-html-v2).

// [PENDIENTE] items from COPY.md. Flip to true once the team approves the change.
export const approved = {
  heroSubtextShort: false, // PENDIENTE 1: keep only the second sentence (17 words)
  heroMicrotextRemoved: false, // PENDIENTE 2: drop the microtext under the hero CTA
  shalaGloss: false, // PENDIENTE 3: gloss "Shala" on first use
};

// TODO (review F1, blocks launch): confirm the join destination (form, page or email). Anchors to the invitation for now.
export const JOIN_HREF = "#sumate";

// TODO: contact email pending (BRIEF.md open item 4). The company line renders as plain text until set.
export const CONTACT_EMAIL: string | null = null;

// Photos supplied by the team on 12 Oct 2026. Alt text drafted by Claude, pending team review.
// TODO: confirm license and consent (BRIEF.md asks for real, consented photos of the foundation).
export type PhotoAsset = { src: string; alt: string; position?: string };

export const photos: Record<"hero" | "cafe" | "yoga" | "invitation", PhotoAsset> = {
  hero: {
    src: "/images/foto-laptop.jpg",
    alt: "Una joven trabaja con su computadora en un café, junto a la ventana.",
    position: "30% 40%",
  },
  cafe: {
    src: "/images/foto-cafe.jpg",
    alt: "Dos mujeres comparten un café y miran juntas una computadora.",
  },
  yoga: {
    src: "/images/foto-yoga.jpg",
    alt: "Una mujer sentada sobre una esterilla de yoga en una sala con luz natural.",
    position: "56% 50%",
  },
  invitation: {
    src: "/images/foto-conversa.jpg",
    alt: "Dos mujeres conversan con sus esterillas de yoga bajo el brazo.",
    position: "50% 18%",
  },
};

// Hero video, approved by the team on 15 Oct 2026 (source: media-source/4106755-uhd_3840_2160_25fps.mp4).
// TODO: record the license and consent next to the photos'. Alt drafted by Claude, pending team review.
// The poster is the first frame; it carries the alt text, the video itself is aria-hidden.
export const heroVideo = {
  poster: {
    src: "/images/video-poster.jpg",
    alt: "Dos mujeres sonríen y trabajan juntas con una computadora en un café.",
    position: "50% 35%",
  } satisfies PhotoAsset,
  small: "/video/hero-720.mp4", // phones (under 768px)
  large: "/video/hero-1080.mp4",
};

export const CTA_LABEL = "Sumate a la comunidad";

// UI labels for the mobile menu (review N1). Screen reader only. Approved by the user on 15 Oct 2026.
export const MENU_OPEN = "Abrir menú";
export const MENU_CLOSE = "Cerrar menú";

// Order follows the page: compromiso now comes before el espacio.
export const nav = [
  { href: "#compromiso", label: "Nuestro compromiso" },
  { href: "#espacio", label: "El espacio" },
  // Added 15 Oct 2026 (user request): links to the Visión section.
  { href: "#horizonte", label: "Horizonte" },
  { href: "#sumate", label: "Sumate" },
];

export const hero = {
  // H1 as of 14 Oct 2026 (user request): "Espacio para" fixed, the last word rotates.
  // Replaces the previous H1 "Una vida adulta que se elige, en comunidad".
  titleLead: "Espacio para",
  titleWords: ["ser", "elegir", "construir"],
  subtext: approved.heroSubtextShort
    ? "Estamos construyendo un Centro de Día y Hogar donde personas adultas con discapacidad puedan elegir, aprender y participar."
    : "Fundación Cielo es un espacio para la vida independiente y en comunidad. Estamos construyendo un Centro de Día y Hogar donde personas adultas con discapacidad puedan elegir, aprender y participar.",
  microtext: approved.heroMicrotextRemoved
    ? null
    : "Podés sumarte como persona, empresa u organización.",
};

export const espacio = {
  title: "Un lugar pensado para que la vida suceda",
  lead: approved.shalaGloss
    ? "Un establecimiento que funcionará como Centro de Día y Hogar, integrado a un café y a un Shala de yoga (espacio de práctica)."
    : "Un establecimiento que funcionará como Centro de Día y Hogar, integrado a un café y a un Shala de yoga.",
  facts: [
    {
      value: "50",
      label: "personas en el Centro de Día",
      body: "Capacidad para 50 personas jóvenes adultas con discapacidades leves y moderadas, cada una con su propio proyecto de vida.",
    },
    {
      value: "12",
      label: "personas en el Hogar",
      body: "Un hogar permanente donde quienes viven deciden cómo quieren vivir.",
    },
    {
      value: "1.000 m²",
      label: "cubiertos",
      body: "Espacios para aprender, trabajar, compartir y también para detenerse.",
    },
  ],
  closing:
    "No buscamos ser el centro de la vida de nadie. Queremos ser un punto de apoyo para que la vida también suceda afuera.",
};

export const compromiso = {
  title: "Nuestro compromiso",
  subtitle: "Mucho más que recibir cuidados.",
  paragraphs: [
    "Creemos que una vida adulta plena incluye mucho más que recibir cuidados: implica elegir, aprender, construir vínculos, asumir responsabilidades, disfrutar, habitar la comunidad y sentirse parte de ella.",
    "Por eso estamos diseñando una propuesta que une el modelo social de la discapacidad con la filosofía y la práctica del yoga, en pos de la autonomía, la independencia y la construcción de redes comunitarias.",
    "Un lugar donde cada persona sea reconocida desde su historia, sus capacidades, sus deseos, sus intereses y sus decisiones. Donde los apoyos se construyan junto a la persona.",
  ],
  highlight: "Acompañar no es reemplazar. Es potenciar y hacer posible.",
  visionTitle: "¿Nuestra visión?",
  vision:
    "Una sociedad inclusiva, donde las personas con discapacidad sean reconocidas y valoradas en su diversidad y desarrollen sus proyectos de vida en igualdad de oportunidades, con apoyos adecuados y sin barreras que limiten su participación en la comunidad.",
  visionClosing: "Ese es nuestro horizonte.",
};

export const invitacion = {
  title: "Construyamos esta red en comunidad",
  body: "Fundación Cielo crece con personas, empresas y organizaciones que eligen formar parte. Hay muchas formas de sumarse: aportar, hacer voluntariado, difundir el proyecto o abrir espacios en un barrio o una empresa.",
  companyQuestion: "¿Representás a una empresa u organización?",
  companyLink: "Escribinos y lo conversamos.",
};

export const footer = {
  site: "fundacioncielo.org",
  handle: "@fundacioncielo",
};

// Kinetic word wall (section 2). Words chosen by the user on 14 Oct 2026.
// The wall is decorative (aria-hidden); the compromiso paragraphs carry the meaning.
export const wordRows: string[][] = [
  ["construir vínculos", "elegir"],
  ["autonomía", "independencia"],
  ["proyecto", "decidir"],
];
