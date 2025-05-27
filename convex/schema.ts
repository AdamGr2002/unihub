import { defineSchema, defineTable } from "convex/server";
import { v, } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    clerkId: v.string(),
    profilePicture: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_clerkId", ["clerkId"]),

  clubs: defineTable({
    name: v.string(),
    description: v.string(),
    logoUrl: v.optional(v.string()),
    createdBy: v.id("users"),
    createdAt: v.number(),
  }),

  memberships: defineTable({
    userId: v.id("users"),
    clubId: v.id("clubs"),
    role: v.union(
      v.literal("president"),
      v.literal("vice_president"),
      v.literal("treasurer"),
      v.literal("member"),
      v.literal("alumni")
    ),
    joinedAt: v.number(),
  }).index("by_club", ["clubId"]).index("by_user", ["userId"]),

  events: defineTable({
    clubId: v.id("clubs"),
    title: v.string(),
    description: v.string(),
    date: v.number(),
    location: v.string(),
    createdBy: v.id("users"),
    attendees: v.array(v.id("users")),
  }).index("by_club", ["clubId"]),

  announcements: defineTable({
    clubId: v.id("clubs"),
    title: v.string(),
    content: v.string(),
    postedBy: v.id("users"),
    postedAt: v.number(),
  }).index("by_club", ["clubId"]),

  tasks: defineTable({
    clubId: v.id("clubs"),
    title: v.string(),
    description: v.string(),
    assignedTo: v.optional(v.id("users")),
    dueDate: v.optional(v.number()),
    status: v.union(
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("done")
    ),
    createdBy: v.id("users"),
    createdAt: v.number(),
  }).index("by_club", ["clubId"]),

  polls: defineTable({
    clubId: v.id("clubs"),
    question: v.string(),
    options: v.array(v.string()),
    votes: v.array(
      v.object({
        userId: v.id("users"),
        choiceIndex: v.number(),
      })
    ),
    createdBy: v.id("users"),
    closesAt: v.optional(v.number()),
  }).index("by_club", ["clubId"]),

  files: defineTable({
    clubId: v.id("clubs"),
    uploadedBy: v.id("users"),
    name: v.string(),
    fileUrl: v.string(),
    createdAt: v.number(),
  }).index("by_club", ["clubId"]),

  finances: defineTable({
    clubId: v.id("clubs"),
    type: v.union(v.literal("income"), v.literal("expense")),
    amount: v.number(),
    description: v.string(),
    recordedBy: v.id("users"),
    date: v.number(),
  }).index("by_club", ["clubId"]),
});
