import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export default function ActivityNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-orange-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text font-serif">
          गतिविधि नहीं मिली
        </h1>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Activity Not Found</h2>
        <p className="text-gray-600 mb-8">
          The activity you're looking for doesn't exist or may have been removed. Please check the URL or go back to all
          activities.
        </p>
        <Link href="/activities">
          <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-6 py-2">
            सभी गतिविधियाँ देखें | View All Activities
          </Button>
        </Link>
      </div>
    </div>
  )
}
