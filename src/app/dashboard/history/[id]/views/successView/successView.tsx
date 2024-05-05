"use client";
import getAffectedMuscleGroups from "@/src/app/lib/utils/getAffectedMuscleGroups";
import React, { useState } from "react";
import TotalCard from "../../components/totalCard";
import {
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
import { WorkoutData } from "@/src/app/common/interfaces";
import { EXERCISE_TYPES } from "@/src/app/common/enums";

import styles from "./successView.module.scss";
import WorkoutHandler, {
  WORKOUT_TYPE,
} from "@/src/app/dashboard/components/workoutHandler/workoutHandler";
import { useDispatch } from "react-redux";
import {
  resetWorkout,
  setWorkout,
} from "@/src/app/lib/store/features/workout/workoutSlice";
import useAppSelector from "@/src/app/hooks/useAppSelector";

enum WORKOUT_STATUS {
  EDIT = "EDIT",
  VIEW = "VIEW",
}

export default function SuccessView({
  data,
  resetOnEdit,
}: {
  data: WorkoutData;
  resetOnEdit: () => void;
}) {
  const [workoutStatus, setWorkoutStatus] = useState(WORKOUT_STATUS.VIEW);

  // const { exercises, workoutDate, weightUnit, distanceUnit } = data;
  const workoutData = useAppSelector((store) => store.workout);
  const { exercises, workoutDate, weightUnit, distanceUnit } = workoutData;

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
    // reset workout in redux
    dispatch(resetWorkout());
  };

  return (
    <div>
      <Link
        href="/dashboard/history"
        className="flex items-center space-x-1 mb-5 w-fit text-gray-600 hover:text-black hover:underline"
      >
        <HiArrowLeft /> <span>Back to All workouts</span>
      </Link>
      <div className="my-5">
        {workoutStatus === WORKOUT_STATUS.VIEW ? (
          <Button color="warning" onClick={handleEditWorkout}>
            Edit Workout
          </Button>
        ) : (
          <Button color="blue" onClick={handleViewWorkout}>
            View Workout
          </Button>
        )}
      </div>
      {workoutStatus === WORKOUT_STATUS.VIEW ? (
        <>
          <h1 className="text-3xl font-medium">
            {" "}
            Workout Summary for {workoutDate as string}
          </h1>

          <div>
            <div className="mt-5 flex space-x-5">
              <TotalCard title="Exercises" total={exercises.length} />
              <TotalCard title="Sets" total={totalSets} />
              <TotalCard title="Reps" total={totalReps} />
              <TotalCard title={`Weight (${weightUnit})`} total={totalWeight} />
            </div>
            {/* <div className="mt-5">
            <h2 className="text-2xl font-medium">Musle Groups</h2>
            <div className="flex mt-2">
              {affectedMuscleGroups.map((muscle, index) => (
                <Badge
                  key={muscle}
                  color={BADGE_COLORS[index % affectedMuscleGroups.length]}
                  className="w-fit text-xl mb-2 mr-2 px-3 py-2"
                >
                  {muscle}
                </Badge>
              ))}
            </div>
          </div> */}
            <div className="mt-5">
              {" "}
              <h2 className="text-2xl font-medium">Exercises </h2>{" "}
              <div className="mt-5 flex flex-wrap">
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
                    },
                    index
                  ) => {
                    let tableHeaders = ["#", "Reps", `Weight (${weightUnit})`];

                    if (exerciseType === EXERCISE_TYPES.CARDIO) {
                      tableHeaders = [
                        "#",
                        `Duration (Min)`,
                        `Distance (${distanceUnit})`,
                      ];
                    }

                    return (
                      <Card
                        key={exerciseId}
                        className={`md:w-[350px] relative h-fit mr-5 mb-5 ${styles.exerciseCard}`}
                      >
                        <div className="flex h-full flex-col space-y-5 items-start">
                          <div className="flex justify-between w-full px-4">
                            <h3 className="text-xl font-medium relative">
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
                                    const {
                                      id: setId,
                                      reps,
                                      weight,
                                      duration,
                                      distance,
                                    } = obj;

                                    let tableCells = [reps, weight];

                                    if (
                                      exerciseType === EXERCISE_TYPES.CARDIO
                                    ) {
                                      tableCells = [duration, distance];
                                    }

                                    return (
                                      <TableRow key={setId}>
                                        <TableCell>{index + 1}</TableCell>
                                        {tableCells.map((tableCell) => (
                                          <TableCell key={tableCell}>
                                            {tableCell || "N/A"}
                                          </TableCell>
                                        ))}
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </div>
                          ) : (
                            <div className="px-4">
                              {" "}
                              <p>No sets and reps have been logged...</p>{" "}
                            </div>
                          )}

                          {notes ? (
                            <div className="mt-5 px-4">
                              <p className="text-lg font-medium">
                                {" "}
                                Additional Details{" "}
                              </p>
                              <p className="mt-1 text-gray-700">{notes}</p>
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

      {workoutStatus === WORKOUT_STATUS.EDIT ? (
        <WorkoutHandler
          onSaveChanges={resetOnEdit}
          workoutType={WORKOUT_TYPE.EXISTING}
        />
      ) : null}
    </div>
  );
}
