import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {
          try {
            const res = await axios.post(`${process.env.BASE_URL}/admin/login`, {
              email: credentials.email,
              password: credentials.password
            })
            
            if (res.data) {
              // Assuming the response includes the user data with _id
              return {
                ...res.data.doesUserEmailExist,
                token: res.data.token
              }
            } else {
              return null
            }
          } catch (e) {
            console.error('Auth error:', e)
            return null
          }
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.accessToken = user.token
        token._id = user._id // Add the _id to the token
      }
      return token
    },
    async session({ session, token }: { session: any, token: any }) {
      session.accessToken = token.accessToken
      if (session.user) {
        session.user._id = token._id // Add the _id to the session user
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }