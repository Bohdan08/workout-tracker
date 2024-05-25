"use client";
import { Button, Navbar } from "flowbite-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import logo from "../../../../../public/logo.svg";
import styles from "./header.module.scss";
import { useAuth } from "@/src/app/context/authContext";

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
  const { user } = useAuth();
  console.log(user, "userAuth");
  console.log(userAuthenticated, "userAuthenticatedSERVER");
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
              <div className="flex space-x-2 md:space-x-4 mr-2 md:mr-0">
                {pathname !== "/login" ? (
                  <Button
                    color={`${pathname === "/register" ? "info" : "light"}`}
                    className={`${styles.button} ${
                      pathname === "/register" ? "border-none" : "border"
                    }`}
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </Button>
                ) : null}
                {pathname !== "/register" ? (
                  <Button
                    className={styles.button}
                    onClick={() => router.push("/register")}
                  >
                    Sign Up
                  </Button>
                ) : null}
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
    </header>
  );
}
