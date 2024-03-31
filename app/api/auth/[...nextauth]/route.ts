import User from "@/models/userModel";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectDB from "@/lib/dbConnection";

const handler = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in" },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("All fields are mandatory!");
        }

        const email = credentials.email;
        await connectDB();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not exist!");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        console.log(isPasswordValid, "pass");
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        console.log(user, "userX", user.username);

        return user;
      },
    }),
  ],

  callbacks: {
    jwt: async ({ user, token, session }) => {
      console.log(user, token, session, "jwt");
      if (user) {
        return {
          ...token,
          id: user?._id,
          fullname: user?.fullname,
          username: user?.username,
        };
      }
      return token;
    },

    session: async ({ session, token, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token?.id,
          fullname: token?.fullname,
          username: token?.username,
        },
      };

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
