import { configureStore } from "@reduxjs/toolkit";
import newWorkout from "./features/newWorkout/newWorkoutSlice";
import selectedWorkout from "./features/selectedWorkout/selectedWorkoutSlice";
import workoutsHistory from "./features/workoutsHistory/workoutsHistorySlice";
import userProfile from "./features/userProfile/userProfile";

export const makeStore = () => {
  return configureStore({
    reducer: {
      newWorkout,
      workoutsHistory,
      selectedWorkout,
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
