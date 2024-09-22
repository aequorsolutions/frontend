import authConfig from '@/utils/authoptions'
import NextAuth from 'next-auth'

// Use only one of the two middleware options below
// 1. Use middleware directly
export const { auth: middleware } = NextAuth(authConfig)

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/dashboard/:path*',
  ],
}
