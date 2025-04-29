import "./globals.css";

export const metadata = {
  title: "Menu del Locale",
  description: "Menu moderno e intuitivo per il tuo locale",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
