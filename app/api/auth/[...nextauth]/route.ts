import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"
import UserModel from "@/models/user.model"
import { connectDB } from "@/lib/mongodb"

await connectDB();

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

        const isVerified = (user.isActive === "approved" ? true : false)
            
        if(!isVerified)
            return null

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.fullname,

          role: user.role,
          image: user.image,
          provider: user.provider,

          mobile: user.mobile,
          bio: user.bio,

          batch: user.batch,
          branch: user.branch,
          regNo: user.regNo,

          address: user.address,

          profile: user.profile,
          socialLinks: user.socialLinks,

          DOB: user.DOB,
          isActive: user.isActive,

          gender: user.gender
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
      if (account?.provider === "google") {
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
          user.mobile = newUser.mobile
          user.bio = newUser.bio
          user.image = newUser.image
          user.batch = newUser.batch
          user.branch = newUser.branch
          user.regNo = newUser.regNo
          user.profile = newUser.profile
          user.socialLinks = newUser.socialLinks
          user.DOB = newUser.DOB
          user.isActive = newUser.isActive
        } else {
          user.id = existingUser._id.toString()
          user.role = existingUser.role
          user.address = existingUser.address
          user.mobile = existingUser.mobile
          user.bio = existingUser.bio
          user.image = existingUser.image
          user.batch = existingUser.batch
          user.branch = existingUser.branch
          user.regNo = existingUser.regNo
          user.profile = existingUser.profile
          user.socialLinks = existingUser.socialLinks
          user.DOB = existingUser.DOB
          user.isActive = existingUser.isActive
        }
      }
      return true
    },

    async jwt({ token, user, trigger, session }) {
      // Initial login
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = user.role
        token.address = user.address
        token.image = user.image
        token.provider = user.provider
        token.mobile = user.mobile
        token.bio = user.bio
        token.batch = user.batch
        token.branch = user.branch
        token.regNo = user.regNo
        token.profile = user.profile
        token.socialLinks = user.socialLinks
        token.DOB = user.DOB
        token.isActive = user.isActive
        token.gender = user.gender
      }

      // Update session
      if (trigger === "update" && session) {
        const allowedUpdates = [
          "image",
          "provider",
          "bio",
          "name",
          "mobile",
          "batch",
          "branch",
          "address",
          "regNo",
          "profile",
          "socialLinks",
          "DOB",
          "isActive",
          "gender"
        ]

        allowedUpdates.forEach((key) => {
          if ((session as any)[key] !== undefined) {
            (token as any)[key] = (session as any)[key]
          }
        })
      }

      return token
    },

    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.name = token.name as string
      session.user.email = token.email as string

      session.user.role = token.role as any
      session.user.image = token.image as any
      session.user.provider = token.provider as any

      session.user.mobile = token.mobile as any
      session.user.bio = token.bio as any

      session.user.batch = token.batch as any
      session.user.branch = token.branch as any
      session.user.regNo = token.regNo as any

      session.user.address = token.address as any
      session.user.profile = token.profile as any
      session.user.socialLinks = token.socialLinks as any

      session.user.DOB = token.DOB as any
      session.user.isActive = token.isActive as any
      session.user.gender = token.gender as any

      return session
    }
  },

  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET , handler as POST}