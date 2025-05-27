"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, ArrowRight, Star, GraduationCap, Target, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { GlowingBackground } from "./components/glowing-background"
import { FloatingElements } from "./components/floating-elements"
import { FeatureGrid } from "./components/feature-grid"
import { TestimonialCard } from "./components/testimonial-card"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <GlowingBackground />
      <FloatingElements />

      {/* Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="#" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              UniHub
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-slate-300 hover:text-white transition-colors duration-300 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#how-it-works"
              className="text-slate-300 hover:text-white transition-colors duration-300 relative group"
            >
              How it Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#testimonials"
              className="text-slate-300 hover:text-white transition-colors duration-300 relative group"
            >
              Stories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25">
                  Get Started
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard" // Adjust if your dashboard route is different
                className="text-slate-300 hover:text-white transition-colors duration-300 relative group"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </nav>
        </div>
      </motion.header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-slate-300 text-sm">Trusted by 1,000+ student organizations</span>
                  </div>

                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    <span className="text-white">Where student</span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      communities
                    </span>
                    <br />
                    <span className="text-white">thrive</span>
                  </h1>

                  <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                    The modern platform that brings university clubs together. Manage members, organize events, and
                    build lasting connections—all in one beautiful space.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25 px-8 py-4 text-lg"
                    >
                      Start Your Journey
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-4 text-lg"
                    >
                      See It in Action
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                    <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-8">
                      <img
                        src="/placeholder.svg?height=500&width=600"
                        alt="UniHub Dashboard Preview"
                        className="rounded-xl shadow-2xl"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Built for the way you
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  work
                </span>
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Every feature designed with student organizations in mind. Simple enough for new members, powerful
                enough for seasoned leaders.
              </p>
            </motion.div>

            <FeatureGrid />
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Simple steps to
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  {" "}
                  success
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  icon: <Target className="w-8 h-8" />,
                  title: "Set Up Your Club",
                  description: "Create your club profile in minutes. Add your mission, goals, and basic information.",
                },
                {
                  step: "02",
                  icon: <Users className="w-8 h-8" />,
                  title: "Invite Members",
                  description: "Send invitations via email or share your unique club code. Members join instantly.",
                },
                {
                  step: "03",
                  icon: <Zap className="w-8 h-8" />,
                  title: "Start Organizing",
                  description: "Plan events, manage communications, and watch your community flourish.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-8 text-center group hover:border-slate-700/50 transition-all duration-300">
                    <div className="text-6xl font-bold text-slate-800 mb-4">{item.step}</div>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="flex justify-center items-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Stories from student
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {" "}
                  leaders
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <TestimonialCard
                quote="UniHub transformed our debate society. We went from chaotic WhatsApp groups to a streamlined, professional organization."
                author="Alex Chen"
                role="President, Debate Society"
                university="Stanford University"
                index={0}
              />
              <TestimonialCard
                quote="The event planning features are incredible. We organized our largest conference ever with 500+ attendees seamlessly."
                author="Maria Rodriguez"
                role="Events Director"
                university="MIT"
                index={1}
              />
              <TestimonialCard
                quote="Finally, a platform that understands student organizations. The interface is intuitive and the features are exactly what we needed."
                author="James Wilson"
                role="Club Coordinator"
                university="Harvard University"
                index={2}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to elevate your
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  club experience?
                </span>
              </h2>
              <p className="text-xl text-slate-400 mb-12">
                Join thousands of student organizations already building stronger communities with UniHub.
              </p>

              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-8 max-w-md mx-auto">
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your university email"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 h-12"
                  />
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25 h-12">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                  Free for 30 days • No credit card required • Cancel anytime
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800/50 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                UniHub
              </span>
            </div>

            <div className="flex items-center space-x-8 text-sm text-slate-400">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Support
              </Link>
              <span>© 2024 UniHub. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
