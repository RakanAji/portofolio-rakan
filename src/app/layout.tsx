import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rakan Aji Pratama | Security Engineer & Web3 Builder",
  description:
    "Information Security Engineer focused on bridging the gap between hardware (IoT/OT) and the blockchain (EVM). Identifying vulnerabilities before they are exploited.",
  keywords: [
    "Information Security",
    "Cybersecurity",
    "Web3 Security",
    "Smart Contract Audit",
    "IoT Security",
    "Penetration Testing",
    "Rakan Aji Pratama",
  ],
  authors: [{ name: "Rakan Aji Pratama" }],
  openGraph: {
    title: "Rakan Aji Pratama | Security Engineer & Web3 Builder",
    description:
      "Information Security Engineer focused on bridging the gap between hardware (IoT/OT) and the blockchain (EVM).",
    type: "website",
    locale: "en_US",
    siteName: "Rakan Aji Pratama Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakan Aji Pratama | Security Engineer & Web3 Builder",
    description:
      "Information Security Engineer focused on bridging the gap between hardware (IoT/OT) and the blockchain (EVM).",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
