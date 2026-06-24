import type { Metadata } from "next";
import { Anta } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const anta = Anta({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anta",
});

const rushford = localFont({
  src: "../../public/fonts/StackSansNotch-VariableFont_wght.ttf",
  variable: "--font-rushford",
});

export const metadata: Metadata = {
  title: "Duality Gate | Bhuwan Kirnapure",
  description: "Two Worlds. One Mind.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${anta.variable} ${rushford.variable}`}>
        {children}
      </body>
    </html>
  );
}
