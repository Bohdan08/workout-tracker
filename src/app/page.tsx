// "use client";
import { useEffect } from "react";
import Header from "./common/components/header";
import { getFirebaseAdminToken } from "./lib/actions/getFirebaseAdminToken/getFirebaseAdminToken";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    </>
  );
}
