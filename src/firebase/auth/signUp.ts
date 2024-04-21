import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import parseFirebaseErorrMessage from "@/src/app/utils/parseFirebaseErrorMessage/parseFirebaseErorrMessage";

export default async function signUp(email: string, password: string) {
  let result = null,
    error = false,
    errorMessage = "";
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (apiError) {
    error = true;
    errorMessage = parseFirebaseErorrMessage((apiError as Error).message);
  }

  return { result, error, errorMessage };
}
