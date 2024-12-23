import { UserButton } from "@clerk/nextjs"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
        <DashboardNav />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

