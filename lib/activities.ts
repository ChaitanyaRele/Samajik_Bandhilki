"use server"

import { getSupabaseServerClient } from "./supabase"
import { getSession } from "./auth"
import { redirect } from "next/navigation"
import { put, del } from "@vercel/blob"
import { revalidatePath } from "next/cache"

export async function addActivity(formData: FormData) {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const youtube_link = formData.get("youtube_link") as string
  const files = formData.getAll("images") as File[]

  if (!title || !description) {
    return { success: false, error: "Title and description are required" }
  }

  const imageUrls: string[] = []

  // Upload images to Vercel Blob
  if (files && files.length > 0) {
    try {
      for (const file of files) {
        if (file.size > 0) {
          const blob = await put(`activities/${Date.now()}-${file.name}`, file, {
            access: "public",
          })
          imageUrls.push(blob.url)
        }
      }
    } catch (error) {
      console.error("Error uploading images:", error)
      return { success: false, error: "Failed to upload images" }
    }
  }

  const supabase = getSupabaseServerClient()

  try {
    // Create activity WITHOUT the created_by field to avoid foreign key constraint issues
    const { data, error } = await supabase
      .from("activities")
      .insert({
        title,
        description,
        youtube_link: youtube_link || null,
        images: imageUrls.length > 0 ? imageUrls : null,
        // Removed created_by field completely
      })
      .select()

    if (error) {
      console.error("Error adding activity:", error)
      return { success: false, error: "Failed to add activity" }
    }

    // Revalidate all paths that display activities
    revalidatePath("/activities")
    revalidatePath("/admin/activities")
    revalidatePath("/")
    return { success: true, data }
  } catch (error) {
    console.error("Unexpected error adding activity:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function updateActivity(formData: FormData) {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const youtube_link = formData.get("youtube_link") as string
  const files = formData.getAll("images") as File[]
  const keepExistingImages = formData.get("keepExistingImages") === "true"

  if (!title || !description) {
    return { success: false, error: "Title and description are required" }
  }

  const supabase = getSupabaseServerClient()

  // Get existing activity to check ownership and get current images
  const { data: existingActivity, error: fetchError } = await supabase
    .from("activities")
    .select("*")
    .eq("id", id)
    .single()

  if (fetchError || !existingActivity) {
    return { success: false, error: "Activity not found" }
  }

  let imageUrls: string[] = []

  // Keep existing images if requested
  if (keepExistingImages && existingActivity.images) {
    imageUrls = [...existingActivity.images]
  } else if (existingActivity.images) {
    // Delete old images from blob storage
    try {
      for (const imageUrl of existingActivity.images) {
        if (imageUrl.includes("blob.vercel-storage.com")) {
          await del(imageUrl)
        }
      }
    } catch (error) {
      console.error("Error deleting old images:", error)
    }
  }

  // Upload new images to Vercel Blob
  if (files && files.length > 0) {
    try {
      for (const file of files) {
        if (file.size > 0) {
          const blob = await put(`activities/${Date.now()}-${file.name}`, file, {
            access: "public",
          })
          imageUrls.push(blob.url)
        }
      }
    } catch (error) {
      console.error("Error uploading images:", error)
      return { success: false, error: "Failed to upload images" }
    }
  }

  const { data, error } = await supabase
    .from("activities")
    .update({
      title,
      description,
      youtube_link: youtube_link || null,
      images: imageUrls.length > 0 ? imageUrls : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error updating activity:", error)
    return { success: false, error: "Failed to update activity" }
  }

  revalidatePath("/activities")
  revalidatePath("/admin/activities")
  revalidatePath(`/admin/activities/edit/${id}`)
  revalidatePath("/")
  return { success: true, data }
}

export async function deleteActivity(id: string) {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  const supabase = getSupabaseServerClient()

  // Get existing activity to check ownership and get images for deletion
  const { data: existingActivity, error: fetchError } = await supabase
    .from("activities")
    .select("*")
    .eq("id", id)
    .single()

  if (fetchError || !existingActivity) {
    return { success: false, error: "Activity not found" }
  }

  // Delete images from blob storage
  if (existingActivity.images) {
    try {
      for (const imageUrl of existingActivity.images) {
        if (imageUrl.includes("blob.vercel-storage.com")) {
          await del(imageUrl)
        }
      }
    } catch (error) {
      console.error("Error deleting images:", error)
    }
  }

  const { error } = await supabase.from("activities").delete().eq("id", id)

  if (error) {
    console.error("Error deleting activity:", error)
    return { success: false, error: "Failed to delete activity" }
  }

  revalidatePath("/activities")
  revalidatePath("/admin/activities")
  revalidatePath("/")
  return { success: true }
}

export async function getActivity(id: string) {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from("activities").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching activity:", error)
    return null
  }

  return data
}
