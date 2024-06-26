"use server";

import { firebaseAdmin } from "@/src/firebase/adminConfig";
import { usersCollection } from "@/src/firebase/config";
import { Timestamp } from "firebase/firestore";

const formatServerTimeStamp = (value: Timestamp) => {
  // convert server time stamp to date
  const DATE_LENGTH = 24; // get 24 max characters

  return value?.toDate()?.toString().slice(0, DATE_LENGTH);
};

export async function getAllUserWorkouts(userId: string) {
  const db = firebaseAdmin.firestore();
  const userRef = db
    .collection(usersCollection)
    .doc(userId || "pY8FgcjJrMXKeIO1mSB1ysTLoRl1");
  // .doc(userId || "pY8FgcjJrMXKeIO1mSB1ysTLoRl1");
  const listCollections = await userRef.listCollections();

  const userSubCollection = await listCollections?.[0]?.get();

  // convert it to an array of obj
  return userSubCollection?.docs
    ?.map((doc) => {
      // transform server timestamp to date format
      const formattedData = Object.values(doc.data()).map((data) => ({
        ...data,
        id: doc.id,
        created: formatServerTimeStamp(data.created),
      }));

      return formattedData;
    })
    .flat()
    .sort(
      (a, b) =>
        (new Date(b.workoutDate) as any) - (new Date(a.workoutDate) as any)
    );
}
