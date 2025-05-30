import { UserButton } from "@clerk/nextjs"
import { AppSidebar } from "@/components/dashboard-nav" // Import AppSidebar
import { SidebarProvider } from "@/components/ui/sidebar" // Import SidebarProvider

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider> {/* SidebarProvider wraps the entire dashboard layout */}
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <nav className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-black rounded-full" />
                <span className="text-xl font-semibold">UniHub</span>
              </div>
            </nav>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <div className="flex">
          <AppSidebar /> {/* AppSidebar is rendered here */}
          {/* The Dashboard component (default export) is no longer rendered directly here */}
          <div className="flex-1 flex flex-col"> {/* Wrapper for the main content area */}
            {children} {/* Page content (e.g., DashboardContent) will be rendered here */}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

