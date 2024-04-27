"use client";
import {
  Label,
  TextInput,
  Card,
  Button,
  Textarea,
  Tooltip,
  Spinner,
  Alert,
} from "flowbite-react";
import Select from "react-select";
import React, { useState } from "react";
import { HiPlus, HiMinus, HiTrash, HiCheckCircle } from "react-icons/hi";
import exercisesData from "../../../../exercisesData.json";
import useAppSelector from "../../hooks/useAppSelector";

import styles from "./page.module.scss";
import { useDispatch } from "react-redux";
import {
  addExercise,
  addExerciseSet,
  deleteExercise,
  deleteExerciseSet,
  modifyExercise,
  modifyExerciseSet,
  resetWorkout,
} from "../../lib/store/features/newWorkout/newWorkoutSlice";
import WorkoutSummaryCard from "./components/summaryCard/summaryCard";
import ActionModal from "../../common/components/actionModal";
import { useAuth } from "../../context/authContext";
import { EXERCISE_TYPES } from "../../common/enums";
import { API_STATUS } from "../../common/constants";
import addWorkout from "@/src/firebase/firestore/addWorkout";

export enum ACTION_ITEMS {
  SET = "SET",
  EXERCISE = "EXERCISE",
}

type Options = Record<string, string | number | boolean>;

const identifyExerciseType = (exerciseName: string) => {
  if (exerciseName.toLocaleLowerCase().includes("running")) {
    return EXERCISE_TYPES.CARDIO;
  }

  return EXERCISE_TYPES.STENGTH;
};

export default function Page() {
  const { user } = useAuth();
  const { exercises } = useAppSelector((store) => store.newWorkout);
  const dispatch = useDispatch();
  // console.log(user, "user");
  const [deleteViewModal, setDeleteViewModal] = useState(false);
  const [saveWorkoutViewModal, setSaveWorkoutViewModal] = useState(false);

  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [apiError, setApiError] = useState("");

  const [deleteItemInfo, setDeleteItemInfo] = useState<{
    type?: string;
    exerciseId?: string;
    setId?: string;
  }>({});

  const closeDeleteViewModal = () => setDeleteViewModal(false);
  const closeSaveWorkoutViewModal = () => setSaveWorkoutViewModal(false);

  const handleAddExercise = () => dispatch(addExercise());
  const handleDeleteExercise = (exerciseId: string) =>
    dispatch(deleteExercise(exerciseId));

  const handleAddSet = (exerciseId: string) =>
    dispatch(addExerciseSet(exerciseId));

  const handleDeleteSet = (exerciseId: string, setId: string) =>
    dispatch(deleteExerciseSet({ exerciseId, setId }));

  const handleModifyExercise = (exerciseId: string, options: Options) => {
    dispatch(modifyExercise({ exerciseId, options }));
  };

  const handleModifySet = (
    exerciseId: string,
    setId: string,
    options: Options
  ) => dispatch(modifyExerciseSet({ exerciseId, setId, options }));

  const handleDeleteItem = () => {
    if (
      deleteItemInfo.type === ACTION_ITEMS.SET &&
      deleteItemInfo.setId &&
      deleteItemInfo.exerciseId
    ) {
      handleDeleteSet(deleteItemInfo.exerciseId, deleteItemInfo.setId);
    } else {
      handleDeleteExercise(deleteItemInfo.exerciseId as string);
    }

    // reset delete info
    setDeleteViewModal(false);
    setDeleteItemInfo({});
  };

  const convertDataToSelectOptions = () => {
    // exclude already added exercises by user
    const exludedExercises = exercises.map((obj) => obj.title);

    return exercisesData
      .filter((obj) => !exludedExercises.includes(obj.name))
      .map((obj) => ({
        ...obj,
        value: obj.name.toLowerCase().split(" ").join("-"),
        label: obj.name,
      }));
  };

  const convertStringToSelectValue = (label: string) => ({
    value: label.toLowerCase().split(" ").join("-"),
    label,
  });

  const affectedMuscleGroups = [
    ...new Set(
      exercises
        .filter((obj) => obj.muscleGroup !== "")
        .map((obj) => obj.muscleGroup)
    ),
  ];

  const handleSaveWorkout = async () => {
    closeSaveWorkoutViewModal();
    setApiStatus(API_STATUS.LOADING);

    const { error, errorMessage } = await addWorkout(
      user?.uid as string,
      exercises
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
      <div>
        <h1 className="text-3xl font-medium">New Workout</h1>
        <div className="max-w-md mt-5">
          {apiStatus === API_STATUS.ERROR ? (
            <Alert
              color="failure"
              className="text-center flex flex-col justify-center items-center mb-5"
            >
              <p className="font-semibold text-xl">Error!</p>
              <div className="text-lg mt-3">
                <p> Sorry, we couldn&apos;t save your workout... </p>
                {apiError && <p> Reason: {apiError} </p>}
                <p>Please try again later.</p>
              </div>
            </Alert>
          ) : null}

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

          {apiStatus === API_STATUS.IDLE || apiStatus === API_STATUS.ERROR ? (
            <>
              <div className="mb-5">
                <WorkoutSummaryCard
                  affectedMuscleGroups={affectedMuscleGroups}
                />
              </div>
              {exercises.map(
                (
                  { hidden, title, sets, id: exerciseId, type: exerciseType },
                  index
                ) => {
                  return (
                    <div className="mt-5" key={exerciseId}>
                      <Card className={`${hidden ? "h-12" : ""}`}>
                        <div className="flex items-center justify-between">
                          <h3>{title ? `${index + 1}. ${title}` : null}</h3>
                          <div className="flex space-x-2">
                            {hidden ? (
                              <Tooltip
                                content="Expand Exercise"
                                className="w-36 text-center"
                              >
                                <button
                                  title="Expand Exercise"
                                  onClick={() =>
                                    handleModifyExercise(exerciseId, {
                                      hidden: false,
                                    })
                                  }
                                >
                                  <HiPlus />
                                </button>
                              </Tooltip>
                            ) : (
                              <Tooltip
                                content="Hide Exercise"
                                className="w-32 text-center"
                              >
                                <button
                                  title="Hide Exercise"
                                  onClick={() =>
                                    handleModifyExercise(exerciseId, {
                                      hidden: true,
                                    })
                                  }
                                >
                                  <HiMinus />
                                </button>
                              </Tooltip>
                            )}
                            <Tooltip content={`Delete this exercise`}>
                              <button
                                onClick={() => {
                                  setDeleteViewModal(true);
                                  setDeleteItemInfo({
                                    type: ACTION_ITEMS.EXERCISE,
                                    exerciseId,
                                  });
                                }}
                              >
                                <HiTrash color="red" />
                              </button>
                            </Tooltip>
                          </div>
                        </div>

                        {!hidden && (
                          <div className="flex max-w-md flex-col gap-4">
                            <div>
                              <div className="mb-2 block">
                                <Label htmlFor="exercise">
                                  Exercise {index + 1}
                                </Label>
                              </div>

                              {/* <TextInput
                          id="exercise"
                          type="text"
                          placeholder="Type your exercise"
                          required
                          list="exercises"
                          value={title}
                          onChange={({ target }) =>
                            changeExerciseField(
                              exerciseId,
                              "title",
                              target.value
                            )
                          }
                        />
                        <datalist id="exercises">
                          {exercisesData.map(({ name }) => (
                            <option key={name}>{name}</option>
                          ))}
                        </datalist> */}

                              <Select
                                id="exercise"
                                className={styles.exerciseSelect}
                                value={convertStringToSelectValue(title)}
                                // className="test border-red-400 border-2 focus:outline-none"
                                options={convertDataToSelectOptions()}
                                onChange={(newValue) => {
                                  if (newValue?.label) {
                                    handleModifyExercise(exerciseId, {
                                      title: newValue.label,
                                      muscleGroup: (newValue as any).muscle_gp,
                                      type: identifyExerciseType(
                                        newValue.label
                                      ),
                                    });
                                  }
                                }}
                              />
                            </div>
                            <div>
                              {sets?.map(
                                (
                                  { id: setId, reps, weight, duration },
                                  index
                                ) => (
                                  <div key={setId} className="mt-5">
                                    <div className="flex justify-between mb-2">
                                      <h2>Set {index + 1}</h2>
                                      <Tooltip content="Delete this set">
                                        <button
                                          onClick={() => {
                                            setDeleteViewModal(true);
                                            setDeleteItemInfo({
                                              type: ACTION_ITEMS.SET,
                                              setId,
                                              exerciseId,
                                            });
                                          }}
                                        >
                                          <HiTrash color="red" />
                                        </button>
                                      </Tooltip>
                                    </div>
                                    {exerciseType === EXERCISE_TYPES.STENGTH ? (
                                      <div className="flex flex-row justify-between space-x-5">
                                        <div className="w-full">
                                          <div>
                                            <Label htmlFor={`rep-${setId}`}>
                                              Reps{" "}
                                            </Label>
                                          </div>
                                          <TextInput
                                            id={`rep-${setId}`}
                                            type="number"
                                            value={reps}
                                            min={0}
                                            required
                                            onChange={({ target }) => {
                                              handleModifySet(
                                                exerciseId,
                                                setId,
                                                {
                                                  reps: target.value,
                                                }
                                              );
                                            }}
                                          />
                                        </div>

                                        <div className="w-full">
                                          <div>
                                            <Label htmlFor={`weight-${setId}`}>
                                              Weight (LBS){" "}
                                            </Label>
                                          </div>
                                          <TextInput
                                            id={`weight-${setId}`}
                                            type="number"
                                            value={weight}
                                            min={0}
                                            required
                                            onChange={({ target }) => {
                                              handleModifySet(
                                                exerciseId,
                                                setId,
                                                {
                                                  weight: target.value,
                                                }
                                              );
                                            }}
                                          />
                                        </div>
                                      </div>
                                    ) : (
                                      // cardio
                                      <div className="w-full">
                                        <div>
                                          <Label htmlFor={`minutes-${setId}`}>
                                            Duration (Minutes){" "}
                                          </Label>
                                        </div>
                                        <TextInput
                                          id={`minutes-${setId}`}
                                          type="number"
                                          value={duration}
                                          min={0}
                                          required
                                          onChange={({ target }) => {
                                            handleModifySet(exerciseId, setId, {
                                              duration: target.value,
                                            });
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                )
                              )}
                              <Button
                                className="mt-5 w-full"
                                color="blue"
                                onClick={() => handleAddSet(exerciseId)}
                              >
                                <span> Add set </span>
                                <HiPlus className="my-auto ml-1" />
                              </Button>
                            </div>
                            <div>
                              <div className="mb-2 block">
                                <Label
                                  htmlFor="comment"
                                  value="Optional Details"
                                />
                              </div>
                              <Textarea
                                id="comment"
                                placeholder="Leave a comment..."
                                required
                                rows={4}
                              />
                            </div>
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
            </>
          ) : null}

          {apiStatus === API_STATUS.LOADING ? (
            <Card className="max-w-sm w-fit flex flex-col space-y-2 mt-5">
              {" "}
              <p className="font-medium text-xl">Saving Your Exercise</p>
              <p className="text-lg">Please wait a moment...</p>
              <div className="text-center">
                <Spinner aria-label="" size="xl" />
              </div>
            </Card>
          ) : null}
        </div>
      </div>

      <ActionModal
        title="Are you sure you want to delete it?"
        acceptButtonColor="failure"
        showModal={deleteViewModal}
        closeModal={closeDeleteViewModal}
        handleAccept={handleDeleteItem}
      />

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
