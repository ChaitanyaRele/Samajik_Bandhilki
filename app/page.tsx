import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getSupabaseServerClient } from "@/lib/supabase"

// Add dynamic export to prevent caching
export const dynamic = "force-dynamic"

async function getRecentActivities() {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3)

  if (error) {
    console.error("Error fetching activities:", error)
    return []
  }

  return data || []
}

export default async function Home() {
  const recentActivities = await getRecentActivities()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Indian-inspired design */}
      <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white border-b-4 border-green-600">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold font-serif">सामाजिक बांधिलकी</h1>
            <nav className="flex flex-wrap gap-2 sm:gap-4">
              <Link href="/about">
                <Button variant="ghost" className="text-white hover:bg-orange-700">
                  About Us
                </Button>
              </Link>
              <Link href="/activities">
                <Button variant="ghost" className="text-white hover:bg-orange-700">
                  Activities
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" className="text-black border-white hover:bg-orange-700">
                  Admin Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero section with Indian motifs */}
        <section className="py-20 bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0 bg-repeat"
              style={{ backgroundImage: "url('/placeholder.svg?height=100&width=100')" }}
            ></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-8 inline-block">
              <div className="w-24 h-1 bg-orange-500 mx-auto mb-2"></div>
              <div className="w-16 h-1 bg-green-600 mx-auto"></div>
            </div>
            <h1 className="text-5xl font-bold mb-4 text-gray-900 font-serif">Samajik Bandhilki</h1>
            <h2 className="text-4xl font-bold mb-6 text-orange-600 font-serif">सामाजिक बांधिलकी</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-700">
              A charity organization dedicated to serving the adivasi communities and supporting special needs organisations. Discover our activities
              and initiatives that make a difference in people's lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/activities">
                <Button className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-6">View Our Activities</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Mission section with Indian-inspired design */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 font-serif">Our Mission</h2>
              <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-orange-50 p-8 rounded-lg shadow-md border-t-4 border-orange-500 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-orange-700 text-center">Community Support</h3>
                <p className="text-gray-600 text-center">
                  Providing essential resources and support to those in need specifically adivasi women and children and most notably orphans.
                </p>
              </div>
              <div className="bg-green-50 p-8 rounded-lg shadow-md border-t-4 border-green-500 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-green-700 text-center">Education</h3>
                <p className="text-gray-600 text-center">
                  Promoting education for underprivileged children and orphans.
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-lg shadow-md border-t-4 border-blue-500 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-700 text-center">Healthcare</h3>
                <p className="text-gray-600 text-center">
                  Facilitating access to healthcare services and promoting health awareness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote section with Indian design */}
        <section className="py-16 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <svg
                className="w-12 h-12 text-orange-400 mx-auto mb-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-2xl font-serif text-gray-700 italic mb-6">
                "The best way to find yourself is to lose yourself in the service of others."
              </p>
              <p className="text-lg font-medium text-orange-700">- Mahatma Gandhi</p>
            </div>
          </div>
        </section>

        {/* Recent activities with Indian-inspired design */}
        {recentActivities.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 font-serif">Recent Activities</h2>
                <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {recentActivities.map((activity) => (
                  <Card
                    key={activity.id}
                    className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {activity.images && activity.images.length > 0 && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={activity.images[0] || "/placeholder.svg"}
                          alt={activity.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader className="border-b border-orange-100">
                      <CardTitle className="text-orange-700 font-serif">{activity.title}</CardTitle>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.created_at).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-600 line-clamp-3">{activity.description}</p>
                      <Link href={`/activities/${activity.id}`} className="inline-block mt-4">
                        <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50">
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link href="/activities">
                  <Button className="bg-orange-600 hover:bg-orange-700">View All Activities</Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Call to action with Indian-inspired design */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 font-serif">Join Us in Making a Difference</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Together, we can create a positive impact in our community. Explore our activities and be a part of our
              journey.
            </p>
            <Link href="/activities">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6">Explore Our Work</Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer with Indian-inspired design */}
      <footer className="bg-gray-900 text-white py-12 border-t-4 border-orange-500">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 font-serif">सामाजिक बांधिलकी</h2>
              <h3 className="text-xl mb-4">Samajik Bandhilki</h3>
              <p className="text-gray-400">
                A charity organization dedicated to serving the community of Girgaon and beyond.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 font-serif">Contact Us</h3>
              <p className="text-gray-400 mb-2">Girgaon, Mumbai, Maharashtra</p>
              <p className="text-gray-400 mb-2">Email: samajikbandhilki@gmail.com</p>
              <p className="text-gray-400">Phone: +91 9869244813, +91 9322912103</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 font-serif">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-orange-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/activities" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Activities
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Samajik Bandhilki. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
