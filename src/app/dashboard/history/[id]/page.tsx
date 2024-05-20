"use client";
import React, { useEffect, useState } from "react";
import { API_STATUS } from "@/src/app/common/enums";
import { useAuth } from "@/src/app/context/authContext";
// import LoadingView from "./views/loadingView/loadingView";
import SuccessView from "./views/successView";
import ErrorView from "../../components/errorView/errorView";
import LoadingView from "../../components/loadingView/loadingView";
import getUserWorkoutById from "@/src/firebase/firestore/getUserWorkoutById";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import { useDispatch } from "react-redux";
import {
  resetWorkout,
  setWorkout,
} from "@/src/app/lib/store/features/workout/workoutSlice";

export default function Page({
  params: { id: workoutId },
}: {
  params: { id: string };
}) {
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const { user } = useAuth();

  const workoutData = useAppSelector((store) => store.workout);
  const dispatch = useDispatch();

  const resetOnEdit = () => {
    setApiStatus(API_STATUS.IDLE);
    dispatch(resetWorkout());
  };

  const fetchWorkoutData = async () => {
    setApiStatus(API_STATUS.LOADING);
    // await fetchWorkoutById
    const { result, error, errorMessage } = await getUserWorkoutById(
      user?.uid as string,
      workoutId
    );

    if (error) {
      setApiStatus(API_STATUS.ERROR);
      setApiErrorMessage(errorMessage);
      return;
    }

    if (result) {
      setApiStatus(API_STATUS.SUCCESS);
      dispatch(setWorkout(result));
    }
  };

  useEffect(() => {
    if (
      user?.uid &&
      apiStatus === API_STATUS.IDLE &&
      workoutData?.id !== workoutId
    ) {
      fetchWorkoutData();
    }
  }, [apiStatus, user?.uid, workoutData, workoutId]);

  if (apiStatus === API_STATUS.ERROR) {
    return <ErrorView message={apiErrorMessage} />;
  }

  if (apiStatus === API_STATUS.LOADING) {
    return <LoadingView title="Retrieving Your Workout" />;
  }

  // successfully fetched
  if (apiStatus === API_STATUS.SUCCESS && workoutData?.id) {
    return <SuccessView resetOnEdit={resetOnEdit} />;
  }

  // got from redux
  if (workoutId === workoutData.id) {
    return <SuccessView resetOnEdit={resetOnEdit} />;
  }
}
