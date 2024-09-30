// pages/api/auth/[...nextauth].js

import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    adapter: FirestoreAdapter({
        credential: cert({
            projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
            clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
    }),
}

export default NextAuth(authOptions)