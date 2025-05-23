import type React from "react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Admin - Samajik Bandhilki",
  description: "Admin panel for Samajik Bandhilki charity organization",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={inter.className}>{children}</div>
}
