import { configureStore } from "@reduxjs/toolkit";
import workout from "./features/workout/workoutSlice";
import workoutsHistory from "./features/workoutsHistory/workoutsHistorySlice";
import userProfile from "./features/userProfile/userProfileSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      workout,
      workoutsHistory,
      userProfile,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// export type AppStore = ReturnType<any>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
