"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Users, FileText, PlusCircle } from 'lucide-react'
import { cn } from "@/lib/utils"

const links = [
  { href: "/dashboard", label: "Overview", icon: FileText },
  { href: "/members", label: "Members", icon: Users },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/recruitment", label: "Recruitment", icon: PlusCircle },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 bg-white border-r min-h-[calc(100vh-73px)] p-4">
      <div className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

