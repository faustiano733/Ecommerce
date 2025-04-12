// app/layout.js (Server Component - sem "use client")
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "@components/layout/ClientLayout";

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

export const metadata = {
  title: "E-commerce Bemtoc",
  description: "Venda de acessórios para material fotográfico.",
  authors: ["Nataniel Hebo", "Faustiano Geraldo"],
  openGraph: {
    title: "E-commerce Bemtoc",
    description: "Venda de acessórios para material fotográfico.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 capitalize-first`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}