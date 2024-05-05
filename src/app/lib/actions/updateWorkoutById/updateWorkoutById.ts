"use server";

import { WorkoutData } from "@/src/app/common/interfaces";
import { firebaseAdmin } from "@/src/firebase/adminConfig";
import { usersCollection, workoutsCollection } from "@/src/firebase/config";
import formatDate from "../../utils/formatDate";

export async function updateWorkoutById(
  userId: string,
  workoutId: string,
  updatedWorkoutData: WorkoutData
) {
  const db = firebaseAdmin.firestore();

  const userRef = db.collection(usersCollection).doc(userId);
  const neededWorkout = userRef.collection(workoutsCollection).doc(workoutId);

  const editedInfo = updatedWorkoutData.edited || [];

  return await neededWorkout.set(
    {
      data: {
        ...updatedWorkoutData,
        edited: [...editedInfo, formatDate(new Date())],
      },
    },
    { merge: true }
  );
}
