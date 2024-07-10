import type { Metadata } from "next";
import "./globals.css";
import MainNav from "./components/MainNav";
import { useRouter } from "next/router";

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
        <main className="flex justify-center items-center justify-items-center h-screen">
          <div className="w-[1800px] h-[800px] border bg-gray-50 shadow rounded-lg overflow-y-scroll">
            <div>
              <div className="sticky top-0 z-10">
                <div className="bg-red-600 w-full h-full rounded-t-lg md:flex md:justify-between text-center block">
                  <h2 className="text-md text-white p-4">YA-GO.MX</h2>
                  <h2 className="text-md text-white p-4">Sistema de control de logistica para pedidos en espera de envio.</h2>
                </div>
                <MainNav />

              </div>
              {children}
            </div>
          </div>
        </main>
      </body>
    </html >
  );
}
