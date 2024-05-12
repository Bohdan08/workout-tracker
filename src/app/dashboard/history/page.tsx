"use client";
import React, { useEffect } from "react";
import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";
import getWeekdayName from "../../lib/utils/getWeekdayName";
import formatDate from "../../lib/utils/formatDate";
import { fetchWorkoutsHistory } from "../../lib/store/features/workoutsHistory/workoutsHistorySlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import LoadingView from "../components/loadingView/loadingView";
import ErrorView from "../components/errorView/errorView";
import { setWorkout } from "../../lib/store/features/workout/workoutSlice";
import { API_STATUS } from "../../common/enums";
import WorkoutsTable from "./workoutsTable";

export default function History() {
  const { user } = useAuth();
  const router = useRouter();

  const { workouts, apiStatus, apiErrorMessage } = useAppSelector(
    (store) => store.workoutsHistory
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.uid && apiStatus === API_STATUS.IDLE) {
      dispatch(fetchWorkoutsHistory(user.uid));
    }
  }, [user, apiStatus, dispatch]);

  return (
    <div className="overflow-x-auto">
      {apiStatus === API_STATUS.SUCCESS && workouts?.length ? (
        <WorkoutsTable />
      ) : null}

      {/* OTHER */}
      {apiStatus === API_STATUS.LOADING && (
        <LoadingView title="Retrieving Your Workouts" />
      )}
      {apiStatus === API_STATUS.ERROR ? (
        <ErrorView message={apiErrorMessage} />
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
