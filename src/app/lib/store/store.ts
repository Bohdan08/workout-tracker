import { configureStore } from "@reduxjs/toolkit";
import newWorkout from "./features/newWorkout/newWorkoutSlice";
import workoutsHistory from "./features/workoutsHistory/workoutsHistorySlice";
// export const store = configureStore({
//   reducer: {
//     addWorkout: addWorkout,
//   },
//   // middleware: (getDefaultMiddleware) =>
//   //   getDefaultMiddleware({
//   //     serializableCheck: false,
//   //     immutableCheck: false,
//   //   }),
// });

export const makeStore = () => {
  return configureStore({
    reducer: {
      newWorkout,
      workoutsHistory,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// export type AppStore = ReturnType<any>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
