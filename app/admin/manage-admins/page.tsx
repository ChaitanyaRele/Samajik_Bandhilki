import { requireSuperAdmin } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { getSupabaseServerClient } from "@/lib/supabase"
import Link from "next/link"
import { redirect } from "next/navigation"
import { AdminManagement } from "@/components/admin-management"
import { ArrowLeft, Users } from "lucide-react"

// Mark this route as dynamic since it uses cookies
export const dynamic = "force-dynamic"

async function getAdmins() {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from("admins")
    .select("id, name, email, role, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching admins:", error)
    return []
  }

  return data || []
}

export default async function ManageAdminsPage() {
  const session = await requireSuperAdmin()

  if (!session) {
    redirect("/admin/dashboard")
  }

  const admins = await getAdmins()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-serif">प्रशासक प्रबंधन</h1>
                <p className="text-orange-100 text-sm">Admin Management</p>
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
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text font-serif">
            Manage Administrators
          </h2>
          <p className="text-gray-600 text-lg">
            As a super admin, you can create and manage admin accounts for your organization
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mt-2"></div>
        </div>

        <AdminManagement admins={admins} />
      </main>
    </div>
  )
}
