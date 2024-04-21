import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config";
import parseFirebaseErorrMessage from "@/src/app/utils/parseFirebaseErrorMessage/parseFirebaseErorrMessage";

export default async function resetPassword(email: string) {
  let result = null,
    error = false,
    errorMessage = "";
  try {
    result = await sendPasswordResetEmail(auth, email);
  } catch (apiError) {
    error = true;
    errorMessage = parseFirebaseErorrMessage((apiError as Error).message);
  }

  return { result, error, errorMessage };
}
