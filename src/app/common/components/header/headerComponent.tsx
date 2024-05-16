"use client";
import { Button, Navbar } from "flowbite-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import logo from "../../../../../public/logo.svg";

const NAVS_LIST = [
  {
    id: "home",
    href: "/",
    label: "Home",
  },
  {
    id: "about",
    href: "/about",
    label: "About",
  },
  {
    id: "contact",
    href: "/contact",
    label: "Contact",
  },
];

export default function HeaderComponent({
  userAuthenticated = false,
}: {
  userAuthenticated?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header
    // className={`px-4 sm:px-6 sticky top-0 bg-white z-10 ${styles.header}`}
    >
      <Navbar fluid rounded className="mt-1 bg-[#fcfbf8]">
        <Navbar.Brand href="/" className="flex items-center space-x-2">
          <Image src={logo} width={40} height={40} alt="" />
          <span className="text-sm font-medium">Workout Tracker</span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {!userAuthenticated ? (
            <>
              <div className="flex space-x-4">
                <Button
                  color="light"
                  className="border-none"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
                <Button onClick={() => router.push("/register")}>
                  Sign Up
                </Button>
              </div>{" "}
            </>
          ) : null}
          {userAuthenticated ? (
            <Button onClick={() => router.push("/dashboard/overview")}>
              Dashboard
            </Button>
          ) : null}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {NAVS_LIST.map(({ id, label, href }) => (
            <Navbar.Link href={href} key={id} active={pathname === href}>
              {label}
            </Navbar.Link>
          ))}
        </Navbar.Collapse>
      </Navbar>

      {/* <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div>
            <Link
              href="/"
              aria-label="home page"
              className="flex items-center space-x-2"
            >
              <Image src={logo} width={40} height={40} alt="" />
              <span className="text-sm">Workout Tracker</span>
            </Link>
          </div>
        </div>
        <div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/dashboard/overview">Dashboard</Link>
              </li>
              <li>
                <Link href="/dashboard/overview">Dashboard</Link>
              </li>
              <li>
                <Link href="/dashboard/about">About</Link>
              </li>
            </ul>
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
      </nav> */}
    </header>
  );
}
