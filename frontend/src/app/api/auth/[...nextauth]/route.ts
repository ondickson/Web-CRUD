import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // runs every time a user signs in with Google
    async signIn({ user, account }) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/social-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account?.provider,
            providerAccountId: account?.providerAccountId,
          }),
        });
      } catch (e) {
        console.error("social-login callback error", e);
        return false;
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
