import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { database, usersCollection, workoutsCollection } from "../config";
import parseFirebaseErorrMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage/parseFirebaseErorrMessage";
import { WorkoutData } from "@/src/app/common/interfaces";
// import formatDate from "@/src/app/lib/utils/formatDate";
import { v4 as uuid } from "uuid";

// const getTimeEpoch = () => {
//   return new Date().getTime().toString();
// };

export default async function addWorkout(
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

    // const workoutId = getTimeEpoch();

    const allMuscleGroups = [
      ...new Set(
        filteredWorkoutData.exercises
          .filter((obj) => obj.muscleGroup !== "")
          .map((obj) => obj.muscleGroup)
      ),
    ];

    result = await setDoc(
      userRef,
      {
        data: {
          // id: uuid(),
          created: serverTimestamp(),
          allMuscleGroups,
          ...filteredWorkoutData,
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
