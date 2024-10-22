import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NotistackProvider } from "./notistack";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moricol",
  description: "Homecare solution at your fingertip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-gray-700 antialiased`}>
         <NotistackProvider autoHideDuration={3000} maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}   >
          {children}
        </NotistackProvider>
      </body>
    </html>
  );
}
