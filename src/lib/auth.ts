import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { supabase } from "./supabase"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow emails from @iiitkottayam.ac.in domain
      if (!user.email || !user.email.endsWith('@iiitkottayam.ac.in')) {
        return false
      }

      // Optional: Store user info in Supabase for future reference
      try {
        const { error } = await supabase
          .from('user_profiles')
          .upsert({
            email: user.email,
            name: user.name,
            image: user.image,
            last_login: new Date().toISOString(),
          }, {
            onConflict: 'email'
          })
        
        if (error) {
          console.error('Error upserting user profile:', error)
          // Don't block sign-in if profile creation fails
        }
      } catch (error) {
        console.error('Unexpected error during user profile creation:', error)
        // Don't block sign-in for database errors
      }

      return true
    },
    async session({ session, token }) {
      // Ensure session has all required data
      if (session?.user?.email) {
        // Add any additional user data if needed
        return {
          ...session,
          user: {
            ...session.user,
            email: session.user.email,
          }
        }
      }
      return session
    },
    async jwt({ token, user, account }) {
      // Store additional user info in JWT if needed
      if (user) {
        token.email = user.email
      }
      return token
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}
