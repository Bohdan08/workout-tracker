import { EXERCISE_TYPES, WEIGHT_METRICS } from "@/src/app/common/enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import createExerciseSetTemplate from "../../../utils/createExerciseSetTemplate";
import { ExerciseSet, Exercise } from "@/src/app/common/interfaces";

// const createExerciseSetTemplate = () => ({
//   id: uuid(),
//   reps: 0,
//   weight: 0,
// });

const createExerciseTemplate = () => ({
  id: uuid(),
  hidden: false,
  metrics: WEIGHT_METRICS.LBS,
  type: EXERCISE_TYPES.STENGTH,
  title: "",
  // sets: [createExerciseSetTemplate()],
  notes: "",
  muscleGroup: "",
});

// interface Exercise {
//   id: string;
//   hidden: boolean;
//   metrics: WEIGHT_METRICS;
//   type: EXERCISE_TYPES;
//   title: string;
//   notes: string;
//   muscleGroup: string;
//   sets?: ExerciseSet[];
// }

interface Workout {
  exercises: Exercise[];
}

const initialState: Workout = {
  exercises: [createExerciseTemplate()],
};

const newWorkoutSlice = createSlice({
  name: "newWorkout",
  initialState,
  reducers: {
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
                createExerciseSetTemplate(exercise.type),
              ],
            }
      );
    },
    modifyExercise(
      state,
      action: PayloadAction<{
        exerciseId: string;
        options: Record<string, string | number | boolean>;
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
        options: Record<string, string | number | boolean>;
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

    resetWorkout(state) {
      state.exercises = [createExerciseTemplate()];
    },
  },
});

export const {
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
} = newWorkoutSlice.actions;

export default newWorkoutSlice.reducer;
