import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Space_Grotesk } from "next/font/google";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  // Review R3: metric-matched fallback (the default), so the swap does not move the layout.
});

// Display face: a free stand-in for the wide geometric display type of the reference site.
const display = Space_Grotesk({
  variable: "--font-display-face",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fundación Cielo",
  description:
    "Estamos construyendo un Centro de Día y Hogar donde personas adultas con discapacidad puedan elegir, aprender y participar.",
};

export const viewport: Viewport = {
  // Review C2: browser bar follows the theme.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0ea" },
    { media: "(prefers-color-scheme: dark)", color: "#14151d" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${atkinson.variable} ${display.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
