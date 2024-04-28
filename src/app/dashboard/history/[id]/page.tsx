"use client";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import React from "react";
import WorkoutSummary from "../../add-workout/components/summaryCard/summaryCard";
import { Badge, Card, Datepicker, Label, TextInput } from "flowbite-react";
import { BADGE_COLORS } from "@/src/app/common/constants";
import { EXERCISE_TYPES } from "@/src/app/common/enums";
import getAffectedMuscleGroups from "@/src/app/lib/utils/getAffectedMuscleGroups";
import TotalCard from "./components/totalCard";
import ExerciseSetDetails from "./components/exerciseSetDetails";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { workouts, apiStatus, apiErrorMessage } = useAppSelector(
    (store) => store.workoutsHistory
  );

  const currIndex = workouts.findIndex((obj) => obj.id === id);
  const currWorkout = workouts[currIndex];

  if (currWorkout) {
    const { exercises, workoutDate } = currWorkout;

    const affectedMuscleGroups = getAffectedMuscleGroups(exercises);

    const totalSets = exercises.reduce((acc, obj) => {
      return acc + (obj.sets?.length || 0);
    }, 0);

    const totalReps = exercises.reduce((acc, obj) => {
      if (obj.sets?.length) {
        obj.sets.forEach((setInfo) => {
          acc += parseInt(setInfo.reps?.toString() || "");
        });
      }
      return acc;
    }, 0);

    const totalWeight = exercises.reduce((acc, obj) => {
      if (obj.sets?.length) {
        obj.sets.forEach((setInfo) => {
          acc += parseInt(setInfo.weight?.toString() || "");
        });
      }
      return acc;
    }, 0);

    return (
      <div>
        <h1 className="text-3xl font-medium">
          {" "}
          Workout Summary for {workoutDate as string}
        </h1>
        {currWorkout ? (
          <div>
            {/* <div className="mt-5">
            <Datepicker
              value={currWorkout?.workoutDate as string}
              minDate={new Date(2022, 0, 1)}
              maxDate={new Date()}
            />
          </div> */}
            <div className="mt-5 flex space-x-5">
              <TotalCard title="Exercises" total={exercises.length} />
              <TotalCard title="Sets" total={totalSets} />
              <TotalCard title="Reps" total={totalReps} />
              <TotalCard title="Weight (LBS)" total={totalWeight} />
            </div>
            <div className="mt-5">
              <h2 className="text-2xl font-medium">Musle Groups</h2>
              <div className="flex space-x-2 mt-2">
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
            </div>
            <div className="mt-5">
              {" "}
              <h2 className="text-2xl font-medium">Exercises </h2>{" "}
              <div className="mt-5 flex space-x-5">
                {exercises.map(
                  (
                    {
                      id,
                      muscleGroup,
                      sets = [],
                      notes,
                      title,
                      duration = 0,
                      type: exerciseType,
                    },
                    index
                  ) => {
                    return (
                      <Card key={id} className="md:w-[450px] h-fit">
                        <div className="flex h-full flex-col space-y-5 items-start">
                          <h3 className="text-xl font-medium">
                            {index + 1}. {title}
                          </h3>
                          <Badge
                            color={BADGE_COLORS[index % exercises.length]}
                            className="w-fit mb-2 mr-2"
                            size="sm"
                          >
                            {muscleGroup}
                          </Badge>
                          {sets.length ? (
                            <div className="mt-5">
                              {sets.map(
                                ({ id: setId, reps, weight }, index) => {
                                  return (
                                    <div key={setId}>
                                      <div className="mb-2">
                                        <p className="font-medium text-lg">
                                          Set {index + 1}
                                        </p>
                                      </div>
                                      {exerciseType ===
                                      EXERCISE_TYPES.STENGTH ? (
                                        <div className="flex flex-row justify-between space-x-10">
                                          <ExerciseSetDetails
                                            title="Reps"
                                            total={reps as number}
                                          />
                                          <ExerciseSetDetails
                                            title="Weight (LBS)"
                                            total={weight as number}
                                          />
                                        </div>
                                      ) : (
                                        // cardio
                                        <ExerciseSetDetails
                                          title="Duration (Minutes)"
                                          total={duration as number}
                                        />
                                      )}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            <div>
                              {" "}
                              <p>No sets and reps have been logged...</p>{" "}
                            </div>
                          )}

                          {notes ? (
                            <div className="mt-5">
                              <p className="text-lg font-medium">
                                {" "}
                                Additional Details{" "}
                              </p>
                              <p>{notes}</p>
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
        ) : null}
      </div>
    );
  }

  return <div>no data</div>;
}
