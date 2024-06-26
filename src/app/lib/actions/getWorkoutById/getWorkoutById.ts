"use server";

import parseFirebaseErorrMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage/parseFirebaseErorrMessage";
import { firebaseAdmin } from "@/src/firebase/adminConfig";
import { usersCollection } from "@/src/firebase/config";
import { Timestamp } from "firebase/firestore";

const formatServerTimeStamp = (value: Timestamp) => {
  // convert server time stamp to date
  const DATE_LENGTH = 24; // get 24 max characters

  return value?.toDate()?.toString().slice(0, DATE_LENGTH);
};

export async function getWorkoutById(userId: string, workoutId: string) {
  const db = firebaseAdmin.firestore();

  const userRef = db.collection(usersCollection).doc(userId);
  const listCollections = await userRef.listCollections();

  const userSubCollection = await listCollections?.[0]?.get();

  return userSubCollection?.docs
    ?.filter((doc) => doc.id === workoutId)
    .map((doc) => {
      // transform server timestamp to date format
      const formattedData = Object.values(doc.data()).map((data) => ({
        ...data,
        id: doc.id,
        created: formatServerTimeStamp(data.created),
      }));

      return formattedData;
    })
    .flat()[0];
}
