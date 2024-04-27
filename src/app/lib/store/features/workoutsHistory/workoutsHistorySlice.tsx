import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Workout } from "@/src/app/common/interfaces";
import { API_STATUS } from "@/src/app/common/constants";
import { getAllUserWorkouts } from "../../../actions/getAllUserWorkouts/getAllUserWorkouts";

interface WorkoutsHistory {
  apiStatus: string;
  apiErrorMessage: string | null;
  workouts: Workout[];
}

const initialState: WorkoutsHistory = {
  apiStatus: API_STATUS.IDLE,
  apiErrorMessage: null,
  workouts: [],
};

// Get popular products from firebase
export const fetchWorkoutsHistory = createAsyncThunk(
  "workoutsHistory/fetchWorkoutsHistory",
  async () => getAllUserWorkouts("pY8FgcjJrMXKeIO1mSB1ysTLoRl1")
);

const workoutsHistorySlice = createSlice({
  name: "workoutsHistory",
  initialState,
  reducers: {
    getWorkouts(state, action) {
      state.workouts = action.payload;
    },
    resetWorkouts(state) {
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
      (state, action: PayloadAction<Workout[]>) => {
        state.apiErrorMessage = null;
        state.apiStatus = API_STATUS.SUCCESS;
        state.workouts = action.payload;
      }
    );
  },
});

export const { getWorkouts, resetWorkouts } = workoutsHistorySlice.actions;

export default workoutsHistorySlice.reducer;
