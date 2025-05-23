import { requireAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSupabaseServerClient } from "@/lib/supabase"
import Link from "next/link"
import { Heart, Users, GraduationCap, Calendar, Plus, Settings, Eye, UserCog } from "lucide-react"
import { redirect } from "next/navigation"
import LogoutButton from "@/components/logout-button"

// Mark this route as dynamic since it uses cookies
export const dynamic = "force-dynamic"

async function getActivityStats() {
  const supabase = getSupabaseServerClient()

  const { data: activities, error } = await supabase.from("activities").select("id, created_at")

  if (error) {
    console.error("Error fetching activity stats:", error)
    return { total: 0, thisMonth: 0 }
  }

  const total = activities?.length || 0
  const thisMonth =
    activities?.filter((activity) => {
      const activityDate = new Date(activity.created_at)
      const now = new Date()
      return activityDate.getMonth() === now.getMonth() && activityDate.getFullYear() === now.getFullYear()
    }).length || 0

  return { total, thisMonth }
}

export default async function AdminDashboard() {
  const session = await requireAuth()

  if (!session) {
    redirect("/admin/login")
  }

  const { total, thisMonth } = await getActivityStats()
  const isSuperAdmin = session.user.role === "super_admin"

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header with Indian-inspired design */}
      <header className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 text-white shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-serif">समाजिक बांधिलकी Admin</h1>
                <p className="text-orange-100 text-sm">Dashboard | डैशबोर्ड</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm opacity-90">Welcome, {session.user.name}</p>
                <p className="text-xs opacity-75">
                  {session.user.email}
                  {isSuperAdmin && (
                    <span className="ml-2 bg-purple-200 text-purple-800 px-1.5 py-0.5 rounded-full text-[10px] font-medium">
                      Super Admin
                    </span>
                  )}
                </p>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Rest of the dashboard content remains the same */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text font-serif">
            स्वागत है | Welcome
          </h2>
          <p className="text-gray-600 text-lg">Manage your organization's activities and content</p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mt-2"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card className="border-l-4 border-l-orange-500 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-orange-600">{total}</CardTitle>
                  <CardDescription className="font-medium">Total Activities</CardDescription>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-green-600">{thisMonth}</CardTitle>
                  <CardDescription className="font-medium">This Month</CardDescription>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-blue-600">0</CardTitle>
                  <CardDescription className="font-medium">Volunteers</CardDescription>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-purple-600">0</CardTitle>
                  <CardDescription className="font-medium">Events</CardDescription>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-orange-700 font-serif">गतिविधियाँ</CardTitle>
                  <CardDescription>Activities Management</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage organization activities and showcase your work</p>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-orange-600">{total}</p>
                <p className="text-sm text-gray-500">Total activities</p>
                <p className="text-lg font-semibold text-green-600">{thisMonth}</p>
                <p className="text-sm text-gray-500">Added this month</p>
              </div>
              <div className="flex gap-2 mt-6">
                <Link href="/admin/activities/add" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Activity
                  </Button>
                </Link>
                <Link href="/admin/activities" className="flex-1">
                  <Button variant="outline" className="w-full text-orange-700 border-orange-700 hover:bg-orange-50">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {isSuperAdmin && (
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UserCog className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-purple-700 font-serif">प्रशासक</CardTitle>
                    <CardDescription>Admin Management</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Manage admin accounts and permissions</p>
                <p className="text-sm text-gray-500 mb-4">
                  As a super admin, you can create and manage admin accounts for your organization
                </p>
                <Link href="/admin/manage-admins">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <UserCog className="w-4 h-4 mr-2" />
                    Manage Admins
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-green-700 font-serif">स्वयंसेवक</CardTitle>
                  <CardDescription>Volunteer Management</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage volunteer information and coordination</p>
              <p className="text-2xl font-bold text-green-600 mb-2">0</p>
              <p className="text-sm text-gray-500 mb-4">Active volunteers</p>
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                disabled
              >
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          {!isSuperAdmin && (
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-purple-700 font-serif">कार्यक्रम</CardTitle>
                    <CardDescription>Event Management</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Manage upcoming events and programs</p>
                <p className="text-2xl font-bold text-purple-600 mb-2">0</p>
                <p className="text-sm text-gray-500 mb-4">Upcoming events</p>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled
                >
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 font-serif flex items-center">
              <Settings className="w-6 h-6 mr-3 text-orange-600" />
              Quick Actions | त्वरित कार्य
            </CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/admin/activities/add">
                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 py-6 text-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Activity
                </Button>
              </Link>
              <Link href="/activities">
                <Button
                  variant="outline"
                  className="w-full text-green-700 border-green-700 hover:bg-green-50 py-6 text-lg"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  View Public Site
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
