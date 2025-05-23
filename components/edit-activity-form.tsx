"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { updateActivity } from "@/lib/activities"
import { useRouter } from "next/navigation"

interface Activity {
  id: string
  title: string
  description: string
  youtube_link: string | null
  images: string[] | null
  created_at: string
  updated_at: string
}

interface EditActivityFormProps {
  activity: Activity
}

export function EditActivityForm({ activity }: EditActivityFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [keepExistingImages, setKeepExistingImages] = useState(true)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setSelectedFiles(files)
    }
  }

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const formData = new FormData(e.currentTarget)

      // Add the activity ID and keep existing images flag to form data
      formData.append("id", activity.id)
      formData.append("keepExistingImages", keepExistingImages.toString())

      const result = await updateActivity(formData)

      if (result.success) {
        setMessage({ type: "success", text: "Activity updated successfully! Redirecting..." })
        setSelectedFiles([])

        // Redirect after a short delay to show the success message
        setTimeout(() => {
          router.push("/admin/activities")
        }, 1500)
      } else {
        setMessage({ type: "error", text: result.error || "Failed to update activity" })
      }
    } catch (error) {
      console.error("Error updating activity:", error)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Activity</CardTitle>
        <CardDescription>
          Update the activity information. Last updated: {new Date(activity.updated_at).toLocaleDateString("en-IN")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <Alert variant={message.type === "error" ? "destructive" : "default"} className="mb-6">
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title of Activity *</Label>
            <Input id="title" name="title" defaultValue={activity.title} placeholder="Enter activity title" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={activity.description}
              placeholder="Describe the activity in detail"
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube_link">YouTube Video Link</Label>
            <Input
              id="youtube_link"
              name="youtube_link"
              type="url"
              defaultValue={activity.youtube_link || ""}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="text-sm text-gray-500">
              Optional: Add a YouTube video link. Note: Some videos may be restricted from embedding on external
              websites.
            </p>
          </div>

          {activity.images && activity.images.length > 0 && (
            <div className="space-y-4">
              <Label>Current Images ({activity.images.length})</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {activity.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square overflow-hidden rounded-lg border-2 border-gray-200">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Current image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
                <Checkbox
                  id="keepExistingImages"
                  checked={keepExistingImages}
                  onCheckedChange={(checked) => setKeepExistingImages(checked as boolean)}
                />
                <Label htmlFor="keepExistingImages" className="text-sm font-medium">
                  Keep existing images
                </Label>
                <p className="text-sm text-gray-600 ml-2">
                  {keepExistingImages
                    ? "(New images will be added to existing ones)"
                    : "(All existing images will be replaced with new ones)"}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Label htmlFor="images">
              {keepExistingImages && activity.images?.length
                ? "Add More Images"
                : activity.images?.length
                  ? "Replace All Images"
                  : "Upload Images"}
            </Label>
            <Input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            <p className="text-sm text-gray-500">
              Upload multiple images to showcase the activity. Supported formats: JPG, PNG, GIF (Max 10MB per file)
            </p>

            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Selected files ({selectedFiles.length}):</p>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm text-gray-600 truncate">
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSelectedFile(index)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1 bg-green-700 hover:bg-green-600" disabled={isLoading}>
              {isLoading ? "Updating Activity..." : "Update Activity"}
            </Button>
            <Link href="/admin/activities" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
