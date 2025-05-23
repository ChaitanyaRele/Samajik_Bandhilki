import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simple decryption function - must match the one in auth.ts
function decryptSession(encryptedData: string): any {
  try {
    return JSON.parse(Buffer.from(encryptedData, "base64").toString())
  } catch (error) {
    return null
  }
}

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // If it's an admin route (except login) and there's no session, redirect to login
  if (path.startsWith("/admin/") && !path.startsWith("/admin/login")) {
    const sessionCookie = request.cookies.get("admin_session")?.value

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      // Decrypt and check if session is expired
      const session = decryptSession(sessionCookie)

      if (!session || session.expires_at < Date.now()) {
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }

      // Check for super admin routes
      if (path.startsWith("/admin/manage-admins") && session.user.role !== "super_admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
      }
    } catch (error) {
      // If there's an error parsing the session, redirect to login
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // If it's the login page and there's a valid session, redirect to dashboard
  if (path === "/admin/login") {
    const sessionCookie = request.cookies.get("admin_session")?.value

    if (sessionCookie) {
      try {
        // Decrypt and check if session is valid and not expired
        const session = decryptSession(sessionCookie)

        if (session && session.expires_at > Date.now()) {
          return NextResponse.redirect(new URL("/admin/dashboard", request.url))
        }
      } catch (error) {
        // If there's an error parsing the session, continue to login page
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
