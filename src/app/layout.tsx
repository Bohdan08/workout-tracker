import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/authContext";
import StoreProvider from "./lib/store/storeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workout tracker",
  description: `Track your fitness journey with Workout Tracker, 
                the free web app designed to help you achieve your fitness goals. 
                Log workouts, monitor progress, 
                and stay motivated with our easy-to-use fitness tracking tools. 
                Start for free today!`,
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
      <GoogleAnalytics gaId="G-ZDTQECX3QP" />
    </html>
  );
}
