import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LogoBuddy",
  description: "Create clean, custom logos in seconds. Perfect for startups, side projects, and creators.",
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
