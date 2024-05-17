"use client";
import { resetUser } from "@/src/app/lib/store/features/userProfile/userProfileSlice";
import { resetWorkout } from "@/src/app/lib/store/features/workout/workoutSlice";
import { resetWorkouts } from "@/src/app/lib/store/features/workoutsHistory/workoutsHistorySlice";
import { auth } from "@/src/firebase/config";
import { Button, Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../../../../public/logo.svg";
import { MENU_ITEMS } from "./menu";

export default function MobileMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    return await auth.signOut().then(() => {
      // reset all data
      dispatch(resetWorkouts());
      dispatch(resetWorkout());
      dispatch(resetUser());

      router.push("/");
    });
  };

  return (
    <Navbar fluid rounded className="md:hidden bg-transparent">
      <Navbar.Brand href="/">
        <Image src={logo} width={40} height={40} alt="" />
        {/* <span className="text-sm relative left-2">Workout Tracker</span> */}
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button className="w-full relative right-4" onClick={handleSignOut}>
          Sign Out
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {MENU_ITEMS.map(({ id, label, link }) => (
          <Navbar.Link key={id} href={link} active={link === pathname}>
            {label}
          </Navbar.Link>
        ))}
        <div className="w-full border border-gray-300 mb-5" />
        {/* <Button className="w-full" onClick={handleSignOut}>
          <span className="relative left-1"> Sign Out</span>
        </Button> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
