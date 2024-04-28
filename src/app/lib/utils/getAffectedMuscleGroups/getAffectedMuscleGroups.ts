import { Exercise } from "@/src/app/common/interfaces";

const getAffectedMuscleGroups = (exercises: Exercise[]) => {
  return [
    ...new Set(
      exercises
        .filter((obj) => obj.muscleGroup !== "")
        .map((obj) => obj.muscleGroup)
    ),
  ];
};

export default getAffectedMuscleGroups;
