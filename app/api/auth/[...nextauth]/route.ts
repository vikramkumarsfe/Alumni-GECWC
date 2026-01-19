import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"
import UserModel from "@/models/user.model"
import mongoose from "mongoose"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(DB)

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) 
            return null

        const user = await UserModel.findOne({ email: credentials.email })
        if (!user) 
            return null

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        )
        if (!isValid) 
            return null

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.fullname,
          role: user.role,
          image: user.image,       
          provider: user.provider,
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],

  pages: {
    signIn: "/login",
    error: "/auth-failed"
  },

  session: {
    strategy: "jwt"
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") 
        {
        const existingUser = await UserModel.findOne({ email: user.email })

        if (!existingUser) {
          const newUser = await UserModel.create({
            email: user.email,
            name: user.name,
            provider: "google"
          })

          user.id = newUser._id.toString()
          user.role = newUser.role
          user.address = newUser.address
        } else {
          user.id = existingUser._id.toString()
          user.role = existingUser.role
          user.address = existingUser.address
        }
      }
      return true
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.address = user.address
        token.image  = user.image,       
        token.provider = user.provider
      }

      if (trigger === "update" && session) {
      if (session.image) 
      {
        token.image = session.image;
      }
      if (session.provider) 
      {
        token.provider = session.provider;
      }
    }
      return token
    },

    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as string
      session.user.address = token.address as any
      session.user.image = token.picture as any
      return session
    }
  },

  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET , handler as POST}