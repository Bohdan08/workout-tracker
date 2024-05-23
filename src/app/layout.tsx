import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/authContext";
import StoreProvider from "./lib/store/storeProvider";

import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workout tracker",
  description: "Effortless Tracking. Empowering Progress.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
