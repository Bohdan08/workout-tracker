import { getWorkoutById } from "@/src/app/lib/actions/getWorkoutById/getWorkoutById";
import parseFirebaseErrorMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage";

const getUserWorkoutById = async (userId: string, workoutId: string) => {
  let result = null;
  let error = false;
  let errorMessage = "";

  try {
    result = await getWorkoutById(userId, workoutId);
  } catch (apiError) {
    error = true;
    errorMessage = parseFirebaseErrorMessage((apiError as Error).message);
  }

  return { result, error, errorMessage };
};

export default getUserWorkoutById;
