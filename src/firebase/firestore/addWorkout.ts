import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { database, usersCollection, workoutsCollection } from "../config";
import parseFirebaseErorrMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage/parseFirebaseErorrMessage";
import { Exercise } from "@/src/app/common/interfaces";
import formatDate from "@/src/app/lib/utils/formatDate";
import { v4 as uuid } from "uuid";

const getTimeEpoch = () => {
  return new Date().getTime().toString();
};

export default async function addWorkout(
  userId: string,
  exercises: Exercise[]
) {
  let result = null;
  let error = false;
  let errorMessage = "";

  // document key is today's date
  const docKey = formatDate();

  try {
    const userRef = doc(
      database,
      usersCollection,
      userId,
      workoutsCollection,
      docKey
    );

    const workoutId = getTimeEpoch();

    const allMuscleGroups = [
      ...new Set(
        exercises
          .filter((obj) => obj.muscleGroup !== "")
          .map((obj) => obj.muscleGroup)
      ),
    ];

    result = await setDoc(
      userRef,
      {
        [workoutId]: {
          id: uuid(),
          created: serverTimestamp(),
          allMuscleGroups,
          exercises,
        },
      },
      { merge: true }
    );
  } catch (apiError) {
    error = true;
    errorMessage = parseFirebaseErorrMessage((apiError as Error).message);
  }

  return { result, error, errorMessage };
}
