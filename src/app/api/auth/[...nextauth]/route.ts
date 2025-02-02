import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import nexiosInstance from "nexios-http"; // Adjust according to your setup

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile, account }: any) {
      // Log profile and account details for debugging
      console.log("Google Profile:", profile);
      console.log("Google Account:", account);

      // Check if profile or account is missing
      if (!profile || !account) {
        console.log("Profile or Account missing.");
        return false; // If either is missing, deny access
      }

      // Check if the provider is Google
      if (account?.provider === "google") {
        try {
          // Log before sending the request to your backend
          console.log("Sending request to backend for Google login...");

          const response: any = await nexiosInstance.post(
            "/auth/google-login",
            {
              name: profile.name,
              email: profile.email,
              profilePicture: profile.picture,
            }
          );

          // Log the response from your backend
          console.log("Response from Google Login:", response);

          // If the backend returns an access token, store it in cookies
          if (
            response.data &&
            response.data.data &&
            response.data.data.accessToken
          ) {
            console.log(
              "Access token received:",
              response.data.data.accessToken
            );

            // Set cookies for the access token and refresh token
            cookies().set("accessToken", response.data.data.accessToken);
            cookies().set("refreshToken", response.data.data.refreshToken);

            // Log cookies being set
            console.log("Cookies set for accessToken and refreshToken");

            // Return true to allow the sign-in process to complete
            return true;
          } else {
            // If no access token is received, deny the sign-in
            console.log("Access token not received");
            return false;
          }
        } catch (error) {
          // Log any errors that occur during the Google login process
          console.error("Error during Google login:", error);
          return false;
        }
      }

      // If the provider is not Google, deny access
      console.log("Provider is not Google");
      return false;
    },
  },
  pages: {
    signIn: "/login", // Redirect to the login page if sign-in fails
  },
  secret: process.env.AUTH_SECRET, // Secret for session encryption
});

export { handler as GET, handler as POST };
