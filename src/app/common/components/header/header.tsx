"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../../../public/logo.svg";
import { auth } from "@/src/firebase/config";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/src/app/context/authContext";

export default function Header() {
  const { user, loadingUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  console.log(loadingUser, "loadingUser");
  return (
    <header className="border-b py-2 px-4 sm:px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div>
            <Link
              href="/"
              aria-label="home page"
              className="flex items-center space-x-2"
            >
              <Image src={logo} width={40} height={40} alt="" />
              <p className="text-sm">Workout Tracker</p>
            </Link>
          </div>
          <nav>
            <Link href="/dashboard/summary">Dashboard</Link>
          </nav>
        </div>
        {!loadingUser && (
          <div className="flex space-x-4">
            {user ? (
              <button
                onClick={async () => {
                  await auth.signOut().then(() => {
                    router.push("/");
                  });
                }}
              >
                Sign out
              </button>
            ) : (
              <>
                {!pathname.includes("login") && (
                  <Link href="/login">Log in</Link>
                )}
                {!pathname.includes("register") && (
                  <Link href="/register">Sign Up</Link>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
