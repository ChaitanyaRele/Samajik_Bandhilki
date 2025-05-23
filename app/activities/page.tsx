import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getSupabaseServerClient } from "@/lib/supabase"
import { Heart, Calendar, ArrowLeft, ArrowRight } from "lucide-react"
import { ActivityImage } from "@/components/activity-image"

// Mark this route as dynamic to avoid static generation issues
export const dynamic = "force-dynamic"

async function getAllActivities() {
  try {
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase.from("activities").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching activities:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Failed to fetch activities:", error)
    return []
  }
}

export default async function ActivitiesPage() {
  const activities = await getAllActivities()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-400 rounded-full transform -translate-x-32 -translate-y-32"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-tl from-green-400 to-blue-400 rounded-full transform translate-x-48 translate-y-48"></div>
      </div>

      {/* Header with Indian-inspired design */}
      <header className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 text-white shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-serif">समाजिक बांधिलकी</h1>
                <p className="text-orange-100 text-sm">Samajik Bandhilki</p>
              </div>
            </Link>
            <nav className="flex flex-wrap gap-2 sm:gap-4">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  About Us
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/20">
                  Admin Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        {/* Hero section */}
        <section className="py-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text font-serif">
            हमारी गतिविधियाँ
          </h1>
          <h2 className="text-3xl font-bold mb-6 text-green-700 font-serif">Our Activities</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            समुदाय की सेवा में हमारे प्रयास | Explore the various initiatives and activities we have undertaken to serve our
            community in Girgaon and beyond
          </p>
        </section>

        {/* Activities section */}
        <section className="py-8">
          {activities.length === 0 ? (
            <div className="text-center py-16">
              <Card className="max-w-md mx-auto border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="pt-10 pb-10">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">अभी तक कोई गतिविधि नहीं</h3>
                  <p className="text-gray-600 text-lg">
                    We are working on adding our activities. Please check back soon!
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {activities.map((activity) => (
                <Card
                  key={activity.id}
                  className="overflow-hidden shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow flex flex-col h-full"
                >
                  {activity.images && activity.images.length > 0 && (
                    <div className="h-56 overflow-hidden relative">
                      <ActivityImage
                        src={activity.images[0] || "/placeholder.svg?height=300&width=300"}
                        alt={activity.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {activity.images.length > 1 && (
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                          +{activity.images.length - 1} more
                        </div>
                      )}
                    </div>
                  )}
                  <CardHeader className="border-b border-orange-100">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <CardTitle className="text-xl text-orange-700 font-serif">{activity.title}</CardTitle>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(activity.created_at).toLocaleDateString("hi-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <p className="text-gray-700 line-clamp-3 mb-6 flex-grow">{activity.description}</p>
                    <Link href={`/activities/${activity.id}`}>
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                        और पढ़ें | Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer with Indian-inspired design */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif">समाजिक बांधिलकी</h3>
                  <p className="text-sm opacity-80">Samajik Bandhilki</p>
                </div>
              </div>
              <p className="text-gray-300 mb-2">गिरगाँव, मुंबई</p>
              <p className="text-gray-300">Girgaon, Mumbai</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-orange-400 font-serif">हमारे मूल्य | Our Values</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• सेवा (Seva) - Selfless Service</li>
                <li>• करुणा (Karuna) - Compassion</li>
                <li>• एकता (Ekta) - Unity</li>
                <li>• ज्ञान (Gyan) - Knowledge</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400 font-serif">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/" className="hover:text-orange-400 transition-colors">
                    होम पेज | Home
                  </Link>
                </li>
                <li>
                  <Link href="/activities" className="hover:text-orange-400 transition-colors">
                    गतिविधियाँ | Activities
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-orange-400 transition-colors">
                    हमारे बारे में | About Us
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="hover:text-orange-400 transition-colors">
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} समाजिक बांधिलकी | Samajik Bandhilki. सभी अधिकार सुरक्षित | All rights
              reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2">वसुधैव कुटुम्बकम् | The World is One Family</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
