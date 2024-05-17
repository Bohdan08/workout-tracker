"use server";

import { USER_TOKEN } from "@/src/app/common/constants";
import { firebaseAdmin } from "@/src/firebase/adminConfig";
import { cookies } from "next/headers";

export async function getFirebaseAdminToken() {
  try {
    const cookieToken = cookies().get(USER_TOKEN)?.value;

    if (!cookieToken || cookieToken === "") {
      return false;
    }

    const token = await firebaseAdmin.auth().verifyIdToken(cookieToken);
    // if token is not null, then users has been found in DB
    return Boolean(token);
  } catch (err) {
    console.error(err, "error");
    return false;
  }
}
