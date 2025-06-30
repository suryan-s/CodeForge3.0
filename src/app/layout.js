import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Silk from "../ui/background";
import LoadingWrapper from "../ui/LoadingWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CodeForge3.0",
  description: "Hackathon by IEEE SB UCEK",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Silk />
        <LoadingWrapper>
          {children}
        </LoadingWrapper>
      </body>
    </html>
  );
}
