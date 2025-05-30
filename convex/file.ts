import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { ensureClubAdmin, getConvexUser, getMembership } from "./utils"; // Assuming utils.ts

export const createFileRecord = mutation({
  args: {
    clubId: v.id("clubs"),
    name: v.string(),
    fileUrl: v.string(), // This would be the URL from Convex Storage after upload
    // storageId: v.string(), // Often you'd store the Convex storageId too
  },
  handler: async (ctx, args) => {
    const user = await getConvexUser(ctx);
    if (!user) throw new Error("User not authenticated.");

    // Authorization: Club member can upload files
    const membership = await getMembership(ctx, user._id, args.clubId);
    if (!membership) throw new Error("User must be a club member to upload files.");

    await ctx.db.insert("files", {
      ...args,
      uploadedBy: user._id,
      createdAt: Date.now(),
    });
    return { success: true };
  },
});

export const deleteFileRecord = mutation({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    const user = await getConvexUser(ctx);
    if (!user) throw new Error("User not authenticated.");

    const fileRecord = await ctx.db.get(args.fileId);
    if (!fileRecord) throw new Error("File record not found.");

    // Authorization: Uploader or club admin
    if (fileRecord.uploadedBy !== user._id) {
        await ensureClubAdmin(ctx, user._id, fileRecord.clubId);
    }
    
    // IMPORTANT: This only deletes the metadata record.
    // You would also need to delete the actual file from Convex Storage using its storageId.
    // Example: await ctx.storage.delete(fileRecord.storageId); (if you stored storageId)
    await ctx.db.delete(args.fileId);
    return { success: true };
  },
});