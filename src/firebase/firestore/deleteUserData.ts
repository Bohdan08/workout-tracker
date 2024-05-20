import { deleteDoc, doc } from "firebase/firestore";
import { database, usersCollection } from "../config";
import parseFirebaseErorrMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage/parseFirebaseErorrMessage";

export default async function deleteUserData(id: string) {
  let result = null;
  let error = false;
  let errorMessage = "";

  try {
    result = await deleteDoc(doc(database, usersCollection, id)).catch(
      (apiError) => {
        error = true;
        errorMessage = parseFirebaseErorrMessage(apiError.message);
      }
    );
  } catch (apiError) {
    error = true;
    errorMessage = parseFirebaseErorrMessage((apiError as Error).message);
  }

  return { result, error, errorMessage };
}
