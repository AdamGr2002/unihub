import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getConvexUser, ensureClubAdmin } from "./utils";

export const createAnnouncement = mutation({
  args: {
    clubId: v.id("clubs"),
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getConvexUser(ctx);
    if (!user) throw new Error("User not authenticated.");

    await ensureClubAdmin(ctx, user._id, args.clubId); // Only admins can post

    await ctx.db.insert("announcements", {
      ...args,
      postedBy: user._id,
      postedAt: Date.now(),
    });
    return { success: true };
  },
});

export const updateAnnouncement = mutation({
  args: {
    announcementId: v.id("announcements"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getConvexUser(ctx);
    if (!user) throw new Error("User not authenticated.");

    const announcement = await ctx.db.get(args.announcementId);
    if (!announcement) throw new Error("Announcement not found.");

    // Authorization: Poster or club admin
    if (announcement.postedBy===(user._id)) {
        // Poster can update
    } else {
        await ensureClubAdmin(ctx, user._id, announcement.clubId);
    }
    
    const { announcementId, ...updates } = args;
     if (Object.keys(updates).length === 0) {
        throw new Error("No updates provided for the announcement.");
    }
    await ctx.db.patch(announcementId, updates);
    return { success: true };
  },
});

export const deleteAnnouncement = mutation({
  args: { announcementId: v.id("announcements") },
  handler: async (ctx, args) => {
    const user = await getConvexUser(ctx);
    if (!user) throw new Error("User not authenticated.");

    const announcement = await ctx.db.get(args.announcementId);
    if (!announcement) throw new Error("Announcement not found.");

     // Authorization: Poster or club admin
    if (announcement.postedBy===(user._id)) {
        // Poster can delete
    } else {
        await ensureClubAdmin(ctx, user._id, announcement.clubId);
    }
    await ctx.db.delete(args.announcementId);
    return { success: true };
  },
});