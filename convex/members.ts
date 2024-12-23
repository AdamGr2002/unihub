import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const createMember = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.string(),
    department: v.string(),
    clubId: v.string(),
  },
  handler: async (ctx, args) => {
    const memberId = await ctx.db.insert("members", {
      ...args,
      joinDate: new Date().toISOString(),
      status: "active",
    })
    
    // Update club members array
    const club = await ctx.db
      .query("clubs")
      .filter((q) => q.eq(q.field("_id"), args.clubId))
      .first()
    
    if (club) {
      await ctx.db.patch(club._id, {
        members: [...club.members, memberId],
      })
    }

    return memberId
  },
})

export const getMembers = query({
  args: { clubId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("members")
      .filter((q) => q.eq(q.field("clubId"), args.clubId))
      .collect()
  },
})

export const getMemberById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const memberId = ctx.db.normalizeId("members", args.id);
    if (memberId === null) return null;
    return await ctx.db.get(memberId);
  },
})

