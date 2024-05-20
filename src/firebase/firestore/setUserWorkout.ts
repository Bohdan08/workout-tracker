import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { database, usersCollection, workoutsCollection } from "../config";
import parseFirebaseErorrMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage/parseFirebaseErorrMessage";
import { WorkoutData } from "@/src/app/common/interfaces";
import { v4 as uuid } from "uuid";

export default async function setWorkout(
  userId: string,
  workoutData: WorkoutData
) {
  let result = null;
  let error = false;
  let errorMessage = "";

  const docId = uuid();

  // filter non db related values
  const filteredWorkoutData = {
    ...workoutData,
    // exercises:
    exercises: workoutData.exercises.map((exercise) => {
      return (({ hidden, ...obj }) => obj)(exercise); // remove hidden
    }),
  };

  try {
    const userRef = doc(
      database,
      usersCollection,
      userId,
      workoutsCollection,
      docId
    );

    const allMuscleGroups = [
      ...new Set(
        filteredWorkoutData.exercises
          .filter((obj) => obj.muscleGroups?.length)
          .map((obj) => obj.muscleGroups)
          .flat()
      ),
    ];

    const editedInfo = workoutData.edited || [];

    result = await setDoc(
      userRef,
      {
        data: {
          id: docId,
          created: serverTimestamp(),
          allMuscleGroups,
          ...filteredWorkoutData,
          ...(workoutData.id && {
            edited: [...editedInfo, serverTimestamp()],
          }),
        },
      },
      { merge: true }
    ).catch((apiError) => {
      error = true;
      errorMessage = parseFirebaseErorrMessage(apiError.message);
    });
  } catch (apiError) {
    error = true;
    errorMessage = parseFirebaseErorrMessage((apiError as Error).message);
  }

  return { result, error, errorMessage };
}
