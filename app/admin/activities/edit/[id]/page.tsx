import { getActivity } from "@/lib/activities"
import { requireAuth } from "@/lib/auth"
import { EditActivityForm } from "@/components/edit-activity-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function EditActivityPage({ params }: { params: { id: string } }) {
  await requireAuth()

  const activity = await getActivity(params.id)

  if (!activity) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-700 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Edit Activity</h1>
            <div className="flex gap-2">
              <Link href="/admin/activities">
                <Button variant="outline" className="text-white border-white hover:bg-green-600">
                  Back to Activities
                </Button>
              </Link>
              <Link href="/admin/dashboard">
                <Button variant="outline" className="text-white border-white hover:bg-green-600">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <EditActivityForm activity={activity} />
      </main>
    </div>
  )
}
