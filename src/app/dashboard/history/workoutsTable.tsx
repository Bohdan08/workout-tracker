"use client";
import {
  Alert,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React, { useState } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";
import { setWorkout } from "../../lib/store/features/workout/workoutSlice";
import { useRouter } from "next/navigation";
import formatDate from "../../lib/utils/formatDate";
import getWeekdayName from "../../lib/utils/getWeekdayName";

const WORKOUTS_PER_PAGE = 10;

export default function WorkoutsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setStartIndex((page - 1) * WORKOUTS_PER_PAGE);
  };

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { workouts } = useAppSelector((store) => store.workoutsHistory);

  return (
    <div>
      <Table>
        <TableHead>
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell>Weekday</TableHeadCell>
          <TableHeadCell>Muscles</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y text-gray-600">
          {workouts
            .slice(startIndex, startIndex + WORKOUTS_PER_PAGE)
            .map(({ id, workoutDate, allMuscleGroups }: any, index) => (
              <TableRow
                key={id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  // set workout
                  dispatch(setWorkout(workouts[index]));
                  //
                  router.push(`/dashboard/history/${id}`);
                }}
              >
                <TableCell>
                  {formatDate(workoutDate, { includeYear: false })}
                </TableCell>
                <TableCell>{getWeekdayName(workoutDate)}</TableCell>
                <TableCell>{allMuscleGroups?.join(", ")}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex overflow-x-auto sm:justify-center mt-5">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={Math.ceil(workouts.length / WORKOUTS_PER_PAGE)}
          onPageChange={onPageChange}
          previousLabel="Go back"
          nextLabel="Go forward"
          showIcons
        />
      </div>
    </div>
  );
}
