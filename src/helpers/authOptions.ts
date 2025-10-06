import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      role: string;
      email: string;
      image: string;
    };
  }
  interface User {
    id: string;
    name: string;
    role: string;
    email: string;
    image: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const res = await fetch(`${process.env.BASE_API}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res?.ok) {
            console.error("Login Failed", await res.text());
            return null;
          }

          const user = await res.json();
          if (user?.id) {
            return {
              id: user?.id,
              name: user?.name,
              email: user?.email,
              image: user?.picture,
              role: user?.role,
            };
          } else {
            return null;
          }
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(token);
      if (user) {
        token.id = user?.id;
        token.role = user?.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token?.id as string;
        session.user.role = token?.role as string;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

export const getUserSession = async () => {
  return await getServerSession(authOptions);
};
