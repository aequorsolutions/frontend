import NextAuth from 'next-auth'
import authConfig from './utils/authoptions'

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
})
