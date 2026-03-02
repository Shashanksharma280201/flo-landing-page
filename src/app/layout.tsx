import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { Footer } from "@/components/shared/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "flo mobility",
  description:
    "Autonomous solutions for material movement, lawn maintenance, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSans.variable} bg-[#fdfcf0] antialiased font-sans text-pretty`}
      >
        <ScrollProgress />
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
