"use client"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import {
  Calendar,
  Users,
  Megaphone,
  DollarSign,
  FileText,
  Home,
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  Download,
  Eye,
  UserPlus,
  CalendarPlus,
  MessageSquare,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const initialNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Member Management", href: "/members", icon: Users },
  { name: "Events & Calendar", href: "/events", icon: Calendar },
  { name: "Announcements", href: "#", icon: Megaphone },
  { name: "Finance Tracking", href: "#", icon: DollarSign },
  { name: "Files Management", href: "#", icon: FileText },
]

const recentEvents = [
  {
    id: 1,
    title: "Weekly Study Group",
    date: "Today, 6:00 PM",
    location: "Library Room 204",
    attendees: 12,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Club Meeting",
    date: "Tomorrow, 3:00 PM",
    location: "Student Center",
    attendees: 25,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Fundraising Event",
    date: "Dec 15, 2:00 PM",
    location: "Main Auditorium",
    attendees: 150,
    status: "planned",
  },
]

const recentAnnouncements = [
  {
    id: 1,
    title: "New Semester Registration Open",
    content: "Registration for spring semester activities is now open. Please submit your forms by...",
    author: "Sarah Johnson",
    time: "2 hours ago",
    priority: "high",
  },
  {
    id: 2,
    title: "Club Merchandise Available",
    content: "New UniHub t-shirts and hoodies are now available for purchase at the student center...",
    author: "Mike Chen",
    time: "1 day ago",
    priority: "medium",
  },
  {
    id: 3,
    title: "Meeting Minutes - Nov 28",
    content: "Minutes from last week's executive meeting have been uploaded to the files section...",
    author: "Emma Davis",
    time: "3 days ago",
    priority: "low",
  },
]

const recentFiles = [
  {
    id: 1,
    name: "Budget_Report_Q4.pdf",
    size: "2.4 MB",
    uploadedBy: "Finance Team",
    uploadedAt: "2 hours ago",
    downloads: 15,
  },
  {
    id: 2,
    name: "Event_Photos_Nov.zip",
    size: "45.2 MB",
    uploadedBy: "Media Team",
    uploadedAt: "1 day ago",
    downloads: 8,
  },
  {
    id: 3,
    name: "Constitution_Updated.docx",
    size: "156 KB",
    uploadedBy: "Executive Board",
    uploadedAt: "3 days ago",
    downloads: 23,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [navigation, setNavigation] = useState(
    initialNavigation.map((item) => ({ ...item, current: item.href === pathname }))
  )

  useEffect(() => {
    setNavigation(
      initialNavigation.map((item) => ({
        ...item,
        current: item.href === pathname,
      }))
    )
  }, [pathname])

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-sm">
            UH
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">UniHub</span>
            <span className="text-xs text-muted-foreground">Computer Science Club</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={item.current}>
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function DashboardContent() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search members, events, files..." className="pl-8" />
          </div>
          <Button size="sm" className="ml-auto">
            <Plus className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 space-y-6 p-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your Computer Science Club today.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">3 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Club Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,847</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -5% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Files</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">6 uploaded this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get things done faster</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <Button variant="outline" className="justify-start h-auto p-4">
                <UserPlus className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Add New Member</div>
                  <div className="text-sm text-muted-foreground">Invite someone to join</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <CalendarPlus className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Create Event</div>
                  <div className="text-sm text-muted-foreground">Schedule a new activity</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <MessageSquare className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Send Announcement</div>
                  <div className="text-sm text-muted-foreground">Notify all members</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your next scheduled activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-4 rounded-lg border p-3">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{event.title}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {event.date}
                      <MapPin className="h-3 w-3 ml-3 mr-1" />
                      {event.location}
                    </div>
                  </div>
                  <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                    {event.attendees} attending
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                View All Events
              </Button>
            </CardContent>
          </Card>

          {/* Recent Announcements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
              <CardDescription>Latest updates from your club</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="space-y-2 rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{announcement.title}</p>
                    <Badge
                      variant={
                        announcement.priority === "high"
                          ? "destructive"
                          : announcement.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{announcement.content}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>By {announcement.author}</span>
                    <span>{announcement.time}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Megaphone className="h-4 w-4 mr-2" />
                View All Announcements
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Files */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Files</CardTitle>
            <CardDescription>Latest documents and resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.size} • Uploaded by {file.uploadedBy} • {file.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Download className="h-3 w-3 mr-1" />
                      {file.downloads}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <FileText className="h-4 w-4 mr-2" />
              Browse All Files
            </Button>
          </CardContent>
        </Card>
      </main>
    </SidebarInset>
  )
}
