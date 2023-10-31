export { default } from "next-auth/middleware";

// Applies next-auth only to matching routes - can be regex
export const config = {
  matcher: ["/admin"],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/register",
    error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
