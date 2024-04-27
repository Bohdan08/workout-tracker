import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import parseFirebaseErorrMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage/parseFirebaseErorrMessage";

export default async function signIn(email: string, password: string) {
  let result = null,
    error = false,
    errorMessage = "";
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (apiError) {
    error = true;
    errorMessage = parseFirebaseErorrMessage((apiError as Error).message);
  }

  return { result, error, errorMessage };
}
