import { withAuth } from 'next-auth/middleware'
import type { NextRequestWithAuth } from 'next-auth/middleware'
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequestWithAuth) {
  const response = withAuth(request)

  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*'],
}
