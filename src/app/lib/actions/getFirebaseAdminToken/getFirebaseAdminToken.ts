"use server";

import { firebaseAdmin } from "@/src/firebase/adminConfig";
import { cookies } from "next/headers";
import { headers } from "next/headers";

// import { USER_EMAIL_TOKEN_NAME } from "../constants";

export async function getFirebaseAdminToken() {
  try {
    const cookieToken = cookies().get("token")?.value;

    if (!cookieToken || cookieToken === "") {
      return false;
    }

    const token = await firebaseAdmin.auth().verifyIdToken(cookieToken);

    // if token is not null, then users has been found in DB
    return Boolean(token);
  } catch (err) {
    console.log(err, "err");
  }
}
