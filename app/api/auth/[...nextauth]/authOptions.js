import CredentialsProvider from "next-auth/providers/credentials";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const endpoint = "/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "hospitalfinder",
      name: "HospitalFinder",
      credentials: {
        user_id: {
          label: "email:",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        try {
          const authResponse = await fetch(
            `${apiUrl}/api/v1${endpoint}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );

          if (!authResponse.ok) {
            console.log("error: ", authResponse);
            throw new Error("Invalid credentials provide");
          }

          const userObj = await authResponse.json();

          // if there is no user throw an error
          if (!userObj) {
            throw new Error("No user found");
          }

          const user = userObj?.data;

          // If no error and we have user data, return it
          if (authResponse.ok && user) {
            return user;
          }

          throw new Error("Something bad happened.");
        } catch (err) {
          console.log("AUTH ERROR", err);
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/register",
    error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  theme: {
    // colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "purple", // Hex color value
    // insert absolute path to our logo
    logo: "/images/logo.png", // Absolute URL to your image logo
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, user, account, isNewUser }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.user = user;
      }

      return token;
    },
    async session({ token, session }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const { user: _user } = token;

      const { user: old_user } = session;

      const { token: apiToken, ...newUser } = _user;

      const user = { ...old_user, ...newUser };

      session.accessToken = apiToken;
      session.user = user;

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
