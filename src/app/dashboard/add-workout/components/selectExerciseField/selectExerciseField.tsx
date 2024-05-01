"use client";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import { Label } from "flowbite-react";
import React from "react";
import exercisesData from "../../../../../../exercisesData.json";
import ReactSelect, { MultiValue } from "react-select";
import useAppDispatch from "@/src/app/hooks/useAppDispatch";
import { modifyExercise } from "@/src/app/lib/store/features/newWorkout/newWorkoutSlice";
import { EXERCISE_TYPES } from "@/src/app/common/enums";
import CreatableSelect, { useCreatable } from "react-select/creatable";
import createExerciseSetTemplate from "@/src/app/lib/utils/createExerciseSetTemplate";

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

export enum MEASURMENT_TYPES {
  REPS_WEIGHTS = "Reps/Weights",
  DURATION_DISTANCE = "Duration/Distance",
}

const identifyMeasurmentType = (exerciseName: string) => {
  const formattedExerciseName = exerciseName.toLocaleLowerCase();

  if (
    formattedExerciseName.includes("running") ||
    formattedExerciseName.includes("walking") ||
    formattedExerciseName.includes("bike")
  ) {
    return MEASURMENT_TYPES.DURATION_DISTANCE;
  }

  return MEASURMENT_TYPES.REPS_WEIGHTS;
};

const MEASURMENT_SET_TYPES = [
  MEASURMENT_TYPES.REPS_WEIGHTS,
  MEASURMENT_TYPES.DURATION_DISTANCE,
];

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

  const convertArrayStringsToSelectOptions = (data: string[]) =>
    data.map((label) => ({
      value: label.toLowerCase(),
      label,
    }));

  const convertStringToSelectValue = (label: string) => ({
    value: label.toLowerCase().split(" ").join("-"),
    label,
  });

  const handleExercise = (exerciseId: string, options: Record<string, any>) =>
    dispatch(modifyExercise({ exerciseId, options }));

  const optionsExercisesData = convertExercisesDataToSelectOptions();
  const optionsMuscleData =
    convertArrayStringsToSelectOptions(MAIN_MUSCLE_GROUPS);

  const optionsMeasurmentData =
    convertArrayStringsToSelectOptions(MEASURMENT_SET_TYPES);

  const currExercise = exercises[exerciseIndex];

  const valuesMuscleGroups = currExercise.muscleGroups?.length
    ? currExercise.muscleGroups.map((m) => convertStringToSelectValue(m))
    : [];

  return (
    <div>
      <div className="mb-5">
        <div className="mb-2 block">
          <Label htmlFor="exercise-name">Exercise Name</Label>
        </div>

        {/* <ReactSelect
        id="exercise"
        placeholder="Select exercise"
        className="custom-react-select"
        value={convertStringToSelectValue(currExercise.title)}
        options={optionsExercisesData}
        onChange={(newValue) => {
          if (newValue?.label) {
            handleExercise(exerciseId, {
              title: newValue.label,
              // muscleGroups: (newValue as any).muscle_gp,
              type: identifyExerciseType(newValue.label),
            });
          }
        }}
      /> */}

        <CreatableSelect
          id="exercise-name"
          className="custom-react-select"
          placeholder="Select or create exercise"
          isClearable
          value={
            currExercise.title
              ? convertStringToSelectValue(currExercise.title)
              : null
          }
          options={optionsExercisesData}
          onChange={(newValue: Record<string, any>) => {
            if (newValue?.label) {
              handleExercise(exerciseId, {
                title: newValue.label,
                muscleGroups: newValue.muscle_gp ? [newValue.muscle_gp] : [],
                measurmentType: newValue.muscle_gp
                  ? identifyMeasurmentType(newValue.label)
                  : null,
                // create set if musle group is known and sets haven't been created by user
                ...(newValue.muscle_gp &&
                  !currExercise.sets?.length && {
                    sets: [
                      createExerciseSetTemplate(
                        identifyMeasurmentType(newValue.muscle_gp)
                      ),
                    ],
                  }),
              });
            } else {
              handleExercise(exerciseId, {
                title: "",
                muscleGroups: [] as string[],
                measurmentType: null,
              });
            }
          }}
        />
      </div>

      <div className="mb-5">
        <div className="mb-2 block">
          <Label htmlFor="muscle-group" value="Musle Groups (Optional)" />
        </div>
        <CreatableSelect
          id="muscle-group"
          value={valuesMuscleGroups}
          placeholder="Select or add muscle groups"
          className="custom-react-select"
          isMulti
          isClearable
          options={optionsMuscleData}
          onChange={(updatedMusleGroups: MultiValue<Record<string, any>>) => {
            const convertedMusclegroups = updatedMusleGroups?.length
              ? updatedMusleGroups.map((m) => m.label)
              : [];

            handleExercise(exerciseId, {
              muscleGroups: convertedMusclegroups,
            });
          }}
        />
      </div>

      {/* type of set */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="measurment-type" value="Measurment Type" />
        </div>
        <ReactSelect
          id="measurment-type"
          value={
            currExercise.measurmentType
              ? convertStringToSelectValue(currExercise.measurmentType)
              : null
          }
          placeholder="Select measurment type"
          className="custom-react-select"
          isClearable
          options={optionsMeasurmentData}
          onChange={(newMeasurment) => {
            if (
              newMeasurment?.label &&
              newMeasurment.label !== currExercise.measurmentType
            ) {
              handleExercise(exerciseId, {
                sets: [
                  createExerciseSetTemplate(
                    newMeasurment.label as MEASURMENT_TYPES
                  ),
                ],
                measurmentType: newMeasurment.label,
              });
            }
          }}
        />
      </div>
    </div>
  );
}
