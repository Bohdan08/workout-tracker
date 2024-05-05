import {
  DISTANCE_METRICS,
  EXERCISE_MEASURMENT_TYPES,
  EXERCISE_TYPES,
  WEIGHT_METRICS,
} from "@/src/app/common/enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import createExerciseSetTemplate from "../../../utils/createExerciseSetTemplate";
import {
  ExerciseSet,
  Exercise,
  WorkoutData,
} from "@/src/app/common/interfaces";
import formatDate from "../../../utils/formatDate";

// const createExerciseSetTemplate = () => ({
//   id: uuid(),
//   reps: 0,
//   weight: 0,
// });

const createExerciseTemplate = () => ({
  id: uuid(),
  hidden: false,
  type: null,
  measurmentType: null,
  // metrics: WEIGHT_METRICS.LBS,
  // type: EXERCISE_TYPES.STRENGTH,
  title: "",
  // sets: [createExerciseSetTemplate()],
  notes: "",
  muscleGroups: [],
});

// export interface WorkoutData {
//   metrics: WEIGHT_METRICS.LBS;
//   workoutDate: Date | string;
//   exercises: Exercise[];
// }

const initialState: WorkoutData & { id?: string } = {
  // metrics: WEIGHT_METRICS.LBS,
  weightUnit: null,
  distanceUnit: null,
  workoutDate: formatDate(new Date()),
  exercises: [createExerciseTemplate()],
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkout(state, action: PayloadAction<WorkoutData>) {
      state.id = action.payload.id || "";
      state.distanceUnit = action.payload.distanceUnit;
      state.weightUnit = action.payload.weightUnit;
      state.exercises = action.payload.exercises;
      state.workoutDate = action.payload.workoutDate;
    },
    setWorkoutWeightUnit(state, action: PayloadAction<WEIGHT_METRICS>) {
      state.weightUnit = action.payload;
    },
    setWorkoutDistanceUnit(state, action: PayloadAction<DISTANCE_METRICS>) {
      state.distanceUnit = action.payload;
    },
    setWorkoutDate(state, action: PayloadAction<string | Date>) {
      state.workoutDate = action.payload;
    },
    addExercise(state) {
      state.exercises = [...state.exercises, createExerciseTemplate()];
    },
    addExerciseSet(state, action: PayloadAction<string>) {
      state.exercises = state.exercises.map((exercise) =>
        exercise.id !== action.payload
          ? exercise
          : {
              ...exercise,
              sets: [
                ...(exercise.sets || []),
                createExerciseSetTemplate(
                  exercise.measurmentType as EXERCISE_MEASURMENT_TYPES
                ) as any,
              ],
            }
      );
    },
    modifyExercise(
      state,
      action: PayloadAction<{
        exerciseId: string;
        options: Record<string, any>;
      }>
    ) {
      const { exerciseId, options } = action.payload;

      state.exercises = state.exercises.map((obj) =>
        obj.id !== exerciseId ? obj : { ...obj, ...options }
      );
    },
    modifyExerciseSet(
      state,
      action: PayloadAction<{
        exerciseId: string;
        setId: string;
        options: Record<string, any>;
      }>
    ) {
      const { exerciseId, setId, options } = action.payload;

      state.exercises = state.exercises.map((exercise) =>
        exercise.id !== exerciseId
          ? exercise
          : {
              ...exercise,
              sets: exercise.sets?.map((exerciseSet) =>
                exerciseSet.id !== setId
                  ? exerciseSet
                  : { ...exerciseSet, ...options }
              ),
            }
      );
    },

    deleteExercise(state, action: PayloadAction<string>) {
      state.exercises = state.exercises.filter(
        (exercise) => exercise.id !== action.payload
      );
    },
    deleteExerciseSet(
      state,
      action: PayloadAction<{ exerciseId: string; setId: string }>
    ) {
      const { exerciseId, setId } = action.payload;

      state.exercises = state.exercises.map((exercise) =>
        exercise.id !== exerciseId
          ? exercise
          : {
              ...exercise,
              sets: exercise.sets?.filter(
                (exerciseSet) => exerciseSet.id !== setId
              ),
            }
      );
    },

    resetWorkout: () => initialState,
  },
});

export const {
  setWorkout,
  setWorkoutDate,
  setWorkoutWeightUnit,
  setWorkoutDistanceUnit,
  // exercise actions
  addExercise,
  modifyExercise,
  deleteExercise,
  // set actions
  addExerciseSet,
  modifyExerciseSet,
  deleteExerciseSet,

  //
  resetWorkout,
} = workoutSlice.actions;

export default workoutSlice.reducer;
