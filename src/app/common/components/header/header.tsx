import React from "react";
import { getFirebaseAdminToken } from "@/src/app/lib/actions/getFirebaseAdminToken/getFirebaseAdminToken";
import HeaderComponent from "./headerComponent";

export default async function Header() {
  const userAuthenticated = await getFirebaseAdminToken();

  return <HeaderComponent userAuthenticated={userAuthenticated} />;
}
