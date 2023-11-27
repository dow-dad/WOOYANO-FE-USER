import NextAuth, { DefaultSession } from "next-auth/next";

declare module "next-auth" {

    interface Session {
        user: {
            name: string,
            address: string,
            userImage: string,
            token: string,
            email: string,
        } & DefaultSession["user"]
    }
}