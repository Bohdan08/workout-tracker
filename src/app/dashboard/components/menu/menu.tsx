"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Drawer } from "flowbite-react";
import styles from "./menu.module.scss";
import {
  HiBars2,
  HiTableCells,
  HiOutlineChartPie,
  HiSquaresPlus,
  HiOutlineAdjustmentsVertical,
  HiOutlineTableCells,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    link: "/dashboard/overview",
    Icon: HiOutlineChartPie,
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
  const [menuOpen, setMenuOpen] = useState(true);

  const handleClose = () => setMenuOpen(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const pathanme = usePathname();

  return (
    <>
      <aside
        className={`
        flex flex-col justify-between 
        pb-4 border-r bg-gray-100 px-2 sm:px-4 sticky 
        ${menuOpen ? "w-60" : "w-auto"}
        ${styles.menu}`}
      >
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
