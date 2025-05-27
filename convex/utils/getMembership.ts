import { DatabaseReader } from "../_generated/server";
import { Id } from "../_generated/dataModel";

export async function getMembership(
  ctx: { db: DatabaseReader },
  userId: Id<"users">,
  clubId: Id<"clubs">
) {
  const memberships = await ctx.db
    .query("memberships")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .collect();

  const match = memberships.find((m) => m.clubId === clubId);
  if (!match) throw new Error("User is not a member of this club");

  return match;
}
