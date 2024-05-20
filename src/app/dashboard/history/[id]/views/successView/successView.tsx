"use client";
import getAffectedMuscleGroups from "@/src/app/lib/utils/getAffectedMuscleGroups";
import React, { useState } from "react";
import TotalCard from "../../../../components/totalCard";
import {
  Alert,
  Badge,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { BADGE_COLORS } from "@/src/app/common/constants";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
import { API_STATUS, WORKOUT_TYPE } from "@/src/app/common/enums";

import styles from "./successView.module.scss";
import WorkoutHandler from "@/src/app/dashboard/components/workoutHandler/workoutHandler";
import { useDispatch } from "react-redux";
import { resetWorkout } from "@/src/app/lib/store/features/workout/workoutSlice";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import ActionModal from "@/src/app/common/components/actionModal";
import deleteUserWorkout from "@/src/firebase/firestore/deleteUserWorkout";
import { useAuth } from "@/src/app/context/authContext";
import ErrorView from "@/src/app/dashboard/components/errorView";
import LoadingView from "@/src/app/dashboard/components/loadingView";
import { useRouter } from "next/navigation";
import { resetWorkouts } from "@/src/app/lib/store/features/workoutsHistory/workoutsHistorySlice";

enum WORKOUT_STATUS {
  EDIT = "EDIT",
  VIEW = "VIEW",
}

export default function SuccessView({
  resetOnEdit,
}: {
  resetOnEdit: () => void;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [apiDeleteStatus, setApiDeleteStatus] = useState(API_STATUS.IDLE);
  const [apiDeleteError, setApiDeleteError] = useState("");
  const [deleteWorkoutModal, setDeleteWorkoutModal] = useState(false);
  const [workoutStatus, setWorkoutStatus] = useState(WORKOUT_STATUS.VIEW);

  // const { exercises, workoutDate, weightUnit, distanceUnit } = data;
  const workoutData = useAppSelector((store) => store.workout);
  const { exercises, workoutDate, weightUnit, distanceUnit } = workoutData;

  const closeDeleteWorkoutModal = () => setDeleteWorkoutModal(false);

  const dispatch = useDispatch();
  const affectedMuscleGroups = getAffectedMuscleGroups(exercises);

  const totalSets = exercises.reduce((acc, obj) => {
    return acc + (obj.sets?.length || 0);
  }, 0);

  const totalReps = exercises.reduce((acc, obj) => {
    if (obj.sets?.length) {
      obj.sets.forEach((setInfo) => {
        if (setInfo.reps) acc += parseInt(setInfo.reps?.toString() || "");
      });
    }
    return acc;
  }, 0);

  const totalWeight = exercises.reduce((acc, obj) => {
    if (obj.sets?.length) {
      obj.sets.forEach((setInfo) => {
        if (setInfo.weight) acc += parseInt(setInfo.weight?.toString() || "");
      });
    }
    return acc;
  }, 0);

  const handleEditWorkout = () => {
    // change state to edit
    setWorkoutStatus(WORKOUT_STATUS.EDIT);
  };

  const handleViewWorkout = () => {
    // change state to view
    setWorkoutStatus(WORKOUT_STATUS.VIEW);
    // resetOnEdit();
    // reset workout in redux
    // dispatch(resetWorkout());
  };

  const handleDeleteWorkout = () => {
    setDeleteWorkoutModal(true);
  };

  const deleteWorkoutFromDb = async () => {
    setDeleteWorkoutModal(false);

    const { error, errorMessage } = await deleteUserWorkout(
      user?.uid as string,
      workoutData.id as string
    );

    if (error) {
      setApiDeleteStatus(API_STATUS.ERROR);
      setApiDeleteError(errorMessage);
    }

    dispatch(resetWorkout());
    dispatch(resetWorkouts());
    router.push("/dashboard/history");
  };

  const additionalDetails = {
    weight: weightUnit,
    distance: distanceUnit,
    duration: "Minutes",
  };

  console.log(exercises, "exercises");

  return (
    <>
      <div>
        <Link
          href="/dashboard/history"
          className="flex items-center space-x-1 mb-5 w-fit text-gray-600 hover:text-black hover:underline"
        >
          <HiArrowLeft /> <span>Back to All workouts</span>
        </Link>

        {apiDeleteStatus === API_STATUS.ERROR ? (
          <div className="max-w-md">
            <ErrorView message={apiDeleteError} />
          </div>
        ) : null}

        {apiDeleteStatus === API_STATUS.LOADING ? (
          <div className="max-w-md">
            <LoadingView title="Deleting Your Workout" />
          </div>
        ) : null}

        {apiDeleteStatus === API_STATUS.SUCCESS ? (
          <Alert
            color="success"
            className="w-fit text-center flex flex-col justify-center"
          >
            <p className="font-medium text-xl">Success!</p>
            <p className="text-lg"> You workout has been deleted.</p>
            <Button
              // href="/dashboard/history"
              className="text-lg font-medium mt-3 mx-auto"
              onClick={() => {
                router.push("/dashboard/history");
              }}
            >
              Back to All workouts{" "}
            </Button>
          </Alert>
        ) : null}

        {apiDeleteStatus === API_STATUS.IDLE ? (
          <>
            <div className="my-5 flex space-x-4">
              {workoutStatus === WORKOUT_STATUS.VIEW ? (
                <Button color="warning" onClick={handleEditWorkout}>
                  Edit Workout
                </Button>
              ) : (
                <Button color="blue" onClick={handleViewWorkout}>
                  View Workout
                </Button>
              )}
              <Button color="failure" onClick={handleDeleteWorkout}>
                Delete Workout
              </Button>
            </div>
            {workoutStatus === WORKOUT_STATUS.VIEW ? (
              <>
                <h1 className="text-xl md:text-3xl font-medium">
                  {" "}
                  Workout Summary for {workoutDate as string}
                </h1>

                <div>
                  <div className="mt-5 flex flex-col space-y-5 sm:space-y-0 sm:space-x-5 sm:flex-row">
                    <TotalCard title="Exercises" total={exercises.length} />
                    <TotalCard title="Sets" total={totalSets} />
                    <TotalCard title="Reps" total={totalReps} />
                    <TotalCard
                      title={`Weight (${weightUnit})`}
                      total={totalWeight}
                    />
                  </div>
                  {affectedMuscleGroups?.length ? (
                    <div className="mt-5">
                      <h2 className="text-xl md:text-2xl font-medium">
                        Musle Groups
                      </h2>
                      <div className="flex mt-2">
                        {affectedMuscleGroups.map((muscle, index) => (
                          <Badge
                            key={index}
                            color={
                              BADGE_COLORS[index % affectedMuscleGroups.length]
                            }
                            className="w-fit text-base md:text-xl mb-2 mr-2 px-3 py-2"
                          >
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  <div className="mt-5">
                    {" "}
                    <h2 className="text-xl md:text-2xl font-medium">
                      Exercises
                    </h2>
                    <div className="mt-5 flex flex-col md:flex-row md:flex-wrap">
                      {exercises.map(
                        (
                          {
                            id: exerciseId,
                            muscleGroups,
                            sets = [],
                            notes,
                            title,
                            duration = 0,
                            type: exerciseType,
                            measurementTypes,
                          },
                          index
                        ) => {
                          let tableHeaders = ["#"];

                          measurementTypes?.forEach((measurementType) => {
                            const detail = (additionalDetails as any)[
                              measurementType.toLocaleLowerCase()
                            ];

                            tableHeaders.push(
                              `${measurementType}${
                                detail ? ` (${detail})` : ""
                              }`
                            );
                          });

                          return (
                            <Card
                              key={index}
                              className={`lg:w-[350px] relative h-fit md:mr-5 mb-5 ${styles.exerciseCard}`}
                            >
                              <div className="flex h-full flex-col space-y-5 items-start">
                                <div className="flex justify-between w-full px-4">
                                  <h3 className="text-lg md:text-xl font-medium relative">
                                    {index + 1}. {title}
                                  </h3>
                                </div>
                                {/* <Badge
                                  color={BADGE_COLORS[index % exercises.length]}
                                  className="w-fit mb-2 mr-2"
                                  size="sm"
                                >
                                  {muscleGroups.flat().join(",")}
                                </Badge> */}
                                {sets.length ? (
                                  <div className="mt-5 w-full">
                                    <Table className="w-full" striped>
                                      <TableHead>
                                        {tableHeaders.map((tableHeader) => (
                                          <TableHeadCell key={tableHeader}>
                                            {tableHeader}
                                          </TableHeadCell>
                                        ))}
                                      </TableHead>
                                      <TableBody className="divide-y">
                                        {sets.map((obj, index) => {
                                          const { id: setId } = obj;

                                          let tableCells: string[] = [];

                                          measurementTypes?.forEach(
                                            (measurementType) => {
                                              tableCells.push(
                                                (obj as any)[
                                                  measurementType.toLocaleLowerCase()
                                                ]
                                              );
                                            }
                                          );

                                          return (
                                            <TableRow key={index}>
                                              <TableCell>{index + 1}</TableCell>
                                              {tableCells.map(
                                                (tableCell, index) => (
                                                  <TableCell key={index}>
                                                    {tableCell !== undefined
                                                      ? tableCell
                                                      : "N/A"}
                                                  </TableCell>
                                                )
                                              )}
                                            </TableRow>
                                          );
                                        })}
                                      </TableBody>
                                    </Table>
                                  </div>
                                ) : (
                                  <div className="px-4">
                                    {" "}
                                    <p>
                                      No sets and reps have been logged...
                                    </p>{" "}
                                  </div>
                                )}

                                {notes ? (
                                  <div className="mt-5 px-4">
                                    <p className="text-lg font-medium">
                                      {" "}
                                      Additional Details{" "}
                                    </p>
                                    <p className="mt-1 text-gray-700">
                                      {notes}
                                    </p>
                                  </div>
                                ) : null}
                              </div>
                            </Card>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </>
        ) : null}

        {workoutStatus === WORKOUT_STATUS.EDIT ? (
          <WorkoutHandler
            onSaveChanges={resetOnEdit}
            workoutType={WORKOUT_TYPE.EXISTING}
          />
        ) : null}
      </div>

      <ActionModal
        title="Are you sure?"
        acceptButtonColor="success"
        showModal={deleteWorkoutModal}
        closeModal={closeDeleteWorkoutModal}
        handleAccept={deleteWorkoutFromDb}
      />
    </>
  );
}
