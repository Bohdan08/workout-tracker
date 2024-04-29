"use client";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import React, { useEffect } from "react";
import { API_STATUS } from "@/src/app/common/enums";
import useAppDispatch from "@/src/app/hooks/useAppDispatch";
import { fetchWorkoutById } from "@/src/app/lib/store/features/selectedWorkout/selectedWorkoutSlice";
import { useAuth } from "@/src/app/context/authContext";
import LoadingView from "./views/loadingView/loadingView";
import ErrorView from "./views/errorView";
import SuccessView from "./views/successView";

export default function Page({
  params: { id: workoutId },
}: {
  params: { id: string };
}) {
  const { user } = useAuth();

  const { data, apiStatus, apiErrorMessage } = useAppSelector(
    (store) => store.selectedWorkout
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    // check if workout hasn't been logged
    if (user?.uid && data.id === null && apiStatus === API_STATUS.IDLE) {
      dispatch(fetchWorkoutById({ userId: user.uid, workoutId }));
    }
  }, [data, apiStatus, dispatch, user?.uid, workoutId]);

  if (apiStatus === API_STATUS.ERROR) {
    return <ErrorView message={apiErrorMessage} />;
  }

  if (apiStatus === API_STATUS.LOADING) {
    return <LoadingView />;
  }

  if (apiStatus === API_STATUS.SUCCESS && data.id) {
    return <SuccessView />;
  }
}
