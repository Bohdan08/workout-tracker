"use client";
import React from "react";
import TotalCard from "../../../components/totalCard/totalCard";
import useAppSelector from "@/src/app/hooks/useAppSelector";

export default function TotalCards() {
  const { workouts = [] } = useAppSelector((store) => store.workoutsHistory);

  let totalWorkouts = workouts.length;
  let totalExercises = 0;
  let totalSets = 0;
  let totalReps = 0;

  if (workouts.length) {
    workouts.forEach(({ exercises = [] }) => {
      totalExercises += exercises.length;

      if (exercises.length) {
        exercises.forEach(({ sets = [] }) => {
          totalSets += sets?.length;

          if (sets?.length) {
            sets.forEach(({ reps = 0 }) => {
              totalReps += Number(reps);
            });
          }
        });
      }
    });
  }

  return (
    <div className="mt-5">
      <div className="mb-5 flex flex-wrap gap-5 sm:flex-nowrap justify-center sm:justify-start">
        <TotalCard title="Workouts" total={totalWorkouts} />
        <TotalCard title="Exercises" total={totalExercises} />
        <TotalCard title="Sets" total={totalSets} />
        <TotalCard title="Reps" total={totalReps} />
        {/* <TotalCard title="Weight (LBS)" total={10} /> */}
      </div>
    </div>
  );
}
