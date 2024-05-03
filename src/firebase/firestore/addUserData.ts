import { doc, setDoc } from "firebase/firestore";
import { database, usersCollection } from "../config";
import parseFirebaseErorrMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage/parseFirebaseErorrMessage";

export default async function addUserData(
  id: string,
  data: Record<string, any>
) {
  let result = null;
  let error = false;
  let errorMessage = "";

  try {
    // Set the document with the provided data in the specified collection and ID
    result = await setDoc(doc(database, usersCollection, id), data, {
      merge: true, // Merge the new data with existing document data
    });
  } catch (apiError) {
    error = true;
    errorMessage = parseFirebaseErorrMessage((apiError as Error).message);
  }

  return { result, error, errorMessage };
}
