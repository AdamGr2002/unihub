"use client"

import { motion } from "framer-motion"
import { Users, Calendar, MessageSquare, BarChart, Shield, Smartphone } from "lucide-react"

export function FeatureGrid() {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Smart Member Management",
      description:
        "Effortlessly organize members with role-based permissions, automated onboarding, and engagement tracking.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Event Orchestration",
      description:
        "Plan, promote, and manage events with integrated RSVP, ticketing, and real-time attendance tracking.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Unified Communication",
      description: "Keep everyone connected with announcements, discussions, and direct messaging in one platform.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Insightful Analytics",
      description: "Track engagement, measure growth, and make data-driven decisions with comprehensive reporting.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "University Integration",
      description: "Seamlessly connect with your university's systems for authentication and directory services.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Excellence",
      description: "Native mobile experience that works perfectly on any device, anywhere, anytime.",
      gradient: "from-teal-500 to-blue-500",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group"
        >
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-8 h-full hover:border-slate-700/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
            <div
              className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
            >
              {feature.icon}
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>

            <p className="text-slate-400 leading-relaxed">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
