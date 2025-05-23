import { requireAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getSupabaseServerClient } from "@/lib/supabase"
import Link from "next/link"
import { DeleteActivityButton } from "@/components/delete-activity-button"
import { Heart, Plus, ArrowLeft, Edit, Calendar } from "lucide-react"

// Mark this route as dynamic since it uses cookies
export const dynamic = "force-dynamic"

async function getActivities() {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from("activities").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching activities:", error)
    return []
  }

  return data || []
}

export default async function ManageActivitiesPage() {
  await requireAuth()
  const activities = await getActivities()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-serif">गतिविधि प्रबंधन</h1>
                <p className="text-orange-100 text-sm">Manage Activities</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/admin/activities/add">
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New
                </Button>
              </Link>
              <Link href="/admin/dashboard">
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text font-serif">
            All Activities | सभी गतिविधियाँ
          </h2>
          <p className="text-gray-600 text-lg">Manage and organize your community activities</p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mt-2"></div>
        </div>

        {activities.length === 0 ? (
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-serif">No Activities Yet</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Start sharing your organization's work with the community | अपने संगठन के काम को समुदाय के साथ साझा करना शुरू
                करें
              </p>
              <Link href="/admin/activities/add">
                <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-lg px-8 py-6">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Activity
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8">
            {activities.map((activity) => (
              <Card
                key={activity.id}
                className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow"
              >
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold text-orange-700 font-serif mb-2">
                        {activity.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        Created on{" "}
                        {new Date(activity.created_at).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link href={`/admin/activities/edit/${activity.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-700 border-green-700 hover:bg-green-50"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <DeleteActivityButton activityId={activity.id} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6 line-clamp-3 text-lg leading-relaxed">{activity.description}</p>
                  <div className="flex flex-wrap gap-3 text-sm mb-6">
                    {activity.images && activity.images.length > 0 && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                        📸 {activity.images.length} Photo{activity.images.length > 1 ? "s" : ""}
                      </span>
                    )}
                    {activity.youtube_link && (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">
                        🎥 Video Available
                      </span>
                    )}
                  </div>
                  {activity.images && activity.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {activity.images.slice(0, 4).map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square overflow-hidden rounded-lg border-2 border-orange-100"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                      {activity.images.length > 4 && (
                        <div className="aspect-square bg-gray-100 rounded-lg border-2 border-orange-100 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">+{activity.images.length - 4} more</span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
