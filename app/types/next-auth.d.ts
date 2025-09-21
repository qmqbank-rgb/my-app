import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** Add id to user */
      id: string;
    } & DefaultSession["user"];
  }
}
