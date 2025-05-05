import { AuthProvider } from "@/components/auth/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Menù Digitale | Piscina Le Terrazze - Ravello",
  description:
    "Consulta il menù digitale di Piscina Le Terrazze a Ravello: piatti freschi, bevande e specialità locali. Accessibile via QR code, anche senza connessione.",
  keywords: [
    "menù digitale",
    "Piscina Le Terrazze",
    "Ravello",
    "locale",
    "QR code",
    "offline",
    "ristorante",
    "cibo",
    "bevande",
  ],
  authors: [{ name: "Gerardo Nastri", url: "https://www.gerardonastri.it" }],
  creator: "Gerardo Nastri",
  openGraph: {
    title: "Menù Digitale | Piscina Le Terrazze - Ravello",
    description:
      "Scopri il menù aggiornato di Piscina Le Terrazze a Ravello direttamente dal tuo smartphone, anche offline.",
    url: "https://piscina-le-terrazze.vercel.app/",
    siteName: "Piscina Le Terrazze",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "https://tuosito.it/og-image.jpg", // Sostituisci con il link corretto
        width: 1200,
        height: 630,
        alt: "Piscina Le Terrazze - Menù Digitale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Menù Digitale | Piscina Le Terrazze - Ravello",
    description:
      "Accedi al menù digitale di Piscina Le Terrazze in un click. Anche offline.",
    images: ["https://tuosito.it/og-image.jpg"], // Sostituisci anche qui
    creator: "@tuotwitter",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
