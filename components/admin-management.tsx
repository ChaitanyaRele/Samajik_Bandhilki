"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createAdmin, deleteAdmin } from "@/lib/auth"
import { Trash2, UserPlus, Mail, User, Lock } from "lucide-react"

interface Admin {
  id: string
  name: string
  email: string
  role: string
  created_at: string
}

interface AdminManagementProps {
  admins: Admin[]
}

export function AdminManagement({ admins }: AdminManagementProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [currentAdmins, setCurrentAdmins] = useState<Admin[]>(admins)

  async function handleCreateAdmin(formData: FormData) {
    setIsLoading(true)
    setMessage(null)

    try {
      const result = await createAdmin(formData)

      if (result.success) {
        setMessage({ type: "success", text: "Admin created successfully!" })
        // Reset form
        const form = document.getElementById("admin-form") as HTMLFormElement
        form?.reset()

        // Add the new admin to the list (we don't have the full data, but we can fake it for UI)
        const newAdmin = {
          id: Math.random().toString(), // This will be replaced on page refresh
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          role: "admin",
          created_at: new Date().toISOString(),
        }
        setCurrentAdmins([...currentAdmins, newAdmin])
      } else {
        setMessage({ type: "error", text: result.error || "Failed to create admin" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDeleteAdmin(id: string) {
    if (!confirm("Are you sure you want to delete this admin? This action cannot be undone.")) {
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const result = await deleteAdmin(id)

      if (result.success) {
        setMessage({ type: "success", text: "Admin deleted successfully!" })
        // Remove the admin from the list
        setCurrentAdmins(currentAdmins.filter((admin) => admin.id !== id))
      } else {
        setMessage({ type: "error", text: result.error || "Failed to delete admin" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {message && (
        <Alert
          variant={message.type === "error" ? "destructive" : "default"}
          className={`mb-6 ${message.type === "success" ? "border-green-200 bg-green-50" : ""}`}
        >
          <AlertDescription className={message.type === "success" ? "text-green-800" : ""}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      {/* Create Admin Form */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
          <CardTitle className="text-xl font-bold text-orange-700 font-serif flex items-center">
            <UserPlus className="w-5 h-5 mr-2" />
            Add New Admin
          </CardTitle>
          <CardDescription>Create a new admin account with limited permissions</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form id="admin-form" action={handleCreateAdmin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter admin's full name"
                  required
                  className="pl-10 border-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter admin's email address"
                  required
                  className="pl-10 border-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  required
                  className="pl-10 border-gray-300"
                />
              </div>
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters long and include a mix of letters and numbers
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating Admin..." : "Create Admin"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Admin List */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
          <CardTitle className="text-xl font-bold text-orange-700 font-serif">Manage Admins</CardTitle>
          <CardDescription>View and manage all admin accounts</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {currentAdmins.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No admins found</p>
            ) : (
              <div className="divide-y divide-gray-200">
                {currentAdmins.map((admin) => (
                  <div key={admin.id} className="py-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{admin.name}</h3>
                      <p className="text-sm text-gray-500">{admin.email}</p>
                      <div className="mt-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            admin.role === "super_admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {admin.role === "super_admin" ? "Super Admin" : "Admin"}
                        </span>
                      </div>
                    </div>
                    <div>
                      {admin.role !== "super_admin" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteAdmin(admin.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
