"use server";

import { WorkoutData } from "@/src/app/common/interfaces";
import { firebaseAdmin } from "@/src/firebase/adminConfig";
import { usersCollection, workoutsCollection } from "@/src/firebase/config";

export async function updateWorkoutById(
  userId: string,
  workoutId: string,
  updatedWorkoutData: WorkoutData
) {
  const db = firebaseAdmin.firestore();

  const userRef = db.collection(usersCollection).doc(userId);
  const neededWorkout = userRef.collection(workoutsCollection).doc(workoutId);

  const editedInfo = updatedWorkoutData.edited || [];

  const date = new Date();

  const allMuscleGroups = [
    ...new Set(
      updatedWorkoutData.exercises
        .filter((obj) => obj.muscleGroups?.length)
        .map((obj) => obj.muscleGroups)
        .flat()
    ),
  ];

  return await neededWorkout.set(
    {
      data: {
        ...updatedWorkoutData,
        allMuscleGroups,
        edited: [...editedInfo, date.toLocaleString()],
      },
    },
    { merge: true }
  );
}
