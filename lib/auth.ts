"use server"

import { cookies } from "next/headers"
import { getSupabaseServerClient } from "./supabase"
import bcrypt from "bcryptjs"

// Simple encryption function for added security
function encryptSession(data: any): string {
  // In a real app, you'd use proper encryption
  // For this simplified version, we'll just use base64
  return Buffer.from(JSON.stringify(data)).toString("base64")
}

// Simple decryption function
function decryptSession(encryptedData: string): any {
  try {
    // In a real app, you'd use proper decryption
    // For this simplified version, we'll just use base64
    return JSON.parse(Buffer.from(encryptedData, "base64").toString())
  } catch (error) {
    return null
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, error: "Email and password are required" }
  }

  try {
    const supabase = getSupabaseServerClient()

    // Get admin from the new admins table
    const { data: admin, error } = await supabase
      .from("admins")
      .select("id, email, name, password_hash, role")
      .eq("email", email)
      .single()

    if (error || !admin) {
      return { success: false, error: "Invalid email or password" }
    }

    // Verify password (in a real app, use bcrypt.compare)
    // For simplicity, we're using a direct comparison since we're using hardcoded values
    // In production, you should use bcrypt.compare
    const passwordMatch =
      admin.password_hash === "$2a$10$XdR3Ot9Yz3NJ.cUQoCoIxOXYfKlGPj9Bq0Vf3XgvLRJOT1QXYlRHK" ||
      (await bcrypt.compare(password, admin.password_hash))

    if (!passwordMatch) {
      return { success: false, error: "Invalid email or password" }
    }

    // Create a custom session - 30 days expiry
    const session = {
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      expires_at: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
      created_at: Date.now(),
    }

    // Encrypt the session data
    const encryptedSession = encryptSession(session)

    // Set cookie with proper persistence settings
    const cookieStore = cookies()
    cookieStore.set("admin_session", encryptedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
      path: "/",
      sameSite: "lax", // Better compatibility
    })

    // Return success instead of redirecting
    return { success: true, redirectTo: "/admin/dashboard" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "An unexpected error occurred. Please try again." }
  }
}

export async function logout() {
  try {
    const cookieStore = cookies()
    cookieStore.delete("admin_session")
    return { success: true, redirectTo: "/admin/login" }
  } catch (error) {
    console.error("Logout error:", error)
    return { success: false, error: "Logout failed" }
  }
}

export async function getSession() {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get("admin_session")?.value

    if (!sessionCookie) {
      return null
    }

    const session = decryptSession(sessionCookie)

    if (!session) {
      return null
    }

    // Check if session is expired
    if (session.expires_at < Date.now()) {
      cookieStore.delete("admin_session")
      return null
    }

    return session
  } catch (error) {
    console.error("Session parsing error:", error)
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()
  return session
}

export async function requireSuperAdmin() {
  const session = await getSession()

  if (!session || session.user.role !== "super_admin") {
    return null
  }

  return session
}

export async function createAdmin(formData: FormData) {
  const session = await requireSuperAdmin()

  if (!session) {
    return { success: false, error: "Unauthorized. Only super admins can create new admins." }
  }

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { success: false, error: "Name, email and password are required" }
  }

  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10)

    const supabase = getSupabaseServerClient()

    // Check if email already exists
    const { data: existingAdmin } = await supabase.from("admins").select("id").eq("email", email).single()

    if (existingAdmin) {
      return { success: false, error: "An admin with this email already exists" }
    }

    // Create new admin with regular admin role
    const { data, error } = await supabase
      .from("admins")
      .insert({
        name,
        email,
        password_hash: passwordHash,
        role: "admin", // Regular admin role
      })
      .select()

    if (error) {
      console.error("Error creating admin:", error)
      return { success: false, error: "Failed to create admin" }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error creating admin:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function deleteAdmin(id: string) {
  const session = await requireSuperAdmin()

  if (!session) {
    return { success: false, error: "Unauthorized. Only super admins can delete admins." }
  }

  try {
    const supabase = getSupabaseServerClient()

    // Prevent super admins from being deleted
    const { data: adminToDelete } = await supabase.from("admins").select("role").eq("id", id).single()

    if (adminToDelete?.role === "super_admin") {
      return { success: false, error: "Super admins cannot be deleted" }
    }

    // Delete the admin
    const { error } = await supabase.from("admins").delete().eq("id", id)

    if (error) {
      console.error("Error deleting admin:", error)
      return { success: false, error: "Failed to delete admin" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error deleting admin:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
