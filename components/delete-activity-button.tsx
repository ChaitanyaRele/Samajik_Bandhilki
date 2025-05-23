"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { deleteActivity } from "@/lib/activities"
import { useRouter } from "next/navigation"

interface DeleteActivityButtonProps {
  activityId: string
}

export function DeleteActivityButton({ activityId }: DeleteActivityButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this activity? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      const result = await deleteActivity(activityId)

      if (result.success) {
        router.refresh()
      } else {
        alert(result.error || "Failed to delete activity")
      }
    } catch (error) {
      alert("An unexpected error occurred")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  )
}
