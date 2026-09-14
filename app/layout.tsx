import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Budget Officer",
  description:
    "Calculadora para organizar receitas e despesas domésticas.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {/*
        Quando ativar o Google AdSense, adicione aqui dentro do <head>
        o script de verificação/carregamento do AdSense, por exemplo:
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      */}
      <body>{children}</body>
    </html>
  );
}
