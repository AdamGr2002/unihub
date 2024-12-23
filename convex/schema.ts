import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  members: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.string(),
    department: v.string(),
    joinDate: v.string(),
    clubId: v.string(),
    imageUrl: v.optional(v.string()),
    status: v.string(),
  }),
  events: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.string(),
    location: v.string(),
    clubId: v.string(),
    organizerId: v.string(),
    attendees: v.array(v.string()),
    status: v.string(),
  }),
  clubs: defineTable({
    name: v.string(),
    description: v.string(),
    ownerId: v.string(),
    createdAt: v.string(),
    members: v.array(v.string()),
    settings: v.object({
      allowPublicJoin: v.boolean(),
      requireApproval: v.boolean(),
    }),
  }),
  recruitment: defineTable({
    position: v.string(),
    department: v.string(),
    description: v.string(),
    requirements: v.array(v.string()),
    clubId: v.string(),
    status: v.string(),
    deadline: v.string(),
    applications: v.array(v.string()),
  }),
})

