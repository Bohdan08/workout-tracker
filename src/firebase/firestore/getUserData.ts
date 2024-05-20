import formatDate from "@/src/app/lib/utils/formatDate";
import { database, usersCollection } from "../config";
import { doc, getDoc } from "firebase/firestore";

export default async function getUserData(docId: string) {
  const docRef = doc(database, usersCollection, docId);
  const result = await getDoc(docRef);
  // return result.data();
  const userData = result.data();

  return {
    ...userData,
    created: formatDate(userData?.created?.toDate()),
  };
}
