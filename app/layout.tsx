import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teste de QI Certificado | Resultados Profissionais em 15 Minutos",
  description:
    "Faça nosso teste de QI online com 25 perguntas. Obtenha resultados instantâneos e uma análise detalhada de inteligência.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" translate="no">
      <body>{children}</body>
    </html>
  );
}
