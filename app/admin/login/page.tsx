"use client"

import { useState } from "react"
import { login } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Crown, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      const result = await login(formData)

      if (result.success) {
        // Use client-side navigation instead of server redirect
        router.push(result.redirectTo)
      } else if (result.error) {
        setError(result.error)
        setIsLoading(false)
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-400 rounded-full transform -translate-x-32 -translate-y-32"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10">
        <div className="w-full h-full bg-gradient-to-tl from-green-400 to-blue-400 rounded-full transform translate-x-48 translate-y-48"></div>
      </div>

      <div className="w-full max-w-md mx-4 relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text font-serif">
              समाजिक बांधिलकी
            </h1>
            <h2 className="text-2xl font-semibold text-green-700 font-serif">Samajik Bandhilki</h2>
          </Link>
          <div className="flex items-center justify-center mt-4 mb-2">
            <Crown className="w-5 h-5 text-orange-600 mr-2" />
            <p className="text-gray-600 font-medium">Admin Portal</p>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800 font-serif">Admin Login</CardTitle>
            <CardDescription className="text-gray-600">
              प्रवेश करें | Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit}>
              {error && (
                <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@samajikbandhilki.org"
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-8 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-6 text-lg font-semibold shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "प्रवेश करें | Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
            <Link href="/" className="text-sm text-orange-600 hover:text-orange-700 hover:underline font-medium">
              ← वापस होम पेज पर | Return to Homepage
            </Link>
            <Link
              href="/activities"
              className="text-sm text-green-600 hover:text-green-700 hover:underline font-medium"
            >
              गतिविधियाँ देखें | View Activities
            </Link>
          </CardFooter>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">सुरक्षित लॉगिन | Secure Admin Access</p>
        </div>
      </div>
    </div>
  )
}
