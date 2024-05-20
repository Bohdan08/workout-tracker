"use client";
import React from "react";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import { Label } from "flowbite-react";
import exercisesData from "../../../../../../../exercisesDataV2.json";
import ReactSelect, { MultiValue } from "react-select";
import useAppDispatch from "@/src/app/hooks/useAppDispatch";
import { modifyExercise } from "@/src/app/lib/store/features/workout/workoutSlice";
import { EXERCISE_MEASURMENT_TYPES } from "@/src/app/common/enums";
import CreatableSelect from "react-select/creatable";
import createExerciseSetTemplate from "@/src/app/lib/utils/createExerciseSetTemplate";
import { ExerciseSet } from "@/src/app/common/interfaces";

const MAIN_MUSCLE_GROUPS = [
  "Chest",
  "Back",
  "Upper Back",
  "Middle Back",
  "Lower Back",
  "Legs",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Forearm",
  "Abs",
  "Core",
  "Glutes",
  "Calves",
  "Full Body",
  "Hamstrings",
  "Quadriceps",
];

const MEASURMENT_SET_TYPES = [
  EXERCISE_MEASURMENT_TYPES.REPS,
  EXERCISE_MEASURMENT_TYPES.WEIGHT,
  EXERCISE_MEASURMENT_TYPES.DURATION,
  EXERCISE_MEASURMENT_TYPES.DISTANCE,
].map((v) => `${v[0]}${v.slice(1).toLowerCase()}`);

export default function SelectExerciseField({
  exerciseIndex,
  exerciseId,
}: {
  exerciseIndex: number;
  exerciseId: string;
}) {
  const workoutData = useAppSelector((store) => store.workout);

  const { exercises } = workoutData;
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

  const convertStringToSelectValue = (label: string | null) =>
    label
      ? {
          value: label.toLowerCase().split(" ").join("-"),
          label,
        }
      : null;

  const handleExercise = (exerciseId: string, options: Record<string, any>) =>
    dispatch(modifyExercise({ exerciseId, options }));

  const optionsExercisesData = convertExercisesDataToSelectOptions();
  const optionsMuscleData =
    convertArrayStringsToSelectOptions(MAIN_MUSCLE_GROUPS);

  const optionsMeasurementData =
    convertArrayStringsToSelectOptions(MEASURMENT_SET_TYPES);

  const currExercise = exercises[exerciseIndex];

  const valuesMuscleGroups = currExercise.muscleGroups?.length
    ? currExercise.muscleGroups.map((mG) => convertStringToSelectValue(mG))
    : [];

  const valuesMeasurmentTypes = currExercise.measurementTypes?.length
    ? currExercise.measurementTypes.map((mT) => convertStringToSelectValue(mT))
    : [];

  return (
    <div>
      <div className="mb-5">
        <div className="mb-2 block">
          <Label htmlFor="exercise-name">Exercise Name</Label>
        </div>

        <CreatableSelect
          id="exercise-name"
          className="custom-react-select"
          placeholder="Select or create exercise"
          isClearable
          value={convertStringToSelectValue(currExercise.title)}
          options={optionsExercisesData}
          onChange={(newValue: Record<string, any>) => {
            if (newValue?.label) {
              handleExercise(exerciseId, {
                title: newValue.label,
                muscleGroups: newValue.muscle_gps || [],
                measurementTypes: newValue.measurement_types,
                ...(!currExercise.sets?.length && {
                  sets: [createExerciseSetTemplate(newValue.measurement_types)],
                }),
              });
            } else {
              // handle a newly created exercise, not from db
              handleExercise(exerciseId, {
                title: "",
                muscleGroups: [] as string[],
                measurementTypes: null,
              });
            }
          }}
        />
      </div>

      <div className="mb-5">
        <div className="mb-2 block">
          <Label htmlFor="muscle-group" value="Musle Groups (Optional Field)" />
        </div>
        <CreatableSelect
          id="muscle-group"
          value={valuesMuscleGroups}
          placeholder="Select or add muscle groups"
          className="custom-react-select"
          isMulti
          isClearable
          options={optionsMuscleData}
          onChange={(
            updatedMusleGroups: MultiValue<Record<string, any> | null>
          ) => {
            const convertedMusclegroups = updatedMusleGroups?.length
              ? updatedMusleGroups.map((mG: any) => mG.label)
              : [];

            handleExercise(exerciseId, {
              muscleGroups: convertedMusclegroups,
            });
          }}
        />
      </div>

      {/* type of sets */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="measurement-type" value="Measurment Types" />
        </div>
        <ReactSelect
          id="measurement-type"
          value={valuesMeasurmentTypes}
          placeholder="Select measurement type"
          className="custom-react-select"
          isMulti
          options={optionsMeasurementData}
          onChange={(
            updatedMeasurementData: MultiValue<Record<string, any> | null>
          ) => {
            const convertedMeasurementData = updatedMeasurementData?.length
              ? updatedMeasurementData.map((mD: any) => mD.label)
              : [];
            let removedValues: string[] = [];

            if (currExercise.measurementTypes?.length) {
              removedValues = currExercise.measurementTypes.filter(
                (x) => !convertedMeasurementData.includes(x)
              );
            }

            handleExercise(exerciseId, {
              sets: currExercise.sets?.map((set: ExerciseSet) => {
                let modifiedSet = { ...set } as any;
                convertedMeasurementData.forEach((measurement) => {
                  const formattedMeasurement = measurement.toLowerCase();
                  // create if value doesn't exists
                  if (modifiedSet[formattedMeasurement] === undefined) {
                    modifiedSet[formattedMeasurement] = 0;
                  }

                  // removed values
                  if (removedValues.length) {
                    removedValues.forEach((removedValue) => {
                      delete modifiedSet[removedValue.toLowerCase()];
                    });
                  }
                });

                return modifiedSet;
              }),
              // sets: [createExerciseSetTemplate(convertedMeasurementData)],
              measurementTypes: convertedMeasurementData,
            });

            // handleExercise(exerciseId, {
            //   muscleGroups: convertedMusclegroups,
            // });
          }}
          // onChange={(newMeasurment) => {
          //   if (
          //     newMeasurment?.label &&
          //     newMeasurment.label !== currExercise.measurementType
          //   ) {
          // handleExercise(exerciseId, {
          //   sets: [
          //     createExerciseSetTemplate(
          //       newMeasurment.label as EXERCISE_MEASURMENT_TYPES
          //     ),
          //   ],
          //   measurementType: newMeasurment.label,
          //     });
          //   }
          // }}
        />
      </div>
    </div>
  );
}
