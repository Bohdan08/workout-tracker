"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "flowbite-react";
import styles from "./menu.module.scss";
import {
  HiTableCells,
  HiChartPie,
  HiSquaresPlus,
  HiOutlineAdjustmentsVertical,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiArrowLeftOnRectangle,
} from "react-icons/hi2";

import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/src/firebase/config";
import Image from "next/image";
import logo from "../../../../../public/logo.svg";
import useAppDispatch from "@/src/app/hooks/useAppDispatch";
import { resetWorkouts } from "@/src/app/lib/store/features/workoutsHistory/workoutsHistorySlice";
import { resetWorkout } from "@/src/app/lib/store/features/workout/workoutSlice";
import { resetUser } from "@/src/app/lib/store/features/userProfile/userProfileSlice";
import { addUserToken } from "@/src/app/lib/actions/addUserToken/addUserToken";

export const MENU_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    link: "/dashboard/overview",
    Icon: HiChartPie,
  },
  {
    id: "add-workout",
    label: "Add Workout",
    link: "/dashboard/add-workout",
    Icon: HiSquaresPlus,
  },

  {
    id: "history",
    label: "History",
    link: "/dashboard/history",
    Icon: HiTableCells,
  },
  {
    id: "profile-settings",
    label: "Settings",
    link: "/dashboard/profile-settings",
    Icon: HiOutlineAdjustmentsVertical,
  },
];

export default function Menu() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(true);

  const dispatch = useAppDispatch();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const pathanme = usePathname();

  const handleSignOut = async () => {
    return await auth.signOut().then(() => {
      // reset all data
      dispatch(resetWorkouts());
      dispatch(resetWorkout());
      dispatch(resetUser());
      // clear up user token
      addUserToken("").then(() => router.push("/"));
    });
  };

  return (
    <>
      <aside
        className={`
        hidden
        lg:flex flex-col justify-between 
        pb-4 border-r bg-gray-100 px-2 sm:px-4 sticky 
        ${menuOpen ? "w-60" : "w-auto"}
        ${styles.menu}`}
      >
        <div className="mt-5">
          <Link
            href="/"
            className={`flex items-center ${
              menuOpen ? "justify-start" : "justify-center"
            }`}
          >
            <Image src={logo} width={40} height={40} alt="" />
            {menuOpen ? (
              <span className="text-sm relative left-2">Workout Tracker</span>
            ) : null}
          </Link>
          <nav>
            <ul className="flex flex-col space-y-3 py-4">
              {MENU_ITEMS.map(({ id, label, link, Icon }) => (
                <li
                  key={id}
                  className={`px-2 py-1 text-gray-600 hover:text-gray-800 ${
                    link === pathanme ? "text-gray-800 bg-gray-200 rounded" : ""
                  }`}
                >
                  <Link
                    href={link}
                    className={`flex items-center ${
                      menuOpen ? "justify-start" : "justify-center"
                    }`}
                  >
                    <div className="relative">
                      <Icon className="text-xl" />
                    </div>

                    {menuOpen ? (
                      <span className="relative left-1 transition ease-in-out delay-[1000s]">
                        {label}{" "}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="w-full border border-gray-300 mb-5" />
          <Button className="w-full" onClick={handleSignOut}>
            <div className="relative">
              <HiArrowLeftOnRectangle className="text-xl" />
            </div>
            {menuOpen ? (
              <span className="relative left-1"> Sign Out</span>
            ) : null}
          </Button>
        </div>
        <div>
          <button
            className="float-right rounded-full bg-gray-200 p-2 hover:bg-gray-300"
            onClick={toggleMenu}
          >
            {" "}
            {menuOpen ? (
              <HiOutlineChevronDoubleLeft className="text-lg hover:font-bold" />
            ) : (
              <HiOutlineChevronDoubleRight className="text-lg hover:font-bold" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
