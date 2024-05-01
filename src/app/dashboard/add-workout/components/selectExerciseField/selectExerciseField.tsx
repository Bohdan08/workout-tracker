"use client";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import { Label, TextInput } from "flowbite-react";
import React from "react";
import exercisesData from "../../../../../../exercisesData.json";
import ReactSelect from "react-select";
import useAppDispatch from "@/src/app/hooks/useAppDispatch";
import { modifyExercise } from "@/src/app/lib/store/features/newWorkout/newWorkoutSlice";
import { EXERCISE_TYPES } from "@/src/app/common/enums";
import CreatableSelect, { useCreatable } from "react-select/creatable";

const MAIN_MUSCLE_GROUPS = [
  "Abdominals",
  "Biceps",
  "Calves",
  "Chest",
  "Forearm",
  "Glutes",
  "Hamstrings",
  "Lower Back",
  "Neck",
  "Quadriceps",
  "Shoulder",
  "Trapezius",
  "Triceps",
  "Middle/Upper Back",
];

type Options = Record<string, string | number | boolean>;

const identifyExerciseType = (exerciseName: string) => {
  const formattedExerciseName = exerciseName.toLocaleLowerCase();

  if (
    formattedExerciseName.includes("running") ||
    formattedExerciseName.includes("walking") ||
    formattedExerciseName.includes("bike")
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

  const convertExercisesDataToSelectOptions = () => {
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

  const convertMuscleDataToSelectOptions = () =>
    MAIN_MUSCLE_GROUPS.map((label) => ({
      value: label.toLowerCase(),
      label,
    }));

  const convertStringToSelectValue = (label: string) => ({
    value: label.toLowerCase().split(" ").join("-"),
    label,
  });

  const handleExerciseTitle = (exerciseId: string, options: Options) =>
    dispatch(modifyExercise({ exerciseId, options }));

  const optionsExercisesData = convertExercisesDataToSelectOptions();
  const optionsMuscleData = convertMuscleDataToSelectOptions();

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
        options={optionsExercisesData}
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

      <CreatableSelect
        id="exercise"
        className="custom-react-select"
        isClearable
        value={convertStringToSelectValue(exercises[exerciseIndex].title)}
        options={optionsExercisesData}
        onChange={(newValue) => {
          if (newValue?.label) {
            handleExerciseTitle(exerciseId, {
              title: newValue.label,
              muscleGroup: (newValue as any).muscle_gp,
              type: identifyExerciseType(newValue.label),
            });
          } else {
            handleExerciseTitle(exerciseId, {
              title: "",
              muscleGroup: "",
            });
          }
        }}
      />

      <div>
        <div className="mb-2 block">
          <Label htmlFor="muscle-group" value="Musle Group" />
        </div>
        <CreatableSelect
          className="custom-react-select"
          isMulti
          isClearable
          options={optionsMuscleData}
        />
      </div>
    </div>
  );
}
