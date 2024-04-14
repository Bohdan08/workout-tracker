"use client";
import Link from "next/link";
import React from "react";

export default function Menu() {
  return (
    <aside className="border-r h-full w-60">
      <nav>
        <ul className="flex flex-col space-y-5 py-4">
          <li>
            <Link href="/dashboard/add-workout">Add Workout</Link>
          </li>
          <li>
            <Link href="/dashboard/summary">Summary</Link>
          </li>
          <li>
            <Link href="/dashboard/history">History</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
