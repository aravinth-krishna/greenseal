import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import SocialsGroup from "@/components/SocialsGroup/SocialsGroup";
import BottomNavbar from "@/components/BottomNavbar/BottomNavbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GreenSeal.org",
  description: "Corporate Accountability Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer className="footer">
          <BottomNavbar />
          <SocialsGroup />

          <span>Copyright &copy;2024 GreenSeal.org</span>
        </footer>
      </body>
    </html>
  );
}
