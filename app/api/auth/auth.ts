import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import User from "../../../models/userModel";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectDB from "../../../lib/dbConnection";

export const config = {
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
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],

  callbacks: {
    jwt: async ({ user, token }: any) => {
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

    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token?.id,
          fullname: token?.fullname,
          username: token?.username,
        },
      };
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
