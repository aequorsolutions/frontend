import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'

export default {
  // Configure one or more authentication providers
  providers: [
    Google({
      // Google requires "offline" access_type to provide a `refresh_token`
      authorization: { params: { access_type: 'offline', prompt: 'consent' } },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // console.log(token)
      // console.warn('token ends')
      // console.log(account)
      // console.warn('account ends')
      if (account) {
        // First-time login, save the `access_token`, its expiry and the `refresh_token`
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        }
      }
      //@ts-ignore
      if (Date.now() < token.expires_at * 1000) {
        // Subsequent logins, but the `access_token` is still valid
        // console.warn('Token atual válido')
        return token
      }

      // Subsequent logins, but the `access_token` has expired, try to refresh it
      if (!token.refresh_token) throw new TypeError('Missing refresh_token')
      console.warn('Trying to renew access_token..')
      try {
        // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
        // at their `/.well-known/openid-configuration` endpoint.
        // i.e. https://accounts.google.com/.well-known/openid-configuration
        const response = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          body: new URLSearchParams({
            client_id: process.env.AUTH_GOOGLE_ID as string,
            client_secret: process.env.AUTH_GOOGLE_SECRET as string,
            grant_type: 'refresh_token',
            refresh_token: token.refresh_token as string,
          }),
        })

        const tokensOrError = await response.json()

        if (!response.ok) throw tokensOrError

        const newTokens = tokensOrError as {
          access_token: string
          expires_in: number
          refresh_token?: string
        }

        token.access_token = newTokens.access_token
        token.expires_at = Math.floor(Date.now() / 1000 + newTokens.expires_in)
        // Some providers only issue refresh tokens once, so preserve if we did not get a new one
        if (newTokens.refresh_token)
          token.refresh_token = newTokens.refresh_token
        console.warn('Renovado com sucesso')
        return token
      } catch (error) {
        console.error('Error refreshing access_token', error)
        // If we fail to refresh the token, return an error so we can handle it on the page
        token.error = 'RefreshTokenError'
        return token
      }
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      // console.log(token)
      // console.warn('tokenEnds Agin')
      session.accessToken = token.access_token as string
      // console.log('session')
      // console.log(session)
      // console.log('sessionEnds')
      const res = await fetch(`${process.env.NEXT_BACKEND_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: `${session.accessToken}` }),
      })
      const data = await res.json()
      // console.log('data')
      // console.log(data)
      session.accessToken = data.token
      session.error = token.error
      return session
    },
  },
} satisfies NextAuthConfig

// export default NextAuth(authConfig)
