"use server";

import { USER_TOKEN } from "@/src/app/common/constants";
import { cookies } from "next/headers";

export async function addUserToken(userToken: string) {
  // const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = 604800;

  cookies().set({
    name: USER_TOKEN,
    value: userToken,
    maxAge: oneWeek,
    secure: true,
    httpOnly: true,
  });
}
