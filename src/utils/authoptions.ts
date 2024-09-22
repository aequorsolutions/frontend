import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account, session }) {
      console.log('token')
      console.log(token)
      console.log('tokenEnds')
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      // console.log(newSession)
      session.accessToken = token.accessToken as string
      console.log('session')
      console.log(session)
      console.log('sessionEnds')
      const res = await fetch('http://localhost:3333/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: `${session.accessToken}` }),
      })
      const data = await res.json()
      console.log('data')
      console.log(data)
      session.accessToken = data.token
      return session
    },
  },
}

export default NextAuth(authOptions)
