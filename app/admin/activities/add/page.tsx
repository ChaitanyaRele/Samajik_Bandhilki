"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { addActivity } from "@/lib/activities"
import { Heart, ArrowLeft, Upload, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddActivityPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setMessage(null)

    try {
      const result = await addActivity(formData)

      if (result.success) {
        setMessage({ type: "success", text: "Activity added successfully! गतिविधि सफलतापूर्वक जोड़ी गई!" })
        // Reset form
        const form = document.getElementById("activity-form") as HTMLFormElement
        form?.reset()
        setSelectedFiles([])

        // Refresh the page after a short delay
        setTimeout(() => {
          router.refresh()
          router.push("/admin/activities")
        }, 2000)
      } else {
        setMessage({ type: "error", text: result.error || "Failed to add activity" })
      }
    } catch (error) {
      console.error("Error adding activity:", error)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-serif">नई गतिविधि जोड़ें</h1>
                <p className="text-orange-100 text-sm">Add New Activity</p>
              </div>
            </div>
            <Link href="/admin/dashboard">
              <Button variant="outline" className="text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
            <CardTitle className="text-2xl font-bold text-orange-700 font-serif flex items-center">
              <Heart className="w-6 h-6 mr-3" />
              Create New Activity | नई गतिविधि बनाएं
            </CardTitle>
            <CardDescription className="text-gray-600">
              Share your organization's work with the community | अपने संगठन के काम को समुदाय के साथ साझा करें
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
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

            <form id="activity-form" action={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-lg font-semibold text-gray-700">
                  Activity Title | गतिविधि का शीर्षक *
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter activity title | गतिविधि का शीर्षक दर्ज करें"
                  required
                  className="text-lg py-3 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-lg font-semibold text-gray-700">
                  Description | विवरण *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the activity in detail | गतिविधि का विस्तृत विवरण दें"
                  rows={8}
                  required
                  className="text-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="youtube_link" className="text-lg font-semibold text-gray-700">
                  YouTube Video Link | यूट्यूब वीडियो लिंक
                </Label>
                <Input
                  id="youtube_link"
                  name="youtube_link"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="text-lg py-3 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
                <p className="text-sm text-gray-500">
                  Optional: Add a YouTube video link to showcase the activity | वैकल्पिक: गतिविधि दिखाने के लिए यूट्यूब वीडियो
                  लिंक जोड़ें
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="images" className="text-lg font-semibold text-gray-700 flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-orange-600" />
                  Upload Images | चित्र अपलोड करें
                </Label>
                <Input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="text-lg py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 border-gray-300 focus:border-orange-500"
                />
                <p className="text-sm text-gray-500">
                  Upload multiple images to showcase the activity. Supported formats: JPG, PNG, GIF | गतिविधि दिखाने के
                  लिए कई चित्र अपलोड करें। समर्थित प्रारूप: JPG, PNG, GIF
                </p>
                {selectedFiles.length > 0 && (
                  <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm font-medium text-orange-800 mb-2">
                      Selected files | चयनित फाइलें ({selectedFiles.length}):
                    </p>
                    <ul className="text-sm text-orange-700 space-y-1">
                      {selectedFiles.map((file, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-6 text-lg font-semibold shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding Activity... | गतिविधि जोड़ी जा रही है..." : "Add Activity | गतिविधि जोड़ें"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
