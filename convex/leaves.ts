import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getLeavesByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("leaves")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getAllLeaves = query({
  handler: async (ctx) => {
    return await ctx.db.query("leaves").collect();
  },
});

export const createLeaveRequest = mutation({
  args: {
    userId: v.id("users"),
    type: v.union(v.literal("sick"), v.literal("vacation"), v.literal("personal"), v.literal("maternity"), v.literal("paternity")),
    startDate: v.string(),
    endDate: v.string(),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("leaves", {
      userId: args.userId,
      type: args.type,
      startDate: args.startDate,
      endDate: args.endDate,
      reason: args.reason,
      status: "pending",
      appliedAt: new Date().toISOString().split('T')[0],
    });
  },
});

export const updateLeaveStatus = mutation({
  args: {
    leaveId: v.id("leaves"),
    status: v.union(v.literal("approved"), v.literal("rejected")),
    approvedBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.leaveId, {
      status: args.status,
      approvedBy: args.approvedBy,
    });
  },
});