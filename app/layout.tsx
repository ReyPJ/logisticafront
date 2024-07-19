import type { Metadata } from "next";
import "./globals.css";
import MainNav from "./components/MainNav";

export const metadata: Metadata = {
  title: "Logistica App",
  description: "Logistica App",
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
    </html >
  );
}
