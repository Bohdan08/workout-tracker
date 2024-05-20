"use client";
import React, { useEffect } from "react";
import { Alert } from "flowbite-react";
import { useAuth } from "../../context/authContext";
import { fetchWorkoutsHistory } from "../../lib/store/features/workoutsHistory/workoutsHistorySlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import LoadingView from "../components/loadingView/loadingView";
import ErrorView from "../components/errorView/errorView";
import { API_STATUS } from "../../common/enums";
import WorkoutsTable from "./workoutsTable";
import { DASHBOARD_MENU_HEADER } from "../../common/styles";

export default function History() {
  const { user } = useAuth();

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
        <>
          <h1 className={`${DASHBOARD_MENU_HEADER} text-left mb-5`}>
            Workouts List
          </h1>

          <WorkoutsTable />
        </>
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
