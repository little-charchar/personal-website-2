import type { Metadata } from "next";
import { Fraunces, Manrope , Space_Grotesk, Inter, Press_Start_2P} from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charlene Shao",
  description: "Mechatronics Engineering Student @ UWaterloo",
  icons: {
    icon: "/bunny-idle-32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${manrope.variable} ${pressStart2P.variable}`}
            suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
