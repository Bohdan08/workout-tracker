import { WorkoutData } from "@/src/app/common/interfaces";
import { getWorkoutById } from "@/src/app/lib/actions/getWorkoutById/getWorkoutById";
import { updateWorkoutById } from "@/src/app/lib/actions/updateWorkoutById/updateWorkoutById";
import parseFirebaseErrorMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage";

const updateUserWorkout = async (userId: string, workoutData: WorkoutData) => {
  console.log("INSIDE_UPDATE");
  let result = null;
  let error = false;
  let errorMessage = "";

  try {
    result = await updateWorkoutById(
      userId,
      workoutData.id as string,
      workoutData
    );
  } catch (apiError) {
    error = true;
    errorMessage = parseFirebaseErrorMessage((apiError as Error).message);
  }

  return { result, error, errorMessage };
};

export default updateUserWorkout;
