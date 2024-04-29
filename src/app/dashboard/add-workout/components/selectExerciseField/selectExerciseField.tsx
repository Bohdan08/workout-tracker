"use client";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import { Label } from "flowbite-react";
import React from "react";
import exercisesData from "../../../../../../exercisesData.json";
import ReactSelect from "react-select";
import useAppDispatch from "@/src/app/hooks/useAppDispatch";
import { modifyExercise } from "@/src/app/lib/store/features/newWorkout/newWorkoutSlice";
import { EXERCISE_TYPES } from "@/src/app/common/enums";

type Options = Record<string, string | number | boolean>;

const identifyExerciseType = (exerciseName: string) => {
  const formattedExerciseName = exerciseName.toLocaleLowerCase();

  if (
    formattedExerciseName.includes("running") ||
    formattedExerciseName.includes("walking")
  ) {
    return EXERCISE_TYPES.CARDIO;
  }

  return EXERCISE_TYPES.STENGTH;
};

export default function SelectExerciseField({
  exerciseIndex,
  exerciseId,
}: {
  exerciseIndex: number;
  exerciseId: string;
}) {
  const newWorkoutData = useAppSelector((store) => store.newWorkout);

  const { exercises } = newWorkoutData;
  const dispatch = useAppDispatch();

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

  const handleExerciseTitle = (exerciseId: string, options: Options) =>
    dispatch(modifyExercise({ exerciseId, options }));

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="exercise">Exercise {exerciseIndex + 1}</Label>
      </div>

      <ReactSelect
        id="exercise"
        placeholder="Select exercise"
        className="custom-react-select"
        value={convertStringToSelectValue(exercises[exerciseIndex].title)}
        options={convertDataToSelectOptions()}
        onChange={(newValue) => {
          if (newValue?.label) {
            handleExerciseTitle(exerciseId, {
              title: newValue.label,
              muscleGroup: (newValue as any).muscle_gp,
              type: identifyExerciseType(newValue.label),
            });
          }
        }}
      />
    </div>
  );
}
