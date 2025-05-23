import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getSupabaseServerClient } from "@/lib/supabase"
import { Heart, Calendar, ArrowLeft, ExternalLink } from "lucide-react"
import { notFound } from "next/navigation"
import { ImageLightbox } from "@/components/image-lightbox"

// Mark this route as dynamic to avoid static generation issues
export const dynamic = "force-dynamic"

async function getActivity(id: string) {
  try {
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase.from("activities").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching activity:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Failed to fetch activity:", error)
    return null
  }
}

function extractYouTubeId(url: string): string | null {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-lg">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        className="w-full h-full"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}

export default async function ActivityDetailPage({ params }: { params: { id: string } }) {
  // Validate the ID parameter
  if (!params.id) {
    notFound()
  }

  const activity = await getActivity(params.id)

  if (!activity) {
    notFound()
  }

  const youtubeId = extractYouTubeId(activity.youtube_link)

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
              <Link href="/activities">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  All Activities
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  About Us
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/20">
                  Home
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        {/* Activity Title Section */}
        <section className="py-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text font-serif">
            {activity.title}
          </h1>
          <div className="flex items-center justify-center text-gray-600 mb-6">
            <Calendar className="w-5 h-5 mr-2" />
            {new Date(activity.created_at).toLocaleDateString("hi-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8"></div>
        </section>

        {/* Activity Content */}
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border-0 mx-4 sm:mx-auto">
          {/* Images Gallery - Now First */}
          {activity.images && activity.images.length > 0 && (
            <div className="p-8 bg-gradient-to-br from-orange-50 to-red-50 border-b border-orange-100">
              <h2 className="text-2xl font-bold text-orange-700 mb-6 font-serif">तस्वीरें | Photos</h2>
              <ImageLightbox images={activity.images} altText={activity.title} />
            </div>
          )}

          {/* Description - Now Second */}
          <div className="p-8 border-b border-orange-100">
            <h2 className="text-2xl font-bold text-orange-700 mb-6 font-serif">विवरण | Description</h2>
            <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {activity.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* YouTube Video - Now Last */}
          {youtubeId && (
            <div className="p-8 bg-gradient-to-br from-orange-50 to-red-50">
              <h2 className="text-2xl font-bold text-orange-700 mb-6 font-serif">वीडियो | Video</h2>
              <div className="max-w-3xl mx-auto">
                <YouTubeEmbed videoId={youtubeId} title={activity.title} />
                <div className="mt-4 text-center">
                  <a
                    href={`https://www.youtube.com/watch?v=${youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    YouTube पर देखें | Watch on YouTube
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link href="/activities">
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-8 py-6 text-lg">
              <ArrowLeft className="w-5 h-5 mr-2" />
              सभी गतिविधियाँ देखें | View All Activities
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer with Indian-inspired design */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 relative z-10 mt-12">
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
