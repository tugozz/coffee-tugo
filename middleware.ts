// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip these files and folders from Clerk auth
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
