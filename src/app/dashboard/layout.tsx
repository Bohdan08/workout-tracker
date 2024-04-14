"use client";
import { useAuth } from "@/src/context/authContext";
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
        <div className="flex space-x-2 px-4 sm:px-6 ">
          <Menu />
          <div className="w-full p-4">{children}</div>
        </div>
      </main>
    </div>
  );
}
