import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getFirebaseAdminToken } from "./app/lib/actions/getFirebaseAdminToken/getFirebaseAdminToken";
import { USER_TOKEN } from "./app/common/constants";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const cookieToken = cookies().get(USER_TOKEN)?.value || "";
    if (!cookieToken || cookieToken === "") {
      return Response.redirect(new URL("/login", request.url));
    }
  } catch (err) {}
}

export const config = {
  // matcher: ["/dashboard/:path*"],
  matcher: ["/random"],
};
