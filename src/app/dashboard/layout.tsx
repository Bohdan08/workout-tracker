"use client";
import { useAuth } from "@/src/app/context/authContext";
import Header from "../common/components/header";
import Menu from "./components/menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      {" "}
      <Header />
      <main className="grow">
        <div className="flex space-x-2 pr-4 sm:pr-6">
          <Menu />
          <div className="w-full px-4 pt-4 pb-10">{children}</div>
        </div>
      </main>
    </div>
  );
}
