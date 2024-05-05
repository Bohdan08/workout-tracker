"use client";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";
import { API_STATUS } from "../../common/constants";
import getWeekdayName from "../../lib/utils/getWeekdayName";
import formatDate from "../../lib/utils/formatDate";
import { fetchWorkoutsHistory } from "../../lib/store/features/workoutsHistory/workoutsHistorySlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import LoadingView from "../components/loadingView/loadingView";
import ErrorView from "../components/errorView/errorView";
import { setWorkout } from "../../lib/store/features/workout/workoutSlice";

export default function History() {
  // const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  // const [apiErrorMessage, setApiErrorMessage] = useState("");

  const { user } = useAuth();
  const router = useRouter();

  const { workouts, apiStatus, apiErrorMessage } = useAppSelector(
    (store) => store.workoutsHistory
  );

  // const [data, setData] = useState<any>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.uid && apiStatus === API_STATUS.IDLE) {
      dispatch(fetchWorkoutsHistory(user.uid));
    }
  }, [user, apiStatus, dispatch]);

  // console.log(data, "data");

  return (
    <div className="overflow-x-auto">
      {apiStatus === API_STATUS.SUCCESS && workouts?.length ? (
        <>
          <Table>
            <TableHead>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Weekday</TableHeadCell>
              <TableHeadCell>Muscles</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {workouts.map(
                ({ id, created, workoutDate, allMuscleGroups }: any, index) => (
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
                )
              )}
            </TableBody>
          </Table>
        </>
      ) : null}

      {/* OTHER */}
      {apiStatus === API_STATUS.LOADING && (
        <LoadingView title="Retrieving Your Workouts" />
      )}
      {apiStatus === API_STATUS.ERROR ? (
        <ErrorView errorMessage={apiErrorMessage} />
      ) : null}

      {apiStatus === API_STATUS.SUCCESS && !workouts?.length ? (
        <Alert
          color="info"
          className="text-center flex flex-col justify-center items-center mb-5"
        >
          <p className="font-semibold text-xl">No Workouts Found!</p>
          <div className="text-lg mt-3">
            <p> You haven&apos;t created any workouts yet.</p>
          </div>
        </Alert>
      ) : null}
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
