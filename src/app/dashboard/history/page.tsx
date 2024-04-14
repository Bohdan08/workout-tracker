"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useRouter } from "next/navigation";

export default function History() {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell>Weekday</TableHeadCell>
          <TableHeadCell>Title</TableHeadCell>
          <TableHeadCell>Number In The week</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {SUMMARY_DATA.map(({ id, date, weekday, title, numberInTheWeek }) => (
            <TableRow
              key={id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(`/dashboard/history/${id}`)}
            >
              <TableCell>{date}</TableCell>
              <TableCell>{weekday}</TableCell>
              <TableCell>{title}</TableCell>
              <TableCell>{numberInTheWeek}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const SUMMARY_DATA = [
  {
    id: 1,
    date: "1 Feb",
    weekday: "Monday",
    title: "Chest, Legs",
    numberInTheWeek: 1,
  },
  {
    id: 2,
    date: "5 Feb",
    weekday: "Friday",
    title: "Cardio",
    numberInTheWeek: 2,
  },
  {
    id: 3,
    date: "8 Feb",
    weekday: "Monday",
    title: "Full Body",
    numberInTheWeek: 1,
  },
  {
    id: 4,
    date: "12 Feb",
    weekday: "Thursday",
    title: "Legs",
    numberInTheWeek: 2,
  },
  {
    id: 5,
    date: "14 Feb",
    weekday: "Saturday",
    title: "Back",
    numberInTheWeek: 3,
  },
  {
    id: 6,
    date: "17 Feb",
    weekday: "Tuesday",
    title: "Full Body",
    numberInTheWeek: 1,
  },
  {
    id: 7,
    date: "20 Feb",
    weekday: "Friday",
    title: "Full Body",
    numberInTheWeek: 2,
  },
  {
    id: 8,
    date: "22 Feb",
    weekday: "Sunday",
    title: "Chest, Arms",
    numberInTheWeek: 3,
  },
].reverse();
