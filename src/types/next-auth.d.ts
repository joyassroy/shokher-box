import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      profileComplete: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    profileComplete?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    profileComplete?: boolean;
  }
}
