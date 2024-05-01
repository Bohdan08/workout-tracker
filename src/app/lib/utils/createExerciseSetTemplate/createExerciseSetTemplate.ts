import { ExerciseSet } from "@/src/app/common/interfaces";
import { MEASURMENT_TYPES } from "@/src/app/dashboard/add-workout/components/selectExerciseField/selectExerciseField";
import { v4 as uuid } from "uuid";

const createExerciseSetTemplate = (measurmentType: MEASURMENT_TYPES): any => {
  if (measurmentType === MEASURMENT_TYPES.REPS_WEIGHTS) {
    return {
      id: uuid(),
      reps: 0,
      weight: 0,
    };
  }

  if (measurmentType === MEASURMENT_TYPES.DURATION_DISTANCE) {
    return {
      id: uuid(),
      duration: 0,
      distance: 0,
    };
  }
};

export default createExerciseSetTemplate;
