import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import DashboardWrapper from "./DashboardWrapper";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Milesto",
  description: "An task/project management web application.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.className} antialiased pattern `}
      >
        <DashboardWrapper>
          {children}
        </DashboardWrapper>
        <Toaster/>
      </body>
    </html>
  );
}
