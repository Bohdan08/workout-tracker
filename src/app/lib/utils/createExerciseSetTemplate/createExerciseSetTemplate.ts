import { EXERCISE_MEASURMENT_TYPES } from "@/src/app/common/enums";
import { v4 as uuid } from "uuid";

const createExerciseSetTemplate = (
  measurementTypes: EXERCISE_MEASURMENT_TYPES[] | null
): Record<string, string | number> => {
  let res = {
    id: uuid(),
  } as Record<string, number | string>;

  if (measurementTypes?.length) {
    measurementTypes.forEach((measurementType) => {
      res[measurementType.toLowerCase()] = 0;
    });
  }

  return res;
};

export default createExerciseSetTemplate;
