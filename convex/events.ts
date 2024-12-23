import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    date: v.string(),
    location: v.string(),
    clubId: v.string(),
    organizerId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", {
      ...args,
      attendees: [],
      status: "upcoming",
    })
  },
})

export const getEvents = query({
  args: { clubId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("clubId"), args.clubId))
      .collect()
  },
})

export const joinEvent = mutation({
  args: {
    eventId: v.string(),
    memberId: v.string(),
  },
  handler: async (ctx, args) => {
    const eventId = ctx.db.normalizeId("events", args.eventId);
    if (eventId === null) throw new Error("Invalid event ID");
    
    const event = await ctx.db.get(eventId)
    if (!event) throw new Error("Event not found")

    return await ctx.db.patch(eventId, {
      attendees: [...event.attendees, args.memberId],
    })
  },
})

