import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WorkoutData } from "@/src/app/common/interfaces";
// import { API_STATUS } from "@/src/app/common/constants";
import { getAllUserWorkouts } from "../../../actions/getAllWorkouts/getAllWorkouts";
import { API_STATUS } from "@/src/app/common/enums";

interface WorkoutsHistory {
  apiStatus: string;
  apiErrorMessage: string | null;
  workouts: WorkoutData[] & { allMuscleGroups?: string[] }[];
}

const initialState: WorkoutsHistory = {
  apiStatus: API_STATUS.IDLE,
  apiErrorMessage: null,
  workouts: [],
};

export const fetchWorkoutsHistory = createAsyncThunk(
  "workoutsHistory/fetchWorkoutsHistory",
  async (userId: string) => getAllUserWorkouts(userId)
);

const workoutsHistorySlice = createSlice({
  name: "workoutsHistory",
  initialState,
  reducers: {
    updateWorkoutsHistory(state, action) {
      state.workouts = action.payload;
    },
    resetWorkouts(state) {
      state.apiStatus = API_STATUS.IDLE;
      state.workouts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWorkoutsHistory.pending, (state) => {
      state.apiStatus = API_STATUS.LOADING;
    });
    builder.addCase(fetchWorkoutsHistory.rejected, (state, action) => {
      state.apiStatus = API_STATUS.ERROR;
      state.apiErrorMessage = action.error?.message || null;
      state.workouts = [];
    });
    builder.addCase(
      fetchWorkoutsHistory.fulfilled,
      (state, action: PayloadAction<WorkoutData[]>) => {
        state.apiErrorMessage = null;
        state.apiStatus = API_STATUS.SUCCESS;
        state.workouts = action.payload;
      }
    );
  },
});

export const { updateWorkoutsHistory, resetWorkouts } =
  workoutsHistorySlice.actions;

export default workoutsHistorySlice.reducer;
