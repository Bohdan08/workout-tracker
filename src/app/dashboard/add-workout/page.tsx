"use client";
import React, { useEffect } from "react";
import useAppSelector from "../../hooks/useAppSelector";

import { useDispatch } from "react-redux";
import {
  resetWorkout,
  setWorkoutDistanceUnit,
  setWorkoutWeightUnit,
} from "../../lib/store/features/workout/workoutSlice";
import { useAuth } from "../../context/authContext";
import WorkoutHandler from "../components/workoutHandler";
import { WORKOUT_TYPE } from "../../common/enums";
import { resetWorkouts } from "../../lib/store/features/workoutsHistory/workoutsHistorySlice";

export default function Page() {
  const { user } = useAuth();
  const workoutData = useAppSelector((store) => store.workout);
  const userProfile = useAppSelector((store) => store.userProfile);

  const dispatch = useDispatch();

  useEffect(() => {
    // clean up workout on init
    if (workoutData.id) {
      dispatch(resetWorkout());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      user?.uid &&
      workoutData.weightUnit === null &&
      userProfile?.data?.weightUnit
    ) {
      dispatch(setWorkoutWeightUnit(userProfile.data.weightUnit));
    }
  }, [dispatch, user?.uid, userProfile, workoutData.weightUnit]);

  useEffect(() => {
    if (
      user?.uid &&
      workoutData.distanceUnit === null &&
      userProfile?.data?.distanceUnit
    ) {
      dispatch(setWorkoutDistanceUnit(userProfile.data.distanceUnit));
    }
  }, [dispatch, user?.uid, userProfile, workoutData.distanceUnit]);

  const onCreateNewWorkout = () => {
    // reset workouts history when new workout has been created
    dispatch(resetWorkouts());
  };

  return (
    <>
      <WorkoutHandler
        onSaveChanges={onCreateNewWorkout}
        workoutType={WORKOUT_TYPE.NEW}
      />
    </>
  );
}
