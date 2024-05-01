"use client";
import {
  Label,
  TextInput,
  Card,
  Button,
  Textarea,
  Tooltip,
  Alert,
  Datepicker,
} from "flowbite-react";
import React, { useState } from "react";
import { HiPlus, HiMinus, HiTrash, HiCheckCircle } from "react-icons/hi";
import useAppSelector from "../../hooks/useAppSelector";

import styles from "./page.module.scss";
import { useDispatch } from "react-redux";
import {
  addExercise,
  resetWorkout,
  setWorkoutDate,
} from "../../lib/store/features/newWorkout/newWorkoutSlice";
import WorkoutSummaryCard from "./components/summaryCard/summaryCard";
import ActionModal from "../../common/components/actionModal";
import { useAuth } from "../../context/authContext";
import { API_STATUS } from "../../common/constants";
import addWorkout from "@/src/firebase/firestore/addWorkout";
import formatDate from "../../lib/utils/formatDate";
import ErrorMessage from "./components/errorMessage";
import LoadingView from "./components/loadingCard/loadingCard";
import SelectExerciseField from "./components/selectExerciseField/selectExerciseField";
import ExerciseCardHeader from "./components/exerciseCardHeader";
import ExerciseSets from "./components/exerciseSets";
import ExerciseNotesField from "./components/exerciseNotesField";

export default function Page() {
  const { user } = useAuth();
  const newWorkoutData = useAppSelector((store) => store.newWorkout);

  const { exercises, workoutDate } = newWorkoutData;

  const dispatch = useDispatch();
  // console.log(user, "user");
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

    const { error, errorMessage } = await addWorkout(
      user?.uid as string,
      newWorkoutData
    );

    if (error) {
      setApiStatus(API_STATUS.ERROR);
      setApiError(errorMessage);
    }

    setApiStatus(API_STATUS.SUCCESS);
    dispatch(resetWorkout());
  };

  const unfinishedFields = exercises?.filter(
    ({ title }) => title.trim() === ""
  );

  return (
    <>
      <div className="">
        <div className="max-w-4xl w-full">
          <div>
            <h1 className="text-3xl font-medium text-left">Your Workout</h1>
            <div className="mt-10">
              {apiStatus === API_STATUS.ERROR ? (
                <ErrorMessage message={apiError} />
              ) : null}

              {apiStatus === API_STATUS.LOADING ? <LoadingView /> : null}

              {apiStatus === API_STATUS.SUCCESS ? (
                <Alert
                  color="success"
                  className="w-fit text-center flex flex-col justify-center"
                >
                  <p className="font-medium text-xl">Success!</p>
                  <p className="text-lg"> You workout has been saved! </p>
                  <Button
                    className="mt-5 mx-auto"
                    onClick={() => setApiStatus(API_STATUS.IDLE)}
                  >
                    Add a new Workout
                  </Button>
                </Alert>
              ) : null}

              {apiStatus === API_STATUS.IDLE ||
              apiStatus === API_STATUS.ERROR ? (
                <div className="flex w-full md:space-x-14 justify-between">
                  <div className="max-w-md w-full">
                    <div className="mb-5">
                      <Datepicker
                        value={workoutDate as string}
                        onSelectedDateChanged={(newDate) =>
                          handleWorkoutDate(formatDate(newDate))
                        }
                        minDate={new Date(2022, 0, 1)}
                        maxDate={new Date(new Date().getFullYear(), 12, 31)}
                      />
                    </div>
                    {/* <div className="mb-5">
                  <WorkoutSummaryCard exercises={exercises} />
                </div> */}
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
                    <Button className="w-full mt-5" onClick={handleAddExercise}>
                      <span> Add exercise </span>
                      <HiPlus className="my-auto ml-1" />
                    </Button>
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
                  <div className={`w-[300px]`}>
                    <WorkoutSummaryCard exercises={exercises} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <ActionModal
        title="Are you sure you want to save this workout?"
        acceptButtonColor="success"
        showModal={saveWorkoutViewModal}
        closeModal={closeSaveWorkoutViewModal}
        handleAccept={handleSaveWorkout}
      />
    </>
  );
}
