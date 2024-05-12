import { deleteWorkoutById } from "@/src/app/lib/actions/deleteWorkoutById/deleteWorkoutById";
import parseFirebaseErrorMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage";

const deleteUserWorkout = async (userId: string, workoutId: string) => {
  let result = null;
  let error = false;
  let errorMessage = "";

  try {
    result = await deleteWorkoutById(userId, workoutId);
  } catch (apiError) {
    error = true;
    errorMessage = parseFirebaseErrorMessage((apiError as Error).message);
  }

  return { result, error, errorMessage };
};

export default deleteUserWorkout;
