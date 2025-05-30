"use client" // Mark as client component if DashboardContent or its children use client-side hooks/interactivity

import DashboardContent from "@/components/dashboard-nav" // Import the refactored DashboardContent

export default function DashboardHomePage() {
  return (
    <DashboardContent />
  )
}