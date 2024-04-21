import { EXERCISE_TYPES } from "@/src/app/common/enums";
import { ExerciseSet } from "@/src/app/common/interfaces";
import { v4 as uuid } from "uuid";

const createExerciseSetTemplate = (type: EXERCISE_TYPES): ExerciseSet => {
  if (type === EXERCISE_TYPES.STENGTH) {
    return {
      id: uuid(),
      reps: 0,
      weight: 0,
    };
  }

  return {
    id: uuid(),
    duration: 0,
  };
};

export default createExerciseSetTemplate;
