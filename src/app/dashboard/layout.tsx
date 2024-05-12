import { getFirebaseAdminToken } from "../lib/actions/getFirebaseAdminToken/getFirebaseAdminToken";
import { redirect } from "next/navigation";
import DashboardLayout from "./dashBoardLayout";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userToken = await getFirebaseAdminToken();

  if (!userToken) {
    redirect("/login");
  }

  return <DashboardLayout children={children} />;
}
