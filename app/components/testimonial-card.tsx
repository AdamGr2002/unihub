"use client"

import { motion } from "framer-motion"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  university: string
  index: number
}

export function TestimonialCard({ quote, author, role, university, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-8 h-full hover:border-slate-700/50 transition-all duration-300">
        <blockquote className="text-slate-300 text-lg leading-relaxed mb-6">"{quote}"</blockquote>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <div className="text-white font-semibold">{author}</div>
            <div className="text-slate-400 text-sm">{role}</div>
            <div className="text-slate-500 text-sm">{university}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
