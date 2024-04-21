"use server";

import { cookies } from "next/headers";
// import { USER_EMAIL_TOKEN_NAME } from "../constants";

export async function addUserToken(userToken: string) {
  // const oneDay = 24 * 60 * 60 * 1000;

  cookies().set({
    name: "token",
    // name: USER_EMAIL_TOKEN_NAME,
    value: userToken,
    // maxAge: oneDay,
  });
}
