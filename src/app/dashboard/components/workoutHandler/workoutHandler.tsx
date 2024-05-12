"use client";
import { Card, Button, Tooltip, Alert, Datepicker } from "flowbite-react";
import React, { useState } from "react";
import { HiPlus, HiCheckCircle } from "react-icons/hi";
import useAppSelector from "../../../hooks/useAppSelector";

import styles from "./workoutHandler.module.scss";
import { useDispatch } from "react-redux";
import {
  addExercise,
  resetWorkout,
  setWorkoutDate,
} from "../../../lib/store/features/workout/workoutSlice";
import ActionModal from "../../../common/components/actionModal";
import { useAuth } from "../../../context/authContext";
import addWorkout from "@/src/firebase/firestore/setUserWorkout";
import formatDate from "../../../lib/utils/formatDate";
import LoadingView from "../loadingView";
import ErrorView from "../errorView";
import { API_STATUS } from "@/src/app/common/enums";
import updateUserWorkout from "@/src/firebase/firestore/updateUserWorkout";
import ExerciseCardHeader from "./components/exerciseCardHeader/exerciseCardHeader";
import SelectExerciseField from "./components/selectExerciseField/selectExerciseField";
import ExerciseSets from "./components/exerciseSets";
import ExerciseNotesField from "./components/exerciseNotesField/exerciseNotesField";
import WorkoutSummary from "./components/summaryCard/summaryCard";
import { MAX_EXERCISES } from "@/src/app/common/constants";
import { DASHBOARD_MENU_HEADER } from "@/src/app/common/styles";

export enum WORKOUT_TYPE {
  NEW = "NEW",
  EXISTING = "EXISTING",
}

interface WorkoutHandlerProp {
  workoutId?: string;
  workoutType: WORKOUT_TYPE;
  onSaveChanges?: () => void;
}

export default function WorkoutHandler({
  workoutId,
  workoutType,
  onSaveChanges,
}: WorkoutHandlerProp) {
  const { user } = useAuth();

  const workoutData = useAppSelector((store) => store.workout);

  const { exercises, workoutDate } = workoutData;

  const dispatch = useDispatch();
  const [saveWorkoutViewModal, setSaveWorkoutViewModal] = useState(false);

  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [apiError, setApiError] = useState("");

  const closeSaveWorkoutViewModal = () => setSaveWorkoutViewModal(false);

  const handleAddExercise = () => dispatch(addExercise());

  const handleWorkoutDate = (newDate: string) =>
    dispatch(setWorkoutDate(newDate));

  const handleSaveWorkout = async () => {
    closeSaveWorkoutViewModal();
    setApiStatus(API_STATUS.LOADING);

    const fireStoreMethod =
      workoutType === WORKOUT_TYPE.EXISTING ? updateUserWorkout : addWorkout;

    const { result, error, errorMessage } = await fireStoreMethod(
      user?.uid as string,

      workoutData
    );

    if (error) {
      setApiStatus(API_STATUS.ERROR);
      setApiError(errorMessage);
    }

    setApiStatus(API_STATUS.SUCCESS);
    dispatch(resetWorkout());

    if (onSaveChanges) {
      onSaveChanges();
    }
  };

  const unfinishedFields = exercises?.filter(
    ({ title }) => title.trim() === ""
  );

  return (
    <>
      <div className="">
        <div className="max-w-4xl w-full">
          <div>
            <h1 className={`${DASHBOARD_MENU_HEADER} text-left`}>
              Your Workout
            </h1>
            <div className="mt-5">
              {apiStatus === API_STATUS.ERROR ? (
                <ErrorView message={apiError} />
              ) : null}

              {apiStatus === API_STATUS.LOADING ? (
                <LoadingView title="Saving Your Changes" />
              ) : null}

              {apiStatus === API_STATUS.SUCCESS ? (
                <Alert
                  color="success"
                  className="w-fit text-center flex flex-col justify-center"
                >
                  <p className="font-medium text-xl">Success!</p>
                  <p className="text-lg">
                    {" "}
                    {workoutType !== WORKOUT_TYPE.EXISTING
                      ? "You workout has been saved!"
                      : "Your workout has been edited!"}{" "}
                  </p>
                  {workoutType !== WORKOUT_TYPE.EXISTING ? (
                    <Button
                      className="mt-5 mx-auto"
                      onClick={() => setApiStatus(API_STATUS.IDLE)}
                    >
                      Add a new Workout
                    </Button>
                  ) : null}
                </Alert>
              ) : null}

              {apiStatus === API_STATUS.IDLE ||
              apiStatus === API_STATUS.ERROR ? (
                <div className="flex w-full md:space-x-14 justify-between">
                  <div className="max-w-md w-full">
                    <div className="mb-5">
                      <p className="mb-2 font-medium">Workout Date</p>
                      <Datepicker
                        value={workoutDate as string}
                        onSelectedDateChanged={(newDate) =>
                          handleWorkoutDate(formatDate(newDate))
                        }
                        minDate={new Date(2022, 0, 1)}
                        maxDate={new Date(new Date().getFullYear(), 12, 31)}
                      />
                    </div>
                    {exercises.map(
                      (
                        { hidden, id: exerciseId, type: exerciseType },
                        index
                      ) => {
                        return (
                          <div className="mt-5" key={exerciseId}>
                            <Card className={`${hidden ? "h-12" : ""}`}>
                              <ExerciseCardHeader exerciseIndex={index} />

                              {!hidden && (
                                <div className="flex max-w-md flex-col gap-4">
                                  <SelectExerciseField
                                    exerciseIndex={index}
                                    exerciseId={exerciseId}
                                  />
                                  <ExerciseSets
                                    exerciseIndex={index}
                                    exerciseId={exerciseId}
                                  />
                                  <ExerciseNotesField
                                    exerciseIndex={index}
                                    exerciseId={exerciseId}
                                  />
                                </div>
                              )}
                            </Card>
                          </div>
                        );
                      }
                    )}
                    <Button
                      disabled={exercises?.length === MAX_EXERCISES}
                      className="w-full mt-5"
                      onClick={handleAddExercise}
                    >
                      <span> Add exercise </span>
                      <HiPlus className="my-auto ml-1" />
                    </Button>
                    {exercises?.length === MAX_EXERCISES ? (
                      <p className="text-red-600 mt-3">
                        You reached a maximum of {MAX_EXERCISES} exercises per
                        workout.
                      </p>
                    ) : null}
                    <div
                      className={`${styles.saveWorkoutTooltipContainer} 
            ${
              unfinishedFields.length === 0 ? styles.hiddenTooltip : ""
            } w-full`}
                    >
                      <Tooltip
                        content={
                          unfinishedFields.length > 0
                            ? "Please name all exercises before saving the workout"
                            : ""
                        }
                      >
                        <Button
                          disabled={unfinishedFields.length > 0}
                          type="submit"
                          className="w-full mt-5"
                          color="success"
                          onClick={() => setSaveWorkoutViewModal(true)}
                        >
                          <span> Save Workout </span>
                          <HiCheckCircle className="my-auto ml-1" />
                        </Button>
                      </Tooltip>
                    </div>{" "}
                  </div>

                  {/*  */}
                  <div className={`w-[300px] hidden md:block`}>
                    <WorkoutSummary exercises={exercises} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <ActionModal
        title="Are you sure?"
        acceptButtonColor="success"
        showModal={saveWorkoutViewModal}
        closeModal={closeSaveWorkoutViewModal}
        handleAccept={handleSaveWorkout}
      />
    </>
  );
}
