import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WorkoutData } from "@/src/app/common/interfaces";
import { getAllUserWorkouts } from "../../../actions/getAllWorkouts/getAllWorkouts";
import getData from "@/src/firebase/firestore/getUserData";
import getUserData from "@/src/firebase/firestore/getUserData";
import {
  API_STATUS,
  DISTANCE_METRICS,
  WEIGHT_METRICS,
} from "@/src/app/common/enums";
import parseFirebaseErorrMessage from "../../../utils/parseFirebaseErrorMessage";
// import { getUserData } from "../../../actions/getUserData/getUserData";

interface Profile {
  apiStatus: API_STATUS;
  apiErrorMessage: string | null;
  data: {
    created?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    emailVerified?: boolean;
    weightUnit?: WEIGHT_METRICS;
    distanceUnit?: DISTANCE_METRICS;
    providerData?: Record<string, any>[];
  };
}

const initialState: Profile = {
  apiStatus: API_STATUS.IDLE,
  apiErrorMessage: null,
  data: {},
};

export const fetchUserData = createAsyncThunk(
  "userProfile/fetchUserData",
  async (userId: string) => getUserData(userId)
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfileData(state, action) {
      state.data = action.payload;
    },
    setWeightUnit(state, action: PayloadAction<WEIGHT_METRICS>) {
      state.data.weightUnit = action.payload;
    },
    setDistanceUnit(state, action: PayloadAction<DISTANCE_METRICS>) {
      state.data.distanceUnit = action.payload;
    },
    setFirstName(state, action: PayloadAction<string>) {
      state.data.firstName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.data.lastName = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.data.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.apiStatus = API_STATUS.LOADING;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.apiStatus = API_STATUS.ERROR;
      state.apiErrorMessage = parseFirebaseErorrMessage(
        action.error.message as string
      );
      state.data = {};
    });
    builder.addCase(
      fetchUserData.fulfilled,
      (state, action: Record<string, any>) => {
        state.apiErrorMessage = null;
        state.apiStatus = API_STATUS.SUCCESS;
        state.data = action.payload;
      }
    );
  },
});

export const {
  setUserProfileData,
  setWeightUnit,
  setDistanceUnit,
  setFirstName,
  setLastName,
  setEmail
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
