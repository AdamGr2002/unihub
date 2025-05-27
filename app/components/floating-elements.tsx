"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Calendar, MessageSquare, Star, GraduationCap } from "lucide-react"

export function FloatingElements() {
  const icons = [BookOpen, Users, Calendar, MessageSquare, Star, GraduationCap]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-slate-700/20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
      ))}
    </div>
  )
}
