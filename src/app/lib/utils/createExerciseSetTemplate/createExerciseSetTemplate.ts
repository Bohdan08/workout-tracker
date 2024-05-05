import { EXERCISE_MEASURMENT_TYPES } from "@/src/app/common/enums";
import { v4 as uuid } from "uuid";

const createExerciseSetTemplate = (
  measurmentType: EXERCISE_MEASURMENT_TYPES
): Record<string, string | number> => {
  if (measurmentType === EXERCISE_MEASURMENT_TYPES.REPS_WEIGHTS) {
    return {
      id: uuid(),
      reps: 0,
      weight: 0,
    };
  }

  // if (measurmentType === EXERCISE_MEASURMENT_TYPES.DURATION_DISTANCE) {
  //   return {
  //     id: uuid(),
  //     duration: 0,
  //     distance: 0,
  //   };
  // }
  return {
    id: uuid(),
    duration: 0,
    distance: 0,
  };
};

export default createExerciseSetTemplate;
