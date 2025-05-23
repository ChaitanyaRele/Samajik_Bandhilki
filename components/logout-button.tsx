"use client"

import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    setIsLoggingOut(true)
    try {
      const result = await logout()
      if (result.success) {
        router.push(result.redirectTo)
      }
    } catch (error) {
      console.error("Logout error:", error)
      setIsLoggingOut(false)
    }
  }

  return (
    <Button
      variant="outline"
      className="text-black border-white/30 hover:bg-white/20 backdrop-blur-sm"
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      <LogOut className="w-4 h-4 mr-2" />
      {isLoggingOut ? "Logging out..." : "Logout"}
    </Button>
  )
}
