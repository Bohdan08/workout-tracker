import {
  API_STATUS,
  EXERCISE_TYPES,
  WEIGHT_METRICS,
} from "@/src/app/common/enums";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import createExerciseSetTemplate from "../../../utils/createExerciseSetTemplate";
import { Exercise, WorkoutData } from "@/src/app/common/interfaces";
import { getWorkoutById } from "../../../actions/getWorkoutById/getWorkoutById";

const createExerciseTemplate = () => ({
  id: uuid(),
  hidden: false,
  // metrics: WEIGHT_METRICS.LBS,
  type: EXERCISE_TYPES.STENGTH,
  title: "",
  // sets: [createExerciseSetTemplate()],
  notes: "",
  muscleGroup: "",
});

interface SelectedWorkout {
  apiStatus: API_STATUS;
  apiErrorMessage: string | null;
  data: {
    id?: string | null;
    metrics: WEIGHT_METRICS.LBS | null;
    workoutDate: Date | string | null;
    exercises: Exercise[];
  };
}

const INIT_DATA = {
  id: null,
  metrics: null,
  workoutDate: null,
  exercises: [],
};

const initialState: SelectedWorkout = {
  apiStatus: API_STATUS.IDLE,
  apiErrorMessage: null,
  data: INIT_DATA,
};

export const fetchWorkoutById = createAsyncThunk(
  "selectedWorkout/fetchWorkoutById",
  async ({ userId, workoutId }: { userId: string; workoutId: string }) =>
    getWorkoutById(userId, workoutId)
);

const selectedWorkoutSlice = createSlice({
  name: "selectedWorkout",
  initialState,
  reducers: {
    setWorkout(state, action: PayloadAction<WorkoutData>) {
      state.apiStatus = API_STATUS.SUCCESS;
      state.data = action.payload;
    },
    setWorkoutDate(state, action: PayloadAction<string | Date>) {
      state.data.workoutDate = action.payload;
    },
    addExercise(state) {
      state.data.exercises = [
        ...state.data.exercises,
        createExerciseTemplate(),
      ];
    },
    addExerciseSet(state, action: PayloadAction<string>) {
      state.data.exercises = state.data.exercises.map((exercise) =>
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

      state.data.exercises = state.data.exercises.map((obj) =>
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

      state.data.exercises = state.data.exercises.map((exercise) =>
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
      state.data.exercises = state.data.exercises.filter(
        (exercise) => exercise.id !== action.payload
      );
    },
    deleteExerciseSet(
      state,
      action: PayloadAction<{ exerciseId: string; setId: string }>
    ) {
      const { exerciseId, setId } = action.payload;

      state.data.exercises = state.data.exercises.map((exercise) =>
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

    // resetWorkout(state) {
    //   state.exercises = [createExerciseTemplate()];
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWorkoutById.pending, (state) => {
      state.apiStatus = API_STATUS.LOADING;
    });
    builder.addCase(fetchWorkoutById.rejected, (state, action) => {
      state.apiStatus = API_STATUS.ERROR;
      state.apiErrorMessage = action.error?.message || null;
      state.data = INIT_DATA;
    });
    builder.addCase(fetchWorkoutById.fulfilled, (state, action: any) => {
      state.apiErrorMessage = null;
      state.apiStatus = API_STATUS.SUCCESS;
      state.data = action.payload;
    });
  },
});

export const {
  setWorkout,
  setWorkoutDate,
  // exercise actions
  addExercise,
  modifyExercise,
  deleteExercise,
  // set actions
  addExerciseSet,
  modifyExerciseSet,
  deleteExerciseSet,
  //
  // resetWorkout,
} = selectedWorkoutSlice.actions;

export default selectedWorkoutSlice.reducer;
