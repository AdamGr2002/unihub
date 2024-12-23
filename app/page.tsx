import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const { userId } = await auth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-purple-300">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-black rounded-full" />
          <span className="text-xl font-semibold">UniHub</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/features" className="text-sm font-medium hover:text-gray-600">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-gray-600">
            Pricing
          </Link>
          <Button asChild variant="secondary" className="rounded-full px-6">
            <Link href="/demo">Book a demo</Link>
          </Button>
          {userId ? (
            <Button asChild variant="default" className="rounded-full px-6">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild variant="default" className="rounded-full px-6">
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </nav>
      </header>
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
          Run your club{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            smarter.
          </span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          The first and only all-in-one platform revolutionizing how college clubs operate.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/sign-up">Get started</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
            <Link href="/pricing">See pricing</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

