"use server";

import { firebaseAdmin } from "@/src/firebase/adminConfig";
import { usersCollection, workoutsCollection } from "@/src/firebase/config";

export async function deleteWorkoutById(userId: string, workoutId: string) {
  const db = firebaseAdmin.firestore();

  const userRef = db.collection(usersCollection).doc(userId);
  const neededWorkout = userRef.collection(workoutsCollection).doc(workoutId);

  return await neededWorkout.delete();
}
