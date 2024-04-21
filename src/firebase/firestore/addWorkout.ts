import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { database, usersCollection, workoutsCollection } from "../config";
import parseFirebaseErorrMessage from "@/src/app/utils/parseFirebaseErrorMessage/parseFirebaseErorrMessage";
import { v4 as uuid } from "uuid";
import { Exercise } from "@/src/app/common/interfaces";

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

  try {
    const userRef = doc(
      database,
      usersCollection,
      userId,
      workoutsCollection,
      uuid()
    );

    const workoutId = getTimeEpoch();

    result = await setDoc(
      userRef,
      {
        [workoutId]: {
          date: serverTimestamp(),
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
