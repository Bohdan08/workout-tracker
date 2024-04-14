import parseFirebaseErorrMessage from "@/src/app/lib/parseFirebaseErrorMessage/parseFirebaseErorrMessage";
import { database, usersCollection } from "../config";
import { doc, getDoc } from "firebase/firestore";

export default async function getDocument(id: string) {
  let result = null;
  let error = null;
  let errorMessage = "";

  try {
    const docRef = doc(database, usersCollection, id);

    result = await getDoc(docRef);
  } catch (apiError) {
    error = true;
    errorMessage = parseFirebaseErorrMessage((apiError as Error).message);
  }

  return { result, error, errorMessage };
}
